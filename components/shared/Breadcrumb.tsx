'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  showHome?: boolean
}

export function Breadcrumb({ items, className, showHome = true }: BreadcrumbProps) {
  const allItems = showHome
    ? [{ label: 'Home', href: '/' }, ...items]
    : items

  return (
    <nav className={cn('flex items-center gap-1 sm:gap-2 text-sm mb-4 overflow-x-auto', className)}>
      {allItems.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className={cn(
                'flex items-center gap-1 text-gray-600 hover:text-neo-red uppercase font-medium whitespace-nowrap transition-colors',
                index === 0 && 'text-gray-500'
              )}
            >
              {index === 0 && showHome && <Home className="w-4 h-4" />}
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ) : (
            <span className="text-black font-bold uppercase whitespace-nowrap">
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
