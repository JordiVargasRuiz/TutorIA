import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link,  useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; 
import backgroundImage from "./img/fondo_nosotros2.jpg";
import logo from './img/logo.png';

const Biblioteca = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setError('');

      const fetchBooks = async () => {
        try {
          const response = await fetch(`https://backend-tutoria-biblioteca.onrender.com/buscar_libros/?query=${query}`);
          
          if (!response.ok) {
            throw new Error('Error al buscar los libros');
          }

          const data = await response.json();
          setBooks(data.books);
        } catch (err) {
          setError('Hubo un problema al realizar la búsqueda. Intenta de nuevo.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBooks();
    }
  }, [query]);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
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
                <button className="btn dropdown-toggle" style={{ backgroundColor: '#001F3D', color: '#ffffff', padding: '0.35rem 0.75rem', fontSize: '18px', border: 'none' }} type="button" aria-label="Opciones">Opciones</button>
                {showDropdown && (
                  <div className="dropdown-menu show">
                    <Link to="/tasks" className="dropdown-item">Mis tareas</Link>
                    <button onClick={handleLogout} className="dropdown-item">Salir</button>
                  </div>
                )}
              </li>
          </ul>
        </div>
      </div>
    </nav>
  
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: 'white' }}>
  {/* Título de la página */}
  <div className="container py-5 text-center">
    <h1 className="display-4 mb-4 position-relative" style={{ fontWeight: 'bold', color: '#212529', textShadow: '3px 3px 8px rgba(0, 0, 0, 0.5)' }}>
      <i className="fas fa-search mb-2" style={{ fontSize: '50px', color: '#ff8c00' }}></i>
      Resultados de Búsqueda
      <div className="position-absolute top-100 start-50 translate-middle-x" style={{
        width: '60px',
        height: '4px',
        backgroundColor: '#ff8c00',
        borderRadius: '10px',
        marginTop: '10px',
        animation: 'pulse 1.5s infinite'
      }}></div>
    </h1>
    <p className="lead mb-4" style={{ fontSize: '1.2rem', fontWeight: '400', textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)' }}>
        Aquí están los libros que coinciden con tu búsqueda: <strong>"{query}"</strong>. Explora, descarga y disfruta de la lectura.
    </p>
  </div>

  {/* Contenido Principal */}
  <div className="container mt-4 flex-grow-1">
    {isLoading && (
      <div className="text-center">
        <div className="spinner-border text-black" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )}

    {error && <div className="alert alert-danger">{error}</div>}

    {books.length > 0 ? (
      <div>
        <h2 className="text-dark mb-4"><i className="fas fa-book-open"></i> Resultados:</h2>
        <div className="row">
          {books.map((book, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-lg border-0 rounded-3 overflow-hidden position-relative" style={{ transition: 'transform 0.3s ease', height: '100%' }}>
                <img
                  src={book.cover_url || 'https://via.placeholder.com/150'}
                  alt={book.title}
                  className="card-img-top"
                  style={{ maxHeight: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text"><strong>Autor:</strong> {book.author}</p>
                  <p className="card-text"><strong>Idioma:</strong> {book.language}</p>

                  {/* Enlaces de descarga */}
                  <h6 className="mt-2"><strong>Descargar:</strong></h6>
                  <div className="btn-group-vertical w-100">
                    {book.download_link_epub_noimages && (
                      <a href={book.download_link_epub_noimages} target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning mb-2">
                        <i className="fas fa-book-reader"></i> EPUB (sin imágenes)
                      </a>
                    )}
                    {book.download_link_epub_full && (
                      <a href={book.download_link_epub_full} target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning mb-2">
                        <i className="fas fa-book-open"></i> EPUB (completo)
                      </a>
                    )}
                    {book.download_link_html && (
                      <a href={book.download_link_html} target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning mb-2">
                        <i className="fas fa-file-code"></i> HTML
                      </a>
                    )}
                    {book.download_link_mobi && (
                      <a href={book.download_link_mobi} target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning mb-2">
                        <i className="fas fa-mobile-alt"></i> MOBI
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      !isLoading && !error && <p className="text-center text-dark">No se encontraron libros.</p>
    )}
  </div>
</div>

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

export default Biblioteca;
