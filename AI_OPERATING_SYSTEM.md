# AMNI AI Operating System

## Architecture Overview

The AMNI AI system is built on 8 foundational buckets that work together to create a complete AI-powered food production network.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AMNI AI OPERATING SYSTEM                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ 1. INTERFACE│  │  2. MODELS  │  │  3. SKILLS  │  │  4. DATA    │        │
│  │             │  │             │  │             │  │    LAYER    │        │
│  │ Voice/Chat  │  │ LLMs/Vision │  │ Growing/    │  │ PostgreSQL  │        │
│  │ Dashboard   │  │ Embeddings  │  │ Sales/      │  │ Graph DB    │        │
│  │ Notifications│ │ Classification│ │ Recruiting │  │ Time Series │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │               │
│         └────────────────┼────────────────┼────────────────┘               │
│                          │                │                                 │
│  ┌─────────────┐  ┌──────┴──────┐  ┌──────┴──────┐  ┌─────────────┐        │
│  │ 5. EXTERNAL │  │ 6. AUTOMATION│  │  7. MEMORY  │  │ 8. PERSONA- │        │
│  │   SERVICES  │  │    LAYER     │  │   SYSTEM    │  │   LIZATION  │        │
│  │             │  │              │  │             │  │             │        │
│  │ Stripe/IoT  │  │ Cron/Events  │  │ Short/Long  │  │ Preferences │        │
│  │ Weather API │  │ Workflows    │  │ Context     │  │ Tone/Style  │        │
│  │ Real Estate │  │ Triggers     │  │ Learning    │  │ Adaptation  │        │
│  └─────────────┘  └──────────────┘  └─────────────┘  └─────────────┘        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Bucket 1: Interface Layer

How users interact with their AI agents.

### Channels

| Channel | Type | Use Case | Priority |
|---------|------|----------|----------|
| Mobile App | Primary | Dashboard, approvals, notifications | P0 |
| Voice Call | Interactive | Hands-free while gardening | P1 |
| SMS/Text | Async | Quick updates, alerts | P0 |
| Email | Async | Reports, documents, summaries | P1 |
| Web Dashboard | Desktop | Detailed analytics, configuration | P1 |
| Smart Speaker | Voice | Greenhouse queries while working | P2 |
| Wearable | Push | Critical alerts (frost, pest) | P2 |

### Interface Actions

| Action | Description | Example |
|--------|-------------|---------|
| APPROVE | Confirm AI recommendation | "Approve tomorrow's harvest plan" |
| REJECT | Decline AI recommendation | "Don't list those tomatoes yet" |
| QUERY | Ask for information | "What's my current balance?" |
| COMMAND | Direct instruction | "Water section A now" |
| CONFIGURE | Change settings | "Set frost alert to 35°F" |
| ESCALATE | Request human help | "Connect me to support" |

---

## Bucket 2: Models Layer

AI models powering different capabilities.

### Model Types

| Model Type | Purpose | Provider Options | Use Cases |
|------------|---------|------------------|-----------|
| LLM (Chat) | Conversation, reasoning | Claude, GPT-4, Llama | Customer service, planning |
| LLM (Code) | Automation, integrations | Claude, GPT-4 | Workflow generation |
| Vision | Plant analysis, pest ID | GPT-4V, Claude Vision | Disease detection, ripeness |
| Embeddings | Semantic search | OpenAI, Voyage, Local | Knowledge retrieval |
| Classification | Intent detection | Fine-tuned BERT, LLM | Message routing |
| Forecasting | Yield prediction | Prophet, LSTM | Production planning |
| Recommendation | Product suggestions | Collaborative filtering | Marketplace |

### Model Selection Matrix

| Task | Primary Model | Fallback | Latency Req |
|------|---------------|----------|-------------|
| Real-time chat | Claude 3.5 Sonnet | GPT-4o | <2s |
| Complex reasoning | Claude 3 Opus | GPT-4 | <30s |
| Quick classification | Claude Haiku | Local BERT | <500ms |
| Image analysis | GPT-4V | Claude Vision | <5s |
| Bulk processing | Claude Haiku | Local LLM | N/A |

---

## Bucket 3: Skills & Capabilities

Domain-specific abilities organized by agent.

