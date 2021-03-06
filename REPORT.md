# Programming project 2019 - Food trends based on Google searches
Minor programming UvA  
Name: Rebecca Davidsson  
Student number: 11252138  

## Goal
Google has a page that lets users select for a word to view a line graph of searching rates of this word. For example, when you select 'easter-egg', you see can see that the search rates for this word had its maximum at easter. However, this Google page is not that clear. The page doesn't really visualize the yearly maximum points. The goal of this project was to give user a clear overview of food trends based on Google searches over the years 2004 - 2016. This could be practical for companies selling a product, to know when to advertise. Another goal of this project was to give users the possibility to use these visualizations for other Google datasets such as search rates of political parties. This repository could function as a base for other visualizations.

![Alt text](doc/page1.png)
![Alt text](doc/page2.png)

## Visual design
This page contains three interactive visualizations: a sunburst, bar graph and a line graph. All visualizations show the flow of Google searching trends based on food over the years 2004 - 2016. The colors that I used don't represent any values but only have a function to make the page look good :-). The page has a structure that the user has to scroll down to view the next visualization. I chose a red line for the linechart because it's a good contrast to the background. 

## Technical design
![Alt text](doc/numbers.png)

### Javascript
This repository consists of 9 Javascript files and are all placed in the 'scripts'-folder.
1. **main.js:** main script to load data and call other functions.
Functions:
    * onload;
    * function to control scrolling events: [source](https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_animate_smoothscroll)
    * function to control parallax effect: [source](https://codepen.io/martinwolf/pen/ZGXKEX/)
2. **barcharts.js:** makes a few interactive barcharts (see number 1 in the figure above). Features of this script are the tooltip and some onclick-events.
Also, this script consists of a function to make a dropdown and a slider.
Functions:
    * makeBarcharts;
    * addDropdown;
    * addSlider (see number 4 in the figure above);
    * updateYear: This is an update function that updates the barcharts when the slider is moved or when the selected year gets changed.
    * exploreBarCharts: This is a function to make mini barcharts at the end of the page. Only interactivity is a toolip.
3. **sunburst.js:** includes functions to make and update the sunburst(s) (see number 2 in the figure above).
Functions:
    * makeSunburst (main sunburst);
    * makeSunburstWelcome: a function to make the non-interactive sunburst at the top of the page to welcome the user with a sunburst preview.
    * updateSunburst: removes old sunburst, gets new data and draws a new sunburst.
    * makeUnderSunburst: function to make a sunburst without hidden layers (in contrast to the main sunburst, which does have hidden layers).
    * arcVisible
    * labelVisible
    * labelTransform
    * makePaths
    * makeLabel
    * makeParent
    * addTitle
    * clicked: zooms in or out of the sunburst when user clicks on one of the elements.
    * getMonthSunburst
4. **underBarchart.js:** makes the main interactive barchart (see number 3 in the figure above).
Functions:
    * makeUnderBarchart: function to make the initial barchart when the page is opened. Adds axes, title and position. Also includes the tooltip that works together with the sunburst; hovering over one of the bars in the barchart cuases that corresponding element to get highlighted in the sunburst.
    * updateUnderBarChart: updates the bar chart with a y-axis transition.
5. **linechart.js:** makes all linecharts (interactive and non-interactive).
Functions:
    * makeLinechart;
    * updateLineChart
    * linechartDropdown
    * updateLegend
    * makeMiniLinecharts
    * mousemove: [source](https://bl.ocks.org/alandunning/cfb7dcd7951826b9eacd54f0647f48d3)  
6. **getarrays.js:** converts data into useable arrays. Every visualization requires a different array format.
Functions:
    * getDataMeans: this function is used for the "welcome" sunburst.
    * getDataMeansLineChart: used in the linechart
    * getDataMninBars: used for the mini barcharts
    * getDataArray2: used for main barchart and mini barcharts
    * sunburstData: used for the sunburst
    * getMonth: used for the function sunburstData() for the sunburst
    * returnMonth: used for getMonth() for the sunburst
7. **d3-simple-slider.js:** script to make a slider: [source](https://github.com/johnwalley/d3-simple-slider   ).
8. **d3-tip.js:** tooltip script: [source](https://github.com/jprichardson/d3-tooltip).

### HTML
The only HTML-file in this repository is 'index.html' and includes all visualizations.

### CSS
* style.css: this is the main css file and includes all styles of svg, text, paragraphs etc.
* div.css: a file especially for all the div-elements.
* questionmark.css
* slider.css: besides the slider, this file also contains the styling of the dropdown menus.
* arrow.css: styling for the arrow that lets the user scroll down.

### Python
The only python file in this repository is converter.py. This file converts the downloaded data into a format that can be used in Javascript.


## Process and development

### Challenges
The hardest part of this project was creating a sunburst diagram and especially converting the data into a format that could be used for the sunburst. First, I tried to convert the data with a python script that made a dictionary. I wrote a recursive function that added nodes to a dictionary until the highest depth was reached. Then I encountered another problem; the dictionary did not handle differend key-names. After some research, I tried to write a recursive function in Javascript to convert the data, which was harder than I initially thought, because every depth of the dictionary had a different length (13 years, 12 months, 52 weeks). Eventually, I wrote some different functions to get the structure that I wanted (see figure).  
![Alt text](doc/sunburst_format.png)

Another challenge was to get all elements in the correct position on the page. I did not use bootstrap, because I was under the impression that using bootstrap-columns also ruled out other possibilities. Looking back, I don't know if that actually was a wise choice. On the other side, I learned a lot about positioning of elements in HTML and CSS.

### Acquired Skills
* Never before had I heard of D3.partition(). I learned to partition data into parent, child, value and depth, which is useful for several things such as treemaps, packed circles or network graphs.
* In the previous course Data Processing, we didn't get to work with jQuery a lot. I used jQuery to select and find specific things in my HTML-file. Using D3 to do this would have made things a lot harder. Understanding jQuery made it easier to understand other aspects of Javascript and HTML.
* I also learned a lot about working with CSS and linking it to elements in an HTML file.
* Most of all, I learned about Javascript. Before starting this project, I didn't understand neither the onload-function nor the asynchronity of Javascript. For the first time, I used more than one Javascript-file to divide all functions.  

### Important changes
There were no important changes relative to PROPOSAL.md. However, I made some important changes during the project itself.
* I decided to use Javascript to convert the data into a format that can be used for the sunburst.
* After making a huge unclear function that converted data into usable arrays (in getarrays.js), I chose to change this function (with loads of parameters) into little ones. This resulted in functions with the same structure but with minor changes. The functions all look a lot like each other, but I thought it was way more clear to write seperate functions.
* I decided to make another layer of months in the data format, so it will be clear which month the user has chosen after clicking on an element in the sunburst. See the figure below to see the effect of this decision.
![Alt text](doc/monthSunbursteffect.png)
![Alt text](doc/monthSunbursteffect0.png)

## Other solutions
In an ideal world where there was more time for this project, I would have chosen to:
* calculate which month corresponds to which exact week;
* made a smooth transition of the sunburst when user switches to another food category;
* find a solution for the invisible ring.
* let the user add and delete lines from the linechart;
* Keep track of the user's choices history by presenting the chosen foods at the right of the page.


## Conclusion
These visualization of Google search trends could also be used for other categories, such as search rates for political parties or universities. By downloading the dataset (from Google) and using the python converter in this repository, other datasets can easily be used too. In comparison to the visualizations by Google, I think the graphs from this page give a clear overview, mainly because the line chart shows mean searching rates instead of all measured points. Additionally, the interactivity between the barchart and the sunburst makes it easy to understand the information.

Google:
![Alt text](doc/grapfruitGoogle.png)


My line chart:  
![Alt text](doc/grapefruitMy.png)
