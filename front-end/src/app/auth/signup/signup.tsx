import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import "./styles/signup.module.css";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();
  const router = useRouter();

  const onSubmit = async (data: SignUpForm) => {
    try {
      await axios.post("/api/auth/signup", data);
      alert("Registro exitoso, ahora puedes iniciar sesión.");
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error al registrarse:", error);
      alert("Error al registrarse.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Crea tu cuenta</h1>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Introduce tu nombre completo</label>
            <input type="text" {...register("name")} required />
          </div>
          <div className="input-group">
            <label>Introduce tu dirección email</label>
            <input type="email" {...register("email")} required />
          </div>
          <div className="input-group">
            <label>Crea una contraseña</label>
            <input type="password" {...register("password")} required />
          </div>
          <button type="submit" className="btn-default">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
