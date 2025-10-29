export function createRadioButtonsGroup(options = [], groupName = "radioGroup", title = "") {

    const RadioButtonsGroup = `
        <div class="radio-group text-start">
        <h3 class="mb-3">${title}</h3>
        ${options.map((optionText, index) => `
            <div class="form-check mb-2 d-flex align-items-center">
            <input 
                class="form-check-input custom-radio me-2" 
                type="radio" 
                name="${groupName}" 
                id="radio-${index}-${index}" 
                value="${optionText}"
            >
            <label 
                class="form-check-label flex-grow-1" 
                for="radio-${index}"
                style="text-align: left;"
            >
                ${optionText}
            </label>
            </div>
        `).join("")}
        </div>
  `;

    return RadioButtonsGroup;
}