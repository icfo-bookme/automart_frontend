import Card from "@/components/modules/shops/Card";
import { ssrFetch } from "@/lib/ssrFetch";
import { Item } from "@/types/Item";


const page = async ({ params }: PageProps) => {
    const { name, id } = await params;

    const { data, error } = await ssrFetch<Item[]>(
        `/items/subcategory/${id}`
    );
    console.log("data", data, error);
    return (
        <div>
            <Card products={data || []} nam={name} />
        </div>
    )
}

export default page
