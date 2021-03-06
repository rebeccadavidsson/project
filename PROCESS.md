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

# Dag 7: Dinsdag
* Functies uitgebreid om ook de min en max van de arrays te berekenen, zodat de kleurenschalen in de sunburst correct worden aangepast.
* Begonnen aan de interactiviteit van de sunburst zelf. De bedoeling is dat er op de sunburst geklikt kan worden en er dan nog meer data weergegeven wordt.
* Begonnen aan het maken van de legenda in de linechart. De linechart wordt nu wel aangemaakt als er een nieuwe variabele bij geklikt wordt, maar er worden nog geen dingen verwijderd in de linechart.
* Ik heb een functie gemaakt die ervoor zorgt dat je smooth kan scrollen tussen de elementen. Als je op het knopje klikt, ga je met een overgang van 800 ms naar het volgende element.
* Ik heb een soort mini pagina gemaakt waarin ik tekst ga stoppen over het project en waar er een voorbeeld van een sunburst wordt gegeven.
* Aan het einde van de pagina heb ik een paar voorbeelden van barcharts neergezet :)

TODO:
* legenda afmaken in de linechart
* Y-assen op de goede waardes zetten.
* ervoor zorgen dat de lijst in de dropdown op alfabetische volgorde staat
* ervoor zorgen dat de sunburst goed geupdate wordt, nu gebeurren er nog hele verkeerde dingen, zie plaatje:
![Alt text](doc/sunbursterror.png)

# Dag 8: woensdag
* Lijst is in alfebetische volgorde
* Ik heb ervoor gekozen om de bij de linechart niet meer de keuze te geven om data met elkaar te vergelijken. Dit omdat het niet heel veel extra info biedt en het soms een beetje onoverzichtelijk wordt.
* Ik heb extra knopjes toegevoegd om de sunburst te kunnen updaten.

TODO:
* Y-assen moeten ook nog goed update in de linechart.
* Ik snap nog steeds niet hoe ik de sunburst goed kan updaten, maar heb nog geen kans gehad om dit te vragen aan een assistent door lange wachtrijen.
* Voedingen uit dataset halen waar missende datapunten van zijn.

# Dag 9: Donderdag
* y-assen updaten nu goed in de linechart, maar nog niet in de bar chart
* begin gemaakt aan bugs eruit halen door missende data eruit te halen, maar ik weet niet zo goed of ik dat beter in javascript kan doen of in python.
* ik weet nu hoe ik de sunburst goed kan laten updaten, maar daarvoor moet ik mijn data omzetten in een ander json formaat of moet ik d3.nest() gebruiken. Ik ga denk ik ervoor kiezen om d3.nest() te gebruiken omdat ik dat beter begrijp.

TODO:
* y-as goed laten updaten in de barchart
* Data omzetten in ander formaat om te gebruiken in de sunburst.

# Dag 10: Vrijdag
* Ik heb de data omgezet aan de hand van d3.nest() en dat ging veel makkelijker dan ik had verwacht! :-). Ik weet alleen nog niet zeker of ik dit ook daadwerkelijk ga gebruiken, omdat ik niet heel veel data heb om te nesten; ik heb alleen 1 week > 52 weken > 12 jaren, dus maar 3 loops. Ik ga eerst proberen om het te laten werken zonder de nested data.
* Ik heb een tooltip gemaakt die ook de maand aangeeft, maar deze geeft soms de verkeerde maand aan doordat ik nog niet goed weet hoe ik het moet berekenen als er 52 weken zijn per jaar en 52 / 4 = 13 maanden ipv 12 maanden.
* De sunburst wordt nu soort van geupdate maar nog heel erg lelijk en zonder transition

TODO:
* Updaten van jaartallen helemaal rechts van de mini barcharts als de slider wordt bewogen.
* Missende data er uit halen.
* sunburst updaten met transition
* Tooltip functie maken die ook de GOEDE maand aangeeft.
* Ticks weghalen bij maanden omdat de maanden soms niet helemaal kloppen
* Bij onderste dropdown ook bovenste gedeelte laten updaten

# Dag 11: Maandag
* Missende data eruit gehaald, ticks weggehaald
* Ik ben heel blij, want het is gelukt om de data om te zetten in een bruikbaar format voor de sunburst. Ik heb hieruit ook een mooie sunburst kunnen maken die goed update!
* Als ik tijd over heb wil ik ook nog een ring aan de sunburst toevoegen die de maanden weergeeft.
* Ik heb ervoor gekozen om de weken altijd een vaste maand te geven. Deze afweging heeft als gevolg dat het makkelijker en sneller gaat om de maand van de week te weten maar dat deze niet altijd klopt.

# Dag 12: Dinsdag
* Vandaag heb ik data toegevoegd aan de sunburst. Je kan nu ook de maanden bekijken.
* Ik heb ervoor gekozen om de sunburst te verwijderen en een nieuwe te maken tussen het switchen van voeding, omdat het te langzaam wordt om de hele sunburst te updaten en ook omdat het te lastig is.
* Ik heb help-tips toegevoegd aan de pagina voor als de gebruiker het niet snapt.

TODO:
* Checken of alle update functies goed met elkaar werken.
* Naam van voeding ook bij de barchart toevoegen.

# Dag 13: Woensdag
* Ik heb ervoor gekozen om de labels van de grootste maanden weer te geven naast de sunburst
* Update functies gecheckt en verbeterd.
* Slider-bug er uit gehaald.
* Extra svg toegevoegd met 'behind the scenes van de sunburst' waar een volledige sunburst instaat.

TODO:
* Update sunburst bij update dropdown linechart

# Dag 14: Donderdag, hackaton

# Dag 15: Vrijdag
* Alle update functies werkend, ook die van de linechart op de andere grafieken.
* Code meer gecomment en opgeschoond.
* Ik heb ervoor gekozen om een aantal variabelen als globale variabele te maken, omdat anders de input van een functie enorm lang wordt en de input in andere functies soms anders niet beschikbaar is.

TODO:
* variabele monthsarray maar 1 keer aanmaken
* Week 0 naar week 1 omzetten in de sunburst
* Globale variabele maken van data
* Nog een interactief element toevoegen aan de barchart

# Dag 16: Maandag
* Ik heb een interactief element toegevoegd aan de barchart, namelijk dat je kan zien welk element in de sunburst wordt aangegeven in de barchart.
* Gelukt om week 0 naar week 1 om te zetten.

TODO:
* Alle functies om data te verkrijgen in 1 bestand zetten
* Jaartallen van voorbeeld barcharts op 2004 zetten.
* Dropdown functies bij elkaar voegen

# Dag 17: Dinsdag
* Ik heb een LINCENSE, README en REPORT geschreven.
* Ik heb ervoor gekozen om sommige functies bi elkaar te voegen, ondanks dat ze dan langer worden. Ik vind het persoonlijk toch overzichtelijker omdat de functies anders heel veel parameters krijgen als input.
