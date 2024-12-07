export type ProductRegistrationPrimitives = {
  name: string;
  description: string;
  purchasePrice: string;
  sellingPrice: string;
  imageUrl: string;
  stock: number;
  active: boolean;
};

export class ProductRegistration {
  private constructor(
    readonly name: string,
    readonly description: string,
    readonly purchasePrice: string,
    readonly sellingPrice: string,
    readonly imageUrl: string,
    readonly stock: number,
    readonly active: boolean,
  ) {}

  static fromPrimitives(
    primitives: ProductRegistrationPrimitives,
  ): ProductRegistration {
    return new ProductRegistration(
      primitives.name,
      primitives.description,
      primitives.purchasePrice,
      primitives.sellingPrice,
      primitives.imageUrl,
      primitives.stock ?? 0,
      primitives.active ?? true,
    );
  }

  toPrimitives(): ProductRegistrationPrimitives {
    return {
      name: this.name,
      description: this.description,
      purchasePrice: this.purchasePrice,
      sellingPrice: this.sellingPrice,
      imageUrl: this.imageUrl,
      stock: this.stock,
      active: this.active,
    };
  }
}
