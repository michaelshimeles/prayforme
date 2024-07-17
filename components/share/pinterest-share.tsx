import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';

export default function PinterestShare() {
  const shareText = "I just found this site https://www.prayforme.fyi/. You can post your prayer request anonymously.\n\nIf you need prayer, you can post your request there. If you want to pray for others, you can pray for people's requests.";
  const shareUrl = "https://www.prayforme.fyi/";
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`;

  return (
    <Link className="twitter-share-button"
      href={pinterestUrl}
      target="_blank"
      data-size="large">
      <Button>
        Share on Pinterest
      </Button>
    </Link>)
}
