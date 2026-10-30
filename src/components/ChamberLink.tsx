"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  forwardRef,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useChamber } from "@/components/ChamberProvider";
import { directionForNav, phaseFromPath } from "@/lib/chamber";

type ChamberLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  children: ReactNode;
  direction?: "enter" | "exit";
};

export const ChamberLink = forwardRef<HTMLAnchorElement, ChamberLinkProps>(
  function ChamberLink(
    { href, children, direction: forcedDirection, onClick, ...rest },
    ref
  ) {
    const pathname = usePathname();
    const { play, isPlaying } = useChamber();

    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      onClick?.(event);
      if (event.defaultPrevented) return;

      const from = phaseFromPath(pathname);
      const dir = forcedDirection ?? directionForNav(from, href);

      if (!dir) return;

      event.preventDefault();
      if (isPlaying) return;
      play(dir, href);
    }

    return (
      <Link ref={ref} href={href} onClick={handleClick} {...rest}>
        {children}
      </Link>
    );
  }
);
