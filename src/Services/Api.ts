import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8001",
});
// "به جای استفاده از یوز افکت از این فانکشن استفاده میکنیم"
export async function getProducts() {
  try {
    const { data } = await client("/products");
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProduct(id: string | number) {
  const { data } = await client(`/products/${id}`);
  return data;
}

export async function getUsers() {
  const { data } = await client("/users");
  return data;
}

export async function login(username: string, password: string) {
  const { data } = await client({
    method: "POST",
    url: "/login",
    data: {
      username,
      password,
    },
  });
  return data;
}
