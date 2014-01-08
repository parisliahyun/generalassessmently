// GRAB THE DATA FROM THE SERVER.
function filterCourses(text) {
  $result = ""; 
  $.ajax({ url: 'courses/' + text,
    cache: false, 
    success: function(response) 
    { $result = $(response).find('#keys'); 
    init(showInfo1);
    }   
  });
};

function chooseChart(thisIsTheCallback) {
  init(thisIsTheCallback);
  console.log("choose chart fired");
}

// *********** TABLETOP INITIALIZER ***********************

function init(thisIsTheCallback) {
  for (i = 0; i < $result.length; i++) { 
  Tabletop.init( { key: $result[i].innerHTML,
                   callback: thisIsTheCallback,
                   simpleSheet: true, 
                   // proxy: 'https://s3.amazonaws.com/googlespreadsheets',
                   parseNumbers: true} );
  }
};

// ******************** BUTTONS *****************

// 'OVERVIEW' BUTTON
$( "#overview" ).click(function() {
  clearCharts();
  if ($("#weekdiv").length > 0) {
    var weekDiv = document.querySelector("#weekdiv");
    weekDiv.innerHTML = '';
  }
  appendOverviewChart();
});

// 'BY WEEK' BUTTON
$( "#byweek" ).click(function() {
  clearCharts();
  var chartContainer = document.querySelector(".chart-container");
  var weekDiv = document.createElement('div');
  weekDiv.id = "weekdiv";
  chartContainer.parentNode.insertBefore(weekDiv, chartContainer);
  var weekSelect = document.createElement('select');
  weekSelect.id = "mynameisjanetpausejacksonifyernasty";
  weekSelect.name = "mynameisjanetpausejacksonifyernasty";
  weekDiv.appendChild(weekSelect);
    for (var i = 0; i < listofWeeks[0].length; i++) {
      var weekOptions = document.createElement('option');
      weekOptions.id = "weekoptions";
      weekOptions.textContent = listofWeeks[0][i];
      weekOptions.value = listofWeeks[0][i];
      weekSelect.appendChild(weekOptions);
    } 
  weekSelected();
});

// 'BUBBLE TABLE' BUTTON
$( "#bubblebutton" ).click(function() {
  clearCharts();
  var chartContainer = document.querySelector(".chart-container");
  var weekDiv = document.createElement('div');
  weekDiv.id = "weekdiv";
  chartContainer.parentNode.insertBefore(weekDiv, chartContainer);
  var weekSelect = document.createElement('select');
  weekSelect.id = "mynameisjanetpausejacksonifyernasty";
  weekSelect.name = "mynameisjanetpausejacksonifyernasty";
  weekDiv.appendChild(weekSelect);
    for (var i = 0; i < listofWeeks[0].length; i++) {
      var weekOptions = document.createElement('option');
      weekOptions.id = "weekoptions";
      weekOptions.textContent = listofWeeks[0][i];
      weekOptions.value = listofWeeks[0][i];
      weekSelect.appendChild(weekOptions);
    } 
  bubbleTableSelected();

});
 
// 'BY STUDENT' BUTTON
$( "#bystudent" ).click(function() {
  var chartContainer = document.querySelector(".chart-container");
  chartContainer.innerHTML = '';
  if ($("#weekdiv").length > 0) {
    var weekDiv = document.querySelector("#weekdiv");
    weekDiv.innerHTML = "";
  }
  chooseChart(showInfoStudent);
});    


// ******************** END BUTTONS *****************

// ******************** SETTING BETWEEN CHARTS *****************

function clearCharts() {
  console.log("clear charts has fired");
  var chartContainer = document.querySelector(".chart-container");
  chartContainer.innerHTML = '';
  var students = document.querySelector("#content");
  students.innerHTML = '';  
}

function weekSelected() {
  $( "#mynameisjanetpausejacksonifyernasty" ).change(function() {  
    chart = $('#weekchart').highcharts();
  if ($("#weekchart").length > 0) {      
      restWeekChartData();     
    } else {
      chooseChart(weekChartCallback); 
    }        
  }); 
}; 

function restWeekChartData() {
  var chart = $('#weekchart').highcharts();  
  chart.series[0].processedYData = [];
  allWeekScores = [];
  goTotheChart(); 
}  

function goTotheChart() {
  chooseChart(weekChartCallback);
}

