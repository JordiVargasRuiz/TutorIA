import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { firestore } from './firebase';
import { Link,  useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; 
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';  
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography, Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import { Edit, Delete, CheckCircle, Circle } from '@mui/icons-material';
import logo from './img/logo.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import backgroundImage from "./img/fondo_nosotros2.jpg";

const Task = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [nota, setNota] = useState('');
  const [notasGuardadas, setNotasGuardadas] = useState([]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  const handleNotaChange = (event) => {
    setNota(event.target.value);
  };

  const handleGuardarNota = () => {
    if (nota.trim()) {
      setNotasGuardadas([...notasGuardadas, nota]);
      setNota('');
    }
  };

  const auth = getAuth();

  const fetchTasks = async () => {
    setLoading(true);
    const user = auth.currentUser;

    if (user) {
      try {
        const tasksRef = collection(firestore, `users/${user.uid}/tasks`);
        const querySnapshot = await getDocs(tasksRef);
        const tasksData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, 
        }));
        setTasks(tasksData);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
      }
    }
    setLoading(false);
  };

  const handleAddTask = async () => {
    const user = auth.currentUser;

    if (user && taskDescription.trim() !== '' && taskDueDate.trim() !== '') {
      try {
        const task = {
          description: taskDescription,
          dueDate: taskDueDate,
          priority: taskPriority || 'low',
          completed: false,
        };

        const tasksRef = collection(firestore, `users/${user.uid}/tasks`);
        await addDoc(tasksRef, task);
        setTaskDescription('');
        setTaskDueDate('');
        setTaskPriority('low');
        fetchTasks(); 
      } catch (error) {
        console.error('Error al agregar tarea:', error);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const handleToggleTask = async (taskId, currentStatus) => {
    const user = auth.currentUser;

    if (user) {
      try {
        const taskDoc = doc(firestore, `users/${user.uid}/tasks/${taskId}`);
        await updateDoc(taskDoc, {
          completed: !currentStatus, 
        });
        fetchTasks(); 
      } catch (error) {
        console.error('Error al actualizar tarea:', error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const taskDoc = doc(firestore, `users/${user.uid}/tasks/${taskId}`);
        await deleteDoc(taskDoc);
        setEditingTask(null);
        setTaskDescription('');
        setTaskDueDate('');
        setTaskPriority('low');
        fetchTasks();
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
      }
    }
  };
  
  

  const handleCancelEdit = () => {
    setEditingTask(null);
    setTaskDescription('');
    setTaskDueDate('');
    setTaskPriority('low');
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskDescription(task.description);
    setTaskDueDate(task.dueDate);
    setTaskPriority(task.priority);
  };
  

  const handleSaveEdit = async () => {
    const user = auth.currentUser;

    if (user && taskDescription.trim() !== '' && taskDueDate.trim() !== '') {
      try {
        const taskDoc = doc(firestore, `users/${user.uid}/tasks/${editingTask.id}`);
        await updateDoc(taskDoc, {
          description: taskDescription,
          dueDate: taskDueDate,
          priority: taskPriority,
        });
        setEditingTask(null); 
        setTaskDescription('');
        setTaskDueDate('');
        setTaskPriority('low');
        fetchTasks(); 
      } catch (error) {
        console.error('Error al editar tarea:', error);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        fetchTasks(); 
      }
    });

    return () => unsubscribe(); 
  }, [auth]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
<div
  className="d-flex flex-column min-vh-100"
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
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
                    <Link to="/perfil" className="dropdown-item">Mi perfil</Link>
                    <button onClick={handleLogout} className="dropdown-item">Salir</button>
                  </div>
                )}
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

    
<div style={{
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '100px',
  width: '100%',
  marginTop: '40px',
  justifyContent: 'center',
  padding: '0 20px',
}}>
  {/* Contenedor izquierdo con el formulario de tareas */}
  <div style={{
  flex: '1 1 100%', maxWidth: '600px', minWidth: '280px', 
  display: 'flex', justifyContent: 'center', 
  marginBottom: '20px',
}}>
  <div style={{ width: '100%' }}>
    <Typography variant="h4" gutterBottom style={{ fontWeight: '600', color: '#333', textAlign: 'center' }}>
      <i className="bi bi-clipboard-check" style={{ marginRight: '10px' }}></i> Mis Tareas
    </Typography>

    {/* Formulario para agregar o editar una tarea */}
    <div style={{ marginBottom: '25px' }}>
      <TextField
        label="Descripción de la tarea"
        variant="outlined"
        fullWidth
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        style={{ marginBottom: '15px' }}
        size="medium"
        InputProps={{
          style: { borderRadius: '8px' },
        }}
      />
      <TextField
        label="Fecha de vencimiento"
        type="date"
        variant="outlined"
        fullWidth
        value={taskDueDate}
        onChange={(e) => setTaskDueDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: '15px' }}
        size="medium"
        InputProps={{
          style: { borderRadius: '8px' },
        }}
      />
      <FormControl fullWidth style={{ marginBottom: '15px' }} size="medium">
        <InputLabel>Prioridad</InputLabel>
        <Select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          label="Prioridad"
          size="medium"
          style={{ borderRadius: '8px' }}
        >
          <MenuItem value="low">Baja</MenuItem>
          <MenuItem value="medium">Media</MenuItem>
          <MenuItem value="high">Alta</MenuItem>
        </Select>
      </FormControl>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {editingTask ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveEdit}
              fullWidth
              size="medium"
              style={{
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                textTransform: 'none',
                fontWeight: '600',
                '&:hover': {
                  backgroundColor: '#45a049',
                },
              }}
            >
              <i className="bi bi-pencil-square" style={{ marginRight: '10px' }}></i> Guardar cambios
            </Button>

            {/* Botón para cancelar la edición */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelEdit}
              fullWidth
              size="medium"
              style={{
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: '#f44336',
                color: '#fff',
                textTransform: 'none',
                fontWeight: '600',
                '&:hover': {
                  backgroundColor: '#e53935',
                },
              }}
            >
              <i className="bi bi-x-circle" style={{ marginRight: '10px' }}></i> Cancelar
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            fullWidth
            size="medium"
            style={{
              borderRadius: '8px',
              padding: '10px',
              backgroundColor: '#00796b',
              color: '#fff',
              textTransform: 'none',
              fontWeight: '600',
              '&:hover': {
                backgroundColor: '#004d40',
              },
            }}
          >
            <i className="bi bi-plus-circle" style={{ marginRight: '10px' }}></i> Agregar Tarea
          </Button>
        )}
      </div>
    </div>

      {/* Mostrar la lista de tareas con scroll cuando se exceda el tamaño */}
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {tasks.length === 0 ? (
          <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center', fontStyle: 'italic' }}>
            <i className="bi bi-check-circle" style={{ marginRight: '5px' }}></i> No tienes tareas.
          </Typography>
        ) : (
          <List>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                dense
                style={{ backgroundColor: '#f4f4f4', marginBottom: '10px', borderRadius: '8px' }}
              >
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id, task.completed)}
                  icon={<Circle />}
                  checkedIcon={<CheckCircle />}
                  style={{ marginRight: 10 }}
                />
                <ListItemText
                  primary={task.description}
                  secondary={`Fecha: ${new Date(task.dueDate).toLocaleDateString()} - Prioridad: ${task.priority}`}
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: '#555',
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleDeleteTask(task.id)} style={{ color: '#e57373' }}>
                    <i className="bi bi-trash" style={{ fontSize: '18px' }}></i>
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleEditTask(task)} style={{ color: '#ffb74d' }}>
                    <i className="bi bi-pencil-square" style={{ fontSize: '18px' }}></i>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  </div>

  {/* Contenedor para el progreso */}
  <div style={{
    flex: '1 1 100%', maxWidth: '600px', minWidth: '280px', 
    display: 'flex', justifyContent: 'center',
  }}>
    <div style={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom style={{ fontWeight: '600', color: '#333', textAlign: 'center' }}>
        <i className="bi bi-bar-chart-line" style={{ marginRight: '10px' }}></i> Progreso
      </Typography>
      <CircularProgress variant="determinate" value={progressPercentage} style={{ marginLeft: 'calc(50% - 20px)' }} />
      <Typography variant="body2" color="textSecondary" style={{ marginLeft: 'calc(50% - 40px)' }}>
        {`${progressPercentage}% completado`}
      </Typography>

      {/* Tareas Urgentes */}
      <div style={{ marginTop: '30px' }}>
        <Typography variant="h6" gutterBottom style={{ fontWeight: '600', color: '#333' }}>
          <i className="bi bi-exclamation-circle" style={{ marginRight: '10px' }}></i> Tareas Urgentes
        </Typography>
        {tasks.filter((task) => task.priority === 'high').length === 0 ? (
          <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center', fontStyle: 'italic' }}>
            No hay tareas urgentes.
          </Typography>
        ) : (
          <List>
            {tasks.filter((task) => task.priority === 'high').map((task) => (
              <ListItem key={task.id} style={{ backgroundColor: '#FFEBEE', marginBottom: '10px', borderRadius: '8px' }}>
                <ListItemText primary={task.description} />
              </ListItem>
            ))}
          </List>
        )}
      </div>

      {/* Estadísticas */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: '600', color: '#333' }}>
            <i className="bi bi-list-task" style={{ marginRight: '3px' }}></i> Total de Tareas
          </Typography>
          <Typography variant="h4">{tasks.length}</Typography>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: '600', color: '#333' }}>
            <i className="bi bi-check-circle" style={{ marginRight: '3px' }}></i> Tareas Completadas
          </Typography>
          <Typography variant="h4">{tasks.filter((task) => task.completed).length}</Typography>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: '600', color: '#333' }}>
            <i className="bi bi-clock" style={{ marginRight: '3px' }}></i> Tareas Pendientes
          </Typography>
          <Typography variant="h4">{tasks.filter((task) => !task.completed).length}</Typography>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
      <Typography variant="h6" gutterBottom style={{ fontWeight: '600', color: '#333' }}>
        <i className="bi bi-pencil" style={{ marginRight: '10px' }}></i> Notas Rápidas
      </Typography>

      <TextField
        label="Escribe una nota..."
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={nota}
        onChange={handleNotaChange}
        style={{ marginBottom: '15px' }}
      />

      <Button
        variant="contained"
        color="secondary"
        onClick={handleGuardarNota}
        style={{
          width: '100%',
          borderRadius: '8px',
          padding: '10px',
          backgroundColor: '#F44336',
          color: '#fff',
          textTransform: 'none',
          fontWeight: '600',
          '&:hover': {
            backgroundColor: '#e53935',
          },
        }}
      >
        <i className="bi bi-save" style={{ marginRight: '10px' }}></i> Guardar Nota
      </Button>

      {/* Mostrar las notas guardadas */}
      {notasGuardadas.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" style={{ fontWeight: '600', color: '#333' }}>
            Notas Guardadas
          </Typography>
          <List>
            {notasGuardadas.map((nota, index) => (
              <ListItem key={index} style={{ backgroundColor: '#f4f4f4', marginBottom: '10px', borderRadius: '8px' }}>
                <ListItemText primary={nota} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
    </div>
  </div>
</div>

  {/* Footer */}
  <footer
    style={{
      backgroundColor: '#001F3D',
      color: '#ffffff',
      padding: '20px 0',
      textAlign: 'center',
      position: 'relative',
      width: '100%',
      marginTop: '40px',
    }}
  >
    <p>&copy; 2025 TutorIA. Todos los derechos reservados.</p>
    <div>
      <Link to="/privacy-policy" style={{ color: '#ffffff', textDecoration: 'none', margin: '0 15px' }}>
        Política de privacidad
      </Link>
      <Link to="/terms" style={{ color: '#ffffff', textDecoration: 'none', margin: '0 15px' }}>
        Términos y condiciones
      </Link>
    </div>
  </footer>

</div>


  );
};

export default Task;
