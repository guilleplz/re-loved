import React from "react";
import styles from "./UserProductCard.module.css";
import { Product } from "../../../utils/types";
import EditIcon from "../../../public/icons/EditIcon";
import TrashIcon from "../../../public/icons/TrashIcon";
import { deleteProduct } from "../../../utils/services";

interface UserProductCardProps {
  product: Product;
}

const UserProductCard = ({ product }: UserProductCardProps) => {


  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

  }

  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await deleteProduct(product);
    } catch (err) {
      console.log(err)
    }
    window.location.reload()
  }

  

  return (
    <section className={styles.product}>
      <div className={styles.product_card}>
        <img
          src={product.img}
          className={styles.img}
          alt="imagen del producto"
        />
        <section className={styles.info_section}>
          <p className={styles.name}>{product.name}</p>
          <div className={styles.right_side}>
            <p className={styles.price}>{product.priceInCents / 100}€</p>
          </div>
        </section>
      </div>

      <a className={styles.edit} href={`/products/edit/${product._id}`}><EditIcon width={20} heigth={20}/></a>
      <button className={styles.remove} onClick={handleRemove}><TrashIcon width={20} heigth={20}/></button>
    </section>
  );
};

export default UserProductCard;
