![Example map](/github/banner-map.jpg?raw=true "Example map")

# Scrap ton VIE


## Deployment

### Development

Launch the virtual environment with :

```bash
pipenv install
```

Then :

```bash
FLASK_APP=main.py flask run
```

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
