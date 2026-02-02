const API_URL = 'http://localhost:3000';

let usuarioActual = null;
let usuarios = [];
let tareas = [];
let filtroTareasActual = 'todas';

// Elementos del DOM
const adminNameSpan = document.getElementById('adminName');
const logoutBtn = document.getElementById('logoutBtn');
const sidebarBtns = document.querySelectorAll('.menu-btn');
const adminSections = document.querySelectorAll('.admin-section');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchUsuariosInput = document.getElementById('searchUsuarios');

// Inicializar
window.addEventListener('load', () => {
  verificarAutenticacion();
  cargarDatos();
  configurarEventos();
});

// Verificar autenticación y autorización
function verificarAutenticacion() {
  const usuarioSesion = localStorage.getItem('usuarioAutenticado');
  if (!usuarioSesion) {
    window.location.href = '../index.html';
    return;
  }
  usuarioActual = JSON.parse(usuarioSesion);
  
  // Verificar que sea admin
  if (usuarioActual.rol !== 'admin') {
    alert('Acceso denegado. Solo administradores pueden acceder.');
    window.location.href = './dashboard.html';
    return;
  }
  
  adminNameSpan.textContent = usuarioActual.nombre;
}

// Cargar todos los datos
async function cargarDatos() {
  try {
    const [usuariosRes, tareasRes] = await Promise.all([
      fetch(`${API_URL}/usuarios`),
      fetch(`${API_URL}/tareas`)
    ]);

    usuarios = await usuariosRes.json();
    tareas = await tareasRes.json();

    actualizarDashboard();
    renderizarUsuarios();
    renderizarTareas();
    cargarActividad();
  } catch (error) {
    console.error('Error cargando datos:', error);
  }
}

// Configurar eventos
function configurarEventos() {
  // Navegación sidebar
  sidebarBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const section = e.target.dataset.section;
      mostrarSeccion(section);
    });
  });

  // Filtros de tareas
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      filtroTareasActual = e.target.dataset.filter;
      renderizarTareas();
    });
  });

  // Búsqueda de usuarios
  searchUsuariosInput.addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    const usuariosFiltrados = usuarios.filter(u =>
      u.nombre.toLowerCase().includes(termino) ||
      u.email.toLowerCase().includes(termino)
    );
    mostrarUsuariosEnTabla(usuariosFiltrados);
  });

  logoutBtn.addEventListener('click', cerrarSesion);
}

// Mostrar sección
function mostrarSeccion(seccion) {
  sidebarBtns.forEach(btn => btn.classList.remove('active'));
  adminSections.forEach(sec => sec.classList.remove('active'));

  event.target.classList.add('active');
  document.getElementById(seccion).classList.add('active');
}

// Actualizar dashboard con estadísticas
function actualizarDashboard() {
  const totalUsuarios = usuarios.filter(u => u.rol === 'usuario').length;
  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter(t => t.estado === 'completada').length;
  const tasaCompletitud = totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;

  document.getElementById('totalUsuarios').textContent = totalUsuarios;
  document.getElementById('totalTareas').textContent = totalTareas;
  document.getElementById('tareasCompletadas').textContent = tareasCompletadas;
  document.getElementById('tasaCompletitud').textContent = tasaCompletitud + '%';
}

// Renderizar tabla de usuarios
function renderizarUsuarios() {
  mostrarUsuariosEnTabla(usuarios);
}

