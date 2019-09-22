from bs4 import BeautifulSoup
import requests
import googlemaps
import psycopg2
import configparser
from random import randint

# Fetching configuration
config = configparser.ConfigParser()
config.read('config.ini')

# Database
conn = psycopg2.connect(host=config['db']['hostname'], port=config['db']['port'],
                        database=config['db']['database'], user=config['db']['username'], password=config['db']['password'])
cur = conn.cursor()

# Google Maps configuration
# Reverse geocoding needs to be enabled for the given API key
gmaps = googlemaps.Client(key=config['credentials']['api_key'])

# Empty table
cur.execute('TRUNCATE offer')
conn.commit()

first_page = requests.get(
        config['civiweb']['offer_list'] + '1.aspx')
soup = BeautifulSoup(first_page.text, 'html.parser')
total_pages = soup.find(class_='pagination').contents[12].find('a')['href'].split('/FR/offre-liste/page/')[1].split('.aspx')[0]

# Browsing through pages
for page_id in range(1, int(total_pages)):

    print('Scraping page ' + str(page_id) + ' out of ' + total_pages + '...', flush=True)

    page = requests.get(
        config['civiweb']['offer_list'] + str(page_id) + '.aspx')
    soup = BeautifulSoup(page.text, 'html.parser')
    links = soup.find_all(class_='xt_offrelink')

    # Browsing through links
    for link in links:
        civiweb_id = link.get('href').split('/FR/offre/')[1].split('.aspx')[0]
        offer_page = requests.get(
            config['civiweb']['offer_page'] + str(civiweb_id) + '.aspx')
        offer_soup = BeautifulSoup(offer_page.text, 'html.parser')
        position = offer_soup.find(id='ContenuPrincipal_BlocA1_m_oTitle').text
        country = offer_soup.find(id='ContenuPrincipal_BlocA1_m_oContry').text
        city = offer_soup.find(id='ContenuPrincipal_BlocA1_m_oCity').text
        skillsStr = offer_soup.find(id='ContenuPrincipal_BlocB1_m_oCompetence').text
        skills = list(map(lambda domaine: domaine.strip(" "), skillsStr.split(",")))
        company = offer_soup.find(
            id='ContenuPrincipal_BlocA1_m_oOrganization').text
        salary = offer_soup.find(
            id='ContenuPrincipal_BlocA1_m_oIndemnite').text.split('€')[0]
        description = offer_soup.find(
            id='ContenuPrincipal_BlocA1_m_oDescription').text
        geocode_result = gmaps.geocode(city + ',' + country)

        lat = None
        lon = None

        # Make sure the result is not in France, because some offers are not properly located. Use country as a fallback
        if(geocode_result and ("france" not in str.lower(geocode_result[0]['formatted_address']))):
            lat = geocode_result[0]['geometry']['location']['lat']
            lon = geocode_result[0]['geometry']['location']['lng']
        else:
            # Country + city might fail due to improper input data ; try with country alone in this case
            geocode_result = gmaps.geocode(country)
            if(geocode_result):
                lat = geocode_result[0]['geometry']['location']['lat']
                lon = geocode_result[0]['geometry']['location']['lng']

        # Randomize coordinates to avoid stacking features on top of eachother
        if(lat):
            lat = (lat + randint(-100, 100)/3000)
        if(lon):
            lon = (lon + randint(-100, 100)/3000)
        cur.execute('SELECT industry FROM skill_industry WHERE skill IN %s', (tuple(skills),))
        industry = cur.fetchone()[0]
        print(industry, flush=True)
        data = (civiweb_id, position, company, industry, country,
                city, lat, lon, salary, description)
        cur.execute(
            'INSERT INTO offer(civiweb_id, position, company, industry, country, city, lat, lon, salary, description) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', data)

    # Commit transaction for every page
    conn.commit()

print('Updating geometry...')
cur.execute('UPDATE offer SET geom = ST_Transform(ST_SetSRID(ST_Point(lon, lat), 4326), 3857)')
conn.commit()

conn.close()
print('All done.')
