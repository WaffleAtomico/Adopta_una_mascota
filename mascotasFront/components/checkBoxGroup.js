export function createCheckBoxGroup(options = [], title = "") {

    const checkBoxGroupHTML = `
    <div class="checkbox-group text-start">
      <h3 class="mb-3">${title}</h3>
      ${options.map((optionText, index) => `
        <div class="form-check mb-2 d-flex align-items-center">
          <input 
            class="form-check-input custom-checkbox me-2" 
            type="checkbox" 
            id="check-${title}-${index}" 
            value="${optionText}"
          >
          <label 
            class="form-check-label flex-grow-1" 
            for="check-${title}-${index}"
            style="text-align: left;"
          >
            ${optionText}
          </label>
        </div>
      `).join("")}
    </div>
  `;

    return checkBoxGroupHTML;
}

//se necesita un css para el custom-checkbox, tristemente si no se modifica eso no se pueden hacer más grandes