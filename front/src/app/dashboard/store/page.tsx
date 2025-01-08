"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import BackButton from "@/components/BackButton";
import { Product, User } from "../../../../utils/types";
import { checkLogged, useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { getProductsByUserId } from "../../../../utils/services";
import UserProductCard from "@/components/products/UserProductCard";
import ConfigIcon from "../../../../public/icons/ConfigIcon";

const Store = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setCurrentUser] = useState<User>();

  useEffect(() => {
    const check = async () => {
      const result = await checkLogged();
      if (!result) {
        router.push("/");
      } else {
        setCurrentUser(result);
      }
    };
    check();
  }, []);

  useEffect(() => {
    const setProductsOfUser = async () => {
      if (user?._id) {
        const productsOfUser = await getProductsByUserId(user?._id);
        setProducts(productsOfUser);
      } else {
        console.log("no logueado");
      }
    };
    setProductsOfUser();
  }, [user]);

  return (
    <div className={styles.main}>
      <aside className={styles.aside}>
        <div>
          <img src="/users/default.webp" />
          <h2>Tu tienda</h2>
        </div>
        <a href="/dashboard/upload" className={styles.shop_button_add}>
          + Añadir artículo
        </a>
        <a href="/dashboard/config" className={styles.shop_button_conf}>
          {" "}
          <ConfigIcon />
          Configuración
        </a>
      </aside>
      <div className={styles.articulos}>
        <div className={styles.titulo}>
          <BackButton href="/dashboard" />
          <h2>Tus artículos</h2>
        </div>
        <div
          className={
            products.length > 5 ? styles.product_grid : styles.product_flex
          }
        >
          {products.map((product) => (
            <UserProductCard key={product._id?.toString()} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
