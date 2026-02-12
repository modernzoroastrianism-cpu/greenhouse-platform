// Database types - auto-generated from Supabase schema
// Run `npx supabase gen types typescript` to regenerate

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type MemberStatus = 'pending' | 'active' | 'suspended' | 'cancelled'
export type MemberRank = 'seedling' | 'sprout' | 'grower' | 'harvester' | 'farmer' | 'cultivator'
export type KycStatus = 'pending' | 'verified' | 'rejected'
export type PackageTier = 'starter' | 'enthusiast' | 'producer' | 'commercial' | 'micro_farm'

export type AgentType = 'growing' | 'sales' | 'analytics' | 'recruiting' | 'mentor' | 'scout'
export type AgentStatus = 'active' | 'paused' | 'suspended' | 'disabled'

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type CommissionStatus = 'pending' | 'approved' | 'processing' | 'paid' | 'failed'
export type CommissionType = 'direct_sale' | 'team_bonus' | 'leadership_bonus' | 'rank_advancement' | 'pool_share'

export type ProposalStatus = 'draft' | 'voting' | 'passed' | 'rejected' | 'expired'
export type ProposalCategory = 'network_rules' | 'bounties' | 'features' | 'governance' | 'coalitions' | 'reporting'

export type PropertyStatus = 'scouted' | 'due_diligence' | 'voting' | 'acquired' | 'rejected'
export type PropertyType = 'greenhouse' | 'indoor_farm' | 'mixed_farm' | 'hydroponic' | 'land_only'

export type TicketStatus = 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'

export type PostStatus = 'active' | 'flagged' | 'hidden' | 'removed'
export type BountyStatus = 'open' | 'in_progress' | 'completed' | 'cancelled'
export type CoalitionStatus = 'pending' | 'active' | 'suspended' | 'dissolved'

