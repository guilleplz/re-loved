"use client";
import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  getProductById,
  updateProduct,
} from "../../../../../utils/services";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import styles from "./page.module.css";
import { Product } from "../../../../../utils/types";
import { useParams, useRouter } from "next/navigation";
import { checkLogged, useUserStore } from "@/store/user";
import { Types } from "mongoose";

const categories = await getAllCategories();

const EditProduct = () => {
  const [url, setUrl] = useState<string>("");
  const [product, setProduct] = useState<Product>();
  const [formdata, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    categoria: "",
  });

  const removeUser = useUserStore((state) => state.removeUser);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const getProduct = async () => {
      const currentproduct = await getProductById(id as string);
      if (currentproduct) {
        setProduct(currentproduct);
        setFormData({
          nombre: currentproduct.name,
          descripcion: currentproduct.description,
          precio: currentproduct.priceInCents,
          categoria: currentproduct.category,
        });
        setUrl(currentproduct?.img as string);
      } else {
        console.log("producto no encontrado");
        router.push("/dashboard");
      }
    };
    const check = async () => {
      const result = await checkLogged();
      if (!result) {
        removeUser();
        router.push("/");
      }
    };

    check();
    getProduct();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { nombre, descripcion, precio, categoria } = event.currentTarget
      .elements as any;
    const data = new FormData();

    const newProduct: Product = {
      _id: product?._id,
      name: nombre.value,
      priceInCents: precio.value,
      category: categoria.value,
      description: descripcion.value,
      owner: product?.owner as Types.ObjectId,
      img: url,
    };

    const updatedProduct = await updateProduct(newProduct);

    if (updatedProduct) {
      router.push("/dashboard/store");
      return;
    } else {
      console.log("error");
      return;
    }
  };

  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as CloudinaryUploadWidgetInfo;
    const { url } = info;
    setUrl(url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>Editar un artículo</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.separador_con_boton}>
          <div className={styles.separador_columnas}>
            <h2 className={styles.title}>Información sobre el artículo</h2>
            <div className={styles.separador_preguntas}>
              <label htmlFor="Nombre">Nombre del artículo: </label>
              <input
                type="text"
                id="Nombre"
                name="nombre"
                value={formdata.nombre}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>
            <div className={styles.separador_preguntas}>
              <label htmlFor="Descripcion">Descripción: </label>
              <input
                type="text"
                id="Descripcion"
                name="descripcion"
                value={formdata.descripcion}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>
            <div className={styles.separador_preguntas}>
              <label htmlFor="Precio">Precio (centimos): </label>
              <input
                type="number"
                id="Precio"
                name="precio"
                value={formdata.precio}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>
            <div className={styles.separador_preguntas}>
              <label htmlFor="Categoria">Precio (€): </label>
              <select
                id="Categoria"
                value={formdata.categoria}
                onChange={handleSelectChange}
                name="categoria"
              >
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
                return (
                  <button
                    className={styles.upload_button}
                    onClick={() => open()}
                  >
                    Upload an Image
                  </button>
                );
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

        <button type="submit" className={styles.submit_button}>
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
