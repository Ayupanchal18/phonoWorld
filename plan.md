# MASTER PROMPT — Build a Production-Grade Indian Consumer-Tech Platform

You are the lead product architect, senior full-stack engineer, data architect, SEO architect, DevOps engineer, and technical project manager for this project.

We are going to build a **large-scale Indian consumer technology discovery, comparison, specification, pricing, review, and recommendation platform**, inspired by the product categories and functionality of websites such as 91mobiles, Smartprix, Gadgets 360, and GSMArena.

IMPORTANT:

We are NOT trying to make a superficial clone.

We want to build a technically sophisticated, scalable, production-oriented platform that can eventually compete in the same product category while having its own architecture, UX, data model, recommendation system, pricing infrastructure, and differentiated features.

The first category will be **smartphones**.

The architecture must be designed so that we can eventually expand into:

* Smartphones
* Laptops
* Tablets
* Smart TVs
* Smartwatches
* Earbuds/headphones
* Cameras
* Gaming products
* Accessories
* Other consumer electronics

Do NOT start coding yet.

Your first task is to create the **largest, most comprehensive MASTER PLAN FILE possible** for this project.

The plan must become the project's source of truth.

Create:

`MASTER_PLAN.md`

at the root of the project.

If the file already exists, inspect it and substantially improve/update it rather than blindly overwriting useful information.

---

# 1. PROJECT OBJECTIVE

Define the product clearly.

The platform should eventually allow users to:

* Discover products
* Search products
* Filter products
* Compare products
* View detailed specifications
* View variants
* View current prices
* Compare prices across sellers
* View price history
* Track price changes
* Set price alerts
* Read reviews
* Submit reviews
* Rate products
* Find products based on requirements
* Receive personalized recommendations
* Browse buying guides
* Read technology content
* Discover deals
* Save products
* Create wishlists
* Share product pages
* Share comparisons
* View related products
* Discover alternatives
* Understand product strengths/weaknesses
* Eventually discover products across multiple electronics categories

The product should be optimized for:

1. Accuracy
2. Data quality
3. Search
4. Comparison
5. Price discovery
6. SEO
7. Performance
8. Scalability
9. User experience
10. Maintainability

---

# 2. VERY IMPORTANT — DATA SOURCING

This is one of the most important parts of the project.

Do NOT assume that data can simply be copied from existing websites.

The plan must explicitly distinguish:

### A. Data we can create ourselves

Examples:

* Product records
* Normalized specifications
* Internal categories
* Product relationships
* Our own scores
* Our own recommendation logic
* User reviews
* User ratings
* Price history collected through permitted sources
* Editorial content
* Buying guides
* Search metadata

### B. Manufacturer/source data

Research how product specifications can be sourced from:

* Official manufacturer websites
* Manufacturer product pages
* Official launch announcements
* Official press/media resources

Explain:

* What data can be collected
* How it should be normalized
* How source attribution should work
* How source verification should work
* How stale data should be detected

### C. Retailer/affiliate data

Investigate current legitimate options for:

* Amazon India
* Flipkart
* Croma
* Reliance Digital
* Vijay Sales
* Other major Indian retailers

Research official APIs, affiliate feeds, product feeds, partner programs, or other legitimate programmatic sources where available.

For every source, document:

* Source name
* Official URL
* API/feed availability
* Eligibility requirements
* Whether it is free
* Known limitations
* Rate limits if publicly documented
* Data available
* Price availability
* Product availability
* Images
* Seller information
* Affiliate requirements
* Display restrictions
* Caching/storage restrictions
* Commercial usage considerations

Do NOT assume a source is free simply because an API exists.

Do NOT recommend violating terms of service.

Do NOT design the system around unauthorized scraping as the primary strategy.

If a source is uncertain, mark it clearly as:

`VERIFY BEFORE IMPLEMENTATION`

---

# 3. FREE-FIRST MVP

Design a strategy where development can begin with minimal or zero external data cost.

