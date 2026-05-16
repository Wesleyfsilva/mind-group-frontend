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
      console.error("Erro ao carregar", error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Deseja excluir este post?')) {
      try {
        await api.delete(`/articles/${id}`);
        loadArticles();
      } catch (err) {
        alert('Erro ao excluir.');
      }
    }
  };

  return (
    // Forçamos o fundo escuro aqui para o texto branco não sumir
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a', color: '#ffffff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Cabeçalho */}
      <header style={{ maxWidth: '800px', margin: '0 auto 30px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Mind<span style={{ color: '#4da6ff' }}>Blog</span></h1>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ color: '#ccc' }}>Olá, <strong style={{ color: '#fff' }}>{user.name}</strong></span>
          <button 
            onClick={() => onNavigate('create')} 
            style={{ padding: '8px 12px', backgroundColor: '#4da6ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <PlusCircle size={16} /> Novo Post
          </button>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }} 
            style={{ background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Feed de Notícias */}
      <main style={{ maxWidth: '600px', margin: '0 auto' }}>
        {articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Nenhum post disponível.</p>
        ) : (
          articles.map((article: any) => (
            <div key={article.id} style={{ backgroundColor: '#262626', borderRadius: '10px', padding: '20px', marginBottom: '25px', border: '1px solid #333' }}>
              
              {article.banner && (
                <img src={article.banner} alt="Capa" style={{ width: '100%', borderRadius: '6px', marginBottom: '15px' }} />
              )}
              
              <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>{article.title}</h2>
              
              <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '15px' }}>
                Por {article.author} • {new Date(article.published_at).toLocaleDateString()}
              </p>
              
              <p style={{ lineHeight: '1.5', color: '#ddd' }}>{article.content}</p>

              {/* Botões do Dono do Post */}
              {user.name === article.author && (
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #383838' }}>
                  <button 
                    onClick={() => onNavigate('create', article)} 
                    style={{ background: 'none', border: 'none', color: '#4da6ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}
                  >
                    <Edit size={16} /> Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(article.id)} 
                    style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}
                  >
                    <Trash2 size={16} /> Excluir
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
};