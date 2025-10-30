export function createTextInput(
  title = "Campo de texto",
  placeholder = "Escribe aquí...",
  validation = {}
) {
  const {
    required = false,
    minLength = "",
    maxLength = "",
    pattern = "",
    type = "text",
    feedback = "Por favor, verifica este campo."
  } = validation;

  const textInputHTML = `
    <div class="mb-3 text-start">
      <label class="form-label fw-semibold">${title}</label>
      <input 
        type="${type}"
        class="form-control"
        placeholder="${placeholder}"
        ${required ? "required" : ""}
        ${minLength ? `minlength="${minLength}"` : ""}
        ${maxLength ? `maxlength="${maxLength}"` : ""}
        ${pattern ? `pattern="${pattern}"` : ""}
      >
      <div class="valid-feedback">Se ve bien!</div>
      <div class="invalid-feedback">${feedback}</div>
    </div>
  `;

  return textInputHTML;
}
