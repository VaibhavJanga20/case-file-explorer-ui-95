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
      crimes: {
        Row: {
          created_at: string
          created_by: string | null
          date: string
          description: string
          id: string
          location: string
          severity: Database["public"]["Enums"]["crime_severity"]
          status: Database["public"]["Enums"]["crime_status"]
          type: Database["public"]["Enums"]["crime_type"]
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          date: string
          description: string
          id: string
          location: string
          severity: Database["public"]["Enums"]["crime_severity"]
          status: Database["public"]["Enums"]["crime_status"]
          type: Database["public"]["Enums"]["crime_type"]
        }
        Update: {
          created_at?: string
          created_by?: string | null
          date?: string
          description?: string
          id?: string
          location?: string
          severity?: Database["public"]["Enums"]["crime_severity"]
          status?: Database["public"]["Enums"]["crime_status"]
          type?: Database["public"]["Enums"]["crime_type"]
        }
        Relationships: [
          {
            foreignKeyName: "crimes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      investigations: {
        Row: {
          created_at: string
          created_by: string | null
          crime_id: string
          id: string
          last_updated: string
          notes: string | null
          officer_in_charge: string
          start_date: string
          status: Database["public"]["Enums"]["investigation_status"]
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          crime_id: string
          id: string
          last_updated: string
          notes?: string | null
          officer_in_charge: string
          start_date: string
          status: Database["public"]["Enums"]["investigation_status"]
        }
        Update: {
          created_at?: string
          created_by?: string | null
          crime_id?: string
          id?: string
          last_updated?: string
          notes?: string | null
          officer_in_charge?: string
          start_date?: string
          status?: Database["public"]["Enums"]["investigation_status"]
        }
        Relationships: [
          {
            foreignKeyName: "investigations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investigations_crime_id_fkey"
            columns: ["crime_id"]
            isOneToOne: false
            referencedRelation: "crimes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string
          role: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name: string
          role: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
      suspects: {
        Row: {
          address: string | null
          contact_info: string | null
          created_at: string
          created_by: string | null
          crime_id: string
          date_of_birth: string | null
          gender: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["suspect_status"]
        }
        Insert: {
          address?: string | null
          contact_info?: string | null
          created_at?: string
          created_by?: string | null
          crime_id: string
          date_of_birth?: string | null
          gender?: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["suspect_status"]
        }
        Update: {
          address?: string | null
          contact_info?: string | null
          created_at?: string
          created_by?: string | null
          crime_id?: string
          date_of_birth?: string | null
          gender?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["suspect_status"]
        }
        Relationships: [
          {
            foreignKeyName: "suspects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suspects_crime_id_fkey"
            columns: ["crime_id"]
            isOneToOne: false
            referencedRelation: "crimes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      crime_severity: "low" | "medium" | "high" | "critical"
      crime_status: "open" | "closed" | "cold" | "pending"
      crime_type:
        | "theft"
        | "assault"
        | "burglary"
        | "robbery"
        | "fraud"
        | "homicide"
        | "vandalism"
        | "cyberCrime"
        | "kidnapping"
        | "drugOffense"
        | "other"
      investigation_status: "pending" | "active" | "complete" | "suspended"
      suspect_status:
        | "suspect"
        | "person of interest"
        | "charged"
        | "cleared"
        | "convicted"
        | "acquitted"
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
    Enums: {
      crime_severity: ["low", "medium", "high", "critical"],
      crime_status: ["open", "closed", "cold", "pending"],
      crime_type: [
        "theft",
        "assault",
        "burglary",
        "robbery",
        "fraud",
        "homicide",
        "vandalism",
        "cyberCrime",
        "kidnapping",
        "drugOffense",
        "other",
      ],
      investigation_status: ["pending", "active", "complete", "suspended"],
      suspect_status: [
        "suspect",
        "person of interest",
        "charged",
        "cleared",
        "convicted",
        "acquitted",
      ],
    },
  },
} as const
