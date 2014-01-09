// GRAB THE DATA FROM THE SERVER.
function filterCourses(text) {
  $result = ""; 
  $.ajax({ url: 'courses/' + text,
    cache: false, 
    success: function(response) 
    { $result = $(response).find('#keys'); 
    init(showInfoOverview);
    }   
  });
};

function chooseChart(thisIsTheCallback) {
  init(thisIsTheCallback);
  console.log("trumpets.'Choose chart' has fired.");
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

// *********** SETTING UP VARIABLES FOR CHARTS ***********************

  // for overview chart. (variables shared between tabletop callback function and highcharts function.)
  combinedWeekTotalFromEachSpreadsheet = [];
  reducedTotals = [];
  reducedMaxTotals = [];
  allWeeks = [];
  allWeekScores = [];
  listofWeeks = [];
  average = [];
  
  // for week chart (variables shared with bubble table).
  selectedWeek = "";
  weekRows = [];
  weekScores = [];

  // for bubble table. in progress. 
  allNames = [];
  theScores = [];
  bubbleRows = [];
  allRows = [];
  singleSet = [];
  arrays = [];


// *********** END VARIABLES FOR CHARTS ***********************

// ******************** BUTTONS *****************

$( "#enter-course-field" ).change(function() { 
  $("#overview").fadeOut("slow");
  $("#byweek").fadeOut("slow");
  $("#bystudent").fadeOut("slow");
  if ($("#overviewchart").length > 0) {
    reducedTotals = [];
    reducedMaxTotals = [];
    allWeeks = [];
    allWeekScores = [];
    listofWeeks = [];
    average = [];
  };  
  resetWeekDiv();
  clearCharts();
  resetWeekChartData(); 
});

// 'OVERVIEW' BUTTON
$( "#overview" ).click(function() {
  resetWeekDiv();
  clearCharts();
  appendOverviewChart();
});

// 'BY WEEK' BUTTON
$( "#byweek" ).click(function() {
  if ($("#weekdiv").length > 0) {   
    weekSelected(); 
    $( "#weekdiv" ).remove();    
    clearCharts();
  } else {
    clearCharts();    
    setWeekChartDom(); 
    weekSelected();    
  }
});

// 'BUBBLE TABLE' BUTTON
$( "#bubblebutton" ).click(function() {
  resetWeekDiv();
  setWeekChartDom();
  bubbleTableSelected();
});
 
// 'BY STUDENT' BUTTON
$( "#bystudent" ).click(function() {
  var chartContainer = document.querySelector(".chart-container");
  chartContainer.innerHTML = '';
  resetWeekDiv();
  chooseChart(showInfoStudent);
});    


// ******************** END BUTTONS *****************

// ******************** SETTING  / RESETTING BETWEEN CHART VIEWS *****************

function removeSelectButton() {
  if ($("#weekdiv").length > 0) {  
    $( "#weekdiv" ).remove();
  }; 
}

function setWeekChartDom() {
  clearCharts();
  var chartContainer = document.querySelector(".chart-container");
  var weekDiv = document.createElement('div');
  weekDiv.id = "weekdiv";  
  chartContainer.parentNode.insertBefore(weekDiv, chartContainer);
  var weekSelect = document.createElement('select');
  weekSelect.id = "mynameisjanetpausejacksonifyernasty";
  weekSelect.name = "mynameisjanetpausejacksonifyernasty";
  $(weekSelect).hide().appendTo("#weekdiv").fadeIn(1000);
  var weekOptionDefault = document.createElement('option');
  weekOptionDefault.id = "weekoptiondefault";
  weekOptionDefault.textContent = "Select a week";
  weekSelect.appendChild(weekOptionDefault);
  for (var i = 0; i < listofWeeks[0].length; i++) {   
    var weekOptions = document.createElement('option'); 
    weekOptions.id = "weekoptions";
    weekOptions.textContent = listofWeeks[0][i];
    weekOptions.value = listofWeeks[0][i];
    weekSelect.appendChild(weekOptions);
  };  
};

function weekSelected() {
  $( "#mynameisjanetpausejacksonifyernasty" ).change(function() {  
  chart = $('#weekchart').highcharts();
  if ($("#weekchart").length > 0) {        
      resetWeekChartData();     
    } else {
      chooseChart(showInfoWeek); 
    }        
  }); 

}; 

function clearCharts() {
  console.log("clear charts has fired");
  var chartContainer = document.querySelector(".chart-container");
  chartContainer.innerHTML = '';
  var students = document.querySelector("#content");
  students.innerHTML = '';  
  combinedWeekTotalFromEachSpreadsheet = [];
}

function resetWeekDiv() {   
  if ($("#weekdiv").length > 0) {
    console.log("if statement inside resetweekdiv fired")
    var weekDiv = document.querySelector("#weekdiv");
    weekDiv.innerHTML = "";
    allWeekScores = [];
    reducedScores = [];
    combineScores = [];
  };
  removeSelectButton();
}

function resetWeekChartData() {
  var chart = $('#weekchart').highcharts();  
  chart.series[0].processedYData = [];
  allWeekScores = [];
  reducedScores = [];
  combineScores = [];
  goTotheChart(); 
}  

function goTotheChart() {
  chooseChart(showInfoWeek);
}

function bubbleTableSelected() {
  $( "#mynameisjanetpausejacksonifyernasty" ).change(function() {  
  if ($("#bubble-table").length > 0) {      
      resetWeekChartData();     
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


// *********** BEGIN CALLBACK FUNCTION FOR OVERVIEW CHART ***********************

  function showInfoOverview(overviewData) {
 
  // *********** FOR OVERVIEW CHART ***********
  // Y AXIS
  // find all hashes that contain totals and put them in an array
  overviewChartTitle = _.where(overviewData, {coursematerial: "Instance:"});  
  overviewChartTitle = _.pluck(overviewChartTitle, 'value');

  var weekly = _.where(overviewData, {week: "weektotal"}); 
  combinedWeekTotalFromEachSpreadsheet.push(weekly); 

  // pluck from the 'value' column FOR STUDENT TOTALS
  var listofValues = []
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
  var weekname = _.where(overviewData, {week: "weekname"});  
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

// ******************** BEGIN CALLBACK FUNCTION AND HIGHCHARTS FOR WEEK VIEW *****************

function showInfoWeek(dataForWeekChart) { 
  // SELECTED WEEK
  selectedWeek = parseInt(document.getElementById("mynameisjanetpausejacksonifyernasty").value.replace("week ", ""));
  console.log("selected week is: " + selectedWeek);
  var chartContainer = document.querySelector(".chart-container");
  var weekChart = document.createElement('div'); 
  weekChart.id = "weekchart";
  chartContainer.appendChild(weekChart);

  // // ************ FOR WEEK CHART *********** 

  // TITLE
  var weekChartTitle = _.where(dataForWeekChart, {coursematerial: "Instance:"});  
  weekChartTitle = _.pluck(weekChartTitle, 'value');
  
  // X AXIS
  weekRows = _.where(dataForWeekChart, {week: selectedWeek}); 
  var weekTopics = [];
  for (i in weekRows) {weekTopics.push(weekRows[i].coursematerial)};

  // Y AXIS
  allWeekScores.push(weekRows);
  var weekScores = [];
  
  for (i in allWeekScores) {weekScores.push(_.pluck(allWeekScores[i], "value"))};
  weekScores = _.zip.apply([], weekScores); 
  var reducedScores = [];
  for (i in weekScores) {reducedScores.push(_.reduce(weekScores[i], function(memo, num){ return memo + num; }, 0))}; 
  
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
}; // END WEEK CHART 

// ******************** END HIGHCHARTS FOR WEEK VIEW ***************** 

// ******************** IN PROGRESS !!! -- BEGIN BUBBLE TABLE -- IN PROGRESS !!! ***************** 

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
  var user_input = document.getElementById('enter-course-field');
  var button = document.getElementById('add-item');
  var inputEvent = function(event) {
    if(event.keyCode === 13 || event.keyCode === 0) {
      filterCourses(user_input.value);
      console.log(user_input.value);
      user_input.value = '';
      $("#overview").fadeIn();
      $("#byweek").fadeIn("slow");
      $("#bystudent").fadeIn(3000);
    }
  }
  button.onclick = inputEvent;
  user_input.onkeypress = inputEvent;  
};







