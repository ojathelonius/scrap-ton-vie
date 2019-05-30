![Example map](/github/banner-map.jpg?raw=true "Example map")

# Scrap ton VIE

## Development

### Front-end

Install dependencies :

```bash
npm install
```

Launch the development server with : 
```bash
npm run watch
```

### Back-end
```bash
npm install
```

```bash
npm run build
```

Start scraping by running `python scrap.py` with a proper config.ini in the same directory, e.g :

```
[credentials]
api_key = ABCDEFGHIJKLMNOPQSRTUVW

[civiweb]
offer_list = https://www.civiweb.com/FR/offre-liste/page/
offer_page = https://www.civiweb.com/FR/offre/

[db]
database = my_database
hostname = localhost
port = 5432
username = my_username
password = my_password
```

## Production
### Front-end

In production, use `npm run build` then serve the index.html with the dist folder with any web server.

### Back-end

Run the scrapper as a CRON job.
Inclure full paths to avoid $PATH errors, and include stderr in the log file.

```bash
crontab -e
0 1 */5 * * /usr/bin/env python3.6 /home/user/scrap/scrap.py >> /home/user/scrap/scrap.log 2>&1
```

Build the NodeJS app with `npm run build` then start the server with `forever` or `pm2`.

## Play with data 

### Calculate VIE frequency percentage per country
```sql
WITH total AS (SELECT COUNT(*)::numeric FROM offer)
SELECT COUNT(country) AS nombre, ROUND(COUNT(country)/(SELECT * FROM total), 4) * 100 AS percentage , country FROM offer
GROUP BY country
ORDER BY nombre DESC
```

### Find highest paying locations
```sql
SELECT country, UPPER(city), salary FROM offer
GROUP BY salary, UPPER(city), country
ORDER BY salary DESC
```

### Calculate n-quantiles 
```sql
SELECT salary, ntile(n) OVER (ORDER BY salary) AS quantile FROM offer GROUP BY salary;
```