function bubbleTableSelected() {
  $( "#mynameisjanetpausejacksonifyernasty" ).change(function() {  
  if ($("#bubble-table").length > 0) {      
      restWeekChartData();     
    } else {
    var chartContainer = document.querySelector(".chart-container");
    var bubbleTable = document.createElement('div'); 
    bubbleTable.id = "bubble-table";
    chartContainer.appendChild(bubbleTable);
    var bubbleTable = document.getElementById('bubble-table'); 
    var table = document.createElement('table');
    table.className = "table table-hover table-bordered";
    bubbleTable.appendChild(table);
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    var tr = document.createElement('tr');
    tr.id = 'table-rows';
    tbody.appendChild(tr);
    var topicColumn = document.createElement('th');
    topicColumn.textContent = " ****** ";
    tr.appendChild(topicColumn);
    chooseChart(bubbleTableCallback);
    }        
  }); 
}; 

// ******************** START HANDLEBARS FOR 'PER STUDENT' VIEWS *****************

// THE CALLBACK FUNCTION TO RENDER THE 'PER STUDENT' HANDLEBAR TEMPLATE. 
function showInfoStudent(data, tabletop) {
  var source   = $("#spreadsheet-template").html();
  var template = Handlebars.compile(source);
  $.each( tabletop.sheets("Students").all(), function(i, spreadsheet) {
    var html = template(spreadsheet);
    $("#content").append(html);
  });
}

// ******************** END HANDLEBARS *****************

// *********** SETTING UP VARIABLES FOR CHARTS ***********************

  weeklyMaxTotals = "";
  combinedWeekTotalFromEachSpreadsheet = [];
  reducedTotals = [];
  reducedMaxTotals = [];
  allWeeks = [];
  allWeekScores = [];
  data = "";
  listofWeeks = [];
  average = [];
  selectedWeek = "";

  weekTopics = [];
  weekRows = [];
  weekScores = [];

  allNames = [];
  theScores = [];
  bubbleRows = [];
  allRows = [];
  singleSet = [];
  arrays = [];


// *********** END VARIABLES FOR CHARTS ***********************


// *********** BEGIN CALLBACK FUNCTION FOR OVERVIEW CHART ***********************

  function showInfo1(overviewData) {
 
  // *********** FOR OVERVIEW CHART ***********
  // Y AXIS
  // find all hashes that contain totals and put them in an array
  overviewChartTitle = _.where(overviewData, {coursematerial: "Instance:"});  
  overviewChartTitle = _.pluck(overviewChartTitle, 'value');

  weekly = _.where(overviewData, {week: "weektotal"}); 
  combinedWeekTotalFromEachSpreadsheet.push(weekly); 

  // pluck from the 'value' column FOR STUDENT TOTALS
  listofValues = []
  for (i in combinedWeekTotalFromEachSpreadsheet) {listofValues.push(_.pluck(combinedWeekTotalFromEachSpreadsheet[i], "value"))};
  // combine the totals from each spreadsheet
  studentTotalsFromAllSpreadsheets = _.zip.apply([], listofValues);
  reducedTotals = [];
  for (i in studentTotalsFromAllSpreadsheets) {reducedTotals.push(_.reduce(studentTotalsFromAllSpreadsheets[i], function(memo, num){ return memo + num; }, 0))};

  // pluck from the 'maxpoints' column FOR MAX POINT TOTALS
  listofMaxValues = [];   
  for (i in combinedWeekTotalFromEachSpreadsheet) {listofMaxValues.push(_.pluck(combinedWeekTotalFromEachSpreadsheet[i], "maxpoints"))};
  maxTotalsFromAllSpreadsheets = _.zip.apply([], listofMaxValues);
  reducedMaxTotals = [];
  for (i in maxTotalsFromAllSpreadsheets) {reducedMaxTotals.push(_.reduce(maxTotalsFromAllSpreadsheets[i], function(memo, num){ return memo + num; }, 0))};

  average = [];
  // average
  for( var i = 0 ; i < reducedTotals.length;i++){ average.push( reducedTotals[i] * 100 / reducedMaxTotals[i]) };
    console.log("average: " + average);

  // X AXIS
  weekname = _.where(overviewData, {week: "weekname"});  
  allWeeks.push(weekname);
  for (i in allWeeks) {listofWeeks.push(_.pluck(allWeeks[i], "coursematerial"))};
};

// *********** END OVERVIEW GRAPH SETUP ***********************

// ******************** BEGIN HIGHCHARTS FOR OVERVIEW ***************** 

function appendOverviewChart() { 
  var chartContainer = document.querySelector(".chart-container");
  var overviewChart = document.createElement('div'); 
  overviewChart.id = "overviewchart";
  chartContainer.appendChild(overviewChart);

  $('#overviewchart').highcharts({
    chart: {
        type: 'bar'
    },
    title: {
        text: overviewChartTitle + ' Overview'
    },
    xAxis: {
        allowDecimals: true,
        categories: listofWeeks[0]
    },
    yAxis: {
        allowDecimals: true,
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
    }, {
      name: 'AVERAGE',
      data: average 
    }]
  });
