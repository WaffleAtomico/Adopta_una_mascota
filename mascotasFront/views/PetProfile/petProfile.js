import { initNavbar } from "../../components/navbar.js";
import { createPetProfile } from "../../components/pet.profile.js";

// Función para crear solicitud de adopción
async function crearSolicitudAdopcion(petId) {
    try {
        // Obtener datos del usuario actual
        const userResponse = await fetch('/api/auth/me', {
            credentials: 'include'
        });
        
        if (!userResponse.ok) {
            if (userResponse.status === 401) {
                alert('Debes iniciar sesión para solicitar una adopción');
                window.location.href = '/login';
                return;
            }
            throw new Error('No se pudo obtener la información del usuario');
        }
        
        const userData = await userResponse.json();
        if (!userData.user || !userData.user.id) {
            alert('No se pudo identificar tu usuario. Por favor, inicia sesión nuevamente.');
            window.location.href = '/login';
            return;
        }
        
        const userId = userData.user.id;
        
        // Obtener datos de la mascota para encontrar al propietario
        const petResponse = await fetch(`/api/mascotas/${petId}`, {
            credentials: 'include'
        });
        
        if (!petResponse.ok) {
            throw new Error('No se pudo obtener la información de la mascota');
        }
        
        const petData = await petResponse.json();
        if (!petData.mascota || !petData.mascota.publicadoPor) {
            throw new Error('No se pudo identificar al propietario de la mascota');
        }
        
        const propietarioId = petData.mascota.publicadoPor;
        
        // Verificar que el usuario no sea el propietario de la mascota
        if (userId === propietarioId) {
            alert('No puedes solicitar adoptar tu propia mascota');
            return;
        }
        
        const response = await fetch(`/api/adopcion?t=${Date.now()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                mascota: petId,
                solicitante: userId,
                propietario: propietarioId,
                estado: 'pendiente'
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Solicitud de adopción enviada correctamente');
            // Opcional: redirigir a página de estado
            window.location.href = '/estado';
        } else {
            alert(data.msg || 'Error al enviar la solicitud de adopción');
        }
    } catch (error) {
        console.error('Error al crear solicitud de adopción:', error);
        alert('Error al enviar la solicitud. Por favor, intenta nuevamente.');
    }
}

// Event listener para el botón "Adóptame" del perfil
function setupProfileAdopcionButton() {
    document.addEventListener('click', function(e) {
        // Botón "Adóptame" del perfil
        const adoptameButton = e.target.closest('button[id^="adoptame-profile-btn-"]');
        
        if (adoptameButton && adoptameButton.id) {
            const petId = adoptameButton.id.replace('adoptame-profile-btn-', '');
            
            if (petId) {
                crearSolicitudAdopcion(petId);
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    
    const pathParts = window.location.pathname.split('/');
    const petId = pathParts[pathParts.length - 1];
    
    const PetsProfileContainer = document.getElementById("perfilMascota");
    
    if (PetsProfileContainer) {
        if (petId) {
            fetch(`/api/mascotas/${petId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
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
        
        // Inicializar el event listener del botón "Adóptame"
        setupProfileAdopcionButton();
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


