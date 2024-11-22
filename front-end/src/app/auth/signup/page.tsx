"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import styles from './signup.module.css'; 

/**
 * Componente para el registro de usuarios
 * Contiene un formulario para registrar un nuevo usuario
 * los campos son nombre, apellido, correo electrónico, teléfono, contraseña
 * y confirmación de contraseña. Si el usuario ya tiene cuenta, puede
 * redirigirse a la página de inicio de sesión.
 * @returns Registro de usuario
 */
const SignUp = () => {
  /**
   * Estado para los datos del formulario
   * Contiene los campos: nombre, apellido, correo electrónico, teléfono,
   * contraseña y confirmación de contraseña.
   */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter(); // Instancia para redirección

  /**
   * Maneja el cambio en los campos del formulario
   * Lo que ahce es actualizar el estado con los valores ingresados
   * @param e Evento del campo de texto
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Envía el formulario de registro
   * Redirige al dashboard si el registro es exitoso
   * @param e Evento del formulario
   * @returns redirección al dashboard
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Verifica si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      // poner datos 
      console.log('Datos enviados:', formData);
      // Simula un registro exitoso y redirige
      router.push('/dashboard'); // Cambia la ruta según tu proyecto
    } catch (error) {
      console.error('Error durante el registro:', error);
      alert('Hubo un problema al registrarte. Intenta nuevamente.');
    }
  };
  // retorna el componente
  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <h2>Crea una cuenta</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Registrarse
          </button>
        </form>
        <hr className={styles.separator} />
        <div className={styles.signIn}>
          ¿Ya tienes una cuenta? <Link href="/auth/signin">Inicia sesión aquí</Link>
        </div>
      </div>
    </div>
  );
};

// Exporta el componente
export default SignUp;
