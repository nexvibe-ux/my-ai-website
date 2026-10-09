"use server"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const TOPICS = ["sales", "support", "partnership", "other"] as const

export type ContactState = {
  status: "idle" | "success" | "error"
  message?: string
  errors?: Partial<Record<"name" | "email" | "topic" | "message", string>>
  fields?: { name: string; email: string; topic: string; message: string }
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const fields = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    topic: String(formData.get("topic") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  }

  const errors: ContactState["errors"] = {}
  if (fields.name.length < 2 || fields.name.length > 80) errors.name = "Please enter your name (2–80 characters)."
  if (!EMAIL_PATTERN.test(fields.email) || fields.email.length > 254) errors.email = "Please enter a valid email address."
  if (!TOPICS.includes(fields.topic as (typeof TOPICS)[number])) errors.topic = "Please choose a topic."
  if (fields.message.length < 10 || fields.message.length > 2000)
    errors.message = "Your message should be between 10 and 2000 characters."

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, fields }
  }

  await new Promise((resolve) => setTimeout(resolve, 900))

  return {
    status: "success",
    message: `Thanks, ${fields.name.split(" ")[0]}! We'll get back to you at ${fields.email} within one business day.`,
  }
}

export type NewsletterState = { status: "idle" | "success" | "error"; message?: string }

export async function subscribeNewsletter(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim()
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { status: "error", message: "Enter a valid email address." }
  }

  await new Promise((resolve) => setTimeout(resolve, 700))
  return { status: "success", message: "You're in. Check your inbox to confirm." }
}
