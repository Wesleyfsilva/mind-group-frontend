import React, { useState } from 'react';
import api from '../services/api';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/register', { name, email, password });
      alert('Cadastro realizado com sucesso! Agora faça login.');
      window.location.href = '/login'; // Depois vamos configurar rotas reais
    } catch (error) {
      alert('Erro ao cadastrar. E-mail pode já estar em uso.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>Criar Conta - Mind Blog</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input 
          type="text" 
          placeholder="Nome Completo" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
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
        <button type="submit">Cadastrar</button>
      </form>
      <p>Já tem conta? <a href="/login">Faça Login</a></p>
    </div>
  );
};