export type AdminRole = 'super_admin' | 'network_admin' | 'member_admin' | 'content_admin' | 'finance_admin' | 'support_admin'

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          email: string
          name: string
          role: AdminRole
          avatar_url: string | null
          is_active: boolean
          last_login_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: AdminRole
          avatar_url?: string | null
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: AdminRole
          avatar_url?: string | null
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      members: {
        Row: {
          id: string
          auth_user_id: string | null
          email: string
          phone: string | null
          first_name: string
          last_name: string
          display_name: string | null
          avatar_url: string | null
          address_line1: string | null
          address_line2: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          country: string
          status: MemberStatus
          kyc_status: KycStatus
          rank: MemberRank
          package: PackageTier | null
          package_purchased_at: string | null
          sponsor_id: string | null
          placement_id: string | null
          placement_position: number | null
          tree_depth: number
          direct_recruits_count: number
          total_downline_count: number
          lifetime_earnings: number
          current_month_pv: number
          current_month_gv: number
          joined_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auth_user_id?: string | null
          email: string
          phone?: string | null
          first_name: string
          last_name: string
          display_name?: string | null
          avatar_url?: string | null
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string
          status?: MemberStatus
          kyc_status?: KycStatus
          rank?: MemberRank
          package?: PackageTier | null
          package_purchased_at?: string | null
          sponsor_id?: string | null
          placement_id?: string | null
          placement_position?: number | null
          tree_depth?: number
          direct_recruits_count?: number
          total_downline_count?: number
          lifetime_earnings?: number
          current_month_pv?: number
          current_month_gv?: number
          joined_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          auth_user_id?: string | null
          email?: string
          phone?: string | null
          first_name?: string
          last_name?: string
          display_name?: string | null
          avatar_url?: string | null
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string
          status?: MemberStatus
          kyc_status?: KycStatus
          rank?: MemberRank
          package?: PackageTier | null
          package_purchased_at?: string | null
          sponsor_id?: string | null
          placement_id?: string | null
          placement_position?: number | null
          tree_depth?: number
          direct_recruits_count?: number
          total_downline_count?: number
          lifetime_earnings?: number
          current_month_pv?: number
          current_month_gv?: number
          joined_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      member_signups: {
        Row: {
          id: string
          email: string
          phone: string | null
          first_name: string
          last_name: string
          package: PackageTier
          sponsor_code: string | null
          sponsor_id: string | null
          goals: string | null
          experience: string | null
          how_heard: string | null
          status: string
          reviewed_by: string | null
          reviewed_at: string | null
          rejection_reason: string | null
          converted_member_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          phone?: string | null
          first_name: string
          last_name: string
          package: PackageTier
          sponsor_code?: string | null
          sponsor_id?: string | null
          goals?: string | null
          experience?: string | null
          how_heard?: string | null
          status?: string
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          converted_member_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          first_name?: string
          last_name?: string
          package?: PackageTier
          sponsor_code?: string | null
          sponsor_id?: string | null
          goals?: string | null
          experience?: string | null
          how_heard?: string | null
          status?: string
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          converted_member_id?: string | null
          created_at?: string
        }
      }
      agents: {
        Row: {
          id: string
          member_id: string
          name: string
          type: AgentType
          emoji: string | null
          status: AgentStatus
          level: number
          reputation_score: number
          contribution_points: number
          tasks_completed: number
          posts_count: number
          bounties_completed: number
          permissions: Json
          unlocked_skills: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          member_id: string
          name: string
          type: AgentType
          emoji?: string | null
          status?: AgentStatus
          level?: number
          reputation_score?: number
          contribution_points?: number
          tasks_completed?: number
          posts_count?: number
          bounties_completed?: number
          permissions?: Json
          unlocked_skills?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          member_id?: string
          name?: string
          type?: AgentType
          emoji?: string | null
          status?: AgentStatus
          level?: number
          reputation_score?: number
          contribution_points?: number
          tasks_completed?: number
          posts_count?: number
          bounties_completed?: number
          permissions?: Json
          unlocked_skills?: Json
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          buyer_member_id: string | null
          buyer_email: string
          buyer_name: string
          seller_member_id: string
          shipping_address: Json
          shipping_method: string | null
          shipping_cost: number
          tracking_number: string | null
          subtotal: number
          tax: number
          total: number
          status: OrderStatus
          payment_status: PaymentStatus
          stripe_payment_intent_id: string | null
          paid_at: string | null
          shipped_at: string | null
          delivered_at: string | null
          customer_notes: string | null
          internal_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number?: string
          buyer_member_id?: string | null
          buyer_email: string
          buyer_name: string
          seller_member_id: string
          shipping_address: Json
          shipping_method?: string | null
          shipping_cost?: number
          tracking_number?: string | null
          subtotal: number
          tax?: number
          total: number
          status?: OrderStatus
          payment_status?: PaymentStatus
          stripe_payment_intent_id?: string | null
          paid_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          customer_notes?: string | null
          internal_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          buyer_member_id?: string | null
          buyer_email?: string
          buyer_name?: string
          seller_member_id?: string
          shipping_address?: Json
          shipping_method?: string | null
          shipping_cost?: number
          tracking_number?: string | null
          subtotal?: number
          tax?: number
          total?: number
          status?: OrderStatus
          payment_status?: PaymentStatus
          stripe_payment_intent_id?: string | null
          paid_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          customer_notes?: string | null
          internal_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      commissions: {
        Row: {
          id: string
          member_id: string
          type: CommissionType
          amount: number
          description: string | null
          source_order_id: string | null
          source_member_id: string | null
          status: CommissionStatus
          payout_batch_id: string | null
          paid_at: string | null
          stripe_transfer_id: string | null
          period_start: string | null
          period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          member_id: string
          type: CommissionType
          amount: number
          description?: string | null
          source_order_id?: string | null
          source_member_id?: string | null
          status?: CommissionStatus
          payout_batch_id?: string | null
          paid_at?: string | null
          stripe_transfer_id?: string | null
          period_start?: string | null
          period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          member_id?: string
          type?: CommissionType
          amount?: number
          description?: string | null
          source_order_id?: string | null
          source_member_id?: string | null
          status?: CommissionStatus
          payout_batch_id?: string | null
          paid_at?: string | null
          stripe_transfer_id?: string | null
          period_start?: string | null
          period_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tickets: {
        Row: {
          id: string
          ticket_number: string
          member_id: string | null
          email: string
          name: string
          subject: string
          category: string | null
          status: TicketStatus
          priority: TicketPriority
          assigned_to: string | null
          resolved_at: string | null
          resolved_by: string | null
          resolution_notes: string | null
          messages_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ticket_number?: string
          member_id?: string | null
          email: string
          name: string
          subject: string
          category?: string | null
          status?: TicketStatus
          priority?: TicketPriority
          assigned_to?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          resolution_notes?: string | null
          messages_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ticket_number?: string
          member_id?: string | null
          email?: string
          name?: string
          subject?: string
          category?: string | null
          status?: TicketStatus
          priority?: TicketPriority
          assigned_to?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          resolution_notes?: string | null
          messages_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      proposals: {
        Row: {
          id: string
          title: string
          description: string
          category: ProposalCategory
          created_by_agent_id: string | null
          created_by_admin_id: string | null
          status: ProposalStatus
          voting_starts_at: string | null
          voting_ends_at: string | null
          votes_for: number
          votes_against: number
          force_resolved_by: string | null
          force_resolved_at: string | null
          force_resolution: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: ProposalCategory
          created_by_agent_id?: string | null
          created_by_admin_id?: string | null
          status?: ProposalStatus
          voting_starts_at?: string | null
          voting_ends_at?: string | null
          votes_for?: number
          votes_against?: number
          force_resolved_by?: string | null
          force_resolved_at?: string | null
          force_resolution?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: ProposalCategory
          created_by_agent_id?: string | null
          created_by_admin_id?: string | null
          status?: ProposalStatus
          voting_starts_at?: string | null
          voting_ends_at?: string | null
          votes_for?: number
          votes_against?: number
          force_resolved_by?: string | null
          force_resolved_at?: string | null
          force_resolution?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          name: string
          location: string
          type: PropertyType
          price: number
          size: string | null
          status: PropertyStatus
          roi_estimate: number | null
          roi_actual: number | null
          notes: string | null
          scouted_by_agent_id: string | null
          scouted_at: string | null
          votes_for: number
          votes_against: number
          voting_ends_at: string | null
          acquired_at: string | null
          acquisition_cost: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          type: PropertyType
          price: number
          size?: string | null
          status?: PropertyStatus
          roi_estimate?: number | null
          roi_actual?: number | null
          notes?: string | null
          scouted_by_agent_id?: string | null
          scouted_at?: string | null
          votes_for?: number
          votes_against?: number
          voting_ends_at?: string | null
          acquired_at?: string | null
          acquisition_cost?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          type?: PropertyType
          price?: number
          size?: string | null
          status?: PropertyStatus
          roi_estimate?: number | null
          roi_actual?: number | null
          notes?: string | null
          scouted_by_agent_id?: string | null
          scouted_at?: string | null
          votes_for?: number
          votes_against?: number
          voting_ends_at?: string | null
          acquired_at?: string | null
          acquisition_cost?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          member_id: string
          name: string
          description: string | null
          category_id: string | null
          price: number
          compare_price: number | null
          sku: string | null
          stock_quantity: number
          track_inventory: boolean
          status: string
          approved_at: string | null
          approved_by: string | null
          images: Json
          views_count: number
          orders_count: number
          rating_avg: number | null
          reviews_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          member_id: string
          name: string
          description?: string | null
          category_id?: string | null
          price: number
          compare_price?: number | null
          sku?: string | null
          stock_quantity?: number
          track_inventory?: boolean
          status?: string
          approved_at?: string | null
          approved_by?: string | null
          images?: Json
          views_count?: number
          orders_count?: number
          rating_avg?: number | null
          reviews_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          member_id?: string
          name?: string
          description?: string | null
          category_id?: string | null
          price?: number
          compare_price?: number | null
          sku?: string | null
          stock_quantity?: number
          track_inventory?: boolean
          status?: string
          approved_at?: string | null
          approved_by?: string | null
          images?: Json
          views_count?: number
          orders_count?: number
          rating_avg?: number | null
          reviews_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          agent_id: string
          content: string
          post_type: string
          likes_count: number
          comments_count: number
          shares_count: number
          status: PostStatus
          flagged_reason: string | null
          moderated_by: string | null
          moderated_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          content: string
          post_type?: string
          likes_count?: number
          comments_count?: number
          shares_count?: number
          status?: PostStatus
          flagged_reason?: string | null
          moderated_by?: string | null
          moderated_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          content?: string
          post_type?: string
          likes_count?: number
          comments_count?: number
          shares_count?: number
          status?: PostStatus
          flagged_reason?: string | null
          moderated_by?: string | null
          moderated_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bounties: {
        Row: {
          id: string
          created_by_agent_id: string | null
          created_by_member_id: string | null
          title: string
          description: string
          category: string | null
          reward_credits: number
          reward_type: string
          status: BountyStatus
          expires_at: string | null
          completed_by_agent_id: string | null
          completed_at: string | null
          applicants_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          created_by_agent_id?: string | null
          created_by_member_id?: string | null
          title: string
          description: string
          category?: string | null
          reward_credits: number
          reward_type?: string
          status?: BountyStatus
          expires_at?: string | null
          completed_by_agent_id?: string | null
          completed_at?: string | null
          applicants_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          created_by_agent_id?: string | null
          created_by_member_id?: string | null
          title?: string
          description?: string
          category?: string | null
          reward_credits?: number
          reward_type?: string
          status?: BountyStatus
          expires_at?: string | null
          completed_by_agent_id?: string | null
          completed_at?: string | null
          applicants_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      coalitions: {
        Row: {
          id: string
          name: string
          description: string | null
          focus: string | null
          emoji: string | null
          status: CoalitionStatus
          members_count: number
          total_savings: number
          approved_by: string | null
          approved_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          focus?: string | null
          emoji?: string | null
          status?: CoalitionStatus
          members_count?: number
          total_savings?: number
          approved_by?: string | null
          approved_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          focus?: string | null
          emoji?: string | null
          status?: CoalitionStatus
          members_count?: number
          total_savings?: number
          approved_by?: string | null
          approved_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          admin_id: string | null
          admin_email: string | null
          action: string
          resource_type: string
          resource_id: string | null
          description: string | null
          old_values: Json | null
          new_values: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          admin_id?: string | null
          admin_email?: string | null
          action: string
          resource_type: string
          resource_id?: string | null
          description?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          admin_id?: string | null
          admin_email?: string | null
          action?: string
          resource_type?: string
          resource_id?: string | null
          description?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      settings: {
        Row: {
          key: string
          value: Json
          description: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          key: string
          value: Json
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          key?: string
          value?: Json
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      member_status: MemberStatus
      member_rank: MemberRank
      kyc_status: KycStatus
      package_tier: PackageTier
      agent_type: AgentType
      agent_status: AgentStatus
      order_status: OrderStatus
      payment_status: PaymentStatus
      commission_status: CommissionStatus
      commission_type: CommissionType
      proposal_status: ProposalStatus
      proposal_category: ProposalCategory
      property_status: PropertyStatus
      property_type: PropertyType
      ticket_status: TicketStatus
      ticket_priority: TicketPriority
      post_status: PostStatus
      bounty_status: BountyStatus
      coalition_status: CoalitionStatus
      admin_role: AdminRole
    }
  }
}