Create a section:

`FREE / LOW-COST DATA STRATEGY`

The initial target should be approximately:

* 100 manually verified smartphones
* Then 500
* Then 1,000
* Eventually thousands

Explain exactly how to bootstrap the first dataset.

Do not recommend buying expensive APIs before they are necessary.

---

# 4. COMPETITOR ANALYSIS

Research current products in this category.

At minimum analyze:

* 91mobiles
* Smartprix
* Gadgets 360
* GSMArena
* MySmartPrice
* Cashify

For each, document:

* Main product functionality
* Search
* Filtering
* Phone finder
* Comparison
* Pricing
* Price history
* Reviews
* Ratings
* Content
* Deals
* SEO structure
* Product pages
* Category pages
* User features
* Potential technical observations
* Potential opportunities for differentiation

Do NOT copy their proprietary content.

Use competitor research only to understand product patterns and identify opportunities.

Clearly distinguish:

* Observed facts
* Your analysis
* Proposed features

---

# 5. PRODUCT VISION

Define:

* Product vision
* Product mission
* Target users
* User personas
* Core problems
* Jobs-to-be-done
* Primary use cases
* Secondary use cases
* User journeys
* Product principles

Create detailed user journeys for:

### User Journey 1

User wants to buy a phone under ₹20,000.

### User Journey 2

User wants to compare two phones.

### User Journey 3

User wants the cheapest legitimate offer.

### User Journey 4

User wants to know whether a phone is worth buying.

### User Journey 5

User wants a phone based on gaming/camera/battery priorities.

### User Journey 6

User wants to track a phone price.

### User Journey 7

User wants to submit a review.

### User Journey 8

Admin wants to add a new phone.

### User Journey 9

Admin wants to correct inaccurate specifications.

---

# 6. FEATURE INVENTORY

Create a complete feature inventory.

Categorize every feature into:

* MVP
* V1
* V2
* Future

Do NOT simply make everything MVP.

Prioritize features based on:

* User value
* Engineering complexity
* Data dependency
* SEO value
* Revenue potential
* Scalability implications

Include a priority matrix.

---

# 7. TECH STACK

We are primarily a MERN-stack developer.

Design the system around:

### Frontend

* React
* React Router
* Tailwind CSS
* TanStack Query where appropriate
* Redux Toolkit only where global client state actually requires it
* Axios or appropriate HTTP client
* Modern component architecture

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

But do not blindly force MERN everywhere.

If another technology is technically superior for a specific requirement, explain it.

Potential technologies to evaluate:

* Redis
* BullMQ
* Elasticsearch/OpenSearch
* Meilisearch
* MongoDB Atlas Search
* Object storage
* CDN
* Queue systems
* Cron workers
* WebSockets
* Server-side rendering / pre-rendering
* Cloud functions
* Background workers

Explain whether each is:

* Required
* Recommended
* Optional
* Future

---

# 8. SYSTEM ARCHITECTURE

Design the complete architecture.

Include:

* Frontend
* API
* Database
* Search
* Cache
* Workers
* Data ingestion
* Price collection
* Notifications
* Authentication
* Admin
* Media storage
* Analytics
* Monitoring
* Logging
* SEO generation

Create clear architecture diagrams using Mermaid where useful.

Example:

```text
Data Sources
     ↓
Ingestion Workers
     ↓
Normalization
     ↓
Validation
     ↓
Admin Review
     ↓
Canonical Database
     ↓
Search Index
     ↓
API
     ↓
Frontend
```

---

# 9. DATABASE ARCHITECTURE

This must be extremely detailed.

Design schemas for at least:

