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
  week1 = []
  week2 = []
  week3 = []
  week4 = []
  week5 = []
  week6 = []
  week7 = []
  week8 = []
  week910 = []

  weeklyMaxTotals = ""
  week1Max = []
  week2Max = []
  week3Max = []
  week4Max = []
  week5Max = []
  week6Max = []
  week7Max = []
  week8Max = []
  week910Max = []

// *********** END VARIABLES FOR OVERVIEW DATA ***********************

// The call back function to render the data from tabletop for overview chart
  function showInfo(data) {
  // data comes through as a simple array since simpleSheet is turned on
  weeklyTotals = data
  console.log(weeklyTotals[66].value, weeklyTotals[90].value, weeklyTotals[133].value, weeklyTotals[167].value, weeklyTotals[178].value, weeklyTotals[218].value, weeklyTotals[241].value, weeklyTotals[257].value, weeklyTotals[306].value);

 // *********** GRABBING OVERVIEW DATA FROM SPREADSHEETS ***********************

  week1.push(weeklyTotals[66].value)
  week2.push(weeklyTotals[90].value)
  week3.push(weeklyTotals[133].value)
  week4.push(weeklyTotals[167].value)
  week5.push(weeklyTotals[178].value)
  week6.push(weeklyTotals[218].value)
  week7.push(weeklyTotals[241].value)
  week8.push(weeklyTotals[257].value)
  week910.push(weeklyTotals[306].value)

  week1Max.push(weeklyTotals[66].maxpoints)
  week2Max.push(weeklyTotals[90].maxpoints)
  week3Max.push(weeklyTotals[133].maxpoints)
  week4Max.push(weeklyTotals[167].maxpoints)
  week5Max.push(weeklyTotals[178].maxpoints)
  week6Max.push(weeklyTotals[218].maxpoints)
  week7Max.push(weeklyTotals[241].maxpoints)
  week8Max.push(weeklyTotals[257].maxpoints)
  week910Max.push(weeklyTotals[306].maxpoints)

  week1Total=0;
  for(var i in week1) { week1Total += week1[i]; }
  week2Total=0;
  for(var i in week2) { week2Total += week2[i]; }
  week3Total=0;
  for(var i in week3) { week3Total += week3[i]; }
  week4Total=0;
  for(var i in week4) { week4Total += week4[i]; }
  week5Total=0;
  for(var i in week5) { week5Total += week5[i]; }
  week6Total=0;
  for(var i in week6) { week6Total += week6[i]; }
  week7Total=0;
  for(var i in week7) { week7Total += week7[i]; }
  week8Total=0;
  for(var i in week8) { week8Total += week8[i]; }
  week910Total=0;
  for(var i in week910) { week910Total += week910[i]; }

  week1MaxTotal=0;
  for(var i in week1Max) { week1MaxTotal += week1Max[i]; }
  week2MaxTotal=0;
  for(var i in week2Max) { week2MaxTotal += week2Max[i]; }
  week3MaxTotal=0;
  for(var i in week3Max) { week3MaxTotal += week3Max[i]; }
  week4MaxTotal=0;
  for(var i in week4Max) { week4MaxTotal += week4Max[i]; }
  week5MaxTotal=0;
  for(var i in week5Max) { week5MaxTotal += week5Max[i]; }
  week6MaxTotal=0;
  for(var i in week6Max) { week6MaxTotal += week6Max[i]; }
  week7MaxTotal=0;
  for(var i in week7Max) { week7MaxTotal += week7Max[i]; }
  week8MaxTotal=0;
  for(var i in week8Max) { week8MaxTotal += week8Max[i]; }
  week910MaxTotal=0;
  for(var i in week910Max) { week910MaxTotal += week910Max[i]; }  
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
        categories: ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'WEEK 5', 'WEEK 6', 'WEEK 7', 'WEEK 8', 'WEEK 9 & 10']
    },
    yAxis: {
        title: {
            text: 'SELF-ASSESSMENT SCORES ACROSS ALL STUDENTS'
        }
    },
    series: [{
      name: 'STUDENT ASSESSMENT POINTS',
        data: [week1Total, week2Total, week3Total, week4Total, week5Total, week6Total, week7Total, week8Total, week910Total]
      }, {
      name: 'MAXIMUM ASSESSMENT POINTS',
        data: [week1MaxTotal, week2MaxTotal, week3MaxTotal, week4MaxTotal, week5MaxTotal, week6MaxTotal, week7MaxTotal, week8MaxTotal, week910MaxTotal]
    }]
  });
};

// ******************** END HIGHCHARTS FOR OVERVIEW *****************

// ******************** BEGIN HIGHCHARTS FOR WEEK VIEW *****************

range1 = _.range(3, 66, 1);
topics = _.map(range1, function(num){ return "weeklyTotals["+num+"].coursematerial"; })
week1values = _.map(range1, function(num){ return "weeklyTotals["+num+"].value"; })
week1max = _.map(range1, function(num){ return "weeklyTotals["+num+"].maxpoints"; })

totalWeekly = {}

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
        categories: _.map(topics, function(num){ return eval(num); })
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
        data: _.map(week1values, function(num){ return eval(num); })
      }]
  });
};

// ******************** END HIGHCHARTS FOR WEEK VIEW *****************

window.onload = function() { 
  // init(); 
  console.log("happy new year."); 
};