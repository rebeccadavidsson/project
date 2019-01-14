# Dag 3: woensdag
* Data omgezet in een bruikbare json file. Data is nu helemaal klaar om te gebruiken.
* Functies gemaaakt die de data in js selecteren.
* Begin gemaakt aan de bar charts. Hier moet alleen nog interactiviteit aan worden toegevoegd en een slidebar zodat er over de jaren heen geslide kan worden. Ook moet hier nog een dropbox bij.
* Ik heb ervoor gekozen om alles in 1 javascript bestand te schrijven, omdat anders de data meerdere keren geladen moet worden.

# Dag 4: donderdag
* html layout verbeterd
* slider toegevoegd, die nog niet werkt.
* linechart toegevoegd
* dropdown menu toegevoegd
* meer functies gemaakt voor verwerken van data (zoals totaal aantal opzoekwaardes in 1 array)

TODO:
* slider koppelen aan een data-update functie.
* dropdown menu koppelen aan data-update functie van de sunburst.
* lijnen in de line chart alleen gemiddelde weergeven en niet alle datapunten, zodat de lijnen overzichtelijker zijn.

# Dag 5: vrijdag
* Update functies gemaakt die werken, behalve de smooth transition van de mini bar charts.
* Functie gemaakt om gemiddelde per jaar te berekenen, die gebruikt wordt in de line chart. De line chart geeft dus nu alleen het jaargemiddelde weer.
* Begin gemaakt aan de sunburst, maar ik merkte dat dat heel erg ingewikkeld was omdat de data eerst nog meer omgezet moet worden.

Keuzes:
* Ik heb ervoor gekozen om nog een barchart onder de sunburst te maken die de voeding gekozen voeding representeert. Deze is ook gelinked aan de jaar-schuifbalk.

TODO:
* Alle functies structureren en in 3 aparte javascripts zetten zodat het overzichtelijk blijft.
* Smooth transition van de mini barcharts.
* Data omzetten in bruikbare array dat gebruikt kan worden voor de sunburst.


# Dag 6: maandag
Ik heb vandaag geprobeerd om me bootstrap columns te werken, maar het werd uiteindelijk toch minder mooi, dus heb ik toch alles in css gedaan.
Ik heb in de linechart een knopje toegevoegd om linecharts met elkaar te vergelijken, maar deze is nog niet af. De lijnen worden wel toegevoegd, maar er moet natuurlijk ook een leganda bij wat welke lijn is.
Ook heb ik alle css onderdelen verdeeld in 4 verschillende css bestanden om het overzicht te bewaren.
Ook heb ik mijn code een beetje opgeschoond door alles in aparte files en folders te zetten en alles aan te roepen vanaf main.js. 

TODO:
* Legenda maken bij de linechart.
* Begin maken aan de data omzetten in bruikbare array dat gebruikt kan worden voor de sunburst.
