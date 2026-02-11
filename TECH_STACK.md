# AMNI Tech Stack Architecture

## Overview

AMNI needs a full-stack MLM platform with unique requirements:
1. **Australian placement algorithm** (AI-optimized member placement)
2. **Production-based board tracking** (not recruitment-based)
3. **Human-AI pair management** (each member has an AI agent)
4. **Food production tracking** (IoT greenhouse integration)
5. **Regional pool calculations** (geographic density rewards)
6. **Acquisition fund management** (dividend distribution)

---

## Core Layers

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                          │
│  Next.js 14 (current) → Marketing site, dashboards, admin          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────┐
│                         API / BFF LAYER                            │
│  Next.js API Routes / Cloudflare Workers                           │
└─────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────┐
│                        BUSINESS LOGIC LAYER                        │
│  - Compensation Calculator                                         │
│  - Australian Placement Algorithm                                  │
│  - Board Progression Engine                                        │
│  - Commission Processor                                            │
└─────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────┐
│                          DATA LAYER                                │
│  - Relational: Member tree, commissions, orders                    │
│  - Graph: Network relationships (Neo4j or Dgraph)                  │
│  - Time-series: Production data, IoT telemetry                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────┐
│                      AI AGENT INFRASTRUCTURE                       │
│  - OpenClaw agents (one per human-AI pair)                         │
│  - Agent orchestration                                             │
│  - Growing guidance, sales automation, recruiting                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Technology Choices

### 1. Frontend / Marketing (Current)
| Component | Technology | Status |
|-----------|------------|--------|
| Marketing Site | Next.js 14 + Tailwind | ✅ Built |
| Hosting | Cloudflare Pages | ✅ Deployed |
| Repo | GitHub | ✅ Active |

### 2. Backend / API
| Component | Options | Recommendation |
|-----------|---------|----------------|
| API Framework | Next.js API Routes | Start here (simple) |
| Workers | Cloudflare Workers | For edge compute |
| Queue | Cloudflare Queues / BullMQ | Commission processing |

### 3. Database Architecture

**Option A: All-in-One (Supabase)**
- PostgreSQL for relational data
- Built-in auth
- Real-time subscriptions
- Row-level security
- **Pros:** Fast to start, integrated
- **Cons:** Tree queries can get complex

**Option B: Purpose-Built (Recommended for Scale)**
| Data Type | Database | Why |
|-----------|----------|-----|
| Members, Orders, Commissions | PostgreSQL (Supabase/Neon) | ACID, reliable |
| Network Tree | Neo4j / Dgraph | Graph queries are O(1) |
| Production Telemetry | TimescaleDB / InfluxDB | Time-series optimized |
| Sessions/Cache | Redis / Upstash | Fast reads |

**For MVP: Start with Supabase, migrate graph queries to Neo4j when needed.**

### 4. MLM-Specific Components

#### Option A: Build Custom
Build our own:
- Australian placement algorithm
- Board progression tracker
- Commission calculator
- Tree visualization

**Pros:** Fully custom, no license fees
**Cons:** Complex, time to build

#### Option B: Use MLM Platform + Customize
| Platform | Features | Pricing |
|----------|----------|---------|
| **Epixel MLM** | All comp plans, compliance, dashboards | $$$$$ (enterprise) |
| **Infinite MLM** | Binary, unilevel, matrix | $$ |
| **MLM Starter** | Open source, PHP/Laravel | Free |
| **Pro MLM** | SaaS, quick setup | $$$ |

**Recommendation:** Build custom. Our hybrid Australian + Board model is unique — no off-the-shelf platform supports it.

### 5. Payment Processing
| Component | Technology | Why |
|-----------|------------|-----|
| Payments | Stripe | Subscriptions, marketplace |
| Payouts | Stripe Connect | Pay producers directly |
| Crypto (optional) | Coinbase Commerce | Alternative payment |

### 6. AI Agent Infrastructure
| Component | Technology | Why |
|-----------|------------|-----|
| Agent Runtime | OpenClaw | Already using it |
| Agent per Pair | OpenClaw multi-agent | Each member gets AI |
| Growing Guidance | Custom prompts + IoT data | AI gardener |
| Sales Automation | Marketplace integration | AI handles listings |
| Recruiting | Outreach automation | AI recruits via channels |

