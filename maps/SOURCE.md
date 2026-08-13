# Historical map data

The GeoJSON files in this directory are year-specific extracts from CShapes
2.0, published by ETH Zurich's International Conflict Research group:

https://icr.ethz.ch/data/cshapes/

For each displayed year, features valid on July 1 were extracted from the raw
CShapes 2.0 GeoJSON. The original geometry is preserved in WGS 84; only unused
attributes were removed to reduce the files served by the application.

Citation: Schvitz, Rüegger, Girardin, Cederman, Weidmann, and Gleditsch,
"Mapping the International System, 1886-2019: The CShapes 2.0 Dataset."

Included extracts: 1914, 1920, 1923, 1940, 1943, 1946, 1947, 1965,
1966, 1983, 1985, 1986, 1987, 1993, 1994, and 2018.

The 1947 extract also includes a locator outline named `Saar Protectorate`.
CShapes does not encode Saar as a separate feature, so the locator uses the
present-day Saarland administrative boundary from OpenStreetMap/Nominatim
(ODbL 1.0). The atlas labels this limitation instead of presenting it as an
exact reconstruction of the temporarily enlarged 1947 boundary.

The 1943 France entry deliberately renders the CShapes feature as an outline,
not as a filled Vichy-controlled territory. By July 1, 1943, metropolitan
France was entirely under Axis occupation: most of it under German occupation,
with the southeast and Corsica under Italian occupation. Vichy is shown only
as the seat of the collaborating government. Historical interpretation was
checked against the French Ministry of Armed Forces' Chemins de memoire:

https://www.cheminsdememoire.gouv.fr/fr/revue/1943-reprendre-loffensive
https://www.cheminsdememoire.gouv.fr/fr/septembre-1943-la-liberation-de-la-corse
