export default function EmptyState({ title, hint, onReset }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-stone-400">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <h2 className="text-xl font-medium text-white">{title}</h2>
      <p className="max-w-xs text-sm text-stone-400">{hint}</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/15 transition-colors"
        >
          View all photos
        </button>
      )}
    </div>
  )
}
