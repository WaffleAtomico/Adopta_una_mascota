import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

// obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Encontrar la raíz del proyecto (donde está package.json)
let currentDir = __dirname;
while (!fs.existsSync(path.join(currentDir, "package.json"))) {
  const parent = path.dirname(currentDir);
  if (parent === currentDir) {
    throw new Error("No se encontró package.json en ningún nivel superior.");
  }
  currentDir = parent;
}

const rutaRaizProyecto = currentDir;

console.log("RAÍZ DETECTADA:", rutaRaizProyecto); 
// → /opt/render/project/src

export const Rutas = Object.freeze({
    Auth: {
        '/login': path.join(rutaRaizProyecto, 'mascotasFront/views/LoginPage/LoginPage.html'),
        '/registro': path.join(rutaRaizProyecto, 'mascotasFront/views/CreateAccount/CreateAccount.html')
    },
    Main: {
        '/': path.join(rutaRaizProyecto, 'mascotasFront/views/LandPage/LandPage.html'),
        '/dashboard': path.join(rutaRaizProyecto, 'mascotasFront/views/Dashboard/Dashboard.html'),
        '/mascotas': path.join(rutaRaizProyecto, 'mascotasFront/views/PetList/PetList.html'),
        '/mascotas-registrar': path.join(rutaRaizProyecto, 'mascotasFront/views/PetRegistry/PetRegistry.html'),
        '/mascotas/:id': path.join(rutaRaizProyecto, 'mascotasFront/views/PetProfile/PetProfile.html'),
        '/perfil': path.join(rutaRaizProyecto, 'mascotasFront/views/UserProfilePage/UserProfilePage.html'),
        '/contacto': path.join(rutaRaizProyecto, 'mascotasFront/views/ContactPage/ContactPage.html'),
        '/postulacion': path.join(rutaRaizProyecto, 'mascotasFront/views/PostulationPage/PostulationPage.html'),
        '/estado': path.join(rutaRaizProyecto, 'mascotasFront/views/StatusPage/StatusPage.html'),
        '/contacto-dueno/:id': path.join(rutaRaizProyecto, 'mascotasFront/views/PetOwnerContact/PetOwnerContact.html')
    },
});
