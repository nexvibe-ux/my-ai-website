import { BrainCircuit, Gauge, Layers, Plug, ShieldCheck, Workflow, type LucideIcon } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"

type Feature = { icon: LucideIcon; title: string; description: string; tag: string }

const FEATURES: Feature[] = [
  {
    icon: BrainCircuit,
    title: "Model-agnostic routing",
    description: "Switch between 100+ models with one line. Automatic fallbacks keep agents online when providers don't.",
    tag: "Routing",
  },
  {
    icon: Workflow,
    title: "Visual orchestration",
    description: "Compose multi-step, multi-agent workflows that pause, resume, and retry — durably, by default.",
    tag: "Workflows",
  },
  {
    icon: Plug,
    title: "200+ native connectors",
    description: "Give agents secure, scoped access to Slack, Notion, Postgres, Salesforce, and your internal APIs.",
    tag: "Tools",
  },
  {
    icon: ShieldCheck,
    title: "Guardrails & governance",
    description: "PII redaction, prompt-injection defense, and audit logs built for SOC 2 and HIPAA workloads.",
    tag: "Security",
  },
  {
    icon: Gauge,
    title: "Real-time observability",
    description: "Trace every token, tool call, and dollar. Spot regressions before your users do.",
    tag: "Monitoring",
  },
  {
    icon: Layers,
    title: "Evals that ship with you",
    description: "Version prompts, run regression suites in CI, and compare quality across models side by side.",
    tag: "Quality",
  },
]

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to go from prototype to production"
          description="A complete toolkit for building reliable AI systems — without stitching together a dozen vendors."
        />

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <li
                key={feature.title}
                className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px] hover:shadow-primary/30"
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-24 -right-24 size-48 rounded-full bg-primary/0 blur-3xl transition-colors duration-500 group-hover:bg-primary/20"
                />
                <div className="relative flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border bg-foreground/5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{feature.tag}</span>
                </div>
                <h3 className="relative mt-6 text-lg font-medium">{feature.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
