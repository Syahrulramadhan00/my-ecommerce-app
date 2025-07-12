"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface ProductSortDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ProductSortDropdown({ value, onValueChange }: ProductSortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Sort By</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort products by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="stock-asc">Stock: Low to High</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="stock-desc">Stock: High to Low</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}