import { createButton } from './button.js';

export function createPetCard({
    nombre,
    caracter,
    especie, 
    raza, 
    ciudad,
    estado, 
    edad, 
    sexo,
    imagen = "https://placehold.co/25x25",
    _id
    } = {} ){

    const links = ["Sobre mi", "Mandar Solicitud"];

    const petCard =
    `
    <div class="card card-animado text-center">
        <img class="card-img-top card-img-backgroud" src=${imagen} alt="Mascota">
        <div class="card-content-reveal">
            <div class="card-header-inicial">
                <h5> ${nombre}</h5>
            </div>
            <div class="card-body-extra border-top"> 
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="row justify-content-center">
                                 <div class="col-5">
                                    <p><b>Especie:</b>${especie}</p>
                                    <p><b>Raza:</b>${raza}</p>
                                </div>
                                <div class="col-5">
                                    <p><b>Sexo:</b> ${sexo}</p>
                                    <p><b>Edad:</b> ${edad}</p>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item text-center ">
                            <p class="mb-1"><b>Caracter:</b> ${caracter || 'No especificado'} </p>
                            <p class="mb-0">${ciudad}, ${estado}</p>
                        </li>
                        <li class="list-group-item d-flex justify-content-center gap-2">
                            ${createButton({ text: "Mas Sobre mi", color: "primary", size: "sm", id: `btn-sobre-mi-${_id}` })}
                            ${createButton({ text: "Adóptame", color: "success", size: "sm", id: `btn-adoptame-${_id}` })}
                        </li>
                    </ul>                                  
            </div>
        </div>
    </div>
    `

    return petCard;
}

export function setupPetCardEventListeners() {
    document.addEventListener('click', function(e) {
        // Botón "Más sobre mi"
        const sobreMiButton = e.target.closest('button[id^="btn-sobre-mi-"]');
        
        if (sobreMiButton && sobreMiButton.id) {
            const petId = sobreMiButton.id.replace('btn-sobre-mi-', '');
            
            if (petId) {
                window.location.href = `/mascotas/${petId}`;
            }
        }
        
        // Botón "Adóptame"
        const adoptameButton = e.target.closest('button[id^="btn-adoptame-"]');
        
        if (adoptameButton && adoptameButton.id) {
            const petId = adoptameButton.id.replace('btn-adoptame-', '');
            
            if (petId) {
                crearSolicitudAdopcion(petId);
            }
        }
    });
}

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
                dueno: propietarioId,
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