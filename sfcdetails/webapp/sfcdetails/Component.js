sap.ui.define([
	"sap/dm/dme/podfoundation/component/production/ProductionUIComponent",
	"sap/ui/Device"
], function (ProductionUIComponent, Device) {
	"use strict";

	return ProductionUIComponent.extend("sap.custom.plugin.testplugin.sfcdetails.sfcdetails.Component", {
		metadata: {
			manifest: "json"
		}
	});
});