import React from "react";
import Heart from "../../../public/icons/Heart";
import styles from "./ProductCard.module.css";
import { Product } from "../../../utils/types";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <a className={styles.product_card} href={`/products/${product._id}`}>
      <img src={product.img} className={styles.img} alt="imagen del producto" />
      <section className={styles.info_section}>
        <p className={styles.name}>{product.name}</p>
        <div className={styles.right_side}>
          <p className={styles.price}>{product.priceInCents / 100}€</p>
          <div className={styles.heart}>
            <Heart />
          </div>
        </div>
      </section>
    </a>
  );
};

export default ProductCard;
