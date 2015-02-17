module.exports = class UndoController {

  constructor(scribe, attrs){
    this.scribe = scribe;
    this.scribe.on('content-changed', (e)=>this.onContentChanged(e))
  }

  onContentChanged(e){
    console.log('-----------------------');
    console.log(e, this.scribe.el.innerHTML);
    console.log('-----------------------');
  }
}
