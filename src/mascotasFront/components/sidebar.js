import { createCheckBoxGroup } from './checkBoxGroup.js';
import { createRadioButtonsGroup } from './radioButtonsGroup.js';

export function generarSidebarFiltros() {
    const especiesOptions = ["Perro", "Gato", "Conejo", "Ave", "Reptil", "Otro"];
    const edadOptions = [
    { text: "Más Jóvenes Primero", value: "asc" },
    { text: "Más Mayores Primero", value: "desc" }
];
    const sexoOptions = ["Macho", "Hembra"];
    const tamanoOptions = ["Pequeño", "Mediano", "Grande"];

    return `
<div class="filters-sidebar">
    <h2>Filtros</h2>

    ${createCheckBoxGroup(especiesOptions, "Especie")}

    <hr>

    ${createRadioButtonsGroup(edadOptions, "orden_edad", "Edad (Ordenar por)")}

    <hr>

    ${createCheckBoxGroup(sexoOptions, "Sexo")}

    <hr>

    ${createCheckBoxGroup(tamanoOptions, "Tamaño")}
</div>
    `;
}