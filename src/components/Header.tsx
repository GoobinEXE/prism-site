"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { navLinks } from "@/lib/navigation";
import { PrismLockup } from "@/components/logos/PrismLockup";
import { ChamberLink } from "@/components/ChamberLink";
import { directionForNav, phaseFromPath } from "@/lib/chamber";

function PhaseLink({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const pathname = usePathname();
  const crosses = directionForNav(phaseFromPath(pathname), href) !== null;

  if (crosses) {
    return (
      <ChamberLink
        href={href}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </ChamberLink>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const inDarkRoom = phaseFromPath(pathname) === "dark-room";

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  function closeMenu() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const outside = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer, .contact-fab")
    );
    document.body.style.overflow = "hidden";
    outside.forEach((node) => {
      node.inert = true;
    });
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      outside.forEach((node) => {
        node.inert = false;
      });
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <div className="site-header__bar">
        <div className="container flex h-(--header-h) items-center justify-between gap-4 px-(--margin)">
          <PhaseLink
            href="/"
            className="relative z-10 flex shrink-0 items-center"
            aria-label="Prism, início"
          >
            <PrismLockup />
          </PhaseLink>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Navegação principal"
          >
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <PhaseLink
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm whitespace-nowrap transition-colors xl:px-3 ${
                    active
                      ? inDarkRoom
                        ? "bg-(--surface-high) font-medium text-foreground shadow-[inset_0_-2px_0_var(--spectrum-magenta)]"
                        : "bg-(--surface-high) font-medium text-foreground"
                      : "text-(--text-secondary) hover:text-foreground"
                  }`}
                >
                  {link.label}
                </PhaseLink>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/contato"
              className="btn btn-ghost min-h-9! px-4! text-sm! whitespace-nowrap"
            >
              Fale conosco
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-(--radius) bg-(--glass) lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span
                className={`h-0.5 w-full bg-foreground transition-transform ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-foreground transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-foreground transition-transform ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 top-(--header-h) z-40 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        inert={!open}
      >
        <nav
          ref={menuRef}
          className={`glass-elevated mobile-menu-panel absolute inset-x-0 top-0 z-10 mx-3 mt-3 rounded-xl p-3 transition-all ${
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
          aria-label="Navegação móvel"
        >
          <ul className="flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <PhaseLink
                    href={link.href}
                    className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                      active
                        ? "bg-(--surface-high) text-foreground"
                        : "text-(--text-secondary)"
                    }`}
                  >
                    {link.label}
                  </PhaseLink>
                </li>
              );
            })}
          </ul>
          <Link
            href="/contato"
            className="btn btn-primary mt-2 w-full"
          >
            Fale conosco
          </Link>
        </nav>
        <button
          type="button"
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Fechar menu"
          tabIndex={-1}
          onClick={closeMenu}
        />
      </div>
    </header>
  );
}
