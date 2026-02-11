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

*Ready to build?*
