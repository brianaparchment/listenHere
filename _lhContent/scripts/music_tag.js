/*========================= MusicTag Class ========================*
  Handle Music Tag Data
/*===========================================================*/

class MusicTag {
  constructor(i = null) {
    this.tagData = null;  // for list view
    this.name = null;     // for edit?
    this.comment = null;  // for edit?
  } // end constructor

  async init (runnable) {
    console.log("init", runnable);
    // https://stackoverflow.com/questions/43431550/async-await-class-constructor

     // For use on server
    let path = "https://pauline.listeninghere.org/backend/api_json.php?menu=";
    this.tagData = await loadJson(path+"music_tag");
    
    console.log(this.tagData);

    // For offline development
    /*this.tagData = [{"music_tag_ID":"1","name":"near","comment":"Sounds near the listener"},{"music_tag_ID":"2","name":"far","comment":"Sounds far from the listener"},{"music_tag_ID":"3","name":"quiet","comment":"Sounds that are especially quiet that might not otherwise be noticed"},{"music_tag_ID":"4","name":"loud","comment":"Sounds that are loud enough to stand out from the soundscape"},{"music_tag_ID":"5","name":"rhythmic","comment":"Sounds repetitive enough to be perceived as rhythmic."},{"music_tag_ID":"8","name":"sustained","comment":"A long sound of constant texture such as a hum, fan, etc."},{"music_tag_ID":"10","name":"a","comment":"aasdf"},{"music_tag_ID":"11","name":"b","comment":"baerfsdsg"},{"music_tag_ID":"12","name":"c","comment":"cadgfsfhd"},{"music_tag_ID":"13","name":"d","comment":"dardhkjgkl"},{"music_tag_ID":"14","name":"e","comment":"e"},{"music_tag_ID":"15","name":"a","comment":"aadad"},{"music_tag_ID":"16","name":"a","comment":"aadad"},{"music_tag_ID":"17","name":"coconut","comment":"coconut cake"},{"music_tag_ID":"18","name":"coconut","comment":"coconut cake"},{"music_tag_ID":"19","name":"coconut","comment":"coconut cake"},{"music_tag_ID":"20","name":"crab cakes","comment":"lobster roll"},{"music_tag_ID":"21","name":"chocolate","comment":"yum"},{"music_tag_ID":"22","name":"chocolate ","comment":"pancakes"},{"music_tag_ID":"23","name":"chocolate ","comment":"pancakes"},{"music_tag_ID":"24","name":"blueberry","comment":"muffins"},{"music_tag_ID":"25","name":"ada","comment":"adwadw"},{"music_tag_ID":"26","name":"ada","comment":"adwadw"},{"music_tag_ID":"27","name":"blueberry","comment":"pancakes"},{"music_tag_ID":"28","name":"rara","comment":"rara"},{"music_tag_ID":"29","name":"rara","comment":"rara"},{"music_tag_ID":"30","name":"1","comment":"2"},{"music_tag_ID":"31","name":"r","comment":"r"},{"music_tag_ID":"32","name":"erre","comment":"ere"},{"music_tag_ID":"33","name":"rwarsda","comment":"rwaeaw"},{"music_tag_ID":"34","name":"rwarsda","comment":"rwaeaw"},{"music_tag_ID":"35","name":"rwarsda","comment":"rwaeaw"},{"music_tag_ID":"36","name":"rwarsda","comment":"rwaeaw"},{"music_tag_ID":"37","name":"awea","comment":"awda"},{"music_tag_ID":"38","name":"dadw","comment":"dawda"},{"music_tag_ID":"39","name":"raradad","comment":"awdaw"},{"music_tag_ID":"40","name":"dadw","comment":"dawda"},{"music_tag_ID":"41","name":null,"comment":"adwad"},{"music_tag_ID":"42","name":"lobster","comment":"mac & cheese"}];*/

    if (runnable === "add") await this.add();
    else if (runnable === "edit") await this.edit();
    else if (runnable === "detail") await this.detail();
    else if (runnable === "list") this.list();
    //else if (runnable === "delete") await this.delete();
    else await this.add();

  } // end init

  add () {
    console.log('adding');
    this.show("add");
  } // end add

