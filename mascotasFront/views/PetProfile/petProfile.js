import { initNavbar } from "../../components/navbar.js";
import { createPetProfile } from "../../components/pet.profile.js";

export function crearMascota(nombre, tamaño, ubicacion, edad, sexo, descripcion, historialSalud, historiaPrevia, imagenes) {
    return {
        nombre,
        tamaño,
        ubicacion,
        edad,
        sexo,
        descripcion,
        historialSalud,
        historiaPrevia,
        imagenes
    }
}

document.addEventListener("DOMContentLoaded", () => {
   
    initNavbar();
   
    const mascota = crearMascota(
        "Firulais", 
        "mediano",
        "Guadalajara, Jalisco", 
        "3 años", 
        "Macho", 
        "Firulais es un perro muy activo que ama correr en el parque y jugar a buscar la pelota.",
        "Vacunado y desparasitado. Historial médico limpio.",
        "Fue rescatado de una casa donde no recibía suficiente atención.",
        [
            "https://placehold.co/600x400",
            "https://placehold.co/600x400",
            "https://placehold.co/600x400"
        ]
    );

    const testPetsProfileContainer = document.getElementById("perfilMascota")
    if (testPetsProfileContainer) {
        const testPetsProfile = createPetProfile(mascota);
       
        testPetsProfileContainer.innerHTML = testPetsProfile;

        const carouselElement = document.getElementById('carouselExampleIndicators');
        if (carouselElement && typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
            new bootstrap.Carousel(carouselElement, {
                interval: 5000,
                wrap: true
            });
            console.log("Carrusel de perfil inicializado.");
        } else {
             // Si esto se muestra en la consola, Bootstrap no está disponible globalmente.
             console.warn("Bootstrap Carousel no disponible o elemento no encontrado.");
        }
    }
});