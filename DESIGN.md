# Design document

## Data
Data kan gedownload worden van https://www.kaggle.com/GoogleNewsLab/food-searches-on-google-since-2004.
De dataset is bewaard in de folder 'data' onder de naam 'foodvalues.csv'.
De dataset moet omgezet worden in een json format waarbij de voedingsmiddelen de keys zijn en de values zijn de opzoekwaardes per week, waarvan er dus 52 zijn per jaar.
Het json format moet er qua structuur uiteindelijk zo uitzien:
![Alt text](doc/json_example.jpeg)

## Pagina design
Bij het openen van de pagina wordt een begintekst weergegeven over de doel en opzet van het project en alle overige informatie om het project te begrijpen.
Vervolgens kan de gebruiker naar beneden scrollen om uiteindelijk de data visualisaties te zien. De eerste twee visualisaties (sunburst en linecharts) zullen naast elkaar worden weergegeven. De derde visualisatie (stacked barchart) wordt weer daaronder weergegeven als de gebruiker naar beneden scrollt. Het idee achter het naar beneden scrollen is dat de gebruiker meegenomen kan worden in een soort verhaal die begint met de introtekst en doorgaat met de visualisaties.

## Omschrijving van visualisaties
### 3. Voeding linecharts
Bij het openen van de pagina zullen een stuk of 4 kleine line charts wordt weergegeven van opzoekwaardes van interessante voedingsstoffen. Het doel van de line charts is het opvullen van de pagina en de gebruiker alvast laten zien hoe de opzoekwaardes van sommige voedingsstoffen verlopen.
### 2. Sunburst
De sunburst geeft aan welke voedingsstof in welk jaar het meest wordt opgezocht en geeft ook informatie over de periodes van het jaar wanneer een voedingsstof wordt opgezocht.
### 3. Staked barchart
In de stacked barchart kunnen opzoekwaardes van voedingsstoffen makkelijk met elkaar worden vergeleken over tijd.

## D3 plugins
* D3 tip
* D3 legend
