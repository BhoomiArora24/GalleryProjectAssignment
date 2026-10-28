import { useState } from 'react'
import { HexagonLogo, MapPinIcon } from './Icons.jsx'
import { HERO_DATA } from '../utils/aestheticPhotos.js'
import { getImageUrl } from '../utils/photoUrl.js'

export default function HeroBanner({ photo }) {
  const [activeSlide, setActiveSlide] = useState(0)

  // Determine current image, title and details
  const displayImage = photo
    ? (photo.aestheticUrl || (photo.download_url ? getImageUrl(photo, 1600) : null) || HERO_DATA.image)
    : HERO_DATA.image
  const displayTitle = photo?.title || HERO_DATA.title
  const displayRegion = photo?.title ? 'FEATURED DESTINATION' : HERO_DATA.region

  return (
    <div className="relative overflow-hidden rounded-2xl bg-stone-900 shadow-2xl ring-1 ring-white/10">
      {/* Background Hero Image with smooth transition */}
      <img
        key={photo?.id || 'default'}
        src={displayImage}
        alt={displayTitle}
        className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.85] transition-all duration-700 ease-in-out"
      />

      {/* Dark Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60" />

      {/* Hero Content Container */}
      <div className="relative flex min-h-[380px] flex-col justify-between p-5 sm:p-7 md:min-h-[420px]">
        {/* Top Bar inside Hero (Top-right icons removed as requested) */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 text-white">
            <HexagonLogo className="text-white" />
            <span className="text-lg font-bold tracking-wider">YDK</span>
          </div>
        </div>

        {/* Center / Clean Title Area (Overview and tags removed as requested) */}
        <div className="my-auto py-8">
          <h1 className="text-3xl font-light tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
            {displayTitle}
          </h1>
        </div>

        {/* Bottom Details Row */}
        <div className="flex items-center justify-between gap-3 text-xs text-white">
          {/* Contributor Avatars */}
          <div className="flex items-center">
            <div className="flex -space-x-2 overflow-hidden">
              {photo?.avatar ? (
                <img
                  src={photo.avatar}
                  alt={photo?.author || 'Photographer'}
                  className="inline-block h-7 w-7 rounded-full border-2 border-stone-800 object-cover ring-1 ring-white/20"
                />
              ) : null}
              {HERO_DATA.attendees.slice(photo?.avatar ? 1 : 0).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Contributor"
                  className="inline-block h-7 w-7 rounded-full border-2 border-stone-800 object-cover"
                />
              ))}
            </div>
            <button
              type="button"
              className="ml-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/40 text-[10px] text-stone-300 backdrop-blur-md hover:bg-black/60"
            >
              ···
            </button>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((dot) => (
              <button
                key={dot}
                type="button"
                onClick={() => setActiveSlide(dot)}
                aria-label={`Slide ${dot + 1}`}
                className={`h-2 transition-all rounded-full ${
                  activeSlide === dot ? 'w-5 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Region / Location */}
          <div className="flex items-center gap-1.5 font-medium tracking-wider text-stone-300 min-w-0">
            <span className="truncate max-w-[110px] sm:max-w-none text-[11px] uppercase">{displayRegion}</span>
            <MapPinIcon width={14} height={14} className="shrink-0 text-stone-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
