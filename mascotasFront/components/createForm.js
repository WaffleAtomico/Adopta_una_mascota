export function createForm(formId = "NewForm", elements = []) {

    console.log(elements)
  const formHTML = `
    <form id="${formId}" class="was-validated p-3 border rounded d-flex flex-column gap-3">
      ${elements.map(element => {
        switch(element.type) {
          case "input":
            return element.html; // Debe venir de createTextInput()
          case "button":
            return element.html; // Debe venir de createButton()
          case "checkbox":
            return element.html; // Debe venir de createCheckBoxGroup()
          case "radio":
            return element.html; // Debe venir de createRadioButtonsGroup()
          default:
            return "";
        }
      }).join("")}
    </form>
  `;

  return formHTML;
}
