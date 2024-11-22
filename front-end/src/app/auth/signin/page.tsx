// src/app/auth/signin/page.tsx
"use client"; // Marca este componente como un componente del lado del cliente

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para la carpeta "app", usa 'next/navigation'
import Link from 'next/link';
import styles from './signin.module.css'; // Asegúrate de que la importación sea correcta

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Iniciar sesión con:', { email, password });
    router.push('/dashboard'); // Redirige al dashboard tras iniciar sesión
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Bienvenido de nuevo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <div className={styles.options}>
            <a href="#" className={styles.forgotPassword}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button type="submit" className={styles.submitButton}>
            Iniciar sesión
          </button>
        </form>
        <hr className={styles.separator} />
        <div className={styles.signUp}>
          ¿No tienes cuenta? <Link href="/auth/signup">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;