"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles, Puzzle, MessageSquare } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { ThemeToggle } from "./theme-toggle";
import { Button, IconButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Models", href: "/#models", badge: "40+" },
  { label: "Extension", href: "/extension", badge: "New" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar({ className }: { className?: string } = {}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Handle Escape key to close mobile menu
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border-subtle bg-background/80 backdrop-blur-md transition-colors duration-200",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Product Tag */}
        <div className="flex items-center gap-6">
          <BrandLogo showBadge />

          {/* Desktop Ecosystem switcher links */}
          <nav className="hidden lg:flex items-center gap-1 pl-4 border-l border-border-subtle" aria-label="Ecosystem products">
            <Link
              href="/"
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-colors",
                pathname === "/"
                  ? "bg-surface text-text-primary border border-border-subtle shadow-xs"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              Overview
            </Link>
            <Link
              href="/app"
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-colors",
                pathname === "/app"
                  ? "bg-surface text-text-primary border border-border-subtle shadow-xs"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              <MessageSquare className="size-3 text-accent" />
              Workspace
            </Link>
            <Link
              href="/extension"
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-colors",
                pathname === "/extension"
                  ? "bg-surface text-text-primary border border-border-subtle shadow-xs"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              <Puzzle className="size-3 text-sky-500" />
              Extension
            </Link>
          </nav>
        </div>

        {/* Center: Main Navigation (Desktop) */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-[var(--radius-md)] text-text-secondary transition-colors hover:text-text-primary hover:bg-surface-hover/70 focus-visible:outline-2 focus-visible:outline-accent",
                pathname === link.href && "text-text-primary"
              )}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="inline-flex items-center px-1.5 py-0.2 text-[10px] font-mono font-medium rounded-full bg-surface border border-border-subtle text-text-muted">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link href="/app" className="hidden sm:inline-flex">
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="size-3.5" />}
            >
              Try EchoGPT
            </Button>
          </Link>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <IconButton
              variant="ghost"
              size="sm"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="size-5 text-text-primary" />
              ) : (
                <Menu className="size-5 text-text-primary" />
              )}
            </IconButton>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border-subtle overflow-y-auto p-6 flex flex-col justify-between animate-in slide-in-from-top-2 duration-150"
        >
          <div className="flex flex-col gap-6">
            {/* Ecosystem Switcher for Mobile */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-text-muted">
                Ecosystem
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/app"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-surface border border-border-subtle text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors"
                >
                  <MessageSquare className="size-4 text-accent" />
                  <span>AI Workspace</span>
                </Link>
                <Link
                  href="/extension"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-surface border border-border-subtle text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors"
                >
                  <Puzzle className="size-4 text-sky-500" />
                  <span>Chrome Ext.</span>
                </Link>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-text-muted">
                Explore
              </span>
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-[var(--radius-md)] text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-mono font-medium rounded-full bg-surface border border-border-subtle text-text-muted">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-border-subtle flex flex-col gap-3">
            <Link href="/app" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center"
                leftIcon={<Sparkles className="size-4" />}
                rightIcon={<ArrowRight className="size-4" />}
              >
                Try EchoGPT Now
              </Button>
            </Link>
            <p className="text-center text-xs text-text-muted">
              40+ Frontier AI Models · Zero Individual API Keys Required
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
