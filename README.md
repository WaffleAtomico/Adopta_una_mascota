# 🐶 Proyecto de Adopción y Registro de Mascotas

## 📖 Descripción General

Este proyecto está dirigido a todas aquellas personas que tienen una **mascota** pero, por diferentes razones, **ya no pueden mantenerla**, así como a **todas las mascotas rescatadas** de la calle o de cualquier situación que requiera una segunda oportunidad.  

El sistema está diseñado para funcionar como una **aplicación web**, donde los usuarios podrán **registrar información de sus mascotas**:  
- Nombre  
- Raza  
- Edad  
- Sexo  
- Estado de esterilización  
- Ciudad  
- Y otros datos relevantes  

Además, incluye **funcionalidades de adopción**, permitiendo que otras personas interesadas puedan **postularse para adoptar** a las mascotas registradas.

---

## 💻 Tecnologías y Enfoque

El enfoque principal del proyecto es el **Front-End**, encargado de todo lo relacionado con la **visualización de datos** y la **interacción con el usuario**.  
El objetivo es construir una página **dinámica, modular y reutilizable**, utilizando una estructura clara basada en:

- **HTML:** estructura y cuerpo de las vistas.  
- **CSS:** estilos generales y personalizados (en combinación con Bootstrap).  
- **JavaScript:** lógica, interacción y componentes funcionales.  
- **Bootstrap:** framework usado para optimizar el diseño y reducir líneas de código innecesarias en CSS, HTML y JS.  

---

## 🧩 Componentes

Cada componente del proyecto (botones, formularios, tarjetas, listados, etc.) se está desarrollando de forma **independiente y reutilizable**, para garantizar una integración más ordenada en las vistas finales.  

📍 **Ruta actual de prueba de componentes:**  
`mascotasFront/pruebas.html`  

Ejecuta este archivo en tu navegador para visualizar los componentes creados y probar su comportamiento.

---

## 🚧 Estado del Proyecto

🔹 En desarrollo activo.  
Actualmente, nos encontramos en la **fase de construcción de componentes individuales**.  

> 📝 **Nota importante:**  
> Una vez completados todos los componentes, procederemos a **armar las vistas completas**, conectando cada parte del sistema con sus respectivas funciones visuales y lógicas.

---

## 🗂️ Estructura y Organización del Proyecto

Se recomienda seguir la siguiente convención de trabajo:

- **Editar los archivos HTML de views**, y dejar **cada vista dentro de su propia carpeta**, junto con su archivo **JS** correspondiente.  
  - Ejemplo:
    ```
    /views
     ├── home/
     │   ├── home.html
     │   └── home.js
     ├── adopt/
     │   ├── adopt.html
     │   └── adopt.js
     └── register/
         ├── register.html
         └── register.js
    ```

- Usar **un solo archivo CSS general** para temas globales o ajustes específicos, apoyándose principalmente en **Bootstrap** para la mayor parte del estilo visual.  
  - Ejemplo:
    ```
    /styles/stylesheet.general.css
    ```

---

## 🚀 Deploy (pendiente)

📦 **URL del despliegue:**  
> _A definir próximamente_  

*(Este espacio se reservará para colocar el enlace del deploy una vez que el proyecto esté publicado.)*

---

## ✨ Próximos pasos

1. Finalizar el desarrollo de todos los **componentes modulares**.  
2. Integrar dichos componentes en **vistas completas**.  
3. Conectar la aplicación con el **backend o base de datos** (si aplica).  
4. Publicar el proyecto y documentar el **proceso de despliegue**.

---
