import { initNavbar } from "../../components/navbar.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Initialize navbar
    initNavbar();
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    // Load user data
    await loadUserProfile();
    
    // Set up event listeners
    setupEventListeners();
});

async function loadUserProfile() {
    try {
        // Show loading state
        document.querySelectorAll('.card-text').forEach(el => {
            el.textContent = 'Cargando...';
        });
        
        
        const response = await fetch('/api/auth/me', {
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error('Error al cargar el perfil del usuario');
        }
        
        const { user } = await response.json();
        
        // Update UI with user data
        updateProfileUI(user);
        
        // Load user's pets
        await loadUserPets(user._id);
        
    } catch (error) {
        console.error('Error loading user profile:', error);
        showAlert('Error al cargar el perfil. Por favor, inténtalo de nuevo más tarde.', 'danger');
    }
}

function updateProfileUI(user) {
    document.getElementById('user-name').textContent = `${user.nombre || ''} ${user.apellidoPaterno || ''}`.trim() || 'Usuario';
    document.getElementById('user-email').textContent = user.email || 'No especificado';
    document.getElementById('user-email-detail').textContent = user.email || 'No especificado';
    document.getElementById('user-role').textContent = user.rol?.nombre || 'Usuario';
    
    document.getElementById('user-fullname').textContent = 
        `${user.nombre || ''} ${user.apellidoPaterno || ''}`.trim() || 'No especificado';
    
    // Contact info
    document.getElementById('user-phone').textContent = user.telefono?.numero || 'No especificado';
    document.getElementById('user-phone-type').textContent = formatPhoneType(user.telefono?.tipo);
    document.getElementById('user-city').textContent = user.ciudad || 'No especificada';
    document.getElementById('user-state').textContent = user.estado || 'No especificado';
    
    updateUserAvatar(user);
    
   fillEditForm(user);
}

function fillEditForm(user) {
    document.getElementById('edit-nombre').value = user.nombre || '';
    document.getElementById('edit-apellidoPaterno').value = user.apellidoPaterno || '';
    document.getElementById('edit-email').value = user.email || '';
    document.getElementById('edit-telefono').value = user.telefono?.numero || '';
    document.getElementById('edit-tipoTelefono').value = user.telefono?.tipo || 'celular';
    document.getElementById('edit-ciudad').value = user.ciudad || '';
    document.getElementById('edit-estado').value = user.estado || '';
}

function updateUserAvatar(user) {
    const name = `${user.nombre || ''} ${user.apellidoPaterno || ''}`.trim() || 'Usuario';
    const avatar = document.querySelector('.profile-avatar');
    if (avatar) {
        if (user.perfil) {
            avatar.src = user.perfil;
        } else {
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
            avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
        }
        avatar.alt = `Foto de perfil de ${name}`;
    }
}

async function loadUserPets(userId) {
    try {
        const response = await fetch(`/api/mascotas?usuario=${userId}`, {
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Error al cargar las mascotas');
        }

        const mascotas = await response.json();
        renderPets(mascotas);
    } catch (error) {
        console.error('Error loading pets:', error);
        document.getElementById('user-pets').innerHTML = `
            <div class="col-12 text-center py-4">
                <p class="text-muted">Error al cargar las mascotas. Intenta recargar la página.</p>
            </div>`;
    }
}

function renderPets(pets) {
    const container = document.getElementById('user-pets');
    if (!container) return;

    if (!pets || pets.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-4">
                <p class="text-muted">No tienes mascotas registradas.</p>
                <a href="/views/PetRegistry/petRegistry.html" class="btn btn-primary mt-2">
                    <i class="bi bi-plus-lg me-2"></i>Agregar Mascota
                </a>
            </div>`;
        return;
    }

    container.innerHTML = pets.map(pet => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100">
                <img src="${pet.imagen || 'https://via.placeholder.com/300'}" 
                     class="card-img-top" 
                     alt="${pet.nombre}"
                     style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${escapeHtml(pet.nombre || 'Sin nombre')}</h5>
                    <p class="card-text">
                        <span class="badge bg-secondary me-1">${pet.especie || 'Sin especie'}</span>
                        <span class="badge bg-info">${pet.raza || 'Sin raza'}</span>
                    </p>
                    <p class="card-text">${pet.descripcion ? escapeHtml(pet.descripcion) : 'Sin descripción'}</p>
                </div>
                <div class="card-footer bg-transparent border-top-0">
                    <a href="/views/PetDetail/petDetail.html?id=${pet._id}" class="btn btn-outline-primary btn-sm">
                        Ver detalles
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Edit profile form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
}

async function handleProfileUpdate(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('save-profile-btn');
    const spinner = document.getElementById('save-spinner');
    
    try {
        submitBtn.disabled = true;
        spinner.classList.remove('d-none');
        
        // Get form data
        const formData = {
            nombre: form.elements['nombre'].value.trim(),
            apellidoPaterno: form.elements['apellidoPaterno'].value.trim(),
            email: form.elements['email'].value.trim(),
            telefono: {
                numero: form.elements['telefono'].value.trim(),
                tipo: form.elements['tipoTelefono'].value
            },
            ciudad: form.elements['ciudad'].value.trim(),
            estado: form.elements['estado'].value.trim()
        };
        
        const response = await fetch('/api/usuarios/me', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al actualizar el perfil');
        }
        
        const { user } = await response.json();
        updateProfileUI(user);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
        if (modal) modal.hide();
        
        showAlert('Perfil actualizado correctamente', 'success');
        
    } catch (error) {
        console.error('Error updating profile:', error);
        showAlert(error.message || 'Error al actualizar el perfil', 'danger');
    } finally {
        submitBtn.disabled = false;
        spinner.classList.add('d-none');
    }
}

function formatPhoneType(type) {
    const types = {
        'celular': 'Celular',
        'casa': 'Casa',
        'trabajo': 'Trabajo'
    };
    return types[type] || type || 'No especificado';
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.role = 'alert';
    alertDiv.style.zIndex = '1100'; // Above everything else
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertDiv);
        bsAlert.close();
    }, 5000);
}