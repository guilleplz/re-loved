"use client";

import { useParams, useRouter } from "next/navigation";
import React, { MouseEvent, useEffect, useState } from "react";
import {
  getLatestProducts,
  getProductById,
  getProductsByCategory,
  getUserById,
  setLike,
} from "../../../../utils/services";
import { Product, User } from "../../../../utils/types";
import styles from "./page.module.css";
import BackButton from "@/components/BackButton";
import ProductCarrousell from "@/components/products/ProductCarrousell";
import HeartIcon from "../../../../public/icons/HeartIcon";
import Heart from "../../../../public/icons/Heart";
import { checkLogged, useUserStore } from "@/store/user";

const ProductDetail = () => {
  const [product, setProduct] = useState<Product>();
  const [otherProducts, setOtherProducts] = useState<Product[]>();
  const [useroftheProduct, setUserOfTheProduct] = useState<User>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [isLiked, setIsLiked] = useState<boolean>()
  const [reloadKey, setReloadKey] = useState(0);

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const check = async () => {
      const result = await checkLogged();
      if (result) {
        setCurrentUser(result);
      }
    };

    const getProduct = async () => {
      try {
        const product = await getProductById(id as string);
        const products = await getProductsByCategory(product.category);
        const user = await getUserById(product.owner.toString());
        setProduct(product);
        setOtherProducts(products);
        setUserOfTheProduct(user);
        if (user.favProducts?.find(favProduct => favProduct._id === product._id)) {
          setIsLiked(true)
        } else {
          setIsLiked(false)
        }
      } catch (error) {
        console.log("error fetching product ", error);
      }
    };

    check();
    getProduct();
  }, [reloadKey]);

  const params = useParams();

  const { id } = params;

  const handleLike = async (e: MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const updatedUser = await setLike(product as Product, currentUser as User);
    if (updatedUser) {
      setUser(updatedUser);
    } else {
      console.log("error con el usuario actualizado");
    }
    setReloadKey(reloadKey + 1);
  };

  return (
    <div className={styles.main}>
      <div className={styles.product_name}>
        <BackButton href="/dashboard" />

        {product && (
          <h2>
            {product.name} - {product.priceInCents / 100}€ -
          </h2>
        )}
        <div className={styles.like} onClick={handleLike}>
          {
            isLiked ? <Heart fill="red" color="red"/> : <Heart/>
          }
        </div>
      </div>

      <img
        src={product?.img}
        alt="imagen del producto"
        className={styles.img}
      />

      <div>
        <h3 className={styles.title}>Descripción</h3>
        <p>{product?.description}</p>
      </div>

      <div>
        <h3 className={styles.title}>Información del usuario:</h3>
        <ul className={styles.user_info}>
          <li>Usuario: {useroftheProduct?.username}</li>
          <li>Nombre: {useroftheProduct?.name}</li>
          <li>Apellido: {useroftheProduct?.surname}</li>
          <li>Email de contacto: {useroftheProduct?.email}</li>
        </ul>
      </div>

      <div>
        <h3>Otros productos que pueden interesarte de esta categoría... </h3>
        {otherProducts && <ProductCarrousell products={otherProducts} />}
      </div>
    </div>
  );
};

export default ProductDetail;
