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


// popstate event handler functions
function popPage3 ( event ) {
  var 
    strState = 'PIP - location: '+ document.location + ' , state: '+
        JSON.stringify( event. state );

  document.getElementById('stateInfo3').innerHTML += strState + '<br>';
}

function loadPage3 () {
  logAction3( 'pushing page 1' );
  history.pushState({page: 1}, 'page 1', '?page=1');

  logAction3( 'pushing page 2' );
  history.pushState({page: 2}, 'page 2', '?page=2');

  logAction3( 'pushing page 3' );
  history.replaceState({page: 3}, 'page 3', '?page=3');

  logAction3( 'taking one step back' );
  history.back();

  logAction3( 'taking one step back again' );
  history.back();

  logAction3( 'taking two steps forward' );
  history.go(2);
}

function logAction3 ( strAction ) {
  document.getElementById( 'stateInfo3' ).innerHTML += strAction + '<br>';
}

window.addEventListener( 'popstate', popPage3, false);
window.addEventListener( 'load', loadPage3, false);


// set first and last slide numbers
var
  minSlide = 0,
  maxSlide = 4;

// initialize fields used
var
  currentSlide = 0,
  currentTitle = 'My Slide 1',
  borderOn = 0, // 0 is off, 1 is on
  slideNote = '';

// initialize our first slide state by replacing current state
var
  stateObj = {
    slide: currentSlide,
    border: borderOn,
    note: slideNote
  };

history.replaceState( stateObj, currentTitle, '?slide='+ currentSlide );

// history pop state handler
window.addEventListener( 'popstate', function ( event ) {

  // show the location URL and string display of the event.state
  document.getElementById('stateInfo4').innerHTML = 'locaiton: '+
      document.location + '<br>state: '+ JSON.stringify( event.state );

  // retrieve state object date
  currentSlide = event.state.slide;
  borderOn = event.state.border;
  slideNote = event.state.note;

  // show the current slide
  showSlide();
}, false );

// navigate to the next slide
function nextSlide () {

  // check if the History API is available
  if ( Modernizr.history ) {

    // validate that we are not at the end of the presentation
    if ( currentSlide < maxSlide ) {

      // retrieve any notes that have been entered
      slideNote = document.getElementById('txtNote').value;
      borderOn = document.getElementById('chkBorder').checked;

      // set the state object with the current options
      var currentStateObj = {
        slide: currentSlide,
        border: borderOn,
        note: slideNote
      };
      // replace the current slide properties in the current history entry
      history.replaceState( currentStateObj, 'Slide FEI_'+ imgArr[ currentSlide ] +' '+ slideNote, 
          '?img=FEI_'+ imgArr[ currentSlide ] );

      // increment the current slide index
      currentSlide++;
      // set global variables to next slide and reset to defaults
      borderOn = 0;
      slideNote = '';
      document.getElementById('stateInfo4').innerHTML = '';

      // set next slide in history entries with state object and defaults
      var nextStateObj = {
        slide: currentSlide,
        border: borderOn,
        note: slideNote
      };
      history.pushState( nextStateObj, 'slide FEI_'+ imgArr[ currentSlide ], '?img=FEI_'+ imgArr[ currentSlide ] );

      // show the now current slide
      showSlide();
    }
  }
}

// navigate to previous slide
function prevSlide () {

  // validate that we are not at the beginning already
  if ( currentSlide > minSlide ) {

    // move back one step in history
    history.back();
  }
}

// show the current slide, title, and options
function showSlide () {

  // set the current slide and title
  document.getElementById('imgSlide4').src = 'http://gooofly.qiniudn.com/FEI_'+ imgArr[ currentSlide ] + '.JPG';
  document.getElementById('slideInfo').innerHTML = 'Slide FEI_'+ imgArr[ currentSlide ];

  // set the current page title
  document.title = 'Slide FEI_'+ imgArr[ currentSlide ];

  // set the current slide options
  document.getElementById('imgSlide4').style.border = borderOn ? '5px solid #f60' : '';
  document.getElementById('chkBorder').checked = borderOn;
  document.getElementById('txtNote').value = slideNote;
}

// handle the change of the image border option
function setImgBorder () {

  // set border based on checkbox and global property
  borderOn = document.getElementById('chkBorder').checked;
  document.getElementById('imgSlide4').style.border =
      borderOn ? '5px solid #f60' : '';
}









