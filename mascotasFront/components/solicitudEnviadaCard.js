export function createSolicitudEnviadaCard({ 
    mascotaNombre = "Mascota", 
    mascotaImagen = "https://placehold.co/80x80",
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
        <div class="col-md-6 col-lg-4 mb-3">
            <div class="card h-100 shadow-sm solicitud-enviada-card" data-id="${id}" style="cursor: pointer;" onclick="verDetallesSolicitud('${id}')">
                <div class="card-body text-center p-3">
                    <!-- Imagen de la mascota -->
                    <div class="mb-3">
                        <img src="${mascotaImagen}" alt="${mascotaNombre}" 
                             class="rounded-circle" style="width: 80px; height: 80px; object-fit: cover; border: 3px solid #f8f9fa;">
                    </div>
                    
                    <!-- Nombre de la mascota -->
                    <h6 class="card-title mb-2 fw-bold">${mascotaNombre}</h6>
                    
                    <!-- Estado de la solicitud -->
                    <div class="mb-2">
                        <span class="badge bg-${config.color} d-flex align-items-center justify-content-center">
                            <i class="${config.icon} me-1"></i>
                            ${config.texto}
                        </span>
                    </div>
                    
                    <!-- Fecha -->
                    <small class="text-muted">
                        <i class="bi bi-calendar3 me-1"></i>
                        ${fecha}
                    </small>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

export function createSolicitudesEnviadasSection(solicitudes) {
    const section = `
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">
                        <i class="bi bi-send me-2"></i>
                        Mis Solicitudes Enviadas
                        <span class="badge bg-light text-primary float-end">${solicitudes.length}</span>
                    </h5>
                </div>
                <div class="card-body p-4">
                    ${solicitudes.length > 0 ? 
                        `<div class="row">
                            ${solicitudes.map(solicitud => createSolicitudEnviadaCard(solicitud)).join('')}
                        </div>` : 
                        '<div class="text-center py-5 text-muted">' +
                        '<i class="bi bi-inbox display-4 d-block mb-3"></i>' +
                        '<h5>No has enviado solicitudes de adopción</h5>' +
                        '<p class="mb-0">Cuando solicites adoptar una mascota, aparecerá aquí.</p>' +
                        '</div>'}
                </div>
            </div>
        </div>
    `;
    
    return section;
}
