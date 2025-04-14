'use client'

import Link from 'next/link'
import { BrandLogo } from './brand-logo'
import { SocialIcons } from './social-icons'

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-gradient-to-b from-background to-primary/5">
      <div className="container px-4 py-8">
        {/* Logo and links grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="mb-3">
              <BrandLogo size="md" />
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Test your knowledge with interactive quizzes across various topics.
            </p>
            <SocialIcons size="md" />
          </div>
          <FooterLinkGroup
            title="Explore"
            links={[
              { href: "/", label: "Home" },
              { href: "/quizzes", label: "Quizzes" },
              { href: "/leaderboard", label: "Leaderboard" },
              { href: "/about", label: "About" },
            ]}
          />
          <FooterLinkGroup
            title="Account"
            links={[
              { href: "/profile", label: "Profile" },
              { href: "/dashboard", label: "Dashboard" },
              { href: "/login", label: "Sign In" },
              { href: "/signup", label: "Sign Up" },
            ]}
          />
        </div>

        {/* Bottom bar with copyright */}
        <CopyrightBar />
      </div>
    </footer>
  );
}

interface FooterLinkGroupProps {
  title: string;
  links: Array<{
    href: string;
    label: string;
  }>;
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <h3 className="mb-3 text-sm font-bold">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CopyrightBar() {
  return (
    <div className="mt-8 flex flex-col items-center justify-between border-t border-border/40 pt-4 text-center sm:flex-row">
      <p className="text-muted-foreground text-xs">
        &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
      </p>
      <div className="mt-2 flex space-x-4 sm:mt-0">
        <Link
          href="/privacy"
          className="text-muted-foreground hover:text-primary text-xs transition-colors"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="text-muted-foreground hover:text-primary text-xs transition-colors"
        >
          Terms
        </Link>
        <span className="text-muted-foreground text-xs">
          By{" "}
          <a
            href="https://github.com/WilsonRIP"
            className="text-primary hover:underline"
          >
            WilsonRIP
          </a>
        </span>
      </div>
    </div>
  );
} 