import './style.css'

document.addEventListener("DOMContentLoaded", function() {
    const title = document.getElementById("title");
    title.style.color = "white";
});

const audio = document.getElementById("audio");
const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        toggleButton.innerHTML = '<span class="icon">🔊</span>';
    } else {
        audio.pause();
        toggleButton.innerHTML = '<span class="icon">🔇</span>';
    }
});

// Aplicar la clase para el "fade out" antes de cambiar de página
window.addEventListener("beforeunload", function() {
    audio.classList.add("fade-out-active");
});


