"use client";

import { useState } from "react";
import styles from "./ProductCarrousell.module.css";
import ProductCard from "./ProductCard";
import { Product } from "../../../utils/product";
import DownArrow from "../../../public/icons/DownArrow";

interface ProductCarrousellProps {
  title?: string;
  products: Product[];
}

const ProductCarrousell = ({ title, products }: ProductCarrousellProps) => {
  const [index, setIndex] = useState(0);

  const imageSize = 305;

  const handleNext = () => {
    index == products.length ? setIndex(index) : setIndex(index + 1);
  };

  const handlePrev = () => {
    index == 0 ? setIndex(index) : setIndex(index - 1);
  };

  return (
    <section>
      <h3 className={styles.title}>{title}</h3>
      <div className={index == 0 ? styles.carrousell_start : styles.carrousell}>
        <button
          onClick={handlePrev}
          className={
            index <= 0 ? styles.left_button_hidden : styles.left_button
          }
        >
          <DownArrow />
        </button>
        <div
          className={styles.slide}
          style={{
            transform: `translateX(-${index * imageSize}px)`,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.nombre} product={product} />
          ))}
        </div>
        <button
          onClick={handleNext}
          className={
            index >= products.length - 5
              ? styles.right_button_hidden
              : styles.right_button
          }
        >
          <DownArrow />
        </button>
      </div>
    </section>
  );
};

export default ProductCarrousell;
