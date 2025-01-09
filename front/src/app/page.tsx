"use client";

import Link from "next/link";
import styles from "./page.module.css";
import RightArrow from "../../public/icons/RightArrow";
import DownArrow from "../../public/icons/DownArrow";
import { useRouter } from "next/navigation";
import ProductCarrousell from "@/components/products/ProductCarrousell";
import { useEffect, useState } from "react";
import {
  getLatestProducts,
  getProductsByCategory,
  verifyToken,
} from "../../utils/services";
import { Product } from "../../utils/types";

export default function page() {
  const router = useRouter();
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [modaProducts, setModaProducts] = useState<Product[]>([]);
  const [cocheProducts, setCocheProducts] = useState<Product[]>([]);
  const [motosProducts, setMotosProducts] = useState<Product[]>([]);
  const [tecnologiaProducts, setTecnologiaProducts] = useState<Product[]>([]);
  const [deportesProducts, setDeportesProducts] = useState<Product[]>([]);
  const [ocioProducts, setOcioProducts] = useState<Product[]>([]);
  const [hogarProducts, setHogarProducts] = useState<Product[]>([]);

  useEffect(() => {
    const isLogged = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      const result = await verifyToken(token);

      if (result) router.push("/dashboard");
    };

    const getCategories = async () => {
      const latest = await getLatestProducts();
      const moda = await getProductsByCategory("Moda");
      const coche = await getProductsByCategory("Coches");
      const motos = await getProductsByCategory("Motos");
      const tecnologia = await getProductsByCategory("Tecnología");
      const deportes = await getProductsByCategory("Deportes");
      const ocio = await getProductsByCategory("Ocio");
      const hogar = await getProductsByCategory("Hogar");

      setLatestProducts(latest);
      setModaProducts(moda);
      setCocheProducts(coche);
      setMotosProducts(motos);
      setTecnologiaProducts(tecnologia);
      setDeportesProducts(deportes);
      setOcioProducts(ocio);
      setHogarProducts(hogar);
    };

    isLogged();
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
