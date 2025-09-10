export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Loading skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-6 bg-muted rounded animate-pulse mt-2" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <div className="h-6 bg-muted rounded animate-pulse w-1/3 mb-4" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="h-6 bg-muted rounded animate-pulse w-1/2 mb-4" />
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="h-6 bg-muted rounded animate-pulse w-1/2 mb-4" />
            <div className="h-20 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
