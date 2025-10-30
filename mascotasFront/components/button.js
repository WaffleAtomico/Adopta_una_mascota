export function createButton({ 
    text = "Botón", 
    color = "primary", 
    size = "md", 
    type = "button", //Puede ser submit
    iconleft = "", 
    iconright = "", 
    outlined = false 
} = {}) {
    const btnType = outlined ? `btn-outline-${color}` : `btn-${color}`;
    const btnSize = size === "sm" || size === "lg" ? `btn-${size}` : "";

    const buttonHTML = `
        <button 
            type="${type}" 
            class="btn ${btnType} ${btnSize} d-flex align-items-center justify-content-center mx-auto d-block gap-2">
            ${iconleft ? `<i class="${iconleft}"></i>` : ""}
            <span>${text}</span>
            ${iconright ? `<i class="${iconright}"></i>` : ""}
        </button>
    `;
    
    return buttonHTML;
}


//todo componente nuevo se debe pensar para que sea completamente editable
// además de responsivo desde poca información hasta mucha