export function createPagination({
    currentPage = 1,
    totalPages = 1,
    onPageChange = null,
    maxVisiblePages = 5
} = {}) {
    // Evitar mostrar la paginación si solo existe una pagina
    if (totalPages <= 1) {
        return '';
    }

    let paginationHTML = '<nav aria-label="Page navigation"><ul class="pagination">';
    
    // Crear el boton de atras
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>`;
    
    // Mantiene la paginación en pantalla
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Ajustamos la paginación si estamos cerca del final
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Si la paginación no inicia en 1 se muestra ... para indicar que hay mas paginas
    if (startPage > 1) {
        paginationHTML += `
            <li class="page-item">
                <a class="page-link" href="#" data-page="1">1</a>
            </li>`;
        if (startPage > 2) {
            paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    // Números de página
    for (let i = startPage; i <= endPage; i++) {
        const isActive = i === currentPage ? 'active' : '';
        paginationHTML += `
            <li class="page-item ${isActive}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>`;
    }
    
    // Agrega los ... al final de la paginación, si no termina en la última pagina
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
        paginationHTML += `
            <li class="page-item">
                <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
            </li>`;
    }
    
    // Boton Siguiente
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>`;
    
    paginationHTML += '</ul></nav>';
    
    
    if (onPageChange) {
        const script = `
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const paginationLinks = document.querySelectorAll('.pagination a[data-page]');
                    paginationLinks.forEach(link => {
                        link.addEventListener('click', function(e) {
                            e.preventDefault();
                            const page = parseInt(this.dataset.page);
                            if (!isNaN(page) && page > 0 && page <= ${totalPages}) {
                                (${onPageChange.toString()})(page);
                            }
                        });
                    });
                });
            </script>`;
        paginationHTML += script;
    }
    
    return paginationHTML;
}
