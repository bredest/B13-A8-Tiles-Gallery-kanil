export default function LoadingSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
          <div className="h-56 bg-base-300"></div>
          <div className="p-5 space-y-3">
            <div className="h-4 bg-base-300 rounded-full w-3/4"></div>
            <div className="flex gap-2">
              <div className="h-5 bg-base-300 rounded-full w-16"></div>
              <div className="h-5 bg-base-300 rounded-full w-14"></div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 bg-base-300 rounded-full w-20"></div>
              <div className="h-8 bg-base-300 rounded-full w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
