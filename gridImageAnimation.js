;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'gridImageAnimation',
        defaults = {
        	mode : null,
            cell : 15 ,
            speed : 70, // millis
            durationFading : 200, // millis
            previewBox : null,
            complete : null
        };

    // The actual plugin constructor
    function Plugin( element, options ) {

        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;

        // some useful vars
        this._animFinished = 0;

        switch( this.options.mode ){

        	case 'fadeIn': 
        		this._fadeIn();
        		
        	break;
        	case 'fadeOut':
        		this._fadeOut();
        	break;

        	default:
        		
        		if (this.element.css('opacity') == 0){ 
        			this._fadeIn();
        		}
        		else{
        			this._fadeOut();
        		}
        }

        this._create();

        return this;

    }

    Plugin.prototype = {
        
    	// some fx here

        _create : function () {
        	
        	// With a random id there's no problem when instantiating more than one object
			this.options.random = Math.floor(Math.random() * 1000); 
			console.log(this.options.random);
			// set some vars
			var image       = this.element;
			var imageWidth  = image.width();
			var imageNaturalWidth = this._naturalWidth();
			var imageHeight = image.height();
			var imageArea   = imageWidth * imageHeight;
			var rectArea = imageArea * ( this.options.rArea / 100 );
			var rectWidth   = imageWidth / this.options.cell;
			var rectHeight  = ( rectWidth * imageHeight )/ imageWidth;
			var currentTop  = 0;
			var currentLeft = 0;
			var grid       = $('<div class="grid-image"></div>');
			var rect        = $('<span class="rect id'+this.options.random+'"></div>');
			this.options.speed = 100 - this.options.speed;


			rectTot =  Math.round(imageArea / ( rectWidth * rectHeight ));
			this.options.rTot = rectTot;
			
			grid.prop('id',image.prop('id'));
			grid.addClass(image.prop('class'));

			grid.insertAfter(image);



			// create grid
			

			for (x = 0; x < rectTot; x++ ){

				var singleRect = rect.clone();

				// set id 
				singleRect.attr( 'id' , 'r' +this.options.random+ x );
				
				singleRect.css({ 	'top' : currentTop,
									'left' : currentLeft,
									'opacity' : this.options.opacityFrom,
									'background-size' : imageWidth + 'px',
									'background-position' : '-'+currentLeft+'px -' + currentTop + 'px'
							   });



				grid.append( singleRect );

				// refresh vars
				if( Math.round(currentTop + rectHeight + rectHeight )> imageHeight ){ 
					currentTop = 0;
					currentLeft += rectWidth;

				}else{
					currentTop += rectHeight;
				}

			}

			grid.css({'position' : 'relative',
					  'width': imageWidth,
					  'height' : imageHeight,
					  'overflow' : 'hidden',
					  'display' : 'block',
					  'opacity' : '1'
					});



			// set css to rect element
			$('.rect.id'+this.options.random+'').css({ 'position'   : 'absolute',
							 'display'    : 'block',
			                 'width'      :  rectWidth  + 1 +'px',
			                 'height'     :  rectHeight + 1 + 'px',
			                 'margin'     : '0',
			                 'padding'    : '0',
			                 'background-image' :  'url('+image.attr('src')+')' });

			
			// __logHide is complete
			// now I can remove the old image
			image.remove();

			
			// animate preview
			this._animate();

			

        },

        _animate: function(  ) {


        	var rCurrent;
        	var countFinished = 0;
        	var delay = this.options.speed;

        	console.log( this.element );

        	// create array from 0 to the number of rects
			var rectArray = [];

			for (var i = 0; i <= this.options.rTot-1 ; i++) {
			   rectArray.push(i);
			}

			console.log(this.options.rTot);

			// shuffle array
			rectArray = this._shuffleArray(rectArray);
        	
        	// start the loop
        	for (x = 0; x < rectArray.length; x++){

        		// code here...
        		rCurrent = rectArray[x];
        		$('#r'+this.options.random+rCurrent).delay( delay ).animate( {  opacity  : this.options.opacityTo } , { 
        		                                            duration : this.options.durationFading,
        		                                            complete : $.proxy(function(){
        		                                            	
        		                                            	this._complete_f(++countFinished,rectArray);

        		                                            },this)
        		                                         });
        		delay += this.options.speed;


        	}



        },
        _complete_f : function(countFinished,array) {
        		
        		if (countFinished == array.length){
	        		if ( $.isFunction( this.options.complete ) ) {
	     				this.options.complete.call( this );
	   				}
   				}

        },
        _fadeIn : function(){
        	this.options.opacityFrom = 0;
        	this.options.opacityTo = 1;
        },
        _fadeOut : function(){
        	this.options.opacityFrom = 1;
        	this.options.opacityTo = 0;
        },

        _shuffleArray : function(array) {
        	
			var m = array.length, t, i;

			// While there remain elements to shuffle…
			while (m) {

			    // Pick a remaining element…
			    i = Math.floor(Math.random() * m--);

			    // And swap it with the current element.
			    t = array[m];
			    array[m] = array[i];
			    array[i] = t;
			}

			return array;
			
	        },

	    _naturalWidth: function(){

	    	var img = this.element;
	    	var clone = img.clone();
	    	$('body').append(clone);
	    	

    		clone.removeAttr("width")
    		   .removeAttr("max-width")
    		   .removeAttr("min-width")
    		   .css({"width":"","max-width":"","min-width":"" });
    		
    		currentImageWidth = clone.width();
    		clone.remove();
    		
    		return currentImageWidth;
	    },
	    _log : function(txt){
	    	$('.log').append(txt + '<br />');
	    }


     };

    $.fn[pluginName] = function ( options ) {
        return $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
    }

})( jQuery, window, document );