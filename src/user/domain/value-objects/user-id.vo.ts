export class UserIdValueObject {
  private readonly id: number;
  constructor(readonly userId: number) {
    this.validate(userId);
    this.id = userId;
  }

  private validate(id: number) {
    if (typeof id !== 'number') {
      throw new Error('<id> = ' + id + ' must be a valid number');
    }
    if (id <= 0) {
      throw new Error('<id> = ' + id + ' must be greater than 0');
    }
  }

  public getValue(): number {
    return this.id;
  }
}
