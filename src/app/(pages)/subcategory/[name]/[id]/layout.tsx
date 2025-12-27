import Sidebar from "@/components/modules/shops/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (  
        <div className="container mx-auto">
            <div className="grid grid-cols-12">
                <div className="col-span-3">
                    <Sidebar />
                </div>
                <div className="col-span-9">
                  <main>{children}</main>
                </div>
            </div>
        </div> 
        
    
  )
}