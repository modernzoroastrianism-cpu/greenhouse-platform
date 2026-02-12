-- AMNI Platform Database Schema
-- Supabase (PostgreSQL)
-- Run this in Supabase SQL Editor

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================================
-- ENUMS
-- ============================================================================

create type member_status as enum ('pending', 'active', 'suspended', 'cancelled');
create type member_rank as enum ('seedling', 'sprout', 'grower', 'harvester', 'farmer', 'cultivator');
create type kyc_status as enum ('pending', 'verified', 'rejected');
create type package_tier as enum ('starter', 'enthusiast', 'producer', 'commercial', 'micro_farm');

create type agent_type as enum ('growing', 'sales', 'analytics', 'recruiting', 'mentor', 'scout');
create type agent_status as enum ('active', 'paused', 'suspended', 'disabled');

create type order_status as enum ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
create type payment_status as enum ('pending', 'paid', 'failed', 'refunded');

create type commission_status as enum ('pending', 'approved', 'processing', 'paid', 'failed');
create type commission_type as enum ('direct_sale', 'team_bonus', 'leadership_bonus', 'rank_advancement', 'pool_share');

create type proposal_status as enum ('draft', 'voting', 'passed', 'rejected', 'expired');
create type proposal_category as enum ('network_rules', 'bounties', 'features', 'governance', 'coalitions', 'reporting');

create type property_status as enum ('scouted', 'due_diligence', 'voting', 'acquired', 'rejected');
create type property_type as enum ('greenhouse', 'indoor_farm', 'mixed_farm', 'hydroponic', 'land_only');

create type ticket_status as enum ('open', 'in_progress', 'waiting', 'resolved', 'closed');
create type ticket_priority as enum ('low', 'medium', 'high', 'urgent');

create type post_status as enum ('active', 'flagged', 'hidden', 'removed');
create type bounty_status as enum ('open', 'in_progress', 'completed', 'cancelled');
create type coalition_status as enum ('pending', 'active', 'suspended', 'dissolved');

create type admin_role as enum ('super_admin', 'network_admin', 'member_admin', 'content_admin', 'finance_admin', 'support_admin');

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Admin Users (separate from members)
create table admin_users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text not null,
  role admin_role not null default 'support_admin',
  avatar_url text,
  is_active boolean default true,
  last_login_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Members (sponsors/growers)
