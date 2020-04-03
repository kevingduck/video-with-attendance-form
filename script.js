(function() {

  'use strict';

  Vue.component('demo-grid', {
    template: '<table><tr v-for="station in data"><td v-for="info in station">{{info}}</td></tr></table>',
    props: {
      data: Array,
    }
  });

  var app = new Vue({
    el: '#app',
    data: {
      cleanedData: []
    },
    created: function() {
      console.log('created');
      this.getAjax();
    },
    methods: {
      getAjax: function() {
        var self = this;
        var JSONURL = 'https://spreadsheets.google.com/feeds/list/1NtKkw71fJD7ru1hS6DkPWwviK6wQHtO7YlsBZC27OHQ/1/public/basic?alt=json';
        $.get(JSONURL, function(spreadData){
          self.cleanItUp(spreadData);
      	});
      }, // getAjax

      cleanItUp: function(data) {
        var cleanedData = []
        var self = this;
        var cells = data.feed.entry;
        for (var i=0; i<cells.length; i++) {
          var s = cells[i].content.$t.split(", ");
          var key = i;
          var activity = s[0].split(": ")[1];
          var time = s[1].split(": ")[1];
          var category = s[2].split(": ")[1];
          var age = s[3].split(": ")[1];
          var notes = s[4].split(": ")[1];
          
          cleanedData.push({
            key: key,
            activity: activity,
            time: time,
            category: category,
            age: age,
            notes: notes
          });
        }
        // console.log(cleanedData);
        var num_activities = 10;
        var random_activities = [];
        for (var i=0; i<num_activities; i++) {
          var item = cleanedData[Math.floor(Math.random() * cleanedData.length)];
          random_activities.push(item);
        }

        debugger;
        
        _.map(cells, function(cell) {
          var rowObj = {};
          var rowCols = _.words(cell.content.$t,/[^,]+/g);
          _.map(rowCols, function(col) {
            var keyVal = _.words(col,/[^:]+/g);
            rowObj[keyVal[0]] = keyVal[1];
          });
          rowObj.nid = cell.title.$t;
          self.cleanedData.push(rowObj);
        });
      }

    }

  });

})();