### Growing Agent Skills

| Skill ID | Skill Name | Description | Inputs | Outputs |
|----------|------------|-------------|--------|---------|
| GROW-001 | Sensor Analysis | Interpret IoT sensor data | Sensor readings | Health assessment |
| GROW-002 | Climate Control | Adjust greenhouse environment | Current conditions, targets | Control commands |
| GROW-003 | Planting Schedule | Create optimal planting calendar | Zone, season, goals | Planting plan |
| GROW-004 | Harvest Timing | Determine when to harvest | Plant stage, market demand | Harvest recommendations |
| GROW-005 | Pest Detection | Identify pests from images/symptoms | Photos, descriptions | Pest ID, treatment plan |
| GROW-006 | Disease Diagnosis | Diagnose plant diseases | Photos, symptoms | Diagnosis, treatment |
| GROW-007 | Nutrient Management | Optimize fertilization | Soil data, plant stage | Nutrient schedule |
| GROW-008 | Water Management | Optimize irrigation | Soil moisture, weather | Watering schedule |
| GROW-009 | Crop Rotation | Plan seasonal rotations | History, goals, space | Rotation plan |
| GROW-010 | Yield Prediction | Forecast production | Historical data, conditions | Yield estimates |

### Sales Agent Skills

| Skill ID | Skill Name | Description | Inputs | Outputs |
|----------|------------|-------------|--------|---------|
| SALE-001 | Listing Creation | Generate marketplace listings | Product info, photos | Listing content |
| SALE-002 | Dynamic Pricing | Set optimal prices | Supply, demand, competition | Price recommendations |
| SALE-003 | Order Management | Process and track orders | Order data | Status updates |
| SALE-004 | Customer Communication | Handle customer inquiries | Messages | Responses |
| SALE-005 | Inventory Tracking | Monitor available stock | Production, orders | Inventory levels |
| SALE-006 | Pickup Coordination | Schedule pickups/deliveries | Orders, availability | Pickup schedule |
| SALE-007 | Review Management | Respond to customer reviews | Reviews | Responses |
| SALE-008 | Promotion Creation | Design sales promotions | Inventory, goals | Promotion campaigns |
| SALE-009 | Demand Forecasting | Predict customer demand | Historical sales, trends | Demand forecast |
| SALE-010 | Customer Segmentation | Group customers by behavior | Purchase history | Segments |

### Recruiting Agent Skills

| Skill ID | Skill Name | Description | Inputs | Outputs |
|----------|------------|-------------|--------|---------|
| RECR-001 | Lead Generation | Find potential members | Target criteria | Lead list |
| RECR-002 | Outreach Messaging | Craft personalized outreach | Lead profile | Messages |
| RECR-003 | Qualification | Assess lead fit | Conversations, data | Qualification score |
| RECR-004 | Objection Handling | Address concerns | Objections raised | Responses |
| RECR-005 | Onboarding | Guide new member setup | New member | Setup completion |
| RECR-006 | Follow-Up Sequences | Nurture leads over time | Lead stage | Follow-up actions |
| RECR-007 | Referral Requests | Ask for referrals | Member relationships | Referral asks |
| RECR-008 | Content Creation | Create recruiting content | Campaign goals | Content assets |
| RECR-009 | Channel Optimization | Optimize recruiting channels | Performance data | Channel recommendations |
| RECR-010 | Conversion Analysis | Analyze conversion funnel | Funnel data | Insights, improvements |

### Analytics Agent Skills

| Skill ID | Skill Name | Description | Inputs | Outputs |
|----------|------------|-------------|--------|---------|
| ANLY-001 | Commission Calculation | Calculate all commission types | Production, network | Commission breakdown |
| ANLY-002 | Board Tracking | Track board progression | Cumulative production | Board status |
| ANLY-003 | P&L Generation | Create profit/loss statements | All financial data | P&L report |
| ANLY-004 | Network Analysis | Analyze network health | Network structure | Health metrics |
| ANLY-005 | Trend Detection | Identify patterns and trends | Historical data | Trend insights |
| ANLY-006 | Benchmark Comparison | Compare to network averages | Performance data | Benchmark report |
| ANLY-007 | Goal Tracking | Track progress toward goals | Goals, actuals | Progress report |
| ANLY-008 | Anomaly Detection | Flag unusual patterns | All data streams | Anomaly alerts |
| ANLY-009 | Forecasting | Predict future performance | Historical data | Forecasts |
| ANLY-010 | Report Generation | Create formatted reports | Analysis results | Reports |

