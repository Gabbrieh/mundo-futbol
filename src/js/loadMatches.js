document.addEventListener("DOMContentLoaded", () => {
  const scrollingText = document.querySelector(".matchs_scrolling");

  if (!scrollingText) return;

  // carga los partidos desde JSON
  async function loadMatches() {
    try {
      const response = await fetch('/src/data/matches.json'); // Asegúrate de que la ruta sea correcta
      const matches = await response.json();

      scrollingText.innerHTML = ''; // limpiar

      matches.forEach(match => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img src="${match.home.logo}" alt="${match.home.alt}" class="club_logo">
          <a href="#">${match.home.name} ${match.score} ${match.away.name}</a>
          <img src="${match.away.logo}" alt="${match.away.alt}" class="club_logo">
        `;
        scrollingText.appendChild(li);
      });

      startScrollingEffect();

    } catch (error) {
      console.error('Error cargando los partidos:', error);
    }
  }

  // efecto de scroll
  function startScrollingEffect() {
    if (!scrollingText.classList.contains("duplicated")) {
      scrollingText.innerHTML += scrollingText.innerHTML;
      scrollingText.classList.add("duplicated");
    }

    let scrollAmount = 0;
    let contentWidth = scrollingText.scrollWidth / 2;

    const speed =
      parseFloat(
        getComputedStyle(scrollingText).getPropertyValue("--scroll-speed")
      ) || 1;

    function scroll() {
      scrollAmount -= speed;
      scrollingText.style.transform = `translateX(${scrollAmount}px)`;

      if (Math.abs(scrollAmount) >= contentWidth) {
        scrollAmount = 0;
      }

      requestAnimationFrame(scroll);
    }

    window.addEventListener("resize", () => {
      contentWidth = scrollingText.scrollWidth / 2;
    });

    scroll();
  }

  // carga los partidos y luego se activa el scroll
  loadMatches();
});