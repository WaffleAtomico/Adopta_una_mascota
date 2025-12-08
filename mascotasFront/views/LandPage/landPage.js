import { createButton } from "../../components/button.js"

document.addEventListener("DOMContentLoaded", () => {
    const loginButtonContainer = document.getElementById("login-button");
    const loginButton = createButton({
        text: "Iniciar sesión", 
        iconleft: "bi bi-box-arrow-in-right", 
        color: "outline-primary",
        size: "sm",
        id: "btn-login-button",
    });
    loginButtonContainer.outerHTML = loginButton;
   
    
    const createAccButtonContainer = document.getElementById("createAcc-button");
    const createAccButton = createButton({
        text: "Crear cuenta", 
        color: "primary",
        size: "sm",
        id: "btn-createAcc-button"
    });
    createAccButtonContainer.outerHTML = createAccButton;
    
    document.getElementById("btn-login-button").addEventListener("click", () => {
        window.location.href = "/login";
    });
    document.getElementById("btn-createAcc-button").addEventListener("click", () => {
        window.location.href = "/registro";
    });
})