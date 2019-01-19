// Source: https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_animate_smoothscroll
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});


function onload() {

// Open file
fetch('data/result.json').then(response => {
  return response.json();
}).then(data => {


  // Set foodname to load data when page is opened
  var foodname = "anise"

  var years = ["2004", "2005", "2006", "2007", "2008", "2009",
             "2010", "2011", "2012", "2013", "2014", "2015", "2016"]


  // Make an array of foodnames
  var foodnames = []
  for (var key in data) {


    // Skip header
    if (key != "id") {
      foodnames.push(key)
    }
  }

  // Take a 2-column CSV and transform it into a hierarchical structure suitable
// for a partition layout. The first column is a sequence of step names, from
// root to leaf, separated by hyphens. The second column is a count of how
// often that sequence occurred.
function buildHierarchy(csv) {
  var root = {"name": "root", "children": []};
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split("-");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
   // Not yet at the end of the sequence; move down the tree.
 	var foundChild = false;
 	for (var k = 0; k < children.length; k++) {
 	  if (children[k]["name"] == nodeName) {
 	    childNode = children[k];
 	    foundChild = true;
 	    break;
 	  }
 	}
  // If we don't already have a child node for this branch, create it.
 	if (!foundChild) {
 	  childNode = {"name": nodeName, "children": []};
 	  children.push(childNode);
 	}
 	currentNode = childNode;
      } else {
 	// Reached the end of the sequence; create a leaf node.
 	childNode = {"name": nodeName, "size": size};
 	children.push(childNode);
      }
    }
  }
  return root;
};



  // for (var i = 0; i < Object.keys(foodnames).length; i++) {
  //   var d = data[foodnames[i]]
  //   // console.log(Object.keys(d).length)
  //   // console.log(foodnames[i], d, d["2004"]);
  //   for (var j = 0; j < 13; j++) {
  //     console.log(Object.keys(d[years[j]]).length)
  //     // console.log(d[years[j]]);
  //   }
  //
  //   // for (var value in d) {
  //   //   console.log(value["2004"]);
  //   // }
  // }

  // Sort in alphabetical order
  foodnames.sort();

  d3.csv("data/foodvalues.csv", function(error, data) {


    console.log(buildHierarchy(data));

  //*************************************************
  // FUNCTION
  //*************************************************
  function genJSON(csvData, groups) {

    var genGroups = function(data) {
      return _.map(data, function(element, index) {
        return { name : index, children : element };
      });
    };

    var nest = function(node, curIndex) {
      if (curIndex === 0) {
        node.children = genGroups(_.groupBy(csvData, groups[0]));
        _.each(node.children, function (child) {
          nest(child, curIndex + 1);
        });
      }
      else {
        if (curIndex < groups.length) {
          node.children = genGroups(
            _.groupBy(node.children, groups[curIndex])
          );
          _.each(node.children, function (child) {
            nest(child, curIndex + 1);
          });
        }
      }
      return node;
    };
    return nest({}, 0);
  }

  //*************************************************
  // CALL FUNCTION WITH ARRAY OF GROUPS
  //*************************************************
  // var preppedData = genJSON(data, ['id', 'week_id'])

  //*************************************************
  // YOUR DATA VISUALIZATION CODE HERE
  //*************************************************

});



  // Make a sunburst when page is opened
  makeSunburstWelcome(data, foodnames) // TODO

  // TODO:
  zoomSunburst()

  // Make a few bar charts
  makeBarcharts(data, foodnames)

  // Make the first sunburst
  makeSunburst(data)

  // Make the bar chart that goes under the sunburst
  makeUnderBarchart(data, foodname)

  // Make a line chart
  makeLinechart(data, foodname)

  // Call function that adds a compare button
  addComparison(data, foodnames)

  // Add a few barchart examples to explore data
  exploreBarCharts(data)

}).catch(err => {
  // TODO
});
}
