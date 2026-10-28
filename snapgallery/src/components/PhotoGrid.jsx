import PhotoCard from './PhotoCard.jsx'
import EmptyState from './EmptyState.jsx'

export default function PhotoGrid({
  photos,
  favouriteIds,
  onToggle,
  emptyTitle,
  emptyHint,
  onReset,
}) {
  if (photos.length === 0) {
    return <EmptyState title={emptyTitle} hint={emptyHint} onReset={onReset} />
  }

  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
      {photos.map((photo, index) => (
        <li key={photo.id} className="min-w-0">
          <PhotoCard
            photo={photo}
            isFavourite={favouriteIds.includes(String(photo.id))}
            onToggle={onToggle}
            priority={index < 4}
          />
        </li>
      ))}
    </ul>
  )
}
