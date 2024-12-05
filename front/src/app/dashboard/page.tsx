import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import RightArrow from "../../../public/icons/RightArrow";
import DownArrow from "../../../public/icons/DownArrow";
import ProductCarrousell from "@/components/products/ProductCarrousell";
import data from "../../../public/products.json";

export default function Dashboard() {
  const productitems = JSON.parse(JSON.stringify(data.productos));

  return (
    <>
      <section className={styles.hero_section}>
        <img
          src="images/hero-image.webp"
          alt="Imagen de camisas de fondo"
          className={styles.hero_image}
        />
        <div className={styles.hero}>
          <img src="images/camisa_verde.png" alt="" />
          <div className={styles.hero_text}>
            <h1>Re-Loved</h1>
            <h2>¡Bienvenido User!</h2>
            <Link className={styles.button} href={"/"}>
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
        <ProductCarrousell title="Novedades" products={productitems} />
        <ProductCarrousell title="Moda" products={productitems} />
        <ProductCarrousell title="Tecnologías" products={productitems} />
        <ProductCarrousell title="Hogar" products={productitems} />
      </section>
    </>
  );
}
