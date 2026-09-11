"use strict";

/* ============ TACTICAL AUDIO ENGINE ============ */
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
}

// Crisp, high-tech beep for general UI interactions
function playTacticalBeep() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime); // High pitch (A5)
    osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

// Deep, resonant chime for alerts and modals
function playAlertChime() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, audioCtx.currentTime); // Low pitch (A3)
    osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.4);
    
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
}

// Initialize audio context on the first click
document.addEventListener('click', initAudio, { once: true });


/* ============ DATA ENGINE ============ */
const REGIONS = {
    "NAMER": { 
        name: "North America", lat: 40.0, lon: -100.0, risk: "low", score: 28, color: "#34d399", hubs: ["New York", "Silicon Valley"], gdp: "28.1", supply: 85,
        macro: { leader: "President / PM", leaderName: "Joe Biden / J. Trudeau", edu: "Advanced (Tier 1)", eduIndex: "HDI: 0.926", rank: "1st", rankDesc: "Global GDP & Innovation" },
        companies: [
            { name: "Apple Inc.", owner: "Tim Cook (CEO)", ticker: "AAPL", cap: "$3.3T" },
            { name: "Microsoft", owner: "Satya Nadella (CEO)", ticker: "MSFT", cap: "$3.1T" },
            { name: "NVIDIA", owner: "Jensen Huang (CEO)", ticker: "NVDA", cap: "$3.0T" },
            { name: "Alphabet (Google)", owner: "Sundar Pichai (CEO)", ticker: "GOOGL", cap: "$2.0T" },
            { name: "Amazon", owner: "Jeff Bezos (Founder)", ticker: "AMZN", cap: "$1.9T" },
            { name: "Meta Platforms", owner: "Mark Zuckerberg", ticker: "META", cap: "$1.2T" },
            { name: "Tesla", owner: "Elon Musk (CEO)", ticker: "TSLA", cap: "$700B" },
            { name: "Berkshire Hathaway", owner: "Warren Buffett", ticker: "BRK.A", cap: "$900B" }
        ]
    },
    "AFR": { 
        name: "Africa", lat: 9.0320, lon: 38.7469, risk: "high", score: 72, color: "#ef4444", hubs: ["Johannesburg", "Lagos", "Cairo"], gdp: "3.1", supply: 58,
        macro: { leader: "AU Chairperson", leaderName: "Moussa Faki Mahamat", edu: "Emerging (Tier 3)", eduIndex: "HDI: 0.540", rank: "8th", rankDesc: "Continental GDP" },
        companies: [
            { name: "AngloGold Ashanti", owner: "Alberto Calderon (CEO)", ticker: "ANG", cap: "$42.4B" },
            { name: "Naspers", owner: "Phuthi Mahanyele (CEO)", ticker: "NPN", cap: "$37.6B" },
            { name: "FirstRand", owner: "Mary Vilakazi (CEO)", ticker: "FSR", cap: "$34.1B" },
            { name: "Standard Bank Group", owner: "Sim Tshabalala (CEO)", ticker: "SBK", cap: "$32.3B" },
            { name: "Capitec Bank", owner: "Gerrie Fourie (CEO)", ticker: "CPI", cap: "$31.0B" },
            { name: "Gold Fields", owner: "Mike Fraser (CEO)", ticker: "GFI", cap: "$30.9B" },
            { name: "MTN Group", owner: "Ralph Mupita (CEO)", ticker: "MTN", cap: "$25.5B" },
            { name: "Vodacom Group", owner: "Shameel Joosub (CEO)", ticker: "VOD", cap: "$18.1B" }
        ]
    },
    "SAMER": { 
        name: "South America", lat: -15.0, lon: -60.0, risk: "med", score: 55, color: "#f59e0b", hubs: ["São Paulo", "Santiago"], gdp: "4.2", supply: 66,
        macro: { leader: "Regional Leadership", leaderName: "L. Inácio Lula da Silva (BR)", edu: "Developing (Tier 2)", eduIndex: "HDI: 0.758", rank: "8th", rankDesc: "Global GDP Bloc" },
        companies: [
            { name: "Petrobras", owner: "Brazilian Government", ticker: "PBR", cap: "$100B" },
            { name: "Vale S.A.", owner: "Public / Institutional", ticker: "VALE", cap: "$55B" },
            { name: "Itau Unibanco", owner: "Setubal Family", ticker: "ITUB", cap: "$50B" },
            { name: "Mercado Libre", owner: "Marcos Galperin", ticker: "MELI", cap: "$95B" },
            { name: "Ambev", owner: "3G Capital", ticker: "ABEV", cap: "$35B" },
            { name: "B3 S.A.", owner: "Public Exchange", ticker: "B3SA3", cap: "$20B" },
            { name: "Eletrobras", owner: "Public / Institutional", ticker: "EBR", cap: "$18B" },
            { name: "SQM (Chile)", owner: "Ponce Lerou Family", ticker: "SQM", cap: "$12B" }
        ]
    },
    "EMEA":  { 
        name: "Europe", lat: 50.0, lon: 10.0, risk: "med", score: 62, color: "#f59e0b", hubs: ["London", "Frankfurt"], gdp: "24.5", supply: 70,
        macro: { leader: "EU Commission Pres.", leaderName: "Ursula von der Leyen", edu: "Advanced (Tier 1)", eduIndex: "HDI: 0.896", rank: "3rd", rankDesc: "Global GDP Bloc" },
        companies: [
            { name: "ASML Holding", owner: "Public / Institutional", ticker: "ASML", cap: "$380B" },
            { name: "LVMH", owner: "Bernard Arnault Family", ticker: "MC.PA", cap: "$350B" },
            { name: "Nestlé", owner: "Public / Institutional", ticker: "NESN", cap: "$270B" },
            { name: "SAP SE", owner: "Hasso Plattner", ticker: "SAP", cap: "$230B" },
            { name: "Shell plc", owner: "Institutional", ticker: "SHEL", cap: "$220B" },
            { name: "Novartis", owner: "Institutional", ticker: "NOVN", cap: "$210B" },
            { name: "TotalEnergies", owner: "Institutional", ticker: "TTE", cap: "$150B" },
            { name: "Siemens", owner: "Institutional", ticker: "SIE", cap: "$140B" }
        ]
    },
    "MENA":  { 
        name: "Middle East", lat: 25.0, lon: 45.0, risk: "high", score: 88, color: "#f43f5e", hubs: ["Dubai", "Riyadh"], gdp: "4.8", supply: 41,
        macro: { leader: "Key Monarchies/Pres.", leaderName: "Regional Leaders", edu: "Transitional (Tier 2)", eduIndex: "HDI: 0.805", rank: "12th", rankDesc: "Energy Export Index" },
        companies: [
            { name: "Saudi Aramco", owner: "Saudi Government", ticker: "2222.SR", cap: "$1.8T" },
            { name: "Al Rajhi Bank", owner: "Al Rajhi Family", ticker: "1120.SR", cap: "$90B" },
            { name: "International Holding Co.", owner: "Royal Group (UAE)", ticker: "IHC", cap: "$240B" },
            { name: "First Abu Dhabi Bank", owner: "Ruling Family (UAE)", ticker: "FAB", cap: "$35B" },
            { name: "Saudi National Bank", owner: "PIF Saudi Arabia", ticker: "1180.SR", cap: "$55B" },
            { name: "Qatar National Bank", owner: "QIA Qatar", ticker: "QNBK", cap: "$45B" },
            { name: "Emaar Properties", owner: "Mohamed Alabbar", ticker: "EMAAR", cap: "$22B" },
            { name: "SABIC", owner: "Saudi Aramco", ticker: "2010.SR", cap: "$65B" }
        ]
    },
    "APAC":  { 
        name: "Asia-Pacific", lat: 35.0, lon: 105.0, risk: "med", score: 58, color: "#f59e0b", hubs: ["Tokyo", "Taipei"], gdp: "30.5", supply: 62,
        macro: { leader: "Regional Leaders", leaderName: "Shigeru Ishiba (JP)", edu: "Highly Variable", eduIndex: "HDI: 0.770", rank: "2nd", rankDesc: "Global Manufacturing" },
        companies: [
            { name: "TSMC", owner: "Public / Institutional", ticker: "TSM", cap: "$850B" },
            { name: "Tencent", owner: "Ma Huateng", ticker: "0700.HK", cap: "$400B" },
            { name: "Samsung Electronics", owner: "Lee Family", ticker: "005930", cap: "$320B" },
            { name: "Toyota Motor", owner: "Toyoda Family", ticker: "7203.T", cap: "$270B" },
            { name: "Alibaba Group", owner: "Jack Ma / Partners", ticker: "BABA", cap: "$200B" },
            { name: "Sony Group", owner: "Institutional", ticker: "SONY", cap: "$110B" },
            { name: "Mitsubishi UFJ", owner: "Institutional", ticker: "8306.T", cap: "$120B" },
            { name: "Hon Hai (Foxconn)", owner: "Terry Gou", ticker: "2317.TW", cap: "$70B" }
        ]
    },
    "INDO":  { 
        name: "Indian Subcontinent", lat: 20.59, lon: 78.96, risk: "med", score: 45, color: "#f59e0b", hubs: ["Mumbai", "Chennai"], gdp: "3.7", supply: 72,
        macro: { leader: "Prime Minister", leaderName: "Narendra Modi", edu: "Developing (Tier 2)", eduIndex: "HDI: 0.633", rank: "5th", rankDesc: "Global GDP Rank" },
        companies: [
            { name: "Reliance Industries (Jio)", owner: "Mukesh Ambani", ticker: "RELIANCE", cap: "$240B" },
            { name: "Tata Consultancy (TCS)", owner: "Tata Group", ticker: "TCS", cap: "$160B" },
            { name: "HDFC Bank", owner: "Institutional", ticker: "HDFCBANK", cap: "$140B" },
            { name: "Bharti Airtel", owner: "Sunil Mittal", ticker: "BHARTIARTL", cap: "$100B" },
            { name: "Adani Enterprises", owner: "Gautam Adani", ticker: "ADANIENT", cap: "$85B" },
            { name: "State Bank of India (SBI)", owner: "Govt of India", ticker: "SBIN", cap: "$75B" },
            { name: "Infosys", owner: "N. R. Narayana Murthy", ticker: "INFY", cap: "$80B" },
            { name: "Larsen & Toubro", owner: "Institutional", ticker: "LT", cap: "$60B" }
        ]
    },
    "OCE":   { 
        name: "Oceania", lat: -25.0, lon: 135.0, risk: "low", score: 22, color: "#34d399", hubs: ["Sydney", "Perth"], gdp: "1.7", supply: 79,
        macro: { leader: "Prime Minister", leaderName: "Anthony Albanese (AU)", edu: "Advanced (Tier 1)", eduIndex: "HDI: 0.946", rank: "14th", rankDesc: "Global GDP Rank" },
        companies: [
            { name: "BHP Group", owner: "Institutional", ticker: "BHP", cap: "$130B" },
            { name: "Commonwealth Bank", owner: "Institutional", ticker: "CBA", cap: "$140B" },
            { name: "CSL Limited", owner: "Institutional", ticker: "CSL", cap: "$100B" },
            { name: "National Australia Bank", owner: "Institutional", ticker: "NAB", cap: "$70B" },
            { name: "Westpac Banking", owner: "Institutional", ticker: "WBC", cap: "$65B" },
            { name: "ANZ Group", owner: "Institutional", ticker: "ANZ", cap: "$60B" },
            { name: "Fortescue Metals", owner: "Andrew Forrest", ticker: "FMG", cap: "$45B" },
            { name: "Telstra", owner: "Institutional", ticker: "TLS", cap: "$35B" }
        ]
    }
};

