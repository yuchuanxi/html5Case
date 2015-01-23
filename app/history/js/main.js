/**
 * 
 * @authors Gooofly (wangfei.f2e@gmail.com)
 * @date    2015-01-22 10:17:17
 * @version $Id$
 */

// function init () {
//   // attach the click button handler
//   var btnNextExhibit = document.getElementById('btnNextExhibit');
//   btnNextExhibit.addEventListener('click', nextExhibit, false);
// }

// function nextExhibit () {
//   // check to see if the history pushState API is available
  
//   if ( Modernizr.history ) {
//     // Execute the pushState method
    
//     history.pushState('Meerkat', 'Meerkat Exhibit', 'meerkats.html');

//     document.getElementById('exhibit').innerHTML = 'At the Meerkats.';
//   }
//   else {
//     document.getElementById('exhibit').innerHTML = 
//         'The History API is not available in the browser.';
//   }
// }

// window.addEventListener('load', init, false);

// set up the popstate page handler
window.addEventListener('popstate', popPage, false);

// variable to keep track of the crrrent image
var currentImg = 'FEI_2298';

// history pop state event handler function
function popPage ( event ) {

  // get  the state from the history
  currentImg = event.state;

  // set the image and title
  var imgTitle = 'Image '+ currentImg;
  document.getElementById('imgSlide').src = 'http://gooofly.qiniudn.com/'+ currentImg + '.JPG';
  document.getElementById('imageInfo').innerHTML = imgTitle;
  document.title = imgTitle;

  // show we poped a history event and the poped state
  var stateInfo = document.getElementById('stateInfo');
  stateInfo.innerHTML = 'History poped : '+ imgTitle + ' : state: '+
      JSON.stringify(event.state) + '<br>'+ stateInfo.innerHTML;
}

// navigate to the next slide
function showImage ( imgName ) {

  // check if the History API is avalable
  if ( Modernizr.history ) {

    // verify the image selected is not the current one
    if ( currentImg !== (imgName = 'FEI_'+ imgName) ) {

      // set the image title
      var imgTitle = 'Image '+ imgName;

      // set next slide in history entries with state object and defaults
      history.pushState( imgName, imgTitle, '?img='+ imgName );
      document.getElementById('imgSlide').src = 'http://gooofly.qiniudn.com/'+ imgName + '.JPG';
      document.getElementById('imageInfo').innerHTML = imgTitle;

      // set the current page title
      document.title = 'Image '+ imgName;
      var stateInfo = document.getElementById('stateInfo');
      stateInfo.innerHTML = imgTitle +'.JPG<br>'+ stateInfo.innerHTML;

      // set the current image to the image selected
      currentImg = imgName;
    }
  }
  else {
    // History API is not available

  }
}

// create row of img links
var
  newImg,
  imgArr = [2298, 2260, 2252, 2246, 2230],
  // imgArr = [2298, 2294, 2291, 2287, 2284, 2278, 2268, 2264, 2264, 2260, 2252, 2246, 2230],
  imgRow = document.getElementById('imgRow');

for ( var i=1; i<5; i++ ) {
  // document.getElementById('imgRow').add
  newImg = '<a onclick="showImage('+ imgArr[i] +');"><img class="thumbnail" src="http://gooofly.qiniudn.com/FEI_'+ imgArr[i] +'.JPG"></a>';
  imgRow.innerHTML += newImg;
}

// counter to keep track of page state
var idxCounter = 1;

// initialize the button handler
function init () {

  // attach the click button handler
  var btnNextState = document.getElementById('btnNextState');
  btnNextState.addEventListener('click', nextState, false);
} 

// our replaceState wrapper function
function nextState () {

  // replace the current page with the next on 
  history.replaceState({page: idxCounter}, 'page '+ idxCounter, '?page='+ idxCounter);

  // update our page state div
  var strStateInfo = document.getElementById('stateInfo2').innerHTML;
  document.getElementById('stateInfo2').innerHTML = strStateInfo + '<br>Replaced state '+ idxCounter;

  // increment our counter
  idxCounter++;
}

// Add the listener to initialize the page
window.addEventListener('load', init, false);

