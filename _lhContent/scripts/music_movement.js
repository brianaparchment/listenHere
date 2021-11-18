/*========================= MusicMovement Class ========================*
  Handle Music Movement Data
/*===========================================================*/

//https://stackoverflow.com/questions/15356936/object-oriented-javascript-event-handling
function withScopeRunFunction(scope, fn) {
  return function() {
     return fn.apply(scope, arguments);
  }
}

class MusicMovement {
  constructor(record = null) {
    this.tagData = null;
    this.workData = null;
    this.movementData = null;
    this.record = record;
  } // end constructor

  async init (runnable) {
    //console.log("init", runnable);
    // https://stackoverflow.com/questions/43431550/async-await-class-constructor

     // For use on server
    let path = "http://pauline.listeninghere.org/backend/api_json.php?menu=";
    this.tagData = await loadJson(path+"music_tag");
    this.workData = await loadJson(path+"music_work");//*/

    // For offline development
    /*this.tagData = [{"music_tag_ID":"1","name":"near","comment":"Sounds near the listener"},{"music_tag_ID":"2","name":"far","comment":"Sounds far from the listener"},{"music_tag_ID":"3","name":"quiet","comment":"Sounds that are especially quiet that might not otherwise be noticed"},{"music_tag_ID":"4","name":"loud","comment":"Sounds that are loud enough to stand out from the soundscape"},{"music_tag_ID":"5","name":"rhythmic","comment":"Sounds repetitive enough to be perceived as rhythmic."},{"music_tag_ID":"8","name":"sustained","comment":"A long sound of constant texture such as a hum, fan, etc."},{"music_tag_ID":"10","name":"a","comment":"aasdf"},{"music_tag_ID":"11","name":"b","comment":"baerfsdsg"},{"music_tag_ID":"12","name":"c","comment":"cadgfsfhd"},{"music_tag_ID":"13","name":"d","comment":"dardhkjgkl"},{"music_tag_ID":"14","name":"e","comment":"e"},{"music_tag_ID":"15","name":"a","comment":"aadad"},{"music_tag_ID":"16","name":"a","comment":"aadad"},{"music_tag_ID":"17","name":"coconut","comment":"coconut cake"},{"music_tag_ID":"18","name":"coconut","comment":"coconut cake"},{"music_tag_ID":"19","name":"coconut","comment":"coconut cake"},{"music_tag_ID":"20","name":"crab cakes","comment":"lobster roll"},{"music_tag_ID":"21","name":"chocolate","comment":"yum"},{"music_tag_ID":"22","name":"chocolate ","comment":"pancakes"},{"music_tag_ID":"23","name":"chocolate ","comment":"pancakes"},{"music_tag_ID":"24","name":"blueberry","comment":"muffins"},{"music_tag_ID":"25","name":"ada","comment":"adwadw"},{"music_tag_ID":"26","name":"ada","comment":"adwadw"},{"music_tag_ID":"27","name":"blueberry","comment":"pancakes"},{"music_tag_ID":"28","name":"rara","comment":"rara"},{"music_tag_ID":"29","name":"rara","comment":"rara"},{"music_tag_ID":"30","name":"1","comment":"2"},{"music_tag_ID":"31","name":"r","comment":"r"},{"music_tag_ID":"32","name":"erre","comment":"ere"},{"music_tag_ID":"33","name":"rwarsda","comment":"rwaeaw"},{"music_tag_ID":"34","name":"rwarsda","comment":"rwaeaw"},{"music_tag_ID":"35","name":"rwarsda","comment":"rwaeaw"},{"music_tag_ID":"36","name":"rwarsda","comment":"rwaeaw"},{"music_tag_ID":"37","name":"awea","comment":"awda"},{"music_tag_ID":"38","name":"dadw","comment":"dawda"},{"music_tag_ID":"39","name":"raradad","comment":"awdaw"},{"music_tag_ID":"40","name":"dadw","comment":"dawda"},{"music_tag_ID":"41","name":null,"comment":"adwad"},{"music_tag_ID":"42","name":"lobster","comment":"mac & cheese"}];
    this.workData = [{"music_work_ID":"1", "name":"work1"}, {"music_work_ID":"2", "name":"work2"}, {"music_work_ID":"3", "name":"work3"}];//*/
    
    //this.movementData = [{"duration":"1", "tag": ["1"]}, {"duration":"2", "tag": ["2", "3"]}, {"duration":"3", "tag": ["4", "5", "6"]}];
    

    if (runnable === "add") await this.add();
    else if (runnable === "edit") await this.edit();
    else if (runnable === "view") await this.view();
    else if (runnable === "list") await this.list();
    else if (runnable === "delete") await this.delete();
    else await this.add();

  } // end init

