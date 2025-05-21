import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink} from 'react-scroll';
import { Button, Form,Container, Row, Col, Card} from 'react-bootstrap';
import logo from './img/logo.png';
import img1 from './img/bi1.jpg';
import img2 from './img/bi2.jpg';
import img3 from './img/bi3.jpg';


function Inicio_Biblioteca() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Redirigir a la página de resultados con la query como parámetro
      navigate(`/biblioteca?query=${searchQuery}`);
    } else {
      alert('Por favor ingresa un término de búsqueda.');
    }
  };

  const libros = [
    {
      title: 'Don Quijote',
      author: 'Miguel de Cervantes',
      cover_url: 'https://cdn.kobo.com/book-images/392971e9-4f19-4827-a041-3abe4d0e1f54/1200/1200/False/don-quixote-111.jpg',
      gutenberg_link: 'https://www.gutenberg.org/cache/epub/2000/pg2000-images.html',
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      cover_url: 'https://raketcontent.com/1/pride_prejudice_13_145a576c7d.jpg',
      gutenberg_link: 'https://www.gutenberg.org/cache/epub/1342/pg1342-images.html'
    },
    {
      title: 'Frankenstein',
      author: 'Mary Shelley',
      cover_url: 'https://uvp.mx/uvpblog/wp-content/uploads/2022/12/Libro-recomendacion-biblioteca-uvp.jpg',
      gutenberg_link: 'https://www.gutenberg.org/cache/epub/84/pg84-images.html',
      
    },
    {
      title: 'Moby Dick',
      author: 'Herman Melville',
      cover_url: 'https://cdn.kobo.com/book-images/d987f1ed-7afa-4e26-85d6-f63655d84121/1200/1200/False/moby-dick-collins-classics.jpg',
      gutenberg_link: 'https://www.gutenberg.org/cache/epub/2701/pg2701-images.html',
    },
  ];

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div>
    {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light" style={{ padding: '0.75rem 1rem', backgroundColor: '#001F3D' }}>
            <div className="container-fluid d-flex justify-content-between">
                <Link to="/dashboard" className="navbar-brand d-flex align-items-center" style={{ fontSize: '24px', color: '#ffffff' }}>
                <img src={logo} alt="TutorIA Logo" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                TutorIA
                </Link>

    <div className="mx-auto my-lg-0 my-3 d-flex justify-content-center" style={{ width: '100%' }}>
      <div className="w-100" style={{ maxWidth: '680px' }}>
        <Form className="d-flex w-100">
          <Form.Control
            type="text"
            placeholder="Buscar libros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="me-2"
          />
          <Button variant="primary" onClick={handleSearch}>Buscar</Button>
        </Form>
      </div>
    </div>

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
          <button className="btn dropdown-toggle" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none' }} type="button">Opciones</button>
          {showDropdown && (
            <div className="dropdown-menu show">
              <Link to="/tasks" className="dropdown-item">Mis tareas</Link>
              <button onClick={handleLogout} className="dropdown-item">Salir</button>
            </div>
          )}
        </li>
        <li className="nav-item">
          <ScrollLink to="ayuda" smooth={true} duration={500} className="btn" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none' }}>
            Ayuda
          </ScrollLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div>
</div>

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


<section className="py-5 bg-light"style={{
  backgroundImage: `url(${require("./img/fondo_nosotros.jpg")})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
}}>
  <Container>
  <h2 className="text-center mb-4 text-black">
  <i className="bi bi-star-fill me-2"></i> Libros Populares
</h2>
<p className="text-center text-black" style={{ fontSize: '18px' }}>
  Explora los libros más leídos y valorados por nuestra comunidad.
</p>

    <Row className="d-flex justify-content-center">
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src="https://elaltavoz.mx/wp-content/uploads/2023/05/Libro-de-Dracula.jpg" style={{ height: '460px', objectFit: 'cover' }} />
          <Card.Body>
            <Card.Title>Dracula</Card.Title>
            <Card.Text>Bram Stoker</Card.Text>
            <Button variant="primary" href="https://www.gutenberg.org/cache/epub/345/pg345-images.html">Leer Ahora</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src="https://uvp.mx/uvpblog/wp-content/uploads/2022/12/Libro-recomendacion-biblioteca-uvp.jpg" style={{ height: '460px', objectFit: 'cover' }} />
          <Card.Body>
            <Card.Title>Frankenstein</Card.Title>
            <Card.Text>Mary Shelley</Card.Text>
            <Button variant="primary" href="https://www.gutenberg.org/cache/epub/84/pg84-images.html">Leer Ahora</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src="https://pendulo.com/imagenes_grandes/9788417/978841786013.GIF" style={{ height: '460px', objectFit: 'cover' }} />
          <Card.Body>
            <Card.Title>El Retrato de Dorian Gray</Card.Title>
            <Card.Text>Oscar Wilde</Card.Text>
            <Button variant="primary" href="https://www.gutenberg.org/cache/epub/174/pg174-images.html">Leer Ahora</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src="https://www.gutenberg.org/cache/epub/11/images/cover.jpg" style={{ height: '435px', objectFit: 'cover' }} />
          <Card.Body>
            <Card.Title>Alicia en el País de las Maravillas</Card.Title>
            <Card.Text>Lewis Carroll</Card.Text>
            <Button variant="primary" href="https://www.gutenberg.org/cache/epub/11/pg11-images.html">Leer Ahora</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</section>



      {/* Sección de libros destacados */}
<section className="py-5 bg-light" style={{
  backgroundImage: `url(${require("./img/fondo_servicios.jpg")})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
}}>
    <Container>
    <h2 className="text-center mb-4 text-white">
        <i className="bi bi-book-half me-2"></i> Libros Destacados
        </h2>
        <p className="text-center text-white"style={{ fontSize: '18px' }}>
        Descubre nuestras selecciones especiales de libros recomendados para expandir tu conocimiento.
        </p>

          <Row>
            {libros.map((libro, index) => {
              return (
                <Col md={3} key={index}>
                  <Card className="h-100">
                    <Card.Img 
                      variant="top" 
                      src={libro.cover_url} 
                      alt={`Portada de ${libro.title}`} 
                    />
                    <Card.Body>
                      <Card.Title>{libro.title}</Card.Title>
                      <Card.Text>Por {libro.author}</Card.Text>
                      <Button 
                        variant="primary" 
                        href={libro.gutenberg_link} 
                        target="_blank"
                      >
                        Leer Ahora
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>


<section className="py-5 bg-light" style={{
  backgroundImage: `url(${require("./img/fondo_nosotros.jpg")})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
}}>
  <Container>
        <h2 className="text-center mb-4 text-black">
        <i className="bi bi-book-fill me-2"></i> Libros de Estudio
        </h2>
        <p className="text-center text-black" style={{ fontSize: '18px' }}>
        Encuentra material académico de diversas disciplinas para tu aprendizaje.
        </p>

    <Row className="d-flex justify-content-start">
      
      {/* Libro Medicina */}
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src="https://m.media-amazon.com/images/I/41Jw9o+ytaL._AC_UF1000,1000_QL80_.jpg" style={{ height: '460px', objectFit: 'cover' }} />
          <Card.Body>
            <Card.Title>The Principles of Breeding</Card.Title>
            <Card.Text>S. L. Goodale</Card.Text>
            <Button variant="primary" href="https://www.gutenberg.org/cache/epub/21900/pg21900-images.html">Leer Ahora</Button>
          </Card.Body>
        </Card>
      </Col>

      {/* Libro Ingeniería */}
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src="https://m.media-amazon.com/images/I/719JrLywMvL._AC_UF1000,1000_QL80_.jpg" style={{ height: '460px', objectFit: 'cover' }} />
          <Card.Body>
            <Card.Title>Automata Old and New</Card.Title>
            <Card.Text>Conrad William Cooke</Card.Text>
            <Button variant="primary" href="https://www.gutenberg.org/cache/epub/55817/pg55817-images.html">Leer Ahora</Button>
          </Card.Body>
        </Card>
      </Col>

      {/* Libro Administración */}
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src="https://cdn.kobo.com/book-images/99604a7c-3c31-41c8-a096-0f0dba32e8f1/1200/1200/False/economic-philosophy-principles-of-political-economy-illustrated.jpg" style={{ height: '436px', objectFit: 'cover' }} />
          <Card.Body>
            <Card.Title>Principles of Political Economy</Card.Title>
            <Card.Text>John Stuart Mill</Card.Text>
            <Button variant="primary" href="https://www.gutenberg.org/cache/epub/30107/pg30107-images.html">Leer Ahora</Button>
          </Card.Body>
        </Card>
      </Col>

      {/* Libro Derecho */}
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src="https://m.media-amazon.com/images/I/71BNsfYVkDL._UF894,1000_QL80_.jpg" style={{ height: '460px', objectFit: 'cover' }} />
          <Card.Body>
            <Card.Title>The Common Law</Card.Title>
            <Card.Text>Oliver Wendell Holmes</Card.Text>
            <Button variant="primary" href="https://www.gutenberg.org/cache/epub/2449/pg2449-images.html">Leer Ahora</Button>
          </Card.Body>
        </Card>
      </Col>

    </Row>
  </Container>
</section>



<section id ="ayuda"
  className="py-5 bg-light" 
  style={{
    backgroundImage: `url(${require("./img/fondo_servicios.jpg")})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }}
>
  <div className="container">
    <h2 className="text-center mb-5 text-white fw-bold">🆘 Sección de Ayuda - TutorIA</h2>
    
    <p className="text-center text-white mb-5" style={{ fontSize: '18px' }}>
      En <strong>TutorIA</strong>, estamos comprometidos a brindarte la mejor experiencia posible. Si tienes alguna duda o dificultad, aquí te dejamos algunos consejos para resolver cualquier inconveniente.
    </p>

    {/* Primera Sección */}
    <div className="d-flex justify-content-center position-relative">
      {/* Barra lateral izquierda con ícono */}
      <div 
        className="position-absolute" 
        style={{
          left: '-50px', 
          top: '50px', 
          bottom: '50px', 
          width: '40px', 
          backgroundColor: '#17a2b8', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <i className="bi bi-book text-white" style={{ fontSize: '24px' }}></i>
      </div>

      <div className="card shadow-lg mb-4" style={{ width: '100%' }}>
        <div className="card-header bg-info text-white">
          <h4 className="card-title">📚 No Encuentras Tu Libro</h4>
        </div>
        <div className="card-body">
          <p>Si no encuentras un libro específico, intenta con estos métodos:</p>
          <ul className="list-unstyled">
            <li><i className="bi bi-check-circle text-success"></i> <strong>Revisa la ortografía del título:</strong> Asegúrate de que el título esté correctamente escrito.</li>
            <li><i className="bi bi-check-circle text-success"></i> <strong>Prueba con el título en inglés:</strong> Si no encuentras el libro en tú idioma, intenta buscarlo con su nombre en inglés.</li>
            <li><i className="bi bi-check-circle text-success"></i> <strong>Utiliza palabras clave:</strong> Intenta buscar utilizando palabras clave relacionadas con el título o autor.</li>
          </ul>
        </div>
      </div>

      {/* Barra lateral derecha con ícono */}
      <div 
        className="position-absolute" 
        style={{
          right: '-50px', 
          top: '50px', 
          bottom: '50px', 
          width: '40px', 
          backgroundColor: '#28a745', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <i className="bi bi-tools text-white" style={{ fontSize: '24px' }}></i>
      </div>
    </div>

    {/* Segunda Sección */}
    <div className="d-flex justify-content-center position-relative mt-4">
      {/* Barra lateral izquierda con ícono */}
      <div 
        className="position-absolute" 
        style={{
          left: '-50px', 
          top: '50px', 
          bottom: '50px', 
          width: '40px', 
          backgroundColor: '#17a2b8', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <i className="bi bi-hammer text-white" style={{ fontSize: '24px' }}></i> {/* Icono de herramienta */}
      </div>

      <div className="card shadow-lg mb-4" style={{ width: '100%' }}>
        <div className="card-header bg-warning text-dark">
          <h4 className="card-title">🛠️ Problemas Técnicos o de Acceso</h4>
        </div>
        <div className="card-body">
          <p>Si estás teniendo problemas con la plataforma, intenta lo siguiente:</p>
          <ul className="list-unstyled">
            <li><i className="bi bi-check-circle text-success"></i> <strong>Verifica tu conexión a Internet:</strong> Asegúrate de tener una conexión estable.</li>
            <li><i className="bi bi-check-circle text-success"></i> <strong>Limpiar caché y cookies:</strong> Borrar los datos de tu navegador puede ayudar.</li>
            <li><i className="bi bi-check-circle text-success"></i> <strong>Reinicia tu sesión:</strong> Cierra sesión y vuelve a iniciar sesión para resolver posibles problemas.</li>
          </ul>
        </div>
      </div>

      {/* Barra lateral derecha con ícono */}
      <div 
        className="position-absolute" 
        style={{
          right: '-50px', 
          top: '50px', 
          bottom: '50px', 
          width: '40px', 
          backgroundColor: '#ffc107', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <i className="bi bi-wrench text-white" style={{ fontSize: '24px' }}></i> {/* Icono de llave inglesa */}
      </div>
    </div>

    {/* Tercera Sección */}
    <div className="d-flex justify-content-center position-relative mt-4">
      {/* Barra lateral izquierda con ícono */}
      <div 
        className="position-absolute" 
        style={{
          left: '-50px', 
          top: '50px', 
          bottom: '50px', 
          width: '40px', 
          backgroundColor: '#17a2b8', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <i className="bi bi-phone text-white" style={{ fontSize: '24px' }}></i> {/* Icono de teléfono */}
      </div>

      <div className="card shadow-lg mb-4" style={{ width: '100%' }}>
        <div className="card-header bg-success text-white">
          <h4 className="card-title">📞 ¿Aún necesitas ayuda?</h4>
        </div>
        <div className="card-body">
          <p>Si después de seguir estos pasos sigues teniendo problemas, contáctanos:</p>
          <ul className="list-unstyled">
            <li><i className="bi bi-envelope-fill text-danger"></i> <strong>Correo electrónico:</strong> <a href="mailto:contacto@tutoria.com" className="text-decoration-none text-dark">contacto@tutoria.com</a></li>
            <li><i className="bi bi-chat-left-dots-fill text-danger"></i> <strong>Formulario de contacto:</strong> Disponibles en la sección de "Contacto" en el inicio de nuestro sitio web.</li>
          </ul>
        </div>
      </div>

      {/* Barra lateral derecha con ícono */}
      <div 
        className="position-absolute" 
        style={{
          right: '-50px', 
          top: '50px', 
          bottom: '50px', 
          width: '40px', 
          backgroundColor: '#28a745', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <i className="bi bi-chat-dots text-white" style={{ fontSize: '24px' }}></i> {/* Icono de chat */}
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
    </div>

    
  );
}

export default Inicio_Biblioteca;
