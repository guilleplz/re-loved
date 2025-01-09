"use client";

import React, { useEffect, useState } from "react";
import Heart from "../../../public/icons/Heart";
import styles from "./ProductCard.module.css";
import { Product, User } from "../../../utils/types";
import { useRouter } from "next/navigation";
import { checkLogged, useUserStore } from "@/store/user";
import { setLike } from "../../../utils/services";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const setUser = useUserStore((state) => state.setUser);
  const [reloadKey, setReloadKey] = useState(0);

  

  return (
    <div className={styles.container}>
      <a className={styles.product_card} href={`/products/${product._id}`}>
        <img
          src={product.img}
          className={styles.img}
          alt="imagen del producto"
        />
        <section className={styles.info_section}>
          <p className={styles.name}>{product.name}</p>
          <div className={styles.right_side}>
            <p className={styles.price}>{product.priceInCents / 100}€</p>
          </div>
        </section>
      </a>
    </div>
  );
};

export default ProductCard;
