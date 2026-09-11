# 🌐 NEXUS: Geopolitical Tactical Dashboard

![UI Preview](https://img.shields.io/badge/UI-Tactical_Dark_Mode-00f3ff?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Vanilla_JS-ES6+-f59e0b?style=for-the-badge&logo=javascript)
![WebGL](https://img.shields.io/badge/WebGL-globe.gl-8b5cf6?style=for-the-badge)

NEXUS is a high-performance, client-side tactical command center built entirely with HTML, CSS, and Vanilla JavaScript. It simulates a live geopolitical telemetry interface, featuring an interactive 3D globe, real-time seismic disaster tracking, procedural market analytics, and synthetic audio feedback.

## 🚀 Key Features

* **Interactive 3D WebGL Globe:** Powered by `globe.gl`, featuring dynamic rendering of global trade routes using animated laser arcs. Arcs intelligently highlight and elevate based on regional selection.
* **Live USGS Telemetry:** Connects directly to the United States Geological Survey (USGS) GeoJSON feed to monitor and map real-time global seismic events (Magnitude 2.5+) to specific geopolitical hubs.
* **Procedural Financial Engine:** Clicking on corporate entities summons a secure drill-down modal. Utilizes `Chart.js` and a deterministic random-walk algorithm to render realistic, localized market volatility.
* **Synthetic Web Audio API:** Zero-latency tactical sound design generated entirely through browser mathematics (oscillator waveforms) for clicks, hovers, and alert chimes.
* **AI Synthesis Scaffold:** Pre-configured architecture to accept an OpenAI API key for real-time generative intelligence briefings based on current regional risk scores.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom tactical glassmorphism UI)
* **Logic:** Vanilla JavaScript (No heavy framework dependencies)
* **Libraries:** 
  * `globe.gl` (3D Data Visualization)
  * `Chart.js` (Financial Overlays)
* **External APIs:** USGS Earthquake Feed

## ⚙️ Installation & Usage

Because this dashboard is built with vanilla web technologies, no build steps or package managers (like `npm`) are required.

1. **Download the Repository:** Click `Code > Download ZIP` or clone the repository to your local machine.
2. **Extract the Files:** Ensure `index.html`, `style.css`, and `script.js` are in the same directory.
3. **Launch the Dashboard:** Simply double-click `index.html` to open it in any modern web browser.
4. **Interact:** Click anywhere on the dashboard to initialize the Web Audio engine, then select regions on the globe to begin tracking telemetry.

## 🔒 Configuration (Optional AI Briefings)

To enable the live AI situational reports, you must provide your own API key:
1. Open `script.js`.
2. Locate the API configuration block: `const API_KEY = "YOUR_EXTERNAL_API_KEY_HERE";`
3. Replace the string with a valid OpenAI API key. 
*(Note: Never commit your actual API key to a public GitHub repository. Keep it local.)*

## 👨‍💻 Author

**Debojyoti Banerjee**  
Designed for tactical data visualization and interactive UI/UX experimentation.
