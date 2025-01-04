"use client";

import React, { useEffect, useState } from "react";
import { createNewProduct, getAllCategories, verifyToken } from "../../../../utils/services";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import styles from "./page.module.css";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Product } from "../../../../utils/types";
import mongoose from "mongoose";

const categories = await getAllCategories();

const Upload = () => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>();

  const router = useRouter();
  const userId = useUserStore((state) => state._id) as mongoose.Types.ObjectId
  const username = useUserStore((state) => state.username)
  const removeUser = useUserStore((state) => state.removeUser);

  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as CloudinaryUploadWidgetInfo;
    const { url } = info;
    setUrl(url);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { nombre, descripcion, precio, categoria } = event.currentTarget.elements as any;
    const data = new FormData();

    if (!nombre || !descripcion || !precio || !categoria || url == "") {
      setError("Deben rellenarse todos los campos y elegir una imagen")
      return
    }

    const newProduct: Product = {
      name: nombre.value,
      priceInCents: precio.value,
      category: categoria.value,
      description: descripcion.value,
      owner: userId,
      img: url
    }

    await createNewProduct(newProduct)

    router.push("/dashboard")
    return;
  };

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>Añadir un artículo</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.separador_con_boton}>
          <div className={styles.separador_columnas}>
            <h2 className={styles.title}>Información sobre el artículo</h2>
            <div className={styles.separador_preguntas}>
              <label htmlFor="Nombre">Nombre del artículo: </label>
              <input type="text" id="Nombre" name="nombre" />
            </div>
            <div className={styles.separador_preguntas}>
              <label htmlFor="Descripcion">Descripción: </label>
              <input type="text" id="Descripcion" name="descripcion" />
            </div>
            <div className={styles.separador_preguntas}>
              <label htmlFor="Precio">Precio (centimos): </label>
              <input type="number" id="Precio" name="precio" />
            </div>
            <div className={styles.separador_preguntas}>
              <label htmlFor="Categoria">Precio (€): </label>
              <select id="Categoria" name="categoria">
                {categories.map((categorie) => (
                  <option
                    key={categorie._id?.toString()}
                    value={categorie.category_name}
                  >
                    {categorie.category_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.separador_foto}>
            <h2 className={styles.title}>Imagen del artículo</h2>
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
              onSuccess={handleUpload}
            >
              {({ open }) => {
                return <button className={styles.submit_button} onClick={() => open()}>Upload an Image</button>;
              }}
            </CldUploadWidget>
          {url && (
            <img
              src={url}
              alt="imagen de preview"
              className={styles.preview_image}
            />
          )}
          </div>
        </div>

        <button type="submit" className={styles.submit_button}>submit</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Upload;