// };
};
// ******************** END HIGHCHARTS FOR OVERVIEW *****************

// ******************** BEGIN HIGHCHARTS FOR WEEK VIEW *****************

function weekChartCallback(dataForWeekChart) { 
  // SELECTED WEEK
  selectedWeek = parseInt(document.getElementById("mynameisjanetpausejacksonifyernasty").value.replace("week ", ""));
  console.log("selected week is: " + selectedWeek);
  var chartContainer = document.querySelector(".chart-container");
  var weekChart = document.createElement('div'); 
  weekChart.id = "weekchart";
  chartContainer.appendChild(weekChart);

  // // ************ FOR WEEK CHART *********** 

  // TITLE
  weekChartTitle = _.where(dataForWeekChart, {coursematerial: "Instance:"});  
  weekChartTitle = _.pluck(weekChartTitle, 'value');
  
  // X AXIS
  weekRows = _.where(dataForWeekChart, {week: selectedWeek}); 
  weekTopics = [];
  for (i in weekRows) {weekTopics.push(weekRows[i].coursematerial)};

  // Y AXIS
  allWeekScores.push(weekRows);
  weekScores = [];
  for (i in allWeekScores) {weekScores.push(_.pluck(allWeekScores[i], "value"))};
  combineScores = [];
  combineScores = _.zip.apply([], weekScores); 
  reducedScores = [];
  for (i in combineScores) {reducedScores.push(_.reduce(combineScores[i], function(memo, num){ return memo + num; }, 0))}; 
  
  // THE WEEK CHART
  $('#weekchart').highcharts({
    chart: {
        marginLeft: 320,
        type: 'bar'
    },
    title: {
        text: weekChartTitle + ": Week "  + selectedWeek
    },
    xAxis: {
        categories: weekTopics
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
      }], 
  });  
reducedScores = [];
}; // END WEEK CHART 

// ******************** END HIGHCHARTS FOR WEEK VIEW ***************** 

// ******************** BEGIN BUBBLE TABLE ***************** 

 function bubbleTableCallback(dataForBubbleTable) {

  // SELECTED WEEK
  selectedWeek = parseInt(document.getElementById("mynameisjanetpausejacksonifyernasty").value.replace("week ", ""));
  console.log("selected week is: " + selectedWeek);
  selectedRows = _.where(dataForBubbleTable, {week: selectedWeek}); 
  onesetofTopics = _.pluck(selectedRows, 'coursematerial' );
  singleSet.push(onesetofTopics);

  size = 1;
  while (onesetofTopics.length > 0)
  arrays.push(onesetofTopics.splice(0, size)); 
  for (i in selectedRows) {weekTopics.push(selectedRows[i].coursematerial)};  
  theScores.push(selectedRows);
  moreScores = [];
  for (i in theScores) {moreScores.push(_.pluck(theScores[i], "value"))};
    studentNames = _.where(dataForBubbleTable, {coursematerial: "Name:"});  
    studentNames = _.pluck(studentNames, 'value');
    allNames.push(studentNames);
    bubbleRows = moreScores.push(weekTopics);
    allRows = _.zip.apply([], moreScores);
  // START APPENDING TABLE ROWS
  appendNames(allNames);
  
 }; 

 function appendNames(allNames) {
  var tr = document.getElementById('table-rows');
  var theStudents = document.createElement('th');
  var tbody = document.querySelector('tbody');
  for (var i = 0; i < allNames.length; i++) {
    theStudents.textContent = allNames[i];
  }
  theStudents.className = "students";
  tr.appendChild(theStudents);  
  console.log("bye")   
  appendTopics(arrays);
  };
  

function appendTopics(arrays) {
  var tbody = document.querySelector('tbody');  
  for (var i = 0; i < arrays.length; i++) {         
    var topicScoreRows = document.createElement('tr');
    topicScoreRows.id = "chart-rows"; 
    tbody.appendChild(topicScoreRows);

  }   
 console.log("inside appendTopics")
  
} 

// ******************** END BUBBLE TABLE ***************** 

window.onload = function() { 
  console.log("happy new year."); 
 //these elements will be used to get the user's input
  var user_input = document.getElementById('enter-course-field');
  var button = document.getElementById('add-item');
  //this function will create a new todo task using the text entered into the field
  //it responds to a mouse click and an 'enter' keypress events

  var inputEvent = function(event) {
    //keyCode of 'enter' is 13, keyCode of leftclick is 0
    if(event.keyCode === 13 || event.keyCode === 0) {
      filterCourses(user_input.value);
      console.log(user_input.value);
      //clear the input field
      user_input.value = '';
    }
  }
  button.onclick = inputEvent;
  user_input.onkeypress = inputEvent;  
};





