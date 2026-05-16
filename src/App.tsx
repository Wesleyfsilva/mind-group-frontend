import { useState, useEffect } from 'react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { CreateArticle } from './pages/CreateArticle';

function App() {
  const [page, setPage] = useState<'login' | 'register' | 'home' | 'create'>('login');

  useEffect(() => {
    const token = localStorage.getItem('@MindBlog:token');
    if (token && page === 'login') {
      setPage('home');
    }
  }, [page]);

  // Se estiver na Home, passa a função de navegar para o botão "Novo Artigo" funcionar
  if (page === 'home') return <Home onNavigate={(p) => setPage(p)} />;
  
  if (page === 'create') return <CreateArticle />;

  return (
    <div className="App">
      {page === 'login' ? (
        <>
          <Login />
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button onClick={() => setPage('register')} style={{ cursor: 'pointer' }}>Não tem conta? Cadastre-se</button>
          </div>
        </>
      ) : (
        <>
          <Register />
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button onClick={() => setPage('login')} style={{ cursor: 'pointer' }}>Já tenho conta? Faça Login</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;