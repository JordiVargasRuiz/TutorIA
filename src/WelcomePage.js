import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; 
import { FaImages, FaPhotoVideo, FaTools, FaBullseye, FaEye, FaHeart, FaUsers } from 'react-icons/fa';
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
import visionImg from './img/vision.jpg';
import misionImg from './img/mision.jpg';
import valoresImg from './img/valor.jpg';
import nosotrosBg from './img/fondo_nosotros.jpg';
import serviciosBg from './img/fondo_servicios.jpg';
import Chatbot from "./Chatbot";

function WelcomePage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
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

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ padding: '0.75rem 1rem', backgroundColor: '#001F3D' }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center" style={{ fontSize: '24px', color: '#ffffff' }}>
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
                <Link to="/" className="btn" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none' }}>
                  Inicio
                </Link>
              </li>

              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="btn dropdown-toggle" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none' }} type="button">
                  Acceder
                </button>
                {showDropdown && (
                  <div className="dropdown-menu show" style={{ marginTop: '0px' }}>
                    <Link to="/login" className="dropdown-item" style={{ color: '#001F3D' }}>Iniciar sesión</Link>
                    <Link to="/signup" className="dropdown-item" style={{ color: '#001F3D' }}>Registrarse</Link>
                  </div>
                )}
              </li>

              <li className="nav-item">
                  <ScrollLink to="nosotros" smooth={true} duration={500} className="btn" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none', cursor: 'pointer' }}>
                    Nosotros
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
    backdropFilter: 'blur(5px)' // Desenfoque del fondo
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
    </>
  );
}

export default WelcomePage;
