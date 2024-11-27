import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../src/app/sign-up/page';
import '@testing-library/jest-dom/extend-expect';

// Mock de la función fetch
global.fetch = jest.fn();

describe('SignUp Component', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    (global.fetch as jest.Mock).mockClear();
  });

  test('renderiza el formulario correctamente', () => {
    render(<SignUp />);

    // Verificar que los campos del formulario estén presentes
    expect(screen.getByText(/Crea una cuenta/i)).not.toBeNull();
    expect(screen.getByPlaceholderText(/Introduce tu email/i)).not.toBeNull();
  });

  test('avanza al siguiente paso del formulario', () => {
    render(<SignUp />);

    // Completar el primer paso del formulario
    fireEvent.change(screen.getByPlaceholderText(/Introduce tu email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Continuar/i));

    // Verificar que los campos del segundo paso estén presentes
    expect(screen.getByPlaceholderText(/Nombre/i)).not.toBeNull();
    expect(screen.getByPlaceholderText(/Apellido/i)).not.toBeNull();
    expect(screen.getByPlaceholderText(/Nombre de usuario/i)).not.toBeNull();
  });

  test('envía los datos correctamente al backend', async () => {
    // Configurar el mock de fetch para simular una respuesta exitosa
    const mockResponse = { message: 'Usuario registrado exitosamente' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<SignUp />);

    // Completar el formulario
    fireEvent.change(screen.getByPlaceholderText(/Introduce tu email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Continuar/i));
    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Apellido/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Nombre de usuario/i), { target: { value: 'johndoe' } });
    fireEvent.click(screen.getByText(/Continuar/i));
    fireEvent.change(screen.getByPlaceholderText(/Introduce tu contraseña/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirma la contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/Registrarse/i));

    // Esperar a que se envíen los datos
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/signup', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          name: 'John',
          surname: 'Doe',
          username: 'johndoe',
          password: 'password123',
        }),
      }));
    });
  });

  test('muestra un error si la autenticación falla', async () => {
    // Configurar el mock de fetch para simular una respuesta con error
    const mockResponse = { message: 'Error al registrarse' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockResponse,
    });

    render(<SignUp />);

    // Completar el formulario
    fireEvent.change(screen.getByPlaceholderText(/Introduce tu email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Continuar/i));
    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Apellido/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Nombre de usuario/i), { target: { value: 'johndoe' } });
    fireEvent.click(screen.getByText(/Continuar/i));
    fireEvent.change(screen.getByPlaceholderText(/Introduce tu contraseña/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirma la contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/Registrarse/i));

    // Esperar a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/Error al registrarse/i)).not.toBeNull();
    });
  });

  test('muestra un error si hay un fallo de conexión con el servidor', async () => {
    // Configurar el mock de fetch para simular un error de conexión
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<SignUp />);

    // Completar el formulario
    fireEvent.change(screen.getByPlaceholderText(/Introduce tu email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Continuar/i));
    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Apellido/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Nombre de usuario/i), { target: { value: 'johndoe' } });
    fireEvent.click(screen.getByText(/Continuar/i));
    fireEvent.change(screen.getByPlaceholderText(/Introduce tu contraseña/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirma la contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/Registrarse/i));

    // Esperar a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/Error en la conexión al servidor/i)).not.toBeNull();
    });
  });
});