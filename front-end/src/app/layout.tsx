import React from 'react';
import '../styles/globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Re-Loved',
  description: 'Bienvenido a Re-Loved',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header>
        <div className="logo">Re-Loved</div>
          <nav className="nav">
            <Link href="/" className="nav-button">Inicio</Link>
            <input type="text" placeholder="Buscar..." className="search-input" />
            <Link href="/auth/signin" className="nav-button">Iniciar sesión</Link>
            <Link href="/auth/signup" className="nav-button">Registrarse</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer> footer </footer>
      </body>
    </html>
  );
}
