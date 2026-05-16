import { useState, useEffect } from 'react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';

function App() {
  const [page, setPage] = useState<'login' | 'register' | 'home'>('login');

  useEffect(() => {
    const token = localStorage.getItem('@MindBlog:token');
    if (token) {
      setPage('home');
    }
  }, []);

  if (page === 'home') return <Home />;

  return (
    <div className="App">
      {page === 'login' ? (
        <>
          <Login />
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button onClick={() => setPage('register')}>Não tem conta? Cadastre-se</button>
          </div>
        </>
      ) : (
        <>
          <Register />
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button onClick={() => setPage('login')}>Já tem conta? Faça Login</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;