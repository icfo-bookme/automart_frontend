"use client"
import { useFetch } from "@/hooks/useFetch";
import { NativeSelect, NativeSelectOption } from "../ui/native-select"
import { Category } from "@/types/category";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Search = () => {
    const router = useRouter();
    const { data: categories } = useFetch<Category[]>("/categories");

    const [categoryId, setCategoryId] = useState<string>("")
    const [search, setSearch] = useState<string>("")

    // Function that actually performs the action
    const performSearch = (currentSearch: string, currentCategoryId: string) => {
        const params = new URLSearchParams()

        if (currentCategoryId) {
            params.append("category_id", currentCategoryId)
        }

        if (currentSearch.trim()) {
            params.append("search", currentSearch.trim())
        }

        console.log("Perform search with params:", params.toString())
        router.push(`/items/search?${params.toString()}`)
    }

    // Called on input typing
    const handleTyping = (value: string) => {
        setSearch(value)
        performSearch(value, categoryId) // call performSearch on typing
    }

    // Called on button click / Enter
    const handleSearch = () => {
        performSearch(search, categoryId)
    }

    return (
        <div>
            {/* Search Bar */}
            <div className="flex col-span-3 items-center">
                <NativeSelect
                    className="rounded-r-none"
                    value={categoryId}
                    onChange={(e) => {
                        setCategoryId(e.target.value)
                        performSearch(search, e.target.value) // call performSearch when category changes
                    }}
                >
                    <NativeSelectOption value="">
                        Select Category
                    </NativeSelectOption>

                    {categories.map((category) => (
                        <NativeSelectOption
                            key={category.id}
                            value={category.id.toString()}
                        >
                            {category.name}
                        </NativeSelectOption>
                    ))}
                </NativeSelect>

                <Input
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) => handleTyping(e.target.value)}
                    className="rounded-none border-l-0"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch()
                    }}
                />

                <Button
                    onClick={handleSearch}
                    className="rounded-l-none bg-red-600 hover:bg-red-700"
                >
                    Search
                </Button>
            </div>
        </div>
    )
}

export default Search
