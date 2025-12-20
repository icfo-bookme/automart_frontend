"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Heart, ShoppingCart, PhoneCall, ChevronUp } from "lucide-react"
import { NativeSelect, NativeSelectOption } from "../ui/native-select"
import { Category } from "@/types/category"
import Search from "./Search"

export default function Header() {
  const router = useRouter()

  const [categoryId, setCategoryId] = useState<string>("")
  const [search, setSearch] = useState<string>("")

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (categoryId) {
      params.append("category_id", categoryId)
    }

    if (search.trim()) {
      params.append("search", search.trim())
    }

    router.push(`/items/search?${params.toString()}`)
  }

  return (
    <header className="w-full border-b bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 text-sm border-b border-b-gray-200 h-10">
        <div className="flex font-bold text-xs items-center gap-2">
          <PhoneCall className="h-4 w-4 text-muted-foreground" />
          <span>
            CALL US: <strong className="text-red-600">01888-022244</strong>
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              LOGIN <ChevronUp />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem>Sign In</DropdownMenuItem>
            <DropdownMenuItem>Register</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Header */}
      <div className="grid grid-cols-5 gap-6 px-6 py-4">
        {/* Logo */}
        <div className="flex col-span-1 items-center gap-2">
          <Image
            src="/logo/automax-lg.png"
            alt="Automart"
            width={150}
            height={50}
            priority
          />
        </div>
        {/* Search Bar */}
        <div className="col-span-3">
          <Search />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 col-span-1">
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-5 w-5" />
            <Badge
              className="absolute text-blue-950 -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
              variant="destructive"
            >
              0
            </Badge>
          </Button>

          <Button variant="destructive" className="relative gap-2 text-blue-950">
            <ShoppingCart className="h-5 w-5" />
            <span>to</span>
            <Badge className="ml-1" variant="secondary">
              0
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  )
}