### 7. IoT / Greenhouse Integration
| Component | Technology | Why |
|-----------|------------|-----|
| Sensors | ESP32 + sensors | Cheap, WiFi |
| Protocol | MQTT | IoT standard |
| Broker | HiveMQ Cloud / Mosquitto | Managed or self-host |
| Telemetry DB | TimescaleDB | Time-series |
| Dashboard | Grafana / Custom | Visualize |

---

## Architecture Diagram

```
                                    ┌──────────────────┐
                                    │   CLOUDFLARE     │
                                    │     PAGES        │
                                    │  (Marketing)     │
                                    └────────┬─────────┘
                                             │
┌────────────────────────────────────────────┼────────────────────────────────────────┐
│                                            │                                        │
│  ┌─────────────────────────────────────────┼─────────────────────────────────────┐  │
│  │                                   API GATEWAY                                 │  │
│  │                          (Next.js API / CF Workers)                          │  │
│  └──────────┬──────────────────────┬───────────────────────────┬────────────────┘  │
│             │                      │                           │                    │
│   ┌─────────▼─────────┐  ┌─────────▼─────────┐  ┌──────────────▼──────────────┐    │
│   │   MEMBER SERVICE  │  │  COMMISSION SVC   │  │     PRODUCTION SERVICE     │    │
│   │                   │  │                   │  │                            │    │
│   │ - Registration    │  │ - Calculator      │  │ - IoT ingestion            │    │
│   │ - Australian      │  │ - Board tracker   │  │ - Harvest tracking         │    │
│   │   placement       │  │ - Payout queue    │  │ - Yield analytics          │    │
│   │ - Tree queries    │  │                   │  │                            │    │
│   └─────────┬─────────┘  └─────────┬─────────┘  └──────────────┬──────────────┘    │
│             │                      │                           │                    │
│   ┌─────────▼─────────────────────▼───────────────────────────▼──────────────┐    │
│   │                              DATABASES                                    │    │
│   │                                                                           │    │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │    │
│   │  │  PostgreSQL  │  │    Neo4j     │  │ TimescaleDB  │  │    Redis     │  │    │
│   │  │  (Supabase)  │  │   (Graph)    │  │(Time-series) │  │   (Cache)    │  │    │
│   │  │              │  │              │  │              │  │              │  │    │
│   │  │ - Members    │  │ - Network    │  │ - Sensors    │  │ - Sessions   │  │    │
│   │  │ - Orders     │  │ - Placement  │  │ - Harvests   │  │ - Leaderboard│  │    │
│   │  │ - Commissions│  │ - Levels     │  │ - Production │  │ - Temp data  │  │    │
│   │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  │    │
│   └───────────────────────────────────────────────────────────────────────────┘    │
│                                                                                     │
│   ┌───────────────────────────────────────────────────────────────────────────┐    │
│   │                         AI AGENT LAYER (OpenClaw)                         │    │
│   │                                                                           │    │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │    │
│   │  │  AI Agent 1  │  │  AI Agent 2  │  │  AI Agent 3  │  │  AI Agent N  │  │    │
│   │  │  (Pair #1)   │  │  (Pair #2)   │  │  (Pair #3)   │  │  (Pair #N)   │  │    │
│   │  │              │  │              │  │              │  │              │  │    │
│   │  │ - Growing    │  │ - Growing    │  │ - Growing    │  │ - Growing    │  │    │
│   │  │ - Sales      │  │ - Sales      │  │ - Sales      │  │ - Sales      │  │    │
│   │  │ - Recruiting │  │ - Recruiting │  │ - Recruiting │  │ - Recruiting │  │    │
│   │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  │    │
│   └───────────────────────────────────────────────────────────────────────────┘    │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                             │
                    ┌────────────────────────┼────────────────────────┐
                    │                        │                        │
           ┌────────▼────────┐    ┌──────────▼──────────┐   ┌────────▼────────┐
           │     STRIPE      │    │       MQTT          │   │   MESSAGING     │
           │                 │    │    (IoT Broker)     │   │                 │
           │ - Payments      │    │                     │   │ - Telegram      │
           │ - Connect       │    │ - Sensor data       │   │ - WhatsApp      │
           │ - Subscriptions │    │ - Commands          │   │ - Discord       │
           └─────────────────┘    └─────────────────────┘   └─────────────────┘
```

