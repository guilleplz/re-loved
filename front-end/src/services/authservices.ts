/**
 * Servicio de autenticación 
 */


const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    // Simulación de una llamada a una API
    return new Promise<{ user: string; token: string }>((resolve) => {
      setTimeout(() => {
        resolve({ user: email, token: "fake-jwt-token" });
      }, 1000);
    });
  },
  register: async ({ email, password }: { email: string; password: string }) => {
    // Simulación de una llamada a una API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
};

export default authService;