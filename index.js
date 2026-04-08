// ========== INTRO OVERLAY ==========
function initializeIntroOverlay() {
  const introOverlay = document.getElementById("introOverlay");
  
  // Agregar clase para desactivar scroll
  document.body.classList.add("intro-active");

  // Después de 10 segundos, comenzar el fade out
  setTimeout(() => {
    introOverlay.classList.add("fade-out");
  }, 10000);

  // Después de 11 segundos (10s + 1s de transición), remover el overlay
  setTimeout(() => {
    introOverlay.remove();
    document.body.classList.remove("intro-active");
  }, 11000);
}

// ========== UTILIDADES ==========
function scrollToRsvp() {
  const rsvpSection = document.getElementById("rsvp");
  rsvpSection.scrollIntoView({ behavior: "smooth" });
}

// ========== CONTADOR DE DÍAS ==========
function initializeCounter() {
  const weddingDate = new Date(2026, 6, 4, 18, 0, 0); // 4 de Julio 2026, 6:00 PM

  function updateCountdown() {
    // Obtener hora actual en Colombia (UTC-5)
    const utcNow = new Date();
    const colombiaTime = new Date(
      utcNow.getTime() +
        utcNow.getTimezoneOffset() * 60 * 1000 -
        5 * 60 * 60 * 1000
    );

    const difference = weddingDate - colombiaTime;

    if (difference > 0) {
      // Calcular días
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      // Calcular horas restantes
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      // Calcular minutos restantes
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );

      // Calcular segundos restantes
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = days >= 0 ? days : 0;
      document.getElementById("hours").textContent = hours >= 0 ? hours : 0;
      document.getElementById("minutes").textContent =
        minutes >= 0 ? minutes : 0;
      document.getElementById("seconds").textContent =
        seconds >= 0 ? seconds : 0;
    } else {
      document.getElementById("days").textContent = "0";
      document.getElementById("hours").textContent = "0";
      document.getElementById("minutes").textContent = "0";
      document.getElementById("seconds").textContent = "0";
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000); // Actualizar cada segundo
}

// ========== PARÁMETRO SHOW ==========
function handleShowParameter() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("show")) {
    // Ocultar todas las secciones
    document
      .querySelectorAll(
        ".section-hero, .section-dogs, .section-verse, .section-rsvp, .section-footer"
      )
      .forEach((section) => {
        section.style.display = "none";
      });
    // Asegurar que la sección de detalles sea visible
    const detailsSection = document.getElementById("details");
    if (detailsSection) {
      detailsSection.style.display = "block";
    }
  }
}

// ========== PARÁMETRO CUPOS ==========
function handleCuposParameter() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("cupos")) {
    const cuposValue = params.get("cupos");
    const cuposElement = document.getElementById("cupos");
    if (cuposElement) {
      cuposElement.textContent = `Cupos (${cuposValue})`;
    }
  }
}

// ========== INICIALIZACIÓN ==========
document.addEventListener("DOMContentLoaded", function () {
  initializeIntroOverlay();
  handleShowParameter();
  handleCuposParameter();
  initializeCounter();
});
