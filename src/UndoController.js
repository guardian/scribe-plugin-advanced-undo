var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var virtualize = require('vdom-virtualize');

module.exports = class UndoController {

  constructor(scribe, attrs){
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

  onKeyPressed(e){
    if(e.metaKey && e.keyCode === 90){
      console.log('undo action');
      e.preventDefault();
      var diff = this.diffs.pop();
      patch(this.scribe.el, diff);
      //increment
      this.count += 1;
    }
  }

  onContentChanged(){
    console.log('-----------------------');
    console.log(this);
    console.log('-----------------------');
    this._placeMarkers(()=>{
      var newContent = virtualize(this.scribe.el);
      var revertDiff = diff(newContent, this.lastContent);
      this.diffs.push(revertDiff);
      this.lastContent = newContent;
    });
  }

  //thin private wrapper for placing and removing markers before/after an action
  _placeMarkers(fn){
    var s = new this.scribe.api.Selection();
    s.placeMarkerds();
    fn();
    s.removeMarkers();
  }

};
