import { useCallback, useEffect, useState } from 'react'
import { AESTHETIC_PHOTOS } from '../utils/aestheticPhotos.js'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPhotos() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(API_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`The photo service responded with status ${response.status}.`)
        }
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('The photo service returned unexpected data.')

        // Enrich the 30 photos with aesthetic photography & metadata matching the UI mockup
        const enriched = data.map((item, idx) => {
          const aesthetic = AESTHETIC_PHOTOS[idx % AESTHETIC_PHOTOS.length]
          return {
            ...item,
            id: String(item.id),
            author: item.author,
            title: aesthetic?.title || `Photograph ${idx + 1}`,
            aestheticUrl: aesthetic?.imageUrl || item.download_url,
            avatar: aesthetic?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            comments: aesthetic?.comments || (idx * 7 + 12),
            baseLikes: aesthetic?.likes || (idx * 23 + 45),
            hasPlayButton: Boolean(aesthetic?.hasPlayButton),
            hasMenu: Boolean(aesthetic?.hasMenu),
          }
        })

        setPhotos(enriched)
      } catch (err) {
        if (err.name === 'AbortError') return
        setPhotos([])
        setError(err.message || 'Something went wrong while loading photographs.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadPhotos()
    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  return { photos, loading, error, retry }
}
