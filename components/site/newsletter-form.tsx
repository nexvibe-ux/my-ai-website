"use client"

import { useActionState } from "react"
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react"
import { subscribeNewsletter, type NewsletterState } from "@/app/actions"
import { cn } from "@/lib/utils"

const INITIAL_STATE: NewsletterState = { status: "idle" }

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, INITIAL_STATE)

  if (state.status === "success") {
    return (
      <p role="status" className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm">
        <CircleCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
        {state.message}
      </p>
    )
  }

  return (
    <form action={formAction} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          "flex items-center gap-1 rounded-full border bg-background/50 p-1 transition-all focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/15",
          state.status === "error" && "border-destructive/60",
        )}
      >
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          aria-invalid={state.status === "error"}
          aria-describedby={state.status === "error" ? "newsletter-error" : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted-foreground/60"
        />
        <button
          type="submit"
          disabled={pending}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-all hover:shadow-[0_0_20px_-2px] hover:shadow-primary/70 disabled:opacity-70"
        >
          {pending ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="size-4" aria-hidden="true" />
          )}
          <span className="sr-only">Subscribe</span>
        </button>
      </div>
      {state.status === "error" ? (
        <p id="newsletter-error" role="alert" className="mt-2 px-4 text-xs text-destructive">
          {state.message}
        </p>
      ) : null}
    </form>
  )
}