### Mentor Agent Skills

| Skill ID | Skill Name | Description | Inputs | Outputs |
|----------|------------|-------------|--------|---------|
| MENT-001 | Downline Monitoring | Track downline performance | Network data | Health dashboard |
| MENT-002 | Intervention Triggers | Identify when to help | Performance metrics | Intervention alerts |
| MENT-003 | Best Practice Sharing | Distribute what's working | Top performer data | Best practice content |
| MENT-004 | Training Delivery | Provide training content | Member needs | Training materials |
| MENT-005 | Motivation Messaging | Send encouragement | Performance context | Motivational messages |
| MENT-006 | Problem Solving | Help resolve issues | Issue descriptions | Solutions |
| MENT-007 | Cross-Team Coordination | Coordinate with downline AIs | Agent communications | Coordinated actions |
| MENT-008 | Success Celebration | Recognize achievements | Milestones reached | Celebration messages |
| MENT-009 | Churn Prevention | Identify at-risk members | Engagement data | Retention actions |
| MENT-010 | Escalation Routing | Route issues appropriately | Issue severity | Escalation path |

### Scout Agent Skills

| Skill ID | Skill Name | Description | Inputs | Outputs |
|----------|------------|-------------|--------|---------|
| SCOT-001 | Property Search | Find farm/greenhouse listings | Search criteria | Property list |
| SCOT-002 | Due Diligence | Research property details | Property info | DD report |
| SCOT-003 | ROI Modeling | Calculate investment returns | Property data, costs | ROI projections |
| SCOT-004 | Proposal Creation | Create acquisition proposals | Analysis results | Proposal document |
| SCOT-005 | Council Briefing | Prepare council presentations | Proposal data | Briefing materials |
| SCOT-006 | Market Analysis | Analyze regional markets | Market data | Market report |
| SCOT-007 | Seller Outreach | Contact property owners | Contact info | Outreach messages |
| SCOT-008 | Negotiation Support | Support price negotiations | Offer data | Negotiation strategy |
| SCOT-009 | Closing Coordination | Manage acquisition closing | Transaction data | Closing checklist |
| SCOT-010 | Asset Onboarding | Integrate acquired assets | Asset details | Onboarding plan |

---

## Bucket 4: Data Layer

Data storage, structure, and access patterns.

### Data Stores

| Store | Technology | Purpose | Data Types |
|-------|------------|---------|------------|
| Primary DB | PostgreSQL (Supabase) | Transactional data | Members, orders, commissions |
| Graph DB | Neo4j | Network relationships | Placement tree, referrals |
| Time Series | TimescaleDB | Sensor/production data | IoT readings, yields |
| Vector DB | Pinecone/pgvector | Semantic search | Knowledge embeddings |
| Cache | Redis/Upstash | Fast access | Sessions, leaderboards |
| Object Store | Cloudflare R2 | Files | Photos, documents |

### Core Data Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| Member | Human-AI pair | id, name, email, tier, board_level, join_date |
| Agent | AI agent instance | id, member_id, agent_type, config, last_active |
| Greenhouse | Production unit | id, member_id, location, sensors, capacity |
| Product | Marketplace item | id, member_id, name, price, quantity, status |
| Order | Purchase transaction | id, buyer_id, seller_id, items, total, status |
| Commission | Earned payment | id, member_id, type, amount, period, status |
| Placement | Network position | id, member_id, sponsor_id, finder_id, level |
| Sensor_Reading | IoT data point | id, greenhouse_id, sensor_type, value, timestamp |
| Conversation | Chat history | id, member_id, agent_id, messages, context |
| Task | Scheduled action | id, agent_id, type, params, due_at, status |

### Data Contracts (Per Intent)

