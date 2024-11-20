import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

interface SignInForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const { register, handleSubmit } = useForm<SignInForm>();
  const router = useRouter();

  const onSubmit = async (data: SignInForm) => {
    try {
      const response = await axios.post("/api/auth/signin", data);
      const { token } = response.data;

      // Guardar el token en localStorage
      localStorage.setItem("token", token);

      // Redirigir al dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales inválidas.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Bienvenido de nuevo</h1>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Introduce tu dirección email</label>
            <input type="email" {...register("email")} required />
          </div>
          <div className="input-group">
            <label>Introduce tu contraseña</label>
            <input type="password" {...register("password")} required />
          </div>
          <button type="submit" className="btn-default">Iniciar sesión</button>
          <p className="auth-footer">
            Don’t have an account? <a href="/auth/signup">Sign up now</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
