import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    private nextId = 1;

    findAll(): Product[] {
        return this.products;
    }

    create(product: CreateProductDto) {
        const newProduct: Product = {
            id: this.nextId++,
            ...product,
        };

        this.products.push(newProduct);
        return newProduct;
    }

    findOne(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    update(id: number, updatedProduct: UpdateProductDto) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...updatedProduct,
            };

            return this.products[index];
        }

        return undefined;
    }

    delete(id: number) {
        this.products = this.products.filter(product => product.id !== id);
    }

}
