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
                            ${createButton({ text: "Adóptame", color: "success", size: "sm" })}
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
        // Buscar el botón más cercano si se hizo clic en un elemento interno
        const button = e.target.closest('button[id^="btn-sobre-mi-"]');
        
        if (button && button.id) {
            const petId = button.id.replace('btn-sobre-mi-', '');
            
            if (petId) {
                window.location.href = `/mascotas/${petId}`;
            }
        }
    });
}