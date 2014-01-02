// GRAB THE DATA FROM THE SERVER.
 
$result = "";
$.ajax({ url: 'spreadsheets', 
  cache: false, 
  success: function(response) 
  { $result = $(response).find('#keys'); 
  init();
  }   
});

// *********** START TABLETOP SIMPLESHEET FOR HIGHCHARTS ***********************

function init() {
  for (i = 0; i < $result.length; i++) { 
  Tabletop.init( { key: $result[i].innerHTML,
                   callback: showInfo,
                   simpleSheet: true, 
                   parseNumbers: true} );
  }
};

// *********** SETTING UP VARIABLES FOR OVERVIEW DATA ***********************

  weeklyTotals = ""
  weeklyMaxTotals = ""
  all = []
  weekly = 0;
  reducedTotals = []
  reducedMaxTotals = []
  weekname = 0
  allWeeks = []
  
// *********** END VARIABLES FOR OVERVIEW DATA ***********************


// *********** BEGIN CALLBACK FUNCTION FOR TABLETOP SIMPLESHEET ***********************
// The call back function to render the data from tabletop for overview chart
  function showInfo(data) {
  weeklyTotals = data
  // find all hashes that contain totals and put them in an array
  weekly = _.where(weeklyTotals, {week: "weektotal"}) 
  all.push(weekly) 
  // pluck just the values into a nested array FOR STUDENTS
  listofValues = []
  for (i in all) {listofValues.push(_.pluck(all[i], "value"))};
  console.log(listofValues)
  // combine the totals from each spreadsheet
  studentTotalsFromAllSpreadsheets = _.zip.apply([], listofValues)
  reducedTotals = []
  for (i in studentTotalsFromAllSpreadsheets) {reducedTotals.push(_.reduce(studentTotalsFromAllSpreadsheets[i], function(memo, num){ return memo + num; }, 0))};

  // pluck just the values into a nested array FOR MAX POINTS
  listofMaxValues = []   
  for (i in all) {listofMaxValues.push(_.pluck(all[i], "maxpoints"))};
  maxTotalsFromAllSpreadsheets = _.zip.apply([], listofMaxValues)
  reducedMaxTotals = []
  for (i in maxTotalsFromAllSpreadsheets) {reducedMaxTotals.push(_.reduce(maxTotalsFromAllSpreadsheets[i], function(memo, num){ return memo + num; }, 0))};

  // Grab the weekname for the x Axis of highcharts
  weekname = _.where(weeklyTotals, {week: "weekname"})  
  allWeeks.push(weekname)
  listofWeeks = []
  for (i in allWeeks) {listofWeeks.push(_.pluck(allWeeks[i], "coursematerial"))};
}

// *********** END TABLETOP SIMPLESHEET ***********************

// ******************** START HANDLEBARS FOR 'PER STUDENT' VIEWS *****************

// PROCESS ALL THE SPREADSHEET URLS FOR 'STUDENT' VIEW.
function studentInit() {  
  for (i = 0; i < $result.length; i++) { 
    Tabletop.init( { key: $result[i].innerHTML,
                     callback: showInfo1,
                     parseNumbers: true } );
    console.log("Sweet libs 4 life.")
  }
}

// THE CALLBACK FUNCTION TO RENDER THE 'PER STUDENT' HANDLEBAR TEMPLATE. 
function showInfo1(data, tabletop) {
  var source   = $("#spreadsheet-template").html();
  var template = Handlebars.compile(source);
  $.each( tabletop.sheets("Students").all(), function(i, spreadsheet) {
    var html = template(spreadsheet);
    $("#content").append(html);
  });
}

// ******************** END HANDLEBARS *****************

// ******************** BUTTONS *****************

// 'OVERVIEW' BUTTON
$( "#overview" ).click(function() {
  var chartContainer = document.querySelector(".chart-container")
  chartContainer.innerHTML = '';
  var students = document.querySelector("#content")
  students.innerHTML = '';
  overviewChartInit();
});

// 'BY WEEK' BUTTON
// render a page with a list of weeks that link to the drilldowns by topic
$( "#byweek" ).click(function() {
  console.log( "Love is a battlefield." );
  var chartContainer = document.querySelector(".chart-container")
  chartContainer.innerHTML = '';
  var students = document.querySelector("#content")
  students.innerHTML = '';
  weekChartInit() 
});

// 'BY STUDENT' BUTTON
// render a page with a list of students that link to the drilldown per student.
$( "#bystudent" ).click(function() {
  var chartContainer = document.querySelector(".chart-container")
  chartContainer.innerHTML = '';
  studentSearch();
  studentInit();
});  
  
// ******************** END BUTTONS *****************

// ******************** BEGIN STUDENT SEARCH *****************

function studentSearch() {
// append search bar

}

// ******************** END STUDENT SEARCH *****************

// ******************** BEGIN HIGHCHARTS FOR OVERVIEW ***************** 

function overviewChartInit() { 
  var chartContainer = document.querySelector(".chart-container")
  var overviewChart = document.createElement('div') 
  overviewChart.id = "overviewchart"
  chartContainer.appendChild(overviewChart);

  $('#overviewchart').highcharts({
    chart: {
        type: 'bar'
    },
    title: {
        text: 'FALL 2013 WDI OVERVIEW'
    },
    xAxis: {
        categories: listofWeeks[0]
    },
    yAxis: {
        title: {
            text: 'SELF-ASSESSMENT SCORES ACROSS ALL STUDENTS'
        }
    },
    series: [{
      name: 'STUDENT ASSESSMENT POINTS',
        data: reducedTotals
      }, {
      name: 'MAXIMUM ASSESSMENT POINTS',
        data: reducedMaxTotals
    }]
  });
};

// ******************** END HIGHCHARTS FOR OVERVIEW *****************

// ******************** BEGIN HIGHCHARTS FOR WEEK VIEW *****************

range1 = _.range(3, 66, 1);
topicize = _.map(range1, function(num){ return "weeklyTotals["+num+"].coursematerial"; })
week1valueize = _.map(range1, function(num){ return "weeklyTotals["+num+"].value"; })
// totalWeek1Values = _.object(topics, week1values)

function weekChartInit() { 
  var chartContainer = document.querySelector(".chart-container")
  var weekChart = document.createElement('div') 
  weekChart.id = "weekchart"
  chartContainer.appendChild(weekChart);

  $('#weekchart').highcharts({
    // legend: {
    //   layout: 'vertical',
    //   verticalAlign: 'top',
    //   floating: true,
    // },
    chart: {
        marginLeft: 320,
        type: 'bar'
    },
    title: {
        text: 'FALL 2013 WDI: WEEK #'
    },
    xAxis: {
        categories: _.map(topicize, function(num){ return eval(num); })
    },
    yAxis: {
      allowDecimals: false,
      opposite: true,
        title: {
            text: 'SCORES PER TOPIC ACROSS ALL STUDENTS'
        }
    },
    series: [{
      name: 'STUDENT ASSESSMENT POINTS',
        data: _.map(week1valueize, function(num){ return eval(num); })
      }]
  });
};

// ******************** END HIGHCHARTS FOR WEEK VIEW *****************

window.onload = function() { 
  // init(); 
  console.log("happy new year."); 
};