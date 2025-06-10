const botones = document.querySelectorAll('.btn-liga');
const posicionesContainer = document.getElementById('tablaPosicionesContainer');
const goleadoresContainer = document.getElementById('tablaGoleadoresContainer');

let posicionesData = {};
let goleadoresData = {};

// carga los json al iniciar
Promise.all([
  fetch('/src/data/posicionesliga.json').then(res => res.json()),
  fetch('/src/data/goleadores.json').then(res => res.json())
]).then(([posiciones, goleadores]) => {
  posicionesData = posiciones;
  goleadoresData = goleadores;
});

botones.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const liga = document.querySelectorAll('.nombre-liga')[index].textContent.trim();

    // posiciones
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

    // goleadores
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
        <div>${g.equipo}</div>
        <div>${g.goles}</div>
      </div>
    `).join('')}
  </div>
`;
  });
});