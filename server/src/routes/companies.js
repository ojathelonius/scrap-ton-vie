import {
    Router
} from 'express';
import pg_client from '../pg_client';

export default () => {
    let companies = Router();

    companies.get('/', async (req, res, next) => {
        const result = await pg_client.query(`
            WITH companies AS (SELECT UPPER(company) AS company FROM offer GROUP BY UPPER(company) ORDER BY company)
            SELECT json_agg(INITCAP(company)) AS array FROM companies
        `);
        res.send(result.rows[0].array);
    });

    return companies;
}