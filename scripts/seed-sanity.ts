import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "0ocr346c",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

// ─── Team Members ────────────────────────────────────────────────────────────

const teamMembers = [
  {
    _type: "teamMember",
    name: "Manish Mardia",
    slug: { _type: "slug", current: "manish-mardia" },
    title: "President and Principal-In-Charge",
    credentials: "P.E.",
    shortBio:
      "Louisiana and Mississippi registered Professional Engineer with 35+ years of experience in drainage design, environmental engineering, civil engineering, and water and sewer projects. Founded MSMM Engineering in 2011.",
    displayOrder: 1,
    yearsOfExperience: 35,
    specialties: ["Drainage Design", "Environmental Engineering", "Water & Sewer", "Civil Engineering"],
    licenses: ["Louisiana P.E.", "Mississippi P.E."],
  },
  {
    _type: "teamMember",
    name: "Mark Wingate",
    slug: { _type: "slug", current: "mark-wingate" },
    title: "Executive Vice President",
    credentials: "P.E.",
    shortBio:
      "Licensed Professional Engineer with 30+ years of federal service with USACE New Orleans District, including 8+ years as Deputy District Engineer. Extensive experience in flood risk management and coastal restoration.",
    displayOrder: 2,
    yearsOfExperience: 30,
    specialties: ["Flood Risk Management", "Coastal Restoration", "Project Management", "Federal Programs"],
    licenses: ["Louisiana P.E."],
  },
  {
    _type: "teamMember",
    name: "Jim Wilson",
    slug: { _type: "slug", current: "jim-wilson" },
    title: "Vice President and Senior Engineer",
    credentials: "P.E., LEED AP",
    shortBio:
      "Senior civil/drainage engineer with 34+ years in the public sector designing and managing drainage, sewerage, roadway, and site development projects across South Louisiana.",
    displayOrder: 3,
    yearsOfExperience: 34,
    specialties: ["Civil/Drainage Engineering", "Site Development", "Master Planning", "Roadway Design"],
    licenses: ["Louisiana P.E."],
  },
  {
    _type: "teamMember",
    name: "Scott Chehardy",
    slug: { _type: "slug", current: "scott-chehardy" },
    title: "Vice President and Senior Engineer",
    credentials: "P.E.",
    shortBio:
      "Senior civil engineer with 23+ years designing and managing projects throughout South Louisiana. Recognized drainage expert post-Hurricane Katrina with expertise in pump station design and hydraulic evaluation.",
    displayOrder: 4,
    yearsOfExperience: 23,
    specialties: ["Water & Sewer Systems", "Pump Station Design", "Hydraulic Evaluation", "Drainage Design"],
    licenses: ["Louisiana P.E."],
  },
  {
    _type: "teamMember",
    name: "Dr. Marty Tittlebaum",
    slug: { _type: "slug", current: "marty-tittlebaum" },
    title: "Senior Engineer",
    credentials: "P.E.",
    shortBio:
      "Former Edward G. Schlieder Chair for Urban Waste Management and Professor of Civil and Environmental Engineering at the University of New Orleans. Recipient of over $8M in research funding with expertise in environmental engineering and hazardous waste.",
    displayOrder: 5,
    yearsOfExperience: 30,
    specialties: ["Environmental Engineering", "Hazardous Waste", "Water/Wastewater Treatment", "Research"],
    licenses: ["P.E."],
  },
];

// ─── Projects (31 real projects from msmmeng.com) ────────────────────────────

