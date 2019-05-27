import {
    Router
} from 'express';
import pg_client from '../pg_client';

export default () => {
    let countries = Router();

    countries.get('/', async (req, res, next) => {
        const result = await pg_client.query(`
            WITH countries AS (SELECT UPPER(country) AS country FROM offer GROUP BY UPPER(country) ORDER BY country)
            SELECT json_agg(INITCAP(country)) AS array FROM countries
        `);
        res.send(result.rows[0].array);
    });

    return countries;
}