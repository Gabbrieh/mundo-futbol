document.addEventListener("DOMContentLoaded", function () {
  fetch("/src/data/fixtures.json")
    .then(res => res.json())
    .then(matches => {
      const container = document.getElementById("match_cards_container");

      matches.forEach(match => {
        const card = document.createElement("div");
        card.className = "match_card";

        card.innerHTML = `
          <p class="match_teams">
            <img src="${match.local.logo}" alt="Escudo ${match.local.name}" class="club_logo">
            ${match.local.name} vs ${match.visitante.name}
            <img src="${match.visitante.logo}" alt="Escudo ${match.visitante.name}" class="club_logo">
          </p>
          <p class="match_details">${match.fecha}</p>
          <p class="match_details">${match.estadio}</p>
          <p class="match_details">${match.competencia}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => console.error("Error cargando los partidos:", err));
});
