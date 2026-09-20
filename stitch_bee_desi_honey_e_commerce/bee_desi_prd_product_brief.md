# Bee Desi — Product Requirements Document (PRD) & Brand Brief
**Document Version:** 1.0.0  
**Status:** Approved & Shipped (Phase 1 Baseline)  
**Target Brand:** Bee Desi (Artisanal Native Indian Honey & Apiculture)  
**Design System:** Artisanal Nectar & Flora (`{{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_1}}`)  

---

## 1. Executive Summary & Brand Overview

### 1.1 Brand Mission
**Bee Desi** is an ultra-premium, direct-to-consumer (D2C) artisanal honey and apiculture brand dedicated to reviving India’s indigenous, raw, single-flora nectars. By sourcing directly from forest-dwelling tribal beekeepers (*Apis Cerana Indica* stewardship) across diverse agro-climatic zones (Kashmir, Sunderbans, Balaghat, Punjab, Nilgiris), Bee Desi bridges uncompromising molecular purity with centuries-old Ayurvedic apiculture.

### 1.2 Core Value Propositions
1. **Unheated & Zero Micro-Filtration:** Preserving living diastase enzymes, natural pollen spectra, and native beneficial microbes.
2. **German Bruker NMR Lab Transparency:** High-resolution 400MHz proton Nuclear Magnetic Resonance testing ensuring 0.00% synthetic C4/C3 sugar adulteration.
3. **Terroir & Single-Origin Provenance:** Celebrating the unique sensory nuance, color, viscosity, and tasting notes of distinct regional blossoms.
4. **Indigenous Ethical Stewardship:** Non-violent harvesting protocols (minimum 40% hive retention, zero-smoke trauma, direct fair wages paid to Baiga, Gond, and Mawali foragers).

---

## 2. Competitive Benchmarks & Strategic Positioning

Synthesizing insights from Indian artisanal market benchmarks (**Under The Mango Tree / UTMT**, **Shiva Organic**, **Honey Veda**):

| Dimension | Mass-Market Supermarket Honey | Direct Competitors (UTMT, Shiva Organic, Honey Veda) | Bee Desi Strategic Advantage |
| :--- | :--- | :--- | :--- |
| **Purity Verification** | Standard FSSAI batching, minimal transparency | Basic organic claims, raw unpasteurized certifications | **Batch-level NMR Spectrogram lookups** with downloadable Bruker laboratory reports per jar |
| **Harvest Transparency** | Blended commercial liquid honey, unlisted terroir | Regional origin labeled | **Single-flora micro-harvest vintages** with elevation, forest biome, floral intensity & harvest month |
| **Visual Identity & Brand Tone** | Generic yellow/gold squeeze bottles, utilitarian | Clean organic e-commerce, rustic traditional | **Luxury apothecary aesthetic:** EB Garamond editorial typography, amber glass vessels, wax seals, tactile textures |
| **E-Commerce Experience** | Commoditized discount driving | Standard Shopify catalog templates | **Interactive Terroir Matcher**, sensory flavor matrices (sweetness vs. astringency), and ritual-first PDPs |

---

## 3. Product Scope & Digital Architecture

### 3.1 Platform Ecosystem
The initial release encompasses a responsive cross-platform web experience (Desktop Web standard + Mobile App / Progressive Web App):

1. **Homepage & Brand Showcase** (`{{DATA:SCREEN:SCREEN_10}}` Desktop, `{{DATA:SCREEN:SCREEN_6}}` Mobile)
   - Hero narrative and live harvest metrics (*18.4 DN Diastase, <17.2% Moisture, C4 Neg*).
   - Single-flora micro-harvest terroir grid.
   - Interactive NMR Batch Lookup Tool (`BD-JAMUN-2026`).
   - Educational benchmark chart (*Industrial honey vs. Bee Desi*).
   - Sommelier Tasting Flight bundle promo (`The Connoisseur's Terroir Flight`).
   - Indigenous community spotlight and social proof carousel.

2. **Product Catalog & Collections** (`{{DATA:SCREEN:SCREEN_8}}` Desktop)
   - Multi-dimensional filtering: Terroir/Biome, Flora Source, Ayurvedic Benefit, and Crystallization type.
   - Responsive product cards with vessel size switchers (`350g`, `500g`, `1kg`) and sensory intensity dots.
   - 3-Question Interactive Honey Terroir Matcher wizard.

