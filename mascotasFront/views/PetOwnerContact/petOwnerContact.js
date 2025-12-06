import { initNavbar } from "../../components/navbar.js";
import { createUserProfile } from "../../components/user.profile.js";

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    
    const mainContainer = document.querySelector("main");
    
    if (mainContainer) {
        const pathParts = window.location.pathname.split('/');
        const userId = pathParts[pathParts.length - 1];
        
        if (userId) {
            
            fetch(`/api/User/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }
                return response.json();
            })
            .then(userData => {
                const actualUserData = userData.user || userData;
                              
                const userProfile = createUserProfile(actualUserData);
                mainContainer.innerHTML = userProfile;
                
            })
            .catch(error => {
                console.error('Error:', error);
                mainContainer.innerHTML = `
                    <div class="container mt-5">
                        <div class="alert alert-danger">
                            <h4>Error al cargar el perfil del usuario</h4>
                            <p>No se pudieron obtener los datos del usuario. Por favor, intenta nuevamente más tarde.</p>
                        </div>
                    </div>
                `;
            });
        } else {
            mainContainer.innerHTML = userProfile;
        }
    }
});
