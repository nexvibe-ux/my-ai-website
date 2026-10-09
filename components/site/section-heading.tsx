import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
