import {
    Client
} from 'pg';

const client = new Client({
    user: 'user',
    host: 'host',
    database: 'database',
    password: 'password',
    port: 5432
});

client.connect();

export default client;