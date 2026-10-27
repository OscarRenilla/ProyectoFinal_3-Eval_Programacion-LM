const IMG_BASE = "img/";
const IMG_DEFAULT = "https://placehold.co/400x220/eaf4ff/1a6ab1?text=Sin+imagen";
const STORAGE_KEY = "concesionario_tarjetas";

const TARJETAS_INICIALES = [
    { id: 1, titulo: "Hyundai", texto: "Hyundai i30 — compacto y eficiente", imagen: "hyundai_i30.webp" },
    { id: 2, titulo: "Peugeot", texto: "Peugeot 5008 7 plazas — espacio familiar", imagen: "peugeot_5008.jpg" },
    { id: 3, titulo: "Toyota", texto: "Toyota Yaris Cross Hybrid — económico y ecológico", imagen: "Interior-Toyota-Yaris-Cross.webp" },
    { id: 4, titulo: "Dacia", texto: "Dacia Duster 2024 — aventura asequible", imagen: "dacia-duster.webp" },
    { id: 5, titulo: "Toyota", texto: "Toyota C-HR 2025 — diseño atrevido", imagen: "Toyota-C-hr.webp" },
    { id: 6, titulo: "Seat", texto: "Seat León — referente español", imagen: "seat-leon.webp" },
    { id: 7, titulo: "Abarth", texto: "Abarth 124 Spider — deportivo italiano", imagen: "Abarth.jpg" },
    { id: 8, titulo: "Cadillac", texto: "Cadillac clásico rojo — elegancia americana", imagen: "Cadillac.jpg" },
    { id: 9, titulo: "Jeep", texto: "Jeep Wrangler — leyenda del todoterreno", imagen: "jeep_wrangler_1.jpg" },
    { id: 10, titulo: "Rolls-Royce", texto: "Rolls-Royce Phantom — lujo sin límites", imagen: "RollsRoyce.jpg" },
    { id: 11, titulo: "F1", texto: "Coche de Fórmula 1 — velocidad pura", imagen: "F1.jpg" },
    { id: 12, titulo: "Pagani", texto: "Pagani Huayra — obra de arte sobre ruedas", imagen: "pagani_koenigsegg.jpg" },
    { id: 13, titulo: "Bugatti", texto: "Bugatti Chiron — hipercoche legendario", imagen: "bugatti-chiron.jpg" },
    { id: 14, titulo: "Range Rover", texto: "Range Rover Evoque — lujo todoterreno", imagen: "range-rover.avif" },
    { id: 15, titulo: "Porsche", texto: "Porsche 911 GT3 — deportividad sin concesiones", imagen: "porsche.jpg" },
    { id: 16, titulo: "Lamborghini", texto: "Lamborghini Vision GT — futuro hecho realidad", imagen: "Lamborghini-vision-gt.webp" },
    { id: 17, titulo: "Lamborghini", texto: "Lamborghini Urus — SUV de altas prestaciones", imagen: "Lamborghini-Urus.jpg" },
    { id: 18, titulo: "Porsche", texto: "Porsche Vision GT — concepto futurista", imagen: "porsche-vision.avif" }
];

const modalCrear = new bootstrap.Modal(document.getElementById("modalCrear"));
const modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
const modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
const modalTema = new bootstrap.Modal(document.getElementById("modalTema"));

let nuevaImagenCrearBase64 = null;
let nuevaImagenEdicionBase64 = null;

function getModal(id) {
    const el = document.getElementById(id);
    return bootstrap.Modal.getOrCreateInstance(el);
}

function obtenerTarjetasStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(TARJETAS_INICIALES));
        return JSON.parse(JSON.stringify(TARJETAS_INICIALES));
    }
    try {
        const parsed = JSON.parse(data);
        if (!Array.isArray(parsed) || parsed.length === 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(TARJETAS_INICIALES));
            return JSON.parse(JSON.stringify(TARJETAS_INICIALES));
        }
        return parsed;
    } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(TARJETAS_INICIALES));
        return JSON.parse(JSON.stringify(TARJETAS_INICIALES));
    }
}

