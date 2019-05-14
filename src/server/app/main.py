from flask import Flask, json
import psycopg2
import configparser

# Flask app
app = Flask(__name__)

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
@app.route("/countries")
def countries():
    cur.execute('WITH countries AS (SELECT UPPER(country) AS country FROM offer GROUP BY UPPER(country) ORDER BY country) SELECT json_agg(INITCAP(country)) FROM countries')
    result = cur.fetchone()
    conn.commit()
    return json.dumps(result[0])

@app.route("/companies")
def companies():
    cur.execute('WITH companies AS (SELECT UPPER(company) AS company FROM offer GROUP BY UPPER(company) ORDER BY company) SELECT json_agg(INITCAP(company)) FROM companies')
    result = cur.fetchone()
    conn.commit()
    return json.dumps(result[0])