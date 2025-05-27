document.addEventListener("DOMContentLoaded", () => {
  const scrollingText = document.querySelector(".scrolling_text");

  if (!scrollingText) return; // sale si no se encuentra el elemento

  // evita duplicar contenido más de una vez
  if (!scrollingText.classList.contains("duplicated")) {
    scrollingText.innerHTML += scrollingText.innerHTML;
    scrollingText.classList.add("duplicated");
  }

  let scrollAmount = 0;
  let contentWidth = scrollingText.scrollWidth / 2;

  // lee velocidad desde una variable CSS o usar 1 por defecto
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

  // actualiza el ancho si se redimensiona la ventana
  window.addEventListener("resize", () => {
    contentWidth = scrollingText.scrollWidth / 2;
  });

  scroll();
});
