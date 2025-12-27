import { ssrFetch } from "@/lib/ssrFetch";
import Header from "../header";

import { ProductCarousel } from "@/utils/ProductCarousel";
import { Item } from "@/types/Item";

type LatestProductProps = {
    sectionId: number;
    headerTitle?: string;
};

const Product = async ({ sectionId, headerTitle }: LatestProductProps) => {
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

export default Product;
