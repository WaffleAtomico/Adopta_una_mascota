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
        '/login': `${rutaRaizProyecto}/mascotasFront/views/LoginPage/LoginPage.html`,
        '/registro': `${rutaRaizProyecto}/mascotasFront/views/CreateAccount/CreateAccount.html`
    },
    
    /**
     * @constant
     * @type {Readonly<{[key: string]: string}>}
     * @description Rutas principales de la aplicación
     */
    Main: {
        '/': `${rutaRaizProyecto}/mascotasFront/views/LandPage/landPage.html`,
        '/dashboard': `${rutaRaizProyecto}/mascotasFront/views/Dashboard/Dashboard.html`,
        '/mascotas': `${rutaRaizProyecto}/mascotasFront/views/PetList/PetList.html`,
        '/mascotas-registrar': `${rutaRaizProyecto}/mascotasFront/views/PetRegistry/PetRegistry.html`,
        '/mascotas/:id': `${rutaRaizProyecto}/mascotasFront/views/PetProfile/PetProfile.html`,
        '/perfil': `${rutaRaizProyecto}/mascotasFront/views/UserProfilePage/UserProfilePage.html`,
        '/contacto': `${rutaRaizProyecto}/mascotasFront/views/ContactPage/ContactPage.html`,
        '/postulacion': `${rutaRaizProyecto}/mascotasFront/views/PostulationPage/PostulationPage.html`,
        '/estado': `${rutaRaizProyecto}/mascotasFront/views/StatusPage/StatusPage.html`,
        '/contacto-dueno/:id': `${rutaRaizProyecto}/mascotasFront/views/PetOwnerContact/PetOwnerContact.html`
    },
});