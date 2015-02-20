var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var virtualize = require('vdom-virtualize');
//Todo --> write our own throttle function as there is no need to import all of this
//jp 20/2/15
var _ = require('lodash');


function UndoController(){
  //remove the default undo command as we will be replacing it
  scribe.commands.undo.execute = function(){};
  //keep a reference to this scribe instance as there can be multiple instances on the page
  this.scribe = scribe;
  //add an object to keep a list of our patches in reverse order
  this.diffs = [];
  //add a count to the number of undo commands
  this.count = 0;
  //set the last content so we have a point of comparison
  this.lastContent = virtualize(this.scribe.el);
  //add listeners
  this.scribe.el.addEventListener('input', (e)=> this.onContentChanged(e));
  this.scribe.el.addEventListener('keydown', (e)=> this.onKeyPressed(e));

}

UndoController.prototype = {
  //undo / redo action
  onKeyPressed: function(e){
    if(e.metaKey && e.keyCode === 90){
      e.preventDefault();
      //write the previous content into scribe's element
      var diff = this.diffs.pop();
      patch(this.scribe.el, diff);

      //place the caret
      var selection = window.getSelection();
      var markers = this.scribe.el.querySelectorAll('em.scribe-marker');
      var range = document.createRange();
      range.collapse(false);
      selection.removeAllRanges();

      //if there is no selection
      if(markers.length === 0){
        return
      }
      //if we have a selection
      else if(markers.length === 2){
        //TODO -> selections
      }
      //if there is only the caret
      else{
        range.selectNode(markers[0]);
        selection.addRange(range);
      }
      //increment the internal count
      this.count += 1;
    }
  },

  onContentChanged: _.throttle(function(){
    this._placeMarkers();
    var newContent = virtualize(this.scribe.el);
    var revertDiff = diff(newContent, this.lastContent);
    this.diffs.push(revertDiff);
    this.lastContent = newContent;
    this.count = 1;
  }, 500),

  //private util for placing markers
  _placeMarkers: function(){
    var s = new this.scribe.api.Selection();
    s.placeMarkers();
  }

};


//export our class
module.exports = UndoController;
