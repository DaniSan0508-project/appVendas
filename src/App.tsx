
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Cadastro from './pages/Cadastro';
import Indicadores from './pages/Indicadores';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/indicadores" element={<Indicadores />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    {/* Subrotas de cadastro */}
                    <Route path="/cadastro/consumidores" element={<h1>Consumidores</h1>} />
                    <Route path="/cadastro/lojas" element={<h1>Lojas</h1>} />
                    <Route path="/cadastro/produtos" element={<h1>Produtos</h1>} />
                    <Route path="/cadastro/usuarios" element={<h1>Usuários</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;