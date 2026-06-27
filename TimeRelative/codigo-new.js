// ========== CONFIGURACIÓN DE ZONAS HORARIAS ==========
const timezones = {
     'colombia': { id: 'time-colombia', offset: -5, name: 'América/Bogotá' },
     'usa': { id: 'time-usa', offset: -5, name: 'América/New_York' },
     'brasil': { id: 'time-brasil', offset: -3, name: 'América/Sao_Paulo' },
     'canada': { id: 'time-canada', offset: -5, name: 'América/Toronto' },
     'uk': { id: 'time-uk', offset: 0, name: 'Europa/Londres' },
     'japan': { id: 'time-japan', offset: 9, name: 'Asia/Tokio' },
     'australia': { id: 'time-australia', offset: 10, name: 'Australia/Sydney' },
     'india': { id: 'time-india', offset: 5.5, name: 'Asia/Kolkata' }
};

// ========== FUNCIÓN PARA ACTUALIZAR HORAS ==========
function updateTime() {
     const now = new Date();

     // Fecha principal
     const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long'
     };

     const timePrincipal = document.getElementById('time-principal');
     const datePrincipal = document.getElementById('date-principal');

     // Hora principal
     if (timePrincipal) {
          timePrincipal.textContent = now.toLocaleTimeString('es-ES', {
               hour: 'numeric',
               minute: '2-digit',
               second: '2-digit',
               hour12: true
          });
     }

     // Fecha principal
     if (datePrincipal) {
          datePrincipal.textContent = now.toLocaleDateString('es-ES', options);
     }

     // Actualizar zonas horarias
     for (const [key, value] of Object.entries(timezones)) {
          const timeString = getTimeInTimezone(now, value.offset);
          const element = document.getElementById(value.id);

          if (element) {
               element.textContent = timeString;
          }
     }
}

// Función para obtener hora en una zona horaria específica
function getTimeInTimezone(date, offset) {
     const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
     const newDate = new Date(utc + (3600000 * offset));

     return newDate.toLocaleTimeString('es-ES', {
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
     });
}

// Actualizar tiempo cada segundo
setInterval(updateTime, 1000);
updateTime();
// ========== CALCULADORA ==========
const calculatorDisplay = document.getElementById('calculator-display');
const calcButtons = document.querySelectorAll('.calc-btn');
let calculatorExpression = '';

function updateCalculatorDisplay() {
     if (!calculatorDisplay) return;
     calculatorDisplay.textContent = calculatorExpression || '0';
}

function evaluateExpression(expression) {
     try {
          const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
          const validExpression = /^[\d.+\-*/() ]+$/.test(sanitized);
          if (!validExpression) {
               return 'Error';
          }
          const result = Function(`"use strict"; return (${sanitized})`)();
          return Number.isFinite(result) ? result.toString() : 'Error';
     } catch (error) {
          return 'Error';
     }
}

if (calculatorDisplay) {
     calcButtons.forEach((button) => {
          button.addEventListener('click', () => {
               const value = button.dataset.value;
               const action = button.dataset.action;

               if (action === 'clear') {
                    calculatorExpression = '';
                    updateCalculatorDisplay();
                    return;
               }

               if (action === 'backspace') {
                    calculatorExpression = calculatorExpression.slice(0, -1);
                    updateCalculatorDisplay();
                    return;
               }

               if (action === 'calculate') {
                    calculatorExpression = evaluateExpression(calculatorExpression);
                    updateCalculatorDisplay();
                    return;
               }

               if (value !== undefined) {
                    calculatorExpression += value;
                    updateCalculatorDisplay();
               }
          });
     });
}

