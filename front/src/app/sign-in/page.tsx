"use client"

import React, { useState } from "react";
import styles from "./page.module.css";

type LoginForm = {
  email: string,
  password: string,
  remember: boolean
}

const signIn = () => {

  const [formData, setFormData] = useState<LoginForm>({email: "", password: "", remember: false})
  const [error, setError] = useState<string | null>(null);

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {Email, Password, Remember} = e.currentTarget;
    setFormData({email: Email, password: Password, remember: Remember})
    
    // lógica con el back

    
    return
  }


  return (
    <div className={styles.background}>
      <section className={styles.section}>
        <h3>Bienvenido de nuevo</h3>

        <form className={styles.form} onSubmit={handlesubmit} action="">
        
        <input type="text" name="Email" id="Email" placeholder="Introduce tu email" />
          <input
            type="text"
            name="Password"
            id="Password"
            placeholder="Introduce tu contraseña"
          />
          <div className={styles.remember}>
            <input type="checkbox" name="remember" id="Remember"/> <label htmlFor="Remember">remember me</label>
          </div>


          <button className={styles.submit_button} type="submit">Iniciar sesión</button>
        </form>
      </section>
    </div>
  );
};

export default signIn;
