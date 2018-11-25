# Project voorstel

## De gezondheid van Nederland

  Algemeen:
Hoe kan de gezondheid van Nederland in de periode van 2014 tot 2017 gevisualiseerd worden?
  Specifieker:
Wat is de relatie tussen de hoeveelheid wekelijkse sporters en gemiddelde bloeddruk, cholesterol en bloedsuikerspiegelmeting van Nederlanders vanaf 16 jaar en ouder in een periode van 2014 t/m 2017?

## Features

Features van de gebruiker:
1. Een poppetje waarbij zelf het niveau van een (zelf gekozen, zie dropdown menu) aangepast kan worden. Naarmate het niveau van dit onderwerp wordt verhoogd/ verlaagd, worden de grafieken bloedsuikerspiegelmeting, cholesterolmeting en bloeddrukmeting mee veranderd (zie plaatje 2 in de doc folder).
  Drop down menu: de gebruiker kan kiezen uit de onderwerpen: voldoende beweging, type voeding (groente, fruit of vis) en gebruik van anticonceptiepil.

2. De tweede visualisatie is gelinkt aan de eerste; als de gebruiker op een van de onderwerpen in de grafiek klikt, komt er een grafiek met de correlatie tussen twee gekozen onderwerpen (dus nog een extra drop down-menu om het tweede onderwerp te kiezen, zie plaatje 2 in de doc folder).

2. De derde interactieve visualisatie bestaat uit een grafiek die de gezondheid van Nederland weergeeft over de jaren 2000 tot 2009. De gebruiker kan hierbij op een jaar klikken om een bar chart te zien over de details van dit jaar (zie plaatje 3 in de doc folder).

## Minimale vereisten en optimalisaties

Minimale vereisten:
1. Er is een poppetje waarin niveaus veranderd kunnen worden (als een soort schuifbalk).
2. Er is een grafiek die specifieke waardes aangeeft die overeenkomen met het niveau van het poppetje.
3. Er is een correlatiediagram.
4. Er is een lijndiagram die de gezondheid van Nederland over de jaren weergeeft.

Optimalisaties:
- Er is een poppetje waarvan het gewicht veranderd kan worden en aan de hand daarvan wordt op dezelfde manier als het eerste poppetje ook weer informatie gegeven die overeenkomt met dit gewicht.
- De grafiek beweegt heel geleidelijk mee met hoe ver de niveaus in het poppetje worden veranderd.
- Als er nog veel tijd over is:
Een vier-demensionale grafiek waarin de relatie tussen bloeddruk, gewicht, leeftijd en voeding (of een ander onderwerp zoals roken) wordt weergegeven.

### Externe componenten
D3

### Data en benodigdheden
Data over bloeddrukmeting, cholesterolmeting en bloedsuikerspiegelmeting:
http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=83021ned&D1=47,66,72,90,94,98&D2=3-13&D3=0&D4=a&HDR=T,G3&STB=G1,G2&VW=T

Data over voeding en beweging:
http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=83021ned&D1=47,66,72-78,90,94,98&D2=3-13&D3=0&D4=a&HDR=T,G3&STB=G1,G2&VW=T

Data over de subjectieve gezondheid van Nederlanders:
https://opendata.cbs.nl/statline/#/CBS/nl/dataset/03799/table?ts=1543005093219


### Vergelijkbare data visualisaties
Zie het bijgevoegde document met plaatjes.

### Moeilijkheden
Het koppelen van de huidige niveaus in het poppetje aan een bar chart (of andere grafiek) is een van de eerste moeilijkheden. Ik denk dat dit overwonnen kan worden door het poppetje te zien als een soort schuifbalk. Aan de hand van het niveau in de schuifbalk worden dan de bar charts of andere grafieken aangepast. 

Nog een moeilijkheid is de hoeveelheid data die beschikbaar. Voor dit onderwerp is er wel veel data nodig om de visualisatie ook echt 'waar' te laten zijn. Als dit niet lukt met de huidige data dan is er ook ontzettend veel data te vinden over mensen buiten Nederland.
