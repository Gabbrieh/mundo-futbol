      document.querySelectorAll(".btn-posicion").forEach((btn) => {
        btn.addEventListener("click", function () {
          const pos = this.getAttribute("data-posicion");
          document.querySelectorAll(".jugador_card").forEach((card) => {
            if (pos === "Todos" || card.getAttribute("data-posicion") === pos) {
              card.style.display = "";
            } else {
              card.style.display = "none";
            }
          });
        });
      });