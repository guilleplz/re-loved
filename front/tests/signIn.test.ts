// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import SignIn from '../src/app/sign-in/page';
// import '@testing-library/jest-dom/extend-expect';

// // Mock de la función fetch
// global.fetch = jest.fn();

// describe('SignIn Component', () => {
//   beforeEach(() => {
//     // Limpiar mocks antes de cada prueba
//     (global.fetch as jest.Mock).mockClear();
    
//     // Mock de localStorage para que no afecte en las pruebas
//     Storage.prototype.setItem = jest.fn();
//     // Storage.prototype.getItem = jest.fn().mockReturnValue(null);
//   });

//   // TEST QUE VERIFICA QUE EL FORMULARIO SE RENDERICE CORRECTAMENTE
//   test('renderiza el formulario correctamente', () => {
//     render(<SignIn />);
//     // Verificar que los campos del formulario estén presentes
//     expect(screen.getByText(/Bienvenido de nuevo/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
//     expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument();
//   });

//   // TEST QUE VERIFICA QUE SE ENVIAN LOS DATOS CORRECTAMENTE AL BACKEND
//   test('envía los datos correctamente al backend', async () => {
//     const mockResponse = { token: 'mock_token' }; // Simula un token de respuesta del backend
//     (global.fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockResponse,
//     });

//     render(<SignIn />);

//     // Completar el formulario
//     fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), { target: { value: 'password123' } });
//     fireEvent.click(screen.getByText(/Iniciar sesión/i));

//     // Esperar a que la función fetch haya sido llamada
//     await waitFor(() =>
//       expect(global.fetch).toHaveBeenCalledWith(
//         "http://localhost:8080/api/users/signin",
//         expect.objectContaining({
//           method: 'POST',
//           body: JSON.stringify({
//             email: 'test@example.com',
//             password: 'password123',
//           }),
//         })
//       )
//     );

//     // Verificar que no se haya intentado guardar el token en localStorage
//     expect(localStorage.setItem).not.toHaveBeenCalled();
//   });

//   // TEST QUE VERIFICA QUE SE MUESTRE UN ERROR EN CASO DE FALLO EN EL BACKEND
//   test('muestra un error si el inicio de sesión falla', async () => {
//     const mockResponse = { message: 'Error al iniciar sesión' }; // Respuesta de error del backend
//     (global.fetch as jest.Mock).mockResolvedValueOnce({
//       ok: false,
//       json: async () => mockResponse,
//     });

//     render(<SignIn />);

//     // Completar el formulario
//     fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), { target: { value: 'password123' } });
//     fireEvent.click(screen.getByText(/Iniciar sesión/i));

//     // Esperar a que se muestre el mensaje de error
//     await waitFor(() => expect(screen.getByText(/Error al iniciar sesión/i)).toBeInTheDocument());
//   });

//   // TEST QUE VERIFICA QUE SE MUESTRE UN ERROR EN CASO DE FALLO DE CONEXIÓN
//   test('muestra un error si hay un fallo de conexión con el servidor', async () => {
//     // Configurar el mock de fetch para simular un error de conexión
//     (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));


//     // Completar el formulario
//     fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), { target: { value: 'password123' } });
//     fireEvent.click(screen.getByText(/Iniciar sesión/i));

//     // Esperar a que se muestre el mensaje de error de conexión
//     await waitFor(() => expect(screen.getByText(/Error en la conexión al servidor/i)).toBeInTheDocument());
//   });
// });
