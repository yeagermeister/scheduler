$(document).ready (function (){

//selectors for page elements
var currentDayEl = $('#currentDay');
var hourEl = $('.time-block');
var buttonEl = $('.btn');

// time variables
dayjs.extend(window.dayjs_plugin_advancedFormat);
var today = dayjs().format('dddd MMMM, Do');
var currentHour = dayjs().format('HH');

// Other variables
var storedSchedule = [];
var hour =["09", "10", "11", "12", "13", "14", "15", "16", "17"];

// display the current day in the header
$(currentDayEl).html(today);

// Get items from local storage
for (i = 0; i < 9; i++) {
  storedSchedule.push(JSON.parse(localStorage.getItem("hour-" + hour[i])));
}

// Event listener for the save buttons
buttonEl.on('click', function() {
  var saveID = $(this).parent().attr('id');
  var saveText = $(this).siblings('.description').val();
  localStorage.setItem(saveID, JSON.stringify(saveText));
});

//Fill the text areas from local storage and set the classes for the containers based on the current time.
$(hourEl).each (function() {
  var id = $(this).attr("id");
  var right = id.slice(-2);
  var text = JSON.parse(localStorage.getItem(id))
    if (text) {
      $(this).children('.description').html(text);
    }
    if (currentHour == right) {
      $(this).addClass("present")
    };
    if (currentHour > right) {
      $(this).addClass("past")
    };
    if (currentHour < right) {
      $(this).addClass("future")
    };
  });
});
