// Database types generated from Supabase schema
// Run: npx supabase gen types typescript --local > src/types/database.ts

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
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          level: 'Beginner' | 'Intermediate' | 'Advanced';
          units: 'metric' | 'imperial';
          theme: 'light' | 'dark' | 'system';
          week_starts_on: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          level?: 'Beginner' | 'Intermediate' | 'Advanced';
          units?: 'metric' | 'imperial';
          theme?: 'light' | 'dark' | 'system';
          week_starts_on?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          level?: 'Beginner' | 'Intermediate' | 'Advanced';
          units?: 'metric' | 'imperial';
          theme?: 'light' | 'dark' | 'system';
          week_starts_on?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      exercises: {
        Row: {
          id: string;
          name: string;
          muscle_group: string;
          secondary_muscles: string[];
          equipment: string[];
          difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
          instructions: string[];
          video_url: string | null;
          is_custom: boolean;
          user_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          muscle_group: string;
          secondary_muscles?: string[];
          equipment?: string[];
          difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
          instructions?: string[];
          video_url?: string | null;
          is_custom?: boolean;
          user_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          muscle_group?: string;
          secondary_muscles?: string[];
          equipment?: string[];
          difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
          instructions?: string[];
          video_url?: string | null;
          is_custom?: boolean;
          user_id?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "exercises_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      workouts: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          description: string | null;
          type: 'Strength' | 'Cardio' | 'HIIT' | 'Yoga' | 'Mobility' | 'Custom';
          level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
          duration_minutes: number | null;
          sessions_per_week: number | null;
          total_sessions: number | null;
          is_public: boolean;
          is_template: boolean;
          tags: string[];
          color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          description?: string | null;
          type?: 'Strength' | 'Cardio' | 'HIIT' | 'Yoga' | 'Mobility' | 'Custom';
          level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
          duration_minutes?: number | null;
          sessions_per_week?: number | null;
          total_sessions?: number | null;
          is_public?: boolean;
          is_template?: boolean;
          tags?: string[];
          color?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          description?: string | null;
          type?: 'Strength' | 'Cardio' | 'HIIT' | 'Yoga' | 'Mobility' | 'Custom';
          level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
          duration_minutes?: number | null;
          sessions_per_week?: number | null;
          total_sessions?: number | null;
          is_public?: boolean;
          is_template?: boolean;
          tags?: string[];
          color?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      workout_exercises: {
        Row: {
          id: string;
          workout_id: string;
          exercise_id: string;
          order_index: number;
          sets: number;
          reps_target: string;
          rest_seconds: number;
          notes: string | null;
          superset_group: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          workout_id: string;
          exercise_id: string;
          order_index: number;
          sets?: number;
          reps_target?: string;
          rest_seconds?: number;
          notes?: string | null;
          superset_group?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          workout_id?: string;
          exercise_id?: string;
          order_index?: number;
          sets?: number;
          reps_target?: string;
          rest_seconds?: number;
          notes?: string | null;
          superset_group?: number | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workout_exercises_workout_id_fkey";
            columns: ["workout_id"];
            isOneToOne: false;
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workout_exercises_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          }
        ];
      };
      workout_sessions: {
        Row: {
          id: string;
          user_id: string;
          workout_id: string | null;
          name: string | null;
          status: 'in_progress' | 'completed' | 'paused' | 'cancelled';
          started_at: string;
          completed_at: string | null;
          duration_seconds: number | null;
          total_volume_lbs: number | null;
          total_volume_kg: number | null;
          calories_burned: number | null;
          avg_heart_rate: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          workout_id?: string | null;
          name?: string | null;
          status?: 'in_progress' | 'completed' | 'paused' | 'cancelled';
          started_at?: string;
          completed_at?: string | null;
          duration_seconds?: number | null;
          total_volume_lbs?: number | null;
          total_volume_kg?: number | null;
          calories_burned?: number | null;
          avg_heart_rate?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          workout_id?: string | null;
          name?: string | null;
          status?: 'in_progress' | 'completed' | 'paused' | 'cancelled';
          started_at?: string;
          completed_at?: string | null;
          duration_seconds?: number | null;
          total_volume_lbs?: number | null;
          total_volume_kg?: number | null;
          calories_burned?: number | null;
          avg_heart_rate?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workout_sessions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workout_sessions_workout_id_fkey";
            columns: ["workout_id"];
            isOneToOne: false;
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          }
        ];
      };
      sets: {
        Row: {
          id: string;
          session_id: string;
          workout_exercise_id: string | null;
          exercise_id: string;
          set_number: number;
          weight_lbs: number | null;
          weight_kg: number | null;
          reps: number | null;
          rpe: number | null;
          rest_seconds: number | null;
          completed: boolean;
          completed_at: string | null;
          is_warmup: boolean;
          is_dropset: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          workout_exercise_id?: string | null;
          exercise_id: string;
          set_number: number;
          weight_lbs?: number | null;
          weight_kg?: number | null;
          reps?: number | null;
          rpe?: number | null;
          rest_seconds?: number | null;
          completed?: boolean;
          completed_at?: string | null;
          is_warmup?: boolean;
          is_dropset?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          workout_exercise_id?: string | null;
          exercise_id?: string;
          set_number?: number;
          weight_lbs?: number | null;
          weight_kg?: number | null;
          reps?: number | null;
          rpe?: number | null;
          rest_seconds?: number | null;
          completed?: boolean;
          completed_at?: string | null;
          is_warmup?: boolean;
          is_dropset?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sets_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "workout_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sets_workout_exercise_id_fkey";
            columns: ["workout_exercise_id"];
            isOneToOne: false;
            referencedRelation: "workout_exercises";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sets_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          }
        ];
      };
      achievements: {
        Row: {
          id: string;
          key: string;
          name: string;
          description: string | null;
          icon: string | null;
          color: string | null;
          target_value: number;
          target_type: 'count' | 'streak' | 'volume' | 'weight' | 'duration' | 'distance';
          category: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          name: string;
          description?: string | null;
          icon?: string | null;
          color?: string | null;
          target_value: number;
          target_type: 'count' | 'streak' | 'volume' | 'weight' | 'duration' | 'distance';
          category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          name?: string;
          description?: string | null;
          icon?: string | null;
          color?: string | null;
          target_value?: number;
          target_type?: 'count' | 'streak' | 'volume' | 'weight' | 'duration' | 'distance';
          category?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          progress: number;
          unlocked_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
          progress?: number;
          unlocked_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_id?: string;
          progress?: number;
          unlocked_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_achievements_achievement_id_fkey";
            columns: ["achievement_id"];
            isOneToOne: false;
            referencedRelation: "achievements";
            referencedColumns: ["id"];
          }
        ];
      };
      user_settings: {
        Row: {
          user_id: string;
          workout_reminders: boolean;
          progress_updates: boolean;
          achievement_alerts: boolean;
          social_activity: boolean;
          marketing_emails: boolean;
          auto_rest_timer: boolean;
          haptic_feedback: boolean;
          voice_cues: boolean;
          auto_progress_tracking: boolean;
          rest_day_reminders: boolean;
          profile_visibility: 'public' | 'friends' | 'private';
          updated_at: string;
        };
        Insert: {
          user_id: string;
          workout_reminders?: boolean;
          progress_updates?: boolean;
          achievement_alerts?: boolean;
          social_activity?: boolean;
          marketing_emails?: boolean;
          auto_rest_timer?: boolean;
          haptic_feedback?: boolean;
          voice_cues?: boolean;
          auto_progress_tracking?: boolean;
          rest_day_reminders?: boolean;
          profile_visibility?: 'public' | 'friends' | 'private';
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          workout_reminders?: boolean;
          progress_updates?: boolean;
          achievement_alerts?: boolean;
          social_activity?: boolean;
          marketing_emails?: boolean;
          auto_rest_timer?: boolean;
          haptic_feedback?: boolean;
          voice_cues?: boolean;
          auto_progress_tracking?: boolean;
          rest_day_reminders?: boolean;
          profile_visibility?: 'public' | 'friends' | 'private';
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      body_metrics: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          weight_lbs: number | null;
          weight_kg: number | null;
          body_fat_pct: number | null;
          muscle_mass_lbs: number | null;
          muscle_mass_kg: number | null;
          chest_cm: number | null;
          waist_cm: number | null;
          hips_cm: number | null;
          bicep_cm: number | null;
          thigh_cm: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          weight_lbs?: number | null;
          weight_kg?: number | null;
          body_fat_pct?: number | null;
          muscle_mass_lbs?: number | null;
          muscle_mass_kg?: number | null;
          chest_cm?: number | null;
          waist_cm?: number | null;
          hips_cm?: number | null;
          bicep_cm?: number | null;
          thigh_cm?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          weight_lbs?: number | null;
          weight_kg?: number | null;
          body_fat_pct?: number | null;
          muscle_mass_lbs?: number | null;
          muscle_mass_kg?: number | null;
          chest_cm?: number | null;
          waist_cm?: number | null;
          hips_cm?: number | null;
          bicep_cm?: number | null;
          thigh_cm?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "body_metrics_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      handle_updated_at: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      handle_new_user_settings: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Convenience types for app usage
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type Exercise = Database['public']['Tables']['exercises']['Row'];
export type ExerciseInsert = Database['public']['Tables']['exercises']['Insert'];
export type ExerciseUpdate = Database['public']['Tables']['exercises']['Update'];

export type Workout = Database['public']['Tables']['workouts']['Row'];
export type WorkoutInsert = Database['public']['Tables']['workouts']['Insert'];
export type WorkoutUpdate = Database['public']['Tables']['workouts']['Update'];

export type WorkoutExercise = Database['public']['Tables']['workout_exercises']['Row'];
export type WorkoutExerciseInsert = Database['public']['Tables']['workout_exercises']['Insert'];
export type WorkoutExerciseUpdate = Database['public']['Tables']['workout_exercises']['Update'];

export type WorkoutSession = Database['public']['Tables']['workout_sessions']['Row'];
export type WorkoutSessionInsert = Database['public']['Tables']['workout_sessions']['Insert'];
export type WorkoutSessionUpdate = Database['public']['Tables']['workout_sessions']['Update'];

export type Set = Database['public']['Tables']['sets']['Row'];
export type SetInsert = Database['public']['Tables']['sets']['Insert'];
export type SetUpdate = Database['public']['Tables']['sets']['Update'];

export type Achievement = Database['public']['Tables']['achievements']['Row'];
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row'];

export type UserSettings = Database['public']['Tables']['user_settings']['Row'];
export type UserSettingsUpdate = Database['public']['Tables']['user_settings']['Update'];

export type BodyMetric = Database['public']['Tables']['body_metrics']['Row'];
export type BodyMetricInsert = Database['public']['Tables']['body_metrics']['Insert'];
export type BodyMetricUpdate = Database['public']['Tables']['body_metrics']['Update'];