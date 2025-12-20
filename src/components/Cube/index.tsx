'use client'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function SpinningCube() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Setup scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(250, 250)
    containerRef.current.appendChild(renderer.domElement)

    // Create gradient texture
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const gradient = ctx.createLinearGradient(0, 0, 256, 256)
    gradient.addColorStop(0, '#FFDDC1')
    gradient.addColorStop(1, '#FFF5F0')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)

    const texture = new THREE.CanvasTexture(canvas)

    // Create thick edges using cylinders
    const edgeGroup = new THREE.Group()

    // Define the 12 edges of a cube (only outer edges, no diagonals)
    const edges = [
      // Bottom face
      [
        [-1, -1, -1],
        [1, -1, -1],
      ],
      [
        [1, -1, -1],
        [1, -1, 1],
      ],
      [
        [1, -1, 1],
        [-1, -1, 1],
      ],
      [
        [-1, -1, 1],
        [-1, -1, -1],
      ],
      // Top face
      [
        [-1, 1, -1],
        [1, 1, -1],
      ],
      [
        [1, 1, -1],
        [1, 1, 1],
      ],
      [
        [1, 1, 1],
        [-1, 1, 1],
      ],
      [
        [-1, 1, 1],
        [-1, 1, -1],
      ],
      // Vertical edges
      [
        [-1, -1, -1],
        [-1, 1, -1],
      ],
      [
        [1, -1, -1],
        [1, 1, -1],
      ],
      [
        [1, -1, 1],
        [1, 1, 1],
      ],
      [
        [-1, -1, 1],
        [-1, 1, 1],
      ],
    ]

    const tubeRadius = 0.08 // Thick tube radius
    const material = new THREE.MeshStandardMaterial({
      color: 0xffddc1,
      transparent: false,
      metalness: 0.3,
      roughness: 0.4,
    })

    // Create cylinders for edges
    edges.forEach(([start, end]) => {
      const startVec = new THREE.Vector3(...start)
      const endVec = new THREE.Vector3(...end)
      const direction = new THREE.Vector3().subVectors(endVec, startVec)
      const length = direction.length()

      const geometry = new THREE.CylinderGeometry(tubeRadius, tubeRadius, length, 32)
      const tube = new THREE.Mesh(geometry, material)

      // Position and orient the cylinder
      tube.position.copy(startVec.clone().add(direction.clone().multiplyScalar(0.5)))
      tube.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())

      edgeGroup.add(tube)
    })

    // Add spheres at each vertex to create smooth knuckle joints
    const vertices: [number, number, number][] = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, -1, 1],
      [-1, -1, 1],
      [-1, 1, -1],
      [1, 1, -1],
      [1, 1, 1],
      [-1, 1, 1],
    ]

    const sphereGeometry = new THREE.SphereGeometry(tubeRadius, 32, 32)
    vertices.forEach((vertex) => {
      const sphere = new THREE.Mesh(sphereGeometry, material)
      sphere.position.set(...vertex)
      edgeGroup.add(sphere)
    })

    const cube = edgeGroup

    // Set initial rotation - tilted forward and angled away
    cube.rotation.x = Math.PI / 6 // Tilted forward
    cube.rotation.z = Math.PI / 12 // Angled slightly away

    scene.add(cube)

    // Add ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, .8)
    scene.add(ambientLight)

    // Add a strong directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Add a secondary directional light for fill
    const fillLight = new THREE.DirectionalLight(0xffddc1, 1)
    fillLight.position.set(-5, -3, 2)
    scene.add(fillLight)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Slowly rotate to the right
      cube.rotation.y += 0.005

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      edgeGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => mat.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
      sphereGeometry.dispose()
      texture.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} style={{ width: '250px', height: '250px' }} />
}