| Intent | Input Data | Sources | Outputs | Destinations |
|--------|------------|---------|---------|--------------|
| HARVEST | Greenhouse ID, crop type, quantity | Sensors, schedule | Harvest record, listings | DB, marketplace |
| LIST_PRODUCT | Product info, photos, price | Member input, AI suggestion | Listing record | Marketplace DB |
| PROCESS_ORDER | Order ID, payment | Buyer, Stripe | Order status, receipt | DB, email, SMS |
| CALCULATE_COMMISSION | Member ID, period | Production records | Commission breakdown | DB, dashboard |
| RECRUIT_OUTREACH | Lead profile | Lead sources | Personalized message | SMS, email, social |
| SENSOR_ALERT | Sensor ID, reading, threshold | IoT system | Alert message | Push, SMS, dashboard |
| ACQUISITION_PROPOSAL | Property details | Real estate APIs, research | Proposal document | Council portal |

---

## Bucket 5: External Services

Third-party integrations and APIs.

### Service Categories

| Category | Service | Purpose | Priority |
|----------|---------|---------|----------|
| **Payments** | Stripe | Process payments | P0 |
| **Payments** | Stripe Connect | Payouts to members | P0 |
| **IoT** | MQTT Broker | Sensor communication | P0 |
| **Weather** | OpenWeather/NWS | Weather forecasts | P1 |
| **Communication** | Twilio | SMS, voice calls | P0 |
| **Communication** | SendGrid | Email delivery | P1 |
| **Maps** | Google Maps | Location services | P1 |
| **Real Estate** | Zillow API | Property listings | P2 |
| **Real Estate** | County Records | Property research | P2 |
| **Identity** | Plaid | Bank verification | P2 |
| **Compliance** | DocuSign | Digital signatures | P2 |
| **Analytics** | Mixpanel | User analytics | P2 |

### API Integration Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Webhook | Real-time event push | Stripe payment confirmations |
| Polling | Periodic data fetch | Weather updates |
| Request/Response | Synchronous query | Address validation |
| Streaming | Continuous data | IoT sensor feeds |
| Batch | Bulk operations | Daily report generation |

---

## Bucket 6: Automation Layer

Scheduled tasks, triggers, and workflows.

### Time-Based Automation

| Schedule | Automation | Agent | Description |
|----------|------------|-------|-------------|
| Every 5 min | Sensor monitoring | Growing | Check all sensors for anomalies |
| Every 15 min | Order check | Sales | Process pending orders |
| Hourly | Climate adjustment | Growing | Optimize greenhouse settings |
| 6 AM daily | Morning report | All | Generate daily summary |
| 9 AM daily | Outreach batch | Recruiting | Send scheduled outreach |
| 12 PM daily | Pricing update | Sales | Adjust prices based on supply |
| 6 PM daily | EOD summary | Analytics | End of day report |
| Weekly (Mon) | Production planning | Growing | Plan week's activities |
| Weekly (Fri) | Network review | Mentor | Check downline health |
| Monthly (1st) | Commission run | Analytics | Calculate and pay commissions |
| Monthly (1st) | Board check | Analytics | Evaluate board progression |
| Quarterly | Property scan | Scout | Major acquisition search |

### Event-Based Triggers

| Event | Trigger | Action | Agent |
|-------|---------|--------|-------|
| Sensor threshold breached | ALERT | Send notification, adjust controls | Growing |
| New order placed | ORDER_RECEIVED | Process, notify seller | Sales |
| Order payment confirmed | PAYMENT_SUCCESS | Update status, notify buyer | Sales |
| New member joined | MEMBER_JOINED | Onboard, notify sponsor | Recruiting |
| Harvest marked complete | HARVEST_COMPLETE | Create listings | Sales |
| Commission calculated | COMMISSION_READY | Notify member, process payout | Analytics |
| Board level reached | BOARD_ADVANCE | Celebrate, unlock features | Analytics |
| Downline inactive 7+ days | INACTIVITY_ALERT | Reach out, offer help | Mentor |
| Customer message received | MESSAGE_INBOUND | Route, respond | Sales |
| Property match found | PROPERTY_ALERT | Research, notify | Scout |

### Workflow Definitions

