import { initNavbar } from "../../components/navbar.js";
import { createPetCard } from "../../components/PetsCard.js";

//Inicialisamos la navbar
document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
});

export function crearMascota(nombre, caracter, especie, raza, ubicacion, edad, sexo, imagen) {
    return {
        nombre,
        caracter,
        especie,
        raza,
        ubicacion,
        edad,
        sexo,
        imagen
    }
}

const mascotas = [
    crearMascota("Firulais", "Juguetón", "Perro", "Pastor", "Guadalajara, Jalisco", "3 años", "Femenino"),
    crearMascota("Arya", "Sociable", "Gato", "Persa", "Monterrey, Nuevo León", "1 año", "Femenino"),
    crearMascota("Zeus", "Enérgico", "Perro", "Chihuahua", "Mérida, Yucatán", "5 años", "Masculino"),
    crearMascota("Milo", "Tranquilo", "Gato", "Siamés", "CDMX", "2 años", "Masculino"),
];

document.addEventListener("DOMContentLoaded", () => {
    //Obtener el mash grid
    const petsGrid = document.getElementById("pets-grid");
    
    //Variable que guarda el html de las tarjetas
    let htmlTarjetas = "";

    //Itera sobre la lista de mascatos y crea sus tarjetas
    mascotas.forEach((mascota) => {
        htmlTarjetas += createPetCard(mascota);
    })

    petsGrid.innerHTML = htmlTarjetas;
})
