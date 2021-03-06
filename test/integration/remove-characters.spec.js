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

  given('We have no content', ()=>{
    givenContentOf('|', ()=>{
      when('we press undo', function(){
        it('should delete a section of content', function(){

          scribeNode.sendKeys('This is some')
            .then(()=> driver.sleep(500))
            .then(()=> scribeNode.sendKeys(' content'))
            .then(()=> undo())
            .then(()=> scribeNode.getInnerHTML())
            .then((html)=> {
              expect(html).to.include('som</p>');
           })

        });
      });
    });
  });

  given('We have no content', ()=>{
    givenContentOf('|', ()=>{
      when('we press undo multiple times', function(){
        it('should delete all of the content', function(){

          scribeNode.sendKeys('This is some')
            .then(()=> driver.sleep(500))
            .then(()=> scribeNode.sendKeys(' content'))
            .then(()=> undo())
            .then(()=> undo())
            .then(()=> scribeNode.getInnerHTML())
            .then((html)=> {
              expect(html).to.include('<p><br></p>');
           })

        });
      });
    });
  });

});
