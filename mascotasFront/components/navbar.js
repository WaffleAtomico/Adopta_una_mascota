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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3 py-2"
   style="box-shadow: 0 2px 5px rgba(0,0,0,0.15);">
    <div class="container-fluid">
      <div class="d-flex align-items-center">
        <i class="bi bi-heart-fill text-primary fs-4 me-2"></i>
        <a href="/dashboard">
          <span class="navbar-brand mb-0 h4 fw-bold text-primary">Adopta una mascota</span>
        </a>
      </div>

      <div class="d-flex align-items-center ms-auto gap-2">
        ${elements.map(el => `${el}`).join("")}
      </div>
    </div>
  </nav>
`;
  return navbarHTML;
}


export function initNavbar() {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (isMobile) {
    footer.innerHTML = createNavbar({ color: "bg-dark" });
  } else {
    const navbarElements = [
      createButton({ text: "Perfil", color: "success", outlined: true, id: "profileBtn" }),
      createButton({ text: "Cerrar sesión", color: "warning", id: "logoutBtn" })
    ];

    header.innerHTML = createNavbarNoPhone(navbarElements);
    const logoutBtn = document.getElementById("logoutBtn");
    const profileBtn = document.getElementById("profileBtn");

    if (profileBtn) {
      profileBtn.addEventListener("click", async () => {
        try {
          // Obtener los datos del usuario actual
          const response = await fetch("/api/auth/me", {
            credentials: "include"
          });
          
          if (response.ok) {
            const userData = await response.json();
            const userId = userData.user.id;
            window.location.href = `/contacto-dueno/${userId}`;
          } else {
            console.error("Error al obtener datos del usuario");
            window.location.href = "/login";
          }
        } catch (err) {
          console.error("Error al cargar perfil:", err);
          window.location.href = "/login";
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include"
          });

          window.location.href = "/";
        } catch (err) {
          console.error("Error en logout:", err);
          window.location.href = "/";
        }
      });
    }
  }
}