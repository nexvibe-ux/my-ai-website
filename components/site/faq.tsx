"use client"

import { useId, useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const FAQS = [
  {
    question: "Which AI models does Nexvibe support?",
    answer:
      "Every major provider — OpenAI, Anthropic, Google, xAI, Mistral, Meta and more — plus your own fine-tuned or self-hosted models. Switch with a single config change and set automatic fallbacks.",
  },
  {
    question: "Is my data used to train models?",
    answer:
      "Never. Your prompts, outputs, and connected data stay yours. We sign zero-retention agreements with providers and support customer-managed encryption keys on the Scale plan.",
  },
  {
    question: "How does usage-based billing work?",
    answer:
      "You pay a flat plan fee plus a per-run rate that decreases as you scale. Use the pricing calculator above to estimate costs, and set hard spend limits per agent in the dashboard.",
  },
  {
    question: "Can I deploy in my own cloud or region?",
    answer:
      "Yes. The Dedicated region add-on runs your agents in an isolated environment in the US, EU, or APAC. Enterprise customers can also deploy into their own VPC.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Every plan includes a 14-day free trial with full feature access and 10,000 agent runs. No credit card required to get started.",
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">FAQ</p>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">Questions, answered</h2>
      <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
        {"Can't find what you're looking for? Send us a message and a real human will reply."}
      </p>

      <div className="mt-10 space-y-3">
        {FAQS.map((faq, index) => {
          const open = openIndex === index
          const buttonId = `${baseId}-q-${index}`
          const panelId = `${baseId}-a-${index}`
          return (
            <div
              key={faq.question}
              className={cn("glass rounded-2xl transition-colors", open && "border-primary/30 bg-primary/[0.04]")}
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {faq.question}
                  <Plus
                    className={cn(
                      "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                      open && "rotate-45 text-primary",
                    )}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
