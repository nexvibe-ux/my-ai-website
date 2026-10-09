"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, CircleCheck, LoaderCircle, Play, Search, Headset, FileText, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const AGENTS = [
  { id: "support", name: "Support Copilot", icon: Headset, success: 98.4, runs: 48210, cost: 312 },
  { id: "research", name: "Research Analyst", icon: Search, success: 96.1, runs: 12904, cost: 528 },
  { id: "docs", name: "Docs Writer", icon: FileText, success: 99.2, runs: 7640, cost: 141 },
] as const

const RANGES = {
  "24h": [32, 45, 38, 52, 61, 48, 70, 66, 58, 74, 81, 69],
  "7d": [54, 62, 58, 71, 66, 84, 77],
  "30d": [40, 46, 52, 49, 58, 63, 61, 67, 72, 70, 78, 83, 80, 88],
} as const

type RangeKey = keyof typeof RANGES

const RUN_STEPS = ["Retrieving context", "Reasoning over 14 docs", "Calling tools", "Composing response"]

export function DashboardPreview() {
  const [agentId, setAgentId] = useState<(typeof AGENTS)[number]["id"]>("support")
  const [range, setRange] = useState<RangeKey>("7d")
  const [step, setStep] = useState(-1)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const agent = AGENTS.find((item) => item.id === agentId) ?? AGENTS[0]
  const multiplier = agentId === "support" ? 1 : agentId === "research" ? 0.82 : 0.68
  const bars = RANGES[range].map((value) => Math.round(value * multiplier))
  const running = step >= 0 && step < RUN_STEPS.length

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current)
  }, [])

  function runAgent() {
    if (running) return
    if (timer.current) clearInterval(timer.current)
    setStep(0)
    timer.current = setInterval(() => {
      setStep((current) => {
        const next = current + 1
        if (next >= RUN_STEPS.length && timer.current) clearInterval(timer.current)
        return next
      })
    }, 750)
  }

  return (
    <div className="relative mx-auto max-w-5xl">
      <div aria-hidden="true" className="absolute -inset-x-6 -inset-y-4 rounded-[2rem] bg-gradient-to-b from-primary/20 via-accent/10 to-transparent blur-2xl" />
      <div className="glass relative overflow-hidden rounded-2xl shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <span className="size-3 rounded-full bg-foreground/15" />
          <span className="size-3 rounded-full bg-foreground/15" />
          <span className="size-3 rounded-full bg-foreground/15" />
          <span className="ml-3 truncate rounded-md bg-foreground/5 px-3 py-1 font-mono text-xs text-muted-foreground">
            app.nexvibe.ai/agents/{agent.id}
          </span>
        </div>

        <div className="grid md:grid-cols-[220px_1fr]">
          <aside className="border-b p-3 md:border-r md:border-b-0">
            <p className="px-2 pb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Agents</p>
            <ul className="flex gap-1 overflow-x-auto md:flex-col" role="tablist" aria-label="Select agent">
              {AGENTS.map((item) => {
                const Icon = item.icon
                const selected = item.id === agentId
                return (
                  <li key={item.id} className="shrink-0">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => {
                        setAgentId(item.id)
                        setStep(-1)
                      }}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                        selected ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                      )}
                    >
                      <Icon className={cn("size-4", selected && "text-primary")} aria-hidden="true" />
                      <span className="whitespace-nowrap">{item.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>

          <div className="p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-medium">{agent.name}</h3>
                <p className="text-xs text-muted-foreground">Production · gpt-5 + claude-sonnet fallback</p>
              </div>
              <button
                type="button"
                onClick={runAgent}
                disabled={running}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:shadow-[0_0_24px_-4px] hover:shadow-primary/70 disabled:opacity-70"
              >
                {running ? (
                  <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
                ) : (
                  <Play className="size-3.5" aria-hidden="true" />
                )}
                {running ? "Running…" : "Test run"}
              </button>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <Metric label="Success rate" value={`${agent.success}%`} />
              <Metric label="Runs" value={agent.runs.toLocaleString("en-US")} />
              <Metric label="Spend" value={`$${agent.cost}`} />
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_220px]">
              <div className="rounded-xl border bg-background/40 p-4">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <TrendingUp className="size-3.5 text-primary" aria-hidden="true" />
                    Throughput
                  </p>
                  <div className="flex rounded-full bg-foreground/5 p-0.5" role="group" aria-label="Time range">
                    {(Object.keys(RANGES) as RangeKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={range === key}
                        onClick={() => setRange(key)}
                        className={cn(
                          "rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors",
                          range === key ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex h-36 items-end gap-1.5" aria-label={`Throughput chart for ${range}`} role="img">
                  {bars.map((value, index) => (
                    <div key={`${range}-${index}`} className="group relative flex h-full flex-1 items-end">
                      <span className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full rounded bg-foreground px-1.5 py-0.5 font-mono text-[10px] text-background opacity-0 transition-opacity group-hover:opacity-100">
                        {value}k
                      </span>
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-primary/30 to-primary transition-all duration-500 group-hover:from-accent/40 group-hover:to-accent"
                        style={{ height: `${value}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border bg-background/40 p-4" aria-live="polite">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Bot className="size-3.5 text-primary" aria-hidden="true" />
                  Run trace
                </p>
                <ol className="mt-3 space-y-2.5">
                  {RUN_STEPS.map((label, index) => {
                    const done = step > index
                    const current = step === index
                    return (
                      <li
                        key={label}
                        className={cn(
                          "flex items-center gap-2 text-xs transition-colors",
                          done ? "text-foreground" : current ? "text-primary" : "text-muted-foreground/60",
                        )}
                      >
                        {done ? (
                          <CircleCheck className="size-3.5 text-primary" aria-hidden="true" />
                        ) : current ? (
                          <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
                        ) : (
                          <span className="size-3.5 rounded-full border border-current" aria-hidden="true" />
                        )}
                        {label}
                      </li>
                    )
                  })}
                </ol>
                <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                  {step >= RUN_STEPS.length ? "Completed in 1.42s · $0.0031" : step < 0 ? "Press Test run to start" : "Streaming…"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-background/40 p-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-sm font-semibold md:text-lg">{value}</p>
    </div>
  )
}
