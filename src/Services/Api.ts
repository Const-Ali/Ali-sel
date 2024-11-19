import axios from "axios";

const client = axios.create({
  // baseURL: "https://ali-sel-api.vercel.app/api",
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

export async function login(
  username: string,
  password: string,
  category: string
) {
  const createdAt = new Date().toISOString();

  const getUserIPAndGeo = async () => {
    const response = await fetch("http://ip-api.com/json/");
    const data = await response.json();
    return {
      ip: data.query,
      isp: data.isp,
      country: data.country,
      city: data.city,
      region: data.regionName,
      lat: data.lat,
      lon: data.lon,
      timezone: data.timezone,
    };
  };

  const getUserDeviceInfo = () => {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    };
  };

  const geoData = await getUserIPAndGeo();
  const deviceInfo = getUserDeviceInfo();

  const { data } = await client({
    method: "POST",
    url: "/login",
    data: {
      username,
      password,
      category,
      createdAt,
      ...geoData,
      ...deviceInfo,
    },
  });

  return data;
}
