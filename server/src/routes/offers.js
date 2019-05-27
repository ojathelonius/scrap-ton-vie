import {
    Router
} from 'express';
import pg_client from '../pg_client';

export default () => {
    let offers = Router();

    offers.get('/', async (req, res, next) => {
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
                        lat IS NOT null
                        OR lon IS NOT null
                ) AS f
        `);
        res.send(result.rows[0]);
    });

    return offers;
}