---

## Phase Roadmap

### Phase 1: MVP (Weeks 1-4)
- [ ] Supabase setup (members, orders, basic tree)
- [ ] Auth (Supabase Auth or Clerk)
- [ ] Join/checkout flow with Stripe
- [ ] Basic producer dashboard
- [ ] Manual commission calculation

### Phase 2: Core MLM (Weeks 5-8)
- [ ] Australian placement algorithm
- [ ] Board progression engine
- [ ] Automated commission calculator
- [ ] Tree visualization
- [ ] Payout automation (Stripe Connect)

### Phase 3: AI Agents (Weeks 9-12)
- [ ] Agent provisioning per member
- [ ] Growing guidance integration
- [ ] Sales automation (marketplace listings)
- [ ] Basic recruiting automation

### Phase 4: IoT Integration (Weeks 13-16)
- [ ] MQTT broker setup
- [ ] Sensor data ingestion
- [ ] Production tracking
- [ ] Yield analytics
- [ ] AI-powered growing recommendations

### Phase 5: Scale (Ongoing)
- [ ] Neo4j for graph queries
- [ ] Regional pool calculations
- [ ] Acquisition fund management
- [ ] Mobile app (React Native / Flutter)

---

## Key Algorithms to Build

### 1. Australian Placement Algorithm
```typescript
function findOptimalPlacement(newMember: Member): Sponsor {
  // Factors to consider:
  // 1. Geographic proximity (lat/lng distance)
  // 2. Sponsor capacity (how many they can mentor)
  // 3. Network balance (prevent lopsided trees)
  // 4. Active status (place under active sponsors)
  
  const candidates = getActiveSponsorCandidates();
  
  return candidates
    .map(c => ({
      sponsor: c,
      score: calculatePlacementScore(c, newMember)
    }))
    .sort((a, b) => b.score - a.score)[0].sponsor;
}

function calculatePlacementScore(sponsor: Sponsor, newMember: Member): number {
  const geoScore = 1 / (1 + distanceKm(sponsor.location, newMember.location));
  const capacityScore = 1 / (1 + sponsor.directRecruits.length);
  const balanceScore = calculateTreeBalance(sponsor);
  const activityScore = sponsor.lastActiveAt > daysAgo(30) ? 1 : 0.5;
  
  return (geoScore * 0.4) + (capacityScore * 0.2) + 
         (balanceScore * 0.2) + (activityScore * 0.2);
}
```

### 2. Board Progression Engine
```typescript
const BOARDS = [
  { name: 'Seedling', threshold: 500, bonus: 100 },
  { name: 'Sprout', threshold: 2500, bonus: 250 },
  { name: 'Grower', threshold: 10000, bonus: 750 },
  { name: 'Harvester', threshold: 50000, bonus: 2500 },
  { name: 'Farmer', threshold: 250000, bonus: 10000 },
  { name: 'Cultivator', threshold: 1000000, bonus: 50000 },
];

function checkBoardAdvancement(member: Member): BoardAdvancement | null {
  const networkProduction = calculateNetworkProduction(member);
  const currentBoard = member.currentBoard;
  const nextBoard = BOARDS[BOARDS.indexOf(currentBoard) + 1];
  
  if (nextBoard && networkProduction >= nextBoard.threshold) {
    return {
      from: currentBoard,
      to: nextBoard,
      bonus: nextBoard.bonus,
      networkProduction
    };
  }
  return null;
}
```

### 3. Commission Calculator
```typescript
function calculateMonthlyCommissions(member: Member): CommissionBreakdown {
  const personal = member.monthlyProduction * 0.60;
  
  const findersBonus = member.recruitsThisMonth
    .filter(r => r.monthsActive <= 6)
    .reduce((sum, r) => sum + r.production * 0.10, 0);
  
  const placementTree = [
    { level: 1, rate: 0.08 },
    { level: 2, rate: 0.04 },
    { level: 3, rate: 0.02 },
    { level: 4, rate: 0.01 },
  ].reduce((sum, { level, rate }) => {
    const levelMembers = getMembersAtLevel(member, level);
    return sum + levelMembers.reduce((s, m) => s + m.production * rate, 0);
  }, 0);
  
  const regionalPool = calculateRegionalPoolShare(member);
  
  const acquisitionDividend = calculateAcquisitionDividend(member);
  
  return {
    personal,
    findersBonus,
    placementTree,
    regionalPool,
    acquisitionDividend,
    total: personal + findersBonus + placementTree + regionalPool + acquisitionDividend
  };
}
```

