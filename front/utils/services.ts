import { ObjectId, Types } from "mongoose";
import { Categorie, Product, User } from "./types";

export const getAllProducts = async () => {
  const response = await fetch("localhost:8080/api/products", {
    method: "GET",
  });
  return await response.json();
};

export const getLatestProducts = async () => {
  const response = await fetch("http://localhost:8080/api/products", {
    method: "GET",
  });
  const products: Product[] = await response.json();
  return products.reverse()

};

export const getProductsByCategory = async (categorieName: string) => {
  const response = await fetch("http://localhost:8080/api/products", {
    method: "GET",
  });
  const products: Product[] = await response.json();
  return products.filter((product: Product) => product.category === categorieName)

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
};

export const getUserByEmail = async (email: string) => {
  const res = await fetch(`http://localhost:8080/api/users/email/${email}`);

  const userdata = await res.json();
  const user: User = userdata.user;
  return user;
};

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

interface tokenData {
  id: Types.ObjectId;
}

export const getIdFromToken = async (
  token: string
): Promise<Types.ObjectId> => {
  const response = await fetch(`http://localhost:8080/api/token/${token}`, {
    method: "GET",
  });

  const data: tokenData = await response.json();
  return data.id;
};

export const createNewProduct = async (product: Product) => {
  try {
    const response = await fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.name,
        priceInCents: product.priceInCents,
        category: product.category,
        description: product.description,
        owner: product.owner,
        img: product.img,
      }),
    });

    // Comprueba si la respuesta tiene estado exitoso (2xx)
    if (response.ok) {
      return response;
    }
  } catch (err) {
    return err;
  }
};
