import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyStateAction {
  label: string
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary'
}

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: EmptyStateAction
  secondaryAction?: EmptyStateAction
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  const renderAction = (actionItem: EmptyStateAction, isPrimary: boolean) => {
    const buttonProps = {
      variant: isPrimary ? 'neo-secondary' as const : 'neo-outline' as const,
      onClick: actionItem.onClick,
    }

    const button = (
      <Button {...buttonProps}>
        {actionItem.label}
      </Button>
    )

    if (actionItem.href) {
      return (
        <Link key={actionItem.label} href={actionItem.href}>
          {button}
        </Link>
      )
    }

    return button
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 sm:py-16 px-4 text-center',
        className
      )}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-neo-cream neo-border flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="neo-title-md mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mb-6">{description}</p>
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {action && renderAction(action, true)}
          {secondaryAction && renderAction(secondaryAction, false)}
        </div>
      )}
    </div>
  )
}
