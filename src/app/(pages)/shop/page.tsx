import Sidebar from "@/components/modules/shops/Sidebar"


const page = () => {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-12">
                <div className="col-span-3">
                    <Sidebar />
                </div>
                <div className="col-span-9">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus illo quasi magni repellendus minus eaque illum totam aut soluta nostrum, repudiandae vitae similique omnis beatae eligendi! Nesciunt nihil magnam autem!
                </div>
            </div>
        </div>
    )
}

export default page
