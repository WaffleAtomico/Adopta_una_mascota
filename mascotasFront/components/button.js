// Función que crea un botón completamente editable con Bootstrap
export function createButton({ 
    text = "Botón", 
    color = "primary", 
    size = "md", 
    icon = "", 
    outlined = false 
} = {}) {
    const btnType = outlined ? `btn-outline-${color}` : `btn-${color}`;
    const btnSize = size === "sm" || size === "lg" ? `btn-${size}` : "";
    
    // Creamos el innerHTML directamente como variable lista para insertar
    const buttonHTML = `
        <button type="button" class="btn ${btnType} ${btnSize} d-flex align-items-center justify-content-center gap-2">
            ${icon ? `<i class="${icon}"></i>` : ""}
            <span>${text}</span>
        </button>
    `;
    
    return buttonHTML;
}


//todo componente nuevo se debe pensar para que sea completamente editable
// además de responsivo desde poca información hasta mucha