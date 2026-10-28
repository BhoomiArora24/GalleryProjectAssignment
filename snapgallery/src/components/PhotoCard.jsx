import { memo, useState } from 'react'
import { HeartIcon, ImageOffIcon, PlayIcon, SettingsIcon } from './Icons.jsx'
import useInView from '../hooks/useInView.js'
import { getImageUrl } from '../utils/photoUrl.js'

function PhotoCard({ photo, isFavourite, onToggle, priority = false }) {
  const [imageFailed, setImageFailed] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [ref, inView] = useInView('300px')

  const { id, author, title, avatar, comments, baseLikes, hasPlayButton, hasMenu } = photo
  const displayLikes = (baseLikes || 50) + (isFavourite ? 1 : 0)

  return (
    <figure
      ref={ref}
      className="group relative m-0 aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-900 shadow-md ring-1 ring-white/10 transition-all duration-300 hover:shadow-2xl hover:ring-white/20"
    >
      {/* Background Image */}
      {imageFailed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-stone-900 text-stone-500">
          <ImageOffIcon />
          <span className="text-xs">Photo unavailable</span>
        </div>
      ) : (
        inView && (
          <img
            src={getImageUrl(photo, 600)}
            alt={`${title || 'Photo'} by ${author}`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )
      )}

      {/* Subtle Dark Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

      {/* Top Left: Heart Favorite Button with Counter */}
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-pressed={isFavourite}
        aria-label={isFavourite ? `Remove ${title} from favourites` : `Add ${title} to favourites`}
        className={`absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-md transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          isFavourite
            ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/40 hover:bg-red-500'
            : 'bg-black/40 text-white/90 hover:bg-black/60 hover:text-white'
        }`}
      >
        <HeartIcon
          filled={isFavourite}
          width={13}
          height={13}
          className={isFavourite ? 'fill-white text-white' : 'text-white/90'}
        />
        <span className="text-[11px] font-medium tracking-tight">{displayLikes}</span>
      </button>

      {/* Top Right: Author Avatar & Optional Menu */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
        {hasMenu && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              aria-label="Card options"
              className="grid h-6 w-6 place-items-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
            >
              <SettingsIcon width={13} height={13} />
            </button>

            {/* Mock Dropdown matching screenshot */}
            {showMenu && (
              <div className="absolute right-0 top-8 z-30 w-28 rounded-lg bg-stone-100 py-1.5 shadow-xl ring-1 ring-black/10">
                <button
                  type="button"
                  onClick={() => {
                    onToggle(id)
                    setShowMenu(false)
                  }}
                  className="flex w-full items-center justify-between px-3 py-1 text-left text-xs font-semibold text-stone-800 hover:bg-stone-200"
                >
                  <span>Favourites</span>
                  {isFavourite && <span className="h-1.5 w-1.5 rounded-full bg-red-500" />}
                </button>
                <div className="flex w-full items-center justify-between px-3 py-1 text-left text-xs text-stone-600 hover:bg-stone-200">
                  <span>Popular</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                </div>
                <div className="w-full px-3 py-1 text-left text-xs text-stone-400 hover:bg-stone-200">
                  Hidden
                </div>
              </div>
            )}
          </div>
        )}

        {/* Circular Author Avatar */}
        <div
          title={`Photographer: ${author}`}
          className="h-7 w-7 overflow-hidden rounded-full border-2 border-white/60 shadow-md ring-1 ring-black/20"
        >
          <img
            src={avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
            alt={author}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Center: Play Button (for video/featured cards like Lake Titicaca in screenshot) */}
      {hasPlayButton && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-black/40 text-white shadow-lg backdrop-blur-md">
            <PlayIcon width={18} height={18} className="translate-x-0.5" />
          </div>
        </div>
      )}

      {/* Bottom Info Overlay */}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3.5 pt-12 text-white">
        <h3 className="truncate text-base font-semibold tracking-wide drop-shadow-sm sm:text-lg">
          {title || 'Photograph'}
        </h3>
        <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] font-medium uppercase tracking-wider text-stone-300">
          <span>by {author}</span>
          <span className="text-stone-500">•</span>
          <span>{comments || 24} comments</span>
        </p>
      </figcaption>
    </figure>
  )
}

export default memo(PhotoCard)
