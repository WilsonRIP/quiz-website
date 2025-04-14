export interface Profile {
  id: string;
  username: string | null;
  bio: string | null;
  avatar_url: string | null;
  updated_at: string;
}

export type ProfileUpdate = {
  username?: string;
  bio?: string;
  avatar_url?: string;
} 