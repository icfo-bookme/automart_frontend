import BottomHeader from "@/components/common/BottomHeader";
import Header from "@/components/common/Header";
import Banner from "@/components/modules/home/Banner";
import { ssrFetch } from "@/lib/ssrFetch";
import { Category } from "@/types/category";

export default async function Page() {
  const { data: categories, error } = await ssrFetch<Category[]>("/categories");

  return (
    <>
      <div className="">
        <Banner />
      </div>

    </>
  );
}
