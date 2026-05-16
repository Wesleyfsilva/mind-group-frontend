import { useState, useEffect } from "react";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { CreateArticle } from "./pages/CreateArticle";

function App() {
  const [page, setPage] = useState<"login" | "register" | "home" | "create">(
    "login",
  );
  const [articleToEdit, setArticleToEdit] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("@MindBlog:token");
    if (token) setPage("home");
  }, []);

  const navigateToCreate = (p: "create", article: any = null) => {
    setArticleToEdit(article);
    setPage(p);
  };

  if (page === "home") return <Home onNavigate={navigateToCreate} />;
  if (page === "create")
    return (
      <CreateArticle
        articleToEdit={articleToEdit}
        onBack={() => setPage("home")}
      />
    );

  return (
    <div className="App">
      {page === "login" ? (
        <>
          <Login />
          <center>
            <button onClick={() => setPage("register")}>Cadastre-se</button>
          </center>
        </>
      ) : (
        <>
          <Register />
          <center>
            <button onClick={() => setPage("login")}>Voltar ao Login</button>
          </center>
        </>
      )}
    </div>
  );
}

export default App;