const COMMODITIES = [
    { id: "oil", label: "CRUDE OIL", color: "#00f3ff" },
    { id: "semi", label: "SEMICONDUCTORS", color: "#8b5cf6" },
    { id: "lith", label: "LITHIUM", color: "#34d399" },
    { id: "wheat", label: "WHEAT", color: "#f59e0b" },
    { id: "freight", label: "FIRE FIGHT CAP.", color: "#f43f5e" }
];

const MARKETS = [
    { sym: "NIFTY 50", val: 24150.50, chg: 1.2 },
    { sym: "SENSEX", val: 79400.15, chg: 1.1 },
    { sym: "S&P 500", val: 5420.10, chg: -0.4 },
    { sym: "NASDAQ", val: 17800.40, chg: -0.8 },
    { sym: "GOLD", val: 2410.30, chg: 0.5 },
    { sym: "BRENT", val: 82.40, chg: 2.1 }
];

const DISASTERS = [
    { title: "Typhoon Rai Trajectory", region: "APAC", prob: 88, eta: "36h", level: "high" },
    { title: "Himalayan Seismic Swarm", region: "INDO", prob: 64, eta: "72h", level: "high" },
    { title: "Grid Load Anomalies", region: "NAMER", prob: 45, eta: "12h", level: "warn" }
];

