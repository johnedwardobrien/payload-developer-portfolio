'use client'
import React, { useEffect, useState } from 'react'
import type { RelationshipFieldClientComponent } from 'payload'
import { useAllFormFields, useFormFields, useField } from '@payloadcms/ui'

export const CustomVideoThumbnail: RelationshipFieldClientComponent = (props) => {
  const { path } = props
  const { value, setValue } = useField({ path })
  const [fields, dispatchFields] = useAllFormFields()
  const file = useFormFields(([fields, dispatch]) => fields.file)
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('')
  const [thumbnailBlob, setThumbnailBlob] = useState<Blob | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  // Set default thumbnailUrl from existing videoThumbnailFilename
  useEffect(() => {
    if (fields?.videoThumbnailFilename?.value && !thumbnailUrl) {
      const cloudfrontUrl = (process.env.NEXT_PUBLIC_CLOUDFRONT_URL || '').replace(/\/$/, '')
      const defaultThumbnailUrl = `${cloudfrontUrl}/media/${fields.videoThumbnailFilename?.value}`
      setThumbnailUrl(defaultThumbnailUrl)
    }
  }, [fields?.videoThumbnailFilename?.value, thumbnailUrl])

  // console.log(fields)

  async function uploadThumbnailToPayload(file: File) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append(
        '_payload',
        JSON.stringify({
          alt: 'Video thumbnail',
          isVideoThumbnail: true,
        }),
      )
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        console.log('upload success', data)
        return data.doc // Payload returns the created document in doc property
      } else {
        console.error('Upload failed:', response.statusText)
        return null
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error)
      return null
    }
  }

  // Function to upload thumbnail using stored blob
  async function uploadStoredThumbnail() {
    if (!thumbnailBlob || !file?.value) {
      return null
    }
    setIsProcessing(true)
    try {
      if (value) {
        await fetch(`/api/media/${value}`, { method: 'DELETE' })
      }
      const videoFile = file.value as File
      const cleanFileName = videoFile.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, '')
      const thumbnailFile = new File([thumbnailBlob], `${cleanFileName}_thumbnail.jpg`, {
        type: 'image/jpeg',
        lastModified: Date.now(),
      })
      const uploadedThumbnail = await uploadThumbnailToPayload(thumbnailFile)
      if (uploadedThumbnail) {
        setValue(uploadedThumbnail.id)
        dispatchFields({
          type: 'UPDATE',
          path: 'videoThumbnailFilename',
          value: uploadedThumbnail.filename,
        })
        return uploadedThumbnail.id
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error)
    } finally {
      setIsProcessing(false)
    }
    return null
  }

  function getVideoFrame(file: File, seekTo: number = 1.0): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.muted = true
      video.addEventListener('loadedmetadata', () => {
        const actualSeekTime = Math.min(seekTo, video.duration - 0.1)
        video.currentTime = actualSeekTime
      })
      video.addEventListener('seeked', () => {
        try {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('Could not get canvas context'))
            return
          }
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob)
              } else {
                reject(new Error('Failed to create blob from canvas'))
              }
              video.remove()
              URL.revokeObjectURL(video.src)
            },
            'image/jpeg',
            0.8,
          )
        } catch (error) {
          reject(error)
        }
      })
      video.addEventListener('error', (e) => {
        reject(new Error(`Video loading error: ${e.message || 'Unknown error'}`))
      })
      video.src = URL.createObjectURL(file)
    })
  }
  useEffect(() => {
    // Listen for form submit events
    const handleSubmit = async (event: Event) => {
      event.preventDefault()
      event.stopPropagation()
      console.log(event)
      // Only upload thumbnail if we have a generated thumbnail
      if (thumbnailBlob) {
        // Prevent form submission while processing

        const thumbnailId = await uploadStoredThumbnail()
        console.log('thumbnailId', thumbnailId)
        // Re-submit the form after thumbnail is generated
        if (thumbnailId) {
          const form = (event.target as HTMLElement).closest('form')
          if (form) {
            // Small delay to ensure setValue has updated the form
            setTimeout(() => {
              form.requestSubmit()
            }, 100)
          }
        }
      }
    }

    // Find the form element and attach the event listener
    const formButton = document.querySelector('#action-save')
    if (formButton) {
      formButton.addEventListener('click', handleSubmit)
    }

    return () => {
      if (formButton) {
        formButton.removeEventListener('click', handleSubmit)
      }
    }
  }, [thumbnailBlob])

  // Listen for file remove button clicks
  useEffect(() => {
    const handleFileRemove = () => {
      if (thumbnailUrl) {
        try {
          URL.revokeObjectURL(thumbnailUrl)
        } catch (err) {}
      }
      setThumbnailUrl('')
      setThumbnailBlob(null)
      dispatchFields({ type: 'UPDATE', path: 'videoThumbnailFilename', value: null })
    }

    const removeButton = document.querySelector('.file-field__remove')
    if (removeButton) {
      removeButton.addEventListener('click', handleFileRemove)
    }

    return () => {
      if (removeButton) {
        removeButton.removeEventListener('click', handleFileRemove)
      }
    }
  }, [thumbnailUrl, setValue, dispatchFields])

  // Generate preview thumbnail when video is selected (but don't upload yet)
  useEffect(() => {
    async function generatePreview() {
      // Clear previous thumbnail first
      if (thumbnailUrl) {
        try {
          URL.revokeObjectURL(thumbnailUrl)
        } catch (err) {}
        setThumbnailUrl('')
      }
      if (thumbnailBlob) {
        setThumbnailBlob(null)
      }

      if (
        file?.value &&
        typeof file.value === 'object' &&
        'type' in file.value &&
        typeof file.value.type === 'string' &&
        file.value.type.includes('video')
      ) {
        try {
          const videoFile = file.value as File
          const frame = await getVideoFrame(videoFile, 1.0)
          const previewUrl = URL.createObjectURL(frame)

          // Store both the blob and preview URL
          setThumbnailBlob(frame)
          setThumbnailUrl(previewUrl)
        } catch (error) {
          console.error('Error generating preview:', error)
        }
      }
    }
    generatePreview()
  }, [file?.value])

  return (
    <div>
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          style={{ maxWidth: '500px', height: 'auto' }}
          alt="Video thumbnail"
        />
      )}
      {!thumbnailUrl && <div>No video selected</div>}
    </div>
  )
}
