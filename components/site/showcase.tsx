import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"

const CASES = [
  {
    company: "Lumen Health",
    industry: "Healthcare",
    metric: "62%",
    metricLabel: "fewer escalations",
    quote: "We replaced three brittle bots with one Nexvibe agent. Our nurses finally trust the answers.",
    author: "Priya Raman, VP Patient Experience",
  },
  {
    company: "Northwind Capital",
    industry: "Finance",
    metric: "9×",
    metricLabel: "faster research briefs",
    quote: "Analysts get a sourced, compliant brief in minutes instead of a full afternoon of reading.",
    author: "Marcus Hale, Head of Research",
  },
  {
    company: "Orbit Commerce",
    industry: "E-commerce",
    metric: "$1.8M",
    metricLabel: "saved annually",
    quote: "Model routing alone cut our inference bill in half — without touching quality scores.",
    author: "Elena Duarte, CTO",
  },
]

const LOGOS = ["Lumen", "Northwind", "Orbit", "Vertex", "Halcyon", "Quanta"]

export function Showcase() {
  return (
    <section id="showcase" className="relative scroll-mt-24 py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/3 mx-auto h-72 max-w-3xl rounded-full bg-accent/15 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Showcase"
          title="Trusted by teams shipping AI at scale"
          description="From regulated industries to hyper-growth startups, Nexvibe powers agents that move real metrics."
        />

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4" aria-label="Customer logos">
          {LOGOS.map((logo) => (
            <li
              key={logo}
              className="font-mono text-lg font-semibold tracking-tight text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              {logo}
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {CASES.map((item) => (
            <figure
              key={item.company}
              className="glass group flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-foreground/5 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {item.industry}
                </span>
                <ArrowUpRight
                  className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-6 font-mono text-4xl font-semibold text-gradient">{item.metric}</p>
              <p className="text-sm text-muted-foreground">{item.metricLabel}</p>
              <blockquote className="mt-6 flex-1 text-pretty leading-relaxed">
                <p>{`“${item.quote}”`}</p>
              </blockquote>
              <figcaption className="mt-6 border-t pt-4 text-sm">
                <span className="font-medium">{item.company}</span>
                <span className="block text-muted-foreground">{item.author}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
