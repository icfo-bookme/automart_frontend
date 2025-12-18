import Header from "@/components/common/Header";
import { ssrFetch } from "@/lib/ssrFetch";
import { Category } from "@/types/category";

export default async function Page() {
  const { data: categories, error } = await ssrFetch<Category[]>("/categories");

  return (
    <>
      <Header categories={categories || []} />
    </>
  );
}
