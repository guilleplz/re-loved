"use client";
import Link from "next/link";
import styles from "./page.module.css";
import RightArrow from "../../../public/icons/RightArrow";
import DownArrow from "../../../public/icons/DownArrow";
import ProductCarrousell from "@/components/products/ProductCarrousell";
import data from "../../../public/products.json";
import { useUserStore } from "@/store/user";
import { useEffect, useState } from "react";
import {
  getLatestProducts,
  getProductsByCategory,
  verifyToken,
} from "../../../utils/services";
import { useRouter } from "next/navigation";
import { Product } from "../../../utils/types";

export default function Dashboard() {
  const router = useRouter();

  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [modaProducts, setModaProducts] = useState<Product[]>([]);
  const [cocheProducts, setCocheProducts] = useState<Product[]>([]);
  const [motosProducts, setMotosProducts] = useState<Product[]>([]);
  const [tecnologiaProducts, setTecnologiaProducts] = useState<Product[]>([]);
  const [deportesProducts, setDeportesProducts] = useState<Product[]>([]);
  const [ocioProducts, setOcioProducts] = useState<Product[]>([]);
  const [hogarProducts, setHogarProducts] = useState<Product[]>([]);

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

    const getCategories = async () => {
      const latest = await getLatestProducts()
      const moda = await getProductsByCategory("Moda")
      const coche = await getProductsByCategory("Coches")
      const motos = await getProductsByCategory("Motos")
      const tecnologia = await getProductsByCategory("Tecnología")
      const deportes = await getProductsByCategory("Deportes")
      const ocio = await getProductsByCategory("Ocio")
      const hogar = await getProductsByCategory("Hogar")

      setLatestProducts(latest)
      setModaProducts(moda)
      setCocheProducts(coche)
      setMotosProducts(motos)
      setTecnologiaProducts(tecnologia)
      setDeportesProducts(deportes)
      setOcioProducts(ocio)
      setHogarProducts(hogar)
    }

    checkLogged();
    getCategories();
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
        <ProductCarrousell title="Novedades" products={latestProducts} />
        <ProductCarrousell title="Moda" products={modaProducts} />
        <ProductCarrousell title="Coches" products={cocheProducts} />
        <ProductCarrousell title="Motos" products={motosProducts} />
        <ProductCarrousell title="Tecnologías" products={tecnologiaProducts} />
        <ProductCarrousell title="Deportes" products={deportesProducts} />
        <ProductCarrousell title="Hogar" products={hogarProducts} />
        <ProductCarrousell title="Ocio" products={ocioProducts} />
      </section>
    </>
  );
}