function guardarTarjetasStorage(tarjetas) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarjetas));
}

function resolverUrlImagen(imagen) {
    if (!imagen) return IMG_DEFAULT;
    if (imagen.startsWith("data:") || imagen.startsWith("http://") || imagen.startsWith("https://")) {
        return imagen;
    }
    return `${IMG_BASE}${imagen}`;
}

document.addEventListener("DOMContentLoaded", () => {
    cargarTarjetas();
    registrarEventos();
});

function registrarEventos() {
    document.getElementById("btnBuscar").addEventListener("click", buscarTarjetas);
    document.getElementById("buscador").addEventListener("keyup", (e) => {
        if (e.key === "Enter") buscarTarjetas();
    });

    document.getElementById("btnReset").addEventListener("click", () => {
        document.getElementById("buscador").value = "";
        cargarTarjetas();
    });

    document.getElementById("btnCrear").addEventListener("click", crearTarjeta);
    document.getElementById("btnGuardarEdicion").addEventListener("click", guardarEdicion);
    document.getElementById("btnConfirmarEliminar").addEventListener("click", confirmarEliminar);

    const inputNuevoImg = document.getElementById("nuevoImagen");
    if (inputNuevoImg) {
        inputNuevoImg.addEventListener("change", (e) => {
            const file = e.target.files && e.target.files[0];
            const preview = document.getElementById("nuevoPreview");
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    nuevaImagenCrearBase64 = evt.target.result;
                    if (preview) {
                        preview.src = nuevaImagenCrearBase64;
                        preview.classList.remove("d-none");
                    }
                };
                reader.readAsDataURL(file);
            } else {
                nuevaImagenCrearBase64 = null;
                if (preview) preview.classList.add("d-none");
            }
        });
    }

    const inputEditarImg = document.getElementById("editarImagenFile");
    if (inputEditarImg) {
        inputEditarImg.addEventListener("change", (e) => {
            const file = e.target.files && e.target.files[0];
            const preview = document.getElementById("editarPreview");
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    nuevaImagenEdicionBase64 = evt.target.result;
                    if (preview) {
                        preview.src = nuevaImagenEdicionBase64;
                        preview.classList.remove("d-none");
                    }
                };
                reader.readAsDataURL(file);
            } else {
                nuevaImagenEdicionBase64 = null;
            }
        });
    }

    document.getElementById("selectorTema").addEventListener("change", (e) => {
        const tema = e.target.value;
        if (tema === "claro") aplicarTemaClaro();
        else if (tema === "oscuro") aplicarTemaOscuro();
        else if (tema === "personalizado") modalTema.show();
    });

    document.getElementById("btnAplicarTema").addEventListener("click", () => {
        const colorNav = document.getElementById("colorNavbar").value;
        const colorBg = document.getElementById("colorMain").value;
        const colorCard = document.getElementById("colorTarjeta").value;

        document.querySelector(".galeria-navbar").style.background = colorNav;
        document.querySelector(".galeria-footer").style.background = colorNav;
        document.querySelector(".galeria-main").style.background = colorBg;
        document.documentElement.style.setProperty("--nav-fondo", colorNav);
        document.documentElement.style.setProperty("--main-fondo", colorBg);
        document.documentElement.style.setProperty("--tarjeta-fondo", colorCard);

        modalTema.hide();
        mostrarToast("Tema personalizado aplicado", "success");
    });
}

function cargarTarjetas() {
    const loading = document.getElementById("loading");
    if (loading) loading.classList.remove("d-none");
    document.getElementById("galeria").innerHTML = "";
    document.getElementById("sinResultados").classList.add("d-none");

    const tarjetas = obtenerTarjetasStorage();
    renderizarTarjetas(tarjetas);
    if (loading) loading.classList.add("d-none");
}

