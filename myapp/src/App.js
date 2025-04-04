import { Provider } from "react-redux";
import appstore from "./redux/Store";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/auth/Login";
import Messenger from "./pages/Messenger";
import AuthWrapper from "./pages/auth/AuthWrapper";
import Register from "./pages/auth/Register";

function App() {
  return (
    <Provider store={appstore}>
      <Router>
        <Routes>
          <Route path="/" element={
            <AuthWrapper>
            <LoginPage />
          </AuthWrapper>
          } />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Messenger />} />
        </Routes>
      </Router>
    </Provider>
  );
}

// Componente LoginPage que encapsula seu Login com layout
function LoginPage() {
  return (
    <div className="login-page">
      <div className="auth-form-container">
        <Login onSwitchToRegister={() => {/* Lógica para alternar para registro */}} />
      </div>
    </div>
  );
}

export default App;