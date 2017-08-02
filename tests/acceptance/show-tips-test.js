import Ember from 'ember';
import {
  module, test
}
  from 'qunit';
import startApp from '../../tests/helpers/start-app';
import config from 'dummy/config/environment';

var application;

module('Acceptance | show tips', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('tips are being shown and hidden', function(assert) {
  visit('/');
  andThen(function() {
    mouseoverButton(0);
  });

  function mouseoverButton(i) {
    let selector = `#button-${i}`;
    if (i < config.buttons) {
      triggerEvent(`#button-${i}`, 'mouseover');

      Ember.Test.promise(function (resolve) {
        window.setTimeout(resolve, 500);
      });
      andThen(function() {
        let $el = find(selector),
          tooltipId = $el.attr('aria-describedby'),
          tooltipSelector = `#${tooltipId}`;
        assert.equal($(tooltipSelector).length, 1);

        triggerEvent(`#button-${i}`, 'mouseout');
        Ember.Test.promise(function (resolve) {
          window.setTimeout(resolve, 500);
        });
        andThen(function() {
          // Did we removed it
          assert.equal($(tooltipSelector).length, 0);

          mouseoverButton(i+1);
        });
      });
    }
  }

});
