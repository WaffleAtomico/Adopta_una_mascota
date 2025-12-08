import { createForm } from "../../components/createForm.js";
import { createTextInput } from "../../components/textInput.js";
import { createButton } from "../../components/button.js";

// Función para mostrar alerta
function showAlert(message, type = 'warning') {
    const alertContainer = document.getElementById('alert-container');
    const alertMessage = document.getElementById('alert-message');
    const alertDiv = alertContainer.querySelector('.alert');
    
    alertMessage.textContent = message;    
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertContainer.style.display = 'block';
}

document.addEventListener("DOMContentLoaded", () => {
    const formElements = [
        {
            type: "input",
            html: createTextInput(
                "nombre-input",
                "Nombre*",
                "Ingresa tu nombre",
                {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                    feedback: "El nombre es requerido (2-20 caracteres)."
                },
               
            )
        },
        {
            type: "input",
            html: createTextInput(
                "apellidoPaterno-input",
                "Apellido Paterno",
                "Ingresa tu apellido paterno",
                {
                    required: false,
                    minLength: 3,
                    maxLength: 50,
                    feedback: "Máximo 20 caracteres."
                }
            )
        },
        // Email field
        {
            type: "input",
            html: createTextInput(
                "email-input",
                "Correo Electrónico*",
                "ejemplo@correo.com",
                {
                    type: "email",
                    required: true,
                    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                    feedback: "Por favor ingresa un correo electrónico válido."
                }
            )
        },
        {
            type: "input",
            html: createTextInput(
                "telefono-input",
                "Teléfono",
                "Ingresa tu número de teléfono",
                {
                    type: "tel",
                    required: false,
                    pattern: "[0-9]{10}",
                    feedback: "Por favor ingresa un número de teléfono válido (10 dígitos)."
                }
            )
        },
        {
            type: "input",
            html: createTextInput(
                "password-input",
                "Contraseña*",
                "Crea una contraseña segura",
                {
                    type: "password",
                    required: true,
                    minLength: 8,
                    feedback: "La contraseña debe tener al menos 8 caracteres."
                }
            )
        },
        {
            type: "input",
            html: createTextInput(
                "confirmPassword-input",
                "Confirmar Contraseña*",
                "Vuelve a escribir tu contraseña",
                {
                    type: "password",
                    required: true,
                    feedback: "Las contraseñas deben coincidir."
                }
            )
        },
        {
            type: "button",
            html: createButton({
                text: "Crear Cuenta",
                color: "primary",
                size: "lg",
                type: "submit",
                id: "btn-register"
            })
        }
    ];

    const formContainer = document.getElementById("registration-form");
    formContainer.innerHTML = createForm("registrationForm", formElements);

    const form = document.getElementById("registrationForm");
    form.addEventListener("submit", handleRegistration);

    const passwordInput = form.querySelector('input[type="password"]');
    const confirmPasswordInput = form.querySelectorAll('input[type="password"]')[1];
    
    confirmPasswordInput.addEventListener('input', () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("Las contraseñas no coinciden");
        } else {
            confirmPasswordInput.setCustomValidity("");
        }
    });
});

async function handleRegistration(event) {
    event.preventDefault();
    
    const form = event.target;
    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    try {
        const formData = {
            nombre: form.querySelector('#nombre-input').value,
            apellidoPaterno: form.querySelector('#apellidoPaterno-input').value,
            email: form.querySelector('#email-input').value,
            telefono: form.querySelector('#telefono-input').value,
            password: form.querySelector('#password-input').value,
            rol: "OWNER"
        };
        console.log(formData)
        console.log(JSON.stringify(formData))

        const response = await fetch('/api/User/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el registro');
        }

        console.log({res: response})

        const data = await response.json();
        showAlert('¡Cuenta creada exitosamente! Redirigiendo...', 'success');
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 2000);
    } catch (error) {
        console.error('Error:', error);
        showAlert(error.message || 'Ocurrió un error al crear la cuenta. Por favor, inténtalo de nuevo.', 'danger');
    }
}