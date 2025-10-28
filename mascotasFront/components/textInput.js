export function createTextInput(title = "Campo de texto", placeholder = "Escribe aquí...") {
  const textInputHTML = `
    <div class="mb-3 text-start">
      <label class="form-label fw-semibold">${title}</label>
      <input 
        type="text" 
        class="form-control" 
        placeholder="${placeholder}"
      >
    </div>
  `;

  return textInputHTML;
}