3. **Product Detail Page (PDP) — Deep Scientific & Ritual Experience** (`{{DATA:SCREEN:SCREEN_4}}` Desktop, `{{DATA:SCREEN:SCREEN_2}}` Mobile)
   - High-fidelity image gallery showcasing raw honeycomb, amber jars, and crystallization textures.
   - Interactive Sensory Terroir Matrix (Sweetness, Viscosity, Tannic Earth).
   - Complete Molecular Fingerprint section with 1H-NMR spectrum visualization and active enzyme stats.
   - Geographical forest terroir mapping and tribal beekeeper payout disclosure (`₹320 / kg` direct fair wage).
   - Classical Ayurvedic *Anupana* rituals and pairing recommendations.
   - Sticky conversion footer on mobile with live quantity adjustments and single-tap checkout.

---

## 4. User Personas & Target Audiences

### Persona A: "The Mindful Wellness Connoisseur" (Anandita, 34, Bengaluru)
- **Motivations:** Seeks genuine functional superfoods for daily wellness rituals, lemon-honey elixirs, and immune health.
- **Pain Points:** Cynical about supermarket adulteration scandals (sugar syrups, rice syrup bypassing basic tests).
- **Bee Desi Solution:** Instant verification via batch NMR certificates; transparency on unheated diastase activity.

### Persona B: "The Gourmet Artisan & Culinary Enthusiast" (Chef Vikram, 41, Mumbai)
- **Motivations:** Pairs honey with artisanal sourdough, aged goat chèvre, espresso, and charcuterie boards.
- **Pain Points:** Monotonous generic sweetness in commercial honey without floral character or complexity.
- **Bee Desi Solution:** Detailed sensory notes (wild purple plum, deciduous bark, smoky mangrove), terroir-specific varietals, and tasting flights.

### Persona C: "The Conscious Heritage Supporter" (Devansh, 29, Delhi NCR)
- **Motivations:** Values ethical sourcing, cruelty-free beekeeping, and preserving indigenous Indian heritage.
- **Pain Points:** Industrial migratory beekeeping damaging native bee colonies and exploiting tribal collectors.
- **Bee Desi Solution:** Tangible ethical metrics (40% hive retention, non-violent harvest, solar micro-grid tribal funds).

---

## 5. Design System & Brand Guidelines

### 5.1 Design System Tokens (`{{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_1}}`)
- **Theme:** Artisanal Nectar & Flora
- **Display Typography:** `EB Garamond` (Luxury editorial serif conveying heritage, medicinal authority, and classical elegance)
- **Body & UI Typography:** Clean modern grotesque sans-serif (`Inter` / system UI) for legible pricing, technical specs, and laboratory readouts
- **Color Palette:**
  - **Deep Hive Brown (`#2D1A0E`):** Logo wordmark, primary headlines, high-contrast CTA buttons.
  - **Liquid Amber & Gold (`#C17D2A`):** Badges, accent ribbons, verified seals, active states.
  - **Warm Surface Cream (`#FDF9F1` / `#F7F3EB`):** Apothecary parchment background, avoiding clinical digital whites.
  - **Forest Sage Green (`#4A6B53`):** Botanical purity tags, NMR certified badges, Ayurvedic callouts.

---

## 6. Functional & Technical Requirements

### 6.1 E-Commerce & Inventory
- **Vessel Variant Switcher:** Support for 350g amber glass jar, 500g table flacon, and 1,000g ceramic crock with dynamic price calculations.
- **Micro-Batch Allocation & Guild Subscriptions:** Pre-order queueing for limited 150–200 jar seasonal blooms.
- **Complimentary Shipping Engine:** Automatic threshold counter for complimentary shipping above ₹999.

### 6.2 Laboratory & Scientific Module (NMR Search API)
- Real-time client-side search indexing batch codes (e.g. `BD-26-KSH08`, `BD-JAMUN-2026`).
- Modal display of certified lab spectrograms, diastase count, HMF thermal degradation score, and carbon isotope test status.

### 6.3 Performance & Accessibility
- **Lighthouse Performance Score Target:** >90 on both desktop and mobile.
- **WCAG 2.1 AA Compliance:** Minimum 4.5:1 contrast ratio across amber CTAs, deep brown typography, and warm cream containers.
- **Touch Targets:** Minimum 48x48px hit areas for mobile navigation tabs, accordion headers, and basket steppers.

---

## 7. Roadmap & Phase 2 Enhancements
1. **Interactive Terroir Sommelier Quiz (Full multi-step wizard):** Dynamic 3-step recommendation funnel outputting personalized 3-jar bundles.
2. **Seasonal Harvest Club Portal:** Customer subscription dashboard to manage quarterly harvest allocations and bee colony adoption certificates.
3. **Traceability QR Code App:** Direct camera scanner linking physical jar QR codes to their specific apiary GPS coordinates and harvesting date.
