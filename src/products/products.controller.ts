import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

// Argument filters requests for "domain/products" paths only
@Controller('products')
export class ProductsController {
  // private does the same as public but is only visible in this file
  // readonly makes it clear that you will never replsce productsService with a new value
  constructor(private readonly productsService: ProductsService) {}
  // Handles POST requests to "domain/products"
  @Post()
  async addProduct(
    // This is how input is extracted in nestjs
    // The @Body decorator is used which accepts the field its extracting and a typed argument where the value is stored in
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );

    return { id: generatedId };
  }

  // Handled on GET requests to "domain/products"
  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  // Handles GET requests on "domain/products/id"
  @Get(':id')
  // How to extract params from incoming request
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    // Similar to req.body extraction in express
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );

    return { message: 'Product updated successfully!' };
  }
  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);

    return { message: 'Product deleted successfully!' };
  }
}