const projects = [
  // ── Public Infrastructure (9) ──
  {
    _type: "project",
    name: "Bayou Segnette State Park Improvements",
    slug: { _type: "slug", current: "bayou-segnette-state-park" },
    category: ["Public Infrastructure"],
    client: "Louisiana State Parks",
    location: "Westwego, LA",
    shortDescription:
      "Comprehensive park improvement initiative addressing playground enhancements, boat launch upgrades, culvert replacement, cabin roadway improvements, and bridge approach replacements. Playground included ADA-compliant regrading, rubberized surfacing, new sidewalks, and drainage improvements. Boat launch involved asphalt resurfacing, LED lighting, and covered weather-protected structure.",
    status: "Completed",
    yearCompleted: 2024,
    servicesProvided: ["Public Infrastructure", "Engineering Design", "Construction Administration"],
    featured: false,
    displayOrder: 1,
  },
  {
    _type: "project",
    name: "Bourbon Street Resident Inspection",
    slug: { _type: "slug", current: "bourbon-street-resident-inspection" },
    category: ["Public Infrastructure"],
    client: "City of New Orleans",
    location: "New Orleans, LA",
    shortDescription:
      "Resident inspection services for a design-build construction project on Bourbon Street. MSMM deployed two resident inspectors managing up to three crews operating 6-7 days weekly with daily field reporting to the City of New Orleans Department of Public Works.",
    status: "Completed",
    yearCompleted: 2017,
    servicesProvided: ["Public Infrastructure", "Resident Inspection", "Construction Oversight"],
    featured: false,
    displayOrder: 2,
  },
  {
    _type: "project",
    name: "Granger Lake Management Office Building Design",
    slug: { _type: "slug", current: "granger-lake-office-building" },
    category: ["Public Infrastructure"],
    client: "USACE Ft. Worth District",
    location: "Granger, TX",
    shortDescription:
      "Designed new 4,856 SF single-story lake management facilities including demolition of existing 5,890 SF facility. Features offices for management staff and a conference room for up to 60 people, with site development, utilities, landscaping, paving, and force protection measures.",
    status: "Completed",
    yearCompleted: 2019,
    servicesProvided: ["Public Infrastructure", "Architectural Design", "Civil/Structural Engineering"],
    featured: false,
    displayOrder: 3,
  },
  {
    _type: "project",
    name: "Dallas Floodway Extension Recreation Design",
    slug: { _type: "slug", current: "dallas-floodway-recreation" },
    category: ["Public Infrastructure"],
    client: "USACE Ft. Worth District / City of Dallas",
    location: "Dallas, TX",
    shortDescription:
      "Planning and design of recreational components on a former golf course in South Dallas along the Trinity River. Included 12+ miles of multi-use trails, three bridge designs, elevated boardwalk, parking lot restoration, birdwatching platforms, and wildflower areas.",
    status: "Completed",
    yearCompleted: 2020,
    servicesProvided: ["Public Infrastructure", "Bridge Design", "H & H Modeling"],
    featured: false,
    displayOrder: 4,
  },
  {
    _type: "project",
    name: "Nicolle Boulevard Resurfacing",
    slug: { _type: "slug", current: "nicolle-boulevard-resurfacing" },
    category: ["Public Infrastructure"],
    client: "City of Westwego",
    location: "Westwego, LA",
    shortDescription:
      "Boulevard reconstruction involving mill and overlay operations with glass grid to prevent reflective cracking, plus a left turn lane for the Technology Center. Second phase included full concrete roadway replacement including driveway aprons, sidewalks, and handicap ramps.",
    status: "Completed",
    yearCompleted: undefined,
    servicesProvided: ["Public Infrastructure", "Engineering Design", "Construction Administration"],
    featured: false,
    displayOrder: 5,
  },
  {
    _type: "project",
    name: "FEMA JIRR — West End Group B (RR194)",
    slug: { _type: "slug", current: "fema-jirr-west-end-group-b" },
    category: ["Public Infrastructure"],
    client: "City of New Orleans — Department of Public Works",
    location: "West End, New Orleans, LA",
    shortDescription:
      "Full engineering design for more than 11.5 miles of city streets (approximately 120 city blocks). Engineers evaluated damages, created initial design layouts for FEMA approval, and designed replacement streets with drainage systems handling a 10-year, 24-hour storm event.",
    status: "Completed",
    yearCompleted: undefined,
    servicesProvided: ["Public Infrastructure", "Drainage Design", "Construction Administration"],
    featured: false,
    displayOrder: 6,
  },
  {
    _type: "project",
    name: "FEMA JIRR — Lower 9th Ward NW Group D (RR111)",
    slug: { _type: "slug", current: "fema-jirr-lower-9th-ward-group-d" },
    category: ["Public Infrastructure"],
    client: "City of New Orleans — Department of Public Works",
    location: "Lower Ninth Ward, New Orleans, LA",
    shortDescription:
      "Comprehensive engineering design and construction administration for street infrastructure restoration across multiple blocks. Included concrete/asphalt surfaces, curbs, driveways, sidewalks, water and sewer relocations, catch basins, and stormwater piping.",
    status: "Completed",
    yearCompleted: undefined,
    servicesProvided: ["Public Infrastructure", "Street Design", "Water & Sewer Relocation"],
    featured: false,
    displayOrder: 7,
  },
  {
    _type: "project",
    name: "FEMA JIRR — Lower 9th Ward South Group E (RR115)",
    slug: { _type: "slug", current: "fema-jirr-lower-9th-ward-group-e" },
    category: ["Public Infrastructure"],
    client: "City of New Orleans — Department of Public Works",
    location: "Lower Ninth Ward, New Orleans, LA",
    shortDescription:
      "Street infrastructure restoration in the Lower Ninth Ward including concrete and asphalt surfaces, drainage systems, water and sewer relocations, and stormwater piping designed for 10-year, 24-hour storm events.",
    status: "Completed",
    yearCompleted: undefined,
    servicesProvided: ["Public Infrastructure", "Engineering Design", "Construction Administration"],
    featured: false,
    displayOrder: 8,
  },
  {
    _type: "project",
    name: "FEMA JIRR — West End Group D (RR196)",
    slug: { _type: "slug", current: "fema-jirr-west-end-group-d" },
    category: ["Public Infrastructure"],
    client: "City of New Orleans — Department of Public Works",
    location: "West End, New Orleans, LA",
    shortDescription:
      "Street infrastructure restoration in the West End neighborhood including full engineering design for city streets with drainage systems, curbs, sidewalks, and utility relocations.",
    status: "Completed",
    yearCompleted: undefined,
    servicesProvided: ["Public Infrastructure", "Engineering Design", "Construction Administration"],
    featured: false,
    displayOrder: 9,
  },

  // ── Flood Control (3) ──
  {
    _type: "project",
    name: "Cow Bayou Drainage Pump Station Complex",
    slug: { _type: "slug", current: "cow-bayou-pump-station" },
    category: ["Flood Control"],
    client: "USACE New Orleans District / Galveston District",
    location: "Orange, TX",
    shortDescription:
      "Part of an integrated design team for a comprehensive flood control facility encompassing levee tie-ins, floodwalls, sluice gate structures, and a sector gate. Centerpiece pump station comprises five 1,365 CFS horizontal vacuum-primed pumps and three 455 CFS vertical self-priming pumps (total 8,190 CFS capacity). Reinforced concrete structure measures 250 FT wide by 128 FT long.",
    status: "In Progress",
    yearCompleted: undefined,
    servicesProvided: ["Flood Control", "Structural Design", "3D Modeling"],
    featured: true,
    displayOrder: 10,
    metaTitle: "Cow Bayou Pump Station | MSMM Engineering",
    metaDescription: "8,190 CFS pump station complex designed for USACE as part of the Sabine to Galveston Cow Bayou flood control project.",
  },
  {
    _type: "project",
    name: "Dallas Floodway 277K Levee Raise and Delta Pump Station",
    slug: { _type: "slug", current: "dallas-floodway-levee-raise" },
    category: ["Flood Control"],
    client: "USACE Ft. Worth District",
    location: "Dallas, TX",
    shortDescription:
      "Two Design-Build projects: 277K Levee Raise involving civil design on existing East and West Dallas floodway levees at 25 locations spanning over 41,000 feet, and Delta Pump Station replacement. Combined contract value of $41M.",
    status: "Completed",
    yearCompleted: 2021,
    servicesProvided: ["Flood Control", "Design-Build", "H & H Modeling"],
    featured: true,
    displayOrder: 11,
    metaTitle: "Dallas Floodway Levee Raise | MSMM Engineering",
    metaDescription: "277K Levee Raise and Delta Pump Station rehabilitation for USACE Ft. Worth District.",
  },
  {
    _type: "project",
    name: "Farmsite Road Canal Crossing Culvert",
    slug: { _type: "slug", current: "farmsite-road-culvert" },
    category: ["Flood Control"],
    client: "St. Bernard Parish",
    location: "Violet, LA",
    shortDescription:
      "Replacement of an undersized culvert at the intersection of Farmsite Road and Green Avenue Canal. Conducted comprehensive hydraulic analysis and designed a pre-cast arch culvert bridge system approved by FEMA.",
    status: "Completed",
    yearCompleted: 2020,
    servicesProvided: ["Flood Control", "Hydraulic Modeling", "Structural Design"],
    featured: false,
    displayOrder: 12,
  },

  // ── Water & Wastewater (7) ──
  {
    _type: "project",
    name: "Hillaryville Liftstation and Forcemain",
    slug: { _type: "slug", current: "hillaryville-liftstation" },
    category: ["Water & Wastewater"],
    client: "USACE New Orleans District",
    location: "Hillaryville, Ascension Parish, LA",
    shortDescription:
      "Addressed antiquated wastewater infrastructure preventing parish growth. Completed infrastructure includes a 562 GPM pump station and approximately 4,068 linear feet of discharge piping using ductile iron and HDPE directional drilling beneath state highways and MS River Levee.",
    status: "Completed",
    yearCompleted: 2016,
    servicesProvided: ["Water & Wastewater", "GIS Mapping", "Construction Management"],
    featured: false,
    displayOrder: 13,
  },
  {
    _type: "project",
    name: "Hillaryville Regional Wastewater Treatment Plant",
    slug: { _type: "slug", current: "hillaryville-wwtp" },
    category: ["Water & Wastewater"],
    client: "Ascension Parish Government / USACE",
    location: "Ascension Parish, LA",
    shortDescription:
      "Design of a regional WWTP on an 8-acre parcel to consolidate a fragmented system of septic tanks and package treatment plants. Capacity: 1.8 MGD average daily flow, expandable to 2.7 MGD. Components include influent pump station, oxidation ditches, clarifiers, UV disinfection, and aerobic digesters.",
    status: "Completed",
    yearCompleted: 2021,
    servicesProvided: ["Water & Wastewater", "Engineering Design", "Permitting"],
    featured: true,
    displayOrder: 14,
    metaTitle: "Hillaryville WWTP | MSMM Engineering",
    metaDescription: "1.8 MGD wastewater treatment plant design for Ascension Parish, expandable to 2.7 MGD.",
  },
  {
    _type: "project",
    name: "Kennedy Heights Liftstation C9-2 Rehabilitation",
    slug: { _type: "slug", current: "kennedy-heights-liftstation" },
    category: ["Water & Wastewater"],
    client: "Jefferson Parish Department of Sewerage",
    location: "Westwego, LA",
    shortDescription:
      "Engineering design for sewer lift station rehabilitation. Scope included pump replacement, control panel replacement, discharge piping and valve replacement, sluice gate replacement, influent junction box rehabilitation, and wet well manhole cover upgrades.",
    status: "Completed",
    yearCompleted: 2020,
    servicesProvided: ["Water & Wastewater", "Engineering Design", "Construction Administration"],
    featured: false,
    displayOrder: 15,
  },
  {
    _type: "project",
    name: "PUA & ACUD #1 Water Meter Replacements",
    slug: { _type: "slug", current: "ascension-water-meter-replacements" },
    category: ["Water & Wastewater"],
    client: "USACE New Orleans District / Ascension Parish",
    location: "Ascension Parish, LA",
    shortDescription:
      "Replacement of approximately 3,500 outdated, manually-read water meters (underreporting usage by ~30%) with modern meter systems including new meter boxes, encoder registers, antenna installations, and 4 fixed-location data collection devices on water towers.",
    status: "In Progress",
    yearCompleted: undefined,
    servicesProvided: ["Water & Wastewater", "Engineering Design", "Construction Services"],
    featured: false,
    displayOrder: 16,
  },
  {
    _type: "project",
    name: "39th Street and Power Boulevard Sewer Lift Station",
    slug: { _type: "slug", current: "39th-street-sewer-lift-station" },
    category: ["Water & Wastewater"],
    client: "City of Kenner",
    location: "Kenner, LA",
    shortDescription:
      "Rehabilitation of a duplex self-priming pump station with buried concrete wetwell. Work included refurbishing pumps, increasing impeller size, motor upgrades, new control panel with VFDs, SCADA system upgrade, and emergency pump out addition.",
    status: "Completed",
    yearCompleted: 2019,
    servicesProvided: ["Water & Wastewater", "Pump Station Design", "SCADA Integration"],
    featured: false,
    displayOrder: 17,
  },
  {
    _type: "project",
    name: "Causeway Boulevard and Scott Street Sewer Lift Station",
    slug: { _type: "slug", current: "causeway-scott-sewer-lift-station" },
    category: ["Water & Wastewater"],
    client: "Jefferson Parish Department of Sewerage",
    location: "Metairie, LA",
    shortDescription:
      "Rehabilitation of an existing submersible pump station with buried fiberglass wetwell. Scope included pump replacement, control panel replacement, discharge piping, access hatch elevation to prevent floodwater intrusion, area repaving, and odor control system addition.",
    status: "Completed",
    yearCompleted: 2022,
    servicesProvided: ["Water & Wastewater", "Pump Station Design", "Flood Mitigation"],
    featured: false,
    displayOrder: 18,
  },
  {
    _type: "project",
    name: "Jefferson Parish Sewer Infiltration and Inflow Management (Phase 2)",
    slug: { _type: "slug", current: "jefferson-parish-sewer-ii-phase2" },
    category: ["Water & Wastewater"],
    client: "Jefferson Parish",
    location: "Jefferson Parish, LA",
    shortDescription:
      "Updated hydraulic model reflecting recent construction to prioritize remaining problem areas in the wastewater collection system. Identified areas requiring improvements and recommended rehabilitation strategies.",
    status: "In Progress",
    yearCompleted: undefined,
    servicesProvided: ["Water & Wastewater", "Hydraulic Modeling", "System Evaluation"],
    featured: false,
    displayOrder: 19,
  },

  // ── Ecosystem Restoration (4) ──
  {
    _type: "project",
    name: "River Road Aquatic Ecosystem Restoration",
    slug: { _type: "slug", current: "river-road-ecosystem-restoration" },
    category: ["Ecosystem Restoration"],
    client: "USACE / San Antonio River Authority",
    location: "San Antonio, TX",
    shortDescription:
      "Design-Bid-Build services under a joint venture for a Section 206 initiative. Includes riparian habitat restoration in Davis Park, complete removal of Avenue A, replacement of three low water crossings with pedestrian bridges, and design of recreational features.",
    status: "In Progress",
    yearCompleted: undefined,
    servicesProvided: ["Ecosystem Restoration", "Engineering Design", "Bridge Design"],
    featured: false,
    displayOrder: 20,
  },
  {
    _type: "project",
    name: "Blue and Green Corridors Stormwater Resilience",
    slug: { _type: "slug", current: "blue-green-corridors" },
    category: ["Ecosystem Restoration", "Public Infrastructure"],
    client: "City of New Orleans — Department of Public Works",
    location: "Gentilly, New Orleans, LA",
    shortDescription:
      "Creation of canals (blue corridors) and vegetation/parks (green corridors) within neutral grounds on Robert E. Lee Boulevard and Elysian Fields Avenue. MSMM provided electrical design, site lighting, power systems for pump stations, pedestrian countdowns, aeration systems, and waterfall pumps.",
    status: "Completed",
    yearCompleted: 2021,
    servicesProvided: ["Ecosystem Restoration", "Electrical Design", "Site Lighting"],
    featured: true,
    displayOrder: 21,
  },
  {
    _type: "project",
    name: "East Baton Rouge Parish North Landfill Leachate Pond Abandonment",
    slug: { _type: "slug", current: "ebr-landfill-leachate-pond" },
    category: ["Ecosystem Restoration"],
    client: "USACE New Orleans District / East Baton Rouge Parish",
    location: "Baton Rouge, LA",
    shortDescription:
      "Closure and abandonment of three surface treatment ponds at a landfill. Construction of a forcemain and pump station modifications connecting to city-parish sanitary sewer. Addresses pond drainage, sewage sludge removal, HDPE liner extraction, and site restoration across approximately 6 acres.",
    status: "Completed",
    yearCompleted: 2022,
    servicesProvided: ["Ecosystem Restoration", "Engineering Design", "Environmental Assessment"],
    featured: false,
    displayOrder: 22,
  },
  {
    _type: "project",
    name: "Calcasieu Ship Channel Salinity Control",
    slug: { _type: "slug", current: "calcasieu-salinity-control" },
    category: ["Ecosystem Restoration"],
    client: "CPRA",
    location: "Calcasieu Parish, LA",
    shortDescription:
      "Managing salinity to reduce wetland loss within the Calcasieu-Sabine watershed. Designing two features (West Pass and Joe's Cut) encompassing approximately 3,000 feet of combi-walls (combination pipe piles and sheet piling) for salinity control and shoreline protection.",
    status: "In Progress",
    yearCompleted: undefined,
    servicesProvided: ["Ecosystem Restoration", "Coastal Engineering", "Geotechnical Investigation"],
    featured: false,
    displayOrder: 23,
  },

  // ── Coastal Restoration (2) ──
  {
    _type: "project",
    name: "Golden Triangle Marsh Creation (PO-163)",
    slug: { _type: "slug", current: "golden-triangle-marsh-creation" },
    category: ["Coastal Restoration"],
    client: "USACE New Orleans District / CPRA",
    location: "Lake Borgne, LA",
    shortDescription:
      "Marsh restoration designed to restore approximately 4,000 acres of intermediate to brackish marsh. Features perimeter dikes, vinyl sheet closure pile structures, and internal weirs. Conceived as part of the Multiple Lines of Defense hurricane risk reduction strategy. Currently under construction through the RESTORE Act program.",
    status: "In Progress",
    yearCompleted: undefined,
    servicesProvided: ["Coastal Restoration", "Field Investigations", "Geotechnical Engineering"],
    featured: true,
    displayOrder: 24,
    metaTitle: "Golden Triangle Marsh Creation | MSMM Engineering",
    metaDescription: "Restoring 4,000 acres of marsh under the RESTORE Act near Lake Borgne, Louisiana.",
  },
  {
    _type: "project",
    name: "Lake Mechant Landbridge Restoration",
    slug: { _type: "slug", current: "lake-mechant-landbridge" },
    category: ["Coastal Restoration"],
    client: "CPRA",
    location: "Terrebonne Parish, LA",
    shortDescription:
      "Restoration of a damaged sheet pile plug structure between Lake Pagie and Lake Mechant. Original 280-foot structure was severely damaged during Hurricane Isaac (2012). Designed a combi-wall structure with large stone reinforcement to withstand extreme storm surge, wind, and flooding.",
    status: "Completed",
    yearCompleted: 2020,
    servicesProvided: ["Coastal Restoration", "Structural Design", "Hydrographic Survey"],
    featured: false,
    displayOrder: 25,
  },

  // ── H & H Modeling (3) ──
  {
    _type: "project",
    name: "Silver Jackets — Jefferson Parish Green Infrastructure & Watershed Master Plan",
    slug: { _type: "slug", current: "silver-jackets-jp-watershed" },
    category: ["H & H Modeling"],
    client: "USACE / Jefferson Parish",
    location: "Jefferson Parish, LA",
    shortDescription:
      "Comprehensive Watershed Master Plan incorporating green infrastructure elements including permeable pavement, bioretention areas, bioswales, rain gardens, pump stations, and conveyance systems. Goals: reduce peak storm conditions, prepare for sea level rise, and assist residents in lowering flood insurance rates.",
    status: "In Progress",
    yearCompleted: undefined,
    servicesProvided: ["H & H Modeling", "Green Infrastructure", "Floodplain Management"],
    featured: false,
    displayOrder: 26,
  },
  {
    _type: "project",
    name: "Southern University Ravine and Riverbank Instability Assessment",
    slug: { _type: "slug", current: "southern-university-riverbank" },
    category: ["H & H Modeling"],
    client: "Southern University Baton Rouge",
    location: "Baton Rouge, LA",
    shortDescription:
      "Planning Assistance to States (PAS) project addressing safety hazards on campus situated ~65 feet above the Mississippi River on the outside bend of a 110-degree river curve. Issues include riverbank erosion, a 45-foot deep ravine with bidirectional flow, and rapid drawdown instability.",
    status: "Completed",
    yearCompleted: 2022,
    servicesProvided: ["H & H Modeling", "Technical Assessment", "GIS Modeling"],
    featured: false,
    displayOrder: 27,
  },
  {
    _type: "project",
    name: "Coventry Court Drainage Evaluation and Subsurface Design",
    slug: { _type: "slug", current: "coventry-court-drainage" },
    category: ["H & H Modeling"],
    client: "Jefferson Parish District 2",
    location: "River Ridge, LA",
    shortDescription:
      "Following recurring street flooding, developed a comprehensive feasibility study evaluating 10-year, 50-year, and 100-year storm events. Recommended a new 90 CFS drainage pump station (expandable to 120 CFS), a 48-foot open-cut discharge forcemain, and upgraded drainage crossings.",
    status: "Completed",
    yearCompleted: 2018,
    servicesProvided: ["H & H Modeling", "HEC-RAS Modeling", "Feasibility Analysis"],
    featured: false,
    displayOrder: 28,
  },

  // ── Database/GIS Mapping (3) ──
  {
    _type: "project",
    name: "CWPPRA Program Scanning, Digitizing, and Document Control System",
    slug: { _type: "slug", current: "cwppra-document-control" },
    category: ["Database/GIS Mapping"],
    client: "USACE New Orleans District",
    location: "New Orleans, LA",
    shortDescription:
      "Managing critical documentation for the Coastal Wetlands Planning, Protection, and Restoration Act (CWPPRA). Inventory analysis, archiving and indexing of materials. Prepared the 21st Priority Project List report per Public Law 101-646 including project descriptions, environmental benefit determinations, and cost estimates.",
    status: "Completed",
    yearCompleted: undefined,
    servicesProvided: ["Database/GIS Mapping", "Document Scanning", "Project Management"],
    featured: false,
    displayOrder: 29,
  },
  {
    _type: "project",
    name: "Jefferson Parish Sewer Infiltration and Inflow Management (GIS)",
    slug: { _type: "slug", current: "jefferson-parish-sewer-ii-gis" },
    category: ["Database/GIS Mapping"],
    client: "Jefferson Parish",
    location: "Jefferson Parish, LA",
    shortDescription:
      "Comprehensive field surveys of the wastewater collection system examining nearly 6,000 manholes and over 250 pump stations. GPS data mapped within ArcGIS, then hydraulic modeling using InfoWorks identified problem areas. Analysis found 20 SSO areas requiring ~$21.9M in improvements.",
    status: "In Progress",
    yearCompleted: undefined,
    servicesProvided: ["Database/GIS Mapping", "GPS Survey", "Hydraulic Modeling"],
    featured: false,
    displayOrder: 30,
  },
  {
    _type: "project",
    name: "Chitimacha Tribe Sanitary Sewer Data Collection",
    slug: { _type: "slug", current: "chitimacha-tribe-sewer-data" },
    category: ["Database/GIS Mapping"],
    client: "Sovereign Nation of the Chitimacha Tribe",
    location: "Charenton, LA",
    shortDescription:
      "Assessment of current sewer infrastructure, cataloging existing information, and developing CAD and GIS data sets for tribal infrastructure planning. Created databases incorporating as-built drawings, field assessments, LIDAR aerial photography, and customized reporting tools.",
    status: "Completed",
    yearCompleted: 2022,
    servicesProvided: ["Database/GIS Mapping", "GIS/CAD Development", "LIDAR Photography"],
    featured: false,
    displayOrder: 31,
  },
];

