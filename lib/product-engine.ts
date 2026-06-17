export type IntelligenceInput = { input?: string };
const product = {
  "repo": "SubnetPilot",
  "title": "SubnetPilot",
  "eyebrow": "ArkNet Digital / Cybersecurity Suite",
  "theme": "from-sky-300 via-indigo-300 to-violet-400",
  "hero": "Design network segments that make blast radius visible before launch.",
  "sub": "SubnetPilot helps cloud teams and network engineers turn vague IP space into auditable segments, policy zones, routing notes, and change-review evidence.",
  "input": "Design segmented VPC for prod, staging, data, admin, and vendor access",
  "cta": "Plan secure subnet",
  "scoreLabel": "Design confidence",
  "panels": [
    [
      "CIDR planning",
      "Split address space by environment, sensitivity, and growth."
    ],
    [
      "Zone intent",
      "Describe what each subnet is allowed to talk to."
    ],
    [
      "Blast radius",
      "Show what fails or leaks if one zone is compromised."
    ],
    [
      "Export path",
      "Prepare Terraform, review notes, and change records."
    ]
  ],
  "rows": [
    [
      "Public edge",
      "Ingress",
      "Medium",
      "Only load balancers, no databases or admin panels."
    ],
    [
      "Private app",
      "Compute",
      "Low",
      "Outbound controlled, inbound only from edge."
    ],
    [
      "Data tier",
      "Storage",
      "High",
      "Private routes only, strict security groups."
    ],
    [
      "Admin zone",
      "Operations",
      "High",
      "MFA, ZTNA, audit logging, no broad peering."
    ]
  ],
  "missions": [
    [
      "Terraform export",
      "Generate cloud-ready subnet and security group snippets."
    ],
    [
      "Cloud import",
      "Read existing VPC/VNet structure and explain drift."
    ],
    [
      "Policy simulator",
      "Preview route and firewall effects before change."
    ],
    [
      "Capacity forecast",
      "Warn when CIDR choices limit growth."
    ]
  ],
  "apiExtra": "SubnetPilot should focus on defensive architecture planning and change safety."
} as const;
function scoreFor(subject: string) { let score = 58 + Math.min(28, Math.floor(subject.length / 5)); if (/admin|rdp|database|credential|prod|public|critical|cve|phishing/i.test(subject)) score += 9; return Math.min(98, score); }
function severity(score: number) { return score >= 88 ? 'critical' : score >= 74 ? 'high' : score >= 61 ? 'medium' : 'low'; }
export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.input;
  const score = scoreFor(subject);
  return {
    product: product.title,
    brand: 'ArkNet Digital',
    category: product.hero,
    subject,
    score,
    severity: severity(score),
    executive_summary: product.sub,
    exposure_map: product.panels.map(([label, value]) => ({ label, value, status: score >= 74 ? 'priority' : 'review' })),
    remediation_queue: product.rows.slice(0, 3).map(([asset, type, risk, note]) => ({ action: asset + ' - ' + type, owner: String(risk) === 'Critical' ? 'Security lead' : 'Blue Team', impact: note })),
    contributor_lanes: product.missions.map(([lane, mission]) => ({ lane, mission })),
    defensive_scope: product.apiExtra,
    generated_at: new Date().toISOString()
  };
}
