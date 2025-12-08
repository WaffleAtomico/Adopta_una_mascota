export function createScrollableList(items = [], title = "Listado") {
  const listHTML = `
    <div 
      class="text-center mb-3 d-flex flex-column align-items-center justify-content-start" 
      style="height: 100%;"
    >
      <h3 class="mb-3">${title}</h3>
      <ul 
        class="list-unstyled p-2 border rounded hidden-scrollbar w-100" 
        style="
          height: 100%;
          overflow-y: auto; 
          scrollbar-width: none;
          -ms-overflow-style: none;
        "
      >
        ${
          items.map(
            item => `
          <li class="py-2 border-bottom">${item}</li>
        `
          ).join("") || 
          '<li class="text-muted text-center py-2">Sin elementos</li>'
        }
      </ul>
    </div>

    <style>
      .hidden-scrollbar::-webkit-scrollbar {
        display: none;
      }
    </style>
  `;

  return listHTML;
}
