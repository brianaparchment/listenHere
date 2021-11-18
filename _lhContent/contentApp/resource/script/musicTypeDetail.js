// ---- Main Application ----

// Wrap most of application in anonymous closure for namespace reasons
// https://toddmotto.com/mastering-the-module-pattern/
var musicTypeList = (function() {
  "use strict";   // This causes interpreter to complain about hinky things (that are handled gracefully by some browsers) for better debugging
  
  let itemKey = getParameterByName('id')
  console.log("itemKey", itemKey);
  var item = sessionStorage.getItem(itemKey);
  item = JSON.parse(item);
  console.log("item", item);

  let name = document.getElementById("musicTypeName");
  name.innerHTML = item.name;
  let comment = document.getElementById("musicTypeComment");
  comment.innerHTML = item.comment;


// ---- Return Public Items ---- //
/*
return {
};
//*/

})();
