import { initNavbar } from "../../components/navbar.js";
import { createSolicitudesEnviadasSection } from "../../components/solicitudEnviadaCard.js";

const solicitudesEnviadasDemo = [
    {
        id: "demo1",
        mascotaNombre: "Rother",
        mascotaImagen: "https://placehold.co/80x80/4CAF50/white?text=R",
        estado: "pendiente",
        fecha: "09/12/2025"
    },
    {
        id: "demo2", 
        mascotaNombre: "Luna",
        mascotaImagen: "https://placehold.co/80x80/2196F3/white?text=L",
        estado: "aceptada",
        fecha: "08/12/2025"
    },
    {
        id: "demo3",
        mascotaNombre: "Max",
        mascotaImagen: "https://placehold.co/80x80/FF9800/white?text=M",
        estado: "rechazada",
        fecha: "07/12/2025"
    }
];

const solicitudesRecibidasDemo = [
    {
        id: "demo4",
        mascotaNombre: "Bella",
        mascotaImagen: "https://placehold.co/80x80/E91E63/white?text=B",
        estado: "pendiente",
        fecha: "09/12/2025"
    },
    {
        id: "demo5",
        mascotaNombre: "Charlie",
        mascotaImagen: "https://placehold.co/80x80/9C27B0/white?text=C",
        estado: "pendiente",
        fecha: "08/12/2025"
    }
];

async function initAdopcionPage() {
    try {
        initNavbar();
        
        const solicitudesEnviadas = solicitudesEnviadasDemo;
        const solicitudesRecibidas = solicitudesRecibidasDemo;
        
        renderizarSolicitudes(solicitudesEnviadas, solicitudesRecibidas);
        
    } catch (error) {
        console.error('Error al inicializar la página de adopciones:', error);
        mostrarError('Error al cargar la página: ' + error.message);
    }
}

function renderizarSolicitudes(enviadas, recibidas) {
    const container = document.getElementById('adopcionContainer');
    
    const enviadasSection = createSolicitudesEnviadasSection(enviadas);
    const recibidasSection = createSolicitudesRecibidasSection(recibidas);
    
    container.innerHTML = `
        <div class="row">
            ${enviadasSection}
            ${recibidasSection}
        </div>
    `;
}

function createSolicitudesRecibidasSection(solicitudes) {
    const section = `
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header bg-info text-white">
                    <h5 class="mb-0">
                        <i class="bi bi-inbox me-2"></i>
                        Solicitudes Recibidas
                        <span class="badge bg-light text-info float-end">${solicitudes.length}</span>
                    </h5>
                </div>
                <div class="card-body p-4">
                    ${solicitudes.length > 0 ? 
                        `<div class="row">
                            ${solicitudes.map(solicitud => createSolicitudRecibidaCard(solicitud)).join('')}
                        </div>` : 
                        '<div class="text-center py-5 text-muted">' +
                        '<i class="bi bi-inbox display-4 d-block mb-3"></i>' +
                        '<h5>No tienes solicitudes recibidas</h5>' +
                        '<p class="mb-0">Cuando alguien solicite adoptar tu mascota, aparecerá aquí.</p>' +
                        '</div>'}
                </div>
            </div>
        </div>
    `;
    
    return section;
}

function createSolicitudRecibidaCard({ 
    mascotaNombre = "Mascota", 
    mascotaImagen = "https://placehold.co/80x80",
    estado = "pendiente", 
    fecha = new Date().toLocaleDateString(),
    id = ""
} = {}) {
    
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
            <div class="card h-100 shadow-sm solicitud-recibida-card" data-id="${id}" style="cursor: pointer;" onclick="verDetallesSolicitud('${id}')">
                <div class="card-body text-center p-3">
                    <div class="mb-3">
                        <img src="${mascotaImagen}" alt="${mascotaNombre}" 
                             class="rounded-circle" style="width: 80px; height: 80px; object-fit: cover; border: 3px solid #e3f2fd;">
                    </div>
                    
                    <h6 class="card-title mb-2 fw-bold">${mascotaNombre}</h6>
                    
                    <div class="mb-2">
                        <span class="badge bg-${config.color} d-flex align-items-center justify-content-center">
                            <i class="${config.icon} me-1"></i>
                            ${config.texto}
                        </span>
                    </div>
                    
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

function verDetallesSolicitud(id) {
    // Buscar en ambas listas de demo
    const solicitud = [...solicitudesEnviadasDemo, ...solicitudesRecibidasDemo]
        .find(s => s.id === id);
    
    if (!solicitud) {
        alert('Solicitud no encontrada');
        return;
    }
    
    const contenido = `
        <div class="row">
            <div class="col-md-4 text-center">
                <img src="${solicitud.mascotaImagen}" alt="${solicitud.mascotaNombre}" 
                     class="img-fluid rounded mb-3" style="max-width: 200px;">
                <h5>${solicitud.mascotaNombre}</h5>
                <p class="text-muted">Demostración</p>
            </div>
            <div class="col-md-8">
                <h6>Información de la Solicitud</h6>
                <p><strong>Estado:</strong> 
                    <span class="badge bg-${solicitud.estado === 'pendiente' ? 'warning' : solicitud.estado === 'aceptada' ? 'success' : 'danger'}">
                        ${solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
                    </span>
                </p>
                <p><strong>Fecha:</strong> ${solicitud.fecha}</p>
                <hr>
                <p class="text-muted">Esta es una solicitud de demostración para mostrar el diseño de la interfaz.</p>
            </div>
        </div>
    `;
    
    document.getElementById('detallesContenido').innerHTML = contenido;
    
    const modal = new bootstrap.Modal(document.getElementById('detallesModal'));
    modal.show();
}

function mostrarError(mensaje) {
    const container = document.getElementById('adopcionContainer');
    container.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-triangle me-2"></i>
                ${mensaje}
            </div>
        </div>
    `;
}

window.verDetallesSolicitud = verDetallesSolicitud;

document.addEventListener("DOMContentLoaded", initAdopcionPage);
