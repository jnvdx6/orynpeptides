export interface UKCounty {
  slug: string;
  name: string;
  region: string;
  majorCities: string[];
  population: string;
  deliveryDays: string;
}

export const UK_COUNTIES: UKCounty[] = [
  // ─── England: South East ───────────────────────────────────────────
  {
    slug: "kent",
    name: "Kent",
    region: "South East",
    majorCities: ["Canterbury", "Maidstone", "Tunbridge Wells"],
    population: "1.8M",
    deliveryDays: "1",
  },
  {
    slug: "surrey",
    name: "Surrey",
    region: "South East",
    majorCities: ["Guildford", "Woking", "Epsom"],
    population: "1.2M",
    deliveryDays: "1",
  },
  {
    slug: "hampshire",
    name: "Hampshire",
    region: "South East",
    majorCities: ["Southampton", "Portsmouth", "Winchester"],
    population: "1.8M",
    deliveryDays: "1",
  },
  {
    slug: "berkshire",
    name: "Berkshire",
    region: "South East",
    majorCities: ["Reading", "Slough", "Windsor"],
    population: "910K",
    deliveryDays: "1",
  },
  {
    slug: "buckinghamshire",
    name: "Buckinghamshire",
    region: "South East",
    majorCities: ["Aylesbury", "High Wycombe", "Milton Keynes"],
    population: "810K",
    deliveryDays: "1",
  },
  {
    slug: "west-sussex",
    name: "West Sussex",
    region: "South East",
    majorCities: ["Chichester", "Crawley", "Worthing"],
    population: "860K",
    deliveryDays: "1",
  },
  {
    slug: "east-sussex",
    name: "East Sussex",
    region: "South East",
    majorCities: ["Brighton", "Eastbourne", "Hastings"],
    population: "550K",
    deliveryDays: "1",
  },
  {
    slug: "oxfordshire",
    name: "Oxfordshire",
    region: "South East",
    majorCities: ["Oxford", "Banbury", "Abingdon"],
    population: "690K",
    deliveryDays: "1",
  },

  // ─── England: London ───────────────────────────────────────────────
  {
    slug: "london",
    name: "London",
    region: "London",
    majorCities: ["City of London", "Westminster", "Camden"],
    population: "8.8M",
    deliveryDays: "1",
  },

  // ─── England: East of England ──────────────────────────────────────
  {
    slug: "essex",
    name: "Essex",
    region: "East of England",
    majorCities: ["Chelmsford", "Colchester", "Southend-on-Sea"],
    population: "1.8M",
    deliveryDays: "1",
  },
  {
    slug: "hertfordshire",
    name: "Hertfordshire",
    region: "East of England",
    majorCities: ["St Albans", "Watford", "Hemel Hempstead"],
    population: "1.2M",
    deliveryDays: "1",
  },
  {
    slug: "suffolk",
    name: "Suffolk",
    region: "East of England",
    majorCities: ["Ipswich", "Bury St Edmunds", "Lowestoft"],
    population: "760K",
    deliveryDays: "1-2",
  },
  {
    slug: "norfolk",
    name: "Norfolk",
    region: "East of England",
    majorCities: ["Norwich", "Great Yarmouth", "King's Lynn"],
    population: "910K",
    deliveryDays: "1-2",
  },
  {
    slug: "cambridgeshire",
    name: "Cambridgeshire",
    region: "East of England",
    majorCities: ["Cambridge", "Peterborough", "Ely"],
    population: "850K",
    deliveryDays: "1-2",
  },

  // ─── England: South West ──────────────────────────────────────────
  {
    slug: "devon",
    name: "Devon",
    region: "South West",
    majorCities: ["Exeter", "Plymouth", "Torquay"],
    population: "1.2M",
    deliveryDays: "1-2",
  },
  {
    slug: "cornwall",
    name: "Cornwall",
    region: "South West",
    majorCities: ["Truro", "Falmouth", "Penzance"],
    population: "570K",
    deliveryDays: "2-3",
  },
  {
    slug: "somerset",
    name: "Somerset",
    region: "South West",
    majorCities: ["Taunton", "Bath", "Yeovil"],
    population: "560K",
    deliveryDays: "1-2",
  },
  {
    slug: "dorset",
    name: "Dorset",
    region: "South West",
    majorCities: ["Bournemouth", "Poole", "Dorchester"],
    population: "770K",
    deliveryDays: "1-2",
  },
  {
    slug: "wiltshire",
    name: "Wiltshire",
    region: "South West",
    majorCities: ["Salisbury", "Swindon", "Trowbridge"],
    population: "500K",
    deliveryDays: "1-2",
  },
  {
    slug: "gloucestershire",
    name: "Gloucestershire",
    region: "South West",
    majorCities: ["Gloucester", "Cheltenham", "Stroud"],
    population: "640K",
    deliveryDays: "1-2",
  },

  // ─── England: West Midlands ───────────────────────────────────────
  {
    slug: "west-midlands",
    name: "West Midlands",
    region: "West Midlands",
    majorCities: ["Birmingham", "Coventry", "Wolverhampton"],
    population: "2.9M",
    deliveryDays: "1-2",
  },
  {
    slug: "worcestershire",
    name: "Worcestershire",
    region: "West Midlands",
    majorCities: ["Worcester", "Redditch", "Kidderminster"],
    population: "590K",
    deliveryDays: "1-2",
  },
  {
    slug: "warwickshire",
    name: "Warwickshire",
    region: "West Midlands",
    majorCities: ["Warwick", "Stratford-upon-Avon", "Nuneaton"],
    population: "580K",
    deliveryDays: "1-2",
  },
  {
    slug: "staffordshire",
    name: "Staffordshire",
    region: "West Midlands",
    majorCities: ["Stoke-on-Trent", "Stafford", "Lichfield"],
    population: "1.1M",
    deliveryDays: "1-2",
  },
  {
    slug: "shropshire",
    name: "Shropshire",
    region: "West Midlands",
    majorCities: ["Shrewsbury", "Telford", "Oswestry"],
    population: "500K",
    deliveryDays: "1-2",
  },

  // ─── England: East Midlands ───────────────────────────────────────
  {
    slug: "derbyshire",
    name: "Derbyshire",
    region: "East Midlands",
    majorCities: ["Derby", "Chesterfield", "Buxton"],
    population: "1.1M",
    deliveryDays: "1-2",
  },
  {
    slug: "nottinghamshire",
    name: "Nottinghamshire",
    region: "East Midlands",
    majorCities: ["Nottingham", "Mansfield", "Newark-on-Trent"],
    population: "1.1M",
    deliveryDays: "1-2",
  },
  {
    slug: "leicestershire",
    name: "Leicestershire",
    region: "East Midlands",
    majorCities: ["Leicester", "Loughborough", "Hinckley"],
    population: "1.0M",
    deliveryDays: "1-2",
  },
  {
    slug: "northamptonshire",
    name: "Northamptonshire",
    region: "East Midlands",
    majorCities: ["Northampton", "Kettering", "Corby"],
    population: "750K",
    deliveryDays: "1-2",
  },
  {
    slug: "lincolnshire",
    name: "Lincolnshire",
    region: "East Midlands",
    majorCities: ["Lincoln", "Grimsby", "Scunthorpe"],
    population: "770K",
    deliveryDays: "1-2",
  },

  // ─── England: North West ──────────────────────────────────────────
  {
    slug: "lancashire",
    name: "Lancashire",
    region: "North West",
    majorCities: ["Lancaster", "Preston", "Blackburn"],
    population: "1.5M",
    deliveryDays: "1-2",
  },
  {
    slug: "cheshire",
    name: "Cheshire",
    region: "North West",
    majorCities: ["Chester", "Crewe", "Warrington"],
    population: "1.1M",
    deliveryDays: "1-2",
  },
  {
    slug: "merseyside",
    name: "Merseyside",
    region: "North West",
    majorCities: ["Liverpool", "Birkenhead", "St Helens"],
    population: "1.4M",
    deliveryDays: "1-2",
  },
  {
    slug: "greater-manchester",
    name: "Greater Manchester",
    region: "North West",
    majorCities: ["Manchester", "Bolton", "Stockport"],
    population: "2.8M",
    deliveryDays: "1-2",
  },
  {
    slug: "cumbria",
    name: "Cumbria",
    region: "North West",
    majorCities: ["Carlisle", "Kendal", "Barrow-in-Furness"],
    population: "500K",
    deliveryDays: "2-3",
  },

  // ─── England: Yorkshire and the Humber ────────────────────────────
  {
    slug: "west-yorkshire",
    name: "West Yorkshire",
    region: "Yorkshire and the Humber",
    majorCities: ["Leeds", "Bradford", "Huddersfield"],
    population: "2.3M",
    deliveryDays: "1-2",
  },
  {
    slug: "south-yorkshire",
    name: "South Yorkshire",
    region: "Yorkshire and the Humber",
    majorCities: ["Sheffield", "Doncaster", "Rotherham"],
    population: "1.4M",
    deliveryDays: "1-2",
  },
  {
    slug: "north-yorkshire",
    name: "North Yorkshire",
    region: "Yorkshire and the Humber",
    majorCities: ["York", "Harrogate", "Scarborough"],
    population: "620K",
    deliveryDays: "1-2",
  },

  // ─── England: North East ──────────────────────────────────────────
  {
    slug: "tyne-and-wear",
    name: "Tyne and Wear",
    region: "North East",
    majorCities: ["Newcastle upon Tyne", "Sunderland", "Gateshead"],
    population: "1.1M",
    deliveryDays: "1-2",
  },
  {
    slug: "durham",
    name: "Durham",
    region: "North East",
    majorCities: ["Durham", "Darlington", "Hartlepool"],
    population: "530K",
    deliveryDays: "1-2",
  },

  // ─── Scotland ─────────────────────────────────────────────────────
  {
    slug: "highland",
    name: "Highland",
    region: "Scotland",
    majorCities: ["Inverness", "Fort William", "Thurso"],
    population: "235K",
    deliveryDays: "2-3",
  },
  {
    slug: "lothian",
    name: "Lothian",
    region: "Scotland",
    majorCities: ["Edinburgh", "Livingston", "Musselburgh"],
    population: "900K",
    deliveryDays: "1-2",
  },
  {
    slug: "fife",
    name: "Fife",
    region: "Scotland",
    majorCities: ["Dunfermline", "Kirkcaldy", "St Andrews"],
    population: "375K",
    deliveryDays: "2-3",
  },
  {
    slug: "aberdeenshire",
    name: "Aberdeenshire",
    region: "Scotland",
    majorCities: ["Aberdeen", "Peterhead", "Fraserburgh"],
    population: "260K",
    deliveryDays: "2-3",
  },
  {
    slug: "lanarkshire",
    name: "Lanarkshire",
    region: "Scotland",
    majorCities: ["Glasgow", "Hamilton", "Motherwell"],
    population: "660K",
    deliveryDays: "1-2",
  },

  // ─── Wales ────────────────────────────────────────────────────────
  {
    slug: "glamorgan",
    name: "Glamorgan",
    region: "Wales",
    majorCities: ["Cardiff", "Swansea", "Bridgend"],
    population: "1.3M",
    deliveryDays: "1-2",
  },
  {
    slug: "gwynedd",
    name: "Gwynedd",
    region: "Wales",
    majorCities: ["Bangor", "Caernarfon", "Pwllheli"],
    population: "125K",
    deliveryDays: "2-3",
  },
  {
    slug: "dyfed",
    name: "Dyfed",
    region: "Wales",
    majorCities: ["Carmarthen", "Haverfordwest", "Aberystwyth"],
    population: "380K",
    deliveryDays: "2-3",
  },

  // ─── Northern Ireland ─────────────────────────────────────────────
  {
    slug: "antrim",
    name: "Antrim",
    region: "Northern Ireland",
    majorCities: ["Belfast", "Lisburn", "Antrim"],
    population: "690K",
    deliveryDays: "2-3",
  },
];

export const COUNTY_SLUGS: string[] = UK_COUNTIES.map((county) => county.slug);

export function getCountyBySlug(slug: string): UKCounty | undefined {
  return UK_COUNTIES.find((county) => county.slug === slug);
}
