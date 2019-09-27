-- Create database + table
CREATE DATABASE viemap;
CREATE TABLE offer(
    id SERIAL PRIMARY KEY,
    civiweb_id BIGINT,
    position VARCHAR(300),
    company VARCHAR(300),
    industry VARCHAR(300),
    country VARCHAR(300),
    city VARCHAR(300),
    lat DOUBLE PRECISION,
    lon DOUBLE PRECISION,
    salary SMALLINT,
    description TEXT
);

CREATE TABLE skill_industry(
    id SERIAL PRIMARY KEY,
    skill TEXT,
    industry VARCHAR(300)
);

-- Grant proper privileges
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public to user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public to user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public to user;

-- Add skills/industry data
INSERT INTO skill_industry(skill, industry) VALUES('Médecine générale et spécialisée', 'Health');
INSERT INTO skill_industry(skill, industry) VALUES('Ingénieur Commercial ou d''Affaires', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Productique', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Commissariat aux comptes', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Mécanique – Génie Mécanique', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Contrôle de Gestion', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Developpement commercial', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Magasinage - Manutention - Conditionnement', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Electronique', 'Electronics');
INSERT INTO skill_industry(skill, industry) VALUES('Logistique', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Microélectronique', 'Electronics');
INSERT INTO skill_industry(skill, industry) VALUES('Business Analyst', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Administration du personnel / Paie', 'HR');
INSERT INTO skill_industry(skill, industry) VALUES('Architecture infrastructures / Cloud et virtualisation', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Intelligence artificielle', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('INFORMATIQUE SCIENTIFIQUE ET INDUSTRIELLE', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Génie Biomédical', 'Health');
INSERT INTO skill_industry(skill, industry) VALUES('Tourisme', 'Tourism');
INSERT INTO skill_industry(skill, industry) VALUES('Géomatique', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Audiovisuel', 'Media');
INSERT INTO skill_industry(skill, industry) VALUES('Publicité', 'Advertising');
INSERT INTO skill_industry(skill, industry) VALUES('Droit International', 'Law');
INSERT INTO skill_industry(skill, industry) VALUES('Emballage', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Webmestre', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Maintenance', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Sciences Animales', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Méthodes', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Transport', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Droit Pénal', 'Law');
INSERT INTO skill_industry(skill, industry) VALUES('Génie Biologique', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Import-Export', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Agroalimentaire', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('illustration', 'Media');
INSERT INTO skill_industry(skill, industry) VALUES('Droit Européen', 'Law');
INSERT INTO skill_industry(skill, industry) VALUES('Sciences Sociales (philosophie', 'Literature');
INSERT INTO skill_industry(skill, industry) VALUES('Gestion de projets culturels', 'Arts');
INSERT INTO skill_industry(skill, industry) VALUES('Génie Civil – Travaux publics', 'Construction');
INSERT INTO skill_industry(skill, industry) VALUES('Institutions financières internationales', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Services aux entreprises', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Economie des réseaux et télécommunications', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('CONSTRUCTION', 'Construction');
INSERT INTO skill_industry(skill, industry) VALUES('Design', 'Arts');
INSERT INTO skill_industry(skill, industry) VALUES('Sécurité informatique', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Langues étrangères appliquées (LEA)', 'Literature');
INSERT INTO skill_industry(skill, industry) VALUES('Metrologie', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Contrôle de gestion industriel', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('…)', 'Literature');
INSERT INTO skill_industry(skill, industry) VALUES('Marketing Stratégique', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Comptabilité - Gestion', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Mécanique des fluides', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Optique', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Gestion de Projets', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Métiers du Livre et de l''Edition', 'Literature');
INSERT INTO skill_industry(skill, industry) VALUES('prospection', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Peintures Encres Adhésifs', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Nucleaire', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Géologie - Géotechnique - Océanographie', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Trade Marketing', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Economie', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Amélioration continue', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Physique', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Droit Public', 'Law');
INSERT INTO skill_industry(skill, industry) VALUES('Economie de l''environnement', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('agro-environnement', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Architecture', 'Construction');
INSERT INTO skill_industry(skill, industry) VALUES('Arts graphiques (dessin', 'Arts');
INSERT INTO skill_industry(skill, industry) VALUES('Statistiques', 'Mathematics');
INSERT INTO skill_industry(skill, industry) VALUES('bio-industrie', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Commerce – Vente - Distribution', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Finances de marchés - trading', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Sociologie…)', 'Literature');
INSERT INTO skill_industry(skill, industry) VALUES('Géoéconomie et intelligence stratégique', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Automobile', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Informatique décisionnelle / Data science', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Maîtrise d''œuvre informatique', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('PRODUCTION INDUSTRIELLE', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Prêt-à-Porter', 'Arts');
INSERT INTO skill_industry(skill, industry) VALUES('Métallurgie', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('INFORMATION ET MEDIAS', 'Media');
INSERT INTO skill_industry(skill, industry) VALUES('Aménagement des territoires', 'Construction');
INSERT INTO skill_industry(skill, industry) VALUES('technico-commercial', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Optronique', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Droit Civil', 'Law');
INSERT INTO skill_industry(skill, industry) VALUES('Sciences Humaines (Histoire', 'Literature');
INSERT INTO skill_industry(skill, industry) VALUES('Gestion des ressources (Bois', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Gestion parc informatique', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Electromécanique', 'Electronics');
INSERT INTO skill_industry(skill, industry) VALUES('Droit Bancaire', 'Law');
INSERT INTO skill_industry(skill, industry) VALUES('Communication', 'Media');
INSERT INTO skill_industry(skill, industry) VALUES('Marketing Digital', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Fiscaliste', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Marketing Pharmaceutique', 'Health');
INSERT INTO skill_industry(skill, industry) VALUES('Matériaux', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Fonderie', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Commerce International', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Chargé / Conseiller clientèle bancaire particuliers / professionnels', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Génie Industriel', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Pharmacie', 'Health');
INSERT INTO skill_industry(skill, industry) VALUES('Plasturgie', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Affaires et études européennes', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Analyste crédit', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Eau...)', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Audit', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Biotechnologies', 'Health');
INSERT INTO skill_industry(skill, industry) VALUES('ACHATS LOGISTIQUE TRANSPORT', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Economie de l''innovation', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('GESTION DE LA PRODUCTION INDUSTRIELLE', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Génie de l''eau', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Droit Général', 'Law');
INSERT INTO skill_industry(skill, industry) VALUES('Agro-développement', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Achats', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Pétrole/Para-Pétrole', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Econométrie', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('psychologie…)', 'Health');
INSERT INTO skill_industry(skill, industry) VALUES('Supply chain', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Marketing', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Documentation - Archivage', 'Literature');
INSERT INTO skill_industry(skill, industry) VALUES('Urbanisme –Géometrie', 'Construction');
INSERT INTO skill_industry(skill, industry) VALUES('Economie du développement', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Politiques publiques et sectorielles', 'Politics');
INSERT INTO skill_industry(skill, industry) VALUES('Assurances', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Back et Middle Office (Banque de marché)', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Génie Electrique', 'Electronics');
INSERT INTO skill_industry(skill, industry) VALUES('Mathématiques', 'Mathematics');
INSERT INTO skill_industry(skill, industry) VALUES('Traduction - Interprétariat', 'Literature');
INSERT INTO skill_industry(skill, industry) VALUES('Génie urbain', 'Construction');
INSERT INTO skill_industry(skill, industry) VALUES('Administration consulaire', 'Politics');
INSERT INTO skill_industry(skill, industry) VALUES('Marketing Opérationnel', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Marketing Direct', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Economie monétaire et financière', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Hôtellerie - Restauration', 'Tourism');
INSERT INTO skill_industry(skill, industry) VALUES('Finance', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Enseignement', 'Teaching');
INSERT INTO skill_industry(skill, industry) VALUES('Relations Internationales', 'Politics');
INSERT INTO skill_industry(skill, industry) VALUES('Management', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Data extraction analyse', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Direction financière (DAF', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Immobilier', 'Housing');
INSERT INTO skill_industry(skill, industry) VALUES('Mécatronique', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Multimédia / Digital / Numérique', 'Media');
INSERT INTO skill_industry(skill, industry) VALUES('Actuariat', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Développement logiciel', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Prévention - Hygiène - Sécurité', 'Health');
INSERT INTO skill_industry(skill, industry) VALUES('Economie des transports / infrastructures', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Gestion de la production', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Réseaux et télécoms', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Medias', 'Media');
INSERT INTO skill_industry(skill, industry) VALUES('Marketing Produit/Marketing de marque', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Oenologie', 'Tourism');
INSERT INTO skill_industry(skill, industry) VALUES('Gestion de projets industriels', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Maîtrise d''ouvrage informatique', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Langues et Civilisations Etrangères (LCE)', 'Literature');
INSERT INTO skill_industry(skill, industry) VALUES('Coopération scientifique', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Qualité systèmes', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Etudes macroéconomiques', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Sciences Politiques', 'Politics');
INSERT INTO skill_industry(skill, industry) VALUES('Froid et Climatisation', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Défense', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Industrie du Bois', 'Logistics');
INSERT INTO skill_industry(skill, industry) VALUES('Humanitaire', 'Humanitarian');
INSERT INTO skill_industry(skill, industry) VALUES('FINANCE COMPTABILITE GESTION BANQUE', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Expertise comptable', 'Finance');
INSERT INTO skill_industry(skill, industry) VALUES('Domotique', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Sciences Cognitives - Neurosciences', 'Health');
INSERT INTO skill_industry(skill, industry) VALUES('Recrutement', 'HR');
INSERT INTO skill_industry(skill, industry) VALUES('Agro-industrie', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Modélisation et Méthodes Informatiques', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Affaires et études du monde asiatique', 'Politics');
INSERT INTO skill_industry(skill, industry) VALUES('MARKETING - COMMUNICATION', 'Media');
INSERT INTO skill_industry(skill, industry) VALUES('Ingéniérie système', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Qualité produits', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Droit Social', 'Law');
INSERT INTO skill_industry(skill, industry) VALUES('Biochimie', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Topographe', 'Construction');
INSERT INTO skill_industry(skill, industry) VALUES('Maquillage – Esthétique - Coiffure - Cosmétique', 'Beauty');
INSERT INTO skill_industry(skill, industry) VALUES('Coopération universitaire', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Lettres modernes', 'Literature');
INSERT INTO skill_industry(skill, industry) VALUES('Bâtiment – Construction – Second Oeuvre', 'Construction');
INSERT INTO skill_industry(skill, industry) VALUES('Bijouterie/joaillerie', 'Beauty');
INSERT INTO skill_industry(skill, industry) VALUES('Soudage', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Gestion de projets technologiques & innovation', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Environnement - Ecologie', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Journalisme', 'Journalism');
INSERT INTO skill_industry(skill, industry) VALUES('Instrumentation - Automatisme - Robotique', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('COMMERCE', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('génétique', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Agronomie – Agriculture – Génie rural', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Français Langue Etrangère (FLE)', 'Literature');
INSERT INTO skill_industry(skill, industry) VALUES('Génie des procédés', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Administration des Ventes', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Aéronautique', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Droit Commercial et des Affaires', 'Law');
INSERT INTO skill_industry(skill, industry) VALUES('Sport - Activités Physiques - Loisirs', 'Sports');
INSERT INTO skill_industry(skill, industry) VALUES('Horticulture/Paysage', 'Construction');
INSERT INTO skill_industry(skill, industry) VALUES('Support informatique', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Commerce Vins & Spiritueux', 'Tourism');
INSERT INTO skill_industry(skill, industry) VALUES('SYSTEMES D''INFORMATION', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Electrotechnique', 'Electronics');
INSERT INTO skill_industry(skill, industry) VALUES('Formation et développement RH (GPEC)', 'HR');
INSERT INTO skill_industry(skill, industry) VALUES('Informatique industrielle', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('RESSOURCES HUMAINES', 'HR');
INSERT INTO skill_industry(skill, industry) VALUES('Energie', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Dessin industriel', 'Arts');
INSERT INTO skill_industry(skill, industry) VALUES('Nanotechnologies', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Lettres classiques', 'Literature');
INSERT INTO skill_industry(skill, industry) VALUES('Secrétariat - Bureautique', 'HR');
INSERT INTO skill_industry(skill, industry) VALUES('Systèmes embarqués', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Chimie - Génie Chimique', 'Biology');
INSERT INTO skill_industry(skill, industry) VALUES('Sciences', 'Mathematics');
INSERT INTO skill_industry(skill, industry) VALUES('Intégration progiciel', 'CS');
INSERT INTO skill_industry(skill, industry) VALUES('Graphisme - Imprimerie', 'Arts');
INSERT INTO skill_industry(skill, industry) VALUES('Textile', 'Business');
INSERT INTO skill_industry(skill, industry) VALUES('Hydraulique - Thermique', 'Mechanics');
INSERT INTO skill_industry(skill, industry) VALUES('Modélisme - Stylisme', 'Arts');



-- Initialize PostGIS plugin on the given database
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;

-- After scraping, process the data geometrically
ALTER TABLE offer ADD COLUMN geom geometry;
COMMENT ON COLUMN offer.geom IS 'Geometry';
UPDATE offer SET geom = ST_Point(lon, lat);