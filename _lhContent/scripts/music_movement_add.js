var musicMovementAdd = (async function() { 
  /*let test = document.getElementById("testUl");
  let item = document.createElement('li');
  item.innerHTML = "testItem";

  let item2 = document.createElement('li');
  item2.innerHTML = "test2Item";

  console.log("aadfasdfasdfadf");
  console.log(test);
  console.log(item);

  test.insertBefore(item, test.lastElementChild);
  test.insertBefore(item2, test.lastElementChild);*/

  const loadJson = async function(url) {
    let response = await fetch(url);
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }//*/
  }

  let path = "http://pauline.listeninghere.org/backend/json_test.php?menu=";
  let tagData = await loadJson(path+"music_tag");
  let workData = await loadJson(path+"music_work");


  //let tagData = [{"music_tag_ID":"1","name":"near","comment":"Sounds near the listener"},{"music_tag_ID":"2","name":"far","comment":"Sounds far from the listener"},{"music_tag_ID":"3","name":"quiet","comment":"Sounds that are especially quiet that might not otherwise be noticed"},{"music_tag_ID":"4","name":"loud","comment":"Sounds that are loud enough to stand out from the soundscape"},{"music_tag_ID":"5","name":"rhythmic","comment":"Sounds repetitive enough to be perceived as rhythmic."},{"music_tag_ID":"8","name":"sustained","comment":"A long sound of constant texture such as a hum, fan, etc."},{"music_tag_ID":"10","name":"a","comment":"aasdf"},{"music_tag_ID":"11","name":"b","comment":"baerfsdsg"},{"music_tag_ID":"12","name":"c","comment":"cadgfsfhd"},{"music_tag_ID":"13","name":"d","comment":"dardhkjgkl"},{"music_tag_ID":"14","name":"e","comment":"e"},{"music_tag_ID":"15","name":"a","comment":"aadad"},{"music_tag_ID":"16","name":"a","comment":"aadad"},{"music_tag_ID":"17","name":"coconut","comment":"coconut cake"},{"music_tag_ID":"18","name":"coconut","comment":"coconut cake"},{"music_tag_ID":"19","name":"coconut","comment":"coconut cake"},{"music_tag_ID":"20","name":"crab cakes","comment":"lobster roll"},{"music_tag_ID":"21","name":"chocolate","comment":"yum"},{"music_tag_ID":"22","name":"chocolate ","comment":"pancakes"},{"music_tag_ID":"23","name":"chocolate ","comment":"pancakes"},{"music_tag_ID":"24","name":"blueberry","comment":"muffins"},{"music_tag_ID":"25","name":"ada","comment":"adwadw"},{"music_tag_ID":"26","name":"ada","comment":"adwadw"},{"music_tag_ID":"27","name":"blueberry","comment":"pancakes"},{"music_tag_ID":"28","name":"rara","comment":"rara"},{"music_tag_ID":"29","name":"rara","comment":"rara"},{"music_tag_ID":"30","name":"1","comment":"2"},{"music_tag_ID":"31","name":"r","comment":"r"},{"music_tag_ID":"32","name":"erre","comment":"ere"},{"music_tag_ID":"33","name":"rwarsda","comment":"rwaeaw"},{"music_tag_ID":"34","name":"rwarsda","comment":"rwaeaw"},{"music_tag_ID":"35","name":"rwarsda","comment":"rwaeaw"},{"music_tag_ID":"36","name":"rwarsda","comment":"rwaeaw"},{"music_tag_ID":"37","name":"awea","comment":"awda"},{"music_tag_ID":"38","name":"dadw","comment":"dawda"},{"music_tag_ID":"39","name":"raradad","comment":"awdaw"},{"music_tag_ID":"40","name":"dadw","comment":"dawda"},{"music_tag_ID":"41","name":null,"comment":"adwad"},{"music_tag_ID":"42","name":"lobster","comment":"mac & cheese"}];
  //let workData = [{"music_work_ID":"1", "name":"work1"}, {"music_work_ID":"2", "name":"work2"}, {"music_work_ID":"3", "name":"work3"}];
  movementData = [];
  


  const makeDropdownOptions = function(id, data, dataID) {
    // Make selector dropdown options with following format:
    // <option value = "iID">iName</option>

    let html = "";
    for (let i in data) {
      html += '<option value = "'+data[i][dataID]+'">'+data[i].name+'</option>';
    }

    document.getElementById(id).innerHTML = html;
  }

  const makeTag = function(i,j) {
    /*
    Create a list item to hold musical tag information
    HTML Format:

    <li id="tagHolderi.j">
      <select name="tagItemi.j" id="tagItemi.j"></select>
      <span class="buttonDelete" id="tagItemDeletei">Delete</span>
    </li>
    */

    // create list element
    let item = document.createElement('li');
    item.id = "tagHolder"+i+'.'+j;
    html = '<select name="tagItem'+i+'.'+j+'" id="tagItem'+i+'.'+j+'"></select>';
    html += '<span class="buttonDelete" id="tagItemDelete'+i+'.'+j+'">Delete</span>';
    item.innerHTML = html;
    
    // insert into page
    let parent = document.getElementById("tagItem"+i);
    parent.insertBefore(item, parent.lastElementChild);

    // add dropdowns
    makeDropdownOptions('tagItem'+i+'.'+j, tagData, "music_tag_ID");
    //makeDropdownOptions('tagItem'+i+'.'+j, tagData, "musicTag_ID");

    // update movementData data
    movementData[i].tag.push(tagData[0].music_tag_ID);
    //movementData[i].tag.push(tagData[0].musicTag_ID);

    // add input capability
    inputTag(i,j);

    // add delete capability
    let del = document.getElementById("tagItemDelete"+i+'.'+j);
    del.addEventListener("click", () => {
      console.log("delete", i, j);
      deleteTag(i,j);
    });
  }

  const makeSection = function(i) {
    /* Create a list item to hold information about a Section/section of musical movement
    HTML format:

    <div class="buttonDelete" id="buttonDeleteSectioni">Delete Section</div>
    <div class="buttonUp" id="buttonSectionUpi">Up Section</div>
    <div class="buttonDown" id="buttonSectionDowni">Down Section</div>
    <label for="durationi" id="durationLabeli">Duration:</label>
    <input tag="number" min="1" name="durationi" id="durationi">
    <ul id="tagItemi">
      <!--Insert each music tag as list items -->
      <li id="tagItemEndi"><span class="buttonAdd" id="tagAddi">Add Tag</span></li>
    </ul>
    */

    // create buttons
    html = '<div class="buttonDelete" id="buttonDeleteSection'+i+'" data="'+i+'">Delete Section</div>';
    html += '<div class="buttonUp" id="buttonSectionUp'+i+'" data="'+i+'">Up Section</div>';
    html += '<div class="buttonDown" id="buttonSectionDown'+i+'" data="'+i+'">Down Section</div>';
    
    // create area for music tags
    html += '<label for="duration'+i+'" id="durationLabel'+i+'">Duration:</label>';
    html += '<input tag="number" value="1" min="1" name="duration'+i+'" id="duration'+i+'">';
    html += '<ul id="tagItem'+i+'">';
    html += '<li id="tagItemEnd'+i+'"><span class="buttonAdd" id="tagAdd'+i+'">Add Tag</span></li>';
    html += '</ul>';

    // Create list item
    let sectionList = document.getElementById("section");
    let sectionListItem = document.createElement('li');
    sectionListItem.id = "sectionItem"+i;
    sectionListItem.innerHTML = html;

    // insert list item into page
    sectionList.insertBefore(sectionListItem, sectionList.lastElementChild);
    movementData.push({"duration": 1, "tag": []});

    // attach initial tag to section
    makeTag(i, movementData[i].tag.length);
    attachTagAddButton(i);

    // add duration field
    inputDuration(i);
    
    // add delete button capability
    document.getElementById("buttonDeleteSection"+i).addEventListener("click", () => {
      deleteSection(i);
    });
  }

  const attachSectionAddButton = function () {
    //console.log("attachSectionAddButton");
    button = document.getElementById("sectionAdd");
    button.addEventListener("click", () => {
      makeSection(movementData.length);
    });
  }

  const attachTagAddButton = function (i) {
    button = document.getElementById("tagAdd"+i);
    button.addEventListener("click", () => {
      //console.log("add Tag Button");
      makeTag(i, movementData[i].tag.length);
    });
  }

  const inputTag = function(i,j) {
    // TODO: why is this not added to the input itself?
    // https://gomakethings.com/detecting-select-menu-changes-with-vanilla-js/
    document.addEventListener('input', function (event) {
      // Only run on our select menu
      if (event.target.id == 'tagItem'+i+'.'+j) {
        // https://www.geeksforgeeks.org/how-to-get-selected-value-in-dropdown-list-using-javascript/

        //https://stackoverflow.com/questions/59637239/uncaught-domexception-failed-to-execute-queryselector-on-document-is-no
        let selectElement = document.querySelector('[id="tagItem'+i+'.'+j+'"]');     
          
        movementData[i].tag[j] = selectElement.value;
        console.log(movementData);
      }
    }, false);
  }

  const inputDuration = function(i) {
    // TODO: why is this not added to the input itself?
    document.addEventListener('input', function (event) {
      if (event.target.id == 'duration'+i) {
        movementData[i].duration = document.getElementById('duration'+i).value;
        console.log(movementData);
      }
    }, false);
  }

  const deleteTag = function(i,j) {
    // find item & parent info
    let item = document.getElementById("tagHolder"+i+'.'+j);
    let parent = item.parentElement;

    item.remove();

    // update indices of siblings
    console.log("parent", parent);
    let k = 0;
    for (var child = parent.firstChild; child != null; child = child.nextSibling) {
      const charInID = 10;
      console.log(child.id.substring(charInID));
      if (parseFloat(child.id.substring(charInID))) {
        updateIndexTag(i,j,i,k);
        k++;
      }
    }  

    // update data to reflect removal
    movementData[i].tag.splice(j,1);
    console.log(movementData);
  }

  const deleteSection = function(i) {
    let item = document.getElementById("sectionItem"+i);
    item.remove();
    movementData.splice(i,1);
    console.log(movementData);

  }

  const updateIndexTag = function(oldi, oldj, newi, newj) {
    /*
    Update index in IDs
    HTML Format:

    <li id="tagHolderi.j">
      <select name="tagItemi.j" id="tagItemi.j"></select>
      <span class="buttonDelete" id="tagItemDeletei">Delete</span>
    </li>
    */

    let holder = document.getElementById("tagHolder"+oldi+"."+oldj);
    let select = document.getElementById("tagItem"+oldi+"."+oldj);
    let del = document.getElementById("tagItemDelete"+oldi+"."+oldj);
    let add = document.getElementById("tagItemEnd"+oldi);

    console.log("updateIndex", oldi, oldj, holder);

    if (holder) holder.id = "tagHolder"+newi+"."+newj;
    if (select) {
      select.name = "tagItem"+newi+"."+newj;
      select.id = "tagItem"+newi+"."+newj;
    }
    if (del) del.id = "tagItemDelete"+newi+"."+newj;

  }

  const updateIndexSection = function(oldi, newi) {
  /* Update index in IDs
    HTML format:

    <div class="buttonDelete" id="buttonDeleteSectioni">Delete Section</div>
    <div class="buttonUp" id="buttonSectionUpi">Up Section</div>
    <div class="buttonDown" id="buttonSectionDowni">Down Section</div>
    <label for="durationi" id="durationLabeli">Duration:</label>
    <input tag="number" min="1" name="durationi" id="durationi">
    <ul id="tagItemi">
      <!--Insert each music tag as list items -->
      <li id="tagItemEndi"><span class="buttonAdd" id="tagAddi">Add Tag</span></li>
    </ul>
    */
    let li = document.getElementById("sectionItem"+oldi);
    let del = document.getElementById("buttonDeleteSection"+oldi);
    let up = document.getElementById("buttonSectionUp"+oldi);
    let down = document.getElementById("buttonSectionDown"+oldi);
    let durlabel = document.getElementById("durationLabel"+oldi);
    let dur = document.getElementById("duration"+oldi);
    let tags = document.getElementById("tagItem"+oldi);
    let tagEnd = document.getElementById("tagItemEnd"+oldi);
    let tagAdd = document.getElementById("tagAdd"+oldi);

    del.setAttribute("data", newi);
    up.setAttribute("data", newi);
    down.setAttribute("data",newi);

    dur.name = "duration"+newi;
    console.log("durlabel", durlabel);
    durlabel.setAttribute("for", "duration"+newi);
    console.log("durlabel", durlabel);

    /*for (var child = tags.firstChild; child != null; child = child.nextSibling) {
      const charInID = 10;
      k = 0;
      if (parseFloat(child.id.substring(charInID))) {
        updateIndexTag(oldi,k,newi,k);
        k++;
      }
    }*/
    //console.log(movementData, oldi);
    k=0;
    for (var child = tags.firstChild; child != null; child = child.nextSibling) {
    //for (var k = 0; k < movementData[oldi].tag.length; k++) {
      updateIndexTag(oldi, k, newi, k);
      k++;
    }

    li.id = "sectionItem"+newi;
    del.id = "buttonDeleteSection"+newi;
    up.id = "buttonSectionUp"+newi;
    down.id = "buttonSectionDown"+newi;
    durlabel.id = "durationLabel"+newi;
    durlabel.for = "duration"+newi;
    dur.id = "duration"+newi;
    tags.id = "tagItem"+newi;
    tagEnd.id = "tagItemEnd"+newi;
    tagAdd.id = "tagAdd"+newi;
  }

  const swapSection = function(i, j) {
    console.log("swap", i, j);
    //console.log(movementData);
    const parent = document.getElementById("section");
    let child1 = document.getElementById("sectionItem"+j);
    let child2 = document.getElementById("sectionItem"+i);
    
    console.log(movementData);
    console.log(child1, child2);
    parent.insertBefore(child1, child2);

    // update indices
    updateIndexSection(i, 999);
    updateIndexSection(j, i);
    updateIndexSection(999,j);
    //makeSections();
    
    // update data
    movementData[i] = movementData.splice([j], 1, movementData[i])[0];
    console.log(movementData);

  }

  const sectionUp = function(i) {
    i = parseInt(i);
    console.log("up", i);
    if (i > 0) swapSection(i-1, i);
  }

  const sectionDown = function(i) {
    i = parseInt(i);
    let extraFakeNodes = 4; // what are these for? no one knows, but there's random extra stuff interpreted as nodes. Seems to be 3 plus 1 to account for index offset (starting with 0 not 1).
    console.log("listLength", document.getElementById("section").childNodes.length-extraFakeNodes);
    if (i < (document.getElementById("section").childNodes.length-extraFakeNodes)) swapSection(i, i+1); 
  }

  const buttons = function(event) {
    let e = event; // don't know why this is necessary but without it e.anything becomes undefined after 1 use
    e = e || window.event;
    //console.log(e);
    e = e.target || e.srcElement;
    let i = e.getAttribute("data");
    console.log(movementData);
    if (e.className === 'buttonDeleteSection') {
        deleteSection(i);
    } else if (e.className === 'buttonUp') {
      sectionUp(i);
    } else if (e.className === 'buttonDown') {
      sectionDown(i);
    }
  }

  /*const attachSubmitButton = function() {
    // https://stackoverflow.com/questions/8599595/send-json-data-from-javascript-to-php
    let button = document.getElementById("submit");
    button.addEventListener("click", function(){
      /*console.log("submit");
      let str_json = JSON.stringify(movementData);
      request= new XMLHttpRequest();
      request.open("POST", "JSON_Handler.php", true);
      request.setRequestHeader("Content-type", "application/json");
      console.log(str_json);
      request.send(str_json);*/
      /*let theForm = document.getElementById("theForm");
      
      html = '<input name="sections" value="'++'">';
      html += '<input name="sections" value="'++'">';

      theForm.submit();
      return false;},
      false);
    });
    
  }*/

  //---- main ----//

  document.getElementById("section").addEventListener("click", (event) => {buttons(event);});

 
  makeDropdownOptions("workName", workData, "music_work_ID");

  makeSection(movementData.length);
  attachSectionAddButton();
  //attachSubmitButton();

  /*let test = document.getElementById("testUl");
  let item = document.createElement('li');
  item.innerHTML = "testItem";

  console.log("aadfasdfasdfadf");
  console.log(test);
  console.log(item);

  test.insertBefore(item, test.lastElementChild);*/
})();