/* ============ REGIONAL TRADE ROUTES ============ */
const REGIONAL_ROUTES = {
    "INDO": [
        { name: "Suez Canal / Red Sea", type: "SEA", status: "DISRUPTED", sev: "bad", impact: "Forces Cape of Good Hope bypass (+12 days transit)" },
        { name: "Malacca Strait Corridor", type: "SEA", status: "CONGESTED", sev: "med", impact: "Bottlenecks affecting electronics export flow" },
        { name: "Trans-Pacific Airspace", type: "SKY", status: "OPTIMIZED", sev: "good", impact: "Air cargo spot rates stable; 98.2% on-time transit" }
    ],
    "AFR": [
        { name: "Cape of Good Hope", type: "SEA", status: "CONGESTED", sev: "med", impact: "Rerouted traffic causing port delays" },
        { name: "Bab el-Mandeb", type: "SEA", status: "RESTRICTED", sev: "bad", impact: "High risk zone; insurance premiums up 40%" },
        { name: "Continental Airspace", type: "SKY", status: "OPTIMIZED", sev: "good", impact: "Clear flight paths" }
    ],
    "NAMER": [
        { name: "Panama Canal Transit", type: "SEA", status: "RESTRICTED", sev: "bad", impact: "Draft limits extending transit times by 4 days" },
        { name: "LA Port Transpacific", type: "SEA", status: "NOMINAL", sev: "good", impact: "Optimal flow for APAC imports" },
        { name: "Polar Air Corridors", type: "SKY", status: "OPTIMIZED", sev: "good", impact: "Clear flight paths for EU freight" }
    ],
    "APAC": [
        { name: "Taiwan Strait", type: "SEA", status: "ELEVATED", sev: "bad", impact: "High security presence; minor delays" },
        { name: "South China Sea Lanes", type: "SEA", status: "CONGESTED", sev: "med", impact: "Heavy traffic slowing bulk carriers" },
        { name: "Trans-Pacific Air", type: "SKY", status: "NOMINAL", sev: "good", impact: "Standard cargo rates to NAMER" }
    ],
    "EMEA": [
        { name: "Bosphorus Grain Corridor", type: "SEA", status: "RESTRICTED", sev: "bad", impact: "Agri-exports experiencing 48h delays" },
        { name: "Rotterdam North Sea", type: "SEA", status: "NOMINAL", sev: "good", impact: "Port operations running at 92% capacity" },
        { name: "Trans-Atlantic Airspace", type: "SKY", status: "OPTIMIZED", sev: "good", impact: "Clear logistics paths" }
    ],
    "MENA": [
        { name: "Strait of Hormuz", type: "SEA", status: "MONITORED", sev: "med", impact: "Heightened security patrols; nominal flow" },
        { name: "Suez Canal", type: "SEA", status: "DISRUPTED", sev: "bad", impact: "Major delays impacting global energy supply" },
        { name: "Gulf Air Corridors", type: "SKY", status: "NOMINAL", sev: "good", impact: "Passenger and cargo flights stable" }
    ],
    "SAMER": [
        { name: "Santos Port Atlantic", type: "SEA", status: "NOMINAL", sev: "good", impact: "Agri-exports flowing optimally" },
        { name: "Strait of Magellan", type: "SEA", status: "OPTIMIZED", sev: "good", impact: "Low traffic, safe passage" },
        { name: "Andean Air Corridors", type: "SKY", status: "CONGESTED", sev: "med", impact: "Weather fronts causing minor turbulence delays" }
    ],
    "OCE": [
        { name: "Port Hedland Export", type: "SEA", status: "NOMINAL", sev: "good", impact: "Mineral exports to APAC stable" },
        { name: "Tasman Sea Lanes", type: "SEA", status: "OPTIMIZED", sev: "good", impact: "Clear passage" },
        { name: "Trans-Pacific South", type: "SKY", status: "NOMINAL", sev: "good", impact: "Standard operations" }
    ],
    "DEFAULT": [
        { name: "Primary Maritime Corridor", type: "SEA", status: "NOMINAL", sev: "good", impact: "Standard operating capacity" },
        { name: "Regional Air Freight", type: "SKY", status: "OPTIMIZED", sev: "good", impact: "On-time transit rates 94%" }
    ]
};

/* ============ REGIONAL INFRASTRUCTURE ============ */
const REGIONAL_INFRA = {
    "INDO": [
        { name: "National Power Grid", status: "STABLE", load: "78% Capacity", sev: "good" },
        { name: "Subsea Cable Backbone", status: "DEGRADED", load: "92% Load", sev: "warn" },
        { name: "Cyber Defense Perimeter", status: "ELEVATED", load: "Level 3 Threat", sev: "high" }
    ],
    "AFR": [
        { name: "Continental Power Pool", status: "STRAINED", load: "94% Capacity", sev: "high" },
        { name: "East Africa Subsea Cable", status: "CONGESTED", load: "89% Load", sev: "warn" },
        { name: "Telecom Backbone", status: "STABLE", load: "62% Load", sev: "good" }
    ],
    "NAMER": [
        { name: "East Coast Power Intertie", status: "STABLE", load: "72% Capacity", sev: "good" },
        { name: "Financial Data Backbone", status: "OPTIMIZED", load: "55% Load", sev: "good" },
        { name: "NORAD Early Warning Array", status: "NOMINAL", load: "100% Uptime", sev: "good" }
    ],
    "APAC": [
        { name: "Semiconductor Fab Grid", status: "HIGH DEMAND", load: "91% Capacity", sev: "warn" },
        { name: "Undersea Backbone (Luzon)", status: "MONITORED", load: "84% Load", sev: "warn" },
        { name: "Regional Cyber Node", status: "ACTIVE", load: "Level 2 Threat", sev: "warn" }
    ],
    "EMEA": [
        { name: "Central European Pipeline", status: "RESTRICTED", load: "85% Capacity", sev: "warn" },
        { name: "Frankfurt Internet Exchange", status: "NOMINAL", load: "70% Load", sev: "good" },
        { name: "Nordic Power Grid", status: "STABLE", load: "60% Capacity", sev: "good" }
    ],
    "MENA": [
        { name: "Desalination Plant Network", status: "VULNERABLE", load: "95% Capacity", sev: "high" },
        { name: "Pipeline Grid (East-West)", status: "RESTRICTED", load: "88% Load", sev: "warn" },
        { name: "Air Defense Radar", status: "ACTIVE COMBAT", load: "99% Uptime", sev: "high" }
    ],
    "SAMER": [
        { name: "Itaipu Hydroelectric", status: "NOMINAL", load: "68% Capacity", sev: "good" },
        { name: "Amazon Telecomm Backbone", status: "STABLE", load: "52% Load", sev: "good" },
        { name: "Regional Sat-Link", status: "OPTIMIZED", load: "100% Uptime", sev: "good" }
    ],
    "OCE": [
        { name: "Basslink Interconnector", status: "STABLE", load: "61% Capacity", sev: "good" },
        { name: "Satcom Ground Station", status: "NOMINAL", load: "75% Load", sev: "good" },
        { name: "Coastal Defense Grid", status: "STABLE", load: "Level 1 Threat", sev: "good" }
    ],
    "DEFAULT": [
        { name: "Main Power Grid", status: "STABLE", load: "65% Capacity", sev: "good" },
        { name: "Fiber Optic Landing", status: "NOMINAL", load: "54% Load", sev: "good" },
        { name: "Cyber Nodes", status: "MONITORED", load: "Level 1 Threat", sev: "good" }
    ]
};

