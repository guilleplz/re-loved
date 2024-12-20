import { Categorie } from "./categorie"
import { Product } from "./product"

export const getAllProducts = async () => {
  const response = await fetch('localhost:8080/api/products', {
    method: 'GET',
  })
  return await response.json()
}

export const getLatestProducts = async () => {
  const response = await fetch('localhost:8080/api/products', {
    method: 'GET'
  })
  const products: Product[] = await response.json()
}

export const getAllCategories = async () => {
  const res = await fetch('http://localhost:8080/api/categories', {
    method: 'GET'
  })
  const categories: Categorie[] = await res.json()
  console.log(categories)
  return categories;
} 



export const verifyToken = async (token: string): Promise<boolean> => {
  const response = await fetch('http://localhost:8080/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token }),
  })

  if (response.ok) return true;
  return false
}
