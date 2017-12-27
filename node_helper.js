/* Magic Mirror
 * Module: MMM-rfacts
 *
 * By Cowboysdude
 * 
 */
const NodeHelper = require('node_helper');
const request = require('request');
const parser = require('xml2js').parseString;


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting module: " + this.name);
    },

    getFact: function(url) {
        request({
            url: "http://www.fayd.org/api/fact.xml",
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                parser(body, (err, result) => {
                    if (result.hasOwnProperty('facts')) {
                        var result = JSON.parse(JSON.stringify(result.facts));
                        this.sendSocketNotification("FACT_RESULT", result);
                    }
                });
            }
        });
    },

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_FACT') {
            this.getFact(payload);
        }
    }
});