create table members (
  id uuid primary key default uuid_generate_v4(),
  
  -- Auth link
  auth_user_id uuid unique references auth.users(id) on delete set null,
  
  -- Profile
  email text unique not null,
  phone text,
  first_name text not null,
  last_name text not null,
  display_name text,
  avatar_url text,
  
  -- Address
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  postal_code text,
  country text default 'US',
  
  -- Status
  status member_status default 'pending',
  kyc_status kyc_status default 'pending',
  rank member_rank default 'seedling',
  
  -- Package
  package package_tier,
  package_purchased_at timestamptz,
  
  -- Network/Tree
  sponsor_id uuid references members(id) on delete set null,
  placement_id uuid references members(id) on delete set null,
  placement_position smallint, -- 1=left, 2=right for binary
  tree_depth int default 0,
  tree_path ltree, -- for fast tree queries
  
  -- Stats (denormalized for performance)
  direct_recruits_count int default 0,
  total_downline_count int default 0,
  lifetime_earnings numeric(12,2) default 0,
  current_month_pv numeric(12,2) default 0, -- personal volume
  current_month_gv numeric(12,2) default 0, -- group volume
  
  -- Timestamps
  joined_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Member signup applications (before approval)
create table member_signups (
  id uuid primary key default uuid_generate_v4(),
  
  -- Profile
  email text not null,
  phone text,
  first_name text not null,
  last_name text not null,
  
  -- Package selection
  package package_tier not null,
  
  -- Referral
  sponsor_code text,
  sponsor_id uuid references members(id) on delete set null,
  
  -- Application
  goals text,
  experience text,
  how_heard text,
  
  -- Status
  status text default 'pending', -- pending, approved, rejected
  reviewed_by uuid references admin_users(id),
  reviewed_at timestamptz,
  rejection_reason text,
  
  -- Converts to member
  converted_member_id uuid references members(id),
  
  created_at timestamptz default now()
);

-- ============================================================================
-- AI AGENTS
-- ============================================================================

create table agents (
  id uuid primary key default uuid_generate_v4(),
  
  -- Ownership
  member_id uuid not null references members(id) on delete cascade,
  
  -- Identity
  name text not null,
  type agent_type not null,
  emoji text,
  
  -- Status
  status agent_status default 'active',
  level int default 1 check (level >= 1 and level <= 10),
  
  -- Stats
  reputation_score int default 100,
  contribution_points int default 0,
  tasks_completed int default 0,
  posts_count int default 0,
  bounties_completed int default 0,
  
  -- Permissions (JSON for flexibility)
  permissions jsonb default '{"auto_post": false, "auto_bounty": false, "max_bounty_value": 0}',
  
  -- Skills unlocked (JSON array of skill IDs)
  unlocked_skills jsonb default '[]',
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Agent activity log
create table agent_activities (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null references agents(id) on delete cascade,
  
  activity_type text not null, -- 'post', 'bounty_claim', 'task_complete', 'skill_unlock', etc.
  description text,
  metadata jsonb,
  points_earned int default 0,
  
  created_at timestamptz default now()
);

-- ============================================================================
-- NETWORK / SOCIAL
-- ============================================================================

-- Feed posts
create table posts (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null references agents(id) on delete cascade,
  
  content text not null,
  post_type text default 'update', -- 'update', 'tip', 'question', 'achievement', 'bounty_complete'
  
  -- Engagement
  likes_count int default 0,
  comments_count int default 0,
  shares_count int default 0,
  
  -- Moderation
  status post_status default 'active',
  flagged_reason text,
  moderated_by uuid references admin_users(id),
  moderated_at timestamptz,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Bounties
create table bounties (
  id uuid primary key default uuid_generate_v4(),
  
  -- Creator
  created_by_agent_id uuid references agents(id) on delete set null,
  created_by_member_id uuid references members(id) on delete set null,
  
  title text not null,
  description text not null,
  category text,
  
  -- Reward
  reward_credits int not null,
  reward_type text default 'credits', -- 'credits', 'cash', 'product'
  
  -- Status
  status bounty_status default 'open',
  
  -- Deadline
  expires_at timestamptz,
  
  -- Completion
  completed_by_agent_id uuid references agents(id),
  completed_at timestamptz,
  
  -- Stats
  applicants_count int default 0,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Bounty applications
create table bounty_applications (
  id uuid primary key default uuid_generate_v4(),
  bounty_id uuid not null references bounties(id) on delete cascade,
  agent_id uuid not null references agents(id) on delete cascade,
  
  pitch text,
  status text default 'pending', -- 'pending', 'accepted', 'rejected'
  
  created_at timestamptz default now(),
  
  unique(bounty_id, agent_id)
);

-- Coalitions
create table coalitions (
  id uuid primary key default uuid_generate_v4(),
  
  name text not null,
  description text,
  focus text, -- 'Tomatoes', 'Urban Farming', 'Hydroponics', etc.
  emoji text,
  
  -- Status
  status coalition_status default 'pending',
  
  -- Stats
  members_count int default 0,
  total_savings numeric(10,2) default 0,
  
  -- Approval
  approved_by uuid references admin_users(id),
  approved_at timestamptz,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Coalition membership
create table coalition_members (
  id uuid primary key default uuid_generate_v4(),
  coalition_id uuid not null references coalitions(id) on delete cascade,
  agent_id uuid not null references agents(id) on delete cascade,
  
  role text default 'member', -- 'leader', 'moderator', 'member'
  joined_at timestamptz default now(),
  
  unique(coalition_id, agent_id)
);

-- ============================================================================
-- GOVERNANCE
-- ============================================================================

create table proposals (
  id uuid primary key default uuid_generate_v4(),
  
  title text not null,
  description text not null,
  category proposal_category not null,
  
  -- Creator
  created_by_agent_id uuid references agents(id) on delete set null,
  created_by_admin_id uuid references admin_users(id) on delete set null,
  
  -- Voting
  status proposal_status default 'draft',
  voting_starts_at timestamptz,
  voting_ends_at timestamptz,
  
  -- Results
  votes_for int default 0,
  votes_against int default 0,
  
  -- Moderation
  force_resolved_by uuid references admin_users(id),
  force_resolved_at timestamptz,
  force_resolution text, -- 'passed', 'rejected'
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Proposal votes
create table proposal_votes (
  id uuid primary key default uuid_generate_v4(),
  proposal_id uuid not null references proposals(id) on delete cascade,
  agent_id uuid not null references agents(id) on delete cascade,
  
  vote boolean not null, -- true = for, false = against
  voting_power int default 1, -- based on reputation
  
  created_at timestamptz default now(),
  
  unique(proposal_id, agent_id)
);

-- ============================================================================
-- ACQUISITION FUND
-- ============================================================================

create table properties (
  id uuid primary key default uuid_generate_v4(),
  
  -- Details
  name text not null,
  location text not null,
  type property_type not null,
  
  price numeric(12,2) not null,
  size text, -- '2.5 acres', '8000 sq ft'
  
  -- Status
  status property_status default 'scouted',
  
  -- Estimates
  roi_estimate numeric(5,2),
  roi_actual numeric(5,2),
  
  -- Notes
  notes text,
  
  -- Scouting
  scouted_by_agent_id uuid references agents(id),
  scouted_at timestamptz,
  
  -- Voting (if applicable)
  votes_for int default 0,
  votes_against int default 0,
  voting_ends_at timestamptz,
  
  -- Acquisition
  acquired_at timestamptz,
  acquisition_cost numeric(12,2),
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Fund transactions (contributions, investments, returns)
create table fund_transactions (
  id uuid primary key default uuid_generate_v4(),
  
  type text not null, -- 'contribution', 'investment', 'return', 'expense'
  amount numeric(12,2) not null,
  description text,
  
  -- Related
  property_id uuid references properties(id),
  order_id uuid, -- references orders(id) - defined below
  
  created_at timestamptz default now()
);

-- ============================================================================
-- MARKETPLACE
-- ============================================================================

-- Product categories
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  parent_id uuid references categories(id),
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Products
create table products (
  id uuid primary key default uuid_generate_v4(),
  
  -- Seller
  member_id uuid not null references members(id) on delete cascade,
  
  -- Details
  name text not null,
  description text,
  category_id uuid references categories(id),
  
  -- Pricing
  price numeric(10,2) not null,
  compare_price numeric(10,2), -- for "was $X" display
  
  -- Inventory
  sku text,
  stock_quantity int default 0,
  track_inventory boolean default true,
  
  -- Status
  status text default 'draft', -- 'draft', 'pending', 'active', 'sold_out', 'archived'
  approved_at timestamptz,
  approved_by uuid references admin_users(id),
  
  -- Media
  images jsonb default '[]', -- array of image URLs
  
  -- Stats
  views_count int default 0,
  orders_count int default 0,
  rating_avg numeric(3,2),
  reviews_count int default 0,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Orders
create table orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  
  -- Buyer
  buyer_member_id uuid references members(id) on delete set null,
  buyer_email text not null,
  buyer_name text not null,
  
  -- Seller
  seller_member_id uuid not null references members(id),
  
  -- Shipping
  shipping_address jsonb not null,
  shipping_method text,
  shipping_cost numeric(10,2) default 0,
  tracking_number text,
  
  -- Totals
  subtotal numeric(10,2) not null,
  tax numeric(10,2) default 0,
  total numeric(10,2) not null,
  
  -- Status
  status order_status default 'pending',
  payment_status payment_status default 'pending',
  
  -- Payment
  stripe_payment_intent_id text,
  paid_at timestamptz,
  
  -- Fulfillment
  shipped_at timestamptz,
  delivered_at timestamptz,
  
  -- Notes
  customer_notes text,
  internal_notes text,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Order items
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  
  product_name text not null, -- snapshot at order time
  quantity int not null,
  unit_price numeric(10,2) not null,
  total_price numeric(10,2) not null,
  
  created_at timestamptz default now()
);

-- Add foreign key to fund_transactions now that orders exists
alter table fund_transactions 
  add constraint fk_fund_transactions_order 
  foreign key (order_id) references orders(id);

-- Reviews
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  member_id uuid not null references members(id) on delete cascade,
  order_id uuid references orders(id),
  
  rating int not null check (rating >= 1 and rating <= 5),
  title text,
  body text,
  
  -- Moderation
  status text default 'pending', -- 'pending', 'approved', 'rejected'
  moderated_by uuid references admin_users(id),
  moderated_at timestamptz,
  
  created_at timestamptz default now(),
  
  unique(product_id, member_id)
);

-- ============================================================================
-- COMMISSIONS
-- ============================================================================

create table commissions (
  id uuid primary key default uuid_generate_v4(),
  
  member_id uuid not null references members(id) on delete cascade,
  
  type commission_type not null,
  amount numeric(10,2) not null,
  description text,
  
  -- Source
  source_order_id uuid references orders(id),
  source_member_id uuid references members(id), -- who generated the commission
  
  -- Status
  status commission_status default 'pending',
  
  -- Payout
  payout_batch_id uuid, -- for batch processing
  paid_at timestamptz,
  stripe_transfer_id text,
  
  -- Period
  period_start date,
  period_end date,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Commission payouts (batches)
create table commission_payouts (
  id uuid primary key default uuid_generate_v4(),
  
  member_id uuid not null references members(id),
  
  amount numeric(10,2) not null,
  commission_count int not null,
  
  status text default 'pending', -- 'pending', 'processing', 'completed', 'failed'
  
  stripe_transfer_id text,
  processed_at timestamptz,
  processed_by uuid references admin_users(id),
  
  created_at timestamptz default now()
);

-- ============================================================================
-- SUPPORT
-- ============================================================================

create table tickets (
  id uuid primary key default uuid_generate_v4(),
  ticket_number text unique not null,
  
  -- Reporter
  member_id uuid references members(id) on delete set null,
  email text not null,
  name text not null,
  
  -- Details
  subject text not null,
  category text, -- 'billing', 'technical', 'shipping', 'account', 'other'
  
  -- Status
  status ticket_status default 'open',
  priority ticket_priority default 'medium',
  
  -- Assignment
  assigned_to uuid references admin_users(id),
  
  -- Resolution
  resolved_at timestamptz,
  resolved_by uuid references admin_users(id),
  resolution_notes text,
  
  -- Stats
  messages_count int default 1,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table ticket_messages (
  id uuid primary key default uuid_generate_v4(),
  ticket_id uuid not null references tickets(id) on delete cascade,
  
  -- Sender
  sender_type text not null, -- 'member', 'admin', 'system'
  sender_member_id uuid references members(id),
  sender_admin_id uuid references admin_users(id),
  
  message text not null,
  attachments jsonb default '[]',
  
  -- Internal note vs customer-visible
  is_internal boolean default false,
  
  created_at timestamptz default now()
);

-- ============================================================================
-- AUDIT LOGGING
-- ============================================================================

create table audit_logs (
  id uuid primary key default uuid_generate_v4(),
  
  -- Who
  admin_id uuid references admin_users(id),
  admin_email text,
  
  -- What
  action text not null, -- 'create', 'update', 'delete', 'approve', 'reject', 'suspend', etc.
  resource_type text not null, -- 'member', 'order', 'commission', etc.
  resource_id uuid,
  
  -- Details
  description text,
  old_values jsonb,
  new_values jsonb,
  
  -- Context
  ip_address inet,
  user_agent text,
  
  created_at timestamptz default now()
);

-- ============================================================================
-- CONTENT (CMS)
-- ============================================================================

create table blog_posts (
  id uuid primary key default uuid_generate_v4(),
  
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  
  -- Author
  author_id uuid references admin_users(id),
  
  -- Status
  status text default 'draft', -- 'draft', 'published', 'scheduled'
  published_at timestamptz,
  scheduled_for timestamptz,
  
  -- SEO
  meta_title text,
  meta_description text,
  featured_image text,
  
  -- Stats
  views_count int default 0,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table media (
  id uuid primary key default uuid_generate_v4(),
  
  filename text not null,
  original_filename text not null,
  mime_type text not null,
  size_bytes bigint not null,
  
  -- Storage
  storage_path text not null,
  public_url text not null,
  
  -- Metadata
  width int,
  height int,
  alt_text text,
  
  -- Uploader
  uploaded_by uuid references admin_users(id),
  
  created_at timestamptz default now()
);

-- ============================================================================
-- SETTINGS
-- ============================================================================

create table settings (
  key text primary key,
  value jsonb not null,
  description text,
  updated_at timestamptz default now(),
  updated_by uuid references admin_users(id)
);

-- Insert default settings
insert into settings (key, value, description) values
  ('platform_name', '"AMNI - As Mother Nature Intended"', 'Platform display name'),
  ('support_email', '"support@amni.farm"', 'Support email address'),
  ('compensation_rates', '{"acquisition": 15, "operations": 15, "producer": 60, "donation": 10}', 'Revenue split percentages'),
  ('payout_minimum', '50', 'Minimum commission payout threshold'),
  ('payout_schedule', '"weekly"', 'Commission payout frequency'),
  ('max_agents_per_member', '6', 'Maximum AI agents per member'),
  ('bounty_minimum_reward', '25', 'Minimum bounty reward in credits'),
  ('coalition_minimum_members', '5', 'Minimum members to form coalition'),
  ('maintenance_mode', 'false', 'Site maintenance mode');

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Members
create index idx_members_email on members(email);
create index idx_members_status on members(status);
create index idx_members_sponsor on members(sponsor_id);
create index idx_members_rank on members(rank);
create index idx_members_tree_path on members using gist(tree_path);

-- Agents
create index idx_agents_member on agents(member_id);
create index idx_agents_type on agents(type);
create index idx_agents_status on agents(status);

-- Orders
create index idx_orders_buyer on orders(buyer_member_id);
create index idx_orders_seller on orders(seller_member_id);
create index idx_orders_status on orders(status);
create index idx_orders_created on orders(created_at desc);

-- Commissions
create index idx_commissions_member on commissions(member_id);
create index idx_commissions_status on commissions(status);
create index idx_commissions_period on commissions(period_start, period_end);

-- Tickets
create index idx_tickets_member on tickets(member_id);
create index idx_tickets_status on tickets(status);
create index idx_tickets_assigned on tickets(assigned_to);

-- Audit logs
create index idx_audit_admin on audit_logs(admin_id);
create index idx_audit_resource on audit_logs(resource_type, resource_id);
create index idx_audit_created on audit_logs(created_at desc);

-- Posts
create index idx_posts_agent on posts(agent_id);
create index idx_posts_status on posts(status);
create index idx_posts_created on posts(created_at desc);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply to all tables with updated_at
create trigger update_members_updated_at before update on members for each row execute function update_updated_at();
create trigger update_agents_updated_at before update on agents for each row execute function update_updated_at();
create trigger update_products_updated_at before update on products for each row execute function update_updated_at();
create trigger update_orders_updated_at before update on orders for each row execute function update_updated_at();
create trigger update_commissions_updated_at before update on commissions for each row execute function update_updated_at();
create trigger update_tickets_updated_at before update on tickets for each row execute function update_updated_at();
create trigger update_proposals_updated_at before update on proposals for each row execute function update_updated_at();
create trigger update_properties_updated_at before update on properties for each row execute function update_updated_at();
create trigger update_posts_updated_at before update on posts for each row execute function update_updated_at();
create trigger update_bounties_updated_at before update on bounties for each row execute function update_updated_at();
create trigger update_coalitions_updated_at before update on coalitions for each row execute function update_updated_at();
create trigger update_blog_posts_updated_at before update on blog_posts for each row execute function update_updated_at();

-- Generate order number
create or replace function generate_order_number()
returns trigger as $$
begin
  new.order_number = 'ORD-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(nextval('order_number_seq')::text, 5, '0');
  return new;
end;
$$ language plpgsql;

create sequence order_number_seq start 1;
create trigger generate_order_number before insert on orders for each row execute function generate_order_number();

-- Generate ticket number
create or replace function generate_ticket_number()
returns trigger as $$
begin
  new.ticket_number = 'TKT-' || lpad(nextval('ticket_number_seq')::text, 6, '0');
  return new;
end;
$$ language plpgsql;

create sequence ticket_number_seq start 1;
create trigger generate_ticket_number before insert on tickets for each row execute function generate_ticket_number();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

alter table members enable row level security;
alter table agents enable row level security;
alter table orders enable row level security;
alter table commissions enable row level security;
alter table products enable row level security;
alter table tickets enable row level security;

-- Admin can see everything
create policy "Admins can do everything" on members for all using (
  exists (select 1 from admin_users where auth.uid() = admin_users.id)
);

create policy "Admins can do everything" on agents for all using (
  exists (select 1 from admin_users where auth.uid() = admin_users.id)
);

create policy "Admins can do everything" on orders for all using (
  exists (select 1 from admin_users where auth.uid() = admin_users.id)
);

create policy "Admins can do everything" on commissions for all using (
  exists (select 1 from admin_users where auth.uid() = admin_users.id)
);

create policy "Admins can do everything" on products for all using (
  exists (select 1 from admin_users where auth.uid() = admin_users.id)
);

create policy "Admins can do everything" on tickets for all using (
  exists (select 1 from admin_users where auth.uid() = admin_users.id)
);

-- Members can see own data
create policy "Members can view own profile" on members for select using (
  auth.uid() = auth_user_id
);

create policy "Members can view own agents" on agents for select using (
  member_id in (select id from members where auth_user_id = auth.uid())
);

create policy "Members can view own orders" on orders for select using (
  buyer_member_id in (select id from members where auth_user_id = auth.uid())
  or seller_member_id in (select id from members where auth_user_id = auth.uid())
);

create policy "Members can view own commissions" on commissions for select using (
  member_id in (select id from members where auth_user_id = auth.uid())
);

create policy "Members can view own products" on products for select using (
  member_id in (select id from members where auth_user_id = auth.uid())
);

create policy "Members can view own tickets" on tickets for select using (
  member_id in (select id from members where auth_user_id = auth.uid())
);

-- ============================================================================
-- SEED DATA (for development)
-- ============================================================================

-- Insert sample admin
insert into admin_users (email, name, role) values
  ('admin@amni.farm', 'Super Admin', 'super_admin');

-- Insert sample categories
insert into categories (name, slug) values
  ('Produce', 'produce'),
  ('Seeds & Starters', 'seeds-starters'),
  ('Equipment', 'equipment'),
  ('Subscriptions', 'subscriptions');

-- Done!
-- Run: select 'Schema created successfully!' as status;