* User
* Role
* Permission
* Brand
* Category
* Product
* ProductVariant
* ProductSpecification
* SpecificationDefinition
* SpecificationValue
* ProductImage
* ProductVideo
* Seller
* Offer
* PriceHistory
* PriceAlert
* Review
* ReviewVote
* Rating
* Wishlist
* WishlistItem
* Comparison
* Search
* SearchSuggestion
* ProductRelationship
* AlternativeProduct
* Recommendation
* RecommendationRule
* EditorialArticle
* BuyingGuide
* Deal
* Coupon
* Notification
* DataSource
* DataImport
* DataChange
* AuditLog

For each schema specify:

* Fields
* Data types
* Required fields
* Optional fields
* Validation
* Indexes
* Unique constraints
* Relationships
* References
* Embedded vs referenced data
* Soft deletion
* Timestamps
* Versioning where required

Provide actual Mongoose schema recommendations.

---

# 10. PRODUCT DATA MODEL

Design a canonical product identity system.

This is critical.

For example:

```text
Samsung Galaxy S25
       ↓
Product
       ↓
12GB / 256GB / Black
       ↓
Variant
       ↓
Model number / SKU / identifiers
       ↓
Amazon
Flipkart
Croma
etc.
```

Explain how the system determines that multiple retailer listings represent the same canonical product.

Design:

* Product identity
* Variant identity
* SKU mapping
* Model number mapping
* GTIN/EAN where applicable
* Retailer IDs
* Source IDs
* Duplicate detection
* Fuzzy matching
* Manual verification
* Confidence score

---

# 11. DATA NORMALIZATION ENGINE

Design a normalization pipeline.

Handle differences such as:

```text
5000 mAh
5,000mAh
5000mah
Battery capacity: 5000 mAh
```

Normalize to a canonical structure.

Do this for:

* RAM
* Storage
* Display
* Resolution
* Refresh rate
* Battery
* Charging
* Camera
* Processor
* GPU
* Dimensions
* Weight
* OS
* Connectivity
* 5G bands
* Wi-Fi
* Bluetooth
* NFC
* Sensors
* Colors

Document normalization rules.

---

# 12. DATA QUALITY SYSTEM

Create a formal data-quality architecture.

Include:

* Source priority
* Confidence scores
* Conflict detection
* Validation rules
* Stale-data detection
* Missing-data detection
* Duplicate detection
* Outlier detection
* Manual review
* Audit trail
* Data versioning
* Change history

Example:

```text
Manufacturer source
      ↓
Confidence = HIGH

Third-party source
      ↓
Confidence = MEDIUM

User submitted
      ↓
Confidence = LOW
```

But define an actual methodology rather than blindly assigning these labels.

---

# 13. ADMIN CMS

Design a powerful admin panel.

Admins should be able to:

* Add product
* Edit product
* Add variants
* Add specifications
* Add brands
* Manage categories
* Approve reviews
* Manage sellers
* Review imported data
* Resolve duplicate products
* Resolve conflicting specifications
* Review price anomalies
* Manage articles
* Manage buying guides
* Manage deals
* View import jobs
* View failed imports
* View audit logs

Include detailed admin workflows.

---

# 14. SEARCH ENGINE

Design a sophisticated search system.

Requirements:

* Full-text search
* Typo tolerance
* Autocomplete
* Brand search
* Model search
* Variant search
* Specification search
* Synonyms
* Ranking
* Filters
* Search suggestions
* Popular searches
* Zero-result handling

Examples:

```text
"s25"
"iphone 16"
"best samsung under 30000"
"gaming phone under 25000"
"12gb 256gb"
"amoled 120hz"
```

Explain how each should be interpreted.

---

# 15. FILTERING ENGINE

Design advanced filters.

For smartphones:

* Price
* Brand
* RAM
* Storage
* Processor
* Display
* Refresh rate
* Battery
* Charging
* Camera
* 5G
* OS
* Launch date
* Rating
* Availability

Include:

* Faceted search
* Dynamic filter counts
* URL-based filters
* SEO considerations
* Performance considerations

---

# 16. PHONE COMPARISON ENGINE

Design comparison functionality for 2–4 products.

Include:

* Specification comparison
* Price comparison
* Feature differences
* Highlighted differences
* Similarities
* Pros/cons
* Scores
* Variant matching
* Price differences
* Recommendation explanation

Do not make the comparison merely a giant table.

Design an excellent UX.

---

# 17. PHONE FINDER / RECOMMENDATION ENGINE

This should be one of the major differentiating features.

User inputs:

* Budget
* Gaming importance
* Camera importance
* Battery importance
* Display importance
* Performance importance
* Software importance
* Brand preference
* Size preference
* Storage requirement

Design a scoring/recommendation algorithm.

Example:

```text
User priorities
      ↓
Candidate filtering
      ↓
Hard constraints
      ↓
Feature scoring
      ↓
Weighted ranking
      ↓
Explanation generation
      ↓
Recommendations
```

The recommendation system must explain:

* Why a product matches
* Where it performs well
* What compromises exist
* Why another product may suit a different user

Avoid opaque recommendations.

---

# 18. PRICE ENGINE

Design:

* Current prices
* MRP
* Discount
* Seller
* Availability
* Variant
* Offer
* Coupon
* Bank offer
* Exchange offer where available
* Price history
* Lowest recorded price
* Highest recorded price
* Price drop percentage

Design price ingestion jobs.

Design anomaly detection.

Example:

```text
₹29,999
↓
₹27,999
↓
₹25,999
↓
₹23,999
```

Explain how historical prices should be stored and displayed while respecting each source's terms.

---

# 19. PRICE ALERT SYSTEM

Design:

```text
User
 ↓
Price Alert
 ↓
Target Price
 ↓
Background Worker
 ↓
Current Price
 ↓
Condition met
 ↓
Notification
```

Support:

* Email
* Push notifications
* In-app notifications

Design notification preferences.

---

# 20. REVIEW SYSTEM

Design a trustworthy review system.

Include:

* Star rating
* Written review
* Pros
* Cons
* Ownership duration
* Verified purchase if legitimately available
* Helpful votes
* Abuse reporting
* Moderation
* Spam detection
* Review sorting
* Review aggregation

Explain how to prevent:

* Spam
* Duplicate reviews
* Fake reviews
* Manipulation
* Rating abuse

---

# 21. SCORING SYSTEM

Design our own transparent scoring system.

Possible dimensions:

* Performance
* Display
* Camera
* Battery
* Software
* Build
* Connectivity
* Value

Do not simply copy another website's score.

Document:

* Inputs
* Weighting
* Normalization
* Missing-data handling
* Category-specific weighting
* Versioning
* Explainability

---

# 22. SEO ARCHITECTURE

SEO is a first-class requirement.

Design:

* Product URLs
* Brand URLs
* Category URLs
* Comparison URLs
* Search landing pages
* Buying guides
* Editorial pages
* Breadcrumbs
* Canonical URLs
* Sitemap
* Robots
* Structured data
* OpenGraph
* Meta titles
* Meta descriptions
* Internal linking
* Pagination
* Index/noindex rules
* Faceted navigation strategy

Schema.org types to evaluate:

* Product
* Offer
* AggregateRating
* Review
* Article
* BreadcrumbList
* WebSite

Do not create millions of thin/duplicate SEO pages.

Explain crawl-budget and indexation strategy.

---

# 23. PERFORMANCE

Design for high traffic.

Targets to define:

* Core Web Vitals
* API latency
* Database query latency
* Search latency
* Page-load performance
* Image optimization
* CDN caching
* API caching
* Database indexes
* Lazy loading
* Pagination
* Infinite scroll where appropriate
* Code splitting

Explain expected bottlenecks.

---

# 24. SECURITY

Design:

* Authentication
* JWT/session strategy
* Refresh tokens
* Password hashing
* OAuth if needed
* RBAC
* Admin RBAC
* Input validation
* Joi/Zod/etc.
* Rate limiting
* Helmet
* CORS
* CSRF considerations
* XSS protection
* NoSQL injection protection
* File-upload security
* API abuse prevention
* Secrets management
* Logging
* Audit logs

