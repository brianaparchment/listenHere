// ---- Main Application ----

// Wrap most of application in anonymous closure for namespace reasons
// https://toddmotto.com/mastering-the-module-pattern/
var musicTypeList = (async function() {
  "use strict";   // This causes interpreter to complain about hinky things (that are handled gracefully by some browsers) for better debugging


  let musicTypes = await loadJson("http://pauline.listeninghere.org/backend/fall2020/getData.php?t=music_type");

  var storage = window.sessionStorage;
  for (var i in musicTypes) {
    let content = '{"name":"'+musicTypes[i].name+'","comment":"'+musicTypes[i].comment+'"}'
    storage.setItem("musicType"+musicTypes[i].music_type_ID, content);
  }
  

  let html = "";
  for (var i in musicTypes) {
    //console.log(type)
    html += "<div class=\"listViewItem\">";
    html += "<div class=\"name\">"+musicTypes[i].name+"</div>";
    html += "<div class=\"actions\">"
    html += "<ul>"
    html += "<li><a href=\"musicTypeDetail.html?id=musicType"+musicTypes[i].music_type_ID+"\">View</a></li>"
    html += "<li>Edit</li>"
    html += "<li>Delete</li>"
    html += "</ul>"
    html += "</div>";
    html += "</div>";
    html += "</div>";
  }

  let holder = document.getElementById("musicTypeListHolder");
  holder.innerHTML += html;


// ---- Return Public Items ---- //
/*
return {
};
//*/

})();
