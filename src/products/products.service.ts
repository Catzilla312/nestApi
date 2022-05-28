import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService{
    private products:Product[] = [];

    insertProduct(title:String,description:String,price:Number):String{
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts():Product[]{
        return [...this.products];
    }

    getSingleProduct(productId:string){
        const product = this.findProduct(productId)[0];
        return {...product};
    }

    updateSingleProduct(productId:string,title:string,description:string,price:number){
        const [product,index] = this.findProduct(productId);
        const updatedProduct = {...product};
        if(title){
            updatedProduct.title = title;
        }
        if(description){
            updatedProduct.description = description;
        }
        if(price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    deleteSingleProduct(productId:string){
        const index = this.findProduct(productId)[1];
        this.products.splice(index,1);
    }

    private findProduct(productId:string):[Product,number]{
        const productIndex = this.products.findIndex((product)=>product.id === productId);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException("Product not found");
        }
        return [product,productIndex];
    }
}