'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

type DiscProps = {
  isMounted?: boolean
}

export const Disc: React.FC<DiscProps> = ({ isMounted = false }) => {
  const mountRef = useRef<HTMLDivElement>(null)

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
    scene.background = new THREE.Color('#FFDDC1')

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(0, 0, 12)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    mountElement.appendChild(renderer.domElement)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(-5, 0, 10)
    directionalLight.target.position.set(5, 0, 0)
    scene.add(directionalLight)
    scene.add(directionalLight.target)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const segments = 80
    const radius = 5
    const geometry = new THREE.CircleGeometry(radius, segments)

    const positions = geometry.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i)
      const bendAmount = (y / radius) * -0.8
      positions.setZ(i, bendAmount)
    }

    geometry.computeVertexNormals()

    const material = new THREE.MeshStandardMaterial({
      color: '#FFDDC1',
      roughness: 0.5,
      metalness: 0.2,
      side: THREE.DoubleSide,
    })

    const disk = new THREE.Mesh(geometry, material)
    scene.add(disk)

    let frame = 0
    let animationId: number | null = null
    const animate = () => {
      frame += 0.005
      disk.rotation.y = Math.sin(frame) * 0.2
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

