import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/shared/Sidebar'
import { MobileHeader } from '@/components/shared/MobileHeader'
import { MobileNavProvider } from '@/contexts/MobileNavContext'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Email Template Platform',
  description: 'Create beautiful email templates for holidays, marketing, and newsletters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MobileNavProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Mobile Header */}
              <MobileHeader />

              {/* Page Content */}
              <main className="flex-1 overflow-y-auto bg-gray-50">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </MobileNavProvider>
      </body>
    </html>
  )
}
