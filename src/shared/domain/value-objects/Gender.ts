export type Gender = 'M' | 'F' | 'U' | undefined;

export class GenderValueObject {
  private value: Gender;

  private constructor(value: Gender) {
    this.value = value;
  }

  static create(value: Gender): GenderValueObject {
    if (value === undefined) {
      return new GenderValueObject('U');
    }

    if (value === 'M' || value === 'F') {
      return new GenderValueObject(value);
    }

    throw new Error(
      "Invalid gender value. Allowed values are 'M', 'F', or undefined.",
    );
  }

  getValue(): Gender {
    return this.value;
  }

  isMale(): boolean {
    return this.value === 'M';
  }

  isFemale(): boolean {
    return this.value === 'F';
  }

  isUndefined(): boolean {
    return this.value === 'U';
  }

  toString(): string {
    return this.value;
  }
}