---

# 25. BACKGROUND JOBS

Identify all tasks that should NOT happen inside normal API requests.

Examples:

* Price updates
* Data ingestion
* Data normalization
* Search indexing
* Sitemap generation
* Email notifications
* Price alerts
* Image processing
* Review moderation
* Analytics aggregation

Design queue architecture.

Evaluate:

* BullMQ
* Redis
* Cron
* Worker processes

---

# 26. API DESIGN

Create a complete REST API plan.

For every major endpoint specify:

* Method
* Route
* Authentication
* Parameters
* Request body
* Response
* Validation
* Errors
* Pagination
* Sorting
* Filtering
* Rate limits

Include APIs for:

* Auth
* Users
* Products
* Variants
* Brands
* Search
* Filters
* Comparison
* Prices
* Price history
* Reviews
* Wishlist
* Alerts
* Recommendations
* Articles
* Admin
* Data ingestion

---

# 27. FRONTEND ARCHITECTURE

Define:

* Folder structure
* Component hierarchy
* Route structure
* Layout system
* State management
* Server state
* Error handling
* Loading states
* Empty states
* Skeletons
* Responsive design
* Accessibility

Pages should include at least:

* Home
* Search
* Category
* Product
* Comparison
* Phone Finder
* Brand
* Price history
* Wishlist
* Login
* Signup
* Profile
* Reviews
* Buying guides
* Deals
* Articles
* Admin dashboard

---

# 28. UI/UX

Define the UX principles.

The interface should be:

* Modern
* Fast
* Information-dense without being overwhelming
* Mobile-first
* Accessible
* SEO-friendly
* Trustworthy
* Easy to compare
* Easy to understand

Design the product detail page in detail.

Include:

* Product hero
* Current price
* Offers
* Key specifications
* Score
* Pros/cons
* Variants
* Price history
* Full specifications
* Reviews
* Alternatives
* Similar products
* Buying guidance

---

# 29. MOBILE-FIRST

Assume a large portion of Indian users will access the platform from mobile devices.

Define:

* Mobile navigation
* Filter drawer
* Comparison UX
* Sticky price CTA
* Mobile specification layout
* Image optimization
* Touch targets
* Performance strategy

---

# 30. MONETIZATION

Research and document possible monetization models:

* Affiliate commissions
* Sponsored placements
* Display advertising
* Premium features
* Lead generation
* Brand partnerships
* Sponsored content

Clearly separate:

* Organic ranking
* Sponsored placement

Design the architecture so monetization does not compromise user trust.

---

# 31. ANALYTICS

Define analytics events.

Examples:

```text
product_view
search
search_result_click
filter_used
comparison_created
price_click
affiliate_click
wishlist_add
price_alert_created
review_submitted
recommendation_generated
```

Design:

* Event schema
* Analytics storage
* Privacy considerations
* Admin analytics

---

# 32. OBSERVABILITY

Design:

* Application logs
* Error tracking
* API metrics
* Worker metrics
* Queue monitoring
* Database monitoring
* Uptime monitoring
* Data-source health monitoring

Define alerts for:

* API failure
* Price-source failure
* Import failure
* Queue backlog
* Database errors
* Sudden traffic spikes
* Search failure

---

# 33. TESTING

Create a comprehensive test strategy.

Include:

* Unit tests
* Integration tests
* API tests
* Database tests
* Frontend tests
* E2E tests
* Data normalization tests
* Recommendation tests
* Price calculation tests
* Security tests
* Performance tests

Define critical test cases.

---

# 34. DEVOPS / DEPLOYMENT

Create development → staging → production architecture.

Evaluate practical options for a bootstrapped developer.

Include:

* Git
* GitHub
* CI/CD
* Environment variables
* Secrets
* Database deployment
* Backend deployment
* Frontend deployment
* Worker deployment
* Redis
* Object storage
* CDN
* Domain
* SSL
* Backups
* Disaster recovery

