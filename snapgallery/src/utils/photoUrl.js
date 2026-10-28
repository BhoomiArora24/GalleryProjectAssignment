const SIZE_SUFFIX = /\/\d+\/\d+(?:\.\w+)?$/

export function getAspectRatio(photo) {
  // Landscape / card ratio matching the mockup:
  return 0.8 // 4:5 vertical aesthetic card
}

export function getImageUrl(photo, width = 800) {
  if (photo.aestheticUrl) return photo.aestheticUrl
  if (photo.imageUrl) return photo.imageUrl
  if (photo.download_url) {
    const height = Math.round(width / 0.8)
    return photo.download_url.replace(SIZE_SUFFIX, `/${width}/${height}`)
  }
  return ''
}