/* ============ DYNAMIC LOGISTICS ARCS ============ */
const ARC_DATA = [
    // INDO Routes
    { region: "INDO", startLat: 26.56, startLng: 56.25, endLat: 18.94, endLng: 72.83, color: ['#ef4444', '#ef4444'] }, // Hormuz to Mumbai (Disrupted)
    { region: "INDO", startLat: 25.29, startLng: 60.62, endLat: 22.25, endLng: 71.19, color: ['#10b981', '#10b981'] }, // Chabahar to Gujarat
    { region: "INDO", startLat: 18.94, startLng: 72.83, endLat: -34.35, endLng: 18.47, color: ['#f59e0b', '#f59e0b'] }, // Mumbai to Cape bypass

    // MENA Routes
    { region: "MENA", startLat: 29.92, startLng: 32.55, endLat: 12.58, endLng: 43.33, color: ['#ef4444', '#ef4444'] }, // Suez to Bab el-Mandeb
    { region: "MENA", startLat: 26.56, startLng: 56.25, endLat: 35.67, endLng: 139.65, color: ['#f59e0b', '#f59e0b'] }, // Hormuz to Japan
    
    // AFRICA Routes
    { region: "AFR", startLat: -34.35, startLng: 18.47, endLat: -20.0, endLng: 50.0, color: ['#f59e0b', '#f59e0b'] }, // Cape of Good Hope
    { region: "AFR", startLat: 9.03, startLng: 38.74, endLat: 50.85, endLng: 4.35, color: ['#10b981', '#10b981'] }, // Addis to Brussels (Air)
    { region: "AFR", startLat: -33.92, startLng: 18.42, endLat: -23.96, endLng: -46.33, color: ['#10b981', '#10b981'] }, // Cape Town to Santos

    // NAMER Routes
    { region: "NAMER", startLat: 9.10, startLng: -79.68, endLat: 29.76, endLng: -95.36, color: ['#ef4444', '#ef4444'] }, // Panama to Houston
    { region: "NAMER", startLat: 33.72, startLng: -118.26, endLat: 35.67, endLng: 139.65, color: ['#10b981', '#10b981'] }, // LA to Tokyo
    { region: "NAMER", startLat: 40.71, startLng: -74.00, endLat: 51.50, endLng: -0.12, color: ['#00f3ff', '#00f3ff'] }, // NY to London (Air)

    // APAC Routes
    { region: "APAC", startLat: 1.29, startLng: 103.85, endLat: 22.28, endLng: 114.15, color: ['#f59e0b', '#f59e0b'] }, // Singapore to HK
    { region: "APAC", startLat: 25.03, startLng: 121.56, endLat: 35.67, endLng: 139.65, color: ['#ef4444', '#ef4444'] }, // Taiwan to Tokyo
    { region: "APAC", startLat: -33.86, startLng: 151.20, endLat: 35.67, endLng: 139.65, color: ['#10b981', '#10b981'] }, // Sydney to Tokyo

    // EMEA Routes
    { region: "EMEA", startLat: 51.92, startLng: 4.48, endLat: 40.71, endLng: -74.00, color: ['#10b981', '#10b981'] }, // Rotterdam to NY
    { region: "EMEA", startLat: 41.00, startLng: 28.97, endLat: 46.48, endLng: 30.72, color: ['#ef4444', '#ef4444'] }, // Bosphorus to Odesa
    { region: "EMEA", startLat: 51.50, startLng: -0.12, endLat: 25.20, endLng: 55.27, color: ['#00f3ff', '#00f3ff'] }, // London to Dubai (Air)

    // SAMER Routes
    { region: "SAMER", startLat: -23.96, startLng: -46.33, endLat: 51.92, endLng: 4.48, color: ['#10b981', '#10b981'] }, // Santos to Rotterdam
    { region: "SAMER", startLat: -53.15, startLng: -70.90, endLat: -33.86, endLng: 151.20, color: ['#00f3ff', '#00f3ff'] }, // Magellan to Sydney
    { region: "SAMER", startLat: -12.04, startLng: -77.02, endLat: 9.10, endLng: -79.68, color: ['#f59e0b', '#f59e0b'] }, // Lima to Panama

    // OCE Routes
    { region: "OCE", startLat: -20.31, startLng: 118.57, endLat: 35.67, endLng: 139.65, color: ['#10b981', '#10b981'] }, // Port Hedland to Tokyo
    { region: "OCE", startLat: -33.86, startLng: 151.20, endLat: 33.72, endLng: -118.26, color: ['#00f3ff', '#00f3ff'] }, // Sydney to LA
    { region: "OCE", startLat: -41.28, startLng: 174.77, endLat: -33.86, endLng: 151.20, color: ['#10b981', '#10b981'] } // Wellington to Sydney
];

const ALERT_POOL = [
    "Seismic sensors detect deep tremors near regional border",
    "Banking index drops 2% on localized panic selling",
    "Emergency services put on 48h high-alert standby",
    "Crude oil transit disrupted in major shipping corridor",
    "Agricultural yields safe from immediate weather fronts",
    "Port strike halts cathode precursor shipments",
    "Cyber intrusion detected at tier-1 regional utility"
];

function rnd(a, b) { return a + Math.random() * (b - a); }

const chartHistory = {};
Object.keys(REGIONS).forEach(regionKey => {
    chartHistory[regionKey] = {};
    COMMODITIES.forEach(c => { 
        let startBase = rnd(50, 130);
        let dataArr = [];
        for(let i=0; i<12; i++) {
            startBase += rnd(-8, 8); 
            dataArr.push(startBase);
        }
        chartHistory[regionKey][c.id] = dataArr; 
    });
});

let activeRegion = "INDO";
let activeCommodity = "all";

/* ============ INITIALIZATION ============ */
let myGlobe;
let lineChart;

window.addEventListener('DOMContentLoaded', () => {
    initGlobe();
    renderLegend();
    renderTabs();
    initChart();
    updateDashboard();
    renderMarkets();
    renderRoutes();
    renderInfra();
    
    // INITIALIZE CLOCK IMMEDIATELY
    updateClock();
    setInterval(updateClock, 1000);

    // INITIALIZE LIVE TELEMETRY
    fetchLiveSeismicData();
    // Poll the USGS API every 5 minutes (300,000 ms)
    setInterval(fetchLiveSeismicData, 300000); 
});

