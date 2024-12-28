import { Categorie, Product, User } from "./types";

export const getAllProducts = async () => {
  const response = await fetch("localhost:8080/api/products", {
    method: "GET",
  });
  return await response.json();
};

export const getLatestProducts = async () => {
  const response = await fetch("localhost:8080/api/products", {
    method: "GET",
  });
  const products: Product[] = await response.json();
};

export const getAllCategories = async () => {
  const res = await fetch("http://localhost:8080/api/categories", {
    method: "GET",
  });
  const categories: Categorie[] = await res.json();
  return categories;
};

export const getUserById = async (id: string) => {
  const res = await fetch(`http://localhost:8080/api/users/${id}`, {
    method: "GET",
  });

  const user: User = await res.json();
  return user;
} 

export const getUserByEmail = async (email: string) => {
  const res = await fetch(`http://localhost:8080/api/users/email/${email}`)

  const userdata = await res.json();
  const user: User = userdata.user
  return user;
}

export const verifyToken = async (token: string): Promise<boolean> => {
  const response = await fetch("http://localhost:8080/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (response.ok) return true;
  return false;
};
