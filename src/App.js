import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Dashboard from './Dashboard';
import GeneradorEnsayo from './GeneradorEnsayo';
import Biblioteca from './Biblioteca';
import Tasks from './Task';
import Inicio_Biblioteca from './Inicio_Biblioteca';
import QuizForm from './QuizForm';
import ResumenTexto from './ResumenTexto';
import GeneradorDeCitaAPA from './GeneradorDeCitaAPA';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generador" element={<GeneradorEnsayo />} />
        <Route path="/inicio" element={<Inicio_Biblioteca />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/quiz" element={<QuizForm />} />
        <Route path="/resumen" element={<ResumenTexto />} />
        <Route path="/cita" element={<GeneradorDeCitaAPA />} />
      </Routes>
    </Router>
  );
};

export default App;
