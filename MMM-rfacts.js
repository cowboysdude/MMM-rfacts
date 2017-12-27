/* Magic Mirror
 * Module: MMM-rfacts
 *
 * By cowboysdude
 * 
 */
Module.register("MMM-rfacts", {

    // Module config defaults.
    defaults: {
        updateInterval: 10 * 60 * 1000, // every 10 minutes
        animationSpeed: 10,
        initialLoadDelay: 875, // 0 seconds delay
        retryDelay: 1500,
        fadeSpeed: 7
    },

    getStyles: function() {
        return ["MMM-rfacts.css"];
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);

        // Set locale. 
        this.today = "";
        this.scheduleUpdate();
    },


    getDom: function() {


        var fact = this.fact;


        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.classList.add("wrapper");
            wrapper.innerHTML = "Getting a Fact ...";
            wrapper.className = "bright light small";
            return wrapper;
        }

        var top = document.createElement("div");


        var title = document.createElement("div");
        title.classList.add("xsmall", "bright", "title");
        title.innerHTML = "Random Fact";
        top.appendChild(title);

        var des = document.createElement("div");
        des.classList.add("small", "bright", "description");
        des.innerHTML = fact.fact[0];
        top.appendChild(des);

        wrapper.appendChild(top);
        return wrapper;

    },

    processFacts: function(data) {
        this.today = data.Today;
        this.fact = data;
        console.log(this.fact);
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getFact();
        }, this.config.updateInterval);
        this.getFact(this.config.initialLoadDelay);
    },

    getFact: function() {
        this.sendSocketNotification('GET_FACT');
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "FACT_RESULT") {
            this.processFacts(payload);
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },

});