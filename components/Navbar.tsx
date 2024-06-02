"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cx } from "class-variance-authority";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <NavigationMenu className="hidden md:fixed p-4 md:bg-slate-50/90 md:backdrop-blur-sm shadow-md">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cx(
                  navigationMenuTriggerStyle(),
                  `${pathname === "/" ? "bg-gray-100" : ""}`
                )}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/captains" legacyBehavior passHref>
              <NavigationMenuLink
                className={cx(
                  navigationMenuTriggerStyle(),
                  `${pathname === "/captains" ? "bg-gray-100" : ""}`
                )}
              >
                Captains
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/items" legacyBehavior passHref>
              <NavigationMenuLink
                className={cx(
                  navigationMenuTriggerStyle(),
                  `${pathname === "/items" ? "bg-gray-100" : ""}`
                )}
              >
                Items
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/listings" legacyBehavior passHref>
              <NavigationMenuLink
                className={cx(
                  navigationMenuTriggerStyle(),
                  `${pathname === "/listings" ? "bg-gray-100" : ""}`
                )}
              >
                Listings
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/updates" legacyBehavior passHref>
              <NavigationMenuLink
                className={cx(
                  navigationMenuTriggerStyle(),
                  `${pathname === "/updates" ? "bg-gray-100" : ""}`
                )}
              >
                Roster Updates
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/history" legacyBehavior passHref>
              <NavigationMenuLink
                className={cx(
                  navigationMenuTriggerStyle(),
                  `${pathname === "/history" ? "bg-gray-100" : ""}`
                )}
              >
                Game History
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="fixed w-full p-2 z-[5] bg-slate-50/90 backdrop-blur-sm shadow-md md:m-0 md:hidden">
        <MobileNav pathname={pathname} />
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const MobileNav = ({ pathname }: { pathname: string }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <Popover open={menuOpen} onOpenChange={setMenuOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <MenuIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 grid grid-cols-2 gap-1">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className={cx(
            navigationMenuTriggerStyle(),
            `${pathname === "/" ? "bg-gray-100" : ""}`,
            "min-w-full text-center"
          )}
        >
          Home
        </Link>

        <Link
          href="/captains"
          onClick={() => setMenuOpen(false)}
          className={cx(
            navigationMenuTriggerStyle(),
            `${pathname === "/captains" ? "bg-gray-100" : ""}`,
            "min-w-full text-center"
          )}
        >
          Captains
        </Link>

        <Link
          href="/items"
          onClick={() => setMenuOpen(false)}
          className={cx(
            navigationMenuTriggerStyle(),
            `${pathname === "/items" ? "bg-gray-100" : ""}`,
            "min-w-full text-center"
          )}
        >
          Items
        </Link>

        <Link
          href="/listings"
          onClick={() => setMenuOpen(false)}
          className={cx(
            navigationMenuTriggerStyle(),
            `${pathname === "/listings" ? "bg-gray-100" : ""}`,
            "min-w-full text-center"
          )}
        >
          Listings
        </Link>

        <Link
          href="/updates"
          onClick={() => setMenuOpen(false)}
          className={cx(
            navigationMenuTriggerStyle(),
            `${pathname === "/updates" ? "bg-gray-100" : ""}`,
            "min-w-full text-center"
          )}
        >
          Roster Updates
        </Link>

        <Link
          href="/history"
          onClick={() => setMenuOpen(false)}
          className={cx(
            navigationMenuTriggerStyle(),
            `${pathname === "/history" ? "bg-gray-100" : ""}`,
            "min-w-full text-center"
          )}
        >
          Game History
        </Link>
      </PopoverContent>
    </Popover>
  );
};