// ─── Site Settings ───────────────────────────────────────────────────────────

const siteSettings = {
  _type: "siteSettings",
  _id: "siteSettings",
  yearsInBusiness: 14,
  projectsCompleted: 250,
  combinedExperience: 150,
  teamMembers: 20,
  announcementBanner: "",
  bannerActive: false,
};

// ─── Seed Function ───────────────────────────────────────────────────────────

async function seed() {
  console.log("Seeding Sanity content...\n");

  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("SANITY_WRITE_TOKEN is required. Set it as an environment variable.");
    console.error("   Create a token at: https://www.sanity.io/manage/project/0ocr346c/api#tokens");
    console.error("   Make sure to select 'Editor' permissions.\n");
    console.error("   Usage: SANITY_WRITE_TOKEN=your-token npx tsx scripts/seed-sanity.ts");
    process.exit(1);
  }

  // Site Settings
  console.log("Creating site settings...");
  await client.createOrReplace(siteSettings);
  console.log("  Done\n");

  // Team Members
  console.log("Creating team members...");
  for (const member of teamMembers) {
    const result = await client.create(member);
    console.log(`  + ${member.name} (${result._id})`);
  }
  console.log(`  ${teamMembers.length} team members created\n`);

  // Projects
  console.log("Creating projects...");
  for (const project of projects) {
    const result = await client.create(project);
    console.log(`  + ${project.name} (${result._id})`);
  }
  console.log(`  ${projects.length} projects created\n`);

  console.log("Seeding complete!");
  console.log(`  - ${teamMembers.length} team members`);
  console.log(`  - ${projects.length} projects`);
  console.log(`  - 1 site settings document`);
  console.log(`  Total: ${teamMembers.length + projects.length + 1} documents`);
}

seed().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});
