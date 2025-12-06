import { initNavbar } from "../../components/navbar.js";
import { createPetCard } from "../../components/PetsCard.js";
import { createPagination } from "../../components/pagination.js";
import { generarSidebarFiltros } from "../../components/sidebar.js";


document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
});

export function crearMascota(nombre, caracter, especie, raza, ciudad, estado, edad, sexo, imagen) {
    return {
        nombre,
        caracter,
        especie,
        raza,
        ciudad,
        estado,
        edad,
        sexo,
        imagen
    }
}




document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    
    // Obtener el sidebar container y agregar los filtros
    const sidebarContainer = document.getElementById("filter-sidebar-container");
    if (sidebarContainer) {
        sidebarContainer.innerHTML = generarSidebarFiltros();
        setupFilterEventListeners();
    }
    
    const petsGrid = document.getElementById("pets-grid");

    const filtrosActivos = {
        especie: [],
        sexo: [],
        tamano: [],
        orden_edad: ''
    };
    
    // Función para cargar mascotas desde la API
    async function cargarMascotas(pagina = 1) {
        try {
            // Construir URL con filtros
            const params = new URLSearchParams({
                page: pagina,
                limit: 12
            });
                     
            if (filtrosActivos.especie.length > 0) {
                filtrosActivos.especie.forEach(especie => params.append('especie', especie.toLowerCase()));
            }
            if (filtrosActivos.sexo.length > 0) {
                filtrosActivos.sexo.forEach(sexo => params.append('sexo', sexo.toLowerCase()));
            }
            if (filtrosActivos.tamano.length > 0) {
                filtrosActivos.tamano.forEach(tamano => params.append('tamaño', tamano.toLowerCase()));
            }
            if (filtrosActivos.orden_edad) {
                params.append('sortBy', 'edad');
                params.append('sortOrder', filtrosActivos.orden_edad);
            }
            
            const response = await fetch(`/api/Mascotas?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                const { mascotas, totalMascotas, totalPaginas, paginaActual } = data;
                
                // Variable que guarda el html de las tarjetas
                let htmlTarjetas = "";

                // Itera sobre la lista de mascotas y crea sus tarjetas
                mascotas.forEach((mascota) => {
                    htmlTarjetas += createPetCard(mascota);
                });

                petsGrid.innerHTML = htmlTarjetas;
                
                const paginationContainer = document.getElementById("pagination-container");
                if (paginationContainer) {
                    const paginationHTML = createPagination({
                        currentPage: paginaActual,
                        totalPages: totalPaginas,
                        onPageChange: null
                    });
                    
                    paginationContainer.innerHTML = paginationHTML;
                    
                    setupPaginationEventListeners();
                }
            } else {
                console.error("Error al cargar mascotas:", data.msg);
                petsGrid.innerHTML = `<p class='text-center'>Error: ${data.msg || 'Error desconocido'}</p>`;
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            petsGrid.innerHTML = `<p class='text-center'>Error de conexión: ${error.message}</p>`;
        }
    }
    
    // Función para configurar los event listeners de paginación
    function setupPaginationEventListeners() {
        const paginationLinks = document.querySelectorAll('.pagination a[data-page]');
        
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = parseInt(this.dataset.page);
                
                if (!isNaN(page) && page > 0) {
                    cargarMascotas(page);

                    // Scroll al inicio de la página
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }
    
    // Función para configurar los event listeners de filtros
    function setupFilterEventListeners() {
        const checkboxes = document.querySelectorAll('.filters-sidebar input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const filterType = getFilterType(this);
                const value = this.value;
                
                if (this.checked) {
                    // Agregar filtro
                    if (!filtrosActivos[filterType].includes(value)) {
                        filtrosActivos[filterType].push(value);
                    }
                } else {
                    // Quitar filtro
                    const index = filtrosActivos[filterType].indexOf(value);
                    if (index > -1) {
                        filtrosActivos[filterType].splice(index, 1);
                    }
                }
                
                // Recargar mascotas con filtros (reiniciar a página 1)
                cargarMascotas(1);
            });
        });
        
        // Event listeners para radio buttons (orden_edad)
        const radioButtons = document.querySelectorAll('.filters-sidebar input[type="radio"]');
        radioButtons.forEach(radio => {

            radio.addEventListener('change', function() {

                if (this.checked) {
                    const filterType = getFilterType(this);
                    const value = this.value;
                    
                    filtrosActivos[filterType] = value;

                    cargarMascotas(1);
                }
            });
        });
    }
    
    
    function getFilterType(input) {
        const parentGroup = input.closest('.checkbox-group, .radio-group');
        if (!parentGroup) {
            return '';
        }
        
        const title = parentGroup.querySelector('h3');
        if (!title) {
            return '';
        }
        
        const titleText = title.textContent.toLowerCase();
        
        if (titleText.includes('especie')) return 'especie';
        if (titleText.includes('sexo')) return 'sexo';
        if (titleText.includes('tamaño')) return 'tamano';
        if (titleText.includes('edad')) return 'orden_edad';
        
        return '';
    }
    
    // Cargar las mascotas iniciales
    cargarMascotas();
})
