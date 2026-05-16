import { useEffect, useState } from 'react';
import api from '../services/api';
import { LogOut, PlusCircle } from 'lucide-react';

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const user = JSON.parse(localStorage.getItem('@MindBlog:user') || '{}');

  useEffect(() => {
    api.get('/articles').then((response) => {
      setArticles(response.data);
    });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Mind Blog</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span>Olá, <strong>{user.name}</strong></span>
          <button onClick={() => window.location.href = '/create'} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <PlusCircle size={18} /> Novo Artigo
          </button>
          <button onClick={handleLogout} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
            Sair
          </button>
        </div>
      </header>

      <hr />

      <main style={{ marginTop: '30px' }}>
        {articles.length === 0 ? (
          <p>Nenhum artigo publicado ainda. Seja o primeiro!</p>
        ) : (
          articles.map((article: any) => (
            <div key={article.id} style={{ borderBottom: '1px solid #ddd', paddingBottom: '20px', marginBottom: '20px' }}>
              {article.banner && <img src={article.banner} alt={article.title} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }} />}
              <h2>{article.title}</h2>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Por {article.author} em {new Date(article.published_at).toLocaleDateString()}</p>
              <p>{article.content.substring(0, 150)}...</p>
              <button onClick={() => alert('Em breve: Ver detalhes')}>Ler mais</button>
            </div>
          ))
        )}
      </main>
    </div>
  );
};