export type QuotationRegistrationPrimitives = {
  customerId: number;
  userId: number;
  // date: string;
  total: string;
  expirationDate: Date;
};

export class QuotationRegistration {
  constructor(
    public readonly customerId: number,
    public readonly userId: number,
    // public readonly date: string,
    public readonly total: string,
    public readonly expirationDate: Date,
  ) {}

  static fromPrimitives(
    primitives: QuotationRegistrationPrimitives,
  ): QuotationRegistration {
    return new QuotationRegistration(
      primitives.customerId,
      primitives.userId,
      primitives.total,
      new Date(),
    );
  }

  toPrimitives(): QuotationRegistrationPrimitives {
    return {
      customerId: this.customerId,
      userId: this.userId,
      total: this.total,
      expirationDate: this.expirationDate,
    };
  }
}