---

## Cost Estimates (Monthly)

### MVP Stage
| Service | Cost |
|---------|------|
| Cloudflare Pages | Free |
| Supabase (Free tier) | Free |
| Stripe | 2.9% + $0.30 per tx |
| Domain | ~$12/year |
| **Total** | **~$1/month + tx fees** |

### Growth Stage (100+ members)
| Service | Cost |
|---------|------|
| Supabase Pro | $25/month |
| Cloudflare Workers | $5/month |
| Redis (Upstash) | $10/month |
| OpenClaw agents | Variable |
| **Total** | **~$50-100/month** |

### Scale Stage (1000+ members)
| Service | Cost |
|---------|------|
| Supabase Team | $599/month |
| Neo4j Aura | $65/month |
| TimescaleDB | $29/month |
| Cloudflare Pro | $20/month |
| MQTT Broker | $50/month |
| **Total** | **~$800-1000/month** |

---

## Immediate Next Steps

1. **Set up Supabase project**
   - Members table
   - Tree relationships (self-referential)
   - Orders table
   - Commissions table

2. **Build Join Flow**
   - /join page with Stripe checkout
   - Member registration
   - Initial placement (simple first-available)

3. **Producer Dashboard**
   - View production
   - View tree
   - View commissions
   - View board progress

4. **Admin Dashboard**
   - Approve members
   - Manual commission runs
   - View network stats

---

## Acquisition Fund Architecture

### Overview

The Acquisition Fund is a core differentiator — 15% of ALL network revenue goes into a fund that buys real farms and greenhouses. Members share in the production of these acquisitions.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ACQUISITION FUND FLOW                               │
│                                                                             │
│   NETWORK REVENUE                                                           │
│        │                                                                    │
│        ▼                                                                    │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    REVENUE SPLIT (100%)                             │   │
│   │                                                                     │   │
│   │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │   │
│   │   │   60%    │  │   15%    │  │   15%    │  │   10%    │           │   │
│   │   │ Producer │  │ Acquis.  │  │Operations│  │ Donation │           │   │
│   │   │ Payouts  │  │  Fund    │  │          │  │          │           │   │
│   │   └──────────┘  └────┬─────┘  └──────────┘  └──────────┘           │   │
│   └──────────────────────┼──────────────────────────────────────────────┘   │
│                          │                                                   │
│                          ▼                                                   │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    ACQUISITION FUND                                 │   │
│   │                                                                     │   │
│   │   Balance: $XXX,XXX                                                 │   │
│   │   Status: Accumulating / Acquiring / Distributing                   │   │
│   │                                                                     │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │  When fund reaches acquisition threshold ($50K-$500K):      │   │   │
│   │   │                                                             │   │   │
│   │   │  1. Scout: AI identifies struggling farms for sale          │   │   │
│   │   │  2. Evaluate: Due diligence, soil tests, infrastructure     │   │   │
│   │   │  3. Vote: Acquisition Council approves (Cultivator members) │   │   │
│   │   │  4. Purchase: Legal entity (AMNI Holdings LLC) buys asset   │   │   │
│   │   │  5. Operate: Staff or member-operated                       │   │   │
│   │   │  6. Distribute: Production dividends to all members         │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                          │                                                   │
│                          ▼                                                   │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    ACQUIRED ASSETS                                  │   │
│   │                                                                     │   │
│   │   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │   │
│   │   │   Farm #1    │  │   Farm #2    │  │  Greenhouse  │    ...      │   │
│   │   │  Ohio, 50ac  │  │  TX, 120ac   │  │  CA, 2ac     │             │   │
│   │   │              │  │              │  │              │             │   │
│   │   │ Prod: $15K/mo│  │ Prod: $40K/mo│  │ Prod: $8K/mo │             │   │
│   │   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘             │   │
│   │          │                 │                 │                      │   │
│   │          └─────────────────┼─────────────────┘                      │   │
│   │                            │                                        │   │
│   │                            ▼                                        │   │
│   │                  Total Acquisition Production                       │   │
│   │                        $63,000/month                                │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                          │                                                   │
│                          ▼                                                   │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    DIVIDEND DISTRIBUTION                            │   │
│   │                                                                     │   │
│   │   Acquisition Production: $63,000/month                             │   │
│   │                                                                     │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │  SPLIT:                                                     │   │   │
│   │   │                                                             │   │   │
│   │   │  40% → Tenure Pool     │ $25,200 split by months active     │   │   │
│   │   │  40% → Production Pool │ $25,200 split by production volume │   │   │
│   │   │  20% → Reinvestment    │ $12,600 back into fund             │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   │                                                                     │   │
│   │   Example member dividend:                                          │   │
│   │   - 18 months tenure (top 20%) → $50/month from tenure pool        │   │
│   │   - $2,000/month production (top 30%) → $35/month from prod pool   │   │
│   │   - Total dividend: $85/month                                       │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Model