/* ============ CLOCK LOGIC ============ */
function updateClock() {
    let now = new Date();
    let timeString = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false });
    const clockEl = document.getElementById("clock") || document.querySelector(".clock");
    if (clockEl) {
        clockEl.textContent = timeString + " IST";
    }
}

/* ============ GLOBE.GL INTEGRATION ============ */
const initGlobe = () => {
    const container = document.getElementById('globeViz');
    myGlobe = Globe()(container)
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
        .showAtmosphere(true)
        .atmosphereColor('#00f3ff')
        .atmosphereAltitude(0.15)
        
        // --- DYNAMIC ARC HIGHLIGHTING LOGIC ---
        .arcStartLat(d => d.startLat)
        .arcStartLng(d => d.startLng)
        .arcEndLat(d => d.endLat)
        .arcEndLng(d => d.endLng)
        
        // 1. Keep the original neon colors for EVERY arc globally
        .arcColor(d => d.color)
        
        // 2. Make the active region's arcs thick (glow effect), and background arcs very thin
        .arcStroke(d => d.region === activeRegion ? 1.2 : 0.2)
        
        // 3. Make the active region's arcs fly higher off the globe
        .arcAltitude(d => d.region === activeRegion ? 0.3 : 0.05)
        
        // 4. Make the active lasers longer and travel faster than the background noise
        .arcDashLength(d => d.region === activeRegion ? 0.5 : 0.15)
        .arcDashGap(0.2)
        .arcDashAnimateTime(d => d.region === activeRegion ? 1200 : 4000);

    myGlobe.controls().autoRotate = true;
    myGlobe.controls().autoRotateSpeed = 1.0;
    myGlobe.controls().enableZoom = true; 
    myGlobe.camera().position.z = 250; 

    updateGlobeMarkers();
    
    // Initialize the globe with ALL arcs visible
    myGlobe.arcsData([...ARC_DATA]);
    
    // ALLOW CLICKING ON GLOBE MARKERS
    myGlobe.onPointClick(point => {
        if (point && point.id) selectRegion(point.id);
    });
    
    const resizeGlobe = () => {
        if(container.clientWidth) {
            myGlobe.width(container.clientWidth);
            myGlobe.height(container.clientHeight);
        }
    };
    resizeGlobe();
    window.addEventListener('resize', resizeGlobe);
};

function updateGlobeMarkers() {
    const globeData = Object.keys(REGIONS).map(key => ({
        id: key,
        lat: REGIONS[key].lat,
        lng: REGIONS[key].lon,
        color: REGIONS[key].color,
        size: key === activeRegion ? 1.5 : 0.5
    }));

    myGlobe
        .pointsData(globeData)
        .pointAltitude(0.01)
        .pointColor('color')
        .pointRadius('size')
        .pointsMerge(false)
        .labelsData(globeData)
        .labelLat('lat')
        .labelLng('lng')
        .labelText('id')
        .labelSize(d => d.id === activeRegion ? 1.8 : 0.9)
        .labelDotRadius(0.2)
        .labelColor('color')
        .labelAltitude(0.02);
}

function selectRegion(key) {
    playTacticalBeep(); // Audio feedback on region change
    activeRegion = key;
    renderLegend();
    updateDashboard();
    updateGlobeMarkers();
    
    // Re-feed the entire ARC_DATA array. 
    // The globe will automatically dim/highlight them based on the new activeRegion.
    myGlobe.arcsData([...ARC_DATA]);
    
    const data = REGIONS[key];
    myGlobe.pointOfView({ lat: data.lat, lng: data.lon, altitude: 2.0 }, 1000);
}

function renderLegend() {
    document.getElementById("region-legend").innerHTML = Object.keys(REGIONS).map(key => {
        const d = REGIONS[key];
        const activeClass = key === activeRegion ? "active" : "";
        return `<button class="legend-btn ${activeClass}" onclick="selectRegion('${key}')">
                    <div class="dot" style="background:${d.color}"></div> ${key}
                </button>`;
    }).join("");
}

/* ============ DATA RENDERING ============ */
function updateDashboard() {
    const d = REGIONS[activeRegion];
    
    document.getElementById("hdr-region-id").textContent = activeRegion;
    document.getElementById("region-name").textContent = d.name;
    document.getElementById("risk-score").textContent = d.score;
    document.getElementById("risk-score").style.color = d.color;
    
    const bar = document.getElementById("risk-bar");
    bar.style.width = d.score + "%";
    bar.style.background = d.color;

    document.getElementById("info-gdp").textContent = d.gdp + " $B";
    document.getElementById("info-supply").textContent = d.supply + "%";
    document.getElementById("hubs-container").textContent = d.hubs.join(" · ");

    const kpis = [
        ["EXPOSURE AT RISK", (rnd(2, 9)).toFixed(2) + " $B", "▲ " + rnd(0.1, 2.5).toFixed(1) + "%", "up"],
        ["SUPPLY INTEGRITY", (100 - d.score/2).toFixed(1) + "%", "▼ " + rnd(0.1, 1.5).toFixed(1) + "%", "down"],
        ["EVENT VELOCITY", Math.floor(rnd(5, 25)) + "/hr", "▲ " + rnd(5, 15).toFixed(1) + "%", "up"],
        ["SIGNAL CONFIDENCE", rnd(75, 95).toFixed(1) + "%", "▲ " + rnd(0.1, 3.5).toFixed(1) + "%", "up"]
    ];

    document.getElementById("kpis").innerHTML = kpis.map(k => `
        <div class="metric-card">
            <div class="sub-label">${k[0]}</div>
            <div class="metric-value">${k[1]}</div>
            <div class="metric-delta ${k[3]}">${k[2]}</div>
        </div>
    `).join("");

    updateBriefing();
    updateAlerts();
    renderMarkets(); 
    renderMacroProfile();
    renderCorporateDensity();
    renderTabs(); 
    renderRoutes();
    renderInfra();
    
    renderDisasters();
    
    if(lineChart) updateChartData();
}

function renderMacroProfile() {
    const d = REGIONS[activeRegion].macro;
    document.getElementById("macro-region-id").textContent = activeRegion;
    
    document.getElementById("macro-grid").innerHTML = `
        <div class="macro-item">
            <span class="macro-label">EXECUTIVE LEADERSHIP</span>
            <span class="macro-value">${d.leaderName}</span>
            <span class="macro-sub">[TITLE: ${d.leader}]</span>
        </div>
        <div class="macro-item">
            <span class="macro-label">EDUCATIONAL INFRASTRUCTURE</span>
            <span class="macro-value">${d.edu}</span>
            <span class="macro-sub">[INDEX: ${d.eduIndex}]</span>
        </div>
        <div class="macro-item">
            <span class="macro-label">GLOBAL STANDING</span>
            <span class="macro-value">Ranked ${d.rank}</span>
            <span class="macro-sub">[METRIC: ${d.rankDesc}]</span>
        </div>
        <div class="macro-item">
            <span class="macro-label">SYSTEM STABILITY</span>
            <span class="macro-value">${(100 - REGIONS[activeRegion].score).toFixed(1)}%</span>
            <span class="macro-sub">[BASED ON COMPOSITE RISK]</span>
        </div>
    `;
}

