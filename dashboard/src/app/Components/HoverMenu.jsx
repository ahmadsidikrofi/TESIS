"use client"

import * as React from "react"

import { cn } from "@/libs/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { UserSquare } from '@phosphor-icons/react/dist/ssr';
import Link from "next/link";
import { SmileyNervous } from "@phosphor-icons/react";

export function HoverMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-4 text-lg font-bold">
            <SmileyNervous size={32} />
            <p>Pasien</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[340px] lg:w-[340px]">
              <ListItem href="/pasien" title="Semua pasien">
                Cek disini untuk melihat seluruh pasien.
              </ListItem>
              <ListItem href="/docs/installation" title="Rawat Inap">
                Cek disini untuk melihat seluruh pasien yang dirawat dengan inap.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Rawat Jalan">
                Cek disini untuk melihat seluruh pasien yang dirawat dengan jalan.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-lime-50 focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none pb-1">{title}</div>
          <p className="line-clamp-2 text-[12px] leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
