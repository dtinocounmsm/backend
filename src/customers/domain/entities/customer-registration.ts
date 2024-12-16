export type CustomerRegistrationPrimitives = {
  name: string;
  firstSurname: string;
  secondSurname: string;
  documentType: string;
  documentNumber: string;
  email: string;
  address: string;
  countryCode: string;
  phone: string;
  mobile: string;
  birthdate: string;
  gender: string;
  active: boolean;
};

export class CustomerRegistration {
  constructor(
    private readonly name: string,
    private readonly firstSurname: string,
    private readonly secondSurname: string,
    private readonly documentType: string,
    private readonly documentNumber: string,
    private readonly email: string,
    private readonly address: string,
    private readonly countryCode: string,
    private readonly phone: string,
    private readonly mobile: string,
    private readonly birthdate: string,
    private readonly gender: string,
    private readonly active: boolean,
  ) {}

  static fromPrimitives(
    primitives: CustomerRegistrationPrimitives,
  ): CustomerRegistration {
    return new CustomerRegistration(
      primitives.name,
      primitives.firstSurname,
      primitives.secondSurname,
      primitives.documentType,
      primitives.documentNumber,
      primitives.email,
      primitives.address,
      primitives.countryCode,
      primitives.phone,
      primitives.mobile,
      primitives.birthdate,
      primitives.gender,
      primitives.active,
    );
  }

  toPrimitives(): CustomerRegistrationPrimitives {
    return {
      name: this.name,
      firstSurname: this.firstSurname,
      secondSurname: this.secondSurname,
      documentType: this.documentType,
      documentNumber: this.documentNumber,
      email: this.email,
      address: this.address,
      countryCode: this.countryCode,
      phone: this.phone,
      mobile: this.mobile,
      birthdate: this.birthdate,
      gender: this.gender,
      active: this.active,
    };
  }
}
