import { useCallback, useMemo, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos.js'
import HeroBanner from './HeroBanner.jsx'
import BrowsePanel from './BrowsePanel.jsx'
import PhotoGrid from './PhotoGrid.jsx'
import LoadingState from './LoadingState.jsx'
import ErrorState from './ErrorState.jsx'

export default function Gallery({ view, onNavigate, favouriteIds, onToggleFavourite }) {
  const { photos, loading, error, retry } = useFetchPhotos()
  const [searchQuery, setSearchQuery] = useState('')
  const showingFavourites = view === 'favourites'

  // useCallback keeps the search handler reference stable across re-renders
  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value)
  }, [])

  const handleResetSearch = useCallback(() => {
    setSearchQuery('')
    onNavigate('home')
  }, [onNavigate])

  // useMemo computes the filtered list only when photos, query, view or favourites change
  const visiblePhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return photos.filter((photo) => {
      if (showingFavourites && !favouriteIds.includes(String(photo.id))) {
        return false
      }
      if (!query) return true
      return (
        photo.author.toLowerCase().includes(query) ||
        (photo.title && photo.title.toLowerCase().includes(query))
      )
    })
  }, [photos, searchQuery, showingFavourites, favouriteIds])

  const isSearching = searchQuery.trim() !== ''

  // At initial state: displays first img from gallery (photos[0]).
  // Whenever someone searches something: displays the searched img (visiblePhotos[0]).
  const featuredPhoto = visiblePhotos[0] || photos[0] || null

  let emptyTitle = 'No photographs found'
  let emptyHint = 'Try searching with another photographer name.'
  if (!isSearching && showingFavourites) {
    emptyTitle = 'No favourites yet'
    emptyHint = 'Click the heart icon on any photograph to save it to your favourites.'
  } else if (!isSearching) {
    emptyTitle = 'No photographs available'
    emptyHint = 'The photo service returned an empty list.'
  }

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
      {/* Top Section: Hero Banner & Browse Panel */}
      <section className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-8 xl:col-span-9">
          <HeroBanner
            photo={featuredPhoto}
            isSearching={isSearching}
            searchQuery={searchQuery}
          />
        </div>
        <div className="lg:col-span-4 xl:col-span-3">
          <BrowsePanel
            activeView={view}
            onNavigate={onNavigate}
            totalCount={photos.length}
            favouriteCount={favouriteIds.length}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </div>
      </section>

      {/* Grid Subheader / Status Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1 text-sm text-stone-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            {showingFavourites ? 'Favourites' : 'All Photos'}
          </span>
          <span className="h-3 w-px bg-stone-700" />
          <span className="text-xs text-stone-400">
            {visiblePhotos.length} {visiblePhotos.length === 1 ? 'photo' : 'photos'}
          </span>
          {isSearching && (
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-stone-300">
              Matching &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {isSearching && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-xs text-stone-400 transition-colors hover:text-white"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Photo Stream or Loading/Error States */}
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : (
        <PhotoGrid
          photos={visiblePhotos}
          favouriteIds={favouriteIds}
          onToggle={onToggleFavourite}
          emptyTitle={emptyTitle}
          emptyHint={emptyHint}
          onReset={handleResetSearch}
        />
      )}
    </div>
  )
}