  makeDropdownOptions (id, data, dataID) {
    // Make selector dropdown options with following format:
    // <option value = "iID">iName</option>

    let html = "";
    for (let i in data) {
      html += '<option value = "'+data[i][dataID]+'">'+data[i].name+'</option>';
    }

    document.getElementById(id).innerHTML = html;
  } // end makeDropdownOptions

  makeTag (i,j, isNew=true) {
    /*
    Create a list item to hold musical tag information
    HTML Format:

    <li id="tagHolderi.j" datai="i", dataj="j">
      <select name="tagItemi.j" id="tagItemi.j"></select>
      <span class="buttonDelete" id="tagItemDeletei">Delete</span>
    </li>
    */

    // create list element
    let item = document.createElement('li');
    item.id = "tagHolder"+i+'.'+j;
    item.setAttribute("datai", i);
    item.setAttribute("dataj", j);
    let html = '<select name="tagItem'+i+'.'+j+'" id="tagItem'+i+'.'+j+'"></select>';
    html += '<span class="buttonDelete" id="tagItemDelete'+i+'.'+j+'">Delete</span>';
    item.innerHTML = html;
    
    // insert into page
    let parent = document.getElementById("tagItem"+i);
    parent.insertBefore(item, parent.lastElementChild);

    // add dropdowns
    this.makeDropdownOptions('tagItem'+i+'.'+j, this.tagData, "music_tag_ID");
    //makeDropdownOptions('tagItem'+i+'.'+j, tagData, "musicTag_ID");

    // update movementData data
    if (isNew) this.movementData[i].tag.push(this.tagData[0].music_tag_ID);
    //movementData[i].tag.push(tagData[0].musicTag_ID);

    // add input capability
    // WEIRD: cannot force scope no way no how, not with bind, not with apply, nothing
    // It only works if you pass this.movementData
    //withScopeRunFunction(this, this.inputTag(i,j, this.movementData));
    this.inputTag(i,j, this.movementData); 

  } // end makeTag

