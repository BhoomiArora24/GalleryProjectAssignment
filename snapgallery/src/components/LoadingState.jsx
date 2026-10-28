export default function LoadingState() {
  return (
    <div role="status" className="flex min-h-[45vh] flex-col items-center justify-center gap-4 text-stone-400">
      <div className="spinner" />
      <p className="text-sm font-medium tracking-wide text-stone-300">Loading photographs...</p>
    </div>
  )
}
