// src/app/signin/page.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    // Por ejemplo, llamar a una API para autenticar al usuario
    // Si la autenticación es exitosa, redirigir al usuario a otra página
    console.log('Iniciar sesión con:', { email, password });
    router.push('/dashboard'); // Redirigir al dashboard después de iniciar sesión
  };

  return (
    <div className="container">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default SignIn;