```sql
-- Acquisition Fund
CREATE TABLE acquisition_fund (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  balance_cents BIGINT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'accumulating', -- accumulating, acquiring, distributing
  last_contribution_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fund Contributions (from every transaction)
CREATE TABLE fund_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  amount_cents BIGINT NOT NULL,
  source_type TEXT NOT NULL, -- 'marketplace_sale', 'package_purchase', 'subscription'
  contributed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Acquired Assets (farms, greenhouses)
CREATE TABLE acquired_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  asset_type TEXT NOT NULL, -- 'farm', 'greenhouse', 'processing_facility'
  location_address TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  acreage DECIMAL(10, 2),
  purchase_price_cents BIGINT NOT NULL,
  purchase_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active, sold, inactive
  
  -- Legal
  holding_entity TEXT NOT NULL, -- 'AMNI Holdings LLC'
  deed_document_url TEXT,
  
  -- Operations
  operator_type TEXT NOT NULL, -- 'staff', 'member', 'contracted'
  operator_member_id UUID REFERENCES members(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Asset Production (monthly tracking)
CREATE TABLE asset_production (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES acquired_assets(id),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  gross_revenue_cents BIGINT NOT NULL,
  operating_costs_cents BIGINT NOT NULL,
  net_production_cents BIGINT NOT NULL, -- gross - costs
  
  -- Breakdown
  produce_sold_lbs DECIMAL(10, 2),
  products_sold_count INT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(asset_id, period_start)
);

-- Dividend Distributions
CREATE TABLE dividend_distributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  total_production_cents BIGINT NOT NULL, -- sum of all asset production
  tenure_pool_cents BIGINT NOT NULL, -- 40%
  production_pool_cents BIGINT NOT NULL, -- 40%
  reinvestment_cents BIGINT NOT NULL, -- 20%
  
  status TEXT NOT NULL DEFAULT 'pending', -- pending, calculated, distributed
  distributed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Member Dividend Payouts
CREATE TABLE member_dividends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  distribution_id UUID REFERENCES dividend_distributions(id),
  member_id UUID REFERENCES members(id),
  
  -- Calculation inputs
  tenure_months INT NOT NULL,
  tenure_rank_percentile DECIMAL(5, 2), -- e.g., 0.85 = top 15%
  production_total_cents BIGINT NOT NULL,
  production_rank_percentile DECIMAL(5, 2),
  
  -- Payouts
  tenure_payout_cents BIGINT NOT NULL,
  production_payout_cents BIGINT NOT NULL,
  total_payout_cents BIGINT NOT NULL,
  
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid
  paid_at TIMESTAMPTZ,
  stripe_transfer_id TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Acquisition Proposals (for council voting)
CREATE TABLE acquisition_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Target property
  property_name TEXT NOT NULL,
  property_address TEXT,
  property_lat DECIMAL(10, 8),
  property_lng DECIMAL(11, 8),
  asking_price_cents BIGINT NOT NULL,
  acreage DECIMAL(10, 2),
  
  -- Analysis
  estimated_annual_production_cents BIGINT,
  estimated_operating_costs_cents BIGINT,
  estimated_roi_percent DECIMAL(5, 2),
  due_diligence_report_url TEXT,
  
  -- Voting
  status TEXT NOT NULL DEFAULT 'proposed', -- proposed, voting, approved, rejected, purchased
  votes_for INT DEFAULT 0,
  votes_against INT DEFAULT 0,
  voting_deadline TIMESTAMPTZ,
  
  -- Outcome
  decision TEXT, -- 'approved', 'rejected'
  decision_at TIMESTAMPTZ,
  acquired_asset_id UUID REFERENCES acquired_assets(id),
  
  proposed_by UUID REFERENCES members(id), -- AI or Cultivator member
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Council Votes (Cultivator members only)
CREATE TABLE council_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES acquisition_proposals(id),
  member_id UUID REFERENCES members(id),
  vote TEXT NOT NULL, -- 'for', 'against', 'abstain'
  comment TEXT,
  voted_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(proposal_id, member_id)
);
```

