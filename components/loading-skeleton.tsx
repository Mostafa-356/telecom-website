'use client'

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-white border-b p-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Sidebar skeleton */}
      <div className="flex">
        <aside className="w-64 bg-white border-r p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </aside>

        {/* Main content skeleton */}
        <main className="flex-1 p-8 space-y-8">
          <div className="space-y-4">
            <div className="h-10 w-48 bg-gray-200 rounded"></div>
            <div className="h-6 w-96 bg-gray-200 rounded"></div>
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 space-y-4">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded"></div>
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4 bg-gray-100 rounded">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  )
}
