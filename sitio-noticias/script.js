// ========================================
// DATOS DE NOTICIAS
// ========================================
const newsData = [
    {
        id: 1,
        title: "Apple presenta el iPhone 16 Pro Max",
        category: "tecnologia",
        image: "https://via.placeholder.com/400x300/667eea/ffffff?text=iPhone+16",
        excerpt: "Conoce las nuevas características y especificaciones del último buque insignia de Apple.",
        author: "Juan García",
        date: "2026-02-10",
        content: "Apple ha presentado el iPhone 16 Pro Max con un nuevo procesador A18 Pro, pantalla OLED más brillante y mejoras significativas en la cámara. El nuevo dispositivo llega con iOS 18 preinstalado y promete una autonomía mejorada de hasta 26 horas. El precio inicial es de $1,199.",
        featured: true
    },
    {
        id: 2,
        title: "Messi gana su 8º Balón de Oro",
        category: "deportes",
        image: "https://via.placeholder.com/400x300/764ba2/ffffff?text=Messi+Balon",
        excerpt: "El futbolista argentino rompe récords con su octavo Balón de Oro histórico.",
        author: "Carlos López",
        date: "2026-02-09",
        content: "Lionel Messi ha ganado su octavo Balón de Oro, rompiendo todos los récords previos. Esta distinción reconoce su excelente desempeño durante la temporada 2025-2026 con el Inter Miami CF.",
        featured: false
    },
    {
        id: 3,
        title: "Nueva reforma tributaria en discusión",
        category: "politica",
        image: "https://via.placeholder.com/400x300/fa8072/ffffff?text=Politica",
        excerpt: "El gobierno presenta una propuesta de reforma tributaria que afectará a grandes empresas.",
        author: "María González",
        date: "2026-02-08",
        content: "El gobierno ha presentado una nueva propuesta de reforma tributaria enfocada en aumentar la carga fiscal para las grandes corporaciones. Expertos analizan el impacto económico de estas medidas.",
        featured: false
    },
    {
        id: 4,
        title: "Avatar 4 bate récords de taquilla",
        category: "entretenimiento",
        image: "https://via.placeholder.com/400x300/20b2aa/ffffff?text=Avatar4",
        excerpt: "La película de James Cameron se convierte en la más taquillera del año.",
        author: "Pedro Ruiz",
        date: "2026-02-07",
        content: "Avatar 4, dirigida por James Cameron, ha roto todos los récords de taquilla, superando los 2.5 mil millones de dólares en todo el mundo. La película continúa en cines con una acogida histórica.",
        featured: false
    },
    {
        id: 5,
        title: "Tesla lanza Roadster 3",
        category: "tecnologia",
        image: "https://via.placeholder.com/400x300/ff6b9d/ffffff?text=Tesla",
        excerpt: "El nuevo superdeportivo eléctrico de Tesla llega con especificaciones revolucionarias.",
        author: "Juan García",
        date: "2026-02-06",
        content: "Tesla ha lanzado el esperado Roadster 3 con aceleración de 0-100 km/h en 1.9 segundos. El vehículo cuenta con nuevas tecnologías de batería y autonomía de hasta 1,000 km.",
        featured: false
    },
    {
        id: 6,
        title: "La selección gana amistoso 3-0",
        category: "deportes",
        image: "https://via.placeholder.com/400x300/ffd700/ffffff?text=Futbol",
        excerpt: "Goleada contundente en el amistoso preparatorio para el próximo torneo.",
        author: "Carlos López",
        date: "2026-02-05",
        content: "La selección nacional obtuvo una contundente victoria 3-0 ante un rival europeo en el amistoso de preparación. El equipo mostró un juego ofensivo y defensivo impresionante.",
        featured: false
    },
    {
        id: 7,
        title: "Cumbre internacional sobre cambio climático",
        category: "politica",
        image: "https://via.placeholder.com/400x300/90ee90/ffffff?text=Clima",
        excerpt: "Líderes mundiales se reúnen para discutir nuevos compromisos climáticos.",
        author: "María González",
        date: "2026-02-04",
        content: "En la cumbre internacional sobre cambio climático, más de 190 países se reunieron para discutir nuevos compromisos. Se espera un acuerdo histórico para reducir emisiones de carbono.",
        featured: false
    },
    {
        id: 8,
        title: "Oscar 2026: Los nominados ya están aquí",
        category: "entretenimiento",
        image: "https://via.placeholder.com/400x300/ff4500/ffffff?text=Oscars",
        excerpt: "Se reveló la lista oficial de nominados para la ceremonia de los Premios Óscar 2026.",
        author: "Pedro Ruiz",
        date: "2026-02-03",
        content: "La Academia de Cines de América ha revelado la lista oficial de nominados para los Premios Óscar 2026. Las películas de ciencia ficción y drama histórico dominan las categorías principales.",
        featured: false
    }
];