function buscarTarjetas() {
    const texto = document.getElementById("buscador").value.trim().toLowerCase();
    if (!texto) {
        cargarTarjetas();
        return;
    }

    const loading = document.getElementById("loading");
    if (loading) loading.classList.remove("d-none");
    document.getElementById("galeria").innerHTML = "";

    const tarjetas = obtenerTarjetasStorage();
    const filtradas = tarjetas.filter((t) =>
        (t.titulo && t.titulo.toLowerCase().includes(texto)) ||
        (t.texto && t.texto.toLowerCase().includes(texto))
    );

    renderizarTarjetas(filtradas);
    if (loading) loading.classList.add("d-none");
}

function renderizarTarjetas(tarjetas) {
    const galeria = document.getElementById("galeria");
    galeria.innerHTML = "";

    if (!tarjetas || tarjetas.length === 0) {
        document.getElementById("sinResultados").classList.remove("d-none");
        return;
    }
    document.getElementById("sinResultados").classList.add("d-none");

    tarjetas.forEach((t, i) => {
        const urlImagen = resolverUrlImagen(t.imagen);

        const col = document.createElement("div");
        col.className = "col";

        const card = document.createElement("div");
        card.className = "tarjeta tarjeta-animar h-100";
        card.style.animationDelay = `${i * 0.05}s`;
        card.style.opacity = "0";
        card.innerHTML = `
            <div class="tarjeta-img-wrapper">
                <img src="${urlImagen}" alt="${escaparHTML(t.titulo)}" class="tarjeta-img" onerror="this.src='${IMG_DEFAULT}'">
            </div>
            <div class="tarjeta-body">
                <div class="tarjeta-id">#${t.id}</div>
                <div class="tarjeta-titulo">${escaparHTML(t.titulo)}</div>
                <div class="tarjeta-texto">${escaparHTML(t.texto)}</div>
                <div class="tarjeta-acciones">
                    <button class="btn btn-editar" onclick="abrirEditar(${t.id})">
                        <i class="bi bi-pencil me-1"></i>Editar
                    </button>
                    <button class="btn btn-eliminar" onclick="abrirEliminar(${t.id}, '${escaparAttr(t.titulo)}')">
                        <i class="bi bi-trash3 me-1"></i>Borrar
                    </button>
                </div>
            </div>`;

        col.appendChild(card);
        galeria.appendChild(col);
    });
}

function crearTarjeta() {
    const titulo = document.getElementById("nuevoTitulo").value.trim();
    const texto = document.getElementById("nuevoTexto").value.trim();
    const imagen = nuevaImagenCrearBase64 || "";

    if (!titulo || !texto) {
        mostrarToast("El título y la descripción son obligatorios", "danger");
        return;
    }

    const tarjetas = obtenerTarjetasStorage();
    const maxId = tarjetas.reduce((max, t) => (Number(t.id) > max ? Number(t.id) : max), 0);
    const nueva = {
        id: maxId + 1,
        titulo,
        texto,
        imagen
    };

    tarjetas.push(nueva);
    guardarTarjetasStorage(tarjetas);

    document.getElementById("nuevoTitulo").value = "";
    document.getElementById("nuevoTexto").value = "";
    const inputImg = document.getElementById("nuevoImagen");
    if (inputImg) inputImg.value = "";
    nuevaImagenCrearBase64 = null;
    const preview = document.getElementById("nuevoPreview");
    if (preview) preview.classList.add("d-none");

    modalCrear.hide();
    mostrarToast("Tarjeta creada correctamente", "success");
    cargarTarjetas();
}

