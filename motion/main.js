// Detect Swap by Light Sensor
// inspired from : https://github.com/functino/reveal.js-wave-plugin
// and : http://www.adobe.com/devnet/archive/html5/articles/javascript-motion-detection.html

(function(){

	window.addEventListener('DOMContentLoaded', function() {
		// Assign the <video> element to a variable
		var video = document.getElementById('sourcevid') || document.createElement('video');
		video.setAttribute('autoplay', '');

		// Replace the source of the video element with the stream from the camera
		if (navigator.webkitGetUserMedia) {
			navigator.webkitGetUserMedia({video:true}, successCallback, errorCallback);
			// Below is the latest syntax. Using the old syntax for the time being for backwards compatibility.
			// navigator.getUserMedia({video: true}, successCallback, errorCallback);
			function successCallback(stream) {
				video.src = window.URL.createObjectURL(stream);
				video.addEventListener("canplay", initVideoCanvas);
			}
			function errorCallback(error) {
				console.error('An error occurred: [CODE ' + error.code + ']');
				return;
			}
		} else {
			console.log('Native web camera streaming (getUserMedia) is not supported in this browser.');
			return;
		}
	}, false);

	function initVideoCanvas(){
		var videoElement = this;

		var horizontalResolution = videoElement.videoWidth;
		var verticalResolution = videoElement.videoHeight;

		if (horizontalResolution < 1 || horizontalResolution > 4000) {
			alert("Webcam error.  Try reloading the page.");
		}

		var canvasWidth = horizontalResolution > 320 ? 320 : horizontalResolution;
		var canvasHeight = verticalResolution > 240 ? 240 : verticalResolution;

		// Create the canvas that we will draw to
		var greyScaleCnvs = document.createElement("canvas");
		document.body.appendChild(greyScaleCnvs);
		greyScaleCnvs.width = canvasWidth;
		greyScaleCnvs.height = canvasHeight;
		var greyscaleCtx = greyScaleCnvs.getContext("2d");
		var currentImageData = greyscaleCtx.createImageData(canvasWidth, canvasHeight);

		// Initialize some variables we will reference each frame
		var isActive = false;
		var remainingFrames = 14;
		var PIXEL_CHANGE_THRESHOLD = 30;
		var FRAME_THRESHOLD = 15000;
		var originalWeight = 0;
		var whiteArea;
		var moveTo = null;
		var moveOk = false;
		var fromX = 0;
		var rangeX = 0;

		// every ?th of a second, sample the video stream
		window.webcamSwiperInterval = setInterval(analyzeCurrentFrame, 1000/28);

		function analyzeCurrentFrame(){

			// Draw the current video frame onto a canvas so we can desaturate the image
			greyscaleCtx.drawImage(videoElement, 0, 0, horizontalResolution, verticalResolution, 0, 0, canvasWidth, canvasHeight);
			currentImageData = greyscaleCtx.getImageData(0, 0, canvasWidth, canvasHeight);

			var detectWhite = function(pixels, threshold) {
			  var d = pixels.data;
			  var x1 = 0,y1 = 0,x2 = 0,y2 = 0;
			  for (var i=0; i<d.length; i+=4) {
			    var r = d[i];
			    var g = d[i+1];
			    var b = d[i+2];
			    var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
			    d[i] = d[i+1] = d[i+2] = v

			    if(v==255){
			    	x1 = x1 || (i / 4) % canvasWidth;
			    	x2 = (i / 4) % canvasWidth;
			    	y1 = y1 || Math.floor((i / 4) / canvasWidth);
			    	y2 = Math.floor((i / 4) / canvasWidth);
			    }
			  }
			  return [ [x1,y1], [x2,y2] ];
			};

			whiteArea = detectWhite(currentImageData, 254);
			greyscaleCtx.putImageData(currentImageData, 0, 0);

			checkMove();

			// Debugging Purpose
			document.getElementById('whitearea').innerHTML = whiteArea.toString();
			document.getElementById('whitearea').innerHTML += " to "+moveTo+ " is "+moveOk;

		}

		function checkMove(){
			var x = whiteArea[0][0];
			if(x==0){
				fromX = 0;
				rangeX = 0;
				moveTo = null;
				moveOk = false;
			}else{
				// initialize start of x
				fromX = fromX || x;
				rangeX = x - fromX;
			}
			if( !moveOk ){
				if( Math.abs(rangeX) > 60 ){
					if(rangeX > 0){
						moveTo = 'right';
					}else{
						moveTo = 'left';
					}
					doMovement(moveTo);
					moveOk = true;
				}
			}
		}

		function doMovement(moveTo){
			// Do movement action here!
		}
	}



})();
