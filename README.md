# DMC UX UI5 BAS UC

## UX Use-Case-02: View Plug-in – Display SFC Details (1W)
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

- Step 26 - Edit the MainView.view.xml file
