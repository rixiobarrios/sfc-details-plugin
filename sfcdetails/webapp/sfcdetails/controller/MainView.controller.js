sap.ui.define([
    'jquery.sap.global',
	"sap/dm/dme/podfoundation/controller/PluginViewController",
	"sap/ui/model/json/JSONModel"
], function (jQuery, PluginViewController, JSONModel) {
	"use strict";

	return PluginViewController.extend("sap.custom.plugin.testplugin.sfcdetails.sfcdetails.controller.MainView", {
		onInit: function () {
			PluginViewController.prototype.onInit.apply(this, arguments);     
		},

        onAfterRendering: function(){
            this.getView().byId("backButton").setVisible(this.getConfiguration().backButtonVisible);
            this.getView().byId("closeButton").setVisible(this.getConfiguration().closeButtonVisible);

            this.getView().byId("headerTitle").setText(this.getConfiguration().title);
            // delete line since id no longer exist
            // this.getView().byId("textPlugin").setText(this.getConfiguration().text);
        },

		onBeforeRenderingPlugin: function () {
            // subscribe on POD events
            this.subscribe("PodSelectionChangeEvent", this.onPodSelectionChangeEvent, this);
            this.subscribe("OperationListSelectEvent", this.onOperationChangeEvent, this);
            this.subscribe("WorklistSelectEvent", this.onWorkListSelectEvent, this);	
		},

        onBeforeRendering: function () {},

        onPodSelectionChangeEvent: function (sChannelId, sEventId, oData) {
            // don't process if same object firing event
            if (this.isEventFiredByThisPlugin(oData)) {
                return;
            }
        },

        onOperationChangeEvent: function (sChannelId, sEventId, oData) {
            // don't process if same object firing event
            if (oData.selections[0].sfc !== "") {
                console.log(oData.selections[0].sfc)

                // target object and render by Id    
                this.getView().byId("order").setText("Order: " + oData.selections[0].sfc);
                this.getView().byId("material").setText("Material: " + oData.selections[0].material);

                return;
            }
        },
        
        onWorkListSelectEvent: function (sChannelId, sEventId, oData) {
            // don't process if same object firing event
            if (this.isEventFiredByThisPlugin(oData)) {
                return;
            }

        },        

        isSubscribingToNotifications: function() {
            
            var bNotificationsEnabled = true;
           
            return bNotificationsEnabled;
        },


        getCustomNotificationEvents: function(sTopic) {
            //return ["template"];
        },


        getNotificationMessageHandler: function(sTopic) {

            //if (sTopic === "template") {
            //    return this._handleNotificationMessage;
            //}
            return null;
        },

        _handleNotificationMessage: function(oMsg) {
           
            var sMessage = "Message not found in payload 'message' property";
            if (oMsg && oMsg.parameters && oMsg.parameters.length > 0) {
                for (var i = 0; i < oMsg.parameters.length; i++) {

                    switch (oMsg.parameters[i].name){
                        case "template":
                            
                            break;
                        case "template2":
                        
                        }        
          
                }
            }

        },
        

        onExit: function () {
            if (PluginViewController.prototype.onExit) {
            PluginViewController.prototype.onExit.apply(this, arguments);
                }
            this.unsubscribe("PodSelectionChangeEvent", this.onPodSelectionChangeEvent, this);
            this.unsubscribe("OperationListSelectEvent", this.onOperationChangeEvent, this);
            this.unsubscribe("WorklistSelectEvent", this.onWorkListSelectEvent, this);
        }
	});
});