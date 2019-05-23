from bs4 import BeautifulSoup
import requests
import googlemaps
import psycopg2
import configparser

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

# Browsing through pages (currently around 238)
for page_id in range(1, 240):

    print('Scraping page ' + str(page_id) + '...', flush=True)

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
        company = offer_soup.find(
            id='ContenuPrincipal_BlocA1_m_oOrganization').text
        salary = offer_soup.find(
            id='ContenuPrincipal_BlocA1_m_oIndemnite').text.split('€')[0]
        description = offer_soup.find(
            id='ContenuPrincipal_BlocA1_m_oDescription').text
        geocode_result = gmaps.geocode(city + ',' + country)

        lat = None
        lon = None

        if(geocode_result):
            lat = geocode_result[0]['geometry']['location']['lat']
            lon = geocode_result[0]['geometry']['location']['lng']
        else:
            # Country + city might fail due to improper input data ; try with country alone in this case
            geocode_result = gmaps.geocode(country)
            if(geocode_result):
                lat = geocode_result[0]['geometry']['location']['lat']
                lon = geocode_result[0]['geometry']['location']['lng']

        data = (civiweb_id, position, company, country,
                city, lat, lon, salary, description)
        cur.execute(
            'INSERT INTO offer(civiweb_id, position, company, country, city, lat, lon, salary, description) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)', data)

    # Commit transaction for every page
    conn.commit()

print('Updating geometry...')
cur.execute('UPDATE offer SET geom = ST_Transform(ST_SetSRID(ST_Point(lon, lat), 4326), 3857)')
conn.commit()

conn.close()
print('All done.')
