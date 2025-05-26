document.addEventListener("DOMContentLoaded", () => {
    const scrollingText = document.querySelector(".scrolling_text");
    const contentWidth = scrollingText.scrollWidth; // Ancho total del contenido
    let scrollAmount = 0;
  
    // Duplica el contenido para un desplazamiento continuo
    scrollingText.innerHTML += scrollingText.innerHTML;
  
    function scroll() {
      scrollAmount -= 1; // Velocidad del desplazamiento
      scrollingText.style.transform = `translateX(${scrollAmount}px)`;
  
      // Reinicia el desplazamiento cuando todo el contenido duplicado ha salido
      if (Math.abs(scrollAmount) >= contentWidth) {
        scrollAmount = 0; // Reinicia desde el inicio
      }
  
      requestAnimationFrame(scroll);
    }
  
    scroll();
  });