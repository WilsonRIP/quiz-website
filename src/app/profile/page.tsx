'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { MainLayout } from '@/components/main-layout'

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-10">
          <div className="mx-auto max-w-md text-center">
            <p>Loading...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="mx-auto max-w-md">
          <h1 className="mb-6 text-center text-2xl font-bold">Your Profile</h1>
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">User Details</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-muted-foreground text-sm">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">User ID</p>
                <p className="font-mono text-sm">{user.id}</p>
              </div>
              <div className="pt-4">
                <button
                  onClick={async () => {
                    try {
                      await fetch('/api/profile-update', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ action: 'example' }),
                      })
                    } catch (error) {
                      console.error('Failed to update profile:', error)
                    }
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
