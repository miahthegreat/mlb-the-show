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
      <NavigationMenu className="hidden md:fixed p-4 md:bg-white/40 md:backdrop-blur-sm">
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
                Marketplace
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
      <div className="block md:hidden">
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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 grid grid-cols-2 gap-1">
        <Link
          href="/"
          className={cx(
            navigationMenuTriggerStyle(),
            `${pathname === "/" ? "bg-gray-100" : ""}`,
            "min-w-full text-center bg-gray-50"
          )}
        >
          Home
        </Link>

        <Link
          href="/captains"
          className={cx(
            navigationMenuTriggerStyle(),
            `${pathname === "/captains" ? "bg-gray-100" : ""}`,
            "min-w-full text-center bg-gray-50"
          )}
        >
          Captains
        </Link>

        <Link
          href="/items"
          className={cx(
            navigationMenuTriggerStyle(),
            `${pathname === "/items" ? "bg-gray-100" : ""}`,
            "min-w-full text-center bg-gray-50"
          )}
        >
          Items
        </Link>

        <Link
          href="/listings"
          className={cx(
            navigationMenuTriggerStyle(),
            `${pathname === "/listings" ? "bg-gray-100" : ""}`,
            "min-w-full text-center bg-gray-50"
          )}
        >
          Listings
        </Link>

        <Link
          href="/updates"
          className={cx(
            navigationMenuTriggerStyle(),
            `${pathname === "/updates" ? "bg-gray-100" : ""}`,
            "min-w-full text-center bg-gray-50"
          )}
        >
          Roster Updates
        </Link>

        <Link
          href="/history"
          className={cx(
            navigationMenuTriggerStyle(),
            `${pathname === "/history" ? "bg-gray-100" : ""}`,
            "min-w-full text-center bg-gray-50"
          )}
        >
          Game History
        </Link>
      </PopoverContent>
    </Popover>
  );
};
