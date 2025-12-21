import InfiniteProductList from "@/components/common/InfiniteProductList";
import Banner from "@/components/modules/home/Banner";
import ShippingInfo from "@/components/modules/home/DeliverySupportComponent";
import LatestProduct from "@/components/modules/home/LatestProducts/LatestProduct";
import { ssrFetch } from "@/lib/ssrFetch";
import { Category } from "@/types/category";

export default async function Page() {
  const { data: categories, error } = await ssrFetch<Category[]>("/categories");

  return (
    <>
      <div className="">
        <Banner />
        <ShippingInfo />
        <LatestProduct sectionId={2} headerTitle="Latest Products" />
        <LatestProduct sectionId={1} headerTitle="TREANDING" />
        <LatestProduct sectionId={7} headerTitle="Book A Service" />
        <LatestProduct sectionId={2} headerTitle="Shops" />
        <InfiniteProductList  />
      </div>

    </>
  );
}