### Acquisition Fund Service

```typescript
// services/acquisitionFund.ts

interface FundStatus {
  balance: number;
  status: 'accumulating' | 'acquiring' | 'distributing';
  targetThreshold: number;
  percentToThreshold: number;
  acquiredAssets: AcquiredAsset[];
  totalAssetProduction: number;
  pendingProposals: AcquisitionProposal[];
}

class AcquisitionFundService {
  
  // Called on every transaction
  async contribute(orderId: string, totalAmount: number): Promise<void> {
    const contributionAmount = Math.floor(totalAmount * 0.15); // 15%
    
    await db.transaction(async (tx) => {
      // Record contribution
      await tx.insert(fundContributions).values({
        orderId,
        amountCents: contributionAmount,
        sourceType: 'marketplace_sale'
      });
      
      // Update fund balance
      await tx.update(acquisitionFund)
        .set({ 
          balanceCents: sql`balance_cents + ${contributionAmount}`,
          lastContributionAt: new Date()
        });
    });
    
    // Check if we hit acquisition threshold
    await this.checkAcquisitionThreshold();
  }
  
  async checkAcquisitionThreshold(): Promise<void> {
    const fund = await this.getFundStatus();
    
    // Thresholds based on fund size
    const thresholds = [
      { min: 50000, label: 'Small greenhouse' },
      { min: 150000, label: 'Medium farm' },
      { min: 500000, label: 'Large operation' },
    ];
    
    const applicableThreshold = thresholds
      .filter(t => fund.balance >= t.min)
      .pop();
    
    if (applicableThreshold && fund.status === 'accumulating') {
      // Trigger acquisition search
      await this.initiateAcquisitionSearch(applicableThreshold);
    }
  }
  
  async initiateAcquisitionSearch(threshold: { min: number, label: string }): Promise<void> {
    // AI scouts for properties
    // This could integrate with real estate APIs, auction sites, etc.
    
    await db.update(acquisitionFund)
      .set({ status: 'acquiring' });
    
    // Notify Acquisition Council (Cultivator members)
    const council = await this.getAcquisitionCouncil();
    for (const member of council) {
      await notify(member, {
        title: 'Acquisition Fund Ready',
        body: `Fund has reached $${threshold.min.toLocaleString()}. Scouting for ${threshold.label} opportunities.`
      });
    }
  }
  
  async createProposal(property: PropertyDetails): Promise<AcquisitionProposal> {
    const proposal = await db.insert(acquisitionProposals).values({
      propertyName: property.name,
      propertyAddress: property.address,
      askingPriceCents: property.price * 100,
      acreage: property.acreage,
      estimatedAnnualProductionCents: property.estimatedProduction * 100,
      estimatedRoiPercent: property.estimatedROI,
      status: 'voting',
      votingDeadline: addDays(new Date(), 7) // 7 day vote
    }).returning();
    
    // Notify council
    await this.notifyCouncilOfProposal(proposal);
    
    return proposal;
  }
  
  async castVote(proposalId: string, memberId: string, vote: 'for' | 'against' | 'abstain'): Promise<void> {
    // Verify member is Cultivator level
    const member = await getMember(memberId);
    if (member.boardLevel !== 'Cultivator') {
      throw new Error('Only Cultivator members can vote on acquisitions');
    }
    
    await db.insert(councilVotes).values({
      proposalId,
      memberId,
      vote
    });
    
    // Update vote counts
    await this.updateVoteCounts(proposalId);
    
    // Check if voting is complete
    await this.checkVotingComplete(proposalId);
  }
  
  async executeAcquisition(proposalId: string): Promise<AcquiredAsset> {
    const proposal = await getProposal(proposalId);
    
    // Create acquired asset record
    const asset = await db.insert(acquiredAssets).values({
      name: proposal.propertyName,
      assetType: 'farm',
      locationAddress: proposal.propertyAddress,
      purchasePriceCents: proposal.askingPriceCents,
      purchaseDate: new Date(),
      holdingEntity: 'AMNI Holdings LLC',
      operatorType: 'staff'
    }).returning();
    
    // Deduct from fund
    await db.update(acquisitionFund)
      .set({ 
        balanceCents: sql`balance_cents - ${proposal.askingPriceCents}`,
        status: 'accumulating' // Back to accumulating
      });
    
    // Update proposal
    await db.update(acquisitionProposals)
      .set({ 
        status: 'purchased',
        acquiredAssetId: asset.id 
      })
      .where(eq(acquisitionProposals.id, proposalId));
    
    // Notify all members
    await this.notifyAllMembersOfAcquisition(asset);
    
    return asset;
  }
  
  // Monthly dividend distribution
  async calculateAndDistributeDividends(periodStart: Date, periodEnd: Date): Promise<void> {
    // Get total production from all acquired assets
    const assetProduction = await db.select()
      .from(assetProduction)
      .where(and(
        gte(assetProduction.periodStart, periodStart),
        lte(assetProduction.periodEnd, periodEnd)
      ));
    
    const totalProduction = assetProduction.reduce(
      (sum, p) => sum + p.netProductionCents, 0
    );
    
    if (totalProduction === 0) return;
    
    // Calculate pools
    const tenurePool = Math.floor(totalProduction * 0.40);
    const productionPool = Math.floor(totalProduction * 0.40);
    const reinvestment = Math.floor(totalProduction * 0.20);
    
    // Create distribution record
    const distribution = await db.insert(dividendDistributions).values({
      periodStart,
      periodEnd,
      totalProductionCents: totalProduction,
      tenurePoolCents: tenurePool,
      productionPoolCents: productionPool,
      reinvestmentCents: reinvestment,
      status: 'calculating'
    }).returning();
    
    // Get all active members with their tenure and production
    const members = await this.getMembersWithMetrics();
    
    // Calculate tenure shares
    const totalTenureMonths = members.reduce((sum, m) => sum + m.tenureMonths, 0);
    
    // Calculate production shares
    const totalMemberProduction = members.reduce((sum, m) => sum + m.periodProduction, 0);
    
    // Calculate individual dividends
    for (const member of members) {
      const tenurePayout = Math.floor(
        (member.tenureMonths / totalTenureMonths) * tenurePool
      );
      
      const productionPayout = totalMemberProduction > 0
        ? Math.floor((member.periodProduction / totalMemberProduction) * productionPool)
        : 0;
      
      await db.insert(memberDividends).values({
        distributionId: distribution.id,
        memberId: member.id,
        tenureMonths: member.tenureMonths,
        tenureRankPercentile: member.tenureRank,
        productionTotalCents: member.periodProduction,
        productionRankPercentile: member.productionRank,
        tenurePayoutCents: tenurePayout,
        productionPayoutCents: productionPayout,
        totalPayoutCents: tenurePayout + productionPayout,
        status: 'pending'
      });
    }
    
    // Add reinvestment to fund
    await db.update(acquisitionFund)
      .set({ balanceCents: sql`balance_cents + ${reinvestment}` });
    
    // Mark distribution as calculated
    await db.update(dividendDistributions)
      .set({ status: 'calculated' })
      .where(eq(dividendDistributions.id, distribution.id));
    
    // Process payouts via Stripe
    await this.processPayouts(distribution.id);
  }
  
  async processPayouts(distributionId: string): Promise<void> {
    const dividends = await db.select()
      .from(memberDividends)
      .where(and(
        eq(memberDividends.distributionId, distributionId),
        eq(memberDividends.status, 'pending'),
        gt(memberDividends.totalPayoutCents, 0)
      ));
    
    for (const dividend of dividends) {
      const member = await getMember(dividend.memberId);
      
      if (member.stripeConnectId) {
        // Transfer via Stripe Connect
        const transfer = await stripe.transfers.create({
          amount: dividend.totalPayoutCents,
          currency: 'usd',
          destination: member.stripeConnectId,
          metadata: {
            type: 'acquisition_dividend',
            distributionId,
            memberId: dividend.memberId
          }
        });
        
        await db.update(memberDividends)
          .set({ 
            status: 'paid',
            paidAt: new Date(),
            stripeTransferId: transfer.id
          })
          .where(eq(memberDividends.id, dividend.id));
      }
    }
    
    // Mark distribution as complete
    await db.update(dividendDistributions)
      .set({ 
        status: 'distributed',
        distributedAt: new Date()
      })
      .where(eq(dividendDistributions.id, distributionId));
  }
  
  async getAcquisitionCouncil(): Promise<Member[]> {
    return db.select()
      .from(members)
      .where(eq(members.boardLevel, 'Cultivator'));
  }
}

export const acquisitionFund = new AcquisitionFundService();
```

