import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export default function TwitterShare() {
  const tweetText = "I just found this site https://www.prayforme.fyi/. You can post your prayer request anonymously.\n\nIf you need prayer, you can post your request there. If you want to pray for others, you can pray for people's requests.";
  const encodedText = encodeURIComponent(tweetText);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;

  return (
    <Link className="twitter-share-button"
      href={twitterUrl}
      target="_blank"
      data-size="large">
      <Button>
        Share on X (Twitter)
      </Button>
    </Link>)
}
