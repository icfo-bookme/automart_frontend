"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useFetch } from "@/hooks/useFetch"
import { Menu, ChevronDown, X, HousePlus } from "lucide-react"
import { CategoryWithSub } from "@/types/categoryWithSub"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"

const BottomHeader = () => {
  const { data: categoriesData } = useFetch<CategoryWithSub[]>("/categories-with-sub")
  const [categories, setCategories] = useState<CategoryWithSub[]>([])
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const navItems = [
    { label: "SHOP", href: "/shop" },
    { label: "OFFER", href: "/offers" },
    { label: "CONTACT US", href: "/contact" },
  ]

  useEffect(() => {
    if (categoriesData) setCategories(categoriesData)
  }, [categoriesData])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleCategory = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  const closeDropdown = () => {
    setDropdownOpen(false)
    setExpandedCategory(null)
  }

  return (
    <>
      {/* Desktop Header */}
      <header className={`hidden bg-[#222222] border-b-2 border-red-600  lg:block transition-all duration-200 ${isScrolled ? "shadow-md" : ""}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-start py-3 gap-6">
            {/* Categories Dropdown */}
             <HousePlus className="text-white" />
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
                >
                  <Menu size={20} />
                  ALL CATEGORIES
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="min-w-[280px] bg-white border border-gray-200 shadow-xl p-2 rounded-md">
                {categories.map((category) => (
                  <div key={category.id}>
                    {/* Category */}
                    <div
                      className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-50 rounded"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      {category.sub_categories && category.sub_categories.length > 0 && (
                        <ChevronDown
                          size={16}
                          className={`ml-2 transition-transform ${expandedCategory === category.id ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>

                    {/* Subcategories */}
                    {expandedCategory === category.id &&
                      category.sub_categories &&
                      category.sub_categories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/subcategory/${sub.id}`}
                          className="block pl-6 py-1 text-gray-600 hover:text-red-600 rounded"
                          onClick={closeDropdown} // close when subcategory clicked
                        >
                          {sub.name}
                        </Link>
                      ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Navigation Links */}
            <nav className="flex text-white items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white font-semibold hover:text-red-600 transition-colors uppercase"
                  onClick={closeDropdown}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className={`lg:hidden sticky top-0 z-40 bg-white ${isScrolled ? "shadow-md" : ""}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            <div className="text-xl font-bold text-gray-900">R CAR</div>
            <div className="w-10" /> {/* placeholder */}
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50 lg:hidden">
              <div className="p-4">
                {/* Categories Accordion */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 px-2">ALL CATEGORIES</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <div key={category.id} className="border-b">
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50"
                        >
                          <span className="font-medium">{category.name}</span>
                          {category.sub_categories && category.sub_categories.length > 0 && (
                            <ChevronDown
                              size={16}
                              className={`transition-transform ${expandedCategory === category.id ? "rotate-180" : ""}`}
                            />
                          )}
                        </button>

                        {expandedCategory === category.id &&
                          category.sub_categories &&
                          category.sub_categories.length > 0 && (
                            <div className="pl-4 pb-2">
                              {category.sub_categories.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={`/subcategory/${sub.id}`}
                                  className="block p-2 text-gray-600 hover:text-red-600"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block p-3 font-semibold text-gray-700 hover:bg-gray-50 rounded-md uppercase"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

export default BottomHeader
