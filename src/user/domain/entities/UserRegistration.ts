import {
  DEFAULT_USER_PROFILE_ID,
  DEFAULT_USER_STATUS,
} from '@shared/domain/constants/user';
import { EmailValueObject } from '@shared/domain/value-objects/Email';
import { Gender, GenderValueObject } from '@shared/domain/value-objects/Gender';

export type UserRegistrationPrimitives = {
  name: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
  password: string;
  address: string;
  countryCode: string;
  phone: string;
  birthdate: string;
  gender: string;
  profileId: number;
  active: boolean;
};

export class UserRegistration {
  constructor(
    public readonly name: string,
    public readonly firstSurname: string,
    public readonly secondSurname: string,
    public readonly email: EmailValueObject,
    public readonly password: string,
    public readonly address: string,
    public readonly countryCode: string,
    public readonly phone: string,
    public readonly birthdate: string,
    public readonly gender: GenderValueObject,
    public readonly profileId: number,
    public readonly active: boolean,
  ) {}

  static fromPrimitives(
    primitives: Omit<UserRegistrationPrimitives, 'profileId' | 'active'>,
  ): UserRegistration {
    return new UserRegistration(
      primitives.name,
      primitives.firstSurname,
      primitives.secondSurname,
      EmailValueObject.create(primitives.email),
      primitives.password,
      primitives.address,
      primitives.countryCode,
      primitives.phone,
      primitives.birthdate,
      GenderValueObject.create(primitives.gender as Gender),
      DEFAULT_USER_PROFILE_ID,
      DEFAULT_USER_STATUS,
    );
  }

  static toPrimitives(user: UserRegistration): UserRegistrationPrimitives {
    return {
      name: user.name,
      firstSurname: user.firstSurname,
      secondSurname: user.secondSurname,
      email: user.email.getValue(),
      password: user.password,
      address: user.address,
      countryCode: user.countryCode,
      phone: user.phone,
      birthdate: user.birthdate,
      gender: user.gender.getValue(),
      profileId: user.profileId,
      active: user.active,
    };
  }
}
