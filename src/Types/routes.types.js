import { fileURLToPath } from "node:url";
import path from "node:path";

//* Obtenemos la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

//* Obtenemos la ruta del directorio actual
const __dirname = path.dirname(__filename);

//* Subimos dos niveles para llegar a la raíz del proyecto
const rutaRaizProyecto = path.resolve(__dirname, '../..');
console.log("Ruta raiz",rutaRaizProyecto)

/**
 * @constant
 * @type {Readonly<{Auth: Readonly<{[key: string]: string}>>}
 * @description Objeto inmutable que almacena la ubicación física de los archivos HTML
 * de las vistas del front-end, agrupadas por su contexto lógico.
 */
export const Rutas = Object.freeze({
    /**
     * @constant
     * @type {Readonly<{[key: string]: string}>}
     * @description Rutas de autenticación y registro
     */
    Auth: {
        '/login': `${rutaRaizProyecto}/mascotasFront/views/LoginPage/loginPage.html`,
        '/registro': `${rutaRaizProyecto}/mascotasFront/views/CreateAccount/createAccount.html`
    },
    
    /**
     * @constant
     * @type {Readonly<{[key: string]: string}>}
     * @description Rutas principales de la aplicación
     */
    Main: {
        '/': `${rutaRaizProyecto}/mascotasFront/views/LandPage/landPage.html`,
        '/dashboard': `${rutaRaizProyecto}/mascotasFront/views/Dashboard/dashboard.html`,
        '/mascotas': `${rutaRaizProyecto}/mascotasFront/views/PetList/petList.html`,
        '/mascotas-registrar': `${rutaRaizProyecto}/mascotasFront/views/PetRegistry/petRegistry.html`,
        '/mascotas/:id': `${rutaRaizProyecto}/mascotasFront/views/PetProfile/petProfile.html`,
        '/perfil': `${rutaRaizProyecto}/mascotasFront/views/UserProfilePage/userProfilePage.html`,
        '/contacto': `${rutaRaizProyecto}/mascotasFront/views/ContactPage/ContactPage.html`,
        '/postulacion': `${rutaRaizProyecto}/mascotasFront/views/PostulationPage/postulationPage.html`,
        '/estado': `${rutaRaizProyecto}/mascotasFront/views/StatusPage/statusPage.html`,
        '/adopcion': `${rutaRaizProyecto}/mascotasFront/views/AdopcionPage/adopcionPage.html`,
        '/contacto-dueno/:id': `${rutaRaizProyecto}/mascotasFront/views/PetOwnerContact/petOwnerContact.html`
    },
});