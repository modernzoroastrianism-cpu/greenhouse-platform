# AMNI Agent MCP (Model Context Protocol)

## Overview

The MCP layer enables AI agents to connect to external services and take real actions. Each integration exposes **tools** that agents can call, with proper authentication and human approval gates.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AMNI MCP ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         AI AGENTS                                    │   │
│  │  Growing │ Sales │ Recruiting │ Analytics │ Mentor │ Scout          │   │
│  └────────────────────────────────┬────────────────────────────────────┘   │
│                                   │                                         │
│                                   ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      MCP GATEWAY                                     │   │
│  │  • Tool routing    • Auth management    • Rate limiting              │   │
│  │  • Approval gates  • Audit logging      • Error handling             │   │
│  └────────────────────────────────┬────────────────────────────────────┘   │
│                                   │                                         │
│         ┌─────────────────────────┼─────────────────────────┐              │
│         ▼                         ▼                         ▼              │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐          │
│  │  ACCOUNTING │         │   PAYMENTS  │         │     CRM     │          │
│  │  QuickBooks │         │   Stripe    │         │  HubSpot    │          │
│  │  Xero       │         │   Square    │         │  Salesforce │          │
│  │  Wave       │         │   PayPal    │         │  Pipedrive  │          │
│  └─────────────┘         └─────────────┘         └─────────────┘          │
│                                                                             │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐          │
│  │   E-COMM    │         │   COMMS     │         │     IoT     │          │
│  │  Shopify    │         │   Twilio    │         │    MQTT     │          │
│  │  WooCommerce│         │   SendGrid  │         │  Sensor Hub │          │
│  │  Etsy       │         │   Mailchimp │         │  Climate    │          │
│  └─────────────┘         └─────────────┘         └─────────────┘          │
│                                                                             │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐          │
│  │   SOCIAL    │         │   CALENDAR  │         │   WEATHER   │          │
│  │  Facebook   │         │   Google    │         │  OpenWeather│          │
│  │  Instagram  │         │   Outlook   │         │   NWS       │          │
│  │  LinkedIn   │         │   Calendly  │         │  Tomorrow.io│          │
│  └─────────────┘         └─────────────┘         └─────────────┘          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Integration Categories

### 1. Accounting & Finance

| Integration | Tools Exposed | Agent User | Approval Required |
|-------------|---------------|------------|-------------------|
| **QuickBooks** | create_invoice, record_expense, get_p&l, sync_transactions | Analytics | Transactions > $100 |
| **Xero** | Same as QuickBooks | Analytics | Transactions > $100 |
| **Wave** | create_invoice, record_expense, get_reports | Analytics | Transactions > $50 |
| **Plaid** | get_balance, get_transactions, verify_account | Analytics | Always |

**QuickBooks MCP Tools:**
```typescript
// Tools available to agents
quickbooks.create_invoice({ customer_id, items, due_date })
quickbooks.record_expense({ vendor, amount, category, receipt_url })
quickbooks.get_profit_loss({ start_date, end_date })
quickbooks.get_balance_sheet({ as_of_date })
quickbooks.sync_sales({ source: 'marketplace' })
quickbooks.categorize_transaction({ transaction_id, category })
```

---

### 2. Payment Processing

| Integration | Tools Exposed | Agent User | Approval Required |
|-------------|---------------|------------|-------------------|
| **Stripe** | create_payment_link, process_refund, create_subscription, get_payouts | Sales | Refunds, payouts |
| **Square** | process_payment, create_invoice, manage_catalog | Sales | Refunds |
| **PayPal** | send_money, create_invoice, get_transactions | Sales | Send money |

**Stripe MCP Tools:**
```typescript
stripe.create_payment_link({ amount, description, metadata })
stripe.create_checkout_session({ line_items, success_url, cancel_url })
stripe.process_refund({ payment_intent_id, amount, reason })
stripe.create_subscription({ customer_id, price_id })
stripe.get_balance()
stripe.list_payouts({ limit, status })
stripe.create_payout({ amount, destination })
```

---

### 3. CRM & Sales

| Integration | Tools Exposed | Agent User | Approval Required |
|-------------|---------------|------------|-------------------|
| **HubSpot** | create_contact, create_deal, send_email, log_activity | Recruiting, Sales | Bulk emails |
| **Salesforce** | create_lead, update_opportunity, run_report | Recruiting | None |
| **Pipedrive** | create_person, create_deal, schedule_activity | Recruiting | None |

**HubSpot MCP Tools:**
```typescript
hubspot.create_contact({ email, first_name, last_name, properties })
hubspot.update_contact({ contact_id, properties })
hubspot.create_deal({ name, stage, amount, contact_ids })
hubspot.move_deal_stage({ deal_id, stage })
hubspot.send_email({ to, template_id, personalization })
hubspot.log_activity({ contact_id, type, notes })
hubspot.get_contact_timeline({ contact_id })
```

