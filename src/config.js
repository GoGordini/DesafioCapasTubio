import dotenv from "dotenv";
import { Command } from 'commander';

const program = new Command();

program.option('--mode <modo>', 'variable de ambiente',"DEVELOPMENT");
program.parse();

const environment = program.opts().mode;

dotenv.config(
    {path: (environment === 'DEVELOPMENT') ? './.env.development' : './.env.production'}
    ); //inicializa dotenv

const configs = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    mailAdmin: process.env.MAIL_ADMIN,
    passAdmin: process.env.PASS_ADMIN,
};

export default configs;