  makeSection (i, j=this.movementData[i].tag.length, isNew = true) {
    console.log("makeSection", i, j, isNew);
    /* Create a list item to hold information about a Section/section of musical movement
    HTML format:

    <div class="buttonDelete" id="buttonDeleteSectioni">Delete Section</div>
    <div class="buttonUp" id="buttonSectionUpi">Up Section</div>
    <div class="buttonDown" id="buttonSectionDowni">Down Section</div>
    <label for="durationi" id="durationLabeli">Duration:</label>
    <input tag="number" min="1" name="durationi" id="durationi">
    <ul id="tagItemi">
      <!--Insert each music tag as list items -->
      <li id="tagItemEndi"><span class="buttonAdd" id="tagAddi" datai="i">Add Tag</span></li>
    </ul>
    */

    // create buttons
    let html = '<div class="buttonDelete" id="buttonDeleteSection'+i+'" data="'+i+'">Delete Section</div>';
    html += '<div class="buttonUp" id="buttonSectionUp'+i+'" data="'+i+'">Up Section</div>';
    html += '<div class="buttonDown" id="buttonSectionDown'+i+'" data="'+i+'">Down Section</div>';
    
    // create area for music tags
    html += '<label for="duration'+i+'" id="durationLabel'+i+'">Duration:</label>';
    html += '<input tag="number" value="1" min="1" name="duration'+i+'" id="duration'+i+'">';
    html += '<ul id="tagItem'+i+'">';
    html += '<li id="tagItemEnd'+i+'"><span class="buttonAdd" id="tagAdd'+i+'" datai="'+i+'">Add Tag</span></li>';
    html += '</ul>';

    // Create list item
    let sectionList = document.getElementById("section");
    let sectionListItem = document.createElement('li');
    sectionListItem.id = "sectionItem"+i;
    sectionListItem.innerHTML = html;

    // insert list item into page
    sectionList.insertBefore(sectionListItem, sectionList.lastElementChild);
    if (isNew) {
      this.movementData.push({"duration": 1, "tag": []});
    }

    // attach initial tag to section
    this.makeTag(i, j, isNew);
    //this.attachTagAddButton(i);

    // add duration field
    this.inputDuration(i);
    
    // add delete button capability
    document.getElementById("buttonDeleteSection"+i).addEventListener("click", () => {
      withScopeRunFunction(this, this.deleteSection(i));
    });
  } // end makeSection

  attachSectionAddButton () {
    //console.log("attachSectionAddButton");
    let button = document.getElementById("sectionAdd");
    button.addEventListener("click", () => {
      withScopeRunFunction(this, this.makeSection(this.movementData.length, 0));
    });
  } // end attachSectionAddButton

  attachTagAddButton (i) {
    let button = document.getElementById("tagAdd"+i);
    button.addEventListener("click", () => {
      this.makeTag(i, this.movementData[i].tag.length).bind(this);
    });
  } // end attachTagAddButton

  inputTag (i,j, movementData) { 
    // WEIRD: have to pass movementData because this doesn't work, even with binding/apply/etc.
    
    //console.log(this, movementData);
    // TODO: why is this not added to the input itself?
    // https://gomakethings.com/detecting-select-menu-changes-with-vanilla-js/
    document.addEventListener('input', function (event) {
      // Only run on our select menu
      if (event.target.id == 'tagItem'+i+'.'+j) {
        // https://www.geeksforgeeks.org/how-to-get-selected-value-in-dropdown-list-using-javascript/

        //https://stackoverflow.com/questions/59637239/uncaught-domexception-failed-to-execute-queryselector-on-document-is-no
        let selectElement = document.querySelector('[id="tagItem'+i+'.'+j+'"]');     
        console.log(this);
        //this.movementData[i].tag[j] = selectElement.value;
        movementData[i].tag[j] = selectElement.value;
        //console.log(movementData);
      }
    }, false);
  } //end inputTag

  inputDuration (i) {
    // TODO: why is this not added to the input itself?
    document.addEventListener('input', function (event) {
      if (event.target.id == 'duration'+i) {
        this.movementData[i].duration = document.getElementById('duration'+i).value;
        //console.log(this.movementData);
      }
    }, false);
  } // end inputDuration

  deleteTag (i,j) {
    console.log("deleteTag", i, j);

    // find item & parent info
    let item = document.getElementById("tagHolder"+i+"."+j);
    console.log("item",item);

    //let parent = item.parentElement;
    parent = document.getElementById("tagItem"+i);
    console.log(parent, item, i, j);
    item.remove();
    console.log("remove");

    // update indices of siblings
    console.log("parent", parent);
    let k = 0;
    for (var child = parent.firstChild; child != null; child = child.nextSibling) {
      const charInID = 11;
      /*console.log("deleteTag", child.id, child.id.substring(charInID));
      if (parseFloat(child.id.substring(charInID))) {
        this.updateIndexTag(i,j,i,k);
        k++;
      }*/
      console.log("child", child);
      const j = child.getAttribute("dataj");
      if ((child.id != "tagItemEnd"+i) && (j != k)) {
        console.log("j,k",j,k);
        this.updateIndexTag(i, child.getAttribute("dataj"), i, k);
      }
      k++;
    }

    // update data to reflect removal
    this.movementData[i].tag.splice(j,1);
    //console.log(this.movementData);
  } // end deleteTag

