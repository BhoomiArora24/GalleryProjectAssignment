export const STORAGE_KEY = 'snapgallery-favourites'

// Lazy initializer for useReducer: runs once, validates whatever is in storage.
export function loadFavourites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    const ids = parsed.filter((id) => typeof id === 'string' || typeof id === 'number').map(String)
    return [...new Set(ids)]
  } catch {
    return []
  }
}

export function saveFavourites(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // Storage may be full or blocked; the app keeps working without persistence.
  }
}

// Pure reducer: never mutates, always returns a new array when something changes.
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const id = String(action.id)
      return state.includes(id) ? state.filter((item) => item !== id) : [...state, id]
    }
    default:
      return state
  }
}
