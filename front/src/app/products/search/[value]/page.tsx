"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { Product } from "../../../../../utils/types";
import ProductCard from "@/components/products/ProductCard";
import { getAllProducts } from "../../../../../utils/services";

const SearchPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const params = useParams();
  const { value } = params;

  useEffect(() => {
    const getProducts = async () => {
      const searchedProducts = await getAllProducts();
      if (searchedProducts) {
        setProducts(
          searchedProducts?.filter((product) => product.name.toLocaleLowerCase().includes(value?.toString().toLowerCase() as string))
        );
      } else {
        console.log("error");
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>
        Productos encontrados con la busqueda: {value}
      </h1>

      <div className={styles.products}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id?.toString()} product={product} />
          ))
        ) : (
          <p className={styles.no_products}>
            No se han encontrado productos para esta búsqueda :(
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