Start with inexpensive infrastructure but design for future migration.

---

# 35. DEVELOPMENT ROADMAP

Create a detailed roadmap.

Break the project into:

### Phase 0

Research + architecture

### Phase 1

Foundation

### Phase 2

Product database

### Phase 3

Search

### Phase 4

Product pages

### Phase 5

Comparison

### Phase 6

Pricing

### Phase 7

User system

### Phase 8

Reviews

### Phase 9

Phone Finder

### Phase 10

SEO

### Phase 11

Admin CMS

### Phase 12

Data automation

### Phase 13

Performance

### Phase 14

Production launch

### Phase 15

Expansion

For every phase specify:

* Objective
* Features
* Technical tasks
* Dependencies
* Deliverables
* Definition of done
* Risks
* Estimated complexity
* Testing requirements

---

# 36. TASK BREAKDOWN

Convert the roadmap into granular engineering tasks.

Use IDs:

```text
ARCH-001
DB-001
API-001
FE-001
SEARCH-001
PRICE-001
ADMIN-001
SEO-001
TEST-001
DEVOPS-001
```

Each task should contain:

* ID
* Title
* Description
* Dependencies
* Priority
* Complexity
* Acceptance criteria

The tasks should eventually be small enough for an AI coding agent to implement one at a time.

---

# 37. IMPLEMENTATION ORDER

Create a strict implementation dependency graph.

Do NOT recommend building features in an arbitrary order.

For example:

```text
Architecture
 ↓
Database
 ↓
Authentication
 ↓
Product CMS
 ↓
Product API
 ↓
Frontend product pages
 ↓
Search
 ↓
Comparison
 ↓
Pricing
 ↓
Recommendations
 ↓
SEO
```

Correct the ordering wherever technically necessary.

---

# 38. DATA INGESTION ROADMAP

Create a separate roadmap for data.

Phase 1:

Manual entry.

Phase 2:

Semi-automated ingestion.

Phase 3:

API/feed integration.

Phase 4:

Automated normalization.

Phase 5:

Conflict detection.

Phase 6:

Automated validation.

Phase 7:

Continuous updates.

Define exactly what remains human-reviewed.

---

# 39. LEGAL / COMPLIANCE CONSIDERATIONS

Create a practical section covering:

* Data licensing
* API terms
* Affiliate requirements
* Copyright
* Product images
* Reviews
* User-generated content
* Privacy
* Cookies
* Terms of service
* Data retention
* User deletion
* DMCA/IP complaints
* Indian legal considerations where applicable

Do not provide legal certainty where professional legal advice is required.

Flag items that should be reviewed by a lawyer.

---

# 40. REVENUE-READY ARCHITECTURE

Even though we are initially building a free project, make the architecture capable of supporting affiliate tracking later.

Design:

```text
User
 ↓
Product
 ↓
Offer
 ↓
Affiliate Link
 ↓
Click Tracking
 ↓
Retailer
```

Track:

* Product
* Variant
* Seller
* Source
* Click timestamp
* Placement
* Campaign
* Device where appropriate and privacy-compliant

---

# 41. SECURITY + TRUST MODEL

This platform will influence purchasing decisions.

Therefore explicitly design for:

* Accurate data
* Transparent methodology
* Source tracking
* Clear affiliate disclosure
* No hidden sponsored rankings
* Review moderation
* Price freshness
* Availability freshness
* Data correction workflows

---

# 42. DIFFERENTIATION

Do NOT merely copy existing sites.

Identify at least 15 potential differentiators.

Examples to investigate:

* Explainable recommendations
* Better comparison UX
* Better price history
* Product lifecycle tracking
* Ownership-cost analysis
* Personalized recommendations
* User-defined priorities
* "Should I buy?" analysis
* Upgrade recommendations
* Phone-vs-phone scenario simulation
* Better filters
* Better mobile UX
* Community ownership reports
* AI-assisted product discovery
* Product alternatives

