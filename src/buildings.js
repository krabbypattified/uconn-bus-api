let buildings = getBuildings().map(b => ({
  name: b.name,
  latitude: b.lat,
  longitude: b.lng,
  abbreviation: b.abbr,
  type: 'BUILDING',
}))


export default () => buildings




function getBuildings() {
  return [
    {
      "name": "Oak Hall",
      "abbr": "OAK",
      "lng": -72.25116229999999,
      "lat": 41.8074488
    },
    {
      "name": "Pharmacy/Biology Building",
      "abbr": "PBB",
      "lng": -72.25514489999999,
      "lat": 41.8100808
    },
    {
      "name": "Putnam Refectory",
      "abbr": "PR",
      "lng": -72.2586061,
      "lat": 41.805077
    },
    {
      "name": "Manchester Hall",
      "abbr": "MAN",
      "lng": -72.2482919,
      "lat": 41.8080343
    },
    {
      "name": "Wilson South Residence Hall",
      "abbr": "WSRH",
      "lng": -72.2472494,
      "lat": 41.8048328
    },
    {
      "name": "Music Library",
      "abbr": "MLIB",
      "lng": -72.2444683,
      "lat": 41.804614
    },
    {
      "name": "Torrey Life Sciences Building",
      "abbr": "TLS",
      "lng": -72.2563626,
      "lat": 41.810311
    },
    {
      "name": "United Technologies Engineering Building",
      "abbr": "UTEB",
      "lng": -72.2555362,
      "lat": 41.8094215
    },
    {
      "name": "Fine Arts Resource Center",
      "abbr": "FARC",
      "lng": -72.2446546,
      "lat": 41.8046171
    },
    {
      "name": "Agricultural Biotechnology Laboratory",
      "abbr": "ABL",
      "lng": -72.25044129999999,
      "lat": 41.8136026
    },
    {
      "name": "Art Ceramic Studio",
      "abbr": "ACS",
      "lng": -72.2531154,
      "lat": 41.8041681
    },
    {
      "name": "Art Building",
      "abbr": "ARTB",
      "lng": -72.2456998,
      "lat": 41.8038429
    },
    {
      "name": "Storrs Hall",
      "abbr": "STRS",
      "lng": -72.252389,
      "lat": 41.8099413
    },
    {
      "name": "J. Louis von der Mehden Recital Hall",
      "abbr": "VDM",
      "lng": -72.24544929999999,
      "lat": 41.8049774
    },
    {
      "name": "Physics Building",
      "abbr": "PB",
      "lng": -72.2574084,
      "lat": 41.8093224
    },
    {
      "name": "Wilbur O. Atwater Laboratory",
      "abbr": "ATWR",
      "lng": -72.2549494,
      "lat": 41.8108458
    },
    {
      "name": "Bishop Center",
      "abbr": "BISH",
      "lng": -72.2431102,
      "lat": 41.8041126
    },
    {
      "name": "Sprague Hall",
      "abbr": "SRH",
      "lng": -72.247496,
      "lat": 41.808921
    },
    {
      "name": "Biology/Physics Building",
      "abbr": "BPB",
      "lng": -72.2566459,
      "lat": 41.80988
    },
    {
      "name": "Wilbur Cross Building",
      "abbr": "WCB",
      "lng": -72.2518197,
      "lat": 41.8091716
    },
    {
      "name": "Student Health Services",
      "abbr": "WSH",
      "lng": -72.253597,
      "lat": 41.81001
    },
    {
      "name": "Charles Lewis Beach Hall",
      "abbr": "BCH",
      "lng": -72.25001809999999,
      "lat": 41.8095173
    },
    {
      "name": "Gordon W. Tasker Admissions Building",
      "abbr": "TSK",
      "lng": -72.25705219999999,
      "lat": 41.8076854
    },
    {
      "name": "Nathan L. Whetten Graduate Center",
      "abbr": "WGC",
      "lng": -72.251975,
      "lat": 41.8058983
    },
    {
      "name": "Architectural and Engineering Services",
      "abbr": "AES",
      "lng": -72.2628289,
      "lat": 41.811133
    },
    {
      "name": "Engineering II",
      "abbr": "E2",
      "lng": -72.2554,
      "lat": 41.8091427
    },
    {
      "name": "Chemistry Building",
      "abbr": "CHM",
      "lng": -72.25387649999999,
      "lat": 41.810827
    },
    {
      "name": "Jamie Homero Arjona Building",
      "abbr": "ARJ",
      "lng": -72.2487974,
      "lat": 41.8064057
    },
    {
      "name": "Willis Nichols Hawley Armory",
      "abbr": "HAWL",
      "lng": -72.25072,
      "lat": 41.8077003
    },
    {
      "name": "J. Ray Ryan Building",
      "abbr": "JRB",
      "lng": -72.2507473,
      "lat": 41.8032572
    },
    {
      "name": "Horse Unit I",
      "abbr": "HU1",
      "lng": -72.244033,
      "lat": 41.8140604
    },
    {
      "name": "School of Business",
      "abbr": "BUSN",
      "lng": -72.25367539999999,
      "lat": 41.80593409999999
    },
    {
      "name": "Jorgensen Center for the Performing Arts",
      "abbr": "HJT",
      "lng": -72.2561638,
      "lat": 41.80857779999999
    },
    {
      "name": "Thomas J. Dodd Research Center",
      "abbr": "DODD",
      "lng": -72.2510908,
      "lat": 41.8058244
    },
    {
      "name": "Homer Babbidge Library",
      "abbr": "HBL",
      "lng": -72.2517451,
      "lat": 41.8066244
    },
    {
      "name": "Koons Hall",
      "abbr": "KNS",
      "lng": -72.2510222,
      "lat": 41.8085022
    },
    {
      "name": "Edward V. Gant Science Complex",
      "abbr": "GANT",
      "lng": -72.2571564,
      "lat": 41.8095617
    },
    {
      "name": "Kellogg Dairy Center",
      "abbr": "KEL",
      "lng": -72.2519293,
      "lat": 41.8183631
    },
    {
      "name": "Math-Science Building",
      "abbr": "MSB",
      "lng": -72.256732,
      "lat": 41.8092558
    },
    {
      "name": "Harold G. Hewitt Building",
      "abbr": "HEW",
      "lng": -72.24148819999999,
      "lat": 41.8024137
    },
    {
      "name": "Weston A. Bousfield Psychology Building",
      "abbr": "BOUS",
      "lng": -72.25035609999999,
      "lat": 41.8065892
    },
    {
      "name": "Floriculture Greenhouse",
      "abbr": "FG",
      "lng": -72.2520612,
      "lat": 41.8128767
    },
    {
      "name": "Harry A. Gampel Pavilion",
      "abbr": "GAMP",
      "lng": -72.2544231,
      "lat": 41.805293
    },
    {
      "name": "Human Development Center",
      "abbr": "HDC",
      "lng": -72.2489164,
      "lat": 41.8086044
    },
    {
      "name": "Roy E. Jones Building",
      "abbr": "JONS",
      "lng": -72.2484538,
      "lat": 41.8137275
    },
    {
      "name": "Francis L. Castleman Building",
      "abbr": "CAST",
      "lng": -72.25474799999999,
      "lat": 41.8081269
    },
    {
      "name": "Ratcliffe Hicks Building and Arena",
      "abbr": "RHBA",
      "lng": -72.2494901,
      "lat": 41.8122959
    },
    {
      "name": "Family Studies Building",
      "abbr": "FSB",
      "lng": -72.248935,
      "lat": 41.8086503
    },
    {
      "name": "Information Technology Engineering",
      "abbr": "ITE",
      "lng": -72.252895,
      "lat": 41.8065256
    },
    {
      "name": "Institute of Material Sciences",
      "abbr": "IMS",
      "lng": -72.2575212,
      "lat": 41.8098974
    },
    {
      "name": "Philip E. Austin Building",
      "abbr": "AUST",
      "lng": -72.2511919,
      "lat": 41.8104296
    },
    {
      "name": "Laurel Hall",
      "abbr": "LH",
      "lng": -72.2534118,
      "lat": 41.8071097
    },
    {
      "name": "Horse Unit II",
      "abbr": "HU2",
      "lng": -72.244033,
      "lat": 41.8140604
    },
    {
      "name": "Andre Schenker Lecture Hall",
      "abbr": "SCHN",
      "lng": -72.2497492,
      "lat": 41.80723039999999
    },
    {
      "name": "Walter Childs Wood Hall",
      "abbr": "WOOD",
      "lng": -72.2531329,
      "lat": 41.80921170000001
    },
    {
      "name": "Lester E. Shippee Hall",
      "abbr": "SPRH",
      "lng": -72.2446908,
      "lat": 41.8064797
    },
    {
      "name": "George C. White Building",
      "abbr": "WITE",
      "lng": -72.2495071,
      "lat": 41.81313859999999
    },
    {
      "name": "Wilfred B. Young Building",
      "abbr": "YNG",
      "lng": -72.2539805,
      "lat": 41.8077414
    },
    {
      "name": "Henry R. Monteith Building",
      "abbr": "MONT",
      "lng": -72.2492286,
      "lat": 41.80693249999999
    },
    {
      "name": "Livestock Unit II",
      "abbr": "LU2",
      "lng": -72.2443569,
      "lat": 41.8196121
    },
    {
      "name": "Music Building",
      "abbr": "MUSB",
      "lng": -72.2450258,
      "lat": 41.8052965
    },
    {
      "name": "Rowe Center for Undergraduate Education",
      "abbr": "ROWE",
      "lng": -72.2529098,
      "lat": 41.8077158
    },
    {
      "name": "Carolyn Ladd Widmer Wing",
      "abbr": "WIDM",
      "lng": -72.252204,
      "lat": 41.810009
    },
    {
      "name": "Arthur B. Bronwell Building",
      "abbr": "BRON",

      "lng": -72.25494689999999,
      "lat": 41.8087621
    },
    {
      "name": "Biobehavioral Science Building 4",
      "abbr": "B4-A",
      "lng": -72.240585,
      "lat": 41.814840
    },
    {
      "name": "Cattle Resource Unit",
      "abbr": "CRU",
      "lng": 72.245750,
      "lat": 41.820517
    },
    {
      "name": "Biobehavioral Science Building 3",
      "abbr": "B3",
      "lng": -72.240590,
      "lat": 41.815487
    },
    {
      "name": "Biobehavioral Science Building 1",
      "abbr": "B1",
      "lng": -72.240300,
      "lat": 41.815543
    },
    {
      "name": "Greer Field House",
      "abbr": "GRE",
      "lng": -72.256195,
      "lat": 41.806967
    },
    {
      "name": "William H. Hall Building",
      "abbr": "HALL",
      "lng": -72.251938,
      "lat": 41.808139
    },
    {
      "name": "Biobehavioral Science Building 5",
      "abbr": "B5",
      "lng": -72.241222,
      "lat": 41.815210
    },
    {
      "name": "Drama/Music Building",
      "abbr": "DRMU",
      "lng": -72.244502,
      "lat": 41.804172
    },
    {
      "name": "Charles B. Gentry Building",
      "abbr": "GENT",
      "lng": -72.253841,
      "lat": 41.808581
    },
    {
      "name": "Livestock Unit I",
      "abbr": "LU1",
      "lng": -72.242093,
      "lat": 41.817087
    },
    {
      "name": "Merlie S. Klinck Building",
      "abbr": "KLIN",
      "lng": -72.249745,
      "lat": 41.812883
    },
    {
      "name": "Poultry Unit I",
      "abbr": "PU1",
      "lng": -72.253225,
      "lat": 41.817630
    },
    {
      "name": "David C. Phillips Communication Sciences Building",
      "abbr": "PCSB",
      "lng": -72.248343,
      "lat": 41.802600
    }
  ]
}