// ========== CLIMA ==========
const weatherDescriptions = {
     0: 'Despejado',
     1: 'Mayormente despejado',
     2: 'Parcialmente nublado',
     3: 'Nublado',
     45: 'Niebla',
     48: 'Escarcha',
     51: 'Llovizna ligera',
     53: 'Llovizna moderada',
     55: 'Llovizna intensa',
     61: 'Lluvia ligera',
     63: 'Lluvia moderada',
     65: 'Lluvia fuerte',
     71: 'Nieve ligera',
     73: 'Nieve moderada',
     75: 'Nieve fuerte',
     80: 'Chubascos',
     95: 'Tormenta',
     96: 'Tormenta con granizo',
     99: 'Tormenta severa'
};

function getWeatherIcon(code) {
     const icons = {
          0: '☀️',
          1: '🌤️',
          2: '⛅',
          3: '☁️',
          45: '🌫️',
          48: '🌫️',
          51: '🌦️',
          61: '🌧️',
          71: '🌨️',
          80: '🌦️',
          95: '⛈️',
          96: '⛈️',
          99: '⛈️'
     };
     return icons[code] || '🌤️';
}

function renderWeatherResult(content) {
     const weatherResult = document.getElementById('weather-result');
     if (weatherResult) {
          weatherResult.innerHTML = content;
     }
}

async function loadWeatherByCity(city) {
     const weatherResult = document.getElementById('weather-result');
     if (!weatherResult) return;

     renderWeatherResult('<p class="weather-loading">Buscando el clima...</p>');

     try {
          const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`);
          const geoData = await geoResponse.json();

          if (!geoData.results?.length) {
               renderWeatherResult('<p class="weather-error">No encontramos esa ciudad.</p>');
               return;
          }

          const location = geoData.results[0];
          loadWeatherByCoords(location.latitude, location.longitude, location.name, location.country);
     } catch (error) {
          renderWeatherResult('<p class="weather-error">No se pudo obtener el clima en este momento.</p>');
     }
}

async function loadWeatherByCoords(latitude, longitude, locationName = 'Tu ubicación', countryName = '') {
     const weatherResult = document.getElementById('weather-result');
     if (!weatherResult) return;

     renderWeatherResult('<p class="weather-loading">Consultando el clima...</p>');

     try {
          const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&language=es`);
          const weatherData = await weatherResponse.json();
          const current = weatherData.current;
          const weatherCode = current.weather_code;
          const temperature = Math.round(current.temperature_2m);
          const feelsLike = Math.round(current.apparent_temperature);
          const humidity = current.relative_humidity_2m;
          const wind = Math.round(current.wind_speed_10m);

          renderWeatherResult(`
               <div class="weather-content">
                    <div class="weather-main">
                         <div>
                              <p class="weather-location">${locationName}${countryName ? `, ${countryName}` : ''}</p>
                              <p class="weather-temp">${temperature}°C</p>
                              <p>${weatherDescriptions[weatherCode] || 'Clima variable'}</p>
                         </div>
                         <div class="weather-icon">${getWeatherIcon(weatherCode)}</div>
                    </div>
                    <div class="weather-meta">
                         <div><strong>Sensación</strong>${feelsLike}°C</div>
                         <div><strong>Humedad</strong>${humidity}%</div>
                         <div><strong>Viento</strong>${wind} km/h</div>
                    </div>
               </div>
          `);
     } catch (error) {
          renderWeatherResult('<p class="weather-error">No se pudo obtener el clima en este momento.</p>');
     }
}

const cityInput = document.getElementById('city-input');
const btnSearchWeather = document.getElementById('btn-search-weather');

if (btnSearchWeather && cityInput) {
     btnSearchWeather.addEventListener('click', () => {
          const city = cityInput.value.trim();
          if (city) {
               loadWeatherByCity(city);
          }
     });

     cityInput.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
               const city = cityInput.value.trim();
               if (city) {
                    loadWeatherByCity(city);
               }
          }
     });
}

if (navigator.geolocation && document.getElementById('weather-result')) {
     navigator.geolocation.getCurrentPosition(
          (position) => {
               loadWeatherByCoords(position.coords.latitude, position.coords.longitude);
          },
          () => {
               loadWeatherByCity('Bogotá');
          }
     );
}

// ========== SISTEMA DE NOTAS ==========
const btnAddNote = document.getElementById('btn-add-note');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

// Cargar notas almacenadas
function loadNotes() {
     const saved = localStorage.getItem('notes');
     return saved ? JSON.parse(saved) : [];
}

// Guardar notas
function saveNotes(notes) {
     localStorage.setItem('notes', JSON.stringify(notes));
}

// Mostrar todas las notas
function displayNotes() {
     if (!notesList) return;

     const notes = loadNotes();
     notesList.innerHTML = '';
     
     notes.forEach((note, index) => {
          const li = document.createElement('li');
          li.className = 'note-item';
          
          const noteDate = new Date(note.date);
          const dateString = noteDate.toLocaleDateString('es-ES', {
               month: 'short',
               day: 'numeric',
               hour: '2-digit',
               minute: '2-digit'
          });
          
          li.innerHTML = `
               <button class="btn-delete-note" data-index="${index}">✕</button>
               <p class="note-text">${note.text}</p>
               <p class="note-date">${dateString}</p>
          `;
          
          li.querySelector('.btn-delete-note').addEventListener('click', () => deleteNote(index));
          notesList.appendChild(li);
     });
}

// Agregar nota
function addNote() {
     const text = noteInput.value.trim();
     if (text === '') {
          alert('Por favor escribe una nota');
          return;
     }
     
     const notes = loadNotes();
     notes.unshift({
          text: text,
          date: new Date().toISOString()
     });
     
     saveNotes(notes);
     noteInput.value = '';
     displayNotes();
}

// Eliminar nota
function deleteNote(index) {
     const notes = loadNotes();
     notes.splice(index, 1);
     saveNotes(notes);
     displayNotes();
}

if (btnAddNote) {
     btnAddNote.addEventListener('click', addNote);
}

if (noteInput) {
     noteInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') addNote();
     });
}

displayNotes(); // Mostrar notas al cargar

// ========== GALERÍA DE IMÁGENES ==========
const imageInput = document.getElementById('image-input');
const galleryGrid = document.getElementById('gallery-grid');

// Cargar imágenes almacenadas
function loadGalleryImages() {
     const saved = localStorage.getItem('gallery-images');
     return saved ? JSON.parse(saved) : [];
}

// Guardar imágenes
function saveGalleryImages(images) {
     localStorage.setItem('gallery-images', JSON.stringify(images));
}

// Mostrar galería
function displayGalleryImages() {
     if (!galleryGrid) return;

     const images = loadGalleryImages();
     galleryGrid.innerHTML = '';
     
     images.forEach((image, index) => {
          const div = document.createElement('div');
          div.className = 'gallery-item';
          div.innerHTML = `
               <img src="${image}" alt="Imagen ${index + 1}">
               <button class="btn-delete-image" data-index="${index}">✕</button>
          `;
          
          div.querySelector('.btn-delete-image').addEventListener('click', () => deleteImage(index));
          galleryGrid.appendChild(div);
     });
}

// Agregar imágenes
function handleImageUpload(e) {
     const files = Array.from(e.target.files);
     const images = loadGalleryImages();
     
     files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (event) => {
               images.push(event.target.result);
               saveGalleryImages(images);
               displayGalleryImages();
          };
          reader.readAsDataURL(file);
     });
}

// Eliminar imagen
function deleteImage(index) {
     const images = loadGalleryImages();
     images.splice(index, 1);
     saveGalleryImages(images);
     displayGalleryImages();
}

if (imageInput) {
     imageInput.addEventListener('change', handleImageUpload);
}

// Drag and drop para galería
const galleryUpload = document.querySelector('.gallery-upload');
if (galleryUpload) {
     const preventDefaults = (e) => {
          e.preventDefault();
          e.stopPropagation();
     };

     ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
          galleryUpload.addEventListener(eventName, preventDefaults, false);
     });

     ['dragenter', 'dragover'].forEach((eventName) => {
          galleryUpload.addEventListener(eventName, () => {
               galleryUpload.style.background = 'rgba(0, 113, 227, 0.1)';
          });
     });

     ['dragleave', 'drop'].forEach((eventName) => {
          galleryUpload.addEventListener(eventName, () => {
               galleryUpload.style.background = '';
          });
     });

     galleryUpload.addEventListener('drop', (e) => {
          const dt = e.dataTransfer;
          const files = dt?.files;
          if (imageInput && files && files.length) {
               const dataTransfer = new DataTransfer();
               Array.from(files).forEach((file) => dataTransfer.items.add(file));
               imageInput.files = dataTransfer.files;
               const event = new Event('change', { bubbles: true });
               imageInput.dispatchEvent(event);
          }
     });
}

displayGalleryImages(); // Mostrar imágenes al cargar

// ========== CALENDARIO ==========
const btnPrevMonth = document.getElementById('btn-prev-month');
const btnNextMonth = document.getElementById('btn-next-month');
const calendarMonth = document.getElementById('calendar-month');
const calendarGrid = document.getElementById('calendar-grid');

let currentDate = new Date();

// Nombres de meses
const monthNames = [
     'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Nombres de días
const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function generateCalendar() {
     if (!calendarMonth || !calendarGrid) return;

     const year = currentDate.getFullYear();
     const month = currentDate.getMonth();
     
     // Actualizar título
     calendarMonth.textContent = `${monthNames[month]} ${year}`;
     
     // Agregar encabezados de días
     calendarGrid.innerHTML = '';
     
     // Agregar nombres de días
     dayNames.forEach(day => {
          const dayHeader = document.createElement('div');
          dayHeader.style.fontWeight = 'bold';
          dayHeader.style.textAlign = 'center';
          dayHeader.style.padding = '0.5rem';
          dayHeader.textContent = day;
          calendarGrid.appendChild(dayHeader);
     });
     
     // Obtener primer día del mes y número de días
     const firstDay = new Date(year, month, 1).getDay();
     const daysInMonth = new Date(year, month + 1, 0).getDate();
     const daysInPrevMonth = new Date(year, month, 0).getDate();
     
     // Días del mes anterior (grises)
     for (let i = firstDay - 1; i >= 0; i--) {
          const div = createCalendarDay(daysInPrevMonth - i, true);
          calendarGrid.appendChild(div);
     }
     
     // Días del mes actual
     const today = new Date();
     for (let day = 1; day <= daysInMonth; day++) {
          const div = createCalendarDay(day, false);
          
          if (year === today.getFullYear() && 
              month === today.getMonth() && 
              day === today.getDate()) {
               div.classList.add('today');
          }
          
          calendarGrid.appendChild(div);
     }
     
     // Días del próximo mes (grises)
     const remainingDays = 42 - (firstDay + daysInMonth);
     for (let day = 1; day <= remainingDays; day++) {
          const div = createCalendarDay(day, true);
          calendarGrid.appendChild(div);
     }
}

function createCalendarDay(day, isOtherMonth) {
     const div = document.createElement('div');
     div.className = 'calendar-day';
     if (isOtherMonth) {
          div.classList.add('other-month');
     } else {
          div.classList.add('active');
     }
     div.textContent = day;
     return div;
}

if (btnPrevMonth && btnNextMonth) {
     btnPrevMonth.addEventListener('click', () => {
          currentDate.setMonth(currentDate.getMonth() - 1);
          generateCalendar();
     });

     btnNextMonth.addEventListener('click', () => {
          currentDate.setMonth(currentDate.getMonth() + 1);
          generateCalendar();
     });
}

generateCalendar(); // Generar calendario inicial

// ========== INICIALIZAR ==========
console.log('✅ TimeRelative cargado correctamente');
