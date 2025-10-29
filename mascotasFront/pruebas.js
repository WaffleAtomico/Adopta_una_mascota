//NOTA: creo que cada html debera tener su propio archivo js
//Podemos usar si es necesario, un css general, para mantener consistencia, 
//pero para agregar distintos componentes, si será necesario agregar un .js para cada uno

import { createButton } from "./components/button.js";
import { createCheckBoxGroup } from "./components/checkBoxGroup.js";
import { createNavbar } from "./components/navbar.js";
import { createRadioButtonsGroup } from "./components/radioButtonsGroup.js";
import { createTextInput } from "./components/textInput.js";
<<<<<<< Updated upstream
=======
import { createPetCard } from "./components/PetsCard.js"
import { createScrollableList } from "./components/listOfElement.js";
>>>>>>> Stashed changes


//Esto luego será todo un tipo de objeto, de momento lo hice para mantener un poco más limpio el codigo
export function crearMascota(nombre, caracter, especie, raza, ciudad, estado, edad, sexo) {
    return {
        nombre,
        caracter,
        especie,
        raza,
        ciudad,
        estado,
        edad,
        sexo
    };
}



document.addEventListener("DOMContentLoaded", () => {
    const botonContainer = document.getElementById("button");
    console.log(botonContainer)
    const testButton = createButton({ text: "Aceptar", color: "success" }); //boton base

    botonContainer.innerHTML = testButton;

    const navbarContainer = document.getElementById("navbar")
    console.log(navbarContainer)
    const testNavbar = createNavbar()

    navbarContainer.innerHTML = testNavbar

    const checkboxContainer = document.getElementById("CheckBoxes");
    console.log(checkboxContainer)
    const testCheckBoxes = createCheckBoxGroup(["Item1", "item2", "Item3"])
    checkboxContainer.innerHTML = testCheckBoxes;

    const RadioButtonsContainer = document.getElementById("radioButtons")
    const testRadios = createRadioButtonsGroup(["Item1", "Item2", "Item3"], "GrupoPrueba");
    RadioButtonsContainer.innerHTML = testRadios;

    const testInputContainer = document.getElementById("textInput");
<<<<<<< Updated upstream
    const testInput = createTextInput("Titulo", "Escribe algo");
    testInputContainer.innerHTML = testInput
=======
    const testInput = createTextInput("Titulo", "Escribe algo", {
        required: true,
        minLength: 3,
        maxLength: 30,
        feedback: "El nombre debe tener entre 3 y 30 caracteres."
    });
    testInputContainer.innerHTML = testInput;

    const testPetsCard = document.getElementById("Tarjetas");
    const mascotas = [
        crearMascota("Firulais", "Juguetón", "Perro", "Pastor", "Guadalajara", "Jalisco", "3 años", "Femenino"),
        crearMascota("Arya", "Sociable", "Gato", "Persa", "Monterrey", "Nuevo León", "1 año", "Femenino"),
        crearMascota("Zeus", "Enérgico", "Perro", "Chihuahua", "Mérida", "Yucatán", "5 años", "Masculino")
    ];
    mascotas.forEach((mascota) => {
        const testTarjetas = createPetCard(mascota);
        testPetsCard.innerHTML += testTarjetas;
    })
>>>>>>> Stashed changes

    const testListContainer = document.getElementById("listados");
    const testList = createScrollableList([testButton, testButton, testInput], "Listado elementos");
    testListContainer.innerHTML = testList;

})