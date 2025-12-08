import { initNavbar } from "../../components/navbar.js";

document.addEventListener("DOMContentLoaded", async () => {
    initNavbar();
    await initPetRegistry();
});

async function initPetRegistry() {
    try {
        // Load user data
        const me = await fetch("/api/auth/me", { credentials: "include" });
        if (!me.ok) throw new Error('Error al cargar datos del usuario');
        const { user } = await me.json();
        
        // Store user ID for later use
        window.currentUserId = user.id;
        
        // Load and display user's pets
        await loadUserPets(user.id);
        
        // Setup form submission
        setupPetForm();
    } catch (error) {
        console.error('Error inicializando el registro de mascotas:', error);
        showAlert('Error al cargar la página. Por favor recarga.', 'danger');
    }
}

async function loadUserPets(userId) {
    try {
        const response = await fetch(`/api/Mascotas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });

        if (!response.ok) throw new Error('Error al cargar las mascotas');

        const { mascotas } = await response.json();
        const userPets = mascotas.filter(m => m.publicadoPor === userId);

        renderPetsList(userPets);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('pets-list').innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-muted">Error al cargar las mascotas. Intenta recargar la página.</p>
            </div>
        `;
    }
}

function renderPetsList(pets) {
    const container = document.getElementById('pets-list');
    if (!container) return;

    if (!pets.length) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-muted">No tienes mascotas registradas.</p>
            </div>`;
        return;
    }

    container.innerHTML = pets.map(pet => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${escapeHtml(pet.nombre)}</h5>
                    <p class="card-text">
                        <span class="badge bg-secondary me-2">${pet.especie}</span>
                        <span class="badge bg-info me-2">${pet.raza}</span>
                        <span class="badge bg-primary">${pet.edad} años</span>
                    </p>
                    <p class="card-text">${pet.descripcion || 'Sin descripción'}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge ${pet.estadoSalud === 'sano' ? 'bg-success' : 'bg-warning'}">
                            ${formatHealthStatus(pet.estadoSalud)}
                        </span>
                        <a href="/mascotas/${pet._id}" class="btn btn-sm btn-outline-primary">
                            Ver detalles
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function setupPetForm() {
    const form = document.getElementById('pet-form');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const spinner = document.getElementById('submit-spinner');
        
        try {
            // Disable submit button and show spinner
            submitBtn.disabled = true;
            spinner?.classList.remove('d-none');

            const formData = new FormData(form);
            const petData = {
                nombre: formData.get('nombre'),
                especie: formData.get('especie'),
                raza: formData.get('raza'),
                edad: parseFloat(formData.get('edad')),
                sexo: formData.get('sexo'),
                tamaño: formData.get('tamano'),
                ciudad: formData.get('ciudad'),
                estado: formData.get('estado'),
                estadoSalud: formData.get('estadoSalud'),
                caracter: formData.get('caracter'),
                descripcion: formData.get('descripcion') || '',
                peso: formData.get('peso') ? parseFloat(formData.get('peso')) : null,
                publicadoPor: window.currentUserId,
                // Boolean fields
                esterilizado: formData.has('esterilizado'),
                vacunado: formData.has('vacunado'),
                desparasitado: formData.has('desparasitado'),
                microchip: formData.has('microchip')
            };

            console.log('Enviando datos de la mascota:', petData);
            
            const response = await fetch('/api/Mascotas/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(petData)
            });

            let responseData;
            try {
                responseData = await response.json();
                console.log('Respuesta del servidor:', responseData);
            } catch (e) {
                console.error('Error al analizar la respuesta JSON:', e);
                throw new Error('Error en el formato de la respuesta del servidor');
            }

            if (!response.ok) {
                console.error('Error en la respuesta del servidor:', {
                    status: response.status,
                    statusText: response.statusText,
                    data: responseData
                });
                throw new Error(responseData.message || `Error al guardar la mascota (${response.status} ${response.statusText})`);
            }

            // Success - reset form and close modal
            form.reset();
            form.classList.remove('was-validated');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addPetModal'));
            if (modal) modal.hide();

            // Reload pets list
            await loadUserPets(window.currentUserId);
            
            // Show success message
            showAlert('Mascota guardada exitosamente', 'success');

        } catch (error) {
            console.error('Error al guardar la mascota:', error);
            showAlert(error.message || 'Error al guardar la mascota', 'danger');
        } finally {
            // Re-enable submit button and hide spinner
            submitBtn.disabled = false;
            spinner?.classList.add('d-none');
        }
    });

    // Add custom validation for radio buttons
    const formGroups = form.querySelectorAll('.form-check');
    formGroups.forEach(group => {
        const inputs = group.querySelectorAll('input[type="radio"][required]');
        if (inputs.length) {
            inputs.forEach(input => {
                input.addEventListener('change', () => {
                    const formGroup = input.closest('.form-check').parentElement;
                    if (group.querySelector('input:checked')) {
                        formGroup.classList.remove('is-invalid');
                        const feedback = formGroup.querySelector('.invalid-feedback');
                        if (feedback) feedback.style.display = 'none';
                    }
                });
            });
        }
    });
}

// Helper functions
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertDiv);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance(alertDiv);
        alert.close();
    }, 5000);
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatHealthStatus(status) {
    const statusMap = {
        'sano': 'Sano',
        'en_tratamiento': 'En tratamiento',
        'enfermo': 'Enfermo'
    };
    return statusMap[status] || status;
}

// Initialize Bootstrap tooltips
document.addEventListener('DOMContentLoaded', () => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});