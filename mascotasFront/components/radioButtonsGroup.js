export function createRadioButtonsGroup(options = [], groupName = "radioGroup", title = "") {

    const RadioButtonsGroup = `
        <div class="radio-group text-start">
        <h3 class="mb-3">${title}</h3>
        ${options.map((option, index) => {
            const optionText = typeof option === 'string' ? option : option.text;
            const optionValue = typeof option === 'string' ? option : option.value;
            
            return `
            <div class="form-check mb-2 d-flex align-items-center">
            <input 
                class="form-check-input custom-radio me-2" 
                type="radio" 
                name="${groupName}" 
                id="radio-${index}-${index}" 
                value="${optionValue}"
            >
            <label 
                class="form-check-label flex-grow-1" 
                for="radio-${index}-${index}"
                style="text-align: left;"
            >
                ${optionText}
            </label>
            </div>
        `;
        }).join("")}
        </div>
  `;

    return RadioButtonsGroup;
}