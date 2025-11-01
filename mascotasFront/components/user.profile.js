export function createUserProfile(data = {}){
    
    const userData = {
        firstname : data.username || "Hugo Ernesto",
        lastname : data.name || "Acevedo Juarez",
        direccion : data.direction || "Av los rosales 3457, Guadalajara, Jalisco. 756321",
        correo : data.correo || "jilosd@gmail.com",
        telefono : data.telefono || "33 4689 7594",
        twitter : data.twitte || "@HLneitor",
        linkedlin : data.linkedlin || "Hugo Acevedo",
        facebook : data.facebook || "Hugo Acevedo",
        instagram : data.instagram || "H_AJ78",
        image : data.image || "https://placehold.co/250x25"
    };

    const userProfile = `
                <div class="row g-4 mb-5">
                <div class="col-lg-3 text-center">
                    <div class="profile-image-container mb-3">
                        <img src="${userData.image}" alt="Foto de Perfil" class="img-fluid rounded-circle profile-img"> 
                    </div>
                    <h4>Hugo Ernesto</h4>
                </div>
                <div class="col-lg-9">
                    <div class="card shadow-sm h-100">
                        <div class="card-header">
                            <h5>Información Personal</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-8">
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
                                            <span>${userData.direccion}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <b>Teléfono:</b>
                                            <span>${userData.telefono}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-4 border-start">
                                    <h6>Redes Sociales</h6>
                                    <ul class="list-unstyled fa-ul">
                                        <li><i class="fa-li fa fa-twitter-square text-info"></i><a href="#">${userData.twitter}</a></li>
                                        <li><i class="fa-li fa fa-linkedin-square text-primary"></i><a href="#">${userData.linkedlin} </a></li>
                                        <li><i class="fa-li fa fa-facebook-square text-primary"></i><a href="#">${userData.facebook}</a></li>
                                        <li><i class="fa-li fa fa-instagram text-danger"></i><a href="#">${userData.instagram}</a></li>
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