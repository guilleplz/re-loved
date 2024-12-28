"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation"; 
import { getUserByEmail } from "../../../utils/services";
import { useUserStore } from "@/store/user";

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

const SignIn = () => {
  const setUser = useUserStore(state => state.setUser);


  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, remember } = e.currentTarget.elements as any;
    setFormData({
      email: email.value,
      password: password.value,
      remember: remember.checked,
    });

    // Lógica con el backend
    try {
      const response = await fetch("http://localhost:8080/api/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        
        const user = await getUserByEmail(email.value);

        console.log(user)

        setUser(user)

        // Guardar el token en localStorage o manejar sesión
        localStorage.setItem("token", data.token);
        router.push("/dashboard")
        
        // Redirigir o hacer cualquier acción después de iniciar sesión
      } else {
        setError(data.message || "Error en el inicio de sesión");
      }
    } catch (err) {
      setError("Error en la conexión al servidor");
    }
  };

  return (
    <div className={styles.background}>
      <section className={styles.section}>
        <h3>Bienvenido de nuevo</h3>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" name="email" id="Email" placeholder="Introduce tu email" />
          <input
            type="password"
            name="password"
            id="Password"
            placeholder="Introduce tu contraseña"
          />
          <div className={styles.remember}>
            <input type="checkbox" name="remember" id="Remember" />
            <label htmlFor="Remember">remember me</label>
          </div>

          <button className={styles.submit_button} type="submit">
            Iniciar sesión
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignIn;
