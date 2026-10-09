"use client"

import { useActionState, useState } from "react"
import { CircleCheck, LoaderCircle, Send } from "lucide-react"
import { submitContact, type ContactState } from "@/app/actions"
import { cn } from "@/lib/utils"

const INITIAL_STATE: ContactState = { status: "idle" }

const TOPICS = [
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
]

const MESSAGE_MAX = 2000

export function ContactForm() {
  const [formKey, setFormKey] = useState(0)
  return <ContactFormBody key={formKey} onReset={() => setFormKey((key) => key + 1)} />
}

function ContactFormBody({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL_STATE)

  if (state.status === "success") {
    return (
      <div className="glass flex min-h-[460px] flex-col items-center justify-center rounded-2xl p-8 text-center" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-primary/15 text-primary">
          <CircleCheck className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-xl font-semibold">Message sent</h3>
        <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">{state.message}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-8 rounded-full border px-5 py-2 text-sm transition-colors hover:bg-foreground/10"
        >
          Send another message
        </button>
      </div>
    )
  }

  return <ContactFormFields state={state} formAction={formAction} pending={pending} />
}

type FieldsProps = {
  state: ContactState
  formAction: (payload: FormData) => void
  pending: boolean
}

function ContactFormFields({ state, formAction, pending }: FieldsProps) {
  const [messageLength, setMessageLength] = useState(state.fields?.message.length ?? 0)
  const errors = state.errors ?? {}

  return (
    <form action={formAction} noValidate className="glass rounded-2xl p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            defaultValue={state.fields?.name}
            placeholder="Ada Lovelace"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(errors.name)}
          />
        </Field>
        <Field label="Work email" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.fields?.email}
            placeholder="ada@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(errors.email)}
          />
        </Field>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium">Topic</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <label
              key={topic.value}
              className="cursor-pointer rounded-full border px-4 py-2 text-sm text-muted-foreground transition-all hover:text-foreground has-[:checked]:border-primary/60 has-[:checked]:bg-primary/10 has-[:checked]:text-foreground has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
            >
              <input
                type="radio"
                name="topic"
                value={topic.value}
                defaultChecked={(state.fields?.topic ?? "sales") === topic.value}
                className="sr-only"
              />
              {topic.label}
            </label>
          ))}
        </div>
        {errors.topic ? <p className="mt-2 text-xs text-destructive">{errors.topic}</p> : null}
      </fieldset>

      <div className="mt-5">
        <Field label="Message" name="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={MESSAGE_MAX}
            defaultValue={state.fields?.message}
            onChange={(event) => setMessageLength(event.target.value.length)}
            placeholder="Tell us about your use case…"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(inputClass(errors.message), "resize-none")}
          />
        </Field>
        <p className="mt-1.5 text-right font-mono text-[11px] text-muted-foreground">
          {messageLength}/{MESSAGE_MAX}
        </p>
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="mt-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_32px_-4px] hover:shadow-primary/70 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded-xl border bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground/60 transition-all outline-none focus:border-primary/60 focus:ring-4 focus:ring-primary/15",
    error && "border-destructive/60 focus:border-destructive focus:ring-destructive/15",
  )
}
