"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { useParams } from 'next/navigation'
import { Product } from '../../../../utils/types'
import ProductCard from '@/components/products/ProductCard'
import { checkLogged } from '@/store/user'
import { getCategoryById, getProductsByCategory } from '../../../../utils/services'
import { error } from 'console'

const CategoryPage = () => {

  const params = useParams()
  const {id} = params

  const [products, setProducts] = useState<Product[]>([])
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    
    const getProducts = async () => {
      const category = await getCategoryById(id as string)
      if (category) {
        setCategoryName(category.category_name);
        const categoryProducts = await getProductsByCategory(category.category_name);
        if (categoryProducts) {
          setProducts(categoryProducts);
          return
        } else {
          console.log("error con productos")
          return
        }
      } else {
        console.log("error con categorías");
        return
      }
    }

    getProducts();
  }, [])

  return (
    <div>
      <h1 className={styles.title}>Productos de la categoría {categoryName}</h1>

      <div className={styles.products}>
        {

          products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id?.toString()} product={product}/>
            ))
          ) :
          <p className={styles.no_products}>No hay productos en esta categoría :(</p>
        }
      </div>
    </div>
  )
}

export default CategoryPage
