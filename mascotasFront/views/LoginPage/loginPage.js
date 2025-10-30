import { createTextInput } from "../../components/textInput.js";
import { createButton } from "../../components/button.js";
import { createForm } from "../../components/createForm.js"

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("loginContainer");
  const elements = [
    {
      type: "input",
      html: createTextInput("Correo electrónico", "Ingresa tu correo", { 
        required: true, 
        type: "email", 
        feedback: "Por favor ingresa un correo válido."
      })
    },
    {
      type: "input",
      html: createTextInput("Contraseña", "Ingresa tu contraseña", { 
        required: true, 
        type: "password", 
        minLength: 6, 
        feedback: "Debe tener al menos 6 caracteres."
      })
    },
    {
      type: "button",
      html: createButton({ 
        text: "Iniciar sesión", 
        color: "primary", 
        type: "submit", 
        iconleft: "bi bi-box-arrow-in-right" 
      })
    }
  ];

  container.innerHTML = createForm("loginForm", elements);

  const form = document.getElementById("loginForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    window.location.href = "../Dashboard/dashboard.html"
  });
});
