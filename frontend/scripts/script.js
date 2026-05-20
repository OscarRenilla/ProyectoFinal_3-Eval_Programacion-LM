const API_URL = "http://localhost:8080/tarjetas";
const IMG_BASE = "http://localhost:8080/img/";
const IMG_DEFAULT = "https://placehold.co/400x220/eaf4ff/1a6ab1?text=Sin+imagen";

const modalCrear = new bootstrap.Modal(document.getElementById("modalCrear"));
const modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
const modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
const modalTema = new bootstrap.Modal(document.getElementById("modalTema"));

function getModal(id) {
    const el = document.getElementById(id);
    return bootstrap.Modal.getOrCreateInstance(el);
};

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

async function cargarTarjetas() {
    document.getElementById("loading").classList.remove("d-none");
    document.getElementById("galeria").innerHTML = "";
    document.getElementById("sinResultados").classList.add("d-none");

    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Error al conectar con la API");
        const tarjetas = await respuesta.json();
        renderizarTarjetas(tarjetas);
    } catch (error) {
        mostrarToast("No se pudo conectar con el servidor.", "danger");
        console.error(error);
    } finally {
        document.getElementById("loading").classList.add("d-none");
    }
}

async function buscarTarjetas() {
    const texto = document.getElementById("buscador").value.trim();
    if (!texto) {
        cargarTarjetas();
        return;
    }

    document.getElementById("loading").classList.remove("d-none");
    document.getElementById("galeria").innerHTML = "";

    try {
        const respuesta = await fetch(`${API_URL}/buscar?titulo=${encodeURIComponent(texto)}`);
        const tarjetas = await respuesta.json();
        renderizarTarjetas(tarjetas);
    } catch (error) {
        mostrarToast("Error al buscar tarjetas", "danger");
    } finally {
        document.getElementById("loading").classList.add("d-none");
    }
}

function renderizarTarjetas(tarjetas) {
    const galeria = document.getElementById("galeria");
    galeria.innerHTML = "";

    if (tarjetas.length === 0) {
        document.getElementById("sinResultados").classList.remove("d-none");
        return;
    }
    document.getElementById("sinResultados").classList.add("d-none");

    tarjetas.forEach((t, i) => {
        const urlImagen = t.imagen ? `${IMG_BASE}${t.imagen}` : IMG_DEFAULT;

        const col = document.createElement("div");
        col.className = "col";

        const card = document.createElement("div");
        card.className = "tarjeta tarjeta-animar h-100";
        card.style.animationDelay = `${i * 0.05}s`;
        card.style.opacity = "0";
        card.innerHTML = `
            <div class="tarjeta-img-wrapper">
                <img src="${urlImagen}" alt="${escaparHTML(t.titulo)}"  class="tarjeta-img" onerror="this.src='${IMG_DEFAULT}'">
            </div>
            <div class="tarjeta-body">
                <div class="tarjeta-id">#${t.id}</div>
                <div class="tarjeta-titulo">${escaparHTML(t.titulo)}</div>
                <div class="tarjeta-texto">${escaparHTML(t.texto)}</div>
                <div class="tarjeta-acciones">
                    <button class="btn btn-editar" onclick="abrirEditar(${t.id}, '${escaparAttr(t.titulo)}', '${escaparAttr(t.texto)}', '${escaparAttr(t.imagen || '')}')">
                        <i class="bi bi-pencil me-1"></i>Editar
                    </button>
                    <button class="btn btn-eliminar"
                            onclick="abrirEliminar(${t.id}, '${escaparAttr(t.titulo)}')">
                        <i class="bi bi-trash3 me-1"></i>Borrar
                    </button>
                </div>
            </div>`;

        col.appendChild(card);
        galeria.appendChild(col);
    });
}

async function crearTarjeta() {
    const titulo = document.getElementById("nuevoTitulo").value.trim();
    const texto = document.getElementById("nuevoTexto").value.trim();
    const imagen = document.getElementById("nuevoImagen").value.trim();

    if (!titulo || !texto) {
        mostrarToast("El título y la descripción son obligatorios", "danger");
        return;
    }

    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({titulo, texto, imagen})
        });

        if (!respuesta.ok) throw new Error();

        document.getElementById("nuevoTitulo").value = "";
        document.getElementById("nuevoTexto").value = "";
        document.getElementById("nuevoImagen").value = "";

        modalCrear.hide();
        mostrarToast("Tarjeta creada correctamente", "success");
        cargarTarjetas();
    } catch {
        mostrarToast("Error al crear la tarjeta", "danger");
    }
}

function abrirEditar(id, titulo, texto, imagen) {
    document.getElementById("editarId").value = id;
    document.getElementById("editarTitulo").value = titulo;
    document.getElementById("editarTexto").value = texto;
    document.getElementById("editarImagen").value = imagen;

    const preview = document.getElementById("editarPreview");
    if (imagen) {
        preview.src = `${IMG_BASE}${imagen}`;
        preview.classList.remove("d-none");
    } else {
        preview.classList.add("d-none");
    }

    modalEditar.show();
}

async function guardarEdicion() {
    const id = document.getElementById("editarId").value;
    const titulo = document.getElementById("editarTitulo").value.trim();
    const texto = document.getElementById("editarTexto").value.trim();
    const imagen = document.getElementById("editarImagen").value.trim();

    if (!titulo || !texto) {
        mostrarToast("El título y la descripción son obligatorios", "danger");
        return;
    }

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({titulo, texto, imagen})
        });

        if (!respuesta.ok) throw new Error();

        modalEditar.hide();
        mostrarToast("Tarjeta actualizada correctamente", "success");
        cargarTarjetas();
    } catch {
        mostrarToast("Error al actualizar la tarjeta", "danger");
    }
}

function abrirEliminar(id, titulo) {
    document.getElementById("eliminarId").value = id;
    document.getElementById("eliminarNombre").textContent = titulo;
    modalEliminar.show();
}

async function confirmarEliminar() {
    const id = document.getElementById("eliminarId").value;

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {method: "DELETE"});
        if (!respuesta.ok) throw new Error();

        modalEliminar.hide();
        mostrarToast("Tarjeta eliminada", "success");
        cargarTarjetas();
    } catch {
        mostrarToast("Error al eliminar la tarjeta", "danger");
    }
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
    const toast = new bootstrap.Toast(toastEl, {delay: 3000});
    toast.show();
}

function escaparHTML(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function escaparAttr(str) {
    return String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, "&quot;");
}