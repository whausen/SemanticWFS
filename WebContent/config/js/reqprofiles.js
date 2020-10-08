var reqprofiles={
	"requirements":[
			{"Emergency":[
				{"title":"color",0:{"color":"darkred","label":"very bad"},10:{"color":"darkred","label":"very bad"},30:{"color":"red","label":"bad"},40:{"color":"#F08080","label":"slightly bad"},50:{"color":"darkorange","label":"mediocre"},60:{"color":"orange","label":"medium"},70:{"color":"lightgreen","label":"slightly good"},80:{"color":"green","label":"good"},100:{"color":"darkgreen","label":"perfect"}},
				{"title":"NumberOfMissingPointConnections",
					"optimalValue": "0.0",
					"from": "0.0",
					"to":"50.0",
					"category": "DataSetMetrics",
					"comment":"Number of Missing Point Connections in a dataset",
					"unit": "http://data.nasa.gov/qudt/owl/unit#Unitless",
					"urival": "http://www.w3.org/2001/XMLSchema#double",
					"metrictype": "OPTIMALVALUEMETRIC",
					"priority":"3"
				},
				{ "title":"Distance",
					"metrictype": "RELATIVEMETRIC",
					"unit": "http://data.nasa.gov/qudt/owl/unit#Meter",
					"urival": "http://www.w3.org/2001/XMLSchema#double",
					"category": "IndividualMetric",
					"optimalValue": "0.0",
					"uri": "http://www.semgis.de/stat#distance",
					"comment":"The distance of the osm geometry to the goldstandard geometry",
					"priority":"1"
				},{"title":"PercentageOfValidGeometries",
					"optimalValue": 0,
					"metrictype": "RELATIVEMETRIC",
					"unit": "http://data.nasa.gov/qudt/owl/unit#Percent",
					"priority":3,
					"urival": "http://www.w3.org/2001/XMLSchema#double",
					"category": "DatasetMetrics",
					"optimalValue": "100.0",
					"comment":"The percentage of valid geometries in the respective area",
					"uri": "http://semgis.de/stat#percentageOfValidGeometries"
				},{"title":"AreaSimilarity",
					"metrictype": "RELATIVEMETRIC",
					"priority":"2",
					"unit": "http://data.nasa.gov/qudt/owl/unit#Percent",
					"urival": "http://www.w3.org/2001/XMLSchema#double",
					"category": "GeometryMetric",
					"comment":"The similarity of osm geometry and goldstandard concerning the area overlap",
					"optimalValue": "100.0",
					"uri": "http://www.semgis.de/stat#areaSimilarity"
				},{"title":	"HaussdorfSimilarity",
					"metrictype": "RELATIVEMETRIC",
					"unit": "http://data.nasa.gov/qudt/owl/unit#Percent",
					"urival": "http://www.w3.org/2001/XMLSchema#double",
					"category": "GeometryMetric",
					"priority":2,
					"comment":"The HaussdorfSimilarity of the goldstandard geometry to the osm geometry",
					"optimalValue": "100.0",
					"uri": "http://www.semgis.de/stat#haussdorfSimilarity"
				},{"title":"Freshness",
					"metrictype": "RELATIVEMETRIC",
					"unit": "http://data.nasa.gov/qudt/owl/unit#Day",
					"urival": "http://www.w3.org/2001/XMLSchema#dateTime",
					"category": "IndividualMetric",
					"from": "0.0","to":"600.0",
					"ranges":[{"from": "0.0","to":"365.0"}],
					"optimalValue": "0.0",
					"priority":2,
					"comment":"The freshness of the respective geometry in passed days since the last edit.",
					"uri": "http://semgis.de/stat#freshness"
				},{"title":"Resolution",
					"metrictype": "RELATIVEMETRIC",
					"unit": "http://data.nasa.gov/qudt/owl/unit#Unitless",
					"urival": "http://www.w3.org/2001/XMLSchema#integer",
					"category": "IndividualMetric",
					"comment":"The resolution of the respective geometry as given in the amount of decimal places of the GPS coordinate.",
					"optimalValue": "15.0",
					"dealbreaker": true,
					"priority": "3",
					"uri": "http://semgis.de/stat#resolution"
				},
				{	"title":"Valid",
					"metrictype": "BINARYMETRIC",
					"unit": "http://www.w3.org/2001/XMLSchema#Boolean",
					"urival": "http://www.w3.org/2001/XMLSchema#boolean",
					"category": "GeometryMetric",
					"optimalValue": "true",
					"priority": "1",
					"comment":"Indicates if the geometry is valid.",
					"uri": "http://www.semgis.de/stat#valid",
					"classlabel": "http://www.w3.org/2001/XMLSchema#boolean"
				},
				{	"title":"SuperiorGeometry",
					"metrictype": "BINARYMETRIC",
					"unit": "http://www.w3.org/2001/XMLSchema#Boolean",
					"urival": "http://www.w3.org/2001/XMLSchema#boolean",
					"category": "GeometryMetric",
					"optimalValue": "true",
					"priority": "1",
					"comment":"Indicates if the geometry is more detailed than the reference geometry.",
					"uri": "http://www.semgis.de/stat#superiorGeometry",
					"classlabel": "http://www.w3.org/2001/XMLSchema#boolean"
				},
				{	"title":"Closed",
					"metrictype": "BINARYMETRIC",
					"unit": "http://www.w3.org/2001/XMLSchema#Boolean",
					"urival": "http://www.w3.org/2001/XMLSchema#boolean",
					"category": "GeometryMetric",
					"optimalValue": "true",
					"priority": "4",
					"comment":"Indicates if the geometry is closed.",
					"uri": "http://www.semgis.de/stat#closed",
					"classlabel": "http://www.w3.org/2001/XMLSchema#boolean"
				},
				{	"title":"Empty",
					"metrictype": "BINARYMETRIC",
					"unit": "http://www.w3.org/2001/XMLSchema#Boolean",
					"urival": "http://www.w3.org/2001/XMLSchema#boolean",
					"category": "GeometryMetric",
					"optimalValue": "false",
					"priority": "4",
					"comment":"Indicates if the geometry is empty.",
					"uri": "http://www.semgis.de/stat#empty",
					"classlabel": "http://www.w3.org/2001/XMLSchema#boolean"
				},
				{	"title":"Simple",
					"metrictype": "BINARYMETRIC",
					"unit": "http://www.w3.org/2001/XMLSchema#Boolean",
					"urival": "http://www.w3.org/2001/XMLSchema#boolean",
					"category": "GeometryMetric",
					"optimalValue": "true",
					"priority": "4",
					"comment":"Indicates if the geometry is simple.",
					"uri": "http://www.semgis.de/stat#simple",
					"classlabel": "http://www.w3.org/2001/XMLSchema#boolean"
				},
				{	"title":"Latency",
					"metrictype": "OPTIMALRANGEMETRIC",
					"unit": "http://www.w3.org/2001/XMLSchema#Second",
					"urival": "http://www.w3.org/2001/XMLSchema#double",
					"category": "ServiceMetric",
					"optimalValue": "0.0",
					"ranges":[{"from": "0.0","to":"5.0"}],
					"concernedClasses":[""],
					"priority": "5",
					"comment":"Indicates the latency of the webservice providing the (processed) map data.",
					"uri": "http://www.semgis.de/stat#latency",
					"classlabel": "http://www.w3.org/2001/XMLSchema#boolean"
				}
				]
			},
			{"Geodatacollection":[
				{"title":"color",10:{"color":"darkred","label":"very bad"},30:{"color":"red","label":"bad"},40:{"color":"#F08080","label":"slightly bad"},50:{"color":"darkorange","label":"mediocre"},60:{"color":"orange","label":"medium"},70:{"color":"lightgreen","label":"slightly good"},80:{"color":"green","label":"good"},100:{"color":"darkgreen","label":"perfect"}},
				{"title":"NumberOfMissingPointConnections",
					"optimalValue": "0.0",
					"from": "0.0",
					"to":"2.0",
					"category": "DatasetMetrics",
					"comment":"Number of Missing Point Connections in a dataset",
					"unit": "http://data.nasa.gov/qudt/owl/unit#Unitless",
					"urival": "http://www.w3.org/2001/XMLSchema#double",
					"metrictype": "OPTIMALVALUEMETRIC",
					"priority":"1"
				},
				{ "title":"Distance",
					"metrictype": "RELATIVEMETRIC",
					"unit": "http://data.nasa.gov/qudt/owl/unit#Meter",
					"urival": "http://www.w3.org/2001/XMLSchema#double",
					"category": "IndividualMetric",
					"comment":"The distance of the osm geometry to the goldstandard geometry",
					"optimalValue": "0.0",
                    "dealbreaker":true,
					"uri": "http://www.semgis.de/stat#distance",
					"priority":"1"
				},{"title":"PercentageOfValidGeometries",
					"optimalValue": 0,
					"metrictype": "RELATIVEMETRIC",
					"unit": "http://data.nasa.gov/qudt/owl/unit#Percent",
					"priority":3,
					"urival": "http://www.w3.org/2001/XMLSchema#double",
					"category": "DatasetMetrics",
					"comment":"The percentage of valid geometries in the respective area",
					"optimalValue": "100.0",
					"uri": "http://semgis.de/stat#percentageOfValidGeometries"
				}
			]
		}
	]
}