function renderCorporateDensity() {
    const regionData = REGIONS[activeRegion];
    document.getElementById("corp-region-id").textContent = activeRegion;
    
    const grid = document.getElementById("corp-grid");
    if (!regionData.companies) return;
    
    grid.innerHTML = regionData.companies.map(c => `
        <div class="corp-card" style="cursor:pointer;" onclick="openTacticalModal('${c.name.replace(/'/g, "\\'")}', '${c.owner.replace(/'/g, "\\'")}', '${c.ticker}', '${c.cap}')">
            <div class="corp-name" title="${c.name}">${c.name}</div>
            <div class="corp-owner">LEAD: ${c.owner}</div>
            <div class="corp-stock">
                <span>${c.ticker}</span>
                <span style="color:var(--text-bright);">${c.cap}</span>
            </div>
        </div>
    `).join("");
}

function renderRoutes() {
    const currentRoutes = REGIONAL_ROUTES[activeRegion] || REGIONAL_ROUTES["DEFAULT"];
    
    document.getElementById("routes-list").innerHTML = currentRoutes.map(r => `
        <div class="route-card">
            <div class="route-header">
                <span>[${r.type}] ${r.name}</span>
                <span class="route-status ${r.sev}">${r.status}</span>
            </div>
            <div class="route-impact">${r.impact}</div>
        </div>
    `).join("");
}

function renderInfra() {
    const currentInfra = REGIONAL_INFRA[activeRegion] || REGIONAL_INFRA["DEFAULT"];

    document.getElementById("infra-list").innerHTML = currentInfra.map(i => `
        <div class="infra-row-item">
            <div class="infra-info">
                <span>${i.name}</span>
                <span class="infra-status ${i.sev}">${i.status}</span>
            </div>
            <div class="infra-sub">METRIC: ${i.load}</div>
        </div>
    `).join("");
}

function renderTicker() {
    let tickerHtml = "";
    for(let i=0; i<4; i++) {
        MARKETS.forEach(m => {
            let cls = m.chg >= 0 ? "tk-up" : "tk-dn";
            let arr = m.chg >= 0 ? "▲" : "▼";
            tickerHtml += `<span><span class="tk-label">${m.sym}</span> <span class="tk-val">${m.val.toFixed(2)}</span> <span class="${cls}">(${m.chg > 0 ? '+':''}${m.chg}%) ${arr}</span></span> • `;
        });
        DISASTERS.forEach(d => {
            tickerHtml += `<span style="color:#f59e0b">⚠ ${d.title.toUpperCase()} [ETA: ${d.eta}]</span> • `;
        });
    }
    document.getElementById("global-ticker").innerHTML = tickerHtml;
}

function renderMarkets() {
    document.getElementById("market-grid").innerHTML = MARKETS.slice(0,6).map(m => {
        let val = m.val + rnd(-m.val*0.001, m.val*0.001); 
        let cls = m.chg >= 0 ? "up" : "down";
        let arr = m.chg >= 0 ? "▲" : "▼";
        return `
            <div class="market-card">
                <div class="mkt-head"><span>${m.sym}</span></div>
                <div class="mkt-price">${val.toFixed(2)}</div>
                <div class="mkt-change ${cls}">${m.chg > 0 ? '+':''}${m.chg}% ${arr}</div>
            </div>
        `;
    }).join("");
}

function renderDisasters() {
    let regionalThreats = LIVE_DISASTERS[activeRegion] || [];
    
    if (regionalThreats.length === 0) {
        regionalThreats = [
            { title: "Atmospheric Anomaly", region: "REGIONAL AIRSPACE", prob: Math.floor(rnd(35, 65)), eta: "ETA 24h", level: "warn" },
            { title: "Grid Fluctuation", region: REGIONS[activeRegion].hubs[0].toUpperCase(), prob: Math.floor(rnd(40, 75)), eta: "ETA 12h", level: "warn" }
        ];
    }

    regionalThreats = regionalThreats.slice(0, 3);

    document.getElementById("disaster-list").innerHTML = regionalThreats.map(d => {
        let cls = d.level === 'warn' ? 'warn' : '';
        return `
            <div class="disaster-card ${cls}">
                <div class="dis-header">
                    <span class="dis-title">${d.title}</span>
                    <span class="dis-eta ${cls}">${d.eta}</span>
                </div>
                <div class="dis-details">
                    <span>IMPACT: ${d.region}</span>
                    <span>PROBABILITY: ${d.prob}%</span>
                </div>
                <div class="dis-bar-bg"><div class="dis-bar-fill" style="width: ${d.prob}%;"></div></div>
            </div>
        `;
    }).join("");
}

/* ============ RESOURCES & CHARTS ============ */
function renderTabs() {
    let html = `
        <div class="res-tab all-tab ${activeCommodity === 'all' ? 'active' : ''}" onclick="selectCommodity('all')">
            <div class="res-tab-title">ALL METRICS OVERLAY</div>
            <div class="res-tab-data">MACRO VIEW</div>
        </div>
    `;
    
    html += COMMODITIES.map(c => {
        const active = c.id === activeCommodity ? "active" : "";
        const historyData = chartHistory[activeRegion][c.id];
        const currentVal = historyData[historyData.length - 1];
        const prevVal = historyData[historyData.length - 2];
        const deltaNum = ((currentVal - prevVal) / prevVal) * 100;
        const isUp = deltaNum >= 0;
        const color = isUp ? "var(--sev-safe)" : "var(--sev-high)";
        const arrow = isUp ? "▲" : "▼";

        return `
            <div class="res-tab ${active}" onclick="selectCommodity('${c.id}')">
                <div class="res-tab-title">${c.label}</div>
                <div class="res-tab-data">
                    ${currentVal.toFixed(2)} <span class="res-tab-delta" style="color:${color}">${arrow} ${Math.abs(deltaNum).toFixed(2)}%</span>
                </div>
            </div>
        `;
    }).join("");
    
    document.getElementById("resource-tabs").innerHTML = html;
    
    if (activeCommodity === 'all') {
        document.getElementById("active-chart-idx").textContent = "AVG 62";
    } else {
        const c = COMMODITIES.find(x => x.id === activeCommodity);
        const historyData = chartHistory[activeRegion][c.id];
        document.getElementById("active-chart-idx").textContent = historyData[historyData.length - 1].toFixed(2);
    }
}

