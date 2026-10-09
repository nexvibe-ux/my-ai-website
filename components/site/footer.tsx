import { Logo } from "@/components/site/logo"
import { NewsletterForm } from "@/components/site/newsletter-form"
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/site/social-icons"

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Showcase", href: "#showcase" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API reference", href: "#" },
      { label: "Status", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
]

const SOCIALS = [
  { label: "X (Twitter)", href: "https://x.com", icon: XIcon },
  { label: "GitHub", href: "https://github.com", icon: GitHubIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
]

export function Footer() {
  return (
    <footer className="relative border-t">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The platform for building, deploying, and scaling AI agents your users can trust.
            </p>
            <div className="mt-6">
              <p className="text-sm font-medium">Get product updates</p>
              <p className="mt-1 text-xs text-muted-foreground">One email a month. No spam, unsubscribe anytime.</p>
              <div className="mt-3">
                <NewsletterForm />
              </div>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-medium">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Nexvibe AI, Inc.</p>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Cookies
            </a>
          </div>
          <ul className="flex items-center gap-2">
            {SOCIALS.map((social) => {
              const Icon = social.icon
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass grid size-9 place-items-center rounded-full text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
                  >
                    <Icon className="size-4" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}
