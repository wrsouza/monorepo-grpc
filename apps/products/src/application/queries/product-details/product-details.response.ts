import { Product } from '../../../domain-models/product';

export class ProductDetailsResponse {
  id: string;
  name: string;
  sku: string;
  slug: string;
  price: number;
  stock: number;
  createdAt: string;
  categories: string[];

  constructor(product: Product) {
    this.id = product.id.value;
    this.name = product.name;
    this.sku = product.sku;
    this.slug = product.slug;
    this.price = product.price;
    this.stock = product.stock;
    this.createdAt = product.createdAt.toISOString();
    this.categories = product.categories.map((category) => category.id.value);
  }
}
