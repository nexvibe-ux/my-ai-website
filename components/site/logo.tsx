import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#home" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="Nexvibe AI home">
      <span className="relative grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-[0_0_24px_-4px] shadow-primary/60 transition-transform duration-300 group-hover:rotate-6">
        <span className="size-3 rounded-sm bg-background" />
      </span>
      <span className="text-lg font-semibold tracking-tight">
        Nexvibe<span className="text-primary">.ai</span>
      </span>
    </a>
  )
}
