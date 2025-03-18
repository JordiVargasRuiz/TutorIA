import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "./img/logo.png";
import backgroundImage from "./img/fondo_nosotros.jpg";
import backgroundSignup from "./img/fondo_login.jpg";

const SignupPage = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Validaciones
    if (telefono.length !== 10) {
      setError("El número de teléfono debe tener 10 dígitos.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setIsProcessing(true);
    setError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuario registrado: ", userCredential.user.email);
        setSuccessMessage("¡Registro exitoso! Redirigiendo...");
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        setError("Error al registrar el usuario: " + error.message);
        setSuccessMessage("");
        setIsProcessing(false);
      });
  };

  return (
    <div
      className="signup-page d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-light" style={{ padding: "0.75rem 1rem", backgroundColor: "#001F3D" }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center" style={{ fontSize: "24px", color: "#ffffff" }}>
            <img src={logo} alt="PowerMove Logo" style={{ width: "30px", height: "30px", marginRight: "8px" }} />
            TutorIA
          </Link>
        </div>
      </nav>

      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="row shadow-lg rounded overflow-hidden" style={{ maxWidth: "900px", width: "100%" }}>
          <div className="col-md-6 d-none d-md-block signup-image"></div>
          <div className="col-md-6 p-4 signup-form">
            <div className="text-center">
              <h2 className="fw-bold text-dark">Crear Cuenta</h2>
            </div>

            {error && <div className="alert alert-danger text-center">{error}</div>}
            {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <div className="input-group">
                  <span className="input-group-text"><FaUser /></span>
                  <input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <div className="input-group">
                  <span className="input-group-text"><FaUser /></span>
                  <input type="text" className="form-control" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <div className="input-group">
                  <span className="input-group-text"><FaPhone /></span>
                  <input type="tel" className="form-control" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <div className="input-group">
                  <span className="input-group-text"><FaEnvelope /></span>
                  <input type="email" className="form-control" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <input type="password" className="form-control" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={isProcessing}>
                {isProcessing ? "Registrando..." : "Registrarse"}
              </button>
            </form>

            <hr className="my-4" />
            <div className="text-center">
              <p>¿Ya tienes una cuenta?</p>
              <Link to="/login" className="btn btn-success w-100">Iniciar Sesión</Link>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ backgroundColor: "#001F3D", color: "#ffffff", padding: "20px 0", textAlign: "center" }}>
        <p>&copy; 2025 TutorIA. Todos los derechos reservados.</p>
      </footer>

      {isProcessing && (
        <div className="overlay">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .signup-image {
          background-image: url(${backgroundSignup});
          background-size: cover;
          background-position: center;
          min-height: 450px;
        }

        .signup-form {
          backdrop-filter: blur(10px);
          background-color: rgba(255, 255, 255, 0.9);
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
