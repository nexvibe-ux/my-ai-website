"use client"

import { useId, useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"
import { cn } from "@/lib/utils"

const PLANS = [
  { id: "starter", name: "Starter", base: 29, perThousandRuns: 0.6, perSeat: 0, blurb: "For solo builders" },
  { id: "pro", name: "Pro", base: 99, perThousandRuns: 0.45, perSeat: 15, blurb: "For growing teams" },
  { id: "scale", name: "Scale", base: 399, perThousandRuns: 0.3, perSeat: 12, blurb: "For production fleets" },
] as const

const RUN_STEPS = [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000]

const ADDONS = [
  { id: "support", label: "Priority support", price: 99 },
  { id: "region", label: "Dedicated region", price: 249 },
  { id: "sso", label: "SSO & SCIM", price: 79 },
] as const

type PlanId = (typeof PLANS)[number]["id"]
type AddonId = (typeof ADDONS)[number]["id"]

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export function PricingCalculator() {
  const runsId = useId()
  const seatsId = useId()
  const [planId, setPlanId] = useState<PlanId>("pro")
  const [runStep, setRunStep] = useState(4)
  const [seats, setSeats] = useState(5)
  const [annual, setAnnual] = useState(true)
  const [addons, setAddons] = useState<Set<AddonId>>(new Set(["support"]))

  const plan = PLANS.find((item) => item.id === planId) ?? PLANS[1]
  const runsK = RUN_STEPS[runStep]
  const usage = runsK * plan.perThousandRuns
  const seatCost = Math.max(0, seats - 1) * plan.perSeat
  const addonCost = ADDONS.filter((addon) => addons.has(addon.id)).reduce((sum, addon) => sum + addon.price, 0)
  const subtotal = plan.base + usage + seatCost + addonCost
  const discount = annual ? subtotal * 0.2 : 0
  const total = subtotal - discount

  function toggleAddon(id: AddonId) {
    setAddons((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Estimate your monthly cost"
          description="Transparent, usage-based pricing. Adjust the controls to see exactly what you'll pay."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-[1fr_380px]">
          <div className="glass rounded-2xl p-6 md:p-8">
            <fieldset>
              <legend className="text-sm font-medium">Choose a plan</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {PLANS.map((item) => {
                  const selected = item.id === planId
                  return (
                    <label
                      key={item.id}
                      className={cn(
                        "relative cursor-pointer rounded-xl border p-4 transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                        selected ? "border-primary/60 bg-primary/10" : "hover:border-foreground/20 hover:bg-foreground/5",
                      )}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={item.id}
                        checked={selected}
                        onChange={() => setPlanId(item.id)}
                        className="sr-only"
                      />
                      <span className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        <span
                          className={cn(
                            "grid size-5 place-items-center rounded-full border transition-colors",
                            selected ? "border-primary bg-primary text-primary-foreground" : "border-foreground/20",
                          )}
                        >
                          {selected ? <Check className="size-3" aria-hidden="true" /> : null}
                        </span>
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">{item.blurb}</span>
                      <span className="mt-3 block font-mono text-sm">
                        {currency.format(item.base)}
                        <span className="text-muted-foreground"> base</span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label htmlFor={runsId} className="text-sm font-medium">
                  Agent runs per month
                </label>
                <output htmlFor={runsId} className="font-mono text-sm text-primary">
                  {runsK >= 1000 ? `${runsK / 1000}M` : `${runsK}K`}
                </output>
              </div>
              <input
                id={runsId}
                type="range"
                min={0}
                max={RUN_STEPS.length - 1}
                step={1}
                value={runStep}
                onChange={(event) => setRunStep(Number(event.target.value))}
                aria-valuetext={`${runsK * 1000} runs`}
                className="range mt-4 w-full"
                style={{ "--fill": `${(runStep / (RUN_STEPS.length - 1)) * 100}%` } as React.CSSProperties}
              />
              <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
                <span>5K</span>
                <span>5M</span>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label htmlFor={seatsId} className="text-sm font-medium">
                  Team seats
                </label>
                <output htmlFor={seatsId} className="font-mono text-sm text-primary">
                  {seats}
                </output>
              </div>
              <input
                id={seatsId}
                type="range"
                min={1}
                max={50}
                value={seats}
                onChange={(event) => setSeats(Number(event.target.value))}
                className="range mt-4 w-full"
                style={{ "--fill": `${((seats - 1) / 49) * 100}%` } as React.CSSProperties}
              />
              <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
                <span>1</span>
                <span>50</span>
              </div>
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm font-medium">Add-ons</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {ADDONS.map((addon) => {
                  const checked = addons.has(addon.id)
                  return (
                    <label
                      key={addon.id}
                      className={cn(
                        "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                        checked ? "border-primary/60 bg-primary/10 text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <input type="checkbox" checked={checked} onChange={() => toggleAddon(addon.id)} className="sr-only" />
                      {checked ? <Check className="size-3.5 text-primary" aria-hidden="true" /> : null}
                      {addon.label}
                      <span className="font-mono text-xs text-muted-foreground">+{currency.format(addon.price)}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          </div>

          <aside className="glass relative overflow-hidden rounded-2xl p-6 md:p-8" aria-live="polite">
            <div aria-hidden="true" className="absolute -top-20 -right-20 size-56 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Estimated total</p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={annual}
                  onClick={() => setAnnual((value) => !value)}
                  className="inline-flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <span
                    className={cn(
                      "relative h-5 w-9 rounded-full transition-colors",
                      annual ? "bg-primary" : "bg-foreground/15",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 left-0.5 size-4 rounded-full bg-background transition-transform",
                        annual && "translate-x-4",
                      )}
                    />
                  </span>
                  Annual <span className="text-primary">-20%</span>
                </button>
              </div>

              <p className="mt-4 font-mono text-5xl font-semibold tracking-tight">
                {currency.format(total)}
                <span className="text-base font-normal text-muted-foreground">/mo</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {annual ? `Billed ${currency.format(total * 12)} yearly` : "Billed monthly, cancel anytime"}
              </p>

              <dl className="mt-8 space-y-3 border-t pt-6 text-sm">
                <Row label={`${plan.name} plan`} value={currency.format(plan.base)} />
                <Row label={`Usage (${runsK.toLocaleString("en-US")}K runs)`} value={currency.format(usage)} />
                <Row label={`Extra seats (${Math.max(0, seats - 1)})`} value={currency.format(seatCost)} />
                <Row label="Add-ons" value={currency.format(addonCost)} />
                {annual ? <Row label="Annual discount" value={`-${currency.format(discount)}`} highlight /> : null}
              </dl>

              <a
                href="#contact"
                className="group mt-8 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_32px_-4px] hover:shadow-primary/70"
              >
                Get started with {plan.name}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <p className="mt-3 text-center text-xs text-muted-foreground">14-day free trial · No credit card required</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("font-mono", highlight && "text-primary")}>{value}</dd>
    </div>
  )
}
