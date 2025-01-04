"use client";
import Link from "next/link";
import styles from "./page.module.css";
import RightArrow from "../../../public/icons/RightArrow";
import DownArrow from "../../../public/icons/DownArrow";
import ProductCarrousell from "@/components/products/ProductCarrousell";
import data from "../../../public/products.json";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import { getLatestProducts, getProductsByCategory, verifyToken } from "../../../utils/services";
import { useRouter } from "next/navigation";

const latestproducts = await getLatestProducts()
const modaProducts = await getProductsByCategory("Moda")
const cocheProducts = await getProductsByCategory("Coches")
const motosProducts = await getProductsByCategory("Motos")
const tecnologiaProducts = await getProductsByCategory("Tecnología")
const deportesProducts = await getProductsByCategory("Deportes")
const ocioProducts = await getProductsByCategory("Ocio")
const hogarProducts = await getProductsByCategory("Hogar")

export default function Dashboard() {


  const router = useRouter();

  const userName = useUserStore((state) => state.username);
  const removeUser = useUserStore((state) => state.removeUser);

  useEffect(() => {
    const checkLogged = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        removeUser();
        router.push("/");
        return;
      }

      const result = await verifyToken(token);
      if (!result) {
        removeUser();
        router.push("/");
      }
    };

    checkLogged();
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
          <img src="users/default.webp" alt="Imagen del usuario" />
          <div className={styles.hero_text}>
            <h1>Re-Loved</h1>
            <h2>¡Bienvenido {userName}!</h2>
            <Link className={styles.button} href={"/dashboard/upload"}>
              ¡Vende ahora! <RightArrow color="#1e2b44" />{" "}
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.down_arrow}>
        <DownArrow />
      </div>

      {/* Sección de categorías y productos */}

      <section className={styles.products_section}>
        <ProductCarrousell title="Novedades" products={latestproducts} />
        <ProductCarrousell title="Moda" products={modaProducts} />
        <ProductCarrousell title="Tecnologías" products={tecnologiaProducts} />
        <ProductCarrousell title="Hogar" products={hogarProducts} />
        <ProductCarrousell title="Ocio" products={ocioProducts} />

      </section>
    </>
  );
}
