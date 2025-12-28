import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 neo-border-sm border-gray-300',
        className
      )}
    />
  )
}

// Template card skeleton
export function TemplateCardSkeleton() {
  return (
    <div className="neo-border shadow-neo overflow-hidden bg-white">
      <Skeleton className="h-40 border-0" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}

// Contact row skeleton
export function ContactRowSkeleton() {
  return (
    <tr className="border-b border-gray-200">
      <td className="p-4"><Skeleton className="h-4 w-48" /></td>
      <td className="p-4"><Skeleton className="h-4 w-24" /></td>
      <td className="p-4"><Skeleton className="h-4 w-24" /></td>
      <td className="p-4"><Skeleton className="h-4 w-20" /></td>
      <td className="p-4"><Skeleton className="h-8 w-16" /></td>
    </tr>
  )
}

// Card skeleton
export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('neo-border shadow-neo bg-white p-6', className)}>
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

// Text skeleton
export function TextSkeleton({ lines = 3, className }: SkeletonProps & { lines?: number }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-2/3' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}