function abrirEditar(id, titulo, texto, imagen) {
    const tarjetas = obtenerTarjetasStorage();
    const tarjeta = tarjetas.find((t) => Number(t.id) === Number(id)) || { id, titulo, texto, imagen };

    document.getElementById("editarId").value = tarjeta.id;
    document.getElementById("editarTitulo").value = tarjeta.titulo || "";
    document.getElementById("editarTexto").value = tarjeta.texto || "";
    document.getElementById("editarImagen").value = tarjeta.imagen || "";
    nuevaImagenEdicionBase64 = null;

    const inputImg = document.getElementById("editarImagenFile");
    if (inputImg) inputImg.value = "";

    const preview = document.getElementById("editarPreview");
    if (tarjeta.imagen) {
        preview.src = resolverUrlImagen(tarjeta.imagen);
        preview.classList.remove("d-none");
    } else {
        preview.classList.add("d-none");
    }

    modalEditar.show();
}

function guardarEdicion() {
    const id = Number(document.getElementById("editarId").value);
    const titulo = document.getElementById("editarTitulo").value.trim();
    const texto = document.getElementById("editarTexto").value.trim();
    const imagenPrevia = document.getElementById("editarImagen").value;
    const imagen = nuevaImagenEdicionBase64 !== null ? nuevaImagenEdicionBase64 : imagenPrevia;

    if (!titulo || !texto) {
        mostrarToast("El título y la descripción son obligatorios", "danger");
        return;
    }

    const tarjetas = obtenerTarjetasStorage();
    const index = tarjetas.findIndex((t) => Number(t.id) === id);
    if (index !== -1) {
        tarjetas[index] = {
            ...tarjetas[index],
            titulo,
            texto,
            imagen
        };
        guardarTarjetasStorage(tarjetas);
    }

    modalEditar.hide();
    mostrarToast("Tarjeta actualizada correctamente", "success");
    cargarTarjetas();
}

function abrirEliminar(id, titulo) {
    document.getElementById("eliminarId").value = id;
    document.getElementById("eliminarNombre").textContent = titulo;
    modalEliminar.show();
}

function confirmarEliminar() {
    const id = Number(document.getElementById("eliminarId").value);
    let tarjetas = obtenerTarjetasStorage();
    tarjetas = tarjetas.filter((t) => Number(t.id) !== id);
    guardarTarjetasStorage(tarjetas);

    modalEliminar.hide();
    mostrarToast("Tarjeta eliminada", "success");
    cargarTarjetas();
}

function aplicarTemaClaro() {
    document.documentElement.style.setProperty("--nav-fondo", "#1a6ab1");
    document.documentElement.style.setProperty("--main-fondo", "#eaf4ff");
    document.documentElement.style.setProperty("--tarjeta-fondo", "#ffffff");
    document.documentElement.style.setProperty("--color-footer", "#1a6ab1");
    document.querySelector(".galeria-navbar").style.background = "";
    document.querySelector(".galeria-footer").style.background = "";
    document.querySelector(".galeria-main").style.background = "";
}

function aplicarTemaOscuro() {
    document.documentElement.style.setProperty("--nav-fondo", "#1c1c2e");
    document.documentElement.style.setProperty("--main-fondo", "#16213e");
    document.documentElement.style.setProperty("--tarjeta-fondo", "#0f3460");
    document.documentElement.style.setProperty("--color-footer", "#1c1c2e");
    document.documentElement.style.setProperty("--texto-primary-color", "#e2e8f0");
    document.documentElement.style.setProperty("--texto-gris", "#94a3b8");
    document.querySelector(".galeria-navbar").style.background = "#1c1c2e";
    document.querySelector(".galeria-footer").style.background = "#1c1c2e";
    document.querySelector(".galeria-main").style.background = "#16213e";
}

function mostrarToast(mensaje, tipo) {
    const toastEl = document.getElementById("toastMensaje");
    const toastTxt = document.getElementById("toastTexto");
    toastTxt.textContent = mensaje;
    toastEl.className = `toast align-items-center text-white border-0 bg-${tipo}`;
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
}

function escaparHTML(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function escaparAttr(str) {
    return String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

window.restablecerCatalogo = function () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(TARJETAS_INICIALES));
    cargarTarjetas();
    mostrarToast("Catálogo restablecido al estado original", "info");
};
