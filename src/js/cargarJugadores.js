document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-jugadores");

  fetch("../src/data/jugadores.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(jugador => {
        const card = document.createElement("div");
        card.classList.add("jugador_card");
        card.setAttribute("data-posicion", jugador.posicion);

        card.innerHTML = `
          <div class="jugador_fondo">
            <div class="jugador_foto_container">
              <img class="jugador_foto" src="${jugador.foto}" alt="${jugador.nombre}" />
              <div class="jugador_dorsal">${jugador.dorsal}</div>
              <div class="jugador_barra">
                <div class="jugador_club">
                  <img src="${jugador.clubIcon}" alt="${jugador.club}" class="club_icon" />
                  <span>${jugador.club}</span>
                </div>
                <div class="jugador_posicion">${jugador.posicion}</div>
              </div>
              <div class="jugador_nombre">${jugador.nombre}</div>
            </div>
          </div>
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(err => console.error("Error al cargar los jugadores:", err));
});
