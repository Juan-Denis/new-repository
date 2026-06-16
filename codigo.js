// ============================================
// NAVEGACION DEL DASHBOARD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const sectionTitle = document.getElementById('section-title');
    const sectionSubtitle = document.getElementById('section-subtitle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    // Títulos de secciones
    const sectionTitles = {
        dashboard: { title: 'Dashboard', subtitle: 'Control central de tu desarrollo' },
        tareas: { title: 'Mis Tareas', subtitle: 'Gestiona tus tareas pendientes' },
        proyectos: { title: 'Mis Proyectos', subtitle: 'Mantén seguimiento de tus proyectos' },
        estadisticas: { title: 'Estadísticas', subtitle: 'Analiza tu progreso y productividad' }
    };

    // Navegación entre secciones
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionName = link.dataset.section;

            // Remover clase active de todos
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Agregar clase active
            link.classList.add('active');
            document.getElementById(sectionName + '-section').classList.add('active');

            // Actualizar título
            sectionTitle.textContent = sectionTitles[sectionName].title;
            sectionSubtitle.textContent = sectionTitles[sectionName].subtitle;

            // Cerrar sidebar en móvil
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Toggle sidebar en móvil
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Cerrar sidebar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.sidebar') && !e.target.closest('.sidebar-toggle')) {
                sidebar.classList.remove('active');
            }
        }
    });
});

// ============================================
// LISTA DE TAREAS
// ============================================

// Arreglo para guardar las tareas
let tareas = [];
let filtroActual = 'todas';

// Elementos del DOM
const inputTarea = document.getElementById('inputTarea');
const btnAgregar = document.getElementById('btnAgregar');
const listaTareas = document.getElementById('listaTareas');
const contPendientes = document.getElementById('contPendientes');
const contCompletadas = document.getElementById('contCompletadas');
const btnLimpiar = document.getElementById('btnLimpiar');
const fechaElement = document.getElementById('fecha');
const botonesFiltero = document.querySelectorAll('.filtro-btn');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    cargarTareas();
    mostrarFecha();
    renderizarTareas();
    actualizarContadores();
});

// Mostrar la fecha actual
function mostrarFecha() {
    const fecha = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    fechaElement.textContent = fecha.toLocaleDateString('es-ES', opciones);
}

// Agregar nueva tarea
btnAgregar.addEventListener('click', agregarTarea);
inputTarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

function agregarTarea() {
    const texto = inputTarea.value.trim();

    if (texto === '') {
        alert('Por favor, escribe una tarea');
        return;
    }

    const nuevaTarea = {
        id: Date.now(),
        texto: texto,
        completada: false,
        fechaCreacion: new Date().toLocaleDateString('es-ES')
    };

    tareas.unshift(nuevaTarea);
    guardarTareas();
    renderizarTareas();
    actualizarContadores();
    inputTarea.value = '';
    inputTarea.focus();
}

// Renderizar las tareas en el DOM
function renderizarTareas() {
    listaTareas.innerHTML = '';

    let tareasFiltradas = tareas;

    if (filtroActual === 'pendientes') {
        tareasFiltradas = tareas.filter(t => !t.completada);
    } else if (filtroActual === 'completadas') {
        tareasFiltradas = tareas.filter(t => t.completada);
    }

    if (tareasFiltradas.length === 0) {
        listaTareas.innerHTML = '<li class="sin-tareas">No hay tareas aquí</li>';
        return;
    }

    tareasFiltradas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = `tarea ${tarea.completada ? 'completada' : ''}`;
        li.innerHTML = `
            <div class="tarea-content">
                <input 
                    type="checkbox" 
                    class="checkbox-tarea" 
                    ${tarea.completada ? 'checked' : ''}
                    data-id="${tarea.id}"
                >
                <span class="texto-tarea">${tarea.texto}</span>
                <small class="fecha-tarea">${tarea.fechaCreacion}</small>
            </div>
            <button class="btn-eliminar" data-id="${tarea.id}">🗑️</button>
        `;

        // Evento para marcar como completada
        li.querySelector('.checkbox-tarea').addEventListener('change', (e) => {
            toggleCompletada(tarea.id);
        });

        // Evento para eliminar
        li.querySelector('.btn-eliminar').addEventListener('click', () => {
            eliminarTarea(tarea.id);
        });

        listaTareas.appendChild(li);
    });
}

// Marcar como completada/pendiente
function toggleCompletada(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        guardarTareas();
        renderizarTareas();
        actualizarContadores();
    }
}

// Eliminar una tarea
function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    guardarTareas();
    renderizarTareas();
    actualizarContadores();
}

// Eliminar todas las completadas
btnLimpiar.addEventListener('click', () => {
    if (confirm('¿Eliminar todas las tareas completadas?')) {
        tareas = tareas.filter(t => !t.completada);
        guardarTareas();
        renderizarTareas();
        actualizarContadores();
    }
});

// Filtrar tareas
botonesFiltero.forEach(btn => {
    btn.addEventListener('click', (e) => {
        botonesFiltero.forEach(b => b.classList.remove('activo'));
        e.target.classList.add('activo');
        filtroActual = e.target.dataset.filtro;
        renderizarTareas();
    });
});

// Actualizar contadores
function actualizarContadores() {
    const pendientes = tareas.filter(t => !t.completada).length;
    const completadas = tareas.filter(t => t.completada).length;
    const total = tareas.length;
    const porcentaje = total === 0 ? 0 : Math.round((completadas / total) * 100);

    contPendientes.textContent = pendientes;
    contCompletadas.textContent = completadas;

    // Actualizar stats del dashboard
    actualizarStatsDashboard();
}

// Actualizar stats del dashboard
function actualizarStatsDashboard() {
    const pendientes = tareas.filter(t => !t.completada).length;
    const completadas = tareas.filter(t => t.completada).length;
    const total = tareas.length;
    const porcentaje = total === 0 ? 0 : Math.round((completadas / total) * 100);

    const statProyectos = document.getElementById('stat-proyectos');
    const statTareas = document.getElementById('stat-tareas');
    const statCompletadas = document.getElementById('stat-completadas');
    const statPorcentaje = document.getElementById('stat-porcentaje');

    if (statProyectos) statProyectos.textContent = '2'; // 2 proyectos activos
    if (statTareas) statTareas.textContent = total;
    if (statCompletadas) statCompletadas.textContent = completadas;
    if (statPorcentaje) statPorcentaje.textContent = porcentaje + '%';
}

// LOCALSTORAGE - Guardar tareas
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// LOCALSTORAGE - Cargar tareas
function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
    } else {
        tareas = [];
    }
}