/* Magic Mirror
 * Module: MMM-rfacts
 *
 * By Cowboysdude
 *
 */
const NodeHelper = require('node_helper');
const request = require('request'); 
const translate = require('@vitalets/google-translate-api');

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting module: " + this.name);
    },


  getFact: function(url) {
    var self = this;
    request({
        url: "https://useless-facts.sameerkumar.website/api",
        method: 'GET'
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(body);
            if (config.language != 'en') {
                Promise.all([
                    translate(result, {
                        from: 'en',
                        to: config.language,
                        client: 'gtx'
                    })
                ]).then(function(result) {
                    var results = JSON.stringify(result[0].data);
                    self.sendSocketNotification("FACT_RESULT", results);
                }).catch(function(e) {
                    console.log("[MMM-rfacts] Translation ERROR! Translation failed, will fall back to English.");
                    self.sendSocketNotification("FACT_RESULT", result);
                });
            } else {
                self.sendSocketNotification("FACT_RESULT", result);
            }
        }
    });
}, 

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'CONFIG') {
            this.config = payload;
        } else if (notification === 'GET_FACT') {
            this.getFact(payload);
        }
    }
});