  deleteSection (i) {
    let item = document.getElementById("sectionItem"+i);
    item.remove();
    this.movementData.splice(i,1);

    //console.log(this.movementData);
  } // end deleteSection

  updateIndexTag (oldi, oldj, newi, newj) {
    /*
      Update index in IDs
      HTML Format:

      <li id="tagHolderi.j">
        <select name="tagItemi.j" id="tagItemi.j"></select>
        <span class="buttonDelete" id="tagItemDeletei">Delete</span>
      </li>
    */

    console.log("updateIndexTag", oldi, oldj);

    let holder = document.getElementById("tagHolder"+oldi+"."+oldj);
    let select = document.getElementById("tagItem"+oldi+"."+oldj);
    let del = document.getElementById("tagItemDelete"+oldi+"."+oldj);
    let add = document.getElementById("tagItemEnd"+oldi);
    let addButton = document.getElementById("tagAdd"+oldi);

    //console.log("updateIndex", oldi, oldj, holder);

    if (holder) {
      console.log("update holder");
      holder.id = "tagHolder"+newi+"."+newj;
      holder.setAttribute("datai", newi);
      holder.setAttribute("dataj", newj);
    }
    if (select) {
      select.name = "tagItem"+newi+"."+newj;
      select.id = "tagItem"+newi+"."+newj;
    }
    if (del) {
      del.id = "tagItemDelete"+newi+"."+newj;
      /*del.setAttribute("datai", newi);
      del.setAttribute("dataj", newj);*/
    }
    if (add) {
      add.id = "tagItemEnd"+newi;
    }
    if (addButton) {
      addButton.id = "tagAdd"+newi;
      addButton.setAttribute("datai", newi);
    }
  } // end updateIndexTag

