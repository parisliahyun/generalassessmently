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

// *********** SETTING UP VARIABLES FOR CHARTS ***********************

  weeklyTotals = ""
  weeklyMaxTotals = ""
  all = []
  reducedTotals = []
  reducedMaxTotals = []
  allWeeks = []
  allWeek1Scores = []
  
// *********** END VARIABLES FOR CHARTS ***********************


// *********** BEGIN CALLBACK FUNCTION FOR TABLETOP SIMPLESHEET ***********************

  function showInfo(data) {
  weeklyTotals = data

  // *********** FOR OVERVIEW CHART ***********
  // Y AXIS
  // find all hashes that contain totals and put them in an array
  weekly = _.where(weeklyTotals, {week: "weektotal"}) 
  all.push(weekly) 
  // pluck from the 'value' column FOR STUDENT TOTALS
  listofValues = []
  for (i in all) {listofValues.push(_.pluck(all[i], "value"))};
  console.log(listofValues)
  // combine the totals from each spreadsheet
  studentTotalsFromAllSpreadsheets = _.zip.apply([], listofValues)
  reducedTotals = []
  for (i in studentTotalsFromAllSpreadsheets) {reducedTotals.push(_.reduce(studentTotalsFromAllSpreadsheets[i], function(memo, num){ return memo + num; }, 0))};

  // pluck from the 'maxpoints' column FOR MAX POINT TOTALS
  listofMaxValues = []   
  for (i in all) {listofMaxValues.push(_.pluck(all[i], "maxpoints"))};
  maxTotalsFromAllSpreadsheets = _.zip.apply([], listofMaxValues)
  reducedMaxTotals = []
  for (i in maxTotalsFromAllSpreadsheets) {reducedMaxTotals.push(_.reduce(maxTotalsFromAllSpreadsheets[i], function(memo, num){ return memo + num; }, 0))};

  // X AXIS
  weekname = _.where(weeklyTotals, {week: "weekname"})  
  allWeeks.push(weekname)
  listofWeeks = []
  for (i in allWeeks) {listofWeeks.push(_.pluck(allWeeks[i], "coursematerial"))};

  // ************ FOR WEEK CHART *********** 

  // TITLE
  weekChartTitle = _.where(weeklyTotals, {coursematerial: "Instance:"})  
  weekChartTitle = _.pluck(weekChartTitle, 'value'); 
  // X AXIS
  week1Rows = _.where(weeklyTotals, {week: 1})  
  week1Topics = []
  for (i in week1Rows) {week1Topics.push(week1Rows[i].coursematerial)};

  // Y AXIS
  allWeek1Scores.push(week1Rows)
  week1Scores = []
  for (i in allWeek1Scores) {week1Scores.push(_.pluck(allWeek1Scores[i], "value"))};
  combineScores = _.zip.apply([], week1Scores)
  reducedScores = []
  for (i in combineScores) {reducedScores.push(_.reduce(combineScores[i], function(memo, num){ return memo + num; }, 0))};
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
  var weekDiv = document.querySelector("#weekdiv")
  weekDiv.innerHTML = '';
  overviewChartInit();
});

// 'BY WEEK' BUTTON
// render a page with a list of weeks that link to the drilldowns by topic
$( "#byweek" ).click(function() {
  console.log( "Love is a battlefield. The 'week' button has fired." );
  var chartContainer = document.querySelector(".chart-container")
  chartContainer.innerHTML = '';
  var students = document.querySelector("#content")
  students.innerHTML = '';

  // append week selector
  var chartContainer = document.querySelector(".chart-container");
  var weekDiv = document.createElement('div')
  weekDiv.id = "weekdiv"
  chartContainer.parentNode.insertBefore(weekDiv, chartContainer);
  var weekSelect = document.createElement('select');
  weekSelect.id = "mynameisjanetpausejacksonifyernasty";
  weekSelect.name = "mynameisjanetpausejacksonifyernasty"
  weekDiv.appendChild(weekSelect);
  
  for (var i = 0; i < listofWeeks[0].length; i++) {
    var weekOptions = document.createElement('option');
    weekOptions.id = "weekoptions";
    weekOptions.textContent = listofWeeks[0][i];
    weekOptions.value = listofWeeks[0][i];
    weekSelect.appendChild(weekOptions);
  }
  weekSelectInit();
});

function weekSelectInit() {
  $( "#mynameisjanetpausejacksonifyernasty" ).change(function() {
  console.log("My name is Janet. Jacket if yer nasty.")
  }); 
}  

// 'BY STUDENT' BUTTON
// render a page with a list of students that links to the drilldown per student.
$( "#bystudent" ).click(function() {
  var chartContainer = document.querySelector(".chart-container")
  chartContainer.innerHTML = '';
  var weekDiv = document.querySelector("#weekdiv")
  weekDiv.innerHTML = '';
  studentSearch();
  studentInit();
});    

// ******************** END BUTTONS *****************

// ******************** BEGIN WEEK OPTIONS *****************

// $( "#weekselect" ).change(function() {
//   console.log($("oh god"));
//   process($(this).children(":selected").html());
//   weekChartInit();
// });    


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

function weekChartInit() { 
  // SELECTED WEEK
  selectedWeek = parseInt(document.getElementById("weekselect").value.replace("week ", ""));
  console.log("selected week is: " + selectedWeek);
  var chartContainer = document.querySelector(".chart-container");
  var weekChart = document.createElement('div'); 
  weekChart.id = "weekchart";
  chartContainer.appendChild(weekChart);

  $('#weekchart').highcharts({
    chart: {
        marginLeft: 320,
        type: 'bar'
    },
    title: {
        text: weekChartTitle + ": Week "  
    },
    xAxis: {
        categories: week1Topics
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
        data: reducedScores
      }]
  });
};

// ******************** END HIGHCHARTS FOR WEEK VIEW *****************


window.onload = function() { 
  // init(); 
  console.log("happy new year."); 
};