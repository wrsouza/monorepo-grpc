export class CreateProductRequest {
  name: string;
  sku: string;
  slug: string;
  price: number;
  stock: number;
  categories: string[];
}
