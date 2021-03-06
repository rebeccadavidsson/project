# Programming project 2019 - Food trends based on Google searches
Minor programming UvA  
Name: Rebecca Davidsson  
Student number: 11252138  
E-mail: rebeccadavidsson3@gmail.com

# [Github Page](https://rebeccadavidsson.github.io/project/index.html)

# [Demonstration video](https://www.youtube.com/watch?v=DO8v0WpsI3Q&frags=pl%2Cwn)

# Page walkthrough
This page gives a user a clear overview of food trends based on Google searches. For example, the word 'easter-egg' reached a maximum of search rates at easter. This page could be practical for companies selling a product, to know when to advertise.  
The page starts with a header than can be scrolled down by clicking on the scroll button (or by scrolling down). After scrolling down, a page with information about the visualisations appears as an introduction to the page. An (interactive) sunburst preview is presented on the background. The other visualisations are presented as the user scrolls down.
![Alt text](doc/page0.png)

## Sunburst and barchart(s)
![Alt text](doc/page1.png)
**The sunburst** diagram represents data from a specific food category over the years 2004 up until 2016. The first thing you get to see when you scroll down is an interactive sunburst diagram. A preview is represented on the right.

The outer circle represents every weekly data point. For instance, the total search count for 'anise' in January 2004 was 26. The outer circle tells us which month was the most popular month for this food category.

The inner circle represents the sum of all data points for every year. As you can see, the number of inner circles is 13, each representing one year between 2004 and 2016. Zoom in to a more detailed sunburst by clicking on an element. Go back by clicking in the middle.

**The bargraph** changes automatically by choosing a food category. The graph represents a yearly overview of search rates for a specific food category. Change the year by moving the slider.

## Linechart
![Alt text](doc/page2.png)
**The linegraph** represents mean searching rates for a chosen food category. The graph can be used to find a year in which a topic was trending. For instance, 'coffee' was trending in the year 2012. Choose the food category with any dropdown bar.

## Additional info
![Alt text](doc/page3.png)
![Alt text](doc/page4.png)
These barcharts and extra sunburst let the user explore the data. The sunburst lets the user view the hidden layers under the sunburst.

# Repository structure
1. data: downloaded and converted dataset.
2. doc: all images used for md-files in this repository.
3. scripts: all javascript files and one python file.
4. style: all CSS-files.

* DESIGN.md: the desired design of this project (technical design and style)
* LICENSCE.md: MIT license
* PROCESS.md: a daily process update of 'the making of' of the project including all decisions made regarding code and visualisation.
* PROPOSAL.md: the initial idea for the project
* README.md: you are reading this :)
* REPORT.md: final report about the project
* STYLE.md: a few rules for writing code in Javascript
* index.html: the main HTML-file where the page is based on.


# Data and sources
All data is downloaded from [kaggle.com](https://www.kaggle.com/GoogleNewsLab/food-searches-on-google-since-2004) as a csv file. Not all data from this download page is used, due to missing data. This page does not include all food categories that have ever been searched on Google.   
Other related datasets can be downloaded from [Google.com](https://trends.google.com/trends/?geo=US).

### Sunburst
The sunburst is inspired by [beta.observablehq.com](https://beta.observablehq.com/@mbostock/d3-zoomable-sunburst).

### Slider
The slider is inspired by [W3schools.com](https://www.w3schools.com/howto/howto_js_rangeslider.asp).

### Questionmark
The questionmark is inspired by [tutorialzine.com](https://tutorialzine.com/2014/07/css-inline-help-tips).

### Linechart
The line that appears when user hovers over the linechart is inspired by [bl.ocks.org](https://bl.ocks.org/alandunning/cfb7dcd7951826b9eacd54f0647f48d3)

### Tooltip
Tooltip is downloaded from [github.com](https://github.com/jprichardson/d3-tooltip)

### Moving arrow and scrolling
* The arrow that the user can click on to scroll down is inspired by [codepen.io](https://codepen.io/priyankal/pen/zRvNyV).
* The scrolling function is inspired by [W3schools.com](https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_animate_smoothscroll).
* The parallax effect is inspired by [codepen.io](https://codepen.io/martinwolf/pen/ZGXKEX/)

## Plugins
* D3, License: BSD 3-Clause "New" or "Revised" License (https://github.com/d3/d3/blob/master/LICENSE)
* D3 simple slider
* D3 Tooltip
* jQuery, https://jquery.com/ License: MIT license

# How to use this page with other datasets
These visualization of Google search trends could also be used for other categories, such as search rates for political parties or universities. By downloading the dataset (from Google) and using the python converter in this repository, other datasets can easily be used too. In comparison to the visualizations by Google (see figure), I think the graphs from this page give a clear overview, mainly because the line chart shows mean searching rates instead of all measured points. Additionally, the interactivity between the barchart and the sunburst makes it easy to understand the information.

1. Download dataset as a csv file from https://trends.google.com/trends/?geo=US or https://www.kaggle.com/GoogleNewsLab/food-searches-on-google-since-2004 . Make sure dataset has this format:
![Alt text](doc/format.png)
2. Make sure the downloaded csv-file is saved in the correct folder (i.e. make a folder called 'results' to store the file).
3. Convert data with `converter.py`
4. Change foodnames to categories from your own dataset.
  * In `sunburst.js`, selected foodnames are "frozen-yogurt", "pie", "anise", and "cauliflower".
  * In `barcharts.js` an array of foodnames is made out of 'foods = ["easter-egg", "apricot", "blueberry", "strawberry"]'
  * in `linechart.js`, an array of foodnames is made out of 'dataset = ["empanada", "quinoa", "cauliflower", "coffee"]'
5. If you want to change the years (for example to 2004-2019 instead of 2004-2016), add these years to the years array in `main.js` and other files.
6. Main functions are called from `main.js`. Take out unnecessary functions such as exploreBarCharts() and makeUnderSunburst() if you don't want to use them.   

  [![BCH compliance](https://bettercodehub.com/edge/badge/rebeccadavidsson/project?branch=master)](https://bettercodehub.com/)  


  <p align="center"><i>
This project is licensed under the terms of the MIT license.</br>
Rebecca Davidsson, 2019
</i></p>