For every proposed differentiator explain:

* User value
* Technical complexity
* Data requirement
* Competitive advantage
* MVP suitability

---

# 43. AI FEATURES

Evaluate useful AI features.

Do not add AI merely because it sounds impressive.

Potential features:

* Natural-language product search
* Recommendation explanations
* Specification summarization
* Review summarization
* Comparison summaries
* Query understanding
* Product matching
* Duplicate detection
* Data anomaly detection
* Editorial assistance

For each feature determine whether it should use:

* Deterministic logic
* Traditional algorithms
* LLM
* Embeddings
* Hybrid approach

Prefer deterministic systems where they are more reliable.

---

# 44. SEARCH EXAMPLES

Design how the platform should handle:

```text
best phone under 20000
best gaming phone under 25000
best camera phone
phones with 120hz amoled
samsung under 30000
iphone vs samsung
phone with 6000mah battery
12gb 256gb phone
best phone for parents
best phone for gaming
```

Explain the query-processing architecture.

---

# 45. SCALABILITY PLAN

Design for:

### 500 products

### 5,000 products

### 50,000 products

### Millions of monthly users

Explain when infrastructure needs to change.

Do not over-engineer the MVP.

---

# 46. COST MODEL

Provide estimated infrastructure costs for:

### Development

### MVP

### 10k monthly users

### 100k monthly users

### 1M monthly users

Separate:

* Hosting
* Database
* Redis
* Search
* Storage
* CDN
* APIs
* Data providers
* Email
* Notifications

Use current public pricing where possible and clearly label estimates.

---

# 47. RISKS

Create a risk register.

At minimum:

* Data availability
* Data licensing
* Retailer API access
* Price freshness
* Product duplication
* SEO competition
* Infrastructure cost
* Spam
* Fake reviews
* API failures
* Scaling
* Search quality
* Data accuracy
* Affiliate dependency

For each:

* Probability
* Impact
* Mitigation
* Contingency

Do not use arbitrary numerical scoring unless there is a defined methodology.

---

# 48. DEFINITION OF DONE

Create project-wide standards.

A feature is not done until:

* Implementation complete
* Validation complete
* Error handling complete
* Loading states complete
* Empty states complete
* Responsive UI complete
* Accessibility considered
* Tests added
* Security reviewed
* Documentation updated
* Analytics considered
* SEO considered where applicable
* Performance considered

---

# 49. CODING STANDARDS

Define:

* Naming conventions
* Folder conventions
* Component conventions
* API conventions
* Error handling
* Response format
* Validation
* HTTP status codes
* Environment variables
* Git conventions
* Commit conventions
* Documentation standards
* Comments
* Type safety strategy if TypeScript is considered

---

# 50. PROJECT DIRECTORY STRUCTURE

Propose the final monorepo/project structure.

Example:

```text
project/
├── apps/
│   ├── web/
│   ├── api/
│   ├── admin/
│   └── workers/
│
├── packages/
│   ├── database/
│   ├── shared/
│   ├── validation/
│   ├── config/
│   └── ui/
│
├── docs/
├── scripts/
└── MASTER_PLAN.md
```

Do not assume this exact structure is correct. Evaluate it and propose the best practical structure.

---

# 51. PROJECT DOCUMENTATION

The plan should specify future documentation files such as:

```text
MASTER_PLAN.md
ARCHITECTURE.md
DATABASE.md
API.md
DATA_SOURCES.md
DATA_PIPELINE.md
SEARCH.md
PRICING.md
RECOMMENDATIONS.md
SEO.md
SECURITY.md
DEPLOYMENT.md
TESTING.md
ROADMAP.md
```

Explain what belongs in each.

---

# 52. DECISION LOG

Create a section for Architecture Decision Records.

Every major technical decision should eventually document:

