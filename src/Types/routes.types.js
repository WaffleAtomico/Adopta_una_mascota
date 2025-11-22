import { fileURLToPath } from "node:url"
import path from "node:path"

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const rootpath = path.resolve(__dirname,'../..');

export const Routes = Object.freez({
    products:{
        '/home' : `${rootpath}/views/home.html`
    }
});