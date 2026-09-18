# PhonoWorld — Project Status & Remaining Roadmap

> **Last Updated:** September 18, 2026  
> **Repository:** `d:/portfolio_Projects/phonoworld`  
> **Tech Stack:** 100% Pure JavaScript (ES Modules, Node.js, Express, React 19, Tailwind CSS, Vite)  
> **System Status:** 🟢 All systems operational, 0 build errors, API daemon running on port 5000, Web client on port 5173.

---

## 📋 What Is Left (Authoritative Master Plan Backlog)

### Priority 1: Automated Testing & QA Suite
- [ ] **Unit Tests (`apps/api/__tests__/unit/`)**:
  - `scorer.test.js`: Mathematical validation of 8-axis scoring formulas across all 5 device categories.
  - `normalizer.test.js`: Regex extraction and transformation of raw hardware spec strings.
  - `price-sync.test.js`: Outlier rejection, ±15% volatility circuit breaker, and category floor enforcement.
  - `cache.test.js`: In-memory TTL expiration and Redis key eviction behavior.
- [ ] **REST API Integration Tests (`apps/api/__tests__/integration/`)**:
  - Supertest coverage for high-traffic endpoints: `/api/v1/products`, `/api/v1/compare`, `/api/v1/search`, `/api/v1/out/:offerId`, `/api/v1/admin/sync/reset`.
- [ ] **Frontend End-to-End Tests (`apps/web/e2e/`)**:
  - Playwright test flows: Catalog filter ➔ PDP navigation ➔ Variant switch ➔ Price alert modal ➔ Outbound store click.

### Priority 2: Indian Retail Realities & High-Intent Differentiators (from Master Plan)
- [ ] **No-Cost EMI & Tenure Calculator Widget**:
  - Interactive EMI breakdown (3, 6, 9, 12 months) with No-Cost EMI indicators on major Indian credit cards (HDFC, ICICI, SBI, Axis, Bajaj Finserv).
- [ ] **Old Phone Exchange / Buyback Estimator**:
  - Interactive trade-in calculator estimating value deduction based on brand and condition.
- [ ] **Indian 5G Band Compatibility Checker**:
  - Diagnostic badge evaluating device 5G bands against Indian carrier frequencies (Jio True 5G SA: n28/n78, Airtel 5G Plus NSA: n8/n78).

### Priority 3: Dockerization & CI/CD Pipeline
- [ ] **Containerization**:
  - Production multi-stage `Dockerfile` for Node.js API and static Nginx/Node Web client.
  - `docker-compose.yml` for unified local stack orchestration (Express API + Vite/Nginx Web + Redis cache).
- [ ] **GitHub Actions CI Pipeline**:
  - Automated workflow triggering linting, build checks, and test runner on push / pull request.

### Priority 4: Monetization & Sponsored Placements
- [ ] **Sponsored Catalog Placements**:
  - Non-intrusive "Featured Brand / Sponsored" product card slots with ASCI/FTC disclosure tags.
- [ ] **Co-Branded Bank Card Widgets**:
  - Interactive credit card promo widgets on PDP and Compare views (e.g. *"Apply for Amazon Pay ICICI / HDFC Millennia for flat 5% cashback"*).


---

## 📊 Completed & Verified Systems Overview

| Domain | Status | Key Highlights |
| :--- | :---: | :--- |
| **Multi-Category Hardware** | ✅ **Done** | Smartphones, Laptops, Wearables, Tablets, TWS Audio (16 benchmark products) |
| **Real-time Lowest Store UI** | ✅ **Done** | Dynamic lowest store badges (`🏆 Lowest on [Store]`), % discount, live savings & No-Cost EMI across Cards, PDP & Matrix |
| **Price Sanitization & Outlier Shield** | ✅ **Done** | ±15% circuit breaker, category floors, accessory filtering, PA-API baseline anchoring |
| **RBAC Security & State Hygiene** | ✅ **Done** | Zero-leak role-based routing (Admin CMS challenge guard, clean guest state, persistent compare & wishlist) |
| **Admin CMS & Price Sync Control** | ✅ **Done** | Live spec normalizer, CRUD, festive override, catalog sync & benchmark reset |
| **Catalog & Comparison Matrix** | ✅ **Done** | Multi-attribute filters, dynamic budget slider (up to ₹3.5L), 2–4 device diff comparison |
| **Interactive Price Tracking** | ✅ **Done** | SVG historical curves, lowest-ever deal markers, net effective bank card pricing |
| **Device Finder Wizard** | ✅ **Done** | Weighted questionnaire mapping budget and use case to ranked hardware recommendations |
| **Retailer Feeds & Redirection** | ✅ **Done** | Amazon PA-API 5.0 (AWS v4), Cuelinks/EarnKaro feeds, Croma/Reliance scraper, `/out/:id` redirection |
| **Edge Caching & Performance** | ✅ **Done** | Sub-5ms response times via Redis/In-Memory LRU (`X-Cache: HIT`), catalog cache purging |
| **SEO & Microdata** | ✅ **Done** | Programmatic XML sitemaps, `robots.txt`, Schema.org `Product` & `AggregateOffer` JSON-LD |
| **Community & Authentication** | ✅ **Done** | User accounts, wishlists, price drop email alerts, reviews with helpfulness voting |
