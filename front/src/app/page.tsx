"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import RightArrow from "../../public/icons/RightArrow";
import DownArrow from "../../public/icons/DownArrow";
import { useRouter } from "next/navigation";
import ProductCarrousell from "@/components/products/ProductCarrousell";
import data from "../../public/products.json";
import { useEffect } from "react";
import { verifyToken } from "../../utils/services";

export default function page() {
  const router = useRouter();

  const productitems = JSON.parse(JSON.stringify(data.productos));

  useEffect(() => {
    const isLogged = async () => {
      console.log("logueando");
      const token = localStorage.getItem("token");

      if (!token) return;

      const result = await verifyToken(token);

      if (result) router.push("/dashboard");
    };

    isLogged();
  }, []);

  return (
    <>
      <section className={styles.hero_section}>
        <img
          src="images/hero-image.webp"
          alt="Imagen de camisas de fondo"
          className={styles.hero_image}
        />
        <div className={styles.hero}>
          <h1>Re-Loved</h1>
          <h2>Haz espacio en casa y saca provecho de lo que no utilizas</h2>
          <Link className={styles.button} href={"/sign-up"}>
            ¡Vende ahora! <RightArrow color="#1e2b44" />{" "}
          </Link>
        </div>
      </section>

      <div className={styles.down_arrow}>
        <DownArrow />
      </div>

      {/* Sección de categorías y productos */}

      <section className={styles.products_section}>
        <ProductCarrousell title="Novedades" products={productitems} />
        <ProductCarrousell title="Moda" products={productitems} />
        <ProductCarrousell title="Tecnologías" products={productitems} />
        <ProductCarrousell title="Hogar" products={productitems} />
      </section>
    </>
  );
}