**Workflow: New Member Onboarding**
```
TRIGGER: MEMBER_JOINED
├── STEP 1: Send welcome message (Recruiting)
├── STEP 2: Create AI agent instances (System)
├── STEP 3: Send equipment setup guide (Recruiting)
├── STEP 4: Schedule first check-in (Mentor)
├── STEP 5: Notify sponsor (Mentor)
├── STEP 6: Add to regional pool (Analytics)
└── STEP 7: Begin sensor setup instructions (Growing)
```

**Workflow: Daily Harvest**
```
TRIGGER: 6 AM DAILY
├── STEP 1: Check what's ready to harvest (Growing)
├── STEP 2: Generate harvest recommendations (Growing)
├── STEP 3: Send morning report to member (All)
├── WAIT: Member approval or auto-approve at 10 AM
├── STEP 4: Create marketplace listings (Sales)
├── STEP 5: Notify nearby subscribers (Sales)
└── STEP 6: Update inventory (Sales)
```

**Workflow: Commission Distribution**
```
TRIGGER: 1st of MONTH
├── STEP 1: Lock previous month's data (System)
├── STEP 2: Calculate all production totals (Analytics)
├── STEP 3: Calculate finder's bonuses (Analytics)
├── STEP 4: Calculate placement tree commissions (Analytics)
├── STEP 5: Calculate regional pool shares (Analytics)
├── STEP 6: Calculate acquisition dividends (Analytics)
├── STEP 7: Generate commission statements (Analytics)
├── STEP 8: Process payouts via Stripe Connect (System)
├── STEP 9: Send commission summaries (Analytics)
└── STEP 10: Update board progression (Analytics)
```

---

## Bucket 7: Memory System

How agents remember and learn.

### Memory Types

| Type | Scope | Duration | Purpose |
|------|-------|----------|---------|
| Working Memory | Single conversation | Session | Current context |
| Short-term Memory | Recent interactions | 7 days | Recent context |
| Long-term Memory | Key facts | Permanent | Preferences, history |
| Episodic Memory | Specific events | 90 days | Notable interactions |
| Semantic Memory | Knowledge | Permanent | Domain expertise |
| Procedural Memory | How-to | Permanent | Task execution |

### Memory Storage

| Memory Type | Storage | Retrieval Method |
|-------------|---------|------------------|
| Working | Context window | Direct inclusion |
| Short-term | Redis/cache | Time-based query |
| Long-term | PostgreSQL | ID lookup |
| Episodic | Vector DB | Semantic search |
| Semantic | Vector DB + docs | RAG retrieval |
| Procedural | Code + prompts | Function calling |

### Memory Schema

**Member Memory (Long-term)**
```json
{
  "member_id": "uuid",
  "preferences": {
    "communication_channel": "sms",
    "notification_frequency": "daily",
    "report_detail_level": "summary",
    "timezone": "America/New_York",
    "language": "en"
  },
  "growing_profile": {
    "zone": "7b",
    "soil_type": "loamy",
    "water_source": "well",
    "focus_crops": ["tomatoes", "lettuce", "peppers"],
    "growing_experience": "beginner"
  },
  "interaction_patterns": {
    "active_hours": ["7:00-9:00", "18:00-21:00"],
    "response_time_avg": "15min",
    "approval_rate": 0.92,
    "override_frequency": 0.08
  },
  "key_facts": [
    {"fact": "Prefers organic methods", "confidence": 0.95, "learned": "2024-01-15"},
    {"fact": "Has 3 kids who help with harvesting", "confidence": 0.9, "learned": "2024-02-01"},
    {"fact": "Sells primarily at Saturday farmers market", "confidence": 1.0, "learned": "2024-01-20"}
  ]
}
```

**Conversation Memory (Episodic)**
```json
{
  "conversation_id": "uuid",
  "member_id": "uuid",
  "agent_id": "uuid",
  "timestamp": "2024-02-11T14:30:00Z",
  "summary": "Member asked about tomato yellowing, diagnosed as nitrogen deficiency",
  "key_points": [
    "Problem: Yellow leaves on tomato plants",
    "Diagnosis: Nitrogen deficiency",
    "Solution: Apply fish emulsion fertilizer",
    "Follow-up: Check in 1 week"
  ],
  "entities": ["tomatoes", "nitrogen deficiency", "fish emulsion"],
  "sentiment": "concerned → reassured",
  "embedding": [0.123, -0.456, ...]
}
```

