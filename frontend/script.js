document.addEventListener("DOMContentLoaded", () => {
    cargarTarjetas();
});

function cargarTarjetas() {
    fetch("http://localhost:8080/api/tarjetas")
        .then(res => res.json())
        .then(datos => mostrarTarjetas(datos));
}

function mostrarTarjetas(lista) {
    const galeria = document.getElementById("galeria");
    galeria.innerHTML = "";

    lista.forEach(t => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");
        card.innerHTML = `
            <div class="card shadow">
                <div class="card-body">
                    <h5 class="card-title">${t.titulo}</h5>
                    <p class="card-text">${t.texto}</p>
                </div>
            </div>
        `;
        galeria.appendChild(card);
    });
}