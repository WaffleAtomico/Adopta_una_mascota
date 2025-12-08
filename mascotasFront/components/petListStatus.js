export function createMascotaBar({ 
  nombre = "Desconocido", 
  raza = "Sin raza", 
  estado = "pendiente", // puede ser "aprobado", "pendiente", "rechazado"
  icon = "bi bi-info-circle" // por defecto un ícono informativo de Bootstrap Icons
} = {}) {
  
  // Definir color según estado
  let bgColor = "bg-warning"; // amarillo por defecto
  if (estado === "aprobada") bgColor = "bg-success text-white";
  if (estado === "rechazada") bgColor = "bg-danger text-white";

  const barHTML = `
    <div class="d-flex justify-content-between align-items-center rounded px-3 py-2 mb-2 ${bgColor}">
      <div class="text-start">
        <h6 class="mb-0 fw-bold">${nombre}</h6>
        <small class="text-light">${raza}</small>
      </div>

      <div class="ms-auto me-2">${String(estado).charAt(0).toUpperCase() + String(estado).slice(1)}</div>
      <i class="${icon}" style="font-size: 1.4rem;"></i>
    </div>
  `;

  return barHTML;
}