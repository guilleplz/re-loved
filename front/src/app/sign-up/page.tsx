"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import SignUpFormIndicator from "./_components/SignUpFormIndicator";
import Link from "next/link";

type SingUpForm = {
  email: string;
  password: string;
  name: string;
  surname: string;
  username: string;
};

const SingUp = () => {
  const [formData, setFormData] = useState<SingUpForm>({
    email: "",
    password: "",
    name: "",
    surname: "",
    username: "",
  });
  const [step, setStep] = useState(0);

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault();
    return;
  };

  return (
    <div className={styles.background}>
      <section className={styles.section}>
        <h3>Crea una cuenta</h3>
        
        <p>Ya tienes una cuenta? <Link className={styles.link} href="/sign-in">Inicia sesión</Link></p>

        <div className={styles.indicator}>
          <SignUpFormIndicator step={step} />
        </div>

        <form className={styles.form} onSubmit={handlesubmit} action="">
          {step == 0 && (
            <input
              type="text"
              name="Email"
              id="Email"
              placeholder="Introduce tu email"
            />
          )}

          {step == 1 && (
            <>
              <input type="text" name="name" id="Name" placeholder="Nombre" />
              <input
                type="text"
                name="surname"
                id="Surname"
                placeholder="Apellido"
              />
              <input
                type="text"
                name="username"
                id="Username"
                placeholder="Nombre de usuario"
              />
            </>
          )}

          {(step == 0 || step == 1) && (
            <button className={styles.submit_button} onClick={handleNextStep}>
              {" "}
              Continuar{" "}
            </button>
          )}

          {step == 2 && (
            <>
              <input
                type="text"
                name="Password"
                id="Password"
                placeholder="Introduce tu contraseña"
              />

              <input
                type="text"
                name="confirmPassword"
                id="ConfirmPassword"
                placeholder="Confirma la contraseña"
              />
              <button className={styles.submit_button} type="submit">
                Registrarse
              </button>
            </>
          )}
        </form>
      </section>
    </div>
  );
};

export default SingUp;
