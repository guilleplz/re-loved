"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  getLatestProducts,
  getProductById,
  getProductsByCategory,
  getUserById,
} from "../../../../utils/services";
import { Product, User } from "../../../../utils/types";
import styles from "./page.module.css";
import BackButton from "@/components/BackButton";
import ProductCarrousell from "@/components/products/ProductCarrousell";

const ProductDetail = () => {
  const [product, setProduct] = useState<Product>();
  const [otherProducts, setOtherProducts] = useState<Product[]>();
  const [useroftheProduct, setUserOfTheProduct] = useState<User>();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await getProductById(id as string);
        const products = await getProductsByCategory(product.category);
        const user = await  getUserById(product.owner.toString());
        setProduct(product);
        setOtherProducts(products);
        setUserOfTheProduct(user)
      } catch (error) {
        console.log("error fetching product ", error);
      }
    };

    getProduct();
  }, []);

  const router = useRouter();
  const params = useParams();

  const { id } = params;
  const exits: boolean = product ? true : false;

  return (
    <div className={styles.main}>
      <div className={styles.product_name}>
        <BackButton href="/dashboard" />

        {product && (
          <h2>
            {product.name} - {product.priceInCents / 100}€
          </h2>
        )}
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
