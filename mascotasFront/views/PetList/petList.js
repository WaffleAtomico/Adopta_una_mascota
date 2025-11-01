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
    crearMascota("Firulais", "Juguetón y leal", "Perro", "Pastor Alemán", "Guadalajara, Jalisco", "3 años", "Macho"),
    crearMascota("Arya", "Sociable y curiosa", "Gato", "Persa", "Monterrey, Nuevo León", "1 año", "Hembra"),
    crearMascota("Zeus", "Enérgico pero cariñoso", "Perro", "Chihuahua", "Mérida, Yucatán", "5 años", "Macho"),
    crearMascota("Milo", "Tranquilo y dormilón", "Gato", "Siamés", "CDMX, Coyoacán", "2 años", "Macho"),
    crearMascota("Princesa", "Tímida, busca confianza", "Perro", "Labrador", "Puebla, Puebla", "8 meses", "Hembra"),
    crearMascota("Copito", "Muy activo y divertido", "Conejo", "Rex", "Querétaro, Corregidora", "1 año", "Hembra"),
    crearMascota("Rocky", "Guardían, necesita espacio", "Perro", "Rottweiler", "Tijuana, Baja California", "7 años", "Macho"),
    crearMascota("Luna", "Independiente y afectuosa", "Gato", "Maine Coon", "Cancún, Quintana Roo", "4 años", "Hembra"),
    crearMascota("Max", "Amigable con niños y otros perros", "Perro", "Golden Retriever", "Veracruz, Boca del Río", "2 años", "Macho"),
    crearMascota("Sombra", "Silencioso y observador", "Gato", "Bombai", "Toluca, Estado de México", "6 meses", "Macho"),
    crearMascota("Coco", "Habladora y juguetona", "Perico", "Ninfa", "León, Guanajuato", "1 año", "Hembra"),
    crearMascota("Bolita", "Lento pero muy tierno", "Tortuga", "Orejas Rojas", "Hermosillo, Sonora", "10 años", "Macho"),
    crearMascota("Nala", "Muy obediente y tranquila", "Perro", "Beagle", "Saltillo, Coahuila", "4 años", "Hembra"),
    crearMascota("Tigre", "Juguetón, le gusta cazar", "Gato", "Mestizo", "Aguascalientes, Aguascalientes", "3 años", "Macho"),
    crearMascota("Oreo", "Cachorro, muy juguetón", "Perro", "Pug", "Chihuahua, Chihuahua", "6 meses", "Macho"),
    crearMascota("Kira", "Dulce y adora las caricias", "Perro", "Poodle", "Culiacán, Sinaloa", "7 años", "Hembra")
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
