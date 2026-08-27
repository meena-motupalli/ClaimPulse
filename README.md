# ClaimPulse 🇮🇳

> **"Don't just see your claim status. Understand what happens next."**

ClaimPulse is an independent, citizen-side diagnostic and guidance platform designed to bring transparency, clarity, and actionable resolution steps to opaque Employees' Provident Fund (EPFO) claim journeys.

---

## 📌 Problem Statement

When citizens submit a Provident Fund claim (Form 19 final settlement, Form 10C pension withdrawal, Form 31 advance, or Form 13 transfer), they are often presented with cryptic, unhelpful portal status strings such as:

> *"Claim Submitted at Portal"*  
> *"Under Process"*  
> *"Rejected: Name Mismatch"*  

Citizens are left with unresolved questions:
* What does this status actually mean?
* Is my claim progressing normally or is it delayed?
* Do I need to take immediate action, or should I wait?
* How do I file a pre-filled, formal grievance if the 20-day SLA is breached?

Without clear guidance, citizens fall victim to WhatsApp scams, pay fake clearance fees to unauthorized agents, or file premature duplicate claims that clog government field office queues.

---

##💡 The Solution

ClaimPulse transforms opaque claim statuses into a **clear, visual 6-stage timeline journey**, benchmarked against official EPFO Citizen's Charter SLAs (15–20 working days).

It provides:
1. **Smart SLA Diagnosis**: Classifies claims as Recently Submitted, Potential Delay, Rejected, Settled, KYC Issue, or Transfer Pending.
2. **Plain-Language Rejection Translator**: Translates cryptic rejection remarks into plain English with exact corrective steps.
3. **EPFiGMS Grievance Generator**: Drafts pre-formatted, professional grievance complaint letters pre-filled with claim references.
4. **Scam Shield**: Evaluates suspicious SMS, WhatsApp, and email communications to protect citizens from fake fee demands and credential phishing.
5. **Privacy-First Architecture**: 100% client-side execution; zero password, OTP, Aadhaar, PAN, or bank credentials requested or stored.

---

## 🚀 Key Features

* 🗺️ **Visual Claim Journey Timeline**: 6-stage progress tracker mapping claim milestones (`Submitted` → `Field Office Verification` → `Employer Approval` → `Audit` → `Settlement`).
* 🩺 **Deterministic Diagnostic Engine**: Rule-based engine enforcing SLA benchmarking rules (Rules 1–7) without external dependencies.
* 📄 **EPFiGMS Grievance Generator**: Generates respectful, structured grievance text ready for copy-pasting to `epfigms.gov.in`.
* 🛡️ **Scam Shield & Fraud Protection**: Evaluates messages for payment demands, OTP phishing, and urgent threats, featuring 4 interactive judge sample scenarios.
* 📸 **Privacy-First Screenshot Extractor**: Mock OCR upload parser operating temporarily in browser memory.
* ♿ **Accessibility Toolbar**: English / हिंदी (Hindi) language switcher, font-size controls (`A`, `A+`, `A++`), and Reduce Motion mode.
* 🎯 **Dedicated Judge Presentation Console (`/demo`)**: Single-page hackathon presentation suite with a **Reset Demo** button that runs 100% offline.

---

## 🏗️ Technical Architecture

```
ClaimPulse/
├── app/
│   ├── api/
│   │   └── ai/              # Server-side Next.js API Routes (Keeps API keys hidden)
│   ├── claim/               # Claim history & detailed claim view
│   ├── demo/                # Dedicated Judge Mode presentation console (/demo)
│   ├── diagnosis/           # Interactive diagnostic sandbox & scenario simulator
│   ├── grievance/           # EPFiGMS Grievance Pack generator
│   ├── scam-shield/         # Citizen Scam Shield & fraud message analyzer
│   ├── track/               # Privacy-first claim tracking form
│   ├── about/               # Mission, technical architecture, & explicit limitations
│   └── page.tsx             # Hero redesign, Trust Bar, 4 Feature Cards, Impact & Before/After
├── components/
│   ├── ai/                  # Responsible AI badges, Scam analyzer, & Source Transparency
│   ├── claim/               # Scenario switcher, Timeline journey, Diagnosis card, OCR parser
│   ├── demo/                # Hero claim stepper animation
│   ├── grievance/           # Grievance draft generator card
│   ├── home/                # Trust bar, feature cards, impact dashboard, before/after
│   └── ui/                  # Accessibility toolbar, Toast notifications, empty states
├── lib/
│   ├── ai/                  # Zod schemas, Gemini provider, & Fallback provider abstraction
│   ├── claimAnalyzer.ts     # Core deterministic diagnostic rule engine (Rules 1-7)
│   └── storage.ts           # LocalStorage persistence manager
└── scripts/
    ├── test-diagnostic-rules.ts # Automated test runner for diagnostic rules (18/18 pass)
    └── test-ai-fallback.ts     # Automated test runner for Responsible AI fallback (8/8 pass)
```

---

## 🤖 Responsible AI Principles & Provider Abstraction

ClaimPulse adheres strictly to **Responsible AI Principles**:

* **Deterministic Core**: Claim states, timelines, and SLA rules are calculated deterministically by the rule engine (`lib/claimAnalyzer.ts`).
* **AI as an Enhancement**: AI is used strictly for natural language translation, plain-language rejection explaining, grievance text formatting, and scam message analysis.
* **Schema Validation via Zod**: All AI outputs are strictly validated against Zod schemas (`lib/ai/types.ts`).
* **100% Offline Fallback**: If `AI_API_KEY` is omitted, missing, or rate-limited, ClaimPulse seamlessly bails out to `FallbackAIProvider` without crashing or rendering blank pages.
* **No Invented Internal EPFO Facts**: AI is explicitly instructed never to fabricate internal field office queues or government deadlines.

---

## 🔒 Security & Privacy Standard

* **Zero Credentials Requested**: ClaimPulse NEVER asks for UAN passwords, Aadhaar numbers, PAN cards, OTPs, or Bank PINs.
* **No Server-Side Image Storage**: Uploaded screenshots are processed temporarily in browser memory and discarded immediately.
* **Server-Side API Keys**: `AI_API_KEY` is loaded strictly on the server (`app/api/ai/...`). Zero `NEXT_PUBLIC_*` secret exposure.
* **File Upload Constraints**: API endpoints restrict uploads to PNG, JPEG, and WebP images with a 5MB size limit. SVG, HTML, JS, EXE, and ZIP files are rejected.

---

## ⚠️ Platform Limitations & Ethical Disclaimers

1. **Independent Prototype**: ClaimPulse is an independent citizen-service prototype. It is NOT an official application of the Employees' Provident Fund Organisation (EPFO) or the Ministry of Labour & Employment.
2. **No Backend System Access**: ClaimPulse does not connect to EPFO's private backend databases or officer processing desks.
3. **Public Status Inferences**: ClaimPulse cannot determine internal field office bottlenecks solely from a public status string.
4. **Informational Guidance**: All AI-assisted explanations and diagnoses are informational. Citizens should verify important actions on official portals (`epfindia.gov.in` and `epfigms.gov.in`).

---

## 🛠️ Technology Stack

* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript (Strict Mode)
* **Styling**: Tailwind CSS & Lucide Icons
* **Validation**: Zod (Structured JSON AI validation)
* **AI Provider**: Gemini 1.5 Flash (via REST API) + Fallback Provider Engine
* **Testing**: TSX automated CLI test suites

---

## 🔑 Environment Variables

To enable optional Gemini AI features, create a `.env.local` file:

```env
# Optional Gemini AI Configuration
AI_API_KEY=your_gemini_api_key_here
AI_MODEL=gemini-1.5-flash
```

*(If omitted, ClaimPulse automatically runs in offline rule-based fallback mode).*

---

## 🚀 Local Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/meena-motupalli/ClaimPulse.git
   cd ClaimPulse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run automated test suites**:
   ```bash
   npx tsx scripts/test-diagnostic-rules.ts
   npx tsx scripts/test-ai-fallback.ts
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

5. **Test Judge Demo Mode**:
   Navigate to **[http://localhost:3000/demo](http://localhost:3000/demo)** for live judging presentation.

6. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## 🔮 Future Scope & Roadmap

* 🏛️ **Official API Integration**: Integration with official EPFO open APIs if authorized by government authorities.
* 🌐 **Expanded Multilingual Support**: Full translation in 12 regional Indian languages (Hindi, Tamil, Telugu, Marathi, Bengali, Kannada, etc.).
* 🎙️ **Voice Accessibility**: Voice-guided status inquiry for visually impaired and low-literacy citizens.
* 📱 **Native Mobile App**: Offline-first Flutter/Android application for rural citizens.
* 📊 **Anonymized Aggregated SLA Analytics**: Public dashboards highlighting systemic field office processing delays.

---

## 📄 License & Attribution

Built for hackathon demonstration. Designed with citizen trust, clarity, and safety at its core.
