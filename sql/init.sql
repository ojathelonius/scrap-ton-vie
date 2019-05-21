-- Create database + table
CREATE DATABASE viemap;
CREATE TABLE offer(
    id SERIAL PRIMARY KEY,
    civiweb_id BIGINT,
    position VARCHAR(300),
    company VARCHAR(300),
    country VARCHAR(300),
    city VARCHAR(300),
    lat DOUBLE PRECISION,
    lon DOUBLE PRECISION,
    salary SMALLINT,
    description TEXT
);


-- IF USING GEOSERVER
-- Initialize PostGIS plugin on the given database
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;

-- After scraping, process the data geometrically
ALTER TABLE offer ADD COLUMN geom geometry;
COMMENT ON COLUMN offer.geom IS 'Geometry';
UPDATE offer SET geom = ST_Point(lon, lat);