import { initNavbar } from "../../components/navbar.js";
import { createPetProfile } from "../../components/pet.profile.js";

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    
    const pathParts = window.location.pathname.split('/');
    const petId = pathParts[pathParts.length - 1];
    
    const PetsProfileContainer = document.getElementById("perfilMascota");
    
    if (PetsProfileContainer) {
        if (petId) {
            fetch(`http://localhost:3000/api/mascotas/${petId}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : "aplication/json"
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener los datos de la mascota');
                    }
                    return response.json();
                })
                .then(petData => {

                    const actualPetData = petData.mascota || petData;

                    const PetsProfile = createPetProfile(actualPetData);

                    PetsProfileContainer.innerHTML = PetsProfile;
                    
                    initializeCarousel();
                })
                .catch(error => {
                    console.error('Error:', error);

                    PetsProfileContainer.innerHTML = `
                        <div class="alert alert-danger">
                            <h4>Error al cargar el perfil de la mascota</h4>
                            <p>No se pudieron obtener los datos de la mascota. Por favor, intenta nuevamente más tarde.</p>
                        </div>
                    `;

                });
        } else {
            PetsProfileContainer.innerHTML = `
                <div class="alert alert-warning">
                    <h4>ID de mascota no especificado</h4>
                    <p>Por favor, proporciona un ID de mascota en la URL (ej: /mascota/123).</p>
                </div>
            `;
        }
    }
});

function initializeCarousel() {
    const carouselElement = document.getElementById('carouselExampleIndicators');
    
    if (carouselElement && typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
        new bootstrap.Carousel(carouselElement, {
            interval: 5000,
            wrap: true
        });
    } else {
        console.warn("Bootstrap Carousel no disponible o elemento no encontrado.");
    }
}


