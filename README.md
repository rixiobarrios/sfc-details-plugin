# DMC UX UI5 BAS UC

## UX Use-Case-02: View Plug-in – Display SFC Details
As a system, I want a custom view plugin that displays specific SFC data for the currently selected SFC Value so that I have the SFC details displayed on the screen.

- Step 1 - Go to Business Application Studio (BAS)

[Your Business Application Studio environment](https://dmc-az-cons-training.eu20cf.applicationstudio.cloud.sap/index.html)

- Step 2 - Enter a new Dev Space  
e.g DMCPlugin

- Step 3 - Select application kind  
SAP Fiori

- Step 4 - click the Create Dev space button

- Step 5 - Click on the newly created Dev Space

- Step 6 - Open a new terminal window

- Step 7 - Open project folder  
```cd projects```

- Step 8 - Make new project's folder  
e.g. mkdir test9podplugin

- Step 9 - Open new folder  
```cd test9podplugin```

- Step 10 - Install generator plugin  
```npm install generator-dmcpodplugin```

- Step 11 - Generate new project  
```yo dmcpodplugin```

- Step 12 - Enter the name of your plugin  
e.g. sfcdetail

- Step 13 - Enter version number  
e.g. 0.0.1

- Step 14 - What is your DMC host name?  
e.g. dmc-az-cons-training.test.execution.eu20.dmc.cloud.sap

- Step 15 - What is your plugin namespace?  
e.g. sap.custom.plugin.testplugin

- Step 16 - Support WORK_CENTER PODS?  
Yes

- Step 17 - Support OPERATIONS PODS?  
Yes

- Step 18 - Support ORDER PODS?  
Yes

- Step 19 - Support CUSTOM PODS?  
Yes

- Step 20 Support Line Monitor PODS?  
Yes

- Step 21 - Allow Multiple Instances?  
Yes

- Step 22 - Production Process Enabled?  
No

- Step 23 - Open working folder  
e.g. user/projects/test9podplugin  

- Step 24 - Open file builder.properties  
e.g. user/projects/test9podplugin/sfcdetail/webapp/sfcdetail/builder/PropertyEditor.js  

- Step 25 - Change line code block from line 36 ```"title":"sfcdetail"``` and line 37 ```"text":"sfcdetail"``` to  
```	
	getDefaultPropertyData: function(){
			return {
				"backButtonVisible": true,
				"closeButtonVisible": true,
                "title": "SFC Details",
				"text": ""
                
			};
	    }
```

- Step 26 - Edit the MainView.view.xml file to target elements by Id in view  
e.g. user/projects/test9podplugin/sfcdetail/webapp/sfcdetail/view/MainView.view.xml  
```  
<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:f="sap.ui.layout.form" xmlns:core="sap.ui.core" xmlns:html="http://www.w3.org/1999/xhtml" controllerName="sap.custom.plugin.testplugin.sfcdetails.sfcdetails.controller.MainView" width="100%" height="100%">
		
        <Panel 
                id="panelPlugin"  
                width="100%"
                height="100%"
                expandable="false"
                expanded="false"
                accessibleRole="Region"
                backgroundDesign="Transparent"
                class="sapUiNoContentPadding">  
        <headerToolbar>
            <Toolbar height="3rem">
                <Button
                    id="backButton"
                    visible="false"
                    text="{i18n>template.back.btn}"
                    tooltip="{i18n>template.back.tooltip}"
                    icon="sap-icon://nav-back"
                    press="onBackPress"/>
                <Title id="headerTitle" text=""/>
                <ToolbarSpacer/>
                <Button
                    id="closeButton"
                    visible="false"
                    tooltip="{i18n>template.close.tooltip}"
                    icon="sap-icon://decline"
                    press="onClosePress"/>
            </Toolbar>
        </headerToolbar>
        <content>
            <VBox id="podModelPluginPanelContent" width="100%" height="100%">
				<Text id="order" text="Order:" class="textFontSize" textAlign="Initial" width="100%"/>
				<Text id="sfc" text="SFC:" class="textFontSize" textAlign="Initial" width="100%"/>
				<Text id="material" text="Material:" class="textFontSize" textAlign="Initial" width="100%"/>
				<Text id="bom" text="BOM:" class="textFontSize" textAlign="Initial" width="100%"/>
				<Text id="routing" text="Routing:" class="textFontSize" textAlign="Initial" width="100%"/>
				<Text id="status" text="Status:" class="textFontSize" textAlign="Initial" width="100%"/>
            </VBox>
        </content>
	    </Panel>		
</mvc:View>
```  

- Step 27 - Log target data to render in controller  
e.g. user/projects/test9podplugin/sfcdetail/webapp/sfcdetail/controller/MainView.controller.js  
```
        onOperationChangeEvent: function (sChannelId, sEventId, oData) {
            // don't process if same object firing event
            if (oData.selections[0].sfc !== "") {
                // log values to test output
                console.log(this.getPodSelectionModel().getSelection().shopOrder.shopOrder);
                console.log(oData.selections[0].sfc);
                console.log(oData.selections[0].material);
                // log BOM here in next step through API call
                console.log(oData.selections[0].routing);
                console.log(oData.selections[0].statusDescription);

                return;
            }
        },
```

- Step 28 - Make API call to target BOM (Bill Of Material) data  
e.g. user/projects/test9podplugin/sfcdetail/webapp/sfcdetail/controller/MainView.controller.js 
```  
        // API call to render Bill Of Material(BOM)
        getBom: function () {
            var plant = this.getPodController().getUserPlant();

            var shopOrder = this.getPodSelectionModel().getSelection().getShopOrder();
            if (shopOrder != null) {

                var url = this.getPublicApiRestDataSourceUri() + '/order/v1/orders?order=' + shopOrder.shopOrder + '&plant=' + plant;
                var that = this;
                this.ajaxGetRequest(url, null,
                    function (oResponseData) {
						// render response from API to the bom Id on the xml view file
                        that.getView().byId("bom").setText("BOM:"+ oResponseData.bom.bom);
						// log target data to render
                        console.log(oResponseData.bom.bom);
                    },
                    function (oError, sHttpErrorMessage) {
                        var err = oError || sHttpErrorMessage;
                    }
                );
            }
        },
```  

- Step 29 - Pass target data from the controller to the view  
e.g. user/projects/test9podplugin/sfcdetail/webapp/sfcdetail/controller/MainView.controller.js  
``` 
onOperationChangeEvent: function (sChannelId, sEventId, oData) {
    // don't process if same object firing event
    if (oData.selections[0].sfc !== "") {

        // target object and render by Id on XML file
        this.getView().byId("order").setText("Order: " + this.getPodSelectionModel().getSelection().shopOrder.shopOrder);   
        this.getView().byId("sfc").setText("SFC: " + oData.selections[0].sfc);
        this.getView().byId("material").setText("Material: " + oData.selections[0].material);
        // render BOM here through API call
        this.getView().byId("routing").setText("Routing: " + oData.selections[0].routing);
        this.getView().byId("status").setText("Status: " + oData.selections[0].statusDescription);

        return;
    }
}, 
```

- Step 30 - Build ```mta.yaml``` file  

- Step 31 - Deploy ```sfcdetails_0.0.1.mtar``` file