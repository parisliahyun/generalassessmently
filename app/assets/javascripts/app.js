var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0AuZMGuR3ulpfdFpGNld2VmZqdk0xR1R4dXpvMUJvZFE&output=html';

var storage =  Tabletop.init( { key: public_spreadsheet_url, 
                                  wait: true } )

// CSRF 
 BackboneRailsAuthTokenAdapter.fixSync(Backbone);

  /*
   _____             .___     .__          
  /     \   ____   __| _/____ |  |   ______
 /  \ /  \ /  _ \ / __ |/ __ \|  |  /  ___/
/    Y    (  <_> ) /_/ \  ___/|  |__\___ \ 
\____|__  /\____/\____ |\___  >____/____  >
        \/            \/    \/          \/ 
*/

var Assessment = Backbone.Model.extend({
  idAttribute: 'coursematerial',
  tabletop:  {
  proxy: 'https://s3.amazonaws.com/google_spreadsheets',
  // instance: storage,
  sheet: 'Students'
  },
  sync: Backbone.tabletopSync
})

var Info = Backbone.Model.extend({
  idAttribute: 'info',
  tabletop:  {
  proxy: 'https://s3.amazonaws.com/google_spreadsheets',  
  // instance: storage,
  sheet: 'Students'
  },
  sync: Backbone.tabletopSync
})

var Value = Backbone.Model.extend({
  idAttribute: 'value',
  tabletop:  {
  proxy: 'https://s3.amazonaws.com/google_spreadsheets',  
  // instance: storage,
  sheet: 'Students'
  },
  sync: Backbone.tabletopSync
})
  
/*
_________        .__  .__                 __  .__                      
\_   ___ \  ____ |  | |  |   ____   _____/  |_|__| ____   ____   ______
/    \  \/ /  _ \|  | |  | _/ __ \_/ ___\   __\  |/  _ \ /    \ /  ___/
\     \___(  <_> )  |_|  |_\  ___/\  \___|  | |  (  <_> )   |  \\___ \ 
 \______  /\____/|____/____/\___  >\___  >__| |__|\____/|___|  /____  >
        \/                      \/     \/                    \/     \/ 
*/

var AssessmentCollection = Backbone.Collection.extend({
  model: Assessment,
  tabletop: {
  proxy: 'https://s3.amazonaws.com/google_spreadsheets',  
  // instance: storage,  
  sheet: 'Students'
  },
  sync: Backbone.tabletopSync
});

var AssessmentCollection = Backbone.Collection.extend({
  model: Info,
  tabletop: {
  proxy: 'https://s3.amazonaws.com/google_spreadsheets',
  // instance: storage,  
  sheet: 'Students'
  },
  sync: Backbone.tabletopSync
});

var AssessmentCollection = Backbone.Collection.extend({
  model: Value,
  tabletop: {
  proxy: 'https://s3.amazonaws.com/google_spreadsheets',
  // instance: storage,  
  sheet: 'Students'
  },
  sync: Backbone.tabletopSync
});
  
/*
____   ____.__                     
\   \ /   /|__| ______  _  ________
 \   Y   / |  |/ __ \ \/ \/ /  ___/
  \     /  |  \  ___/\     /\___ \ 
   \___/   |__|\___  >\/\_//____  >
                   \/           \/ 
*/        

var ListView = Backbone.View.extend({
      tagname: 'div',
      template: _.template($("#assessment-template").html()),

      render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      }
})

/*
.___       .__  __  .__       .__  .__                __  .__               
|   | ____ |__|/  |_|__|____  |  | |__|____________ _/  |_|__| ____   ____  
|   |/    \|  \   __\  \__  \ |  | |  \___   /\__  \\   __\  |/  _ \ /    \ 
|   |   |  \  ||  | |  |/ __ \|  |_|  |/    /  / __ \|  | |  (  <_> )   |  \
|___|___|  /__||__| |__(____  /____/__/_____ \(____  /__| |__|\____/|___|  /
         \/                 \/              \/     \/                    \/ 
*/

 $(document).ready( function() {
  var stuff = new AssessmentCollection();
  stuff.fetch({ success: showInfo });  
  });

  function showInfo(stuff) {
    // var commandline_view = new ListView({ model: stuff.get('Command Line') });
    // $("#content").append( commandline_view.render().el );

   studentname = new Assessment({coursematerial: 'Name'})
   studentname.fetch();
   info = new Info({info: 'Paris Hyun'})
   info.fetch();
   value = new Value({value: 'WDI Sept 2013'})
   info.fetch();
   var heading_view = new ListView({ model: studentname});
   $("#content").append( heading_view.render().el);  
  }








