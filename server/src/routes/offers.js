import {
    Router
} from 'express';
import pg_client from '../pg_client';

export default () => {
    let offers = Router();

    offers.get('/', async (req, res, next) => {

        // Retrieve params and lowercase
        let params = req.query.params && req.query.params.split(',').map(element => element.toLowerCase());

        // Dataset size allows not using full text search from Postgres
        const result = await pg_client.query(`
                SELECT
                    'FeatureCollection' AS "type",
                    array_to_json(array_agg(f)) AS "features"
                FROM (
                    SELECT
                        'Feature' AS "type",
                        ST_ASGeoJSON(geom)::json AS "geometry",
                        (
                            SELECT row_to_json(t)
                            FROM (
                                SELECT
                                    position,
                                    company,
                                    country,
                                    city,
                                    salary,
                                    civiweb_id
                            ) t
                        ) AS "properties"
                    FROM offer
                    WHERE
                        (lat IS NOT null
                        OR lon IS NOT null)
                    ${params ? 
                        `AND LOWER(description) SIMILAR TO '%(' || ${params.map((element, index) => `$${(index+1)}`).join(` || '|' || `)} || ')%'`
                    : ''}
                ) AS f
        `, params);
        res.send(result.rows[0]);
    });



    return offers;
}