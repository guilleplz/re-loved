// src/app/auth/signup/page.tsx
"use client"; // Marca este componente como un componente del lado del cliente

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para la carpeta "app", usa 'next/navigation'
import Link from 'next/link';
import styles from './signup.module.css'; // Asegúrate de que la importación sea correcta

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Registrarse con:', { email, password });
    // Aquí podrías enviar los datos a tu backend para registrar el usuario
    router.push('/dashboard'); // Redirige al dashboard tras registrarse
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <h2>Crea una cuenta</h2>
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
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Registrarse
          </button>
        </form>
        <div className={styles.separator}>
          <hr />
          <span>o</span>
          <hr />
        </div>
        <button className={styles.googleButton}>
          <img src="/google-icon.svg" alt="Google" width="20" />
          Registrarse con Google
        </button>
        <button className={styles.facebookButton}>
          <img src="/facebook-icon.webp" alt="Facebook" width="20" />
          Registrarse con Facebook
        </button>
        <div className={styles.signIn}>
          ¿Ya tienes una cuenta? <Link href="/auth/signin">Inicia sesión aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;