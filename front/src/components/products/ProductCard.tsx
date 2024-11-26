import React from "react";
import Heart from "../../../public/icons/Heart";
import styles from "./ProductCard.module.css";
import { Product } from "../../../utils/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.product_card}>
      <img src={product.imagen} alt="imagen del producto" />
      <section className={styles.info_section}>
        <p className={styles.name}>{product.nombre}</p>
        <div className={styles.right_side}>
          <p className={styles.price}>{product.precio}€</p>
          <Heart />
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
