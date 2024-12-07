export type QuotationRegistrationPrimitives = {
  customerId: number;
  userId: number;
  string: string;
  total: string;
  expirationstring: string;
};

export class QuotationRegistration {
  constructor(
    public readonly customerId: number,
    public readonly userId: number,
    public readonly string: string,
    public readonly total: string,
    public readonly expirationstring: string,
  ) {}

  static fromPrimitives(
    primitives: QuotationRegistrationPrimitives,
  ): QuotationRegistration {
    return new QuotationRegistration(
      primitives.customerId,
      primitives.userId,
      primitives.string,
      primitives.total,
      primitives.expirationstring,
    );
  }

  toPrimitives(): QuotationRegistrationPrimitives {
    return {
      customerId: this.customerId,
      userId: this.userId,
      string: this.string,
      total: this.total,
      expirationstring: this.expirationstring,
    };
  }
}
