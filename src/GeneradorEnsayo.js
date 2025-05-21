import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; 
import logo from './img/logo.png';
import backgroundImage from "./img/fondo_nosotros2.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { jsPDF } from "jspdf"; 
import { saveAs } from 'file-saver';

import { FaFileAlt } from 'react-icons/fa';

const GeneradorEnsayo = () => {
  const [tema, setTema] = useState("");
  const [ensayo, setEnsayo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Generar");
  const [typedEnsayo, setTypedEnsayo] = useState("");
  const [showExample, setShowExample] = useState(true);
  const [showAyuda, setShowAyuda] = useState(false);
  const isTyping = useRef(false); 
  const navigate = useNavigate();

  const handleTemaChange = (e) => {
    setTema(e.target.value);
  };


    const ejemploEnsayo = "Laa inteligencia artificial (IA) es un campo de la informática que ha experimentado un crecimiento espectacular en las últimas décadas, transformando numerosos aspectos de la vida cotidiana. Desde los asistentes virtuales en nuestros teléfonos móviles hasta sistemas avanzados de análisis de datos que influyen en decisiones cruciales en el ámbito financiero y médico, la IA se está convirtiendo rápidamente en una herramienta imprescindible en la sociedad moderna. Sin embargo, con este crecimiento vienen importantes preguntas sobre sus implicaciones éticas, sociales y económicas. Uno de los principales avances de la inteligencia artificial ha sido su capacidad para aprender de los datos. Mediante el uso de algoritmos complejos y modelos de aprendizaje automático, las máquinas ahora pueden identificar patrones en grandes volúmenes de datos, lo que les permite hacer predicciones, tomar decisiones autónomas y mejorar su rendimiento con el tiempo. Este tipo de tecnología ha revolucionado industrias enteras, desde la atención médica, donde se utiliza para diagnosticar enfermedades con precisión, hasta el sector automotriz, donde los vehículos autónomos están cambiando la forma en que nos movemos. Sin embargo, el auge de la inteligencia artificial también plantea importantes desafíos. Uno de los principales problemas es el impacto que podría tener sobre el empleo. A medida que las máquinas se vuelven más capaces de realizar tareas que antes eran exclusivas de los seres humanos, surge la preocupación de que muchas profesiones podrían volverse obsoletas. Si bien la automatización ha demostrado ser una forma eficiente de aumentar la productividad, también ha generado temores sobre la pérdida de trabajos en sectores clave, como la manufactura y el transporte. Otro aspecto importante a considerar es la ética de la IA. Las máquinas que toman decisiones autónomas deben ser programadas de manera que respeten los principios éticos fundamentales. Por ejemplo, en el caso de los vehículos autónomos, surge la pregunta de cómo deben tomar decisiones en situaciones en las que la vida humana esté en riesgo. ¿Deberían las máquinas priorizar la vida de una persona sobre la de otra, o deberían evitar cualquier tipo de daño a toda costa? Estas preguntas no tienen respuestas simples y requieren un análisis profundo de las implicaciones morales de la IA. La inteligencia artificial tiene el potencial de transformar la manera en que vivimos y trabajamos. En el ámbito de la salud, por ejemplo, la IA ha demostrado ser un aliado valioso en el diagnóstico precoz de enfermedades, la personalización de tratamientos médicos y la gestión de grandes volúmenes de datos de pacientes. Herramientas como los algoritmos de aprendizaje automático pueden detectar patrones en los datos médicos que podrían pasar desapercibidos para los humanos, mejorando la precisión de los diagnósticos y reduciendo los errores médicos. En la educación, la IA está permitiendo el desarrollo de sistemas de aprendizaje personalizados que se adaptan al ritmo y las necesidades de cada estudiante. Estas plataformas inteligentes pueden recomendar materiales de estudio, evaluar el rendimiento académico y proporcionar retroalimentación instantánea, lo que mejora la experiencia educativa y permite una enseñanza más eficiente y accesible. Además, la IA ha sido clave en la automatización de tareas repetitivas, lo que ha llevado a una mayor productividad en diversas industrias.";

  const startTypingEffect = (text) => {
    let index = 0;
    setTypedEnsayo("");
    const typingInterval = setInterval(() => {
      setTypedEnsayo((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(typingInterval);
      }
    }, 10);
  };


  useEffect(() => {
    if (!isTyping.current) {
      isTyping.current = true;
      startTypingEffect(ejemploEnsayo);
    }
  }, []);


      const generarEnsayo = async () => {
        if (!tema.trim()) {
          setError("El tema no puede estar vacío.");
          return;
        }
        if (tema.length < 3) {
          setError("El tema debe tener al menos 3 caracteres.");
          return;
        }
    
        setError("");
        setLoading(true);
        setSuccess(false);
        setIsButtonDisabled(true);
        setButtonText("Generando...");
    
        setEnsayo("");
        setError("");
    
        try {
          const response = await axios.post("https://backend-tutoria-ensayo.onrender.com/generar-ensayo", { tema });
    
          if (response.data.ensayo) {
            setEnsayo(response.data.ensayo);
            setSuccess(true);
            setShowExample(false);
          } else {
            setError("Error al generar el ensayo.");
          }
        } catch (error) {
          setError("Hubo un problema al conectar con el servidor.");
        } finally {
          setLoading(false);
          setIsButtonDisabled(false);
          setButtonText("Generar");
        }
      };
  

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  const descargarEnsayoWord = (titulo, ensayo) => {
    if (typeof ensayo !== 'string') {
      console.warn('El contenido del ensayo no es una cadena de texto. Intentando convertir...');
      ensayo = JSON.stringify(ensayo);
      if (typeof ensayo !== 'string') {
        console.error('Error: El contenido del ensayo no es válido.');
        alert('Error: El contenido del ensayo no es válido.');
        return;
      }
    }
  
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: titulo,
                  bold: true,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: ensayo,
                  size: 22,
                }),
              ],
            }),
          ],
        },
      ],
    });
  
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "ensayo.docx");
    });
  };
  

  const descargarEnsayoPDF = (titulo, ensayo) => {
    if (typeof ensayo !== 'string') {
      console.warn('El contenido del ensayo no es una cadena de texto. Intentando convertir...');
      ensayo = JSON.stringify(ensayo);
      if (typeof ensayo !== 'string') {
        console.error('Error: El contenido del ensayo no es válido.');
        alert('Error: El contenido del ensayo no es válido.');
        return;
      }
    }

    const doc = new jsPDF();
    const margenIzquierdo = 20;
    const margenSuperior = 20; 
    const margenDerecho = 20;
    const margenInferior = 20; 
    const anchoPagina = doc.internal.pageSize.width;
    const margenDisponible = anchoPagina - margenIzquierdo - margenDerecho;

    if (logo) {
      doc.addImage(logo, 'PNG', margenIzquierdo, margenSuperior, 15, 15);  
    } else {
      console.error('Error: Logo no disponible.');
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);  
    doc.setTextColor(0, 51, 102);  
    doc.text(titulo, margenIzquierdo + 40, margenSuperior + 15);  

    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 51, 102);  
    doc.line(margenIzquierdo, margenSuperior + 20, anchoPagina - margenDerecho, margenSuperior + 20);  

    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);  
    
    const lines = doc.splitTextToSize(ensayo, margenDisponible);
    let yOffset = margenSuperior + 25;
    lines.forEach((line) => {
      if (yOffset + 10 > doc.internal.pageSize.height - margenInferior) {
        doc.addPage();
        yOffset = 20;
      }
      doc.text(line, margenIzquierdo, yOffset);
      yOffset += 8;
    });

    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 51, 102);  
    doc.line(margenIzquierdo, yOffset + 10, anchoPagina - margenDerecho, yOffset + 10);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(0, 51, 102);  
    doc.text("Ensayo generado por TutorIA", margenIzquierdo, yOffset + 15);  

    doc.save("ensayo.pdf");
  };

  return (
    <div 
      className="d-flex flex-column min-vh-100 bg-light" 
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
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
                <button className="btn dropdown-toggle" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none' }} type="button" aria-label="Opciones">Opciones</button>
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

      <div className="container py-4 d-flex flex-column flex-grow-1" style={{ paddingBottom: '100px' }}>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <FaFileAlt size={30} className="me-2" style={{ color: '#1E90FF' }} /> {/* Nuevo color azul para el ícono */}
          <h2 className="mb-0" style={{ color: '#1E90FF' }}>Creador de Ensayos Originales y Rápidos con Inteligencia Artificial</h2> {/* Título también en el mismo color */}
        </div>

        {loading && (
          <div className="d-flex justify-content-center mb-4 align-items-center" style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)' }}>
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {/* Mostrar el ejemplo solo si no hay ensayo generado */}
        {showExample && (
          <div className="mb-4">
            <h4>Ejemplo de ensayo:</h4>
            <p>{typedEnsayo}</p>
          </div>
        )}

        {success && (
        <div className="alert alert-success mt-3 d-flex justify-content-between align-items-center">
            <span>Ensayo generado con éxito!</span>
            <div>
            <button 
                onClick={() => descargarEnsayoPDF(tema, ensayo)} 
                className="btn btn-success"
                disabled={isButtonDisabled}
            >
                Descargar Ensayo como PDF
            </button>
            <button
                onClick={() => descargarEnsayoWord(tema, ensayo)}
                className="btn btn-success ms-2"
                disabled={isButtonDisabled}
            >
                Descargar Ensayo como Word
            </button>
            </div>
        </div>
        )}


        {ensayo && (
          <div className="mt-4">
            <h4>Ensayo generado:</h4>
            <p>{ensayo}</p>
          </div>
        )}

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <div className="mt-auto">
          <div className="container d-flex justify-content-center gap-3">
            <input
              type="text"
              value={tema}
              onChange={handleTemaChange}
              placeholder="Introduce el tema del ensayo"
              className="form-control w-50"
              aria-label="Campo para introducir el tema del ensayo"
              disabled={isButtonDisabled}
            />
            <button
              onClick={generarEnsayo}
              className="btn btn-primary"
              disabled={isButtonDisabled}
              aria-label="Generar ensayo"
            >
              {buttonText}
            </button>
          </div>
        </div>
        <Modal show={showAyuda} onHide={() => setShowAyuda(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>🛠️ Ayuda para usar el Generador de Ensayos</Modal.Title>
          </Modal.Header>
          <Modal.Body className="fs-5">
            <p><strong>Generador de Ensayos:</strong></p>
            <p><strong>1️⃣ Ingresa el tema:</strong> Escribe el nombre del tema sobre el cual deseas generar un ensayo (Ej. "La inteligencia artificial en la educación").</p>
            <p><strong>2️⃣ Genera el Ensayo:</strong> Presiona el botón “Generar” y espera a que el ensayo se genere automáticamente.</p>
            <p><strong>3️⃣ Descargar PDF y Word del ensayo:</strong> Presiona el botón “Descargar PDF/Word” y espera a que el ensayo se descargue automáticamente.</p>
            <p><strong>🔁 Generar nuevo ensayo:</strong> Puedes limpiar el formulario y generarando un nuevo ensayo con el botón “Generar”.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAyuda(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        
      </div>
      <p className="text-center text-muted">Este generador de ensayos puede ayudarte a crear textos a partir de cualquier tema que desees. Simplemente ingresa un tema, y recibirás un ensayo generado automáticamente. ¡Inténtalo ahora!</p>
      <footer className="mt-auto" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '20px 0', textAlign: 'center' }}>
        <p>&copy; 2025 TutorIA. Todos los derechos reservados.</p>
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

export default GeneradorEnsayo;
