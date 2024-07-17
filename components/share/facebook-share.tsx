import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export default function FacebookShare() {
  const shareUrl = "https://www.prayforme.fyi/";

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <Link className="twitter-share-button"
      href={facebookUrl}
      target="_blank"
      data-size="large">
      <Button>
        Share on Facebook
      </Button>
    </Link>)
}
