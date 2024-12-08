export interface IProduct {
  createdAt: string;
  id: number | string;
  title: string;
  price: number;
  description: string;
  category: string;
  inventory: number;
  image: string;
  rating: IProductRating;
  // در آپدیت های بعدی اضافه خواهد شد
  // Categories: IProductCategories;
}

export interface IProductRating {
  rate: number;
  count: number;
}

// در آپدیت های بعدی اضافه خواهد شد
// export interface IProductCategories {
//   category: string;
//   Subcategory: string;
// }

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
  createdAt: string;
  imguser: URL;
  category: string | null;
  id: number;
  email: string;
  username: string;
  password: string;
  name: IName;
  phone: string;
  address: IAddress;
}

export interface IOrders {
  id: string;
  category: string;
  products: {
    id: number;
    qty: number;
    title: string;
    image: URL;
  }[];
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  address: {
    line: string;
    city: string;
    state: string;
    zipCode: string;
  };
  orderTime: string;
  items: IOrderItem[];
}

interface IOrderItem {
  productId: number;

  productName: string;
  quantity: number;
  price: number;
}
