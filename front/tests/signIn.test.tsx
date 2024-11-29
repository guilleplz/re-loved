import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../src/app/sign-in/page';

// Mock de la función fetch
global.fetch = jest.fn();

// test para verificar que el formulario se renderice correctamente
describe('SignIn Component', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    (global.fetch as jest.Mock).mockClear();
    // Mock de localStorage
    Storage.prototype.setItem = jest.fn();
    fetchMock.resetMocks();
  });

  // TEST QUE VERIFICA QUE EL FORMULARIO SE RENDERICE CORRECTAMENTE
  test('renderiza el formulario correctamente', () => {
    render(<SignIn />);
    // Verificar que los campos del formulario estén presentes
    expect(screen.getByText(/Bienvenido de nuevo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Correo electrónico/i)).not.toBeNull();
    expect(screen.getByPlaceholderText(/Contraseña/i)).not.toBeNull();
    expect(screen.getByText(/Iniciar sesión/i)).not.toBeNull();
  });

  /** 
  // TEST QUE VERIFICA QUE SE ENVÍEN LOS DATOS CORRECTAMENTE AL BACKEND
  test('envía los datos correctamente al backend', async () => {
    // Configurar el mock de fetch para simular una respuesta exitosa
    const mockResponse = { token: 'mock-token' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<SignIn />);
    // Completar el formulario
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByLabelText(/Recuérdame/i));
    fireEvent.click(screen.getByText(/Iniciar sesión/i));
    // Esperar a que se envíen los datos
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/users/signin', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password',
        }),
      }));
    });

    // Verificar que el token se haya guardado en localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
  });
  */

  
  // TEST QUE VERIFICA QUE SE MUESTRE UN ERROR SI LA AUTENTICACIÓN FALLA
  test('muestra un error si la autenticación falla', async () => {
    // Configurar el mock de fetch para simular una respuesta con error
    const mockResponse = { message: 'Credenciales incorrectas' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockResponse,
    });
    render(<SignIn />);
    // Rellenar los campos
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: 'wrongpassword' },
    });
    // Enviar el formulario
    fireEvent.click(screen.getByText(/Iniciar sesión/i));
    // Esperar a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/Credenciales incorrectas/i)).not.toBeNull();
    });
  });

  // TEST QUE VERIFICA QUE SE MUESTRE UN ERROR SI HAY UN FALLO DE CONEXIÓN CON
  test('muestra un error si hay un fallo de conexión con el servidor', async () => {
    // Configurar el mock de fetch para simular un error de conexión
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));
    render(<SignIn />);
    // Rellenar los campos
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: 'password123' },
    });
    // Enviar el formulario
    fireEvent.click(screen.getByText(/Iniciar sesión/i));
    // Esperar a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/Error en la conexión al servidor/i)).not.toBeNull();
    });
  });
});