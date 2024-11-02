export interface IProduct {
  createdAt: Date;
  id: number | string;
  title: string;
  price: number;
  description: string;
  category: string;
  inventory: number;
  image: string;
  rating: IProductRating;
}

export interface IProductRating {
  rate: number;
  count: number;
}

export interface IAddress {
  geolocation: {
    lat: string;
    long: string;
  };
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface IName {
  firstname: string;
  lastname: string;
}

export interface IUser {
  createdAt: Date;
  category: string | null;
  id: number;
  email: string;
  username: string;
  password: string;
  name: IName;
  phone: string;
  address: IAddress;
  __v: number;
}
