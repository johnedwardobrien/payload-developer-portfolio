'use client'

import React, { useEffect, useState } from 'react'
import { FaBluesky, FaFacebook, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { Check, Link2, Mail, Share2 } from 'lucide-react'
import './Component.css'

type Props = {
  url: string
  title: string
}

export const ShareLinksBlock: React.FC<Props> = ({ url, title }) => {
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === 'function')
  }, [])

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)

  const links = [
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      Icon: FaLinkedin,
    },
    { name: 'Bluesky', href: `https://bsky.app/intent/compose?text=${t}%20${u}`, Icon: FaBluesky },
    { name: 'X', href: `https://x.com/intent/post?url=${u}&text=${t}`, Icon: FaXTwitter },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FaFacebook },
  ]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const nativeShare = async () => {
    try {
      await navigator.share({ url, title })
    } catch {
      // User dismissed the share sheet
    }
  }

  return (
    <div className="share-links-wrap">
      <nav className="share-links" aria-label="Share">
        <button
          type="button"
          className="share-links__item"
          onClick={copyLink}
          aria-label={copied ? 'Link copied' : 'Copy link'}
        >
          {copied ? <Check size={18} /> : <Link2 size={18} />}
        </button>
        {links.map(({ name, href, Icon }) => (
          <a
            key={name}
            className="share-links__item"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${name}`}
          >
            <Icon size={16} />
          </a>
        ))}
        {canNativeShare ? (
          <button
            type="button"
            className="share-links__item"
            onClick={nativeShare}
            aria-label="Share"
          >
            <Share2 size={18} />
          </button>
        ) : (
          <a
            className="share-links__item"
            href={`mailto:?subject=${t}&body=${u}`}
            aria-label="Share by email"
          >
            <Mail size={18} />
          </a>
        )}
      </nav>
    </div>
  )
}
