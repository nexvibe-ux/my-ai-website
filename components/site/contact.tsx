import { Mail, MessageSquare } from "lucide-react"
import { ContactForm } from "@/components/site/contact-form"
import { Faq } from "@/components/site/faq"

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <Faq />

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Contact</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">{"Let's build together"}</h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <Mail className="size-4 text-primary" aria-hidden="true" />
              <a href="mailto:hello@nexvibe.ai" className="transition-colors hover:text-foreground">
                hello@nexvibe.ai
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MessageSquare className="size-4 text-primary" aria-hidden="true" />
              Avg. reply under 4 hours
            </li>
          </ul>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
