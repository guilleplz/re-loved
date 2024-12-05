export const getAllProducts = async () => {
  const response = await fetch('localhost:3000/api/products', {
    method: 'GET',
  })
  return await response.json()
}

export const getLatestProducts = async () => {
  const response = await fetch('localhost:3000/api/products', {
    method: 'GET'
  })
  const products = await response.json()
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