### Learning Mechanisms

| Mechanism | Trigger | What's Learned | Storage |
|-----------|---------|----------------|---------|
| Explicit feedback | Member corrects AI | Specific fact | Long-term |
| Implicit feedback | Member overrides suggestion | Preference pattern | Long-term |
| Outcome tracking | Action succeeds/fails | Strategy effectiveness | Procedural |
| Pattern recognition | Repeated behavior | Behavioral patterns | Long-term |
| Cross-member learning | Network-wide patterns | Best practices | Semantic |

---

## Bucket 8: Personalization

Adapting to individual members.

### Personalization Dimensions

| Dimension | Description | Data Source |
|-----------|-------------|-------------|
| Communication Style | Formal vs casual, verbose vs terse | Interaction history |
| Notification Preferences | Channels, frequency, timing | Explicit settings + behavior |
| Report Format | Summary vs detailed, visual vs text | Explicit settings |
| Risk Tolerance | Conservative vs aggressive suggestions | Decision patterns |
| Involvement Level | Hands-on vs fully automated | Override frequency |
| Learning Style | By example, by explanation, by doing | Engagement patterns |
| Motivation Style | Goals, achievements, competition, community | Response to different frames |

### Tone Adaptation Matrix

| Member Profile | AI Tone | Example |
|----------------|---------|---------|
| New, uncertain | Encouraging, educational | "Great question! Here's how this works..." |
| Experienced, busy | Concise, actionable | "3 items ready. Approve?" |
| Detail-oriented | Thorough, data-rich | "Based on 14 data points, I recommend..." |
| Casual | Friendly, informal | "Hey! Your tomatoes are looking 🔥" |
| Business-focused | Professional, metrics-driven | "This week's P&L shows a 12% margin improvement" |
| Anxious | Reassuring, patient | "Everything is on track. Here's what's happening..." |

### Personalization Rules

| Rule | Condition | Adaptation |
|------|-----------|------------|
| Simplify for beginners | Member < 30 days | Add explanations, reduce jargon |
| Be concise for veterans | Member > 6 months, approval rate > 95% | Shorter messages, skip explanations |
| Morning person | Most activity 6-9 AM | Send important messages in morning |
| Weekend gardener | Activity spikes Sat/Sun | Batch updates for weekend |
| Visual learner | High engagement with charts | Include more visualizations |
| Metric-driven | Asks about numbers often | Lead with data |
| Community-focused | High social engagement | Include peer comparisons |

### A/B Testing Framework

| Test Area | Variants | Metric | Duration |
|-----------|----------|--------|----------|
| Message length | Short / Medium / Long | Response rate | 2 weeks |
| Notification timing | Morning / Afternoon / Evening | Open rate | 2 weeks |
| Recommendation framing | Benefits / Risks / Neutral | Approval rate | 2 weeks |
| Report format | Text / Visual / Mixed | Engagement time | 1 month |
| Recruiting message style | Educational / Opportunity / Community | Conversion rate | 1 month |

---

## Business Pillars & KPIs

### Pillar Mapping

| Business Pillar | Related Intents/Skills | Primary KPI | Target |
|-----------------|------------------------|-------------|--------|
| Production Growth | GROW-001 to GROW-010 | Monthly yield (lbs) | +10% MoM |
| Revenue Generation | SALE-001 to SALE-010 | Marketplace GMV | $X/member |
| Network Expansion | RECR-001 to RECR-010 | New members/month | +5% MoM |
| Member Retention | MENT-001 to MENT-010 | 6-month retention | >85% |
| Operational Efficiency | All agents | Automation rate | >80% |
| Member Satisfaction | All agents | NPS score | >50 |
| Acquisition Growth | SCOT-001 to SCOT-010 | Assets acquired/year | 4+ |
| Compliance | All agents | Issue rate | <1% |

### Intent → Pillar Matrix

