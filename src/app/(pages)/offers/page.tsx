import Sidebar from "@/components/modules/shops/Sidebar"
import InfiniteProductList from "@/utils/InfiniteProductList"


const page = () => {
    return (
        <div className="container mx-auto min-h-[calc(100vh-100px)]">
            <div className="md:grid grid-cols-12">
                <div className="hidden lg:block col-span-3">
                    <Sidebar />
                </div>
                <div className="col-span-9">
                   <InfiniteProductList sort="newest" title = "Limited Time Deals" styleClass="grid-cols-4" />
                </div>
            </div>
        </div>
    )
}

export default page
