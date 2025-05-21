import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { FaBook, FaClipboardCheck, FaMousePointer, FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './img/logo.png';
import backgroundImage from "./img/fondo_nosotros2.jpg";
import ayudaImg from "./img/apa.png";

const GeneradorDeCitaAPA = () => {
  const [tipo, setTipo] = useState('web');
  const [formData, setFormData] = useState({});
  const [cita, setCita] = useState('');
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAyuda, setShowAyuda] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();


  const handleLogout = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  const generarCita = async () => {
    setCita('');
    setError('');
    setLoading(true);

    if (tipo === 'web') {
      try {
        const response = await axios.get(`https://api.microlink.io/?url=${encodeURIComponent(formData.url)}`);
        const data = response.data.data;

        const title = data.title;
        const author = data.author;
        const date = data.date ? new Date(data.date).getFullYear() : "s.f.";

        if (title === 'Just a moment...' || !title) {
          setError("No se puede acceder a esta página web.\nNo pudimos acceder a la página web que intentas citar. Esto podría deberse a que la página web está detrás de un inicio de sesión o un muro de pago.");
          return;
        }

        let citaAPA = '';

        if (author) {
          citaAPA = `${author} (${date}). ${title}. Recuperado de ${formData.url}`;
        } else {
          citaAPA = `${title} (${date}). Recuperado de ${formData.url}`;
        }

        setCita(citaAPA);
      } catch (e) {
        setError("No se puede acceder a esta página web.\nNo pudimos acceder a la página web que intentas citar. Esto podría deberse a que la página web está detrás de un inicio de sesión o un muro de pago.");
      } finally {
        setLoading(false);
      }
    } else if (tipo === 'libro') {
      const { autor, año, titulo, editorial } = formData;
      if (!autor || !año || !titulo || !editorial) {
        setError("Por favor, completa todos los campos para citar un libro.");
        setLoading(false);
        return;
      }
      const citaAPA = `${autor} (${año}). ${titulo}. ${editorial}.`;
      setCita(citaAPA);
      setLoading(false);
    } else if (tipo === 'revista') {
      const { autor, año, titulo, nombreRevista, volumen, numero, paginas } = formData;
      if (!autor || !año || !titulo || !nombreRevista || !volumen || !numero || !paginas) {
        setError("Por favor, completa todos los campos para citar un artículo de revista.");
        setLoading(false);
        return;
      }
      const citaAPA = `${autor} (${año}). ${titulo}. ${nombreRevista}, ${volumen}(${numero}), ${paginas}.`;
      setCita(citaAPA);
      setLoading(false);
    }
  };

  const renderCampos = () => {
    switch (tipo) {
      case 'web':
        return (
          <Form.Group>
            <Form.Label>URL de la página web</Form.Label>
            <Form.Control
              type="text"
              value={formData.url || ''}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://..."
            />
          </Form.Group>
        );
      case 'libro':
        return (
          <>
            <Form.Group><Form.Label>Autor</Form.Label>
              <Form.Control type="text" value={formData.autor || ''} onChange={(e) => setFormData({ ...formData, autor: e.target.value })} />
            </Form.Group>
            <Form.Group><Form.Label>Año</Form.Label>
              <Form.Control type="text" value={formData.año || ''} onChange={(e) => setFormData({ ...formData, año: e.target.value })} />
            </Form.Group>
            <Form.Group><Form.Label>Título</Form.Label>
              <Form.Control type="text" value={formData.titulo || ''} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} />
            </Form.Group>
            <Form.Group><Form.Label>Editorial</Form.Label>
              <Form.Control type="text" value={formData.editorial || ''} onChange={(e) => setFormData({ ...formData, editorial: e.target.value })} />
            </Form.Group>
          </>
        );
      case 'revista':
        return (
          <>
            <Form.Group><Form.Label>Autor</Form.Label>
              <Form.Control type="text" value={formData.autor || ''} onChange={(e) => setFormData({ ...formData, autor: e.target.value })} />
            </Form.Group>
            <Form.Group><Form.Label>Año</Form.Label>
              <Form.Control type="text" value={formData.año || ''} onChange={(e) => setFormData({ ...formData, año: e.target.value })} />
            </Form.Group>
            <Form.Group><Form.Label>Título del artículo</Form.Label>
              <Form.Control type="text" value={formData.titulo || ''} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} />
            </Form.Group>
            <Form.Group><Form.Label>Nombre de la revista</Form.Label>
              <Form.Control type="text" value={formData.nombreRevista || ''} onChange={(e) => setFormData({ ...formData, nombreRevista: e.target.value })} />
            </Form.Group>
            <Form.Group><Form.Label>Volumen</Form.Label>
              <Form.Control type="text" value={formData.volumen || ''} onChange={(e) => setFormData({ ...formData, volumen: e.target.value })} />
            </Form.Group>
            <Form.Group><Form.Label>Número</Form.Label>
              <Form.Control type="text" value={formData.numero || ''} onChange={(e) => setFormData({ ...formData, numero: e.target.value })} />
            </Form.Group>
            <Form.Group><Form.Label>Páginas</Form.Label>
              <Form.Control type="text" value={formData.paginas || ''} onChange={(e) => setFormData({ ...formData, paginas: e.target.value })} />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
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

<Container className="my-5">
  <Row>
    {/* Generador de cita */}
    <Col md={7} className="mb-4">
      <h3 style={{ color: '#001F3D', fontWeight: 'bold' }}>
        <FaBook style={{ marginRight: '10px' }} />
        Generador de Cita APA
      </h3>

      <Form.Group>
        <Form.Label>Selecciona el tipo de fuente</Form.Label>
        <Form.Control
          as="select"
          value={tipo}
          onChange={(e) => {
            setTipo(e.target.value);
            setFormData({});
            setCita('');
            setError('');
          }}
        >
          <option value="web">Página web</option>
          <option value="libro">Libro</option>
          <option value="revista">Revista / Artículo</option>
        </Form.Control>
      </Form.Group>

      <Form className="mt-3">{renderCampos()}</Form>

      <div className="d-grid gap-2 mt-3">
        <Button variant="primary" onClick={generarCita} disabled={loading}>
          {loading ? (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          ) : (
            <>
              <FaClipboardCheck style={{ marginRight: '6px' }} />
              Generar cita
            </>
          )}
        </Button>
      </div>

{!cita && !loading && !error && (
  <div className="mt-3 text-center text-muted fst-italic border border-2 border-secondary-subtle rounded py-1 px-4 bg-light shadow-sm">
    <i className="bi bi-inbox me-2"></i>
    No hay fuentes aún.
  </div>
)}


      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {cita && (
        <div className="mt-3">
          <h5 style={{ color: '#0a3d62' }}>
            <FaCheckCircle style={{ color: 'green', marginRight: '8px' }} />
            Cita generada:
          </h5>
          <p>{cita}</p>
          <Button onClick={() => navigator.clipboard.writeText(cita)} variant="success">
            Copiar cita
          </Button>
        </div>
      )}
    </Col>

    {/* Instrucciones */}
    <Col md={5}>
      <div
        className="p-4 shadow-sm"
        style={{
          backgroundColor: '#f1f6f9',
          borderRadius: '12px',
          borderLeft: '6px solid #001F3D',
        }}
      >
        <h5 style={{ fontWeight: 'bold', color: '#001F3D' }}>
          <FaQuestionCircle style={{ marginRight: '8px' }} />
          ¿Cómo usar este generador?
        </h5>
        <ul className="mt-3" style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li className="mb-2">
            <FaMousePointer style={{ color: '#007bff', marginRight: '8px' }} />
            Selecciona el tipo de fuente que deseas citar.
          </li>
          <li className="mb-2">
            <FaMousePointer style={{ color: '#007bff', marginRight: '8px' }} />
            Llena los campos obligatorios con la información correspondiente.
          </li>
          <li className="mb-2">
            <FaClipboardCheck style={{ color: '#28a745', marginRight: '8px' }} />
            Haz clic en <strong>Generar cita</strong>.
          </li>
          <li className="mb-2">
            <FaCheckCircle style={{ color: '#28a745', marginRight: '8px' }} />
            Copia y utiliza la cita en tus trabajos.
          </li>
        </ul>
        <img
          src={ayudaImg}
          alt="Guía de cita"
          className="img-fluid mt-3"
          style={{ borderRadius: '8px' }}
        />
        <p className="mt-3 text-muted" style={{ fontSize: '0.9rem' }}>
          Revisa que los datos ingresados estén completos y correctamente escritos. Una cita APA mal hecha puede afectar tu evaluación académica.
          Errores en mayúsculas, puntuación o el orden de los elementos pueden restar formalidad a tu trabajo. Asegúrate de escribir bien los nombres, la fecha de publicación y los títulos. Una cita bien hecha refleja cuidado y responsabilidad académica.
        </p>
      </div>
    </Col>
  </Row>
</Container>


            {/* FOOTER */}
      <footer className="mt-auto text-white text-center py-3" style={{ backgroundColor: '#001F3D' }}>
        <p>&copy; 2025 TutorIA. Todos los derechos reservados.</p>
      </footer>
            </div>
            );
};

export default GeneradorDeCitaAPA;