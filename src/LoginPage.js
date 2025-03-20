import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaUserCircle } from "react-icons/fa";
import logo from "./img/logo.png";
import backgroundImage from "./img/fondo_nosotros.jpg";
import backgroundLogin from "./img/fondo_login.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Usuario logueado: ", userCredential.user.email);
          navigate("/dashboard");
        })
        .catch(() => {
          setError("Correo o contraseña incorrectos.");
          setLoading(false);
        });
    }, 1500); // Retraso de 3 segundos
  };

  return (
    <div
      className="login-page d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ padding: '0.75rem 1rem', backgroundColor: '#001F3D' }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center" style={{ fontSize: '24px', color: '#ffffff' }}>
            <img src={logo} alt="PowerMove Logo" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
            TutorIA
          </Link>
        </div>
      </nav>
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="row shadow-lg rounded overflow-hidden" style={{ maxWidth: 750, width: "100%" }}>
          <div className="col-md-6 d-none d-md-block login-image"></div>
          <div className="col-md-6 p-4 login-form">
            <div className="text-center">
              <FaUserCircle size={80} className="text-primary mb-3" />
              <h2 className="fw-bold text-dark">Iniciar sesión</h2>
            </div>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaUser />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ingrese su correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 fw-bold"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Ingresar"}
              </button>
            </form>
            <hr className="my-4" />
            <div className="text-center">
              <p>¿Aún no tienes cuenta?</p>
              <a href="/signup" className="btn btn-success w-100" disabled={loading}>
                Regístrate
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '20px 0', textAlign: 'center' }}>
        <p>&copy; 2025 TutorIA. Todos los derechos reservados.</p>
      </footer>
      <style jsx>{`
        .login-image {
          background-image: url(${backgroundLogin});
          background-size: cover;
          background-position: center;
          min-height: 400px;
        }
        .login-form {
          backdrop-filter: blur(10px);
          background-color: rgba(255, 255, 255, 0.9);
        }
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
