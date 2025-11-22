'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

type DiscProps = {
  isMounted?: boolean
  isPanelOpen?: boolean
}

export const Disc: React.FC<DiscProps> = ({ isMounted = false, isPanelOpen = false }) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  // When panel opens: camera at -5.9375
  // When panel closes: camera moves 25% more into viewport
  // Current closed position: -4.05078125
  // Movement when closing: -5.9375 to -4.05078125 = 1.88671875 units
  // 25% more movement: 1.88671875 * 0.25 = 0.4716796875
  // New closed position: -4.05078125 + 0.4716796875 = -3.5791015625
  const targetCameraXRef = useRef<number>(-3.5791015625)
  const currentCameraXRef = useRef<number>(-3.5791015625)
  const animationStartRef = useRef<number | null>(null)
  const startCameraXRef = useRef<number>(-3.5791015625)
  const isAnimatingRef = useRef<boolean>(false)

  // Update target camera X position when panel state changes
  // No delay - starts immediately and moves in time with content width changes
  useEffect(() => {
    const newTarget = isPanelOpen ? -5.9375 : -3.5791015625
    if (targetCameraXRef.current !== newTarget) {
      startCameraXRef.current = currentCameraXRef.current
      targetCameraXRef.current = newTarget
      animationStartRef.current = Date.now()
      isAnimatingRef.current = true
    }
  }, [isPanelOpen])

  useEffect(() => {
    if (!isMounted) return

    const mountElement = mountRef.current
    if (!mountElement) return

    let cleanup: (() => void) | null = null
    let timeoutId: NodeJS.Timeout | null = null

    // Wait for container to have dimensions
    const checkDimensions = () => {
      const width = mountElement.clientWidth
      const height = mountElement.clientHeight

      if (width === 0 || height === 0) {
        // Retry after a short delay if dimensions aren't ready
        timeoutId = setTimeout(checkDimensions, 100)
        return
      }

      cleanup = initializeDisk(mountElement, width, height)
    }

    checkDimensions()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (cleanup) {
        cleanup()
      }
    }
  }, [isMounted])

  const initializeDisk = (
    mountElement: HTMLDivElement,
    width: number,
    height: number,
  ): (() => void) => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#FFF5F0')

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    // Start camera at closed position (with 25% more movement into viewport)
    camera.position.set(-3.5791015625, 0, 12)
    camera.lookAt(-3.5791015625, 0, 0)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping
    renderer.setSize(width, height)
    mountElement.appendChild(renderer.domElement)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(-5, 0, 10)
    directionalLight.target.position.set(5, 0, 0)
    scene.add(directionalLight)
    scene.add(directionalLight.target)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    const segments = 80
    const radius = 5
    const geometry = new THREE.CircleGeometry(radius, segments)

    // Color palette from tailwind config - only these three colors
    const porcelain = new THREE.Color('#FFF5F0')
    const peachCream = new THREE.Color('#FFDDC1')
    const warmSand = new THREE.Color('#FFCBA4') // Using warm-sand as tangerine

    const positions = geometry.attributes.position
    const colorArray = new Float32Array(positions.count * 3)
    const angleArray: number[] = []

    // Helper function to interpolate between colors
    const lerpColor = (color1: THREE.Color, color2: THREE.Color, t: number): THREE.Color => {
      const result = new THREE.Color()
      result.r = color1.r + (color2.r - color1.r) * t
      result.g = color1.g + (color2.g - color1.g) * t
      result.b = color1.b + (color2.b - color1.b) * t
      return result
    }

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const bendAmount = (y / radius) * -0.8
      positions.setZ(i, bendAmount)

      // Calculate angle from center for radial gradient
      const angle = Math.atan2(y, x)
      // Normalize angle to 0-1 range
      const normalizedAngle = (angle + Math.PI) / (2 * Math.PI)
      angleArray.push(normalizedAngle)

      // Initialize colors based on angle
      let vertexColor: THREE.Color
      if (normalizedAngle < 0.33) {
        const t = normalizedAngle / 0.33
        vertexColor = lerpColor(porcelain, peachCream, t)
      } else if (normalizedAngle < 0.66) {
        const t = (normalizedAngle - 0.33) / 0.33
        vertexColor = lerpColor(peachCream, warmSand, t)
      } else {
        const t = (normalizedAngle - 0.66) / 0.34
        vertexColor = lerpColor(warmSand, porcelain, t)
      }

      colorArray[i * 3] = vertexColor.r
      colorArray[i * 3 + 1] = vertexColor.g
      colorArray[i * 3 + 2] = vertexColor.b
    }

    geometry.computeVertexNormals()

    // Set initial vertex colors
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorArray, 3))

    // Store angles for animation
    const angleAttribute = new THREE.Float32BufferAttribute(new Float32Array(angleArray), 1)
    geometry.setAttribute('colorAngle', angleAttribute)

    const material = new THREE.MeshBasicMaterial({
      color: porcelain,
      vertexColors: true,
      side: THREE.DoubleSide,
    })

    const disk = new THREE.Mesh(geometry, material)
    scene.add(disk)

    let frame = 0
    let animationId: number | null = null

    // Ease in-out cubic function
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const animate = () => {
      frame += 0.005
      disk.rotation.y = Math.sin(frame) * 0.2

      // Animate radial gradient that shifts as disc rotates
      // Cycle through gradient offset over time (0 to 1, repeating)
      // Increased velocity by 25% (0.1 * 1.25 = 0.125)
      const gradientOffset = (frame * 0.125) % 1

      // Update vertex colors based on angle and gradient offset
      const angleAttribute = geometry.getAttribute('colorAngle') as THREE.BufferAttribute
      const colorAttribute = geometry.getAttribute('color') as THREE.BufferAttribute

      for (let i = 0; i < positions.count; i++) {
        const angle = angleAttribute.getX(i)
        // Add rotation offset to create shifting gradient
        const shiftedAngle = (angle + gradientOffset) % 1

        let vertexColor: THREE.Color
        if (shiftedAngle < 0.33) {
          // porcelain to peach-cream
          const t = shiftedAngle / 0.33
          vertexColor = lerpColor(porcelain, peachCream, t)
        } else if (shiftedAngle < 0.66) {
          // peach-cream to warm-sand
          const t = (shiftedAngle - 0.33) / 0.33
          vertexColor = lerpColor(peachCream, warmSand, t)
        } else {
          // warm-sand back to porcelain
          const t = (shiftedAngle - 0.66) / 0.34
          vertexColor = lerpColor(warmSand, porcelain, t)
        }

        colorAttribute.setXYZ(i, vertexColor.r, vertexColor.g, vertexColor.b)
      }

      colorAttribute.needsUpdate = true

      // Animate camera X position with easing
      if (isAnimatingRef.current && animationStartRef.current !== null) {
        const duration = 1000 // 1 second
        const elapsed = Date.now() - animationStartRef.current
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeInOutCubic(progress)

        const startX = startCameraXRef.current
        const targetX = targetCameraXRef.current
        const currentX = startX + (targetX - startX) * easedProgress

        currentCameraXRef.current = currentX
        camera.position.x = currentX
        camera.lookAt(currentX, 0, 0)

        if (progress >= 1) {
          isAnimatingRef.current = false
          animationStartRef.current = null
          currentCameraXRef.current = targetX
          camera.position.x = targetX
          camera.lookAt(targetX, 0, 0)
        }
      } else {
        // Keep camera at target position when not animating
        const targetX = targetCameraXRef.current
        camera.position.x = targetX
        camera.lookAt(targetX, 0, 0)
      }

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!mountElement) return
      const newWidth = mountElement.clientWidth
      const newHeight = mountElement.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
      }
      if (mountElement && renderer.domElement && mountElement.contains(renderer.domElement)) {
        mountElement.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      cameraRef.current = null
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  )
}
