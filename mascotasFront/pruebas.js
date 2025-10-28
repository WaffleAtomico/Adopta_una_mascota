//NOTA: creo que cada html debera tener su propio archivo js
//Podemos usar si es necesario, un css general, para mantener consistencia, 
//pero para agregar distintos componentes, si será necesario agregar un .js para cada uno

import { createButton } from "./components/button.js";
import { createCheckBoxGroup } from "./components/checkBoxGroup.js";
import { createNavbar } from "./components/navbar.js";
import { createRadioButtonsGroup } from "./components/radioButtonsGroup.js";
import { createTextInput } from "./components/textInput.js";


document.addEventListener("DOMContentLoaded", ()=>{
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
    const testRadios = createRadioButtonsGroup(["Item1","Item2","Item3"], "GrupoPrueba");
    RadioButtonsContainer.innerHTML = testRadios;

    const testInputContainer = document.getElementById("textInput");
    const testInput = createTextInput("Titulo", "Escribe algo");
    testInputContainer.innerHTML = testInput

})