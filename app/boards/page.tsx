'use client'

import { useEffect } from 'react'

const BOARD_URL = 'https://www.pinterest.com/brandon_smith3/bird-identification/';
const OREGON_BIRDING_BOARD = 'https://www.pinterest.com/brandon_smith3/oregon-birding/';

const boards = [
  {
    loc: BOARD_URL,
    name: "Visual ID Board",
    desc: "Board of Visual ID tips",
    thumb: "images/bird_id_board_thumb.png",
  },
  {
    loc: OREGON_BIRDING_BOARD,
    name: "Oregon Birding",
    desc: "Board of info about Oregon birds",
    thumb: "images/oregon_birding_board_thumb.png",
  },
];

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((b) => (
              <div
                key={b.name}
                className="rounded-2xl dark:border-gray-800 focus:outline-none"
              >
                <a className = "rounded-2xl"
                target="_blank"
                rel="noopener noreferrer"
                data-pin-do="embedBoard"
                data-pin-board-width="400"
                data-pin-scale-height="240"
                data-pin-scale-width="80"
                
                href={b.loc}
                
              >
                <img 
                src={b.thumb}  
                alt={b.desc}
                className="rounded-lg w-64"
              />
              </a>
              <div className="p-4">
              <h2 className="font-semibold mb-1">{b.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{b.desc}</p>
              <a className="text-sm text-[#2c5fca] hover:underline" href={b.loc}> Board URL</a>
            </div>
              </div>
            ))}
          </div>
  )
}
