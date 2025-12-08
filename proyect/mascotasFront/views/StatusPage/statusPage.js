import { createScrollableList } from "../../components/listOfElements.js";
import { initNavbar } from "../../components/navbar.js";
import { createMascotaBar } from "../../components/petListStatus.js";

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();

    const mascotas = [
        { nombre: "Firulais", raza: "Pastor Alemán", estado: "aprobada", icon: "bi bi-check-circle" },
        { nombre: "Michi", raza: "Persa", estado: "pendiente", icon: "bi bi-hourglass-split" },
        { nombre: "Zeus", raza: "Chihuahua", estado: "rechazada", icon: "bi bi-x-circle" }
    ];

    const mascotasHTML = mascotas.map(m => createMascotaBar(m));

    const testListContainer = document.getElementById("listados");
    const testList = createScrollableList(mascotasHTML, "Lista de solicitudes");
    testListContainer.innerHTML = testList;
});