import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./componentes/Layout";
import HomePage from "./pages/HomePage";
import UsuariosPage from "./pages/UsuariosPage";
import PokedexPage from "./pages/PokedexPage";
import PermissoesPage from "./pages/PermissoesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/permissoes" element={<PermissoesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;