export function createPetCard({
    nombre,
    caracter,
    especie, 
    raza, 
    ubicacion, 
    edad, 
    sexo,
    imagen = "https://placehold.co/50x50"
    } = {} ){

    const links = ["Sobre mi", "Mandar Solicitud"];

    const petCard =
    `
    <div class="card card-animado">
        <img class="card-img-top card-img-backgroud" src=${imagen} alt="Mascota">
        <div class="card-content-reveal">
            <div class="card-header-inicial">
                <h5> ${nombre}</h5>
            </div>
            <div class="card-body-extra border-top"> 
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="row">
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
                        <li>
                            <p><b>Caracter:</b> ${caracter} </p>
                            <p>${ubicacion}</p>
                        </li>
                        <li class="list-group-item">
                            <button>Mas Sobre mi</button>
                            <button>Adóptame</button>
                        </li>
                    </ul>                                  
            </div>
        </div>
    </div>
    `

    return petCard;
}