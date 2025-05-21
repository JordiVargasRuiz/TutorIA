import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Spinner, Alert, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaDownload, FaFileAlt, FaRegLightbulb, FaEdit, FaRegCopy} from 'react-icons/fa';
import jsPDF from 'jspdf';
import logo from './img/logo.png';
import backgroundImage from "./img/fondo_nosotros2.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const ResumenTexto = () => {
  const [texto, setTexto] = useState('');
  const [resumen, setResumen] = useState('');
  const [ideasPrincipales, setIdeasPrincipales] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingResumen, setLoadingResumen] = useState(false);
  const [showAyuda, setShowAyuda] = useState(false);
  const navigate = useNavigate();
  const [ejemploResumen, setEjemploResumen] = useState('');
  const resumenRef = useRef(null);
  const contarPalabras = (texto) => texto.trim().split(/\s+/).length;

  useEffect(() => {
    const storedExample = localStorage.getItem('ejemploResumen');
    if (storedExample) {
      setEjemploResumen(storedExample);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (texto.trim() === '') return setError("El campo de texto no puede estar vacío");
    if (contarPalabras(texto) < 400) return setError("El texto debe tener al menos 400 palabras.");
    setLoadingResumen(true);
    setError("");
    setResumen('');
    setIdeasPrincipales([]);

    try {
      const response = await axios.post('https://backend-resumen-tutoria.onrender.com//resumir', { texto });
      setResumen(response.data.resumen);
      setIdeasPrincipales(Array.isArray(response.data.ideas_principales) ? response.data.ideas_principales : []);
      localStorage.setItem('ejemploResumen', response.data.resumen);
    } catch {
      setError("Ocurrió un error al procesar la solicitud");
    } finally {
      setLoadingResumen(false);
    }
  };

   const handleCopiarResumen = () => {
    if (resumenRef.current) {
        navigator.clipboard.writeText(resumenRef.current.innerText)
        .then(() => alert('Resumen copiado al portapapeles'))
        .catch((err) => console.error('Error al copiar:', err));
    }
    };

  const handleLogout = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  };

const handleDescargarPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(14);

  doc.text("Resumen:", 10, 10);
  doc.setFontSize(12);
  const resumenLines = doc.splitTextToSize(resumen, 180);
  doc.text(resumenLines, 10, 20);

  let yPosition = 3 + (resumenLines.length * 7) + 10;

  doc.setFontSize(14);
  doc.text("Ideas principales:", 10, yPosition);
  doc.setFontSize(12);
  yPosition += 10;

  ideasPrincipales.forEach((idea, i) => {
    doc.text(`• ${idea}`, 10, yPosition);
    yPosition += 10;
  });

  doc.save("resumen_tutoria.pdf");
};

  return (
    <div
      className="d-flex flex-column min-vh-100 bg-light"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ padding: '0.75rem 1rem', backgroundColor: '#001F3D' }}>
        <div className="container-fluid">
          <Link to="/dashboard" className="navbar-brand d-flex align-items-center" style={{ fontSize: '24px', color: '#ffffff' }}>
            <img src={logo} alt="Logo" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
            TutorIA
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{ backgroundColor: '#ffffff' }}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/dashboard" className="btn" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none' }}>
                  Inicio
                </Link>
              </li>
              <li className="nav-item dropdown" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)} style={{ position: 'relative' }}>
                <button
                  className="btn dropdown-toggle"
                  style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none' }}
                  type="button"
                  aria-label="Opciones"
                  onClick={(e) => e.stopPropagation()}
                >
                  Opciones
                </button>
                {showDropdown && (
                  <div className="dropdown-menu show" style={{ position: 'absolute', zIndex: 2 }}>
                    <Link to="/tasks" className="dropdown-item" onClick={(e) => e.stopPropagation()}>
                      Mis tareas
                    </Link>
                    <button type="button" onClick={(e) => { e.stopPropagation(); handleLogout(e); }} className="dropdown-item">
                      Salir
                    </button>
                  </div>
                )}
              </li>
              <li className="nav-item">
                <Button
                  variant="link"
                  onClick={() => setShowAyuda(true)}
                  style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none', textDecoration: 'none' }}
                >
                  Ayuda
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        {loading && (
          <div className="loading-overlay">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        <div className="d-flex justify-content-center align-items-start mb-4">
        <FaFileAlt size={30} className="mb-0 mt-3 mt-sm-3 mt-md-5 ms-3 ms-sm-3 ms-md-4" style={{ color: '#1E90FF' }} /> 
        <h2 className="mb-0 mt-2 mt-sm-3 mt-md-5 ms-2 ms-sm-3 ms-md-1" style={{ color: '#1E90FF' }}>
            Generador de Resúmenes Rápidos con IA
        </h2>
        </div>

        <Container className="d-flex justify-content-center align-items-center flex-grow-1">
        
        <div className="custom-form p-5" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
            <h2 className="text-left mb-3 text-gradient animated-title">
            <FaEdit size={24} className="me-1" style={{ color: '#1E90FF' }} />
            ¡Introduce tu texto a resumir!
            </h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="texto">
                <Form.Label className="text-light"><strong>Ingresa tu texto aquí</strong></Form.Label>
                <Form.Control
                    as="textarea"
                    rows={12}
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Escribe o pega tu texto aquí..."
                    style={{
                    borderRadius: '12px',
                    border: '1px solid #ccc',
                    transition: 'all 0.3s ease',
                    }}
                    onFocus={(e) => e.target.style.border = '1px solid #007bff'}
                    onBlur={(e) => e.target.style.border = '1px solid #ccc'}
                />
                </Form.Group>
                <Button
                type="submit"
                className="mt-4 w-100"
                variant="primary"
                disabled={loadingResumen}
                style={{
                    backgroundColor: '#007bff',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                {loadingResumen ? 'Generando...' : <><FaFileAlt /> Generar Resumen</>}
                </Button>
            </Form>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </div>

            <div>
            {!resumen && !ideasPrincipales.length ? (
                <div>
                <h4><FaFileAlt /> Resumen:</h4>
                <p>El cambio climático es un fenómeno global que afecta a todos los aspectos de la vida en la Tierra. Está relacionado con la acumulación de gases de efecto invernadero en la atmósfera, provocando un aumento de la temperatura global. Las consecuencias incluyen el derretimiento de los glaciares, el aumento del nivel del mar, y fenómenos climáticos extremos como huracanes y sequías.</p>

                <h5><FaRegLightbulb /> Ideas principales:</h5>
                <p>● El cambio climático es causado principalmente por las actividades humanas, como la quema de combustibles fósiles.<br></br>● Los efectos del cambio climático son devastadores para los ecosistemas y las poblaciones vulnerables.<br></br>● Se requieren acciones urgentes para mitigar los efectos y adaptarse a los cambios ya inevitables.</p>
                </div>
            ) : (
                <div>
                <h4><FaFileAlt /> Resumen:</h4>
                <p ref={resumenRef}>
                    {resumen || 'El cambio climático es un fenómeno global que afecta a todos los aspectos de la vida en la Tierra. Está relacionado con la acumulación de gases de efecto invernadero en la atmósfera, provocando un aumento de la temperatura global. Las consecuencias incluyen el derretimiento de los glaciares, el aumento del nivel del mar, y fenómenos climáticos extremos como huracanes y sequías.'}
                </p>

                <h5><FaRegLightbulb /> Ideas principales:</h5>
                <ul>
                    {(ideasPrincipales.length ? ideasPrincipales : [
                    'El cambio climático es causado principalmente por las actividades humanas, como la quema de combustibles fósiles.',
                    'Los efectos del cambio climático son devastadores para los ecosistemas y las poblaciones vulnerables.',
                    'Se requieren acciones urgentes para mitigar los efectos y adaptarse a los cambios ya inevitables.'
                    ]).map((idea, index) => (
                    <li key={index}>{idea}</li>
                    ))}
                </ul>
                <div className="d-flex gap-2 mt-3">
                    <Button
                        variant="success"
                        onClick={handleDescargarPDF}
                        style={{ borderRadius: '12px', color: 'white' }}
                    >
                        <FaDownload className="me-2" /> Descargar PDF
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={handleCopiarResumen}
                        style={{ borderRadius: '12px', color: 'white' }}
                    >
                        <FaRegCopy className="me-2" /> Copiar resumen
                    </Button>
                    </div>
                </div>
            )}
            </div>
        </div>
        </Container>
      <p className="text-center text-muted">Este generador de resúmenes puede ayudarte a obtener un resumen claro y preciso de cualquier texto que ingreses. Simplemente pega o escribe tu texto, y recibirás un resumen generado automáticamente con las ideas principales destacadas. ¡Inténtalo ahora!</p>
      <footer className="mt-auto text-white text-center py-3" style={{ backgroundColor: '#001F3D' }}>
        <p>&copy; 2025 TutorIA. Todos los derechos reservados.</p>
      </footer>

      <style>{`
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
        .custom-form {
          width: 100%;
          max-width: 1300px;
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0px 0px 25px rgba(0,0,0,0.2);
          padding: 40px;
        }

        .text-gradient {
          background: linear-gradient(90deg, #007bff, #00c6ff);
          -webkit-background-clip: text;
          color: transparent;
          font-weight: bold;
        }

        .animated-title {
          animation: slideIn 1s ease-out;
        }

        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ResumenTexto;
