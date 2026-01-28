"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useFetch } from "@/hooks/useFetch"
import { CategoryWithSub } from "@/types/categoryWithSub"
import { slugify } from "@/utils/slugify"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

const Sidebar = () => {
    const { data: categoriesData } = useFetch<CategoryWithSub[]>("/categories-with-sub")
    const [expandedCategory, setExpandedCategory] = useState<number | null>(null)
    
    // Use categoriesData instead of undefined categories variable
    const categories = categoriesData || []
    
    const toggleCategory = (categoryId: number) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
    }
    
    const closeDropdown = () => {
        setExpandedCategory(null)
    }
    
    return (
        <div className="min-w-[280px] ">
            <div className="bg-white border border-gray-200 shadow-xl p-4 rounded-md min-h-[400px]">
                {categories.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                       <Button disabled size="sm">
              <Spinner />
              Loading...
            </Button>
                    </div>
                ) : (
                    categories.map((category) => (
                        <div key={category.id} className="mb-1 last:mb-0">
                            {/* Category */}
                            <div
                                className="flex justify-between items-center cursor-pointer p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={() => toggleCategory(category.id)}
                            >
                                <span className="font-medium text-gray-800">
                                    {category.name}
                                </span>
                                {category.sub_categories && category.sub_categories.length > 0 && (
                                    <ChevronDown
                                        size={18}
                                        className={`ml-2 transition-transform duration-200 ${
                                            expandedCategory === category.id ? "rotate-180" : ""
                                        }`}
                                    />
                                )}
                            </div>

                            {/* Subcategories */}
                            {expandedCategory === category.id &&
                                category.sub_categories &&
                                category.sub_categories.length > 0 && (
                                    <div className="pl-4 mt-1">
                                        {category.sub_categories.map((sub) => (
                                            <Link
                                                key={sub.id}
                                                href={`/subcategory/${slugify(sub.name)}/${sub.id}`}
                                                className="block pl-6 py-2.5 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
                                                onClick={closeDropdown}
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Sidebar