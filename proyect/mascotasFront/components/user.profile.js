export function createUserProfile(data = {}){
    
    const userData = {
        firstname : data.nombre || "Nombre",
        lastname : data.apellidoPaterno || "Apellido",
        direccion : `${data.ciudad || "Ciudad"}, ${data.estado || "Estado"}`,
        correo : data.email || "correo@ejemplo.com",
        telefono : data.telefono?.numero || "No especificado",
        twitter : data.redesSociales?.twitter || "No especificado",
        linkedin : data.redesSociales?.linkedin || "No especificado",
        facebook : data.redesSociales?.facebook || "No especificado",
        instagram : data.redesSociales?.instagram || "No especificado",
        image : data.perfil || "https://placehold.co/250x250"
    };

    const userProfile = `
                <div class="row g-4 mb-5">
                <div class="col-lg-3 text-center">
                    <div class="profile-image-container mb-3">
                        <img src="${userData.image}" alt="Foto de Perfil" class="img-fluid rounded-circle profile-img"> 
                    </div>
                    <h4>${userData.firstname} ${userData.lastname}</h4>
                </div>
                <div class="col-lg-9">
                    <div class="card shadow-sm h-100">
                        <div class="card-header">
                            <h5>Información Personal</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-10">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <b>Nombre Completo:</b>
                                            <span>${userData.firstname} ${userData.lastname}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <b>Dirección:</b>
                                            <span>${userData.direccion}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <b>Correo:</b>
                                            <span>${userData.correo}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <b>Teléfono:</b>
                                            <span>${userData.telefono}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-2 border-start">
                                    <h6>Redes Sociales</h6>
                                    <ul class="list-unstyled fa-ul">
                                        ${userData.twitter && userData.twitter !== "No especificado" ? `<li><i class="fa-li fa fa-twitter-square text-info"></i><a href="#">${userData.twitter}</a></li>` : ''}
                                        ${userData.linkedin && userData.linkedin !== "No especificado" ? `<li><i class="fa-li fa fa-linkedin-square text-primary"></i><a href="#">${userData.linkedin}</a></li>` : ''}
                                        ${userData.facebook && userData.facebook !== "No especificado" ? `<li><i class="fa-li fa fa-facebook-square text-primary"></i><a href="#">${userData.facebook}</a></li>` : ''}
                                        ${userData.instagram && userData.instagram !== "No especificado" ? `<li><i class="fa-li fa fa-instagram text-danger"></i><a href="#">${userData.instagram}</a></li>` : ''}
                                        ${!userData.twitter || userData.twitter === "No especificado" && 
                                          !userData.linkedin || userData.linkedin === "No especificado" && 
                                          !userData.facebook || userData.facebook === "No especificado" && 
                                          !userData.instagram || userData.instagram === "No especificado" ? 
                                          '<li class="text-muted">No hay redes sociales configuradas</li>' : ''}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card shadow-sm p-4">
                        <h2> Mascotas</h2>
                        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3" id="pet-cards-container">
                            <div class="PetList">
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
    `;

    return userProfile;
}