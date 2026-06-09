export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  auth: {
    Tables: {
      users: {
        Row: {
          id: string;
        };
        Insert: {
          id: string;
        };
        Update: {
          id?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
  public: {
    Tables: {
      checkins: {
        Row: {
          id: string;
          user_id: string;
          check_in_date: string;
          sleep: number;
          energy: number;
          anxiety: number;
          focus: number;
          mood: number;
          note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          check_in_date: string;
          sleep: number;
          energy: number;
          anxiety: number;
          focus: number;
          mood: number;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          check_in_date?: string;
          sleep?: number;
          energy?: number;
          anxiety?: number;
          focus?: number;
          mood?: number;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "checkins_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      insights: {
        Row: {
          id: string;
          user_id: string;
          week_start: string;
          week_end: string;
          checkin_count: number;
          average_sleep: number | null;
          average_energy: number | null;
          average_anxiety: number | null;
          average_focus: number | null;
          average_mood: number | null;
          summary: string;
          patterns: Json;
          recommendations: Json;
          metadata: Json;
          generated_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          week_start: string;
          week_end: string;
          checkin_count?: number;
          average_sleep?: number | null;
          average_energy?: number | null;
          average_anxiety?: number | null;
          average_focus?: number | null;
          average_mood?: number | null;
          summary: string;
          patterns?: Json;
          recommendations?: Json;
          metadata?: Json;
          generated_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          week_start?: string;
          week_end?: string;
          checkin_count?: number;
          average_sleep?: number | null;
          average_energy?: number | null;
          average_anxiety?: number | null;
          average_focus?: number | null;
          average_mood?: number | null;
          summary?: string;
          patterns?: Json;
          recommendations?: Json;
          metadata?: Json;
          generated_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "insights_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type CheckinRow = Database["public"]["Tables"]["checkins"]["Row"];
export type CheckinInsert = Database["public"]["Tables"]["checkins"]["Insert"];
export type CheckinUpdate = Database["public"]["Tables"]["checkins"]["Update"];
export type InsightRow = Database["public"]["Tables"]["insights"]["Row"];
export type InsightInsert = Database["public"]["Tables"]["insights"]["Insert"];
export type InsightUpdate = Database["public"]["Tables"]["insights"]["Update"];
