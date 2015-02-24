var chai = require('chai');
var webdriver = require('selenium-webdriver');
var helpers = require('scribe-test-harness/helpers');
var undo = require('./helpers/undo');
var expect = chai.expect;

var when = helpers.when;
var given = helpers.given;
var givenContentOf = helpers.givenContentOf;

var scribeNode;
var driver;
beforeEach(function() {
  scribeNode = helpers.scribeNode;
  driver = helpers.driver;
});

describe('Removing Characters', ()=>{

  given('We have some content', ()=>{
    givenContentOf('This is some |', ()=>{
      when('we press undo', function(){
        it('should delete one character', function(){
          scribeNode.sendKeys(' content')
          .then(()=> undo())
          .then(()=> driver.executeScript(()=> {
            new scribe.api.Selection().placeMarkers();
          }))
          .then(()=> scribeNode.getInnerHTML())
          .then((html)=>{
            //check we have deleted content and placed the caret in the correct place
            expect(html).to.include('conten<em class="scribe-marker"></em></p>');
          });
        });
      });
    });
  });


  //We revert by a given time interval
  //If the first few characters are placed before that interval they can never be removed
  describe('Removing the first few characters', function(){
    givenContentOf('', ()=>{
      when('we add a small amount of content', function(){
        it.only('should remove all content', function(){

          scribeNode.sendKeys('test')
          .then(()=> driver.sleep(500))
          .then(()=> scribeNode.sendKeys(' content'))
          .then(()=> undo())
          .then(()=> undo())
          .then(()=> driver.sleep(60000))
          .then(()=> scribeNode.getInnerHTML())
          .then((html)=>{
            expect(html).to.equal('<p><br/></p>');
          })

        });
      });
    });
  });


});