### Acquisition Fund Dashboard (Admin)

```typescript
// API route: /api/admin/acquisition-fund

export async function GET() {
  const fund = await acquisitionFund.getFundStatus();
  const assets = await acquisitionFund.getAcquiredAssets();
  const proposals = await acquisitionFund.getPendingProposals();
  const recentDistributions = await acquisitionFund.getRecentDistributions(6);
  
  return Response.json({
    fund: {
      balance: fund.balance,
      status: fund.status,
      targetThreshold: fund.targetThreshold,
      percentToThreshold: fund.percentToThreshold
    },
    assets: assets.map(a => ({
      id: a.id,
      name: a.name,
      type: a.assetType,
      purchasePrice: a.purchasePriceCents / 100,
      monthlyProduction: a.currentMonthProduction / 100,
      roi: a.annualizedROI
    })),
    proposals: proposals.map(p => ({
      id: p.id,
      name: p.propertyName,
      askingPrice: p.askingPriceCents / 100,
      estimatedROI: p.estimatedRoiPercent,
      votesFor: p.votesFor,
      votesAgainst: p.votesAgainst,
      deadline: p.votingDeadline
    })),
    distributions: recentDistributions.map(d => ({
      period: `${d.periodStart} - ${d.periodEnd}`,
      totalProduction: d.totalProductionCents / 100,
      distributed: d.tenurePoolCents + d.productionPoolCents,
      reinvested: d.reinvestmentCents / 100,
      status: d.status
    }))
  });
}
```

