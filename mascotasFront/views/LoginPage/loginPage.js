import { createTextInput } from "../../components/textInput.js";
import { createButton } from "../../components/button.js";
import { createForm } from "../../components/createForm.js"

async function verificarSesion() {
  try {
    const resp = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include" 
    });

    if (resp.ok) {
      window.location.href = "/dashboard";
      return;
    }
  } catch (err) {
    console.log("No hay sesión activa");
  }
}

verificarSesion();


document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("loginContainer");
  const elements = [
    {
      type: "input",
      html: createTextInput("email-input", "Correo electrónico", "Ingresa tu correo", {
        required: true,
        type: "email",
        feedback: "Por favor ingresa un correo válido."
      })
    },
    {
      type: "input",
      html: createTextInput("pwd-input", "Contraseña", "Ingresa tu contraseña", {
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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.querySelector('#email-input').value;
    const password = form.querySelector('#pwd-input').value;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      window.location.href = '/dashboard';

    } catch (error) {
      console.error('Error:', error);
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  });


});
