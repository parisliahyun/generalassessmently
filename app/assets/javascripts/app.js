// ******************** START HANDLEBARS  *****************

// GRAB THE DATA FROM THE SERVER.
$result = "";
$.ajax({ url: 'spreadsheets', 
  cache: false, 
  success: function(response) 
  { $result = $(response).find('#keys'); 
  }   
});

// *********** START SIMPLESHEET EXPERIMENTING ***********************

 function simple() {
        for (i = 0; i < $result.length; i++) { 
        Tabletop.init( { key: $result[i].innerHTML,
                         callback: showSimple,
                         simpleSheet: true, 
                         parseNumbers: true } );
      }
    }  

function showSimple(data) {
  // data comes through as a simple array since simpleSheet is turned on
  alert("Successfully processed " + data.length + " rows!")
  document.getElementById("overview").innerHTML = "<strong>overview data:</strong> " + [ data[0].week, data[1].week, data[2].week ].join(", ");
  $allthis = $(data)
  console.log(data);
}

// *********** END SIMPLESHEET ***********************

// LOAD ALL SPREADSHEETS WHEN THE DOCUMENT HAS LOADED.
// This doesn't work. Baaaaaahhhh!!!!
$(document).ready( function() {
  console.log( "ready!" );
  init();
});

// PROCESS ALL THE SPREADSHEET URLS VIA TABLETOP
function init() {  
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

// PROCESS ALL SPREADSHEETS FOR OVERVIEW TEMPLATE
function initoverview() {  
  for (i = 0; i < $result.length; i++) { 
    Tabletop.init( { key: $result[i].innerHTML,
                     callback: showInfo2,
                     parseNumbers: true } );
  }
}

// THE CALLBACK FUNCTION FOR OVERVIEW TEMPLATE
function showInfo2(data, tabletop) {
  var source   = $("#overview-template").html();
  var template = Handlebars.compile(source);

  $.each( tabletop.sheets("Students").all(), function(i, spreadsheet) {
    var html2 = template(spreadsheet);
    $("#content").append(html2);
  });
}

// ******************** END HANDLEBARS   *****************

// BUTTONS 

// 'OVERVIEW' BUTTON
// render the graph with weekly breakdown
$( "#overview" ).click(function() {
  // alert( "Handler for .click() on overview button called." );

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
  

  // ******************** BEGIN HIGHCHARTS FOR OVERVIEW ***************** 

  $(function () { 
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
              name: 'FALL 2013 WDI',
              data: [600, 780, 1024, 1050, 600, 850, 901, 880, 587]
          }]
      });
  });

});

// document.observe("dom:loaded", function() {
//    var chart1 = new Highcharts.Chart({
//       chart: {
//          renderTo: 'overviewchart',
//          type: 'bar'
// }); 


  // ******************** END HIGHCHARTS FOR OVERVIEW *****************



// ******************** BELOW IS A GRAVEYARD OF PREVIOUS SOLUTIONS. RIP. SIDENOTE: THE BACKBONE SOLUTION WORKED. IT JUST PROVED TO BE TOO LABORIOUS. SO SCREW IT. *****************


//  ******************** START BACKBONE *****************

// CSRF 
 // BackboneRailsAuthTokenAdapter.fixSync(Backbone);

  /*
   _____             .___     .__          
  /     \   ____   __| _/____ |  |   ______
 /  \ /  \ /  _ \ / __ |/ __ \|  |  /  ___/
/    Y    (  <_> ) /_/ \  ___/|  |__\___ \ 
\____|__  /\____/\____ |\___  >____/____  >
        \/            \/    \/          \/ 
*/

// $storage = "";
// $(function() {
// for (i = 0; i < $result.length; i++) { 
//     $storage = Tabletop.init( {  
//     key: $result[i].innerHTML,
//     wait: true } )
// }
// })

// var Assessment = Backbone.Model.extend({
//   idAttribute: 'rowNumber',
//   tabletop:  {
//   proxy: 'https://s3.amazonaws.com/google_spreadsheets',    
//   instance: $storage, 
//   sheet: 'Students'
//   },
//   sync: Backbone.tabletopSync,  
// });
 
  
/*
_________        .__  .__                 __  .__                      
\_   ___ \  ____ |  | |  |   ____   _____/  |_|__| ____   ____   ______
/    \  \/ /  _ \|  | |  | _/ __ \_/ ___\   __\  |/  _ \ /    \ /  ___/
\     \___(  <_> )  |_|  |_\  ___/\  \___|  | |  (  <_> )   |  \\___ \ 
 \______  /\____/|____/____/\___  >\___  >__| |__|\____/|___|  /____  >
        \/                      \/     \/                    \/     \/ 
*/

// var AssessmentCollection = Backbone.Collection.extend({
//   model: Assessment,
//   tabletop: {
//   proxy: 'https://s3.amazonaws.com/google_spreadsheets',  
//     instance: $storage, 
//     sheet: 'Students'
//   },
//   sync: Backbone.tabletopSync
// });


/*
____   ____.__                     
\   \ /   /|__| ______  _  ________
 \   Y   / |  |/ __ \ \/ \/ /  ___/
  \     /  |  \  ___/\     /\___ \ 
   \___/   |__|\___  >\/\_//____  >
                   \/           \/ 
*/        

// var ListView = Backbone.View.extend({
//       tagname: 'div',
//       template: _.template($("#assessment-template").html()),

//       render: function() {
//         $(this.el).html(this.template(this.model.toJSON()));
//         return this;
//       }
// })

/*
.___       .__  __  .__       .__  .__                __  .__               
|   | ____ |__|/  |_|__|____  |  | |__|____________ _/  |_|__| ____   ____  
|   |/    \|  \   __\  \__  \ |  | |  \___   /\__  \\   __\  |/  _ \ /    \ 
|   |   |  \  ||  | |  |/ __ \|  |_|  |/    /  / __ \|  | |  (  <_> )   |  \
|___|___|  /__||__| |__(____  /____/__/_____ \(____  /__| |__|\____/|___|  /
         \/                 \/              \/     \/                    \/ 
*/

 // $(document).ready( function() {

 //  var stuff = new AssessmentCollection();
 //  stuff.fetch({ success: showInfo });  
 //  });

 //  function showInfo(stuff) {
 //    total = new Assessment({'rowNumber': 73})
 //    total.fetch();
 //   $("#content").append( heading_view.render().el);  
 //  }

// START SIMPLESHEET

// $(function() {
//     console.log( "ready!" );
//     init();
// });

// function init() {
//   for (i = 0; i < $result.length; i++) { 
//     Tabletop({ 
//       key: $result[i].innerHTML,
//       callback: showInfo,
//       simpleSheet: true
//     });
//   }
// }

// var count = 0;
// function showInfo(data, tabletop) {
//   // data comes through as a simple array since simpleSheet is turned on
//   var td = document.getElementById('data'),
//       html = "<p>SHEET " + (++count) + "</p>",
//       prop, i;
//   for(i = 0; i < data.length; i++) {
//     for(prop in data[i]) {
//       html = html + "&nbsp;&nbsp;" + data[i][prop];
//     }
//     html = html + "<hr><br>";
//   }
//   td.innerHTML = td.innerHTML + html;
// }