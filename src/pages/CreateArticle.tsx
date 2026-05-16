import React, { useState } from 'react';
import api from '../services/api';

export const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [banner, setBanner] = useState('');

  // Função para converter o arquivo de imagem em Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBanner(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/articles', { title, content, banner });
      alert('Artigo publicado com sucesso!');
      window.location.href = '/'; // Volta para a home
    } catch (error) {
      alert('Erro ao publicar artigo.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Criar Novo Artigo</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Título do artigo" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ padding: '10px', fontSize: '1.1rem' }}
        />
        <textarea 
          placeholder="Conteúdo do artigo..." 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
          style={{ padding: '10px', height: '200px', fontFamily: 'sans-serif' }}
        />
        <div>
          <label>Imagem de Capa (Banner):</label><br />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {banner && <img src={banner} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />}
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
            Publicar
          </button>
          <button type="button" onClick={() => window.location.href = '/'} style={{ padding: '10px 20px' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};