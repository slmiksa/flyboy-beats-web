export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      about_section: {
        Row: {
          content: string
          id: string
          image_url: string | null
          updated_at: string
        }
        Insert: {
          content: string
          id?: string
          image_url?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          id?: string
          image_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          id: string
          is_super_admin: boolean | null
          password: string | null
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_super_admin?: boolean | null
          password?: string | null
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          is_super_admin?: boolean | null
          password?: string | null
          username?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date: string | null
          description: string | null
          id: string
          image_url: string
          keywords: string | null
          location: string | null
          title: string
          updated_at: string
          whatsapp_number: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          description?: string | null
          id?: string
          image_url: string
          keywords?: string | null
          location?: string | null
          title: string
          updated_at?: string
          whatsapp_number?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          description?: string | null
          id?: string
          image_url?: string
          keywords?: string | null
          location?: string | null
          title?: string
          updated_at?: string
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string
          id: string
          is_distinguished: boolean
          logo_url: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_distinguished?: boolean
          logo_url: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_distinguished?: boolean
          logo_url?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      slides: {
        Row: {
          created_at: string
          id: string
          image_url: string
          order_position: number
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          order_position: number
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          order_position?: number
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      social_media: {
        Row: {
          created_at: string
          icon: string
          id: string
          order_position: number
          platform: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          icon: string
          id?: string
          order_position: number
          platform: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          order_position?: number
          platform?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
