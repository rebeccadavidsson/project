# Project voorstel

## Google zoekopdrachten naar voeding vanaf 2014

Welke soorten voeding worden het meest opgezocht in welke jaarperiode?

## Features
De gebruiker kan bij openen van de pagina een paar (ongeveer 8) line charts aflezen van interessante voedingsmiddelen. Hier kan dan op geklikt worden (waarmee dus een voedingsmiddel wordt gekozen). Vervolgens wordt uit deze keuze een sunburst gemaakt (zie kopje sunburst voor details). Naast de sunburst wordt ook een stacked barchart gemaakt 2 of meer voedingsstoffen naar keuze.


### Sunburst
De sunburst zal bestaan uit alle jaren van de dataset van de gekozen voeding. Als een voeding in 2014 meer is opgezocht dan in 2015, dan zal de burst van 2014 dus groter zijn. De grootte van de bursts is representatief voor het aantal keer dat de voeding is opgezocht. Op de burst kan geklikt worden, waarna er informatie wordt gegeven over het jaar zelf. Zo kan er bijvoorbeeld gezien worden dat er in de zomer vaker naar 'icecream' is gezocht dan in de winter.
Optimalisatie: smooth transition van de linechart (of barchart) naar de sunburst.

### Externe componenten
D3

### Data en benodigdheden
Alle data staat in 1 bestand en kan gevonden worden op:
https://www.kaggle.com/GoogleNewsLab/food-searches-on-google-since-2004

### Vergelijkbare data visualisaties
![Alt text](https://www.bakemag.com/ext/resources/images/r/h/y/t/h/d/o/o/o/f/2016/RhythmofFood.jpg)

### Moeilijkheden
1. De eerste moeilijkheid is het verwerken van de data zodat alles met goede datums in een json file staat. Hiervoor kan ik gebruik maken van een converter module die geschreven kan worden in Python.
2. Het maken van de sunburst gaat lastig worden, vooral om een smooth transition te maken. Als dit echt niet lukt is een andere data visualisatie zoals een barchart ook mogelijk.
3. Als het niet lukt om 2 of meer voedingsstoffen te kiezen voor de stacked bar chart dan kan er ook een normale barchart of line chart gemaakt worden van 1 voeding.

## Design
![Alt text](doc/design.jpeg)
