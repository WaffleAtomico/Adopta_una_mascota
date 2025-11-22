import "dotenv/config.js"

class ConfigService {
    constructor(){
        this.PORT = process.env.PORT || 3000;
        this.HOST = process.env.HOST;
        this.DATABASE_URL = process.env.DATABASE_URL;
        this.SECRET = process.env.SECRET;
    }
}

const configService = new ConfigService();

export default configService;