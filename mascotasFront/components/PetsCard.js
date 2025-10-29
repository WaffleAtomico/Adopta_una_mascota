export function petsCart({
    nombre,
    caracter,
    especie, 
    raza, 
    ciudad, 
    estado, 
    edad, 
    sexo
    } = {} ){

    const links = ["Sobre mi", "Mandar Solicitud"];

    const petCart =
    `
    <div class="card card-animado">
        <img class="card-img-top card-img-backgroud" src="https://placehold.co/100x50" alt="Mascota">
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
                            <p>${ciudad}, ${estado}</p>
                        </li>
                        <li class="list-group-item">
                            <button>BTN 1</button>
                            <button>BTN 2</button>
                        </li>
                    </ul>                                  
            </div>
        </div>
    </div>
    `

    return petsCart;
}