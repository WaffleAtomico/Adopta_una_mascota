import { createScrollableList } from "../../components/listOfElements.js";
import { initNavbar } from "../../components/navbar.js";
import { createMascotaBar } from "../../components/petListStatus.js";

async function loadRandomPets() {
  try {
    const response = await fetch('/api/mascotas');
    if (!response.ok) throw new Error('Error al cargar las mascotas');
    
    const mascotas = await response.json();
    const randomMascotas = [...mascotas.mascotas]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3); 

    const carouselInner = document.getElementById('petCarouselInner');
    if (!carouselInner) return;

    carouselInner.innerHTML = '';

    randomMascotas.forEach((mascota, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
      carouselItem.innerHTML = `
        <div class="card h-100 shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title fw-bold">${mascota.nombre || 'Mascota'}</h5>
            <div class="card-text">
              <p>${mascota.raza || 'Sin raza especificada'}</p>
              <p class="text-muted">${mascota.descripcion || 'Sin descripción disponible'}</p>
            </div>
            <a href="/mascotas/${mascota._id || ''}" class="btn btn-primary mt-2">Ver detalles</a>
          </div>
        </div>
      `;
      carouselInner.appendChild(carouselItem);
    });

    const carousel = new bootstrap.Carousel(document.getElementById('petCarousel'), {
      interval: 3000, 
      ride: 'carousel'
    });

  } catch (error) {
    console.error('Error:', error);
    const carouselInner = document.getElementById('petCarouselInner');
    if (carouselInner) {
      carouselInner.innerHTML = `
        <div class="carousel-item active">
          <div class="card h-100">
            <div class="card-body text-center">
              <p class="text-muted">No se pudieron cargar las mascotas. Intenta recargar la página.</p>
      `;
    }
  }
}

async function loadUserData() {
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include'
    });
    
    if (!response.ok) throw new Error('No se pudo cargar la información del usuario');
    
    
    const userData = await response.json();
    const greetingElement = document.getElementById('userGreeting');
    
    if (greetingElement && userData.user.nombre) {
      greetingElement.textContent = `¡Hola, ${userData.user.nombre}!`;
    }
  } catch (error) {
    console.error('Error al cargar datos del usuario:', error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
    initNavbar();
    await loadRandomPets();
    await loadUserData();

  const mascotas = [
    { nombre: "Firulais", raza: "Pastor Alemán", estado: "aprobada", icon: "bi bi-check-circle" },
    { nombre: "Michi", raza: "Persa", estado: "pendiente", icon: "bi bi-hourglass-split" },
    { nombre: "Zeus", raza: "Chihuahua", estado: "rechazada", icon: "bi bi-x-circle" }
  ];
  
  const mascotasHTML = mascotas.map(m => createMascotaBar(m));
  const testListContainer = document.getElementById("petStatusList");
  const testList = createScrollableList(mascotasHTML, "Lista de solicitudes");
  testListContainer.innerHTML = testList;

  const statusMascotaContainer = document.getElementById("status-mascota-container");
  statusMascotaContainer.addEventListener("click", () => {
    window.location.href = "/adopcion?v=1"
  }, { capture: true });
});
