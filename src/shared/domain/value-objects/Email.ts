export class EmailValueObject {
  private readonly email: string;
  private static readonly emailRegex: RegExp =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(email: string) {
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email address');
    }

    this.email = email.toLowerCase();
  }

  private isValidEmail(email: string): boolean {
    return EmailValueObject.emailRegex.test(email);
  }

  public getValue(): string {
    return this.email;
  }

  public static create(email: string): EmailValueObject {
    return new EmailValueObject(email);
  }

  public equals(other: EmailValueObject): boolean {
    return this.email === other.getValue();
  }
}
