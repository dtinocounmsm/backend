export type QuotationDetailPrimitives = {
  quotationId: number;
  productId: number;
  quantity: string;
  price: string;
  total: string;
};

export class QuotationDetail {
  constructor(
    public readonly quotationId: number,
    public readonly productId: number,
    public readonly quantity: string,
    public readonly price: string,
    public readonly total: string,
  ) {}

  static fromPrimitives(
    primitives: QuotationDetailPrimitives,
  ): QuotationDetail {
    return new QuotationDetail(
      primitives.quotationId,
      primitives.productId,
      primitives.quantity,
      primitives.price,
      primitives.total,
    );
  }

  toPrimitives(): QuotationDetailPrimitives {
    return {
      quotationId: this.quotationId,
      productId: this.productId,
      quantity: this.quantity,
      price: this.price,
      total: this.total,
    };
  }
}
