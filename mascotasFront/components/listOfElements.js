export function createScrollableList(items = [], title = "Listado") {
  const listHTML = `
    <div class="text-center mb-3">
      <h3 class="mb-3">${title}</h3>
      <ul 
        class="list-unstyled p-2 border rounded hidden-scrollbar d-flex flex-column align-items-center" 
        style="
          max-height: 200px; 
          overflow-y: auto; 
          scrollbar-width: none;
          -ms-overflow-style: none;
        "
      >
        ${
          items.length > 0
            ? items
                .map(
                  item => `
                  <li 
                    class="py-2 border-bottom w-100 text-center"
                    style="list-style: none;"
                  >
                    ${item}
                  </li>`
                )
                .join("")
            : '<li class="text-muted text-center py-2">Nada por aqui...</li>'
        }
      </ul>
    </div>

    <style>
      .hidden-scrollbar {
        overflow: hidden;
      }

      /* Oculta scrollbars en Chrome, Safari y Edge */
      .hidden-scrollbar::-webkit-scrollbar {
        display: none;
      }
    </style>
  `;

  return listHTML;
}
