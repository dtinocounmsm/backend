export class StringValueObject {
  constructor(public readonly value: string) {}

  getValue() {
    return this.value;
  }

  equals(valueObject: StringValueObject) {
    return this.value === valueObject.getValue();
  }
}
