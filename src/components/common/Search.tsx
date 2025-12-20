"use client";

import { useFetch } from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { Category } from "@/types/category";
import { Item } from "@/types/item";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { Weight } from "lucide-react";

const Search = () => {
    const router = useRouter();
    const { data: categories } = useFetch<Category[]>("/categories");

    const wrapperRef = useRef<HTMLDivElement>(null);
    const isSelectingRef = useRef(false);

    const [categoryId, setCategoryId] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Item[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const debouncedSearch = useDebounce(search, 300);

    // Fetch suggestions
    const fetchSuggestions = useCallback(
        async (query: string, category: string, signal: AbortSignal) => {
            if (!query.trim() && !category) {
                setSuggestions([]);
                setShowSuggestions(false);
                return;
            }

            setLoading(true);

            try {
                const params = new URLSearchParams();
                if (category) params.append("category_id", category);
                if (query.trim()) params.append("search", query.trim());
                params.append("limit", "5");

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/items/search?${params}`,
                    { signal }
                );

                const json = await res.json();

                if (Array.isArray(json?.data)) {
                    setSuggestions(json.data);
                    setShowSuggestions(true);
                    setActiveIndex(-1);
                } else {
                    setSuggestions([]);
                }
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    console.error("Suggestion fetch error:", err);
                }
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // Effect to fetch suggestions
    useEffect(() => {
        if (isSelectingRef.current) {
            isSelectingRef.current = false;
            return;
        }

        const controller = new AbortController();
        fetchSuggestions(debouncedSearch, categoryId, controller.signal);

        return () => controller.abort();
    }, [debouncedSearch, categoryId, fetchSuggestions]);

    const handleCategoryChange = (value: string) => {
        setCategoryId(value);
        setSearch("");
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleSearchSubmit = () => {
        const params = new URLSearchParams();
        if (categoryId) params.append("category_id", categoryId);
        if (search.trim()) params.append("search", search.trim());

        router.push(`/items/search?${params}`);
        setShowSuggestions(false);
    };

    const handleSuggestionSelect = (item: Item) => {
        isSelectingRef.current = true;
        setSearch(item.name);
        setShowSuggestions(false);
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            handleSuggestionSelect(suggestions[activeIndex]);
        }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    return (
        <div ref={wrapperRef} className="relative">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearchSubmit();
                }}
                className="grid grid-cols-5"
            >
                <NativeSelect
                    value={categoryId}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="rounded-r-none col-span-1 h-12"
                >
                    <NativeSelectOption value="">Select Category</NativeSelectOption>
                    {categories?.map((cat) => (
                        <NativeSelectOption key={cat.id} value={String(cat.id)}>
                            {cat.name}
                        </NativeSelectOption>
                    ))}
                </NativeSelect>

                <div className="relative flex-1 col-span-3">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => suggestions.length && setShowSuggestions(true)}
                        placeholder="Search product..."
                        className="rounded-none border-l-0 h-12"
                        aria-autocomplete="list"
                        aria-controls="suggestions-listbox"
                        aria-activedescendant={
                            activeIndex >= 0 ? `suggestion-${suggestions[activeIndex].id}` : undefined
                        }
                    />

                    {showSuggestions && (
                        <div
                            id="suggestions-listbox"
                            role="listbox"
                            className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow max-h-80 overflow-y-auto"
                        >
                            {loading ? (
                                <p className="p-3 text-center text-gray-500">Loading...</p>
                            ) : suggestions.length ? (
                                <ul className="divide-y">
                                    {suggestions.map((item, index) => (
                                        <li
                                            key={item.id}
                                            id={`suggestion-${item.id}`}
                                            role="option"
                                            aria-selected={activeIndex === index}
                                            onClick={() => handleSuggestionSelect(item)}
                                            className={`p-3 cursor-pointer hover:bg-gray-50 ${activeIndex === index ? "bg-gray-100" : ""
                                                }`}
                                        >
                                            <div className="grid grid-cols-4">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${item.thumbnail}`}
                                                    width={50}
                                                    height={50}
                                                    alt="Thumbnail"
                                                />
                                                <div className="col-span-3">
                                                    <p className="font-medium truncate">{item.name}</p>
                                                    <div className="flex gap-3">
                                                        <p className="text-sm text-gray-600 line-through">BDT {item.regular_price}</p>
                                                        <p className="text-sm text-red-600 font-bold">BDT {item.sales_price}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="p-3 text-center text-gray-500">No results found</p>
                            )}
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    className="h-12 col-span-1 rounded-l-none cursor-pointer bg-red-600 hover:bg-red-700"
                >
                    Search
                </Button>
            </form>
        </div>
    );
};

export default Search;
