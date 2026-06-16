export type IntelligenceInput = { input?: string };

const product = {
  "repo": "SubnetPilot",
  "suite": "Cybersecurity Suite",
  "category": "Network planning",
  "audience": "network engineers, cloud teams, and security architects",
  "promise": "turn messy IP space into clean, secure, auditable network plans",
  "inputLabel": "Network goal or CIDR block",
  "placeholder": "Design segmented VPC for prod, staging, data, and admin access",
  "primary": "Plan subnet",
  "gradient": "from-sky-300 via-indigo-300 to-violet-400",
  "modules": [
    "CIDR segmentation",
    "Firewall intent map",
    "Blast-radius labels",
    "Capacity forecast",
    "Change-review summary"
  ],
  "outputs": [
    "Proposed subnet table",
    "Security zones",
    "Routing notes",
    "Change risk warnings"
  ],
  "next": [
    "Terraform export",
    "AWS/Azure/GCP import",
    "zero-trust policy simulator",
    "network capacity forecast"
  ]
} as const;

function score(text: string) {
  const length = text.trim().length;
  const diversity = new Set(text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean)).size;
  return Math.min(97, 48 + Math.floor(length / 7) + Math.min(28, diversity));
}

export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.placeholder;
  const confidence = score(subject);
  const urgency = confidence > 82 ? 'high' : confidence > 66 ? 'medium' : 'starter';
  return {
    product: product.repo,
    category: product.category,
    subject,
    confidence,
    urgency,
    executive_summary: product.promise,
    immediate_outputs: product.outputs.map((output, index) => ({
      title: output,
      detail: output + ' for: ' + subject,
      priority: index === 0 ? 'primary' : index === 1 ? 'supporting' : 'next'
    })),
    automation_plan: product.modules.map((module, index) => ({
      stage: index + 1,
      module,
      value: 'Automate ' + module.toLowerCase() + ' so ' + product.audience + ' can move faster with less manual work.'
    })),
    future_addons: product.next.map((addon, index) => ({
      name: addon,
      horizon: index < 2 ? 'v2' : 'v3',
      contributor_lane: index % 2 === 0 ? 'integration' : 'product intelligence'
    })),
    contributor_brief: 'Improve ' + product.repo + ' by making ' + product.category.toLowerCase() + ' easier for ' + product.audience + '.',
    generated_at: new Date().toISOString()
  };
}
