import { ArrowRight, PlayCircle, Sparkles } from "lucide-react"
import { DashboardPreview } from "@/components/site/dashboard-preview"

const STATS = [
  { value: "12M+", label: "Agent runs / day" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "180ms", label: "Median latency" },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]"
      />
      <div aria-hidden="true" className="absolute top-40 right-0 h-72 w-72 rounded-full bg-primary/15 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="#features"
            className="animate-fade-up glass group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 font-medium text-primary">
              <Sparkles className="size-3" aria-hidden="true" />
              New
            </span>
            Multi-agent orchestration is live
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>

          <h1 className="animate-fade-up mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight [animation-delay:80ms] sm:text-6xl md:text-7xl">
            My Smart <span className="text-gradient">AI Platform</span>
          </h1>

          <p className="animate-fade-up mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground [animation-delay:160ms] md:text-lg">
            Nexvibe gives your team one platform to design, evaluate, and scale intelligent agents — with real-time
            observability, guardrails, and everything you need to ship with confidence.
          </p>

          <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:240ms]">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-[0_0_32px_-4px] hover:shadow-primary/70"
            >
              Start building free
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#demo"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/10"
            >
              <PlayCircle className="size-4 text-primary" aria-hidden="true" />
              Watch demo
            </a>
          </div>

          <dl className="animate-fade-up mt-12 grid grid-cols-3 gap-4 border-y border-foreground/10 py-6 [animation-delay:320ms]">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-2xl font-semibold tracking-tight md:text-3xl text-gradient">{stat.value}</dt>
                <dd className="mt-1 text-xs text-muted-foreground md:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14">
          <DashboardPreview />
        </div>
      </div>
    </section>
  )
}