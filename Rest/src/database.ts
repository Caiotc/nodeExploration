import { env } from "./env";
import knex,{Knex} from "knex";


export const config : Knex.Config = {
    client:"sqlite3",
    connection:{
        filename:env.DATABASE_URL
    },
    migrations:{
        extension:'ts',
        directory:'./db/migrations',
    },
    useNullAsDefault:true
}
export const setup = knex(config);