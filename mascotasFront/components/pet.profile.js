export function createPetProfile(data = {}){
    
    const petData = {
        nombre: data.nombre || "Nombre",
        sexo: data.sexo || "Hembra",
        tamaño: data.tamaño || "Mediano",
        edad: data.edad || "5 años",
        ubicacion: data.ubicacion || "Guadalajara, Jalisco",
        descripcion: data.descripcion || "Lorem ipsum dolor sit amet...",
        historialSalud: data.historialSalud || "Lorem ipsum dolor...",
        historiaPrevia: data.historiaPrevia || "Lorem ipsum, dolor sit amet...",
        imagenes: data.imagenes || [
            "https://placehold.co/250x100",
            "https://placehold.co/250x100",
            "https://placehold.co/250x100"
        ]
    }

    const mainRow = `
        <div class="row
 g-0 overflow-hidden">            <div class="col-lg-6">
                <div class="lc-block">
                    <div class="carousel slide">
                        <div id="carouselExampleIndicators" class="carousel slide">
                            <div class="carousel-indicators">
                                ${petData.imagenes.map((_, index) => `
                                    <button type="button" 
                                        data-bs-target="#carouselExampleIndicators" 
                                        data-bs-slide-to="${index}" 
                                        class="${index === 0 ? 'active' : ''}" 
                                        aria-current="${index === 0 ? 'true' : 'false'}" 
                                        aria-label="Slide ${index + 1}">
                                    </button>
                                `).join('')}
                            </div>
                            <div class="carousel-inner">
                                ${petData.imagenes.map((src, index) => `
                                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                        <img src="${src}" class="d-block w-100" alt="Imagen de la mascota">
                                    </div>
                                `).join('')}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="card pet-Presentation">
                    <div class="card-header">
                        <h4>Hola, soy ${petData.nombre}</h4>
                    </div>
                    <div class="card-body border-top">
                        <div class="row profileinformation">
                            
                            <div class="col profileinformation">
                                <span class="petdata">${petData.sexo}</span><br>
                                <p class="petdataclass">Sexo</p>
                            </div>
                            
                            <div class="col profileinformation">
                                <span class="petdata">${petData.tamaño}</span><br>
                                <p class="petdataclass">Tamaño</p>
                            </div>
                            
                            <div class="col profileinformation">
                                <span class="petdata">${petData.edad}</span><br>
                                <p class="petdataclass">Edad</p>
                            </div>
                            
                            <div class="col profileinformation">
                                <span class="petdata">${petData.ubicacion}</span><br>
                                <p class="petdataclass">Ubicación</p>
                            </div>
                        </div>
                        
                        <div>
                            <h6>Descripción: </h6>
                            <p>${petData.descripcion}</p>
                        </div>
                        
                        <div>
                            <button class="button ">Adóptame</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="card medical-record">
                    <h5>Salud y Antecedentes</h5>
                    <div class="card-body border-top">
                        <ul class="list-group list-group-flush">
                            
                            <li class="list-group-item px-2 justify-content-between">
                                <span>Historial de Salud:</span>
                                <p>${petData.historialSalud}</p>
                            </li>
                            
                            <li class="list-group-item px-2 justify-content-between">
                                <span>Historia previa:</span>
                                <p>${petData.historiaPrevia}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    return mainRow;
}