function selectCommodity(id) {
    playTacticalBeep(); // Audio feedback on tab change
    activeCommodity = id;
    if (id === 'all') {
        document.getElementById("active-chart-label").textContent = "AGGREGATED OVERVIEW";
    } else {
        const c = COMMODITIES.find(x => x.id === id);
        document.getElementById("active-chart-label").textContent = c.label;
    }
    renderTabs();
    updateChartData();
    updateBriefing();
}

function initChart() {
    Chart.defaults.color = '#8492a6';
    Chart.defaults.font.family = "'Segoe UI', system-ui, sans-serif";
    
    const ctx = document.getElementById('resourceChart').getContext('2d');
    lineChart = new Chart(ctx, {
        type: 'line',
        data: getChartData(),
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { 
                legend: { display: true, position: 'top', labels: { color: '#e2e8f0', boxWidth: 8, font: { size: 9 } } },
                tooltip: { backgroundColor: 'rgba(13, 18, 31, 0.9)', borderColor: '#1e293b', borderWidth: 1, titleColor: '#8492a6', padding: 10 }
            },
            scales: {
                x: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { font: { size: 9 } } },
                y: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, min: 20, max: 150, ticks: { font: { size: 9 } } }
            },
            elements: { line: { tension: 0.4, borderWidth: 2 }, point: { radius: 0, hoverRadius: 5 } }
        }
    });
}

function getChartData() {
    const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    if (activeCommodity === 'all') {
        return {
            labels,
            datasets: COMMODITIES.map(c => ({ label: c.label, data: chartHistory[activeRegion][c.id], borderColor: c.color, backgroundColor: 'transparent' }))
        };
    } else {
        const c = COMMODITIES.find(x => x.id === activeCommodity);
        return {
            labels,
            datasets: [{ label: c.label, data: chartHistory[activeRegion][c.id], borderColor: c.color, backgroundColor: 'transparent', borderWidth: 3, pointRadius: 3, pointBackgroundColor: c.color }]
        };
    }
}

function updateChartData() {
    lineChart.options.plugins.legend.display = (activeCommodity === 'all');
    lineChart.data = getChartData();
    lineChart.update();
}

/* ============ DYNAMIC LIVE ALERTS ============ */
function updateAlerts() {
    const list = document.getElementById("alerts-list");
    const countSpan = document.getElementById("critical-count");
    const numAlerts = Math.floor(rnd(4, 6)); 
    let criticalCount = 0;
    let html = "";
    let timeOffset = 0;

    for(let i = 0; i < numAlerts; i++) {
        const msg = ALERT_POOL[Math.floor(rnd(0, ALERT_POOL.length))];
        const severities = ["low", "med", "high", "high"]; 
        const s = severities[Math.floor(rnd(0, severities.length))];
        if (s === "high") criticalCount++;

        let d = new Date();
        timeOffset += Math.floor(rnd(2, 15)); 
        d.setMinutes(d.getMinutes() - timeOffset);
        const t = d.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute:'2-digit', hour12: false });
        
        html += `
            <div class="alert-row ${s}">
                <div class="alert-time">${t}</div>
                <div class="alert-desc">${msg}</div>
                <div class="alert-badge">${s.toUpperCase()}</div>
            </div>
        `;
    }

    list.innerHTML = html;
    if(countSpan) countSpan.textContent = criticalCount;
}

/* ============ REAL AI BRIEFING ENGINE ============ */
const API_KEY = "YOUR_EXTERNAL_API_KEY_HERE"; 
const API_URL = "https://api.openai.com/v1/chat/completions"; 

async function updateBriefing() {
    const d = REGIONS[activeRegion];
    const status = d.risk === "high" ? "CRITICAL" : d.risk === "med" ? "ELEVATED" : "STABLE";
    let targetLabel = activeCommodity === 'all' ? "Systemic Logistics" : COMMODITIES.find(x => x.id === activeCommodity).label;
    const briefingEl = document.getElementById("briefingText");

    briefingEl.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; color:var(--cyan); font-family:monospace; padding: 20px 0;">
            <div class="dot" style="width:8px; height:8px; background:var(--cyan); border-radius:50%; animation:pulse 1s infinite;"></div>
            NEURAL ENGINE SYNTHESIZING LIVE DATA...
        </div>
    `;

    const prompt = `
        Act as an elite geopolitical and market intelligence AI. Write a brief, punchy, 3-paragraph situational report.
        Current Region: ${d.name} (${activeRegion})
        Overall Risk Posture: ${status} (Score: ${d.score}/100)
        Key Hubs Affected: ${d.hubs.join(', ')}
        GDP Exposure: $${d.gdp} Billion
        Primary Pressure Point: ${targetLabel}
        
        Format your response in HTML:
        - Start with an <h4> tag containing a dramatic but analytical headline.
        - Write 1 paragraph analyzing the situation.
        - Write 1 paragraph connecting newswire/disaster events to the pressure point.
        - Provide an unordered list <ul> of 3 recommended actions.
    `;

    try {
        if(API_KEY === "YOUR_EXTERNAL_API_KEY_HERE") throw new Error("No real API key detected");

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
            body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: prompt }], temperature: 0.7 })
        });

        if (!response.ok) throw new Error("API Connection Failed");

        const data = await response.json();
        briefingEl.innerHTML = data.choices[0].message.content;

    } catch (error) {
        briefingEl.innerHTML = `
            <h4>${activeRegion} POSTURE ${status} — ${targetLabel} UNDER PRESSURE</h4>
            <p style="margin-bottom: 12px; color: var(--sev-high);">[⚠ API CONNECTION SEVERED — DISPLAYING CACHED PROTOCOL]</p>
            <p style="margin-bottom: 12px;">Composite risk for ${d.name} reads ${d.score}/100 with active severity events across ${d.hubs.join(' & ')}. Market futures indicate volatility for localized assets.</p>
            <div class="sub-label">RECOMMENDED ACTIONS</div>
            <ul>
                <li>Hedge regional equities against short-term disaster impact.</li>
                <li>Re-route ${d.hubs[0]} supply chains immediately.</li>
                <li>Deploy mitigation funds to tier-1 predicted impact zones.</li>
            </ul>
        `;
    }
}

// Master refresh loop
let cd = 60;
setInterval(() => {
    cd--;
    if(cd <= 0) { cd = 60; updateDashboard(); }
    document.getElementById("countdown").textContent = "00:" + String(cd).padStart(2, "0");
}, 1000);

// Latency ping loop
setInterval(() => {
    const pingEl = document.getElementById("ping-readout");
    if(pingEl) pingEl.textContent = `LATENCY: ${Math.floor(rnd(12, 28))}ms`;
}, 3000);

/* ============ LIVE TELEMETRY: USGS EARTHQUAKE API ============ */
let LIVE_DISASTERS = {};

// Simple spatial distance calculator to map USGS coordinates to your REGIONS
function getClosestRegion(lat, lon) {
    let minDist = Infinity;
    let closestRegion = "INDO"; // Fallback
    
    for (const [key, data] of Object.entries(REGIONS)) {
        // Pythagorean distance on map coordinates
        const dist = Math.pow(lat - data.lat, 2) + Math.pow(lon - data.lon, 2);
        if (dist < minDist) {
            minDist = dist;
            closestRegion = key;
        }
    }
    return closestRegion;
}

async function fetchLiveSeismicData() {
    try {
        const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');
        const data = await response.json();

        // Clear previous data and initialize arrays for every region
        LIVE_DISASTERS = {};
        Object.keys(REGIONS).forEach(k => LIVE_DISASTERS[k] = []);

        // Map every live earthquake to its closest dashboard region
        data.features.forEach(quake => {
            const mag = quake.properties.mag;
            const place = quake.properties.place.split(' of ').pop().substring(0, 20).toUpperCase();
            const time = new Date(quake.properties.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute:'2-digit', hour12: false });
            
            // Extract coordinates [longitude, latitude]
            const lng = quake.geometry.coordinates[0];
            const lat = quake.geometry.coordinates[1];
            
            const regionKey = getClosestRegion(lat, lng);

            LIVE_DISASTERS[regionKey].push({
                title: `MAG ${mag.toFixed(1)} SEISMIC EVENT`,
                region: place,
                prob: Math.min(Math.floor(mag * 12), 99),
                eta: `LOG: ${time}`,
                level: mag >= 5.5 ? 'high' : 'warn'
            });
        });

        renderDisasters();
        renderTicker();
    } catch (error) {
        console.error("USGS Telemetry link severed.");
    }
}

/* ============ DRILL-DOWN MODALS ============ */
const modalHTML = `
<div id="tactical-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(6,9,19,0.85); z-index:9999; backdrop-filter:blur(5px); justify-content:center; align-items:center;">
    <div style="background:#0d121f; border:1px solid #00f3ff; border-radius:6px; padding:25px; width:600px; box-shadow:0 0 40px rgba(0,243,255,0.15); animation: fadeUp 0.3s ease-out;">
        
        <div style="display:flex; justify-content:space-between; margin-bottom:20px; border-bottom:1px solid #1e293b; padding-bottom:15px;">
            <h3 id="modal-title" style="color:#fff; letter-spacing:0.1em; text-transform:uppercase; margin:0;"></h3>
            <button onclick="document.getElementById('tactical-modal').style.display='none'; playTacticalBeep();" style="background:rgba(244,63,94,0.1); border:1px solid #f43f5e; color:#f43f5e; cursor:pointer; font-weight:bold; padding:4px 10px; border-radius:4px;">[X] CLOSE</button>
        </div>
        
        <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-family:monospace; color:#8492a6; font-size:0.8rem;">
            <div id="modal-owner" style="text-transform:uppercase;"></div>
            <div id="modal-cap" style="color:#00f3ff; font-weight:bold; font-size:1rem;"></div>
        </div>
        
        <!-- DYNAMIC CHART CONTAINER -->
        <div style="height:200px; background:#060913; border:1px solid #1e293b; border-radius:4px; padding: 10px; position: relative;">
            <canvas id="modalStockChart"></canvas>
        </div>
        
        <button onclick="alert('SECURE TRADE AUTHORIZED')" style="width:100%; margin-top:20px; padding:12px; background:rgba(0,243,255,0.1); border:1px solid #00f3ff; color:#00f3ff; cursor:pointer; font-family:monospace; font-weight:bold; letter-spacing:0.2em; border-radius:4px; transition:0.2s;" onmouseover="this.style.background='rgba(0,243,255,0.2)'" onmouseout="this.style.background='rgba(0,243,255,0.1)'">
            AUTHORIZE STRATEGIC ACTION
        </button>
    </div>
</div>
<style>
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>
`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

let modalChartInstance = null;

/* ============ REALISTIC LOCALIZED FINANCIAL ENGINE ============ */
const companyChartCache = {};

function openTacticalModal(name, owner, ticker, cap) {
    playAlertChime(); // Audio feedback on modal open
    
    document.getElementById('modal-title').textContent = `${name} // ${ticker}`;
    document.getElementById('modal-owner').textContent = `LEADERSHIP: ${owner}`;
    document.getElementById('modal-cap').textContent = `VALUATION: ${cap}`;
    document.getElementById('tactical-modal').style.display = 'flex';

    let labels = [];
    let dataPoints = [];

    // Check session cache first for performance & deterministic persistence
    if (companyChartCache[ticker]) {
        labels = companyChartCache[ticker].labels;
        dataPoints = companyChartCache[ticker].dataPoints;
    } else {
        // Assign realistic baseline prices scaled to actual market capitalization tiers
        let basePrice = 1000; // Default baseline for heavy equities like SBI
        if (cap.includes('T')) {
            basePrice = 180 + (ticker.charCodeAt(0) * 1.5); // Mega cap tech scale (AAPL, MSFT)
        } else if (cap.includes('B')) {
            const num = parseFloat(cap.replace('$', '').replace('B', ''));
            basePrice = Math.max(60, num * 2.5); // Scaled market cap tier
        }

        let currentPrice = basePrice;
        for(let i = 0; i < 30; i++) {
            labels.push(`T-${30-i}m`);
            
            // Random walk with momentum simulation
            const volatility = basePrice * 0.0035;
            const change = (Math.random() - 0.48) * volatility; 
            currentPrice += change;
            
            dataPoints.push(Math.max(10, currentPrice).toFixed(2));
        }

        // Cache the processed result for this session
        companyChartCache[ticker] = { labels, dataPoints };
    }

    // Clear out previous chart instance to avoid canvas overlapping errors
    if (modalChartInstance) {
        modalChartInstance.destroy();
    }

    // Instantiate dynamic chart overlay with realistic financial formatting
    const ctx = document.getElementById('modalStockChart').getContext('2d');
    modalChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: ticker,
                data: dataPoints,
                borderColor: '#00f3ff',
                backgroundColor: 'rgba(0, 243, 255, 0.08)',
                borderWidth: 2,
                fill: true,
                tension: 0.25,
                pointRadius: 0,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { 
                    position: 'right',
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { 
                        color: '#8492a6', 
                        font: { size: 10, family: 'monospace' },
                        callback: function(value) { return value.toLocaleString(); }
                    }
                }
            },
            animation: { duration: 600, easing: 'easeOutQuart' },
            interaction: { mode: 'index', intersect: false }
        }
    });
}