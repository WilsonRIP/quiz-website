'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { MainLayout } from '@/components/main-layout'
import { fetchUserProfile, updateUserProfile, uploadProfileImage } from '@/lib/profile-service'
import { Avatar } from '@/components/ui/avatar'
import { Profile } from '@/types/user'

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load the user's profile
  useEffect(() => {
    async function loadProfile() {
      if (!user) return

      try {
        setError('')
        const { profile, error } = await fetchUserProfile(user.id)
        if (error) {
          console.error('Error loading profile:', error)
          setError('There was an issue loading your profile. This might be due to incomplete database setup. Please check the console for details and make sure you have run the Supabase setup scripts.')
          return
        }
        
        if (profile) {
          setProfile(profile)
          setUsername(profile.username || '')
          setBio(profile.bio || '')
        }
      } catch (error) {
        console.error('Failed to load profile:', error)
        setError('There was an unexpected error loading your profile. Please try again later.')
      }
    }

    if (user) {
      loadProfile()
    }
  }, [user])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!user) return

    try {
      const { success, error } = await updateUserProfile(user.id, {
        username: username || undefined,
        bio: bio || undefined
      })

      if (error) {
        setError('Failed to update profile. Please try again.')
        console.error('Error updating profile:', error)
        return
      }

      if (success) {
        setSuccessMessage('Profile updated successfully!')
        
        // Refresh profile data
        const { profile } = await fetchUserProfile(user.id)
        if (profile) {
          setProfile(profile)
        }
        
        setIsEditing(false)
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Failed to update profile:', error)
    }
  }

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) {
      return
    }

    const file = e.target.files[0]
    setIsUploading(true)
    setError('')
    setSuccessMessage('')

    try {
      // Upload the image
      const { url, error } = await uploadProfileImage(user.id, file)
      
      if (error) {
        setError('Failed to upload profile image. Please try again.')
        console.error('Error uploading image:', error)
        return
      }

      if (url) {
        // Update the profile with the new image URL
        const { success, error: updateError } = await updateUserProfile(user.id, {
          avatar_url: url
        })

        if (updateError) {
          setError('Failed to update profile with new image. Please try again.')
          console.error('Error updating profile with new image:', updateError)
          return
        }

        if (success) {
          setSuccessMessage('Profile image updated successfully!')
          
          // Refresh profile data
          const { profile } = await fetchUserProfile(user.id)
          if (profile) {
            setProfile(profile)
          }
        }
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Failed to upload profile image:', error)
    } finally {
      setIsUploading(false)
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

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
          
          {error && (
            <div className="bg-red-100 border-red-400 text-red-700 dark:bg-red-900/30 dark:text-red-300 mb-4 rounded border px-4 py-3">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-100 border-green-400 text-green-700 dark:bg-green-900/30 dark:text-green-300 mb-4 rounded border px-4 py-3">
              {successMessage}
            </div>
          )}
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            {/* Profile Avatar */}
            <div className="mb-6 flex flex-col items-center">
              <div 
                className={`relative mb-4 cursor-pointer ${isUploading ? 'opacity-60' : ''}`}
                onClick={handleAvatarClick}
              >
                <Avatar 
                  src={profile?.avatar_url} 
                  alt={profile?.username || user.email || 'User'} 
                  size="lg"
                  letter={user.email?.charAt(0).toUpperCase() || 'U'} 
                />
                
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-0 transition-opacity hover:bg-opacity-20">
                  <span className="text-white opacity-0 transition-opacity hover:opacity-100">
                    Change
                  </span>
                </div>
                
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-30">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              <span className="text-muted-foreground text-sm">
                Click on the avatar to change your profile picture
              </span>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleProfileUpdate}>
                <div className="mb-4">
                  <label htmlFor="username" className="text-foreground mb-1 block text-sm font-medium">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-input bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm transition focus:outline-none focus:ring-1"
                    placeholder="Enter a username"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="bio" className="text-foreground mb-1 block text-sm font-medium">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="border-input bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm transition focus:outline-none focus:ring-1"
                    placeholder="Tell us a little about yourself"
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      // Reset form fields
                      setUsername(profile?.username || '')
                      setBio(profile?.bio || '')
                    }}
                    className="bg-muted hover:bg-muted/80 rounded-md px-4 py-2 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold">User Information</h2>
                  
                  <div className="mt-4 grid gap-4">
                    <div>
                      <h3 className="text-muted-foreground text-sm">Email</h3>
                      <p>{user.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-muted-foreground text-sm">Username</h3>
                      <p>{profile?.username || 'Not set'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-muted-foreground text-sm">Bio</h3>
                      <p className="whitespace-pre-wrap">{profile?.bio || 'No bio provided'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
