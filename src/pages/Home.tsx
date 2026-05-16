import { useEffect, useState } from 'react';
import api from '../services/api';
import { PlusCircle, Trash2, Edit, LogOut } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'create', article?: any) => void;
}

export const Home = ({ onNavigate }: HomeProps) => {
  const [articles, setArticles] = useState([]);
  const user = JSON.parse(localStorage.getItem('@MindBlog:user') || '{}');

  const loadArticles = async () => {
    try {
      const response = await api.get('/articles');
      setArticles(response.data);
    } catch (error) {
      console.error("Erro ao carregar artigos", error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este artigo?')) {
      try {
        await api.delete(`/articles/${id}`);
        loadArticles();
      } catch (err) {
        alert('Erro ao excluir artigo.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#fff' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ margin: 0 }}>Mind Blog</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span>Olá, <strong style={{ color: '#4da6ff' }}>{user.name}</strong></span>
          <button 
            onClick={() => onNavigate('create')} 
            style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', padding: '8px 15px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '5px' }}
          >
            <PlusCircle size={18} /> Novo Artigo
          </button>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }} 
            style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <LogOut size={18} /> Sair
          </button>
        </div>
      </header>

      <main>
        {articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Nenhum artigo publicado ainda.</p>
        ) : (
          articles.map((article: any) => (
            <div key={article.id} style={{ marginBottom: '50px', textAlign: 'center' }}>
              {article.banner && (
                <img src={article.banner} alt="Banner" style={{ width: '100%', borderRadius: '12px', marginBottom: '20px' }} />
              )}
              <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{article.title}</h2>
              <p style={{ color: '#888', marginBottom: '15px' }}>
                Por {article.author} em {new Date(article.published_at).toLocaleDateString()}
              </p>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#ccc', marginBottom: '20px' }}>
                {article.content}
              </p>

              {/* BOTOES DE AÇÃO - AJUSTADOS PARA O MODO ESCURO */}
              {user.name === article.author && (
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                  <button 
                    onClick={() => onNavigate('create', article)} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      cursor: 'pointer', 
                      padding: '10px 20px', 
                      background: '#f39c12', // Laranja sólido para o Editar
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: '6px',
                      fontWeight: 'bold'
                    }}
                  >
                    <Edit size={18} /> Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(article.id)} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      cursor: 'pointer', 
                      padding: '10px 20px', 
                      background: '#e74c3c', // Vermelho sólido para o Excluir
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: '6px',
                      fontWeight: 'bold'
                    }}
                  >
                    <Trash2 size={18} /> Excluir
                  </button>
                </div>
              )}
              <hr style={{ border: '0.5px solid #333', marginTop: '40px' }} />
            </div>
          ))
        )}
      </main>
    </div>
  );
};