---

### 4. E-Commerce

| Integration | Tools Exposed | Agent User | Approval Required |
|-------------|---------------|------------|-------------------|
| **Shopify** | create_product, update_inventory, fulfill_order, get_analytics | Sales | None |
| **WooCommerce** | create_product, manage_orders, update_stock | Sales | None |
| **Etsy** | create_listing, update_listing, respond_to_message | Sales | None |

**Shopify MCP Tools:**
```typescript
shopify.create_product({ title, description, price, images, inventory })
shopify.update_product({ product_id, updates })
shopify.update_inventory({ inventory_item_id, quantity })
shopify.get_orders({ status, date_range })
shopify.fulfill_order({ order_id, tracking_number, carrier })
shopify.get_analytics({ metric, date_range })
```

---

### 5. Communication

| Integration | Tools Exposed | Agent User | Approval Required |
|-------------|---------------|------------|-------------------|
| **Twilio** | send_sms, make_call, send_whatsapp | All | Bulk messages |
| **SendGrid** | send_email, send_template, get_analytics | All | Bulk emails |
| **Mailchimp** | add_subscriber, send_campaign, get_reports | Recruiting | Campaigns |

**Twilio MCP Tools:**
```typescript
twilio.send_sms({ to, body, media_url? })
twilio.send_whatsapp({ to, template, parameters })
twilio.make_call({ to, twiml_url })
twilio.get_message_status({ message_sid })
twilio.schedule_message({ to, body, send_at })
```

---

### 6. Social Media

| Integration | Tools Exposed | Agent User | Approval Required |
|-------------|---------------|------------|-------------------|
| **Facebook/Meta** | create_post, respond_comment, get_insights, run_ad | Sales, Recruiting | Ads, public posts |
| **Instagram** | create_post, respond_dm, get_insights | Sales | Public posts |
| **LinkedIn** | create_post, send_connection, send_message | Recruiting | Public posts |

**Meta MCP Tools:**
```typescript
meta.create_post({ page_id, message, media_urls?, link? })
meta.schedule_post({ page_id, message, scheduled_time })
meta.respond_to_comment({ comment_id, message })
meta.get_page_insights({ page_id, metrics, date_range })
meta.create_ad({ campaign_id, creative, targeting, budget })
```

---

### 7. Calendar & Scheduling

| Integration | Tools Exposed | Agent User | Approval Required |
|-------------|---------------|------------|-------------------|
| **Google Calendar** | create_event, get_free_busy, send_invite | All | None |
| **Outlook** | create_event, get_availability, send_invite | All | None |
| **Calendly** | get_available_times, create_booking, cancel_booking | Recruiting | None |

**Google Calendar MCP Tools:**
```typescript
gcal.create_event({ summary, start, end, attendees?, location? })
gcal.update_event({ event_id, updates })
gcal.delete_event({ event_id })
gcal.get_free_busy({ time_min, time_max, calendars })
gcal.list_events({ calendar_id, date_range })
```

---

### 8. IoT & Sensors

| Integration | Tools Exposed | Agent User | Approval Required |
|-------------|---------------|------------|-------------------|
| **MQTT Broker** | subscribe_topic, publish_command, get_readings | Growing | Climate changes |
| **Sensor Hub** | get_temperature, get_humidity, get_soil_moisture | Growing | None |
| **Climate Control** | set_temperature, set_humidity, set_ventilation | Growing | Major changes |

**IoT MCP Tools:**
```typescript
iot.get_sensor_reading({ sensor_id, metric })
iot.get_all_readings({ greenhouse_id })
iot.set_climate({ greenhouse_id, temperature?, humidity?, ventilation? })
iot.trigger_irrigation({ zone_id, duration_minutes })
iot.get_historical_data({ sensor_id, start, end, granularity })
iot.set_alert_threshold({ sensor_id, metric, min?, max? })
```

---

### 9. Weather

| Integration | Tools Exposed | Agent User | Approval Required |
|-------------|---------------|------------|-------------------|
| **OpenWeather** | get_current, get_forecast, get_alerts | Growing | None |
| **NWS** | get_forecast, get_alerts, get_historical | Growing | None |
| **Tomorrow.io** | get_minute_forecast, get_pollen, get_air_quality | Growing | None |

**Weather MCP Tools:**
```typescript
weather.get_current({ location })
weather.get_forecast({ location, days })
weather.get_hourly_forecast({ location, hours })
weather.get_alerts({ location })
weather.get_historical({ location, date_range })
```

