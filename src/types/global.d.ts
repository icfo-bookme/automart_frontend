type PageProps = {
  params: Promise<{
    name: string;
    id: string;
  }>;
};


type ProductCarouselProps = {
  products: Item[];
  nam?: string;
};