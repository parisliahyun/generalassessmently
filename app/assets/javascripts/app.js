// ******************** START HANDLEBARS *****************

// GRAB THE DATA FROM THE SERVER.
$result = "";
$.ajax({ url: 'spreadsheets', 
  cache: false, 
  success: function(response) 
  { $result = $(response).find('#keys'); 
  }   
});

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

// PROCESS ALL THE SPREADSHEET URLS VIA TABLETOP
function overviewinit() {  
  for (i = 0; i < $result.length; i++) { 
    Tabletop.init( { key: $result[i].innerHTML,
                     callback: showInfo2,
                     parseNumbers: true } );
  }
}

// THE CALLBACK FUNCTION THAT SENDS THE STUDENT DATA TO THE HANDLEBAR TEMPLATE. 
function showInfo1(data, tabletop) {
  var source   = $("#spreadsheet-template").html();
  var template = Handlebars.compile(source);

  $.each( tabletop.sheets("Students").all(), function(i, spreadsheet) {
    var html1 = template(spreadsheet);
    $("#content").append(html1);
  });
}

// THE CALLBACK FUNCTION THAT SENDS THE OVERVIEW DATA TO THE HANDLEBAR TEMPLATE. 
function showInfo2(data, tabletop) {
  var source   = $("#overview-template").html();
  var template = Handlebars.compile(source);

  $.each( tabletop.sheets("Students").all(), function(i, spreadsheet) {
    var html2 = template(spreadsheet);
    $("#content").append(html2);
  });
}

// BY OVERVIEW BUTTON
// render the graph with weekly breakdown
$( "#overview" ).click(function() {
  // alert( "Handler for .click() on overview button called." );
  overviewinit();
});

// BY WEEK BUTTON
// render a page with a list of weeks that link to the drilldowns by topic
$( "#byweek" ).click(function() {
  alert( "Handler for .click() on week button called." );
});

// BY STUDENT BUTTON
// render a page with a list of students that link to the drilldown per student.
$( "#bystudent" ).click(function() {
  alert( "Handler for .click() on student button called." );
  init();
});


// START HIGHCHARTS FOR INSTANCE OVERVIEW


$(function () { 
    $('#overviewchart').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'INSTANCE OVERVIEW'
        },
        xAxis: {
            categories: ['WEEK #', 'WEEK #', 'WEEK #']
        },
        yAxis: {
            title: {
                text: 'ASSESSMENT SCORE'
            }
        },
        series: [{
            name: 'WEEKLY HEADING',
            data: [5, 7, 3]
        }]
    });
});

// document.observe("dom:loaded", function() {
//    var chart1 = new Highcharts.Chart({
//       chart: {
//          renderTo: 'overviewchart',
//          type: 'bar'
// }); 

// ******************** BELOW IS A GRAVEYARD OF PREVIOUS SOLUTIONS. RIP. SIDENOTE: THE BACKBONE SOLUTION WORKED. IT JUST PROVED TO CREATE MORE WORK. SO SCREW IT. *****************

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


// START BACKBONE


// var storage = Tabletop.init( { key: omg(), 
                                   // wait: true } ) 

// var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0AuZMGuR3ulpfdFpGNld2VmZqdk0xR1R4dXpvMUJvZFE&output=html';

// var storage = Tabletop.init( { key: public_spreadsheet_url, 
                                  // wait: true } )

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

// var Assessment = Backbone.Model.extend({
//   idAttribute: 'coursematerial',
//   tabletop:  {
//   proxy: 'https://s3.amazonaws.com/google_spreadsheets',
//   // instance: 'http://localhost:3000/spreadsheets',
//   instance: storage,
//   sheet: 'Students'
//   },
//   sync: Backbone.tabletopSync,  
// })

// var Info = Backbone.Model.extend({
//   idAttribute: 'info',
//   tabletop:  {
//   proxy: 'https://s3.amazonaws.com/google_spreadsheets',  
//   instance: storage,
//   sheet: 'Students'
//   },
//   sync: Backbone.tabletopSync
// })

// var Value = Backbone.Model.extend({
//   idAttribute: 'value',
//   tabletop:  {
//   proxy: 'https://s3.amazonaws.com/google_spreadsheets',  
//   instance: storage,
//   sheet: 'Students'
//   },
//   sync: Backbone.tabletopSync
// })
  
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
//   instance: storage,  
//   sheet: 'Students'
//   },
//   sync: Backbone.tabletopSync
// });

// var AssessmentCollection = Backbone.Collection.extend({
//   model: Info,
//   tabletop: {
//   proxy: 'https://s3.amazonaws.com/google_spreadsheets',
//   instance: storage,  
//   sheet: 'Students'
//   },
//   sync: Backbone.tabletopSync
// });

// var AssessmentCollection = Backbone.Collection.extend({
//   model: Value,
//   tabletop: {
//   proxy: 'https://s3.amazonaws.com/google_spreadsheets',
//   instance: storage,  
//   sheet: 'Students'
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
 //    // var commandline_view = new ListView({ model: stuff.get('Command Line') });
 //    // $("#content").append( commandline_view.render().el );

 //   studentname = new Assessment({coursematerial: 'Name'})
 //   studentname.fetch();
 //   info = new Info({info: 'Paris Hyun'})
 //   info.fetch();
 //   value = new Value({value: 'WDI Sept 2013'})
 //   info.fetch();
 //   var heading_view = new ListView({ model: studentname});
 //   $("#content").append( heading_view.render().el);  
 //  }
