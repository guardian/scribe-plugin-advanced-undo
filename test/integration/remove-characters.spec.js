var chai = require('chai');
var webdriver = require('selenium-webdriver');
var helpers = require('scribe-test-harness/helpers');

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
            .then(()=>scribeNode.sendKeys(webdriver.Key.chord(webdriver.Key.META, 'z')))
            .then(()=> scribeNode.getInnerHTML())
            .then((html)=>{
              expect(html).to.include('conte</p>')
            });
        });
      });
    });
  });
});
