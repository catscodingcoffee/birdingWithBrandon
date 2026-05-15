'use client'

import { useEffect } from 'react'

const BOARD_URL = 'https://www.pinterest.com/brandon_smith3/bird-identification/'

export default function BoardPage() {
  useEffect(() => {
    if (document.querySelector('script[data-pin-build]')) {
      // Script already loaded from a previous page — manually trigger re-scan
      ;(window as any).parsePinterestWidgets?.()
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = '//assets.pinterest.com/js/pinit.js'
    script.setAttribute('data-pin-build', 'parsePinterestWidgets')
    script.onload = () =>{
      ;(window as any).parsePinterestWidgets?.()
    }
    document.body.appendChild(script)
  }, [])

  return (
    <main>
      <a
        data-pin-do="embedBoard"
        data-pin-board-width="400"
        data-pin-scale-height="240"
        data-pin-scale-width="80"
        href={BOARD_URL}
        className="text-bluebird underline"
      >
        View Board on Pinterest
      </a>
    </main>
  )
}
