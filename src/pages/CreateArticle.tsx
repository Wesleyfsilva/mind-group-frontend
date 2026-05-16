import React, { useState } from 'react';
import api from '../services/api';
import { ArrowLeft, Upload, Save } from 'lucide-react';

interface CreateProps {
  articleToEdit?: any;
  onBack: () => void;
}

export const CreateArticle = ({ articleToEdit, onBack }: CreateProps) => {
  const [title, setTitle] = useState(articleToEdit?.title || '');
  const [content, setContent] = useState(articleToEdit?.content || '');
  const [banner, setBanner] = useState(articleToEdit?.banner || '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBanner(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (articleToEdit) {
        await api.put(`/articles/${articleToEdit.id}`, { title, content, banner });
        alert('Artigo atualizado!');
      } else {
        await api.post('/articles', { title, content, banner });
        alert('Artigo publicado!');
      }
      onBack();
    } catch (error) {
      alert('Erro ao salvar o artigo.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a', color: '#fff', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Cabeçalho da Página */}
        <header style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <button onClick={onBack} style={{ background: 'none', border: '1px solid #444', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={20} />
          </button>
          <h2 style={{ margin: 0 }}>{articleToEdit ? 'Editar Postagem' : 'Nova Postagem'}</h2>
        </header>

        <form onSubmit={handleSubmit} style={{ backgroundColor: '#262626', padding: '30px', borderRadius: '12px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* Campo de Título Grande */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', color: '#aaa' }}>Título do Artigo</label>
            <input 
              type="text" 
              placeholder="Dê um título chamativo..." 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #444', color: '#fff', padding: '15px', borderRadius: '8px', fontSize: '1.2rem', outline: 'none' }}
            />
          </div>

          {/* Campo de Conteúdo Maior */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', color: '#aaa' }}>Conteúdo</label>
            <textarea 
              placeholder="Escreva sua história aqui..." 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required 
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #444', color: '#fff', padding: '15px', borderRadius: '8px', fontSize: '1.1rem', minHeight: '300px', resize: 'vertical', outline: 'none', lineHeight: '1.6' }}
            />
          </div>

          {/* Upload de Imagem mais visual */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label style={{ fontSize: '0.9rem', color: '#aaa', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Upload size={18} /> Imagem de Capa
            </label>
            
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: '#888' }} />
            
            {banner && (
              <div style={{ marginTop: '10px' }}>
                <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px' }}>Pré-visualização:</p>
                <img src={banner} alt="Preview" style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #444' }} />
              </div>
            )}
          </div>

          {/* Botões de Ação */}
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <button 
              type="submit" 
              style={{ flex: 1, backgroundColor: '#4da6ff', color: '#fff', border: 'none', padding: '15px', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <Save size={20} /> {articleToEdit ? 'Salvar Alterações' : 'Publicar Agora'}
            </button>
            <button 
              type="button" 
              onClick={onBack} 
              style={{ padding: '15px 25px', backgroundColor: 'transparent', color: '#888', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer' }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};