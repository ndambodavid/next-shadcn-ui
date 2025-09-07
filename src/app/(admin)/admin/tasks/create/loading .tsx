export default function CreateTaskLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="h-9 w-20 bg-muted animate-pulse rounded" />
            <div className="h-6 w-px bg-border" />
            <div>
              <div className="h-5 w-32 bg-muted animate-pulse rounded mb-1" />
              <div className="h-4 w-48 bg-muted animate-pulse rounded" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-16 bg-muted animate-pulse rounded" />
            <div className="h-9 w-24 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Main Content Skeleton */}
        <div className="flex-1 space-y-6">
          {/* Basic Information Card */}
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4">
              <div className="h-6 w-40 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 w-64 bg-muted animate-pulse rounded" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="h-4 w-20 bg-muted animate-pulse rounded mb-2" />
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
              </div>
              <div>
                <div className="h-4 w-24 bg-muted animate-pulse rounded mb-2" />
                <div className="h-24 w-full bg-muted animate-pulse rounded" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="h-4 w-16 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-10 w-full bg-muted animate-pulse rounded" />
                </div>
                <div>
                  <div className="h-4 w-20 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-10 w-full bg-muted animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Card */}
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4">
              <div className="h-6 w-48 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 w-56 bg-muted animate-pulse rounded" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="h-4 w-16 bg-muted animate-pulse rounded mb-2" />
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
              </div>
              <div>
                <div className="h-4 w-14 bg-muted animate-pulse rounded mb-2" />
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
              </div>
              <div>
                <div className="h-4 w-12 bg-muted animate-pulse rounded mb-2" />
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4">
              <div className="h-6 w-44 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 w-52 bg-muted animate-pulse rounded" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="h-4 w-18 bg-muted animate-pulse rounded mb-2" />
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
              </div>
              <div>
                <div className="h-4 w-28 bg-muted animate-pulse rounded mb-2" />
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="w-80 space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <div className="h-6 w-28 bg-muted animate-pulse rounded mb-4" />
            <div className="space-y-4">
              <div>
                <div className="h-4 w-10 bg-muted animate-pulse rounded mb-1" />
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </div>
              <div>
                <div className="h-4 w-14 bg-muted animate-pulse rounded mb-1" />
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </div>
              <div>
                <div className="h-4 w-16 bg-muted animate-pulse rounded mb-1" />
                <div className="h-4 w-28 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