function mostrarUsuariosEnTabla(usuariosList) {
  const tbody = document.getElementById('usuariosTableBody');
  const usuariosNoAdmin = usuariosList.filter(u => u.rol !== 'admin');

  if (usuariosNoAdmin.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">No hay usuarios</td></tr>';
    return;
  }

  tbody.innerHTML = usuariosNoAdmin.map(usuario => `
    <tr>
      <td>${usuario.id}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td><span class="badge">${usuario.rol}</span></td>
      <td>${formatearFecha(usuario.fechaRegistro)}</td>
      <td>
        <button class="btn-info" onclick="verTareasUsuario('${usuario.id}', '${usuario.nombre}')">Ver Tareas</button>
        <button class="btn-danger" onclick="eliminarUsuarioAdmin('${usuario.id}')">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

// Renderizar tabla de tareas
function renderizarTareas() {
  const tareasFiltradas = tareas.filter(tarea => {
    if (filtroTareasActual === 'todas') return true;
    return tarea.estado === filtroTareasActual;
  });

  const tbody = document.getElementById('tareasTableBody');

  if (tareasFiltradas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">No hay tareas</td></tr>';
    return;
  }

  tbody.innerHTML = tareasFiltradas.map(tarea => {
    const usuario = usuarios.find(u => u.id === tarea.usuarioId);
    return `
      <tr>
        <td>${tarea.titulo}</td>
        <td>${usuario ? usuario.nombre : 'Desconocido'}</td>
        <td><span class="badge estado-${tarea.estado}">${tarea.estado}</span></td>
        <td><span class="badge prioridad-${tarea.prioridad}">${tarea.prioridad}</span></td>
        <td>${formatearFecha(tarea.fechaEntrega)}</td>
        <td>
          <button class="btn-info" onclick="verDetallesTarea('${tarea.id}')">Ver</button>
        </td>
      </tr>
    `;
  }).join('');
}

// Cargar actividad
async function cargarActividad() {
  const actividadList = document.getElementById('actividadList');
  
  // Simulamos actividad basada en datos
  const actividades = [];
  
  tareas.slice(-10).forEach(tarea => {
    const usuario = usuarios.find(u => u.id === tarea.usuarioId);
    actividades.push({
      mensaje: `${usuario?.nombre || 'Usuario'} creó la tarea "${tarea.titulo}"`,
      fecha: tarea.fechaCreacion
    });
  });

  if (actividades.length === 0) {
    actividadList.innerHTML = '<p>Sin actividad registrada</p>';
    return;
  }

  actividadList.innerHTML = actividades
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .map(act => `
      <div class="activity-item">
        <span class="activity-message">${act.mensaje}</span>
        <span class="activity-date">${formatearFecha(act.fecha)}</span>
      </div>
    `).join('');
}

// Ver tareas de un usuario
function verTareasUsuario(usuarioId, nombreUsuario) {
  const tareasUsuario = tareas.filter(t => t.usuarioId === usuarioId);
  alert(`${nombreUsuario} tiene ${tareasUsuario.length} tareas\n\n` +
    `Completadas: ${tareasUsuario.filter(t => t.estado === 'completada').length}\n` +
    `Pendientes: ${tareasUsuario.filter(t => t.estado === 'pendiente').length}`);
}

// Eliminar usuario (como admin)
async function eliminarUsuarioAdmin(usuarioId) {
  if (!confirm('¿Estás seguro de que quieres eliminar este usuario y todas sus tareas?')) return;

  try {
    // Eliminar todas las tareas del usuario
    const tareasUsuario = tareas.filter(t => t.usuarioId === usuarioId);
    for (const tarea of tareasUsuario) {
      await fetch(`${API_URL}/tareas/${tarea.id}`, { method: 'DELETE' });
    }

    // Eliminar usuario
    await fetch(`${API_URL}/usuarios/${usuarioId}`, { method: 'DELETE' });

    alert('Usuario eliminado');
    cargarDatos();
  } catch (error) {
    console.error('Error:', error);
    alert('Error al eliminar usuario');
  }
}

// Ver detalles de tarea
function verDetallesTarea(tareaId) {
  const tarea = tareas.find(t => t.id === tareaId);
  const usuario = usuarios.find(u => u.id === tarea.usuarioId);
  
  alert(`TAREA: ${tarea.titulo}\n\n` +
    `Usuario: ${usuario?.nombre}\n` +
    `Estado: ${tarea.estado}\n` +
    `Prioridad: ${tarea.prioridad}\n` +
    `Fecha Entrega: ${formatearFecha(tarea.fechaEntrega)}\n\n` +
    `Descripción: ${tarea.descripcion}`);
}

// Cerrar sesión
function cerrarSesion() {
  if (confirm('¿Cerrar sesión?')) {
    localStorage.removeItem('usuarioAutenticado');
    window.location.href = '../index.html';
  }
}

// Funciones auxiliares
function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-ES');
}
