// Navbar fija inferior completamente estática con Bootstrap
export function createNavbar(color = "#198754") {

    const links = ["Inicio", "Mascotas", "Adoptar", "Contacto"];

    const icons = [
        "bi bi-house-door",
        "bi bi-heart-pulse",
        "bi bi-paw",
        "bi bi-envelope"
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