  //https://code-boxx.com/call-php-file-from-javascript/
  async delete(id) {
    console.log("delete", id);
    const url = "./delete.php";
    const data = JSON.stringify({"id": id, "table": "music_tag"});
    const options = {
      method: "post",
      body: data
    };

    const response = await fetch(url, options);
    if (response.status == 200) {
      console.log("record deleted.");
      return true;
    } else {
      throw new HttpError(response);
    }
    
  }

  async deleteThenList(id) {
    if (await this.delete(id)) await this.init("list");
  }

  async edit (id) {
    // TODO: eventually we want buffers that hold old data and a cancel button;
    const i = this.findId(id);
    console.log("edit", this.tagData[i]);

    document.getElementById("music_tag_name").value = this.tagData[i].name;
    document.getElementById("music_tag_comment").value = this.tagData[i].comment;

    await this.delete(id);
    this.show("edit");
 
  } // end edit

  list () {
    let html = '<ul>';
    for (let i = 0; i < this.tagData.length; i++) {
      html += '<li data="'+this.tagData[i].music_tag_ID+'">';
      html += '<span class="name" data="'+this.tagData[i].music_tag_ID+'">';
      html += this.tagData[i].name;
      html += '</span><span class="comment" data="'+this.tagData[i].music_tag_ID+'">';
      html += this.tagData[i].comment;
      html += '</span>';
      //html += '<span class="editDelete">';
      html += '<span class="editButton">Edit</span>';
      html += '<span class="deleteButton">Delete</span>';
      //html += '</span>';
      html += '</li>';
    }
    html += "</ul>";
    document.getElementById("music_tag_list").innerHTML = html;

    this.show("list");
  } // end list

  detail(id) {
    let i = this.findId(id);
    console.log("detail", this.tagData[i]);
    document.getElementById("detailName").innerHTML = this.tagData[i].name;
    document.getElementById("detailComment").innerHTML = this.tagData[i].comment;

    this.show("detail");
  } // end detail

  findId(id) {
    let i = 0;
    while (i < this.tagData.length) {
      if (this.tagData[i].music_tag_ID === id) return i;
      i++;
    }
    return i;
  }

  show (item) {
    console.log("show", item);
    document.getElementById("list").style.display = "none";
    document.getElementById("edit").style.display = "none";
    document.getElementById("detail").style.display = "none";

    let title = document.getElementById("tableView");
    if (item === "list"){
      title.innerHTML = "";
    } else if (item === "edit") {
      title.innerHTML = "> Edit";
    } else if (item === "add") {
      title.innerHTML = "> New";
      item = "edit";
    } else if (item === "detail") {
      title.innerHTML = "> Detail";
    } else {
      console.log("mistakes were made:", item);
      item = "list";
    }

    document.getElementById(item).style.display = "block";
  } // end show

  listButtons (event) {
    let e = event; // don't know why this is necessary but without it e.anything becomes undefined after 1 use
    e = e || window.event;
    //console.log(e);
    e = e.target || e.srcElement;
    //console.log(this.movementData);
    //console.log("buttons", e);
    //console.log(e);
    if (e.className === "editButton") {
      let i = e.parentNode.getAttribute("data");
      this.edit(i);
    } else if ( e.className === "deleteButton") {
      let i = e.parentNode.getAttribute("data");
      this.deleteThenList(i);
    } else {
      let i = e.getAttribute("data");
      console.log(i, this);
      this.detail(i);
    }
  } // end listButtons

} // end musicMovement
/*
const music_tag_add = async function() {
  let musicTag = new MusicTag(); 
  await musicTag.init('add');
  //return {musicTag: musicTag};
}

const music_tag_edit = async function() {
  let musicTag = new MusicTag();
  await musicTag.init('edit');
}

const music_tag_list = async function() {
  let musicTag = new MusicTag();
  await musicTag.init('list');
}
*/
const music_tag = (async function() { // must be async to use await inside. Otherwise get "unexpected identifier"
  "use strict";   // This causes interpreter to complain about hinky things (that are handled gracefully by some browsers) for better debugging

  let musicTag = new MusicTag();
  await musicTag.init('list');

  document.getElementById("music_tag_list").addEventListener("click", musicTag.listButtons.bind(musicTag));
  document.getElementById("music_tag_add").addEventListener("click", musicTag.add.bind(musicTag));

})();