// ========================================
// ESTADO GLOBAL
// ========================================
let currentCarouselIndex = 0;
let currentCategory = "all";
let comments = {};
let isDarkMode = localStorage.getItem("darkMode") === "true";

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    initializeDarkMode();
    loadCarousel();
    loadArticles();
    setupEventListeners();
    loadComments();
});

// ========================================
// DARK MODE
// ========================================
function initializeDarkMode() {
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        document.getElementById("themeToggle").textContent = "☀️";
    }
}

document.getElementById("themeToggle").addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
    document.getElementById("themeToggle").textContent = isDarkMode ? "☀️" : "🌙";
});

// ========================================
// CARRUSEL
// ========================================
function loadCarousel() {
    const featured = newsData.filter(news => news.featured);
    const carouselItems = document.getElementById("carouselItems");
    const carouselDots = document.getElementById("carouselDots");
    
    carouselItems.innerHTML = featured.map(news => `
        <div class="carousel-item" data-id="${news.id}">
            <img src="${news.image}" alt="${news.title}">
            <div class="carousel-overlay">
                <h3>${news.title}</h3>
                <p>${news.excerpt}</p>
            </div>
        </div>
    `).join("");

    featured.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = `carousel-dot ${index === 0 ? "active" : ""}`;
        dot.onclick = () => goToCarouselSlide(index);
        carouselDots.appendChild(dot);
    });
}

function goToCarouselSlide(index) {
    const carouselItems = document.getElementById("carouselItems");
    carouselItems.style.transform = `translateX(-${index * 100}%)`;
    currentCarouselIndex = index;
    updateCarouselDots();
}

function nextCarouselSlide() {
    const featured = newsData.filter(news => news.featured);
    currentCarouselIndex = (currentCarouselIndex + 1) % featured.length;
    goToCarouselSlide(currentCarouselIndex);
}

function prevCarouselSlide() {
    const featured = newsData.filter(news => news.featured);
    currentCarouselIndex = (currentCarouselIndex - 1 + featured.length) % featured.length;
    goToCarouselSlide(currentCarouselIndex);
}

function updateCarouselDots() {
    document.querySelectorAll(".carousel-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentCarouselIndex);
    });
}

// ========================================
// CARGAR ARTÍCULOS
// ========================================
function loadArticles(filter = "all") {
    const articlesGrid = document.getElementById("articlesGrid");
    let filtered = newsData;

    if (filter !== "all") {
        filtered = newsData.filter(news => news.category === filter);
    }

    articlesGrid.innerHTML = filtered.map(news => `
        <div class="news-card ${news.featured ? 'featured-card' : ''}" data-id="${news.id}">
            ${news.featured ? '<span class="badge-new">DESTACADO</span>' : ''}
            <div class="news-card-image">
                <img src="${news.image}" alt="${news.title}">
            </div>
            <div class="news-card-content">
                <span class="news-card-category">${getCategoryLabel(news.category)}</span>
                <h3 class="news-card-title">${news.title}</h3>
                <p class="news-card-excerpt">${news.excerpt}</p>
                <div class="news-card-footer">
                    <div>
                        <p class="news-card-author">Por: ${news.author}</p>
                        <p class="news-card-date">${formatDate(news.date)}</p>
                    </div>
                </div>
                <button class="read-more-btn">Leer más</button>
            </div>
        </div>
    `).join("");

    addCardListeners();
}

// ========================================
// CATEGORÍAS
// ========================================
function getCategoryLabel(category) {
    const labels = {
        tecnologia: "Tecnología",
        deportes: "Deportes",
        politica: "Política",
        entretenimiento: "Entretenimiento"
    };
    return labels[category] || category;
}

