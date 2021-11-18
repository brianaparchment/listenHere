const loadJson = async function(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

//https://stackoverflow.com/questions/15356936/object-oriented-javascript-event-handling
function withScopeRunFunction(scope, fn) {
  return function() {
     return fn.apply(scope, arguments);
  }
}

function selectItem(id, index) {
  document.getElementById(id).options[index].selected = true;
}

/*========================= TableMulti Class ========================*
  A generic parent class for tables in the content class
/*===========================================================*/

class TableMutli extends Table {
  constructor(tableName, labels) {
    this.dataList = null;  
    this.tableName = tableName;
    this.labels = labels;
  } // end constructor

  async init (runnable) {
    // https://stackoverflow.com/questions/43431550/async-await-class-constructor

    let path = "https://pauline.listeninghere.org/backend/api_json.php?menu=";
    this.dataList = await loadJson(path+this.tableName);

    if (runnable === "add") await this.add();
    else if (runnable === "edit") await this.edit();
    else if (runnable === "detail") await this.detail();
    else if (runnable === "list") this.list();
    else await this.list();

  } // end init

  add () {
    //console.log('adding');
    this.show("add");
  } // end add

  async delete(id) {
    console.log("delete", this.tableName, id);
    //https://code-boxx.com/call-php-file-from-javascript/
    const url = "./delete.php";
    const data = JSON.stringify({"id": id, "table": this.tableName});
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

  editFill(item) {
    for (let i = 0; i < this.dataList.length; i++) {
      document.getElementById(this.tableName+"_"+this.labels[i]).value = this.dataList[item][this.labels[i]];
    }
  }

  async edit (id) {
    // TODO: eventually we want buffers that hold old data and a cancel button;
    const item = this.findId(id);
    //console.log("edit", this.dataList[j]);

    this.editFill(item);

    await this.delete(id);
    this.show("edit");
 
  } // end edit

  listToHtml() {
    const id = this.tableName+"_ID";
    let html = '<ul>';
    for (let i = 0; i < this.dataList.length; i++) {
      html += '<li data="'+this.dataList[i][id]+'">';
      for (let j = 0; j < this.labels.length; j++) {
        html += '<div class="'+this.labels[k]+'" data="'+this.dataList[i][id]+'">';
        html += this.dataList[i][this.labels[j]];
        html += "</div>"
      }
      html += '<div class="editButton">Edit</div>';
      html += '<div class="deleteButton">Delete</div>';
      html += '</li>';
    }
    html += "</ul>";
    return html;
  }

  list () {
    console.log("list", this.tableName+"_list");
    document.getElementById(this.tableName+"_list").innerHTML = this.listToHtml();

    this.show("list");
  } // end list

  detailFill(item) {
    for (let i = 0; i < this.labels.length; i++) 
      //console.log(item, this.dataList, this.dataList[item], this.labels[i]);
      document.getElementById("detail_"+this.labels[i]).innerHTML = this.dataList[item][this.labels[i]];
  }

  detail(id) {
    let item = this.findId(id);
    //console.log("detail", this.dataList[item]);

    this.detailFill(item);

    this.show("detail");
  } // end detail

  findId(id) {
    let i = 0;
    while (i < this.dataList.length) {
      if (this.dataList[i][this.tableName+"_ID"] === id) return i;
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
      console.log("edit");
      let i = e.parentNode.getAttribute("data");
      this.edit(i);
    } else if ( e.className === "deleteButton") {
      console.log("delete");
      let i = e.parentNode.getAttribute("data");
      this.deleteThenList(i);
    } else {
      console.log("detail");
      let i = e.getAttribute("data");
      console.log(i, this);
      this.detail(i);
    }
  } // end listButtons

} // end musicMovement
