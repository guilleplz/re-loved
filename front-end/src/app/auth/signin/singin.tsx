import React from "react";
import styles from "./signin.module.css";

const SignIn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Bienvenido de nuevo</h2>
        <form>
          <input
            type="email"
            placeholder="Introduce tu dirección email"
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Introduce tu contraseña"
            className={styles.input}
          />
          <div className={styles.options}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>
          <button type="submit" className={styles.submitButton}>
            Iniciar sesión
          </button>
        </form>
        <hr className={styles.separator} />
        <button className={styles.googleButton}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google icon"
          />
          Or sign in with Google
        </button>
        <p className={styles.signUp}>
          Don't have an account? <a href="#">Sign up now</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
