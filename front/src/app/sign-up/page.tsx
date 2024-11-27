"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import SignUpFormIndicator from "./_components/SignUpFormIndicator";
import Link from "next/link";

type SignUpForm = {
  email: string;
  password: string;
  name: string;
  surname: string;
  username: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    email: "",
    password: "",
    name: "",
    surname: "",
    username: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null); // Definir setError

  // Función asincrónica para el manejo del submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Desestructuración del formData
    const { email, password, name, surname, username } = formData;
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, surname, username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // Redirigir al login o mostrar un mensaje de éxito
      } else {
        setError(data.message || "Error al registrarse");
      }
    } catch (err) {
      setError("Error en la conexión al servidor");
    }
  };

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  return (
    <div className={styles.background}>
      <section className={styles.section}>
        <h3>Crea una cuenta</h3>
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link className={styles.link} href="/sign-in">
            Inicia sesión
          </Link>
        </p>

        <div className={styles.indicator}>
          <SignUpFormIndicator step={step} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {step === 0 && (
            <input
              type="email"
              name="email"
              id="Email"
              placeholder="Introduce tu email"
              value={formData.email}
              onChange={handleChange}
            />
          )}

          {step === 1 && (
            <>
              <input
                type="text"
                name="name"
                id="Name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="surname"
                id="Surname"
                placeholder="Apellido"
                value={formData.surname}
                onChange={handleChange}
              />
              <input
                type="text"
                name="username"
                id="Username"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleChange}
              />
            </>
          )}

          {(step === 0 || step === 1) && (
            <button className={styles.submit_button} onClick={handleNextStep}>
              Continuar
            </button>
          )}

          {step === 2 && (
            <>
              <input
                type="password"
                name="password"
                id="Password"
                placeholder="Introduce tu contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                id="ConfirmPassword"
                placeholder="Confirma la contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button className={styles.submit_button} type="submit">
                Registrarse
              </button>
            </>
          )}
        </form>

        {error && <p className={styles.error}>{error}</p>}
      </section>
    </div>
  );
};

export default SignUp;
