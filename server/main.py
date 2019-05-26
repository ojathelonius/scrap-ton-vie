from flask import Flask, jsonify, make_response
from flask_cors import CORS
import psycopg2
import configparser

# Flask app
app = Flask(__name__)
CORS(app)

# Fetching configuration
config = configparser.ConfigParser()
config.read('config.ini')

# Database
conn = psycopg2.connect(host=config['db']['hostname'], port=config['db']['port'],
                    database=config['db']['database'], user=config['db']['username'], password=config['db']['password'])
cur = conn.cursor()

@app.route("/")
def default():
    return 'API'

# No ORM needed for now
@app.route("/offers")
def offers():
    sql = """
        SELECT row_to_json(fc)
        FROM (
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
        ) AS fc;  
    """
    cur.execute(sql)
    result = cur.fetchone()
    conn.commit()
    return make_response(jsonify(result[0]), 200)

@app.route("/countries")
def countries():
    cur.execute('WITH countries AS (SELECT UPPER(country) AS country FROM offer GROUP BY UPPER(country) ORDER BY country) SELECT json_agg(INITCAP(country)) FROM countries')
    result = cur.fetchone()
    conn.commit()
    return make_response(jsonify(result[0]), 200)

@app.route("/companies")
def companies():
    cur.execute('WITH companies AS (SELECT UPPER(company) AS company FROM offer GROUP BY UPPER(company) ORDER BY company) SELECT json_agg(INITCAP(company)) FROM companies')
    result = cur.fetchone()
    conn.commit()
    return make_response(jsonify(result[0]), 200)