| Intent Category | Production | Revenue | Network | Retention | Efficiency | Satisfaction |
|-----------------|------------|---------|---------|-----------|------------|--------------|
| Growing | ●●● | ●○○ | ○○○ | ●●○ | ●●○ | ●●○ |
| Sales | ●○○ | ●●● | ○○○ | ●●○ | ●●○ | ●●○ |
| Recruiting | ○○○ | ●○○ | ●●● | ●○○ | ●●○ | ●○○ |
| Analytics | ●●○ | ●●○ | ●○○ | ●●○ | ●●● | ●●○ |
| Mentoring | ●○○ | ●○○ | ●●○ | ●●● | ●○○ | ●●● |
| Scouting | ○○○ | ●●○ | ○○○ | ○○○ | ●○○ | ○○○ |

---

## State Transitions

### Order States

```
CREATED → PENDING_PAYMENT → PAID → PREPARING → READY → PICKED_UP/DELIVERED → COMPLETED
                ↓              ↓        ↓
            CANCELLED      REFUNDED  CANCELLED
```

### Member States

```
PROSPECT → LEAD → QUALIFIED → SIGNED_UP → ONBOARDING → ACTIVE → VIP
                      ↓            ↓           ↓          ↓
                  REJECTED    CANCELLED   INACTIVE    CHURNED
```

### Commission States

```
PENDING → CALCULATED → APPROVED → PROCESSING → PAID
              ↓            ↓
          ADJUSTED    ON_HOLD (compliance review)
```

### Greenhouse States

```
SETUP → CALIBRATING → ACTIVE → NEEDS_ATTENTION → ACTIVE
                         ↓
                    OFFLINE → MAINTENANCE → ACTIVE
```

---

## Business Rules

| Rule ID | Rule Name | Applies To | Condition | Action | Exception |
|---------|-----------|------------|-----------|--------|-----------|
| BR-001 | Minimum listing price | SALE-001 | Price < $1 | Block listing | Bundle sales allowed |
| BR-002 | Same-day harvest listing | SALE-001 | Harvest today | Auto-price premium | Manual override |
| BR-003 | Outreach rate limit | RECR-002 | >50 messages/day | Throttle | Campaign mode |
| BR-004 | Commission minimum | ANLY-001 | Commission < $10 | Roll to next month | Final payout |
| BR-005 | Sensor alert cooldown | GROW-001 | Same alert < 1hr ago | Suppress | Critical alerts |
| BR-006 | New member protection | RECR-005 | Member < 30 days | Extra guidance | Experienced transfer |
| BR-007 | Board advancement validation | ANLY-002 | Production threshold | Verify data | Manual review |
| BR-008 | Payout verification | ANLY-001 | Payout > $1000 | Flag for review | VIP tier bypass |
| BR-009 | Recruiting cooldown | RECR-001 | Prospect said no | 30 day wait | Prospect re-initiates |
| BR-010 | Regional pricing bounds | SALE-002 | Price > 2x regional avg | Warning | Premium products |

---

## Implementation Priorities

### Phase 1: Core (Weeks 1-4)
- [ ] Growing Agent: GROW-001, GROW-002, GROW-004
- [ ] Sales Agent: SALE-001, SALE-003, SALE-005
- [ ] Analytics Agent: ANLY-001, ANLY-002
- [ ] Interface: Mobile app basics, SMS notifications
- [ ] Memory: Working + short-term memory
- [ ] Data: PostgreSQL core tables

### Phase 2: Expansion (Weeks 5-8)
- [ ] Recruiting Agent: RECR-001, RECR-002, RECR-005
- [ ] Mentor Agent: MENT-001, MENT-002
- [ ] Growing Agent: GROW-005, GROW-006, GROW-007
- [ ] Sales Agent: SALE-002, SALE-004
- [ ] Automation: Daily workflows
- [ ] Memory: Long-term memory

### Phase 3: Intelligence (Weeks 9-12)
- [ ] All agents: Remaining skills
- [ ] Scout Agent: SCOT-001 to SCOT-005
- [ ] Personalization: Full implementation
- [ ] Memory: Episodic + semantic memory
- [ ] Data: Graph DB for network

### Phase 4: Scale (Ongoing)
- [ ] Cross-agent coordination
- [ ] Advanced personalization
- [ ] Network-wide learning
- [ ] Full automation layer
- [ ] Voice interfaces

---

*This document defines the complete AI Operating System for AMNI. All agents, skills, data, and automations should be implemented according to these specifications.*