---

### 10. Real Estate (Scout Agent)

| Integration | Tools Exposed | Agent User | Approval Required |
|-------------|---------------|------------|-------------------|
| **Zillow** | search_properties, get_property_details, get_zestimate | Scout | None |
| **Realtor.com** | search_farms, get_listing_details | Scout | None |
| **County Records** | get_parcel_info, get_tax_history, get_liens | Scout | None |

**Real Estate MCP Tools:**
```typescript
realestate.search_properties({ location, type, price_range, acreage })
realestate.get_property_details({ property_id })
realestate.get_comparable_sales({ property_id, radius, months })
realestate.get_tax_assessment({ parcel_id })
realestate.get_zoning_info({ parcel_id })
```

---

## MCP Gateway Architecture

### Authentication Flow

```
1. User connects integration in Settings
2. OAuth flow → tokens stored encrypted in Supabase
3. Agent requests tool call
4. MCP Gateway:
   a. Validates agent has permission for tool
   b. Checks if approval required
   c. If yes, queues for human approval
   d. If no, executes with stored credentials
5. Response returned to agent
6. All calls logged for audit
```

### Approval Queue

```typescript
interface ApprovalRequest {
  id: string
  agent_id: string
  tool: string
  params: Record<string, any>
  reason: string
  risk_level: 'low' | 'medium' | 'high'
  created_at: Date
  expires_at: Date
  status: 'pending' | 'approved' | 'rejected' | 'expired'
}
```

### Rate Limiting

| Integration | Calls/Hour | Calls/Day | Burst |
|-------------|------------|-----------|-------|
| QuickBooks | 500 | 5,000 | 50 |
| Stripe | 1,000 | 10,000 | 100 |
| Twilio | 100 | 1,000 | 20 |
| Social Media | 50 | 500 | 10 |
| IoT | 10,000 | 100,000 | 1,000 |

### Audit Logging

Every MCP call is logged:

```typescript
interface AuditLog {
  id: string
  timestamp: Date
  member_id: string
  agent_id: string
  integration: string
  tool: string
  params: Record<string, any>
  result: 'success' | 'error' | 'approval_required'
  response_summary: string
  duration_ms: number
  approval_id?: string
}
```

---

## Integration Setup Flow

### For Members (UI)

1. Go to Settings → Integrations
2. Click "Connect" on desired integration
3. Complete OAuth flow (redirects to provider)
4. Set approval thresholds
5. Integration active, agents can use

### For Developers (API)

```typescript
// Register new integration
POST /api/integrations/register
{
  "integration_id": "quickbooks",
  "credentials": {
    "access_token": "encrypted_token",
    "refresh_token": "encrypted_token",
    "company_id": "123456789"
  },
  "settings": {
    "auto_sync": true,
    "approval_threshold": 100
  }
}

// Agent tool call
POST /api/mcp/call
{
  "agent_id": "agent_uuid",
  "tool": "quickbooks.create_invoice",
  "params": {
    "customer_id": "cust_123",
    "items": [{ "description": "Tomatoes 5lb", "amount": 25.00 }],
    "due_date": "2026-03-01"
  }
}
```

---

## Pre-Built Integration Packages

### Starter Package Integrations
- IoT Sensors (MQTT)
- Weather (OpenWeather)
- Twilio (SMS alerts)

### Pro Package Integrations
All Starter plus:
- Stripe (payments)
- QuickBooks (accounting)
- Google Calendar
- Basic social (Facebook Page)

### Commercial Package Integrations
All Pro plus:
- Full CRM (HubSpot/Salesforce)
- Advanced e-commerce (Shopify)
- Full social suite
- Real estate APIs
- Custom integrations

---

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Token theft | Encrypted at rest, short-lived access tokens |
| Excessive permissions | Least-privilege OAuth scopes |
| Runaway spending | Approval gates, daily limits |
| Data leakage | Audit logs, data minimization |
| Service outage | Retry with backoff, fallback queuing |

---

## Implementation Priority

### Phase 1 (MVP)
- [ ] MCP Gateway core
- [ ] Stripe integration
- [ ] IoT/MQTT integration
- [ ] Twilio SMS
- [ ] Approval queue UI

### Phase 2
- [ ] QuickBooks
- [ ] Google Calendar
- [ ] SendGrid email
- [ ] Weather APIs

### Phase 3
- [ ] HubSpot CRM
- [ ] Shopify
- [ ] Social media (Meta)
- [ ] Calendly

### Phase 4
- [ ] Full social suite
- [ ] Real estate APIs
- [ ] Advanced analytics integrations
- [ ] Custom webhook builder

---

*The MCP layer is what transforms AMNI agents from chatbots into actual business operators.*
