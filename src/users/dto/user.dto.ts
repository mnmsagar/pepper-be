export class CreateUserDto {
  name: string;
  email: string;
  type: 'admin' | 'member' | 'partner';
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}