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
import { Categorie } from "../../../utils/categorie";
import ConfigIcon from "../../../public/icons/ConfigIcon";

const categories: Categorie[] = await getAllCategories();

const NavBar = () => {
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
    router.push("/");
  };

  // estado para saber si el usuario está loggeado o no y cambiar el navbar
  const [isLogged, setIsLogged] = useState(false);

  // solo se ejecuta cuando se renderiza por primera vez
  useEffect(() => {
    const checkLogged = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      const result = await verifyToken(token);
      setIsLogged(result);
    };

    checkLogged();
  }, [pathname]);

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
        <form className={styles.form} action="/products">
          <input className={styles.input_text} type="text" name="name" />
          <button className={styles.input_button} type="submit">
            <SearchIcon color="#111111" />
          </button>
        </form>
        <div className={styles.log_buttons}>
          {isLogged ? (
            <>
              <Button type="normal" href="/dashboard">
                <HeartIcon />
              </Button>
              <Button type="yellow" href="/dashboard">
                Vender
              </Button>
              <button onClick={handleUserMenu} className={styles.user_button}>
                <img
                  src="users/default.webp"
                  alt="imagen del usuario"
                  className={styles.user_image}
                />
              </button>
              <section className={`${styles.user_menu} ${styles.menu_hidden}`}>
                <ul>
                  <li>Mi tienda</li>
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
