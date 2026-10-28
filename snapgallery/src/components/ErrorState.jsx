export default function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="flex min-h-[45vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-white">Photographs could not be loaded</h2>
      <p className="max-w-sm text-sm text-stone-400">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 h-10 rounded-lg bg-red-600 px-6 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
      >
        Retry Loading
      </button>
    </div>
  )
}
