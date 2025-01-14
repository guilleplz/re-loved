"use client";

import React, { ButtonHTMLAttributes, useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Button from "./Button";
import LogoWithLetters from "../../../public/icons/LogoWithLetters";
import SearchIcon from "../../../public/icons/SearchIcon";
import HamburguerIcon from "../../../public/icons/HamburguerIcon";
import Link from "next/link";
import { getAllCategories, verifyToken } from "../../../utils/services";
import HeartIcon from "../../../public/icons/HeartIcon";
import { useRouter, usePathname } from "next/navigation";
import { Categorie, User } from "../../../utils/types";
import ConfigIcon from "../../../public/icons/ConfigIcon";
import { checkLogged, useUserStore } from "@/store/user";

const categories: Categorie[] = await getAllCategories();

const NavBar = () => {
  const removeUser = useUserStore((state) => state.removeUser);
  const setUser = useUserStore((state) => state.setUser);
  const userId = useUserStore((state) => state._id);
  const router = useRouter();
  const pathname = usePathname();

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = e.currentTarget.nextElementSibling as HTMLElement;
    if (element) {
      element.classList.toggle(styles.menu_hidden);
    }
  };

  const handleUserMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = e.currentTarget.nextElementSibling as HTMLElement;
    if (element) {
      element.classList.toggle(styles.menu_hidden);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    removeUser();
    router.push("/");
  };

  // estado para saber si el usuario está loggeado o no y cambiar el navbar
  const [isLogged, setIsLogged] = useState(false);
  // solo se ejecuta cuando se renderiza por primera vez
  useEffect(() => {
    const check = async () => {
      const result = await checkLogged();
      if (!result) {
        removeUser();
        setIsLogged(false);
      } else {
        setIsLogged(true);
        setUser(result);
      }
    };

    check();
  }, [pathname]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { buscar } = event.currentTarget.elements as any;
    if (buscar.value) {
      router.replace(`/products/search/${buscar.value}`)
    }
    return
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <button onClick={handleMenu} className={styles.hamburguer_menu}>
          <div className={styles.hamburguer}>
            <HamburguerIcon color="#ffff" />
          </div>
        </button>
        <div className={`${styles.dropdown} ${styles.menu_hidden}`}>
          <h2 className={styles.dropdown_h2}>Categorías</h2>
          <ul>
            {categories.map((categorie, index) => (
              <li key={`${categorie.category_name}-${index}`}>
                <Link href={`/categories/${categorie._id}`}>
                  <ConfigIcon />
                  {categorie.category_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/">
          <LogoWithLetters color="#ffff" />
        </Link>
      </div>

      <div className={styles.form_side}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input_text}
            type="text"
            placeholder="Busca aquí lo que quieras"
            autoComplete="off"
            name="buscar"
            id="buscar"
          />
          <button className={styles.input_button} type="submit">
            <SearchIcon color="#111111" />
          </button>
        </form>
        <div className={styles.log_buttons}>
          {isLogged ? (
            <>
              <Button type="normal" href="/dashboard/liked">
                <HeartIcon />
              </Button>
              <Button type="yellow" href="/dashboard/upload">
                Vender
              </Button>
              <button onClick={handleUserMenu} className={styles.user_button}>
                <img
                  src="/users/default.webp"
                  alt="imagen del usuario"
                  className={styles.user_image}
                />
              </button>
              <section className={`${styles.user_menu} ${styles.menu_hidden}`}>
                <ul>
                  <li>
                    <Link href={"/dashboard/store"}>Mi tienda</Link>
                  </li>
                  <li>
                    <button
                      className={styles.close_session_button}
                      onClick={handleLogOut}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </section>
            </>
          ) : (
            <>
              <Button type="normal" href="/sign-in">
                Iniciar Sesión
              </Button>
              <Button type="yellow" href="/sign-up">
                Registrarse
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
