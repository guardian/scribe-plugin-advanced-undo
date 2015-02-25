const REVERT_INTERVAL = 500;

var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var virtualize = require('vdom-virtualize');
var uuid = require('uuid');

module.exports = class UndoController {

  constructor(scribe, attrs){
    //remove the default undo command as we will be replacing it
    scribe.commands.undo.execute = function(){};
    //keep a reference to this scribe instance as there can be multiple instances on the page
    this.scribe = scribe;
    //add an object to keep a list of our patch data
    this.history = [];
    //list for tracking re-do's
    this.replayList = [];
    //last edited time
    this.timeStamp = this._getTime();
    //set the last content so we have a point of comparison
    this.lastContent = virtualize(this.scribe.el);
    //add listeners
    this.scribe.el.addEventListener('input', (e)=> this.onContentChanged(e));
    this.scribe.el.addEventListener('keydown', (e)=> this.onKeyPressed(e));
  }

  onKeyPressed(e){
    if((e.ctrlKey ||  e.metaKey) && e.keyCode === 90){
      e.preventDefault();

      this.history.some((historyItem, index)=>{
        var interval = this.timeStamp - historyItem.timeStamp;
        if (interval >= REVERT_INTERVAL || index >= (this.history.length -1))  {
          this.revert(historyItem.revertDiff);
          this.replayList.concat(this.history.splice(0, index));
          this.timeStamp = historyItem.timeStamp;
          return true;
        }
      });
    }
  }

  revert(diff){
    //write the previous content into scribe's element
    patch(this.scribe.el, diff);
    this._placeCaret();
  }

  onContentChanged(){
    this._placeMarkers();

    var newContent = virtualize(this.scribe.el);
    var revertDiff = diff(newContent, this.lastContent);
    var deltaDiff = diff(this.lastContent, newContent);

    this.history.unshift({
      timeStamp: this._getTime(),
      revertDiff: revertDiff,
      deltaDiff: deltaDiff
    });

    this.lastContent = newContent;
    this.replayList = [];
    this.timeStamp = this._getTime();
    this._removeMarkers();
  }

  //thin private wrapper for placing the caret;
  _placeCaret(){
    //place the caret
    var selection = new this.scribe.api.Selection().selection;
    var markers = this.scribe.el.querySelectorAll('em.scribe-marker');
    var range = document.createRange();

    range.collapse(false);
    selection.removeAllRanges();

    //if there is no selection
    if (markers.length === 0) {
      return;
    }
    //if we have a selection
    else if (markers.length === 2) {
      //TODO -> selections
    }
    //if there is only the caret
    else {
      range.selectNode(markers[0]);
      selection.addRange(range);
    }
  }

  _placeMarkers(){
    var s = new this.scribe.api.Selection();
    s.placeMarkers();
  }

  _removeMarkers(){
    var s = new this.scribe.api.Selection();
    s.removeMarkers();
  }

  _getTime(){
    return new Date().getTime();
  }

};
