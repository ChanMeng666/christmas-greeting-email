'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Mail,
  Users,
  Palette,
  Send,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WelcomeModal } from '@/components/onboarding/WelcomeModal'
import { SetupProgress } from '@/components/progress/SetupProgress'
import { DeveloperBadge } from '@/components/shared/DeveloperBadge'

const ONBOARDING_KEY = 'email-platform-onboarding'

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    // Check if this is the first visit
    const saved = localStorage.getItem(ONBOARDING_KEY)
    if (!saved) {
      setShowWelcome(true)
    }
  }, [])

  const handleWelcomeComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify({
      hasCompletedWelcome: true,
      completedAt: new Date().toISOString(),
    }))
    setShowWelcome(false)
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Welcome Modal for first-time visitors */}
      {showWelcome && (
        <WelcomeModal
          onGetStarted={handleWelcomeComplete}
          onSkip={handleWelcomeComplete}
        />
      )}

      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="neo-title-lg md:neo-title-xl mb-2">
          Email Template Platform
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Create beautiful emails for holidays, marketing, and newsletters
        </p>
      </div>

      {/* Setup Progress - shows until all steps are complete */}
      <SetupProgress />

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <QuickActionCard
          icon={<Palette className="w-8 h-8" />}
          title="Templates"
          description="Browse and edit email templates"
          href="/templates"
          color="bg-neo-red"
        />
        <QuickActionCard
          icon={<Users className="w-8 h-8" />}
          title="Contacts"
          description="Manage your recipients"
          href="/contacts"
          color="bg-neo-green"
        />
        <QuickActionCard
          icon={<Send className="w-8 h-8" />}
          title="Send Email"
          description="Start sending wizard"
          href="/send"
          color="bg-neo-gold"
        />
        <QuickActionCard
          icon={<Mail className="w-8 h-8" />}
          title="Settings"
          description="Configure API and sender"
          href="/settings"
          color="bg-purple-500"
        />
      </div>

      {/* 快速开始指南 */}
      <div className="neo-card">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 bg-neo-cream neo-border">
            <Sparkles className="w-6 h-6 text-neo-gold" />
          </div>
          <div className="flex-1">
            <h3 className="neo-heading mb-2">Getting Started</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
              <li>Go to <strong>Settings</strong> and configure your Resend API Key</li>
              <li>Add your <strong>Contacts</strong> or sync from Resend Audience</li>
              <li>Choose a <strong>Template</strong> and customize it</li>
              <li>Use the <strong>Send Wizard</strong> to deliver your emails</li>
            </ol>
            <Link href="/settings">
              <Button variant="neo">
                Configure Settings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Developer Badge */}
      <DeveloperBadge />
    </div>
  )
}

function QuickActionCard({
  icon,
  title,
  description,
  href,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  color: string
}) {
  return (
    <Link href={href}>
      <div className="neo-card hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer h-full">
        <div className={`w-14 h-14 ${color} text-white flex items-center justify-center mb-4 neo-border`}>
          {icon}
        </div>
        <h3 className="neo-subheading mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  )
}

