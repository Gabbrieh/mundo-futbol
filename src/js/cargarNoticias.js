document.addEventListener("DOMContentLoaded", function () {
  fetch("/src/data/noticias.json")
    .then(res => res.json())
    .then(data => {
      // carga la noticia principal
      const principalContainer = document.querySelector(".featured_news");
      const principal = document.createElement("div");
      principal.className = "featured_card";
      principal.innerHTML = `
        <img src="${data.principal.imagen}" alt="${data.principal.alt}">
        <h2>${data.principal.titulo}</h2>
        <p class="featured_card-paragraph">${data.principal.descripcion}</p>
      `;
      principalContainer.prepend(principal);

      // carga las noticias secundarias
      const secundariasContainer = document.createElement("div");
      secundariasContainer.className = "featured_card_group";

      data.secundarias.forEach((noticia, index) => {
        const card = document.createElement("div");
        card.className = "featured_card " + (index === 1 ? "small-below" : "small");
        card.innerHTML = `
          <img src="${noticia.imagen}" alt="${noticia.alt}">
          <h2>${noticia.titulo}</h2>
          <p>${noticia.descripcion}</p>
        `;
        secundariasContainer.appendChild(card);
      });

      principalContainer.appendChild(secundariasContainer);
    })
    .catch(err => console.error("Error cargando las noticias:", err));
});
