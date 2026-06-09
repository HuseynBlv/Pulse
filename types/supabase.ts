export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      daily_checkins: {
        Row: {
          id: string;
          check_in_date: string;
          sleep: number;
          energy: number;
          anxiety: number;
          focus: number;
          mood: number;
          note: string | null;
          user_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          check_in_date: string;
          sleep: number;
          energy: number;
          anxiety: number;
          focus: number;
          mood: number;
          note?: string | null;
          user_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          check_in_date?: string;
          sleep?: number;
          energy?: number;
          anxiety?: number;
          focus?: number;
          mood?: number;
          note?: string | null;
          user_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
