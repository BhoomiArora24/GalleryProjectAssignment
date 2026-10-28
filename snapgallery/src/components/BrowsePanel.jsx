import { HeartIcon, HomeIcon, SearchIcon, SettingsIcon } from './Icons.jsx'

export default function BrowsePanel({
  activeView,
  onNavigate,
  totalCount,
  favouriteCount,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#2a1f19]/90 p-5 shadow-2xl backdrop-blur-md ring-1 ring-white/10 lg:min-h-[420px]">
      {/* Top Header & Settings Gear */}
      <div>
        <div className="flex items-center justify-between text-stone-400">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400/90">
            EXPLORE
          </span>
          <button
            type="button"
            aria-label="Settings"
            className="text-stone-400 transition hover:text-white"
          >
            <SettingsIcon width={16} height={16} />
          </button>
        </div>

        {/* Curated Gallery Title (No person icon) */}
        <div className="mt-4 flex flex-col items-center text-center">
          <h2 className="text-base font-semibold tracking-wide text-white">
            Curated Gallery
          </h2>
          <p className="text-[11px] text-stone-400">
            Travel & Photography
          </p>
        </div>

        {/* Browse Navigation Menu */}
        <div className="mt-6">
          <span className="block text-[10px] font-bold tracking-[0.25em] uppercase text-stone-500">
            BROWSE
          </span>

          <nav className="mt-2.5 flex flex-col gap-1.5">
            {/* HOME */}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
                activeView === 'home'
                  ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10'
                  : 'text-stone-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HomeIcon width={15} height={15} />
                <span>HOME</span>
              </div>
              <span className="text-[10px] text-stone-400">{totalCount}</span>
            </button>

            {/* FAVOURITES */}
            <button
              type="button"
              onClick={() => onNavigate('favourites')}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
                activeView === 'favourites'
                  ? 'bg-red-500/20 text-white shadow-sm ring-1 ring-red-500/30'
                  : 'text-stone-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HeartIcon filled={favouriteCount > 0} width={15} height={15} className={favouriteCount > 0 ? 'text-red-500' : ''} />
                <span>FAVOURITES</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  favouriteCount > 0
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 text-stone-400'
                }`}
              >
                {favouriteCount}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Search Input Filter (Requirement 4) */}
      <div className="mt-6">
        <label htmlFor="author-search" className="sr-only">
          Search photos by author
        </label>
        <div className="relative flex items-center">
          <input
            id="author-search"
            type="search"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search by author..."
            autoComplete="off"
            className="w-full rounded-lg bg-black/40 py-2.5 pl-3.5 pr-9 text-xs text-white placeholder-stone-400 shadow-inner ring-1 ring-white/10 transition-all focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-white/30"
          />
          <SearchIcon
            width={14}
            height={14}
            className="pointer-events-none absolute right-3 text-stone-400"
          />
        </div>
      </div>
    </div>
  )
}
