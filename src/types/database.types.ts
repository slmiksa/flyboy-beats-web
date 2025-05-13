
import { Database } from "@/integrations/supabase/types";

// Define custom types that extend the database types
export type AdminUser = {
  id: string;
  username: string;
  password?: string; // Make sure the password field is defined properly
  is_super_admin: boolean;
  created_at: string;
};

export type Slide = {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  order_position: number;
  created_at: string;
  updated_at: string;
};

export type Event = {
  id: string;
  title: string;
  date: string | null;
  location: string | null;
  image_url: string;
  description: string | null;
  whatsapp_number: string | null;
  keywords: string | null;
  created_at: string;
  updated_at: string;
};

export type Partner = {
  id: string;
  name: string;
  logo_url: string;
  is_distinguished: boolean;
  created_at: string;
  updated_at: string;
};

export type AboutSection = {
  id: string;
  content: string;
  image_url: string | null;
  updated_at: string;
};

export type SocialMedia = {
  id: string;
  platform: string;
  url: string;
  icon: string;
  order_position: number;
  created_at: string;
  updated_at: string;
};

// Export the full database type
export type { Database };
