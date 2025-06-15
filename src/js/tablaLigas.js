const botones = document.querySelectorAll('.btn-liga');
const posicionesContainer = document.getElementById('tablaPosicionesContainer');
const goleadoresContainer = document.getElementById('tablaGoleadoresContainer');
const asistenciasContainer = document.getElementById('tablaAsistenciasContainer');

let posicionesData = {};
let goleadoresData = {};
let asistenciasData = {};
let ligaAbierta = null;

// Cargar JSONs
Promise.all([
  fetch('/src/data/posicionesliga.json').then(res => res.json()),
  fetch('/src/data/goleadores.json').then(res => res.json()),
  fetch('/src/data/asistencias.json').then(res => res.json())
]).then(([posiciones, goleadores, asistencias]) => {
  posicionesData = posiciones;
  goleadoresData = goleadores;
  asistenciasData = asistencias;
});

botones.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const liga = document.querySelectorAll('.nombre-liga')[index].textContent.trim();

    // Cierra si ya estaba abierta
    if (ligaAbierta === liga) {
      posicionesContainer.classList.remove('mostrar');
      goleadoresContainer.classList.remove('mostrar');
      asistenciasContainer.classList.remove('mostrar');
      posicionesContainer.innerHTML = '';
      goleadoresContainer.innerHTML = '';
      asistenciasContainer.innerHTML = '';
      ligaAbierta = null;
      return;
    }

    ligaAbierta = liga;

    // Posiciones
    const posiciones = posicionesData[liga] || [];
    posicionesContainer.classList.add('mostrar');
    posicionesContainer.innerHTML = `
      <h3 class="title_table_ligas">TABLA DE LIGA | ${liga}</h3>
      <div class="tabla-custom">
        <div class="fila encabezado">
          <div>Pos</div>
          <div>Club</div>
          <div>Pts</div>
          <div>G</div>
          <div>E</div>
          <div>P</div>
        </div>
        ${posiciones.map(e => `
          <div class="fila">
            <div>${e.pos}</div>
            <div class="equipo-con-logo">
              ${e.logo ? `<img src="${e.logo}" alt="${e.equipo}" class="logo-equipo">` : ''}
              ${e.equipo}
            </div>
            <div>${e.puntos}</div>
            <div>${e.ganados}</div>
            <div>${e.empatados}</div>
            <div>${e.perdidos}</div>
          </div>
        `).join('')}
      </div>
    `;

    // Goleadores
    const goleadores = goleadoresData[liga] || [];
    goleadoresContainer.classList.add('mostrar');
    goleadoresContainer.innerHTML = `
      <h3 class="title_table_ligas">TABLA DE GOLEADORES</h3>
      <div class="tabla-goleadores tabla-custom">
        <div class="fila encabezado">
          <div>Jugador</div>
          <div>Club</div>
          <div>Goles</div>
        </div>
        ${goleadores.map(g => `
          <div class="fila">
            <div>${g.jugador}</div>
            <div class="equipo-con-logo">
              ${g.logo ? `<img src="${g.logo}" alt="${g.equipo}" class="logo-equipo">` : ''}
              ${g.equipo}
            </div>
            <div>${g.goles}</div>
          </div>
        `).join('')}
      </div>
    `;

    // Asistencias
    const asistencias = asistenciasData[liga] || [];
    asistenciasContainer.classList.add('mostrar');
    asistenciasContainer.innerHTML = `
      <h3 class="title_table_ligas">TABLA DE ASISTENCIAS</h3>
      <div class="tabla-goleadores tabla-custom">
        <div class="fila encabezado">
          <div>Jugador</div>
          <div>Club</div>
          <div>Asistencias</div>
        </div>
        ${asistencias.map(a => `
          <div class="fila">
            <div>${a.jugador}</div>
            <div class="equipo-con-logo">
              ${a.logo ? `<img src="${a.logo}" alt="${a.equipo}" class="logo-equipo">` : ''}
              ${a.equipo}
            </div>
            <div>${a.asistencias}</div>
          </div>
        `).join('')}
      </div>
    `;
  });
});