// app/page.tsx
import Button from '@/components/Button/Button';
import '../styles/globals.css';

const Home = () => {
  return (
    <div className="container">
      <h1>Bienvenido a Re-Loved</h1>
      <p>Esta es la página de inicio.</p>
      <Button text={'haz click aquí'}/>
    </div>
  );
};

export default Home;