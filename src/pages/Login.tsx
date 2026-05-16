import React, { useState } from 'react';
import api from '../services/api';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      
      // Salva o token e os dados do usuário no navegador
      localStorage.setItem('@MindBlog:token', response.data.token);
      localStorage.setItem('@MindBlog:user', JSON.stringify(response.data.user));
      
      alert('Login realizado com sucesso!');
      window.location.href = '/'; // Redireciona para a home (vamos criar depois)
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>Login - Mind Blog</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem conta? <a href="/register">Cadastre-se</a></p>
    </div>
  );
};