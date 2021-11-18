// ---- Main Application ----

// Wrap most of application in anonymous closure for namespace reasons
// https://toddmotto.com/mastering-the-module-pattern/
var musicWorkList = (function() {
  "use strict";   // This causes interpreter to complain about hinky things (that are handled gracefully by some browsers) for better debugging

  let musicWorks = [{"music_work_ID":1,"name":"near","comment":"near stuff"},{"music_work_ID":2,"name":"far","comment":"far stuff"},{"music_work_ID":3,"name":"quiet","comment":"quiet stuff"},{"music_work_ID":4,"name":"loud","comment":"loud stuff"}];

  var storage = window.sessionStorage;
  for (var i in musicWorks) {
    let content = '{"name":"'+musicWorks[i].name+'","comment":"'+musicWorks[i].comment+'"}'
    storage.setItem("musicWork"+musicWorks[i].music_work_ID, content);
  }
  

  let html = "";
  for (var i in musicWorks) {
    //console.log(Work)
    html += "<div class=\"listViewItem\">";
    html += "<div class=\"name\">"+musicWorks[i].name+"</div>";
    html += "<div class=\"actions\">"
    html += "<ul>"
    html += "<li><a href=\"musicWorkDetail.html?id=musicWork"+musicWorks[i].music_work_ID+"\">View</a></li>"
    html += "<li>Edit</li>"
    html += "<li>Delete</li>"
    html += "</ul>"
    html += "</div>";
    html += "</div>";
    html += "</div>";
  }

  let holder = document.getElementById("musicWorkListHolder");
  holder.innerHTML += html;


// ---- Return Public Items ---- //
/*
return {
};
//*/

})();
