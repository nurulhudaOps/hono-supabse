import { ProductRepository } from '../repositories/product.repo.js';
import { Product, CreateProductRequest, UpdateProductRequest } from '../types/product.type.js';
import { wrapperData } from '../utils/wrapper.js';
import { DataNotFound } from '../utils/errors.js';
import { WrapperData } from '../types/wrapper.type.js';

export class ProductDomain {
  private repo: ProductRepository;

  constructor() {
    this.repo = new ProductRepository();
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.repo.getAllProducts();
  }

  async getProductById(id: string): Promise<WrapperData> {
    const data = await this.repo.getProductById(id);
    if (!data) {
      return wrapperData(null, DataNotFound())
    }
    return wrapperData(data, null)
  }

  async createProduct(productData: CreateProductRequest): Promise<Product> {
    this.validateCreateProduct(productData);
    return this.repo.createProduct(productData);
  }

  async updateProduct(id: string, updates: UpdateProductRequest): Promise<Product | null> {
    this.validateUpdateProduct(updates);
    return this.repo.updateProduct(id, updates);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.repo.deleteProduct(id);
  }

  private validateCreateProduct(product: CreateProductRequest): void {
    if (!product.name || product.name.trim().length === 0) {
      throw new Error('Product name is required');
    }
    if (product.price <= 0) {
      throw new Error('Product price must be greater than 0');
    }
  }

  private validateUpdateProduct(updates: UpdateProductRequest): void {
    if (updates.name !== undefined && (!updates.name || updates.name.trim().length === 0)) {
      throw new Error('Product name cannot be empty');
    }
    if (updates.price !== undefined && updates.price <= 0) {
      throw new Error('Product price must be greater than 0');
    }
  }
}