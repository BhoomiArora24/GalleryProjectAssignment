import { useCallback, useEffect, useReducer, useState } from 'react'
import Gallery from './components/Gallery.jsx'
import { favouritesReducer, loadFavourites, saveFavourites } from './reducers/favouritesReducer.js'

export default function App() {
  const [activeView, setActiveView] = useState('home') // 'home' | 'favourites'
  // useReducer manages favourites list with lazy initializer from localStorage
  const [favouriteIds, dispatch] = useReducer(favouritesReducer, null, loadFavourites)

  useEffect(() => {
    saveFavourites(favouriteIds)
  }, [favouriteIds])

  const toggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', id })
  }, [])

  return (
    <div className="min-h-screen bg-[#16181f] text-slate-100 selection:bg-red-500 selection:text-white">
      <Gallery
        view={activeView}
        onNavigate={setActiveView}
        favouriteIds={favouriteIds}
        onToggleFavourite={toggleFavourite}
      />
    </div>
  )
}
