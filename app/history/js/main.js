/**
 * 
 * @authors Gooofly (wangfei@ctrip.com)
 * @date    2015-01-22 10:17:17
 * @version $Id$
 */

function init () {
  // attach the click button handler
  var btnNextExhibit = document.getElementById('btnNextExhibit');
  btnNextExhibit.addEventListener('click', nextExhibit, false);
}

function nextExhibit () {
  // check to see if the history pushState API is available
  
  if ( Modernizr.history ) {
    // Execute the pushState method
    
    history.pushState('Meerkat', 'Meerkat Exhibit', 'meerkats.html');

    document.getElementById('exhibit').innerHTML = 'At the Meerkats.';
  }
  else {
    document.getElementById('exhibit').innerHTML = 
        'The History API is not available in the browser.';
  }
}

window.addEventListener('load', init, false);
