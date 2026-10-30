import { projects, type ProjectKey } from "@/lib/projects";

type ProjectLinksProps = {
  project: ProjectKey;
  variant?: "prism" | "dark";
  named?: boolean;
  className?: string;
};

export function ProjectLinks({
  project,
  variant = "prism",
  named = false,
  className = "",
}: ProjectLinksProps) {
  const { name, links } = projects[project];
  const linkClass =
    variant === "dark"
      ? "btn-tactical min-h-10! px-3.5! py-2!"
      : "btn btn-ghost min-h-10! px-3.5! py-2! text-sm!";

  return (
    <ul className={`relative z-1 flex flex-wrap gap-2 ${className}`}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {named ? `${name} · ${link.label}` : link.label}
            <span className="sr-only">
              {named ? " (abre em nova aba)" : ` de ${name} (abre em nova aba)`}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
