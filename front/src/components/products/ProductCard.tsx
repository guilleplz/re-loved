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

  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const result = await checkLogged();
      if (result) {
        setCurrentUser(result);
        const finded = result.favProducts?.find(
          (favProduct) => favProduct._id.toString() === product._id?.toString()
        );

        if (finded) setIsLiked(true);
        else setIsLiked(false);
      }
    };

    check();
  }, [reloadKey]);

  const handleSetLike = async (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    if (!currentUser?.favProducts) {
      router.push("/sign-in");
      return;
    }
    const updatedUser = await setLike(product as Product, currentUser as User);
    if (updatedUser) {
      setUser(updatedUser);
    } else {
      console.log("error con el usuario actualizado");
    }
    setReloadKey(reloadKey + 1);
  };

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
      <div className={styles.heart} onClick={handleSetLike}>
        {isLiked ? <Heart fill="red" color="red" /> : <Heart />}
      </div>
    </div>
  );
};

export default ProductCard;
