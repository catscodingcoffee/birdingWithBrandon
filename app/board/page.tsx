import Script from 'next/script'

const BOARD_URL = 'https://www.pinterest.com/brandon_smith3/birding/'

export default function BoardPage() {
  return (
    <main>
      <Script
        src="https://assets.pinterest.com/js/pinit.js"
        strategy="afterInteractive"
      />
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
