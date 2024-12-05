"use client";

import React, { ButtonHTMLAttributes } from "react";
import styles from "./navbar.module.css";
import Button from "./Button";
import LogoWithLetters from "../../../../public/icons/LogoWithLetters";
import SearchIcon from "../../../../public/icons/SearchIcon";
import HamburguerIcon from "../../../../public/icons/HamburguerIcon";
import HeartIcon from "../../../../public/icons/HeartIcon";
import Link from "next/link";

const NavBar = () => {
  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = e.currentTarget.nextElementSibling as HTMLElement;
    if (element) {
      element.classList.toggle(styles.dropdown_hidden)
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <button onClick={handleMenu} className={styles.hamburguer_menu}>
          <div className={styles.hamburguer}>
            <HamburguerIcon color="#ffff" />
          </div>
        </button>
          <div className={`${styles.dropdown} ${styles.dropdown_hidden}`}>
            <ul>
              <li>Categoria</li>
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
        <Button type="normal" href="/dashboard">
            <HeartIcon/>
          </Button>
          <Button type="yellow" href="/dashboard">
            Vender
          </Button>
          {/* Icono de usuario */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