  updateIndexSection (oldi, newi) {
    /* Update index in IDs
      HTML format:
  
      <div class="buttonDelete" id="buttonDeleteSectioni">Delete Section</div>
      <div class="buttonUp" id="buttonSectionUpi">Up Section</div>
      <div class="buttonDown" id="buttonSectionDowni">Down Section</div>
      <label for="durationi" id="durationLabeli">Duration:</label>
      <input tag="number" min="1" name="durationi" id="durationi">
      <ul id="tagItemi">
        <!--Insert each music tag as list items -->
        <li id="tagItemEndi"><span class="buttonAdd" id="tagAddi" datai="i">Add Tag</span></li>
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
    //console.log("durlabel", durlabel);
    durlabel.setAttribute("for", "duration"+newi);
    //console.log("durlabel", durlabel);

    let k=0;
    for (var child = tags.firstChild; child != null; child = child.nextSibling) {
    //for (var k = 0; k < movementData[oldi].tag.length; k++) {
      console.log("updating indices");
      this.updateIndexTag(oldi, k, newi, k);
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
  } // end updateIndexSection

  swapSection (i, j) {
    //console.log("swap", i, j);
    //console.log(movementData);
    const parent = document.getElementById("section");
    let child1 = document.getElementById("sectionItem"+j);
    let child2 = document.getElementById("sectionItem"+i);
    
    //console.log(this.movementData);
    //console.log(child1, child2);
    parent.insertBefore(child1, child2);

    // update indices
    this.updateIndexSection(i, 999);
    this.updateIndexSection(j, i);
    this.updateIndexSection(999,j);
    //makeSections();
    
    // update data
    this.movementData[i] = this.movementData.splice([j], 1, this.movementData[i])[0];
    //console.log(this.movementData);
  } // end swapSection

  sectionUp (i) {
    i = parseInt(i);
    //console.log("up", i);
    if (i > 0) this.swapSection(i-1, i);
  } // end sectionUp

  sectionDown (i) {
    i = parseInt(i);
    let extraFakeNodes = 4; // what are these for? no one knows, but there's random extra stuff interpreted as nodes. Seems to be 3 plus 1 to account for index offset (starting with 0 not 1).
    //console.log("listLength", document.getElementById("section").childNodes.length-extraFakeNodes);
    if (i < (document.getElementById("section").childNodes.length-extraFakeNodes)) this.swapSection(i, i+1); 
  } // end sectionDown

  buttons (event) {
    let e = event; // don't know why this is necessary but without it e.anything becomes undefined after 1 use
    e = e || window.event;
    //console.log(e);
    e = e.target || e.srcElement;
    //console.log(this.movementData);
    console.log("buttons", e);
    let i = e.getAttribute("data");
    //console.log("data", data);
    if (e.className === 'buttonDeleteSection') {
      let i = e.getAttribute("data");
      this.deleteSection(i);
    } else if (e.className === 'buttonUp') {
      let i = e.getAttribute("data");
      this.sectionUp(i);
    } else if (e.className === 'buttonDown') {
      let i = e.getAttribute("data");
      this.sectionDown(i);
    } else if (e.className === 'buttonDelete') {
      let i = e.parentNode.getAttribute("datai");
      let j = e.parentNode.getAttribute("dataj");
      this.deleteTag(i, j);
    } else if (e.className === 'buttonAdd') {
      let i = e.getAttribute("datai");
      console.log("i", i);
      this.makeTag(i, this.movementData[i].tag.length).bind(this);
    }
  } // end buttons

  add () {
    //console.log("Music Movement Add");
    this.movementData = [];

    document.getElementById("section").addEventListener("click", (event) => {withScopeRunFunction(this,this.buttons(event));});

    this.makeDropdownOptions("workName", this.workData, "music_work_ID");
    this.makeSection(0, 0);
    this.attachSectionAddButton();
  } // end add

  edit () {
    this.workData = await loadJson(path+"music_work");

    //console.log("Music Movement Edit", this.movementData);
    document.getElementById("section").addEventListener("click", (event) => {withScopeRunFunction(this,this.buttons(event));});

    this.makeDropdownOptions("workName", this.workData, "music_work_ID");

    selectItem("workName", this.workData);

    for (let i = 0; i < this.movementData.length; i++) {
      //console.log("section", this.movementData[i]);
      this.makeSection(i, 0, false);
      document.getElementById("duration"+i).value = this.movementData[i].duration;
      
      let tagSelection = this.movementData[i].tag[0]-1;
      console.log(document.getElementById("tagItem"+i+".0"));
      //document.getElementById("tagItem"+i+".0").options[tagSelection].selected = true;
      selectItem("tagItem"+i+".0", tagSelection);

      console.log(document.getElementById("tagItem"+i+".0"));
      for (let j = 1; j < this.movementData[i].tag.length; j++) {
        console.log("j", j);
        this.makeTag(i, j, false);
        tagSelection = this.movementData[i].tag[j]-1;
        //document.getElementById("tagItem"+i+"."+j).selectIndex = this.movementData[i].tag[j];
        //document.getElementById("tagItem"+i+"."+j).options[tagSelection].selected = true;
        selectItem("tagItem"+i+"."+j, tagSelection);
      }
    }
    this.attachSectionAddButton();
  } // end edit

} // end musicMovement

const music_movement_add = async function() {
  let musicMovement = new MusicMovement(); 
  await musicMovement.init('add');
  return {musicMovement: musicMovement};
}

const music_movement_edit = async function() {
  //console.log("music_movement_edit");
  let musicMovement = new MusicMovement();
  await musicMovement.init('edit');
  //console.log(musicMovement);
}