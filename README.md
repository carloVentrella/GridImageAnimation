GridImageAnimations
===========================

This plugin, developed in jQuery, creates the grid of the image and run the animation chosen by the user: fadeIn and fadeOut. 
It is completely configurable, users can choose the size of the cells of the grid, the speed of the animations, the type of animations etc.

Demo
===========================

You can run it here : http://www.ketek.it/demo/gridImageAnimation/demo.html

Files required
===========================

- previewImage.js : is the core of the script;
- a reset stylesheet : it's very important to avoid boring disturbs on the grid (I've used this: http://meyerweb.com/eric/tools/css/reset/);


Installation
===========================

Just call the plugin with an image and set some parameters:

`````javascript
	var grid = img.previewImage({ 'mode' : 'fadeIn', 
	                              'cell' : 15 , 
	                              'speed' : 70, 
	                              'durationFading' : 200,
	                              'previewBox' : null,
	                               complete : function(){}  
	                            });
`````

- mode : fadeIn() or fadeOut(). In the first one the image appears, in the second one (obvioulsy) it scompares;
- cell : default is 15, this means that width and height are divided in 15 parts; A value too little will create disturbs;
- speed : is the delay between the animation of a cell and another one;
- durationFading :  is the time that cells take to compare/scompare;
- previewBox : it's the element where the user want to animate the image. If it's null the grid will replace the original image;
- complete : is the function that will be run when the animation ends;


Inheritance
===========================

If the original image as an id and/or class/es they will be inherited by the grid.




You can read also the article on my personal blog (italian) : XXX 


