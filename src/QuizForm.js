import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { Link as ScrollLink } from 'react-scroll'; 
import { Link,  useNavigate } from 'react-router-dom';
import { FaPlay, FaRedo, FaQuestionCircle, FaCheckCircle, FaClock } from "react-icons/fa"
import logo from './img/logo.png';
import backgroundImage from "./img/fondo_nosotros2.jpg";
import axios from "axios";
import Chatbot from "./Chatbot";

const Quiz = () => {
  const [tema, setTema] = useState("");
  const [tipo, setTipo] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [error, setError] = useState("");
  const [resultados, setResultados] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(300); // 5 minutos (300 segundos)
  const [temporalizadorActivo, setTemporizadorActivo] = useState(false);
  const [respuestasFinalizadas, setRespuestasFinalizadas] = useState(false); // Para evitar modificaciones
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAyuda, setShowAyuda] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    let timer;
    if (temporalizadorActivo && tiempoRestante > 0) {
      timer = setTimeout(() => setTiempoRestante(tiempoRestante - 1), 1000);
    } else if (tiempoRestante === 0) {
      // Si el tiempo se acaba, bloquear respuestas
      if (!respuestasFinalizadas) {
        setRespuestasFinalizadas(true);
        verificarRespuestas(); // Autoevaluación cuando el tiempo se acabe
      }
      setTemporizadorActivo(false);
    }
    return () => clearTimeout(timer);
  }, [tiempoRestante, temporalizadorActivo]);

  const handleChange = (e, index) => {
    if (respuestasFinalizadas) return; // No permitir cambios después de verificar respuestas

    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = e.target.value;
    setRespuestas(nuevasRespuestas);
  };

  const generarQuiz = async () => {
    setError("");
    setPreguntas([]);
    setResultados(null);
    setShowModal(false);

    if (!tema.trim()) {
      setError("Por favor, ingresa un tema.");
      return;
    }

    if (!tipo) {
      setError("Por favor, selecciona un tipo de pregunta.");
      return;
    }

    try {
      const response = await axios.post("https://backend-tutoria-quiz.onrender.com/generar-quiz", {
        tema: tema.trim(),
        tipo,
      });

      if (response.data.preguntas) {
        setPreguntas(response.data.preguntas);
        setRespuestas(Array(response.data.preguntas.length).fill(""));
        setError("");
        setTiempoRestante(300); // 5 minutos
        setTemporizadorActivo(true);
        setRespuestasFinalizadas(false);
      } else {
        setError("No se pudo generar el quiz. Intenta nuevamente.");
      }
    } catch (err) {
      setError("Error al comunicarse con el servidor.");
    }
  };

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  };


  const verificarRespuestas = () => {
    let puntaje = 0;
    const detalles = preguntas.map((pregunta, index) => {
      const correcta = pregunta.respuesta_correcta?.trim().toLowerCase().charAt(0);
      const elegida = respuestas[index]?.trim().toLowerCase().charAt(0);
      const esCorrecta = correcta === elegida;

      if (esCorrecta) puntaje++;

      return {
        pregunta: pregunta.pregunta,
        correcta: pregunta.respuesta_correcta,
        elegida: respuestas[index] || "No respondida",
        esCorrecta,
      };
    });

    setResultados({ puntaje, total: preguntas.length, detalles });
    setShowModal(true);
    setRespuestasFinalizadas(true); // Bloquear edición de respuestas
    setTemporizadorActivo(false); // Detener el temporizador
  };

  const reiniciarQuiz = () => {
    setTema("");
    setTipo("");
    setPreguntas([]);
    setRespuestas([]);
    setError("");
    setResultados(null);
    setShowModal(false);
    setTiempoRestante(300); // 5 minutos
    setTemporizadorActivo(false);
    setRespuestasFinalizadas(false);
  };

  
  return (
    <div  className="d-flex flex-column min-vh-100 " style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
>
<div 
  style={{
    display: "flex",
    flex:1,
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
    padding: '10px'
  }}
>
  <Chatbot />
</div>

{loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

  <div className="flex-grow-1">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ padding: '0.75rem 1rem', backgroundColor: '#001F3D' }}>
        <div className="container-fluid">
          <Link to="/dashboard" className="navbar-brand d-flex align-items-center" style={{ fontSize: '24px', color: '#ffffff' }}>
            <img src={logo} alt="PowerMove Logo" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
            TutorIA
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ backgroundColor: '#ffffff' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/dashboard" className="btn" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none' }}>
                  Inicio
                </Link>
              </li>

              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="btn dropdown-toggle" style={{backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none'}} type="button">Opciones</button>
                {showDropdown && (
                  <div className="dropdown-menu show">
                    <Link to="/tasks" className="dropdown-item">Mis tareas</Link>
                    <button onClick={handleLogout} className="dropdown-item">Salir</button>
                  </div>
                )}
              </li>
              <li className="nav-item">
                  <Button
                    variant="link"
                    onClick={() => setShowAyuda(true)}
                    style={{
                      backgroundColor: '#001F3D',
                      color: '#ffffff',
                      padding: '0.35rem 0.75rem',
                      fontSize: '18px',
                      border: 'none',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Ayuda
                  </Button>
                </li>
            </ul>
          </div>
        </div>
      </nav>
      <Container className="py-5">
  <h2 className="text-center mb-5 display-4 fw-bold text-primary">
    🎓 Generador de <span className="text-dark">Quiz</span>
  </h2>

  <Row className="justify-content-center">
    <Col md={8} lg={6}>
      <Card className="p-5 shadow-lg rounded-4">
        <Form>
          <Form.Group controlId="formTema" className="mb-4">
            <Form.Label className="fs-5">
              <FaQuestionCircle className="me-2 text-primary" /> Tema
            </Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Ejemplo: Programación avanzada"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTipo" className="mb-4">
            <Form.Label className="fs-5">
              <FaCheckCircle className="me-2 text-primary" /> Tipo de Pregunta
            </Form.Label>
            <Form.Select
              size="lg"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Seleccionar Tipo</option>
              <option value="Opción múltiple">Opción múltiple</option>
            </Form.Select>
          </Form.Group>

          <div className="d-grid gap-3 mt-4">
            <Button size="lg" variant="primary" onClick={generarQuiz}>
              <FaPlay className="me-2" /> Generar Quiz
            </Button>
            <Button size="lg" variant="outline-secondary" onClick={reiniciarQuiz}>
              <FaRedo className="me-2" /> Reiniciar
            </Button>
          </div>
        </Form>
      </Card>

      {error && (
        <Alert variant="danger" className="mt-4 text-center fs-5 py-3">
          {error}
        </Alert>
      )}
    </Col>
  </Row>

  {preguntas.length > 0 && (
    <>
      <h3 className="text-center mt-5 fw-semibold text-success">
        📝 Preguntas Generadas
      </h3>
      <div className="text-center mb-4 fs-4">
        <FaClock className="me-2" /> ⏳ Tiempo restante: <strong>{tiempoRestante}s</strong>
      </div>

      {preguntas.map((pregunta, index) => (
        <Card key={index} className="my-4 shadow-sm rounded-4 p-3">
          <Card.Body>
            <Card.Title className="fs-5 mb-3">
              {`Pregunta ${index + 1}: ${pregunta.pregunta}`}
            </Card.Title>
            <Form>
              {pregunta.opciones.map((opcion, i) => (
                <Form.Check
                  key={i}
                  type="radio"
                  label={opcion}
                  name={`pregunta-${index}`}
                  value={opcion.charAt(0)}
                  checked={respuestas[index] === opcion.charAt(0)}
                  onChange={(e) => handleChange(e, index)}
                  id={`opcion-${index}-${i}`}
                  disabled={respuestasFinalizadas || tiempoRestante === 0}
                  className="mb-2 fs-5"
                />
              ))}
            </Form>
          </Card.Body>
        </Card>
      ))}

      <Row className="justify-content-center mb-5">
        <Col md="auto">
          <Button
            size="lg"
            variant="success"
            onClick={verificarRespuestas}
            disabled={tiempoRestante === 0 || respuestasFinalizadas}
          >
            <FaCheckCircle className="me-2" /> Verificar Respuestas
          </Button>
        </Col>
      </Row>
    </>
  )}

  {/* MODAL RESULTADOS */}
  <Modal show={showModal} onHide={() => setShowModal(false)} centered>
    <Modal.Header closeButton>
      <Modal.Title className="fs-4">📊 Resultados</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {resultados && (
        <>
          <p className="text-center fs-5">
            Tu puntaje es <strong>{resultados.puntaje}</strong> de <strong>{resultados.total}</strong>
          </p>

          {resultados.detalles.map((detalle, index) => (
            <Alert
              key={index}
              variant={detalle.esCorrecta ? "success" : "danger"}
              className="rounded-3 fs-5"
            >
              <strong>Pregunta {index + 1}:</strong> {detalle.pregunta} <br />
              ✅ <strong>Correcta:</strong> {detalle.correcta} <br />
              🔘 <strong>Tu respuesta:</strong> {detalle.elegida}
            </Alert>
          ))}
        </>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" size="lg" onClick={() => setShowModal(false)}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
</Container>
    </div>

    <Modal show={showAyuda} onHide={() => setShowAyuda(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>🛠️ Ayuda para usar el Generador de Quiz</Modal.Title>
  </Modal.Header>
  <Modal.Body className="fs-5">
    <p><strong>1️⃣ Ingresa el tema:</strong> Escribe el nombre del tema sobre el cual deseas generar preguntas (Ej. "Programación avanzada").</p>
    <p><strong>2️⃣ Selecciona el tipo de pregunta:</strong> Actualmente solo está disponible “Opción múltiple”.</p>
    <p><strong>3️⃣ Genera el Quiz:</strong> Presiona el botón “Generar Quiz” y espera a que las preguntas se carguen automáticamente.</p>
    <p><strong>4️⃣ Responde:</strong> Selecciona las respuestas correctas. Tienes un tiempo limitado para contestar.</p>
    <p><strong>5️⃣ Verifica:</strong> Al terminar, da clic en “Verificar Respuestas” y verás tus resultados.</p>
    <p><strong>🔁 Reiniciar:</strong> Puedes limpiar todo y volver a generar un nuevo quiz con el botón “Reiniciar”.</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowAyuda(false)}>
      Cerrar
    </Button>
  </Modal.Footer>
</Modal>


    {/* Footer */}
    <footer style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '20px 0', textAlign: 'center' }}>
      <p>&copy; 2025 TutorIA. Todos los derechos reservados.</p>
      <div>
        <Link to="/privacy-policy" style={{ color: '#ffffff', textDecoration: 'none', margin: '0 15px' }}>Política de privacidad</Link>
        <Link to="/terms" style={{ color: '#ffffff', textDecoration: 'none', margin: '0 15px' }}>Términos y condiciones</Link>
      </div>
    </footer>  

    <style jsx>{`

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
      `}</style>
    </div>
  );
};

export default Quiz;
