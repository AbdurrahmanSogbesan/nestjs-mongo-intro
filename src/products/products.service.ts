import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    // Injecting the mongodb schema
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProd = new this.productModel({ title, description, price });

    const result = await newProd.save();

    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
    })) as Product[];
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (description) {
      updatedProduct.description = description;
    }
    await updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Product was not found');
    }
    if (!product) {
      // Special error handler in nestjs which sends a 404 response
      throw new NotFoundException('Product was not found');
    }

    return product;
  }
}