### Acquisition Fund Cron Jobs

```typescript
// Cron: Monthly dividend distribution (1st of each month)
// Schedule: 0 0 1 * *

async function monthlyDividendDistribution() {
  const lastMonth = {
    start: startOfMonth(subMonths(new Date(), 1)),
    end: endOfMonth(subMonths(new Date(), 1))
  };
  
  await acquisitionFund.calculateAndDistributeDividends(
    lastMonth.start,
    lastMonth.end
  );
}

// Cron: Asset production recording (daily)
// Schedule: 0 0 * * *

async function recordAssetProduction() {
  const assets = await acquisitionFund.getActiveAssets();
  
  for (const asset of assets) {
    // Pull from IoT/POS system
    const todayProduction = await getAssetDailyProduction(asset.id);
    await acquisitionFund.recordProduction(asset.id, todayProduction);
  }
}

// Cron: Acquisition opportunity scan (weekly)
// Schedule: 0 0 * * 0

async function scanAcquisitionOpportunities() {
  const fund = await acquisitionFund.getFundStatus();
  
  if (fund.status === 'acquiring' && fund.balance > 50000) {
    // AI scans real estate listings, farm auctions, etc.
    const opportunities = await aiScoutProperties({
      maxPrice: fund.balance,
      types: ['farm', 'greenhouse', 'processing'],
      regions: await getHighDensityRegions()
    });
    
    for (const opp of opportunities) {
      await acquisitionFund.createProposal(opp);
    }
  }
}
```

---

*Ready to build?*
