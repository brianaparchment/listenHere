/*========================= Music Work Class ========================*
  Handles Music Works (titles, durations, not the movement itself)
/*===========================================================*/

class MusicWork extends Table {
  constructor () {
    super("music_work", 
    ["name", "isDuration1", "isDuration3", "isDuration5", "isDuration10", 
    "isDuration15", "isDuration20", 
    "isPrintShort", "isPrintMedium", "isPrintLong", "comment"]);
  } // end constructor

  getDurations(i) {
    let html = "";

    if (this.dataList[i].isDuration1 === "1") html += "1,";
    if (this.dataList[i].isDuration3 === "1") html += "3,";
    if (this.dataList[i].isDuration5 === "1") html += "5,";
    if (this.dataList[i].isDuration10 === "1") html += "10,";
    if (this.dataList[i].isDuration15 === "1") html += "15,";
    if (this.dataList[i].isDuration20 === "1") html += "20,";

    if (html.length > 0) html = html.substring(0, html.length - 1);
    else if (html.length === 0) html = " ";

    return html;
  }

  getPrintDurations(i) {
    let html = "";

    if (this.dataList[i].isPrintShort === "1") html += "S";
    if (this.dataList[i].isPrintMedium === "1") html += "M";
    if (this.dataList[i].isPrintLong === "1") html += "L";

    /*if (html.length > 1) html = html.substring(0, html.length - 2);
    else if (html.length === 0) html = " ";*/

    return html;
  }

  listToHtml() {
    const id = this.tableName+"_ID";
    let html = '<ul>';
    for (let i = 0; i < this.dataList.length; i++) {
      html += '<li data="'+this.dataList[i][id]+'">';

      html += '<div class="name" data="'+this.dataList[i][id]+'">';
      html += this.dataList[i].name;
      html += "</div>";

      html += '<div class="shortInfo, duration" data="'+this.dataList[i][id]+'">';
      html += this.getDurations(i);
      html += "</div>";

      html += '<div class="shortInfo, print" data="'+this.dataList[i][id]+'">';
      html += this.getPrintDurations(i);
      html += "</div>";

      html += '<div class="comment" data="'+this.dataList[i][id]+'">';
      html += this.dataList[i].comment;
      html += "</div>";

      html += '<div class="editButton">Edit</div>';
      html += '<div class="deleteButton">Delete</div>';
      html += '</li>';
    }
    html += "</ul>";
    return html;
  }

  editFill(item) {
    for (let i = 0; i < this.dataList.length; i++) {
      if ((this.labels[i] === "name") || (this.labels[i] === "comment")) {
        document.getElementById(this.tableName+"_"+this.labels[i]).value = this.dataList[item][this.labels[i]];
      } else {
        document.getElementById(this.tableName+"_"+this.labels[i]).checked = (this.dataList[item][this.labels[i]] === "1");
      }
    }
  }

  detailFill(item) {
    document.getElementById("detail_name").innerHTML = this.dataList[item].name;
    document.getElementById("detail_comment").innerHTML = this.dataList[item].comment;

    for (let i = 0; i < this.labels.length; i++) {
      if ((this.labels[i] != "name") && (this.labels[i] != "comment")) {
        document.getElementById("detail_"+this.labels[i]).checked = (this.dataList[item][this.labels[i]] === "1");
      }
    }

  }
}// end MusicWork

const music_work = (async function() { // must be async to use await inside. Otherwise get "unexpected identifier"
  "use strict";   // This causes interpreter to complain about hinky things (that are handled gracefully by some browsers) for better debugging

  let musicWork = new MusicWork();
  await musicWork.init('list');

  document.getElementById("music_work_list").addEventListener("click", musicWork.listButtons.bind(musicWork));
  document.getElementById("music_work_add").addEventListener("click", musicWork.add.bind(musicWork));

})();