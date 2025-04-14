import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Profile, ProfileUpdate } from '@/types/user'

/**
 * Fetches a user's profile from Supabase
 */
export async function fetchUserProfile(userId: string): Promise<{ profile: Profile | null; error: any }> {
  try {
    const supabase = createClientComponentClient()
    
    // Try to get the existing profile
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle() // Use maybeSingle instead of single to not throw an error if nothing is found
    
    // If profile exists, return it
    if (data) {
      return { profile: data as Profile, error: null }
    }
    
    // If profile doesn't exist, create one
    if (error || !data) {
      console.log('No profile found, creating a new one for user:', userId)
      
      // Insert a new profile
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({ id: userId })
        .select('*')
        .single()
      
      if (insertError) {
        console.error('Failed to create profile:', insertError)
        return { profile: null, error: insertError }
      }
      
      return { profile: newProfile as Profile, error: null }
    }
    
    return { profile: null, error }
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    return { profile: null, error }
  }
}

/**
 * Updates a user's profile in Supabase
 */
export async function updateUserProfile(
  userId: string,
  profile: ProfileUpdate
): Promise<{ success: boolean; error: any }> {
  try {
    const supabase = createClientComponentClient()
    
    const { error } = await supabase
      .from('profiles')
      .update({
        ...profile,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
    
    if (error) {
      console.error('Error updating user profile:', error)
      return { success: false, error }
    }
    
    return { success: true, error: null }
  } catch (error) {
    console.error('Failed to update user profile:', error)
    return { success: false, error }
  }
}

/**
 * Uploads a profile image to Supabase storage
 */
export async function uploadProfileImage(
  userId: string,
  file: File
): Promise<{ url: string | null; error: any }> {
  try {
    const supabase = createClientComponentClient()
    const bucketName = 'avatars'
    
    // Check if the bucket exists, create it if it doesn't
    const { data: buckets } = await supabase
      .storage
      .listBuckets()
    
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName)
    
    if (!bucketExists) {
      console.log('Avatars bucket not found, trying to create it')
      try {
        // Try to create the bucket
        const { error: createBucketError } = await supabase
          .storage
          .createBucket(bucketName, {
            public: true,
            fileSizeLimit: 1024 * 1024 * 2 // 2MB
          })
        
        if (createBucketError) {
          console.error('Error creating bucket:', createBucketError)
          return { url: null, error: createBucketError }
        }
        
        // Create a policy for the bucket
        // Note: This might require admin privileges which the client doesn't have
        // You may need to create this policy manually in the Supabase dashboard
      } catch (bucketError) {
        console.error('Failed to create bucket:', bucketError)
        return { url: null, error: bucketError }
      }
    }
    
    // Create a unique file path
    const fileExt = file.name.split('.').pop()
    const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`
    
    // Upload the file to Supabase storage
    const { error: uploadError } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      })
    
    if (uploadError) {
      console.error('Error uploading profile image:', uploadError)
      return { url: null, error: uploadError }
    }
    
    // Get the public URL
    const { data } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(filePath)
    
    return { url: data.publicUrl, error: null }
  } catch (error) {
    console.error('Failed to upload profile image:', error)
    return { url: null, error }
  }
} 