// ========================================
// MODAL
// ========================================
function openArticleModal(articleId) {
    const article = newsData.find(a => a.id === articleId);
    if (!article) return;

    const modal = document.getElementById("articleModal");
    const modalArticle = document.getElementById("modalArticle");

    modalArticle.innerHTML = `
        <img src="${article.image}" alt="${article.title}" style="width: 100%; border-radius: 1rem; margin-bottom: 1.5rem;">
        <span class="news-card-category">${getCategoryLabel(article.category)}</span>
        <h1>${article.title}</h1>
        <div style="display: flex; gap: 1rem; margin: 1rem 0; color: #6b7280; font-size: 0.9rem;">
            <span>Por: ${article.author}</span>
            <span>${formatDate(article.date)}</span>
        </div>
        <p style="line-height: 1.8; font-size: 1.1rem;">${article.content}</p>
    `;

    modal.style.display = "flex";
    loadArticleComments(articleId);
}

function closeArticleModal() {
    document.getElementById("articleModal").style.display = "none";
}

// ========================================
// COMENTARIOS
// ========================================
function loadComments() {
    const saved = localStorage.getItem("newsComments");
    if (saved) {
        comments = JSON.parse(saved);
    }
}

function saveComments() {
    localStorage.setItem("newsComments", JSON.stringify(comments));
}

function loadArticleComments(articleId) {
    const commentsList = document.getElementById("commentsList");
    const articleComments = comments[articleId] || [];

    commentsList.innerHTML = articleComments.map((comment, index) => `
        <div class="comment">
            <strong>${comment.name}</strong>
            <small>${comment.date}</small>
            <p>${comment.text}</p>
        </div>
    `).join("");

    document.getElementById("submitComment").onclick = () => addComment(articleId);
}

function addComment(articleId) {
    const name = document.getElementById("commentName").value.trim();
    const text = document.getElementById("commentText").value.trim();

    if (!name || !text) {
        alert("Por favor completa todos los campos");
        return;
    }

    if (!comments[articleId]) {
        comments[articleId] = [];
    }

    comments[articleId].push({
        name,
        text,
        date: new Date().toLocaleDateString()
    });

    saveComments();
    document.getElementById("commentName").value = "";
    document.getElementById("commentText").value = "";
    loadArticleComments(articleId);
}

// ========================================
// BÚSQUEDA
// ========================================
document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const articlesGrid = document.getElementById("articlesGrid");
    
    if (!query) {
        loadArticles(currentCategory);
        return;
    }

    const filtered = newsData.filter(news =>
        news.title.toLowerCase().includes(query) ||
        news.excerpt.toLowerCase().includes(query) ||
        news.content.toLowerCase().includes(query)
    );

    articlesGrid.innerHTML = filtered.map(news => `
        <div class="news-card" data-id="${news.id}">
            <div class="news-card-image">
                <img src="${news.image}" alt="${news.title}">
            </div>
            <div class="news-card-content">
                <span class="news-card-category">${getCategoryLabel(news.category)}</span>
                <h3 class="news-card-title">${news.title}</h3>
                <p class="news-card-excerpt">${news.excerpt}</p>
                <div class="news-card-footer">
                    <div>
                        <p class="news-card-author">Por: ${news.author}</p>
                        <p class="news-card-date">${formatDate(news.date)}</p>
                    </div>
                </div>
                <button class="read-more-btn">Leer más</button>
            </div>
        </div>
    `).join("");

    addCardListeners();
});

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
    // Carrusel
    document.getElementById("nextBtn").addEventListener("click", nextCarouselSlide);
    document.getElementById("prevBtn").addEventListener("click", prevCarouselSlide);

    // Navegación
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            currentCategory = link.dataset.section || "all";
            loadArticles(currentCategory);
        });
    });

    // Filtro de categorías
    document.getElementById("categoryFilter").addEventListener("change", (e) => {
        currentCategory = e.target.value;
        loadArticles(currentCategory);
    });

    // Modal
    document.getElementById("articleModal").addEventListener("click", (e) => {
        if (e.target.id === "articleModal") closeArticleModal();
    });

    document.querySelector(".modal-close").addEventListener("click", closeArticleModal);

    // Agregar listeners a tarjetas
    addCardListeners();

    // Auto-scroll del carrusel cada 5 segundos
    setInterval(() => {
        const featured = newsData.filter(news => news.featured);
        if (featured.length > 1) nextCarouselSlide();
    }, 5000);
}

function addCardListeners() {
    document.querySelectorAll(".news-card").forEach(card => {
        card.addEventListener("click", () => {
            const id = parseInt(card.dataset.id);
            openArticleModal(id);
        });
    });
}

// ========================================
// UTILIDADES
// ========================================
function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
}

// ========================================
// SITIO COMPLETADO EXITOSAMENTE
// ========================================
console.log("✅ NewsHub cargado correctamente");
