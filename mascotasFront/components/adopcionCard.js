export function createAdopcionCard({ 
    mascotaNombre = "Mascota", 
    mascotaRaza = "Sin raza", 
    mascotaImagen = "https://placehold.co/100x100",
    solicitanteNombre = "Usuario", 
    propietarioNombre = "Dueño",
    estado = "pendiente", 
    fecha = new Date().toLocaleDateString(),
    id = ""
} = {}) {
    
    // Determinar colores e iconos según el estado
    const estadoConfig = {
        pendiente: {
            color: "warning",
            icon: "bi bi-hourglass-split",
            texto: "Pendiente"
        },
        aceptada: {
            color: "success", 
            icon: "bi bi-check-circle",
            texto: "Aceptada"
        },
        rechazada: {
            color: "danger",
            icon: "bi bi-x-circle", 
            texto: "Rechazada"
        }
    };
    
    const config = estadoConfig[estado] || estadoConfig.pendiente;
    
    const card = `
        <div class="card mb-3 shadow-sm adopcion-card" data-id="${id}">
            <div class="card-body">
                <div class="row align-items-center">
                    <!-- Imagen de la mascota -->
                    <div class="col-md-2 text-center">
                        <img src="${mascotaImagen}" alt="${mascotaNombre}" 
                             class="rounded-circle" style="width: 60px; height: 60px; object-fit: cover;">
                    </div>
                    
                    <!-- Información de la mascota -->
                    <div class="col-md-3">
                        <h6 class="card-title mb-1">${mascotaNombre}</h6>
                        <p class="text-muted small mb-0">${mascotaRaza}</p>
                    </div>
                    
                    <!-- Información de la otra persona -->
                    <div class="col-md-3">
                        <p class="mb-1">
                            <strong>${solicitanteNombre}</strong>
                            <span class="text-muted">solicita</span>
                        </p>
                        <p class="text-muted small mb-0">Dueño: ${propietarioNombre}</p>
                    </div>
                    
                    <!-- Estado y fecha -->
                    <div class="col-md-2 text-center">
                        <span class="badge bg-${config.color} d-flex align-items-center justify-content-center">
                            <i class="${config.icon} me-1"></i>
                            ${config.texto}
                        </span>
                        <small class="text-muted d-block mt-1">${fecha}</small>
                    </div>
                    
                    <!-- Acciones -->
                    <div class="col-md-2 text-end">
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="verDetallesSolicitud('${id}')">
                            <i class="bi bi-eye"></i> Ver
                        </button>
                        ${estado === 'pendiente' ? `
                            <button class="btn btn-sm btn-outline-success me-1" onclick="aceptarSolicitud('${id}')">
                                <i class="bi bi-check"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="rechazarSolicitud('${id}')">
                                <i class="bi bi-x"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

export function createAdopcionSection(titulo, solicitudes, tipo = "enviadas") {
    const section = `
        <div class="col-lg-6">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">
                        <i class="bi bi-${tipo === 'enviadas' ? 'send' : 'inbox'} me-2"></i>
                        ${titulo}
                        <span class="badge bg-light text-primary float-end">${solicitudes.length}</span>
                    </h5>
                </div>
                <div class="card-body p-0" style="max-height: 600px; overflow-y: auto;">
                    ${solicitudes.length > 0 ? solicitudes.map(solicitud => createAdopcionCard(solicitud)).join('') : 
                        '<div class="text-center py-4 text-muted">No hay solicitudes ' + tipo + '</div>'}
                </div>
            </div>
        </div>
    `;
    
    return section;
}
