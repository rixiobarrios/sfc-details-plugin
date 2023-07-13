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
        // API call to render Bill Of Material(BOM)
        updateOrderInfo: function(oEvent){
            if(this.getPodSelectionModel().getSelection() == null){
                return;
            }
            var shopOrder = this.getPodSelectionModel().getSelection().getShopOrder();
            if (shopOrder != null){
                this.getView().byId("SHOPORDER").setValue(shopOrder.shopOrder); // change SHOPORDER

                var url = this._oPodController.getPublicApiRestDataSourceUri() +'/order/v1/orders?order=' + shopOrder.shopOrder + '&plant=' + plant;
                var that = this;
                this._oPodController.ajaxGetRequest(url, null,
                    function (oResponseData) {
                        if (oResponseData["customValues"] != null){
                            var values = oResponseData["customValues"];
                            that.getView().byId("SALESORDER").setValue(''); // change SALESORDER
                            for (var i = 0 ; i < values.length; i++){
                                if(values[i]["attribute"] == that.getConfiguration().SalesOrderField){
                                    that.getView().byId("SALESORDER").setValue(values[i]["value"]); // change SALERORDER
                                    break;
                                }
                            }
                        }                   
                    
                },
                function (oError, sHttpErrorMessage) {
                    var err = oError || sHttpErrorMessage;
                }
                );
            }
        },

        onOperationChangeEvent: function (sChannelId, sEventId, oData) {
            // don't process if same object firing event
            if (oData.selections[0].sfc !== "") {
                // log values to test output
                console.log(this.getPodSelectionModel().getSelection().shopOrder.shopOrder);
                console.log(oData.selections[0].sfc);
                console.log(oData.selections[0].material);
                // console.log(oData.operations[0].bom);
                console.log(oData.selections[0].routing);
                console.log(oData.selections[0].statusDescription);

                // target object and render by Id on XML file
                this.getView().byId("order").setText("Order: " + this.getPodSelectionModel().getSelection().shopOrder.shopOrder);   
                this.getView().byId("sfc").setText("SFC: " + oData.selections[0].sfc);
                this.getView().byId("material").setText("Material: " + oData.selections[0].material);
                // this.getView().byId("bom").setText("BOM: " + oData.operations[0].bom);
                this.getView().byId("routing").setText("Routing: " + oData.selections[0].routing);
                this.getView().byId("status").setText("Status: " + oData.selections[0].statusDescription);

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