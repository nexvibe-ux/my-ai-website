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
            Ship AI agents that <span className="text-gradient">actually work</span> in production
          </h1>

          <p className="animate-fade-up mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground [animation-delay:160ms] md:text-lg">
            Nexvibe gives your team one platform to design, evaluate, and scale intelligent agents — with real-time
            observability, guardrails, and every model behind a single API.
          </p>

          <div className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row">
            <a
              href="#pricing"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_40px_-6px] hover:shadow-primary/80 sm:w-auto"
            >
              Start free trial
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="#showcase"
              className="glass inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/10 sm:w-auto"
            >
              <PlayCircle className="size-4 text-primary" aria-hidden="true" />
              See it in action
            </a>
          </div>

          <dl className="animate-fade-up mx-auto mt-12 grid max-w-lg grid-cols-3 gap-4 [animation-delay:320ms]">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                <dd className="font-mono text-xl font-semibold md:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up mt-16 [animation-delay:420ms] md:mt-20">
          <DashboardPreview />
        </div>
      </div>
    </section>
  )
}
