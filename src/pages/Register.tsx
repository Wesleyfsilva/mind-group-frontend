import React, { useState } from "react";
import api from "../services/api";
import { UserPlus } from "lucide-react";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/register", { name, email, password });
      alert("Cadastro realizado com sucesso! Faça o login.");
      window.location.reload();
    } catch (error) {
      alert("Erro ao cadastrar. Tente outro e-mail.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "#262626",
          padding: "40px",
          borderRadius: "12px",
          border: "1px solid #333",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "10px", fontSize: "2rem" }}>
          Criar<span style={{ color: "#4da6ff" }}>Conta</span>
        </h1>
        <p style={{ color: "#888", marginBottom: "30px" }}>
          Junte-se à nossa comunidade
        </p>

        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <input
            type="text"
            placeholder="Seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #444",
              color: "#fff",
              padding: "12px",
              borderRadius: "6px",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #444",
              color: "#fff",
              padding: "12px",
              borderRadius: "6px",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <input
            type="password"
            placeholder="Crie uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #444",
              color: "#fff",
              padding: "12px",
              borderRadius: "6px",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "6px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <UserPlus size={20} /> Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};
