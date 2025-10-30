import { createButton } from "./button.js";

function createNavbar(color = "#198754") {

    const links = ["Inicio", "Mascotas", "Adoptar", "Contacto"];

    const icons = [
        "bi bi-house-door-fill",
        "bi bi-heart-pulse-fill",
        "fa-solid fa-paw",
        "bi bi-envelope-fill"
    ];

    const navbarHTML = `
    <div 
      class="navbar-container fixed-bottom w-100" 
      style="background-color: ${color}; box-shadow: 0 -2px 10px rgba(0,0,0,0.2);"
    >
      <nav class="navbar navbar-expand d-flex justify-content-center align-items-center">
        <ul class="navbar-nav d-flex flex-row justify-content-evenly w-100 text-center m-0">
          ${icons.map((icon, index) => `
            <li class="nav-item flex-fill"
                style="
                    border-left: 0.2px solid #33333360;
                    border-right: 0.2px solid #33333360;
            ">
              <a href="#" class="nav-link text-white d-flex flex-column align-items-center justify-content-center py-2">
                <i class="${icon}" style="font-size: 1.4rem;"></i>
                <span style="font-size: 0.8rem;">${links[index] || ""}</span>
              </a>
            </li>
          `).join("")}
        </ul>
      </nav>
    </div>
  `;

    return navbarHTML;
}


function createNavbarNoPhone(elements = []) {
  const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <i class="bi bi-paw-fill text-warning fs-3 me-2"></i>
          <span class="navbar-brand mb-0 h1">Adopta una mascota</span>
        </div>

        <div class="d-flex align-items-center ms-auto gap-2">
          ${elements.map(el => `${el}`).join("")}
        </div>
      </div>
    </nav>
  `;
  return navbarHTML;
}


export function initNavbar(){
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  console.log(header, footer)

  if (isMobile) {
    footer.innerHTML = createNavbar({ color: "bg-dark" });
  } else {
    const navbarElements = [
      createButton({ text: "Perfil", color: "success", outlined: true }),
      createButton({ text: "Cerrar sesión", color: "warning" })
    ];
    header.innerHTML = createNavbarNoPhone(navbarElements);
  }
}