import { ssrFetch } from "@/lib/ssrFetch";
import Header from "../header";

import { ProductCarousel } from "@/components/common/ProductCarousel";
import { Item } from "@/types/item";

type LatestProductProps = {
  sectionId: number;
  headerTitle?: string;
};

const LatestProduct = async ({ sectionId, headerTitle }: LatestProductProps) => {
    console.log("Section ID:", sectionId);
    const { data, error } = await ssrFetch<Item[]>(
        `/items/${sectionId}`
    );

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
            <div>
                <Header
                    title={headerTitle || "Latest Products"}
                />
            </div>
            <div>
                <ProductCarousel products={data || []} />
            </div>
        </>
    );
};

export default LatestProduct;
