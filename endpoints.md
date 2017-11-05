http://www.uconnshuttle.com/Services/JSONPRelay.svc?wsdl =wsdl[0-16]
http://www.uconnshuttle.com/Services/JSONPRelay.svc?xsd=xsd0 =xsd[0-16?]


## Possibles
#####http://www.uconnshuttle.com/Services/JSONPRelay.svc/GetScheduleTripStopTimesPaged?page=1&rows=1&scheduleTripID=200
#####http://www.uconnshuttle.com/Services/JSONPRelay.svc/GetScheduleFutureStopTimes?timesPerStopString=10&routeIDString=31&routeStopIDString=165
##http://www.uconnshuttle.com/Services/JSONPRelay.svc/GetScheduleTripVehiclesPaged?page=1&rows=1&scheduleVehicleCalendarID=1
#http://www.uconnshuttle.com/Services/JSONPRelay.svc/GetScheduleTripsPaged?page=1&rows=1&scheduleID=1
#http://www.uconnshuttle.com/Services/JSONPRelay.svc/GetScheduleTripsByRoutePaged?page=1&rows=1&scheduleID=1&routeID=21
http://www.uconnshuttle.com/Services/JSONPRelay.svc/GetScheduleVehicleCalendarsPaged?page=1&rows=1&scheduleID=1
http://www.uconnshuttle.com/Services/JSONPRelay.svc/GetSchedulesPaged?page=1&rows=3&routeId=31&showInactive=true
http://www.uconnshuttle.com/Services/JSONPRelay.svc/GetScheduleCalendarsPaged?page=1&rows=1&scheduleID=1


GetMapVehiclePoints - live bus data

GetRouteStopArrivals - live arrivals + scheduled arrivals (sometimes)
GetMapStopEstimates - live arrivals
GetRouteVehicleEstimates - live arrivals
GetStopArrivalTimes - live arrivals
GetMapStopEstimates - live arrivals

Calendar*, GetScheduleTrip* - **could be what i'm looking for, prob not**

GetRoutesForMapWithScheduleWithEncodedLine - stops for each bus line
GetRoutesForMap - stops for each bus line
GetRoutes - shallow busLine data
GetStops - shallow busStop data
GetVehicleRoutes - match buses to busLines

GetRouteSchedules - yuck
GetVehicleRoutes - meh
GetRouteStopScheduleTimes - yuck



GetRouteStopArrivals
[{
	"RouteID":31,											Which Line the Stop Belongs to (31 = Silver)
	"RouteStopID":578,										The Stop ID Specific to (Silver) Line
	"ScheduledTimes":[										YOU CAN PROBABLY IGNORE THIS
		{
			"ArrivalTimeUTC":"\/Date(1504891260000)\/",		Next (Silver) Bus Arrival Time
			"AssignedVehicleId":40,							ID for That (Silver) Bus
			"DepartureTimeUTC":"\/Date(1504891260000)\/"
		},
		...
	],
	"VehicleEstimates":[									Estimated Arrivals for (Silver) Line
		{
			"OnRoute":true,
			"SecondsToStop":658,							When That (Silver) Bus Arrives
			"VehicleID":40									ID for That (Silver) Bus
		},
		...
	]
},...]



GetRoutesForMapWithScheduleWithEncodedLine
[{
	"Description":"Purple",									Bus Line
	"ETATypeID":3,
	"EncodedPolyline":"RnCFt@@PBRDZBL.............",		Bus Line Route Coords
	"IsVisibleOnMap":true,
	"Landmarks":[],
	"MapLatitude":41.810087,
	"MapLineColor":"#8000FF",
	"MapLongitude":-72.26602,
	"Order":1,
	"RouteID":33,											Purple Line's ID
	"Stops":[												All Stops for Purple Line
		{
		"AddressID":163,									Bus Stop ID :)
		"City":"Storrs",
		"Latitude":41.809269,								Stop Latitude
		"Line1":"Visitor Center Outbound",
		"Line2":"",
		"Longitude":-72.261484,								Stop Longitude
		"State":"CT",
		"Zip":"06269",
		"Description":"Visitor Center Outbound",			Stop Name
		"Heading":0,
		"MapPoints":[],
		"MaxZoomLevel":1,
		"Order":1,
		"RouteDescription":"",
		"RouteID":33,										Purple Line's ID
		"RouteStopID":627,									Bus Stop ID for this Route, in order [627,631,632,633,634,...]
		"SecondsAtStop":10,
		"SecondsToNextStop":170,
		"ShowDefaultedOnMap":true,
		"ShowEstimatesOnMap":true,
		"SignVerbiage":"Visitor Center Outbound",
		"TextingKey":""
		},
		...
	]
},...]



GetMapVehiclePoints
[{
	"GroundSpeed":16.15515388638,							Speed (mph??)
	"Heading":261,											Angle (relative to??)
	"IsDelayed":false,
	"IsOnRoute":true,
	"Latitude":41.80553,									Latitude
	"Longitude":-72.24607,									Longitude
	"Name":"232",
	"RouteID":31,											Bus Route ID (31 = Silver)
	"Seconds":1,
	"TimeStamp":"\/Date(1504911410000-0600)\/",
	"VehicleID":40											Bus ID (i.e. the first Silver bus)
},...]



GetVehicleRoutes
[{
	UniqueID: "fb6e056e-e9b1-43ea-9974-0b25e2f1f202",
	DelayedStartTime: "/Date(-62135571600000-0700)/",
	FromAdmin: false,
	GpsGateUserName: "uconn25",
	IsDelayed: false,
	PersonID: 6,
	RouteID: 0,								Bus Line ID
	VehicleID: 54,							Bus ID
	VehicleName: "1701"
}...]
