"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import { checkLogged, useUserStore } from '@/store/user'
import { Product, User } from '../../../../utils/types'
import { useRouter } from 'next/navigation'
import { getFavProductsByUserId, getProductsByUserId } from '../../../../utils/services'
import { Types } from 'mongoose'
import ProductCard from '@/components/products/ProductCard'

const LikedProductsPage = () => {

  const userName = useUserStore(state => state.username)

  const [products, setProducts] = useState<Product[]>([])
  const [user, setUser] = useState<User>();

  const router = useRouter();

  useEffect(() => {

    const check = async () => {
      const result = await checkLogged();
      if (!result) {
        router.push("/")
        return
      }
      setUser(result);
      return
    }
    check();
  }, [])

  useEffect(() => {
    const getProducts = async () => {
      if (user?._id) {
        const currentUserProducts = await getFavProductsByUserId(user?._id as Types.ObjectId)
        if (currentUserProducts) {
          setProducts(currentUserProducts);
        }
      } else {
        console.log("error");
      }
      return
    }
    getProducts();
  }, [user])

  return (
    <div>
      <h1 className={styles.title}>Productos favoritos de {userName}</h1>

      <div className={styles.products}>
        {

          products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id?.toString()} product={product}/>
            ))
          ) :
          <p className={styles.no_products}>Aún no se han añadido productos a favoritos :(</p>
        }
      </div>
    </div>
  )
}

export default LikedProductsPage