* Decision
* Context
* Alternatives
* Reason
* Consequences

---

# 53. DO NOT CODE YET

This is extremely important.

Your current task is ONLY:

1. Research
2. Analyze
3. Architect
4. Plan
5. Document

Do not begin implementing the application.

Do not create dozens of placeholder files just to appear productive.

Do not generate boilerplate code.

First produce the comprehensive `MASTER_PLAN.md`.

---

# 54. RESEARCH REQUIREMENT

For claims about:

* Current competitor features
* APIs
* Affiliate programs
* Pricing
* Data providers
* Terms
* Current technologies
* Current product functionality

Use current internet research.

Prefer:

1. Official documentation
2. Official API documentation
3. Official company pages
4. Primary sources
5. Reputable technical sources

Do not rely on random SEO blogs when primary documentation exists.

For every important external dependency, record the source URL in the plan.

---

# 55. HONEST ENGINEERING ASSESSMENT

Be brutally realistic.

Explicitly identify:

* What one developer can realistically build
* What will take months
* What requires automation
* What requires money
* What requires external partnerships
* What cannot realistically be replicated quickly
* What is technically easy
* What is deceptively difficult

Do not tell me everything is easy.

Do not hide major risks.

---

# 56. FINAL MASTER PLAN STRUCTURE

The resulting `MASTER_PLAN.md` should contain at least:

1. Executive Summary
2. Product Vision
3. Product Goals
4. Target Users
5. Competitive Landscape
6. Feature Matrix
7. MVP Definition
8. Product Roadmap
9. System Architecture
10. Technology Stack
11. Database Architecture
12. Canonical Product Model
13. Data Sources
14. Data Licensing Considerations
15. Data Ingestion Architecture
16. Data Normalization
17. Data Quality
18. Search Architecture
19. Filtering Architecture
20. Comparison Engine
21. Price Engine
22. Price History
23. Price Alerts
24. Recommendation Engine
25. Review System
26. Scoring Methodology
27. Admin CMS
28. Frontend Architecture
29. UX Architecture
30. SEO Architecture
31. Performance
32. Security
33. Background Jobs
34. API Architecture
35. Analytics
36. Observability
37. Testing
38. DevOps
39. Deployment
40. Cost Model
41. Monetization
42. AI Opportunities
43. Scalability
44. Risks
45. Legal/Compliance Considerations
46. Development Phases
47. Engineering Task Breakdown
48. Acceptance Criteria
49. Coding Standards
50. Project Structure
51. Documentation Strategy
52. Architecture Decision Records
53. Open Questions
54. Future Expansion

---

# 57. CRITICAL OUTPUT REQUIREMENT

At the end of the document, create these sections:

## CURRENT DECISIONS

Only decisions that are sufficiently justified.

## OPEN QUESTIONS

Questions that need human/product decisions.

## ASSUMPTIONS

Explicit assumptions being made.

## RISKS

The highest-impact unresolved risks.

## NEXT 10 IMPLEMENTATION TASKS

The exact first 10 engineering tasks we should perform after the planning stage.

These must be ordered by dependency.

---

# 58. QUALITY BAR

The final plan must be detailed enough that another senior engineer could open the repository, read `MASTER_PLAN.md`, and understand:

* What we are building
* Why we are building it
* How the system works
* Where the data comes from
* How the data is normalized
* How the database works
* How APIs work
* How the frontend works
* How search works
* How prices work
* How recommendations work
* How SEO works
* How the system scales
* What needs to be built first
* What should not be built yet
* What risks exist

Do not produce a generic startup plan.

Produce a **technical product + architecture + data + engineering master plan**.

The plan should be sufficiently comprehensive to guide development for the next 6–12 months.

Before finalizing, review the entire plan for contradictions, missing dependencies, unrealistic assumptions, duplicated features, and missing data/legal considerations.

Then save the final result as:

`MASTER_PLAN.md`

Do not start implementation until this plan has been created and reviewed.
