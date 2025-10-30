import { createButton } from "../../components/button.js"

document.addEventListener("DOMContentLoaded", () => {
    const loginButtonContainer = document.getElementById("login-button");
    const loginButton = createButton({text: "Acceder", 
                                            iconright: "bi bi-box-arrow-in-right", 
                                            color:"primary"})
    loginButtonContainer.innerHTML = loginButton;
    
    
    const createAccButtonContainer = document.getElementById("createAcc-button");
    const createAccButton = createButton({text: "Crear cuenta", 
                                            iconleft: "bi bi-person-fill-add", 
                                            color:"success"})
    createAccButtonContainer.innerHTML = createAccButton;

    const backButtonContainer = document.getElementById("back-button");
    const backButton = createButton({text: "Volver a componentes", 
                                            iconleft: "bi bi-arrow-return-left", 
                                            color:"secondary"})
    backButtonContainer.innerHTML = backButton;
})