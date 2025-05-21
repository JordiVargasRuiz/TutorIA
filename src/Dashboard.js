import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; 
import {FaBookOpen, FaBolt, FaLightbulb, FaClock, FaPlayCircle, FaCheckCircle, FaImages, FaPhotoVideo, FaTools, FaBullseye, FaEye, FaHeart, FaUsers, FaBook, FaUserGraduate, FaStackOverflow, FaSync, FaGlobe, FaPenAlt, FaBrain, FaEdit, FaRegClock, FaClipboardList } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaRegClipboard } from 'react-icons/fa';
import logo from './img/logo.png';
import logo1 from './img/ejem.jpg';
import logo2 from './img/ejem1.jpg';
import logo3 from './img/logo3.jpg';
import logo4 from './img/ejem3.jpg';
import img1 from './img/slide1.jpg';
import img2 from './img/slide2.jpg';
import img3 from './img/slide3.jpg';
import global from './img/global.jpg';
import generacionRapidaImg from './img/generacion.jpg';
import revisionImg from './img/revision.jpg';
import aprendizaje from './img/aprendizaje.jpg';
import generos from './img/generos.jpg';
import actualizaciones from './img/actualizaciones.jpg';
import visionImg from './img/vision.jpg';
import misionImg from './img/mision.jpg';
import valoresImg from './img/valor.jpg';
import nosotrosBg from './img/fondo_nosotros.jpg';
import serviciosBg from './img/fondo_servicios.jpg';
import Chatbot from "./Chatbot";


function Dashboard() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedService, setExpandedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <>
<div 
  style={{
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
                  <Link to="/cita" className="btn" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none', cursor: 'pointer' }}>
                    Formato APA
                  </Link>
              </li>

              <li className="nav-item">
                  <ScrollLink to="nosotros" smooth={true} duration={500} className="btn" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none', cursor: 'pointer' }}>
                    Nosotros
                  </ScrollLink>
              </li>

              <li className="nav-item">
                  <ScrollLink to="contacto" smooth={true} duration={500} className="btn" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none', cursor: 'pointer' }}>
                    Contacto
                  </ScrollLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Carrusel */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img1} className="d-block w-100" alt="Slide 1" style={{ maxHeight: '550px', objectFit: 'cover' }} />
          </div>
          <div className="carousel-item">
            <img src={img2} className="d-block w-100" alt="Slide 2" style={{ maxHeight: '550px', objectFit: 'cover' }} />
          </div>
          <div className="carousel-item">
            <img src={img3} className="d-block w-100" alt="Slide 3" style={{ maxHeight: '550px', objectFit: 'cover' }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

{/* Sección Biblioteca TutorIA */}
<section
  id="biblioteca"
  className="py-5 text-center"
  style={{
    padding: '50px 15px',
    backgroundImage: `url(${nosotrosBg})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <div className="container" style={{ background: 'rgba(255, 255, 255, 0.85)', padding: '30px', borderRadius: '10px' }}>
    <motion.h2 className="mb-4" style={{ fontSize: '32px', fontWeight: 'bold', color: '#001F3D' }} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <FaBook className="me-2" color="#001F3D" /> Biblioteca TutorIA
    </motion.h2>
    <motion.p style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', color: '#333' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      Descubre un mundo de conocimiento a tu alcance. En nuestra biblioteca, encontrarás libros electrónicos de libre acceso para ampliar tus horizontes.
    </motion.p>
    {/* Botón para redirigir */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <a href="#/Inicio" className="btn btn-primary mt-4" style={{ fontSize: '18px', padding: '10px 20px' }}>
        Explorar Biblioteca
      </a>
    </motion.div>
    <div className="row mt-4">
      {[{ 
          title: 'Acceso Global a diferentes libros', 
          icon: <FaGlobe color="#ff6f61" />, 
          text: 'Consulta libros desde cualquier lugar y en cualquier momento, con un acceso global y sencillo.',
          image: global// Aquí coloca la URL de la imagen
        },
        { 
          title: 'Aprendizaje Personalizado', 
          icon: <FaUserGraduate color="#001F3D" />, 
          text: 'Nuestros recursos están diseñados para adaptarse a tus intereses y necesidades de aprendizaje.',
          image: aprendizaje // Aquí coloca la URL de la imagen
        },
        { 
          title: 'Variedad de Géneros', 
          icon: <FaStackOverflow color="#28a745" />, 
          text: 'Explora una amplia gama de géneros literarios, desde literatura clásica hasta libros de estudio especializados.',
          image: generos // Aquí coloca la URL de la imagen
        },
        { 
          title: 'Actualizaciones Constantes', 
          icon: <FaSync color="#ffcc00" />, 
          text: 'Mantén tu conocimiento actualizado con los nuevos libros y recursos que se agregan regularmente.',
          image: actualizaciones // Aquí coloca la URL de la imagen
        }
      ].map((item, index) => (
        <motion.div key={index} className="col-md-3" whileHover={{ scale: 1.05 }}>
          <div className="card shadow-sm p-3">
            <h4 className="mb-3" style={{ color: '#001F3D' }}>
              {item.icon} {item.title}
            </h4>
            <p style={{ color: '#333' }}>{item.text}</p>
            <div className="mt-3">
              {/* Imagen de la tarjeta (debajo del texto) */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="card-img-bottom" 
                style={{ height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

<section
  id="generador-resumenes"
  className="py-5"
  style={{
    backgroundImage: `url(${serviciosBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#1c1c2b', // color fallback
  }}
>
  <motion.div
    className="container text-white"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <motion.h2
      className="text-center mb-4"
      style={{ fontSize: '36px', fontWeight: 'bold' }}
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <FaBookOpen style={{ fontSize: '32px', marginRight: '12px' }} />
      Generador de Resúmenes Inteligente
    </motion.h2>

    <motion.p
      className="text-center mb-5"
      style={{ fontSize: '18px', lineHeight: '1.7' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
    >
      Transforma textos largos en conocimiento útil en segundos. Ideal para estudiantes, investigadores y mentes curiosas.
    </motion.p>

    <div className="d-flex justify-content-center mb-5">
      <motion.a
        href="#/resumen"
        className="btn btn-primary mt-2"
        style={{
          fontSize: '18px',
          padding: '12px 30px',
          borderRadius: '10px',
          transition: 'all 0.3s ease-in-out',
        }}
        whileHover={{ scale: 1.08 }}
      >
        Probar Generador de resumenes
      </motion.a>
    </div>

    <div className="row text-center">
      {[
        {
          icon: <FaBolt />,
          title: 'Resúmenes Rápidos',
          desc: 'Genera un resumen en segundos sin comprometer lo esencial.',
          bg: '#2C3E50',
        },
        {
          icon: <FaLightbulb />,
          title: 'Ideas Principales',
          desc: 'Extrae automáticamente las 5 ideas clave de cualquier texto.',
          bg: '#34495E',
        },
        {
          icon: <FaClock />,
          title: 'Ahorro de Tiempo',
          desc: 'Evita leer páginas enteras, obtén solo lo que importa.',
          bg: '#3498DB',
        },
        {
          icon: <FaBookOpen />,
          title: 'Ideal para Estudios',
          desc: 'Perfecto para tareas, investigaciones y repasos rápidos.',
          bg: '#1ABC9C',
        },
      ].map((card, i) => (
        <motion.div
          key={i}
          className="col-12 col-md-3 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 * i }}
        >
          <div
            className="card h-100 shadow-lg"
            style={{
              backgroundColor: card.bg,
              color: '#fff',
              borderRadius: '20px',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div className="card-body p-4">
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{card.icon}</div>
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Sección de testimonios */}
    <motion.div
      className="mt-5 pt-4 border-top"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
    >
      <h4 className="text-center mb-4" style={{ fontWeight: 'bold' }}>
        Lo que dicen nuestros usuarios
      </h4>
      <div className="row text-white">
        <div className="col-md-4 mb-3">
          <blockquote className="blockquote" style={{ fontStyle: 'italic' }}>
            “Gracias a este generador pude resumir mi tesis en minutos. ¡Una herramienta increíble!”
          </blockquote>
          <footer className="blockquote-footer text-white-50">Laura G., Estudiante de Psicología</footer>
        </div>
        <div className="col-md-4 mb-3">
          <blockquote className="blockquote" style={{ fontStyle: 'italic' }}>
            “Uso esta herramienta antes de cada reunión para digerir informes largos rápidamente.”
          </blockquote>
          <footer className="blockquote-footer text-white-50">Marco R., Gerente de Proyectos</footer>
        </div>
        <div className="col-md-4 mb-3">
          <blockquote className="blockquote" style={{ fontStyle: 'italic' }}>
            “Excelente para preparar clases. Me ahorra horas de lectura semanal.”
          </blockquote>
          <footer className="blockquote-footer text-white-50">Dra. Irene S., Profesora Universitaria</footer>
        </div>
      </div>
    </motion.div>
  </motion.div>
</section>


      {/* Sección Nosotros */}
      <section
        id="nosotros"
        className="py-5 text-center"
        style={{
          padding: '50px 15px',
          backgroundImage: `url(${nosotrosBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container" style={{ background: 'rgba(255, 255, 255, 0.85)', padding: '30px', borderRadius: '10px' }}>
          <motion.h2 className="mb-4" style={{ fontSize: '32px', fontWeight: 'bold', color: '#001F3D' }} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <FaUsers className="me-2" color="#001F3D" /> Sobre Nosotros
          </motion.h2>
          <motion.p style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', color: '#333' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          En TutorIA, nos dedicamos a brindar soluciones innovadoras para potenciar tu aprendizaje y desarrollo académico. Nuestra misión es ofrecer herramientas educativas personalizadas que optimicen tu proceso de estudio y te ayuden a alcanzar tus objetivos educativos de manera eficiente.
          </motion.p>
          <div className="row mt-4">
            {[{ title: 'Misión', icon: <FaBullseye color="#ff6f61" />, img: misionImg, text: 'Empoderar a los estudiantes con tecnología avanzada para mejorar su rendimiento académico y fomentar un aprendizaje más personalizado y eficaz.' },
              { title: 'Visión', icon: <FaEye color="#001F3D" />, img: visionImg, text: 'Ser líderes en innovación educativa, transformando la forma en que los estudiantes aprenden y crecen a nivel global.' },
              { title: 'Valores', icon: <FaHeart color="#28a745" />, img: valoresImg, text: 'Innovación, compromiso, calidad y dedicación al éxito de nuestros usuarios, creando experiencias de aprendizaje únicas y personalizadas.' }].map((item, index) => (
              <motion.div key={index} className="col-md-4" whileHover={{ scale: 1.05 }}>
                <div className="card shadow-sm p-3">
                  <h4 className="mb-3" style={{ color: '#001F3D' }}>{item.icon} {item.title}</h4>
                  <p style={{ color: '#333' }}>{item.text}</p>
                  <img src={item.img} alt={item.title} className="img-fluid mt-3" style={{ maxHeight: '150px', objectFit: 'cover', borderRadius: '10px' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


<section
  id="generar-ensayo"
  className="py-5"
  style={{
    backgroundImage: `url(${serviciosBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <div className="container">
    <motion.h2
      className="text-center mb-5"
      style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffffff' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <FaPenAlt style={{ fontSize: '30px', marginRight: '10px' }} />
      Generación de Ensayos
    </motion.h2>

    <motion.p
      className="text-center mb-1"
      style={{ fontSize: '18px', color: '#ffffff', lineHeight: '1.6' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.2 }}
    >
      Nuestro sistema de generación de ensayos te ofrece una solución rápida y eficiente para crear contenido académico. Solo necesitas proporcionar los parámetros básicos y nuestra herramienta generará un ensayo estructurado, con argumentos claros y coherentes, optimizado para tus necesidades educativas.
    </motion.p>

{/* Botón para redirigir */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    height: '100px',
  }}
>
  <a
    href="#/generador"
    className="btn btn-primary mt-4"
    style={{ fontSize: '18px', padding: '10px 20px' }}
  >
    Generación de Ensayos
  </a>
</motion.div>
    <div className="row align-items-center justify-content-center">
      {/* Primer Card */}
      <motion.div
        className="col-12 col-md-3 mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="card shadow-lg" style={{ backgroundColor: '#ff6f61', color: 'white', borderRadius: '20px' }}>
          <div className="card-body text-center p-4">
            <FaBrain style={{ fontSize: '27px' }} />
            <h4 className="mt-3">Generación Rápida</h4>
            <p>Obtén un ensayo completo en minutos con solo unos pocos detalles.</p>
          </div>
        </div>
      </motion.div>

      {/* Tercer Card */}
      <motion.div
        className="col-12 col-md-3 mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="card shadow-lg" style={{ backgroundColor: '#343a40', color: 'white', borderRadius: '20px' }}>
          <div className="card-body text-center p-4">
            <FaClipboardList style={{ fontSize: '27px' }} />
            <h4 className="mt-3">Formato Estandarizado</h4>
            <p>El ensayo generado sigue las normativas estándar de redacción académica.</p>
          </div>
        </div>
      </motion.div>

      {/* Cuarto Card */}
      <motion.div
        className="col-12 col-md-3 mb-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="card shadow-lg" style={{ backgroundColor: '#17a2b8', color: 'white', borderRadius: '20px' }}>
          <div className="card-body text-center p-4">
            <FaRegClock style={{ fontSize: '27px' }} />
            <h4 className="mt-3">Ahorro de Tiempo</h4>
            <p>Genera ensayos en menos tiempo, lo que te permite concentrarte en otras actividades.</p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

{/* Sección Generación de Quiz */}
<section
  id="generacion-quiz"
  className="py-5 text-center"
  style={{
    padding: '50px 15px',
    backgroundImage: `url(${nosotrosBg})`,  // Imagen de fondo para la sección
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <div className="container" style={{ background: 'rgba(255, 255, 255, 0.85)', padding: '30px', borderRadius: '10px' }}>
    <motion.h2
      className="mb-4"
      style={{ fontSize: '32px', fontWeight: 'bold', color: '#001F3D' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FaClipboardList className="me-2" color="#001F3D" /> Generador de Quiz
    </motion.h2>
    <motion.p
      style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', color: '#333' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      En TutorIA, contamos con un generador de quizzes interactivo que te permite crear preguntas de opción múltiple, adaptadas al tema ingresado. Sigue estos pasos para empezar a crear tu propio quiz y poner a prueba tus conocimientos.
    </motion.p>
    <div className="row mt-4">
      {[{
        title: 'Generación Rápida',
        icon: <FaPlayCircle color="#ff6f61" />,
        img: generacionRapidaImg,
        text: 'Genera un quiz completo en minutos. Solo ingresa el tema y dale en Generar. Nuestro sistema se encarga del resto.'
      },
      {
        title: 'Revisión y Resultados',
        icon: <FaCheckCircle color="#001F3D" />,
        img: revisionImg,
        text: 'Al terminar, puedes revisar las respuestas correctas e incorrectas, y mejorar tu rendimiento.'
      }].map((item, index) => (
        <motion.div key={index} className="col-md-6" whileHover={{ scale: 1.05 }}>
          <div className="card shadow-sm p-3" style={{ border: '2px solid #001F3D', borderRadius: '10px' }}>
            <h4 className="mb-3" style={{ color: '#001F3D' }}>{item.icon} {item.title}</h4>
            <p style={{ color: '#333' }}>{item.text}</p>
            <img src={item.img} alt={item.title} className="img-fluid mt-3" style={{ maxHeight: '150px', objectFit: 'cover', borderRadius: '10px' }} />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
  {/* Cuadro adicional con detalles */}
  <div
    style={{
      backgroundColor: '#ffffff',
      padding: '30px',
      marginTop: '30px',
      borderRadius: '10px',
      boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
    }}
  >
    <h3 className="mb-4" style={{ color: '#001F3D', fontSize: '28px', fontWeight: 'bold' }}>
      ¿Por qué usar nuestro Generador de Quiz?
    </h3>
    <p style={{ fontSize: '18px', color: '#333' }}>
      Nuestro generador de quizzes te ayuda a mejorar tu aprendizaje de manera eficiente. Ya sea para repasar conceptos clave, prepararte para un examen o simplemente medir tu progreso, esta herramienta es perfecta para cualquier estudiante.
    </p>
    <a
      href="#quiz" // El enlace dirige a la sección de Quiz
      className="btn btn-primary mt-4"
      style={{
        padding: '12px 30px',
        fontSize: '18px',
        fontWeight: 'bold',
        textDecoration: 'none',
        borderRadius: '8px',
        backgroundColor: '#001F3D',
        color: 'white',
      }}
    >
      ¡Comienza tu Quiz Ahora!
    </a>
  </div>
</section>

      <section 
            id="beneficios" 
            className="py-5" 
            style={{ 
                backgroundImage: `url(${serviciosBg})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat' 
            }}
            >
            <div className="container">
                <motion.h2 
                className="text-center mb-5" 
                style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffffff' }} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }}
                >
                <FaTools style={{ fontSize: '30px', marginRight: '10px' }} />
                Nuestros Servicios
                </motion.h2>
                
                <motion.p 
                className="text-center mb-5" 
                style={{ fontSize: '18px', color: '#ffffff', lineHeight: '1.6' }}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1.5, delay: 0.2 }}
                >
                En nuestra plataforma, ofrecemos una variedad de servicios diseñados para mejorar tu experiencia de aprendizaje. Desde asesorías personalizadas hasta recursos educativos adaptados a tus necesidades, nuestra misión es brindarte las herramientas necesarias para que alcances tus metas. Además, contamos con un sistema de seguimiento de progreso y gestión de tareas, asegurando que te mantengas en el camino correcto hacia el éxito.
                </motion.p>
                
                <div className="row align-items-center justify-content-center">
                {/* Primer Card */}
                <motion.div 
                    className="col-12 col-md-3 mb-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="card shadow-lg" style={{ backgroundColor: '#ff6f61', color: 'white', borderRadius: '20px' }}>
                    <div className="card-body text-center p-4">
                        <FaBullseye style={{ fontSize: '27px' }} />
                        <h4 className="mt-3">Asesoría Personalizada</h4>
                        <p>Brindamos atención única y adaptada a las necesidades de cada estudiante.</p>
                    </div>
                    </div>
                </motion.div>

                {/* Segundo Card */}
                <motion.div 
                    className="col-12 col-md-3 mb-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <div className="card shadow-lg" style={{ backgroundColor: '#28a745', color: 'white', borderRadius: '20px' }}>
                    <div className="card-body text-center p-4">
                        <FaEye style={{ fontSize: '27px' }} />
                        <h4 className="mt-3">Recursos de Estudio</h4>
                        <p>Accede a materiales educativos diseñados a tu medida.</p>
                    </div>
                    </div>
                </motion.div>

                {/* Tercer Card */}
                <motion.div 
                    className="col-12 col-md-3 mb-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <div className="card shadow-lg" style={{ backgroundColor: '#343a40', color: 'white', borderRadius: '20px' }}>
                    <div className="card-body text-center p-4">
                        <FaHeart style={{ fontSize: '27px' }} />
                        <h4 className="mt-3">Seguimiento de Progreso</h4>
                        <p>Monitorea tu rendimiento y ajusta tu aprendizaje para avanzar.</p>
                    </div>
                    </div>
                </motion.div>

                {/* Cuarto Card */}
                <motion.div 
                    className="col-12 col-md-3 mb-4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <div className="card shadow-lg" style={{ backgroundColor: '#17a2b8', color: 'white', borderRadius: '20px' }}>
                    <div className="card-body text-center p-4">
                        <FaRegClipboard style={{ fontSize: '27px' }} />
                        <h4 className="mt-3">Gestión de Tareas</h4>
                        <p>Organiza y gestiona tus tareas y actividades de manera eficiente.</p>
                    </div>
                    </div>
                </motion.div>
                </div>
            </div>
            </section>

<section 
  id="galeria" 
  className="py-5 position-relative"
  style={{ 
    backgroundImage: `url(${nosotrosBg})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat', 
    backdropFilter: 'blur(5px)'
  }}
>
  <div className="container">
    <motion.h2 
      className="text-center mb-3 d-flex align-items-center justify-content-center"
      style={{ fontSize: '32px', fontWeight: 'bold', color: '#001F3D' }} 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <FaPhotoVideo style={{ fontSize: '30px', marginRight: '10px' }} />
      Galería de Imágenes
      <FaImages style={{ fontSize: '30px', marginLeft: '10px' }} />
    </motion.h2>

    {/* Descripción */}
    <p 
        className="text-center mb-5" 
        style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', color: '#333' }}
        >
        Explora nuestra colección de imágenes y visualiza momentos únicos de TutorIA en acción.  
        </p>


    <div className="row">
      {/* Plantilla de imágenes con efectos */}
      {[logo4, logo3, logo2, logo1].map((img, index) => (
        <motion.div 
          key={index}
          className="col-12 col-md-3 mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: index * 0.2 }}
        >
          <div 
            className="card shadow-lg overflow-hidden"
            style={{ backgroundColor: '#fff', borderRadius: '20px' }}
          >
            <motion.img 
              src={img}
              alt={`Imagen ${index + 1}`}
              className="card-img-top"
              style={{ 
                borderRadius: '10px', 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


{/* Sección Contacto - PowerMove con imagen de fondo */}
<section id="contacto" className="py-5 text-dark position-relative" style={{
  backgroundImage: `url(${require("./img/fondo_servicios.jpg")})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
}}>
  <div className="container position-relative" style={{ zIndex: 2 }}>
    <div className="row">
      {/* Columna Izquierda - Información */}
      <div className="col-md-5">
        <div className="p-4 border rounded shadow-sm bg-white bg-opacity-75">
          <h4 className="fw-bold text-primary">Ubicación</h4>
          <p className="mb-1">AV MARIANO OTERO 3365, VERDE VALLE</p>
          <p className="mb-1">GUADALAJARA, JALISCO 44550</p>
          
          <h5 className="mt-3 text-primary">Horarios</h5>
          <p className="mb-1">Lun - Vie: 09:00 - 18:00</p>
          <p className="mb-1">Sábado: 09:00 - 14:00</p>
          <p className="mb-3">Domingo: Cerrado</p>

          {/* Redes Sociales */}
          <a href="https://www.facebook.com/TU_PAGINA" target="_blank" rel="noopener noreferrer" className="me-3 text-dark">
            <i className="bi bi-facebook fs-4"></i>
          </a>
          <a href="https://www.instagram.com/TU_PAGINA" target="_blank" rel="noopener noreferrer" className="text-dark">
            <i className="bi bi-instagram fs-4"></i>
          </a>

          {/* Mapa ajustado a la ubicación */}
          <div className="mt-3">
            <iframe
              title="Ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.3310238565136!2d-103.40027912457335!3d20.65182520314859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ac14cfc3298f%3A0x7b4f2a473d243b5f!2sAv.%20Mariano%20Otero%203365%2C%20Verde%20Valle%2C%2044550%20Guadalajara%2C%20Jal.%2C%20M%C3%A9xico!5e0!3m2!1sen!2sus!4v1709161303453!5m2!1sen!2sus"
              width="100%" height="200" style={{ border: "0", borderRadius: "8px" }} allowFullScreen
            ></iframe>
          </div>

          {/* Teléfono */}
          <h5 className="mt-3 text-primary">Contáctanos</h5>
          <p className="mb-0">
            <i className="bi bi-whatsapp text-success"></i> 33-14-58-73-61
          </p>
        </div>
      </div>

      {/* Columna Derecha - Formulario (Movido a la derecha) */}
      <div className="col-md-6 offset-md-1">
        <h2 className="fw-bold text-primary">¿Necesitas mejorar tu Aprendizaje?</h2>
        <h4 className="mb-4 text-danger">¡TutorIA está aquí para ti!</h4>
        <p className="mb-4 text-white">
        En TutorIA, nuestro equipo de profesionales en inteligencia artificial y tecnología está listo para ayudarte a optimizar tu aprendizaje y alcanzar tus metas.
        </p>

        {/* Formulario */}
        <form className="p-4 border rounded-3 shadow-sm bg-white bg-opacity-75">
          <h5 className="mb-3 text-primary">Déjanos tu mensaje</h5>
          <p><strong>Email:</strong> contacto@tutoria.com</p>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Nombre" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Teléfono" required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Correo" required />
          </div>
          <div className="mb-3">
            <textarea className="form-control" rows="4" placeholder="Mensaje" required></textarea>
          </div>
          <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#007BFF", fontWeight: "bold" }}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

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
    </>
    
  );
}

export default Dashboard;
