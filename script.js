(function () {

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
      cleanedData: [],
      randomized: [],
    },
    created: function () {
      this.getAjax();
    },
    methods: {
      getAjax: function () {
        var self = this;
        var JSONURL = 'https://spreadsheets.google.com/feeds/list/1NtKkw71fJD7ru1hS6DkPWwviK6wQHtO7YlsBZC27OHQ/1/public/basic?alt=json';
        $.get(JSONURL, function (spreadData) {
          self.cleanItUp(spreadData);
        });
      }, // getAjax

      cleanItUp: function (data) {
        var cleanedData = [];
        var self = this;
        var cells = data.feed.entry;
        // Split by spreadsheet col to make clean objects
        for (var i = 0; i < cells.length; i++) {
          var s = cells[i].content.$t.split(", ", 5);
          var key = i;
          var activity = s[0].split(": ")[1];
          var time = s[1].split(": ")[1];
          var category = s[2].split(": ")[1];
          var age = s[3].split(": ")[1];
          var notes = cells[i].content.$t.split("notes: ", 2)[1];

          self.cleanedData.push({
            key: key,
            activity: activity,
            time: time,
            category: category,
            age: age,
            notes: notes
          });
        }

        // Randomize
        var num_activities = 10; // Set number of activities
        var randomized = [];

        for (var i = 0; i < num_activities; i++) {
          var randomItem = self.cleanedData[Math.floor(Math.random() * self.cleanedData.length)];
          self.randomized.push(randomItem);
        }
      },

    }
  });
})();