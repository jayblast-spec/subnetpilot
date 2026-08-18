<div align="center">

# SubnetPilot

### Design Network Segments That Make Blast Radius Visible Before Launch

SubnetPilot helps cloud teams and network engineers turn vague IP address space into auditable segments, policy zones, routing notes, and change-review evidence — entirely in the browser, before a single subnet ships to production.

<p>
  <a href="https://subnetpilot.vercel.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live-Demo-1D4ED8?style=for-the-badge&logo=vercel&logoColor=white"></a>
  <a href="https://github.com/jayblast-spec/subnetpilot"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-38BDF8?style=flat-square&logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Product%20Layer-1D4ED8?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-Design%20System-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-Functions-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

<p>
  <img alt="Animated headline" src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=650&color=38BDF8&center=true&vCenter=true&width=760&lines=CIDR+plan+%E2%86%92+zone+intent+%E2%86%92+blast+radius;Segment+prod%2C+staging%2C+data%2C+admin;Terraform-ready+export+path;Change-review+evidence%2C+not+guesswork">
</p>

</div>

## What It Does

SubnetPilot takes a plain-language network design goal (for example: segmented VPC for prod, staging, data, admin, and vendor access) and returns a structured segmentation plan:

- **CIDR planning** — splits address space by environment, sensitivity, and expected growth.
- **Zone intent** — states explicitly what each subnet is allowed to talk to, so allowed traffic is a design decision, not an accident.
- **Blast radius analysis** — shows what fails or leaks if a given zone is compromised, ranked by risk (public edge, private app, data tier, admin zone).
- **Export path** — frames the plan for Terraform export, review notes, and change records.
- **Design confidence score** — a scored output with a remediation queue and contributor missions for extending the planner (Terraform export, cloud import, policy simulation, capacity forecasting).

## How It Works

- Built on Next.js App Router with TypeScript and Tailwind CSS 4, deployed as Vercel serverless functions, entirely client-driven with no account or stored infrastructure state.
- `app/components/subnetMath.ts` does the real work: parses a CIDR block into network/broadcast/first-host/last-host addresses and IP class using bitwise integer math, and splits a block into smaller subnets.
- `CidrCalculatorPanel.tsx` and `SubnetSplitterPanel.tsx` are the two real tools; the homepage "intelligence" score is a separate decorative widget, not part of the calculator.

## Engineering Notes

**The real problem:** CIDR math is simple in theory (bitmasks) and easy to get wrong in practice under time pressure — an off-by-one on a broadcast address during an incident is exactly the kind of mistake this tool exists to prevent.

**The approach:** every address is converted to a 32-bit integer (`ipToInt`) using real bitwise operators (`<<`, `>>>`, `|`) rather than string manipulation, so network/broadcast/host-range calculations are exact integer math, not approximations — then converted back to dotted-decimal for display.

**One real number:** IP class detection reads the first octet directly (`<128` → A, `<192` → B, `<224` → C, `<240` → D/multicast, else E/reserved) — the same boundaries from the original classful addressing scheme, still useful context even in a CIDR-only world.

**Not handled yet:** IPv6 isn't supported — this is an IPv4-only calculator, and the homepage "intelligence" score is unrelated decorative copy, not a feature of the calculator.

## Live

[subnetpilot.vercel.app](https://subnetpilot.vercel.app)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Language | TypeScript |
| Planning engine | Deterministic segmentation and scoring model |
| Deployment | Vercel serverless functions |

<div align="center">

<img alt="Footer" src="https://capsule-render.vercel.app/api?type=rect&height=60&color=0:1D4ED8,55:0B1E3D,100:020617&text=michael%40arknet.digital&fontColor=FAFAFA&fontSize=18&fontAlign=50&animation=fadeIn">

</div>
