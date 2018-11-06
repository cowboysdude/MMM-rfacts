# MMM-rfacts
Random Facts for MagicMirror2

![](Capture.PNG)  ![](Capture1.PNG)


# Just install it.....

    ~/MagicMirror/modules
    git clone https://github.com/cowboysdude/MMM-rfact
    cd MagicMirror/modules/MMM-rfacts
    npm install
    
#  Add to config.js

           {
	        disabled: false,
            module: 'MMM-rfacts',
            position: 'bottom_bar',
	        config:
	    	 {
		  lang: "en",  //facts will be translated to this language according to ISO-639-1 code 
		  updateInterval: 10 * 60 * 1000, // every 10 minutes
        	  animationSpeed: 10,
        	  initialLoadDelay: 875, // 0 seconds delay
        	  retryDelay: 1500,
		  fadeSpeed: 7
		 }
           },
           
  NO kidding, just that simple!!!

# There are translation files for
      German
	  Swedish
	  Danish
	  Chinese
	  Spanish
	  French
	  Korean
	  and others!  
 
