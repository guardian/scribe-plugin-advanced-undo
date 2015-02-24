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
    givenContentOf('|', ()=>{
      when('we press undo', function(){
        it.only('should delete one character', function(){

          scribeNode.sendKeys('This is some')
            .then(()=> driver.sleep(500))
            .then(()=> scribeNode.getInnerHTML())
            .then((html)=> {
              console.log('-----------------------');
              console.log(html);
              console.log('-----------------------');
            })

        });
      });
    });
  });



});
