// GRAB THE DATA FROM THE SERVER.
 
$result = "";
$.ajax({ url: 'spreadsheets', 
  cache: false, 
  success: function(response) 
  { $result = $(response).find('#keys'); 
  init();
  }   
});

// *********** START SIMPLESHEET FOR HIGHCHARTS ***********************

function init() {
  for (i = 0; i < $result.length; i++) { 
  Tabletop.init( { key: $result[i].innerHTML,
                   callback: showInfo,
                   simpleSheet: true, 
                   parseNumbers: true} );
  }
};

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

  function showInfo(data) {
  // data comes through as a simple array since simpleSheet is turned on
  weeklyTotals = data
  console.log(weeklyTotals[66].value, weeklyTotals[90].value, weeklyTotals[133].value, weeklyTotals[167].value, weeklyTotals[178].value, weeklyTotals[218].value, weeklyTotals[241].value, weeklyTotals[257].value, weeklyTotals[306].value);

  week1.push(weeklyTotals[66].value)
  week2.push(weeklyTotals[90].value)
  week3.push(weeklyTotals[133].value)
  week4.push(weeklyTotals[167].value)
  week5.push(weeklyTotals[178].value)
  week6.push(weeklyTotals[218].value)
  week7.push(weeklyTotals[241].value)
  week8.push(weeklyTotals[257].value)
  week910.push(weeklyTotals[306].value)

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

}

// *********** END SIMPLESHEET ***********************

// ******************** START HANDLEBARS  *****************

// PROCESS ALL THE SPREADSHEET URLS FOR 'STUDENT' VIEW.
function studentInit() {  
  for (i = 0; i < $result.length; i++) { 
    Tabletop.init( { key: $result[i].innerHTML,
                     callback: showInfo1,
                     parseNumbers: true } );
  }
}

// THE CALLBACK FUNCTION TO RENDER THE 'STUDENT' HANDLEBAR TEMPLATE. 
function showInfo1(data, tabletop) {
  var source   = $("#spreadsheet-template").html();
  var template = Handlebars.compile(source);

  $.each( tabletop.sheets("Students").all(), function(i, spreadsheet) {
    var html1 = template(spreadsheet);
    $("#content").append(html1);
  });
}

// ******************** END HANDLEBARS   *****************

// BUTTONS 

// 'OVERVIEW' BUTTON
$( "#overview" ).click(function() {
  overviewChartInit();
});

// 'BY WEEK' BUTTON
// render a page with a list of weeks that link to the drilldowns by topic
$( "#byweek" ).click(function() {
  alert( "Handler for .click() on week button called." );
});

// 'BY STUDENT' BUTTON
// render a page with a list of students that link to the drilldown per student.
$( "#bystudent" ).click(function() {
  alert( "Handler for .click() on student button called." );
  init();
});  
  

  // ******************** BEGIN HIGHCHARTS AND BUTTON FOR OVERVIEW ***************** 

function overviewChartInit() { 
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
       plotOptions: {
      series: {
          stacking: 'normal'
      }
    },
    series: [{
        name: 'FALL 2013 WDI',
          data: [week1Total, week2Total, week3Total, week4Total, week5Total, week6Total, week7Total, week8Total, week910Total]
    }]
  });
};

// ******************** END HIGHCHARTS FOR OVERVIEW *****************

// LOAD ALL SPREADSHEETS WHEN THE DOCUMENT HAS LOADED.
window.onload = function() { 
  init(); 
  console.log("happy new year."); 
};