import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Item } from "@/types/Item";
import { Eye } from "lucide-react"
import Image from "next/image";
type ProductModalProps = {
    product: Item;
};
const ProductModal = ({ product }: ProductModalProps) => {
    
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="absolute top-28 left-25 z-10 opacity-0 group-hover:opacity-100 cursor-pointer">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-600 text-white">
                            <Eye />
                        </span>
                    </button>
                </DialogTrigger>

                <DialogContent className="flex sm:max-w-md md:max-w-lg lg:max-w-3xl h-[60vh]" >
                    <div>
                        <Image src={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${product.thumbnail}`} alt={product.name} width={300} height={200} className="object-container" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-4xl">{product.name}</DialogTitle>
                        <DialogDescription asChild>
                            <div dangerouslySetInnerHTML={{ __html: product.details || "" }} />
                        </DialogDescription>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductModal
