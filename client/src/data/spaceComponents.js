const spaceComponents = [
  {
    id: 1,
    title: "Rover",
    description:
      "A rover is a robotic vehicle designed to move across the surface of a planet or moon, collecting scientific data and imagery. Equipped with sensors, cameras, and sample-collection tools, rovers operate autonomously or via ground commands. They are humanity's most direct way of exploring planetary surfaces up close over extended periods.",
    image: "..//components/rover.jpg",
    examples: ["Perseverance", "Curiosity", "Opportunity", "Zhurong"],
    aiContext:
      "Rovers are robotic ground vehicles used for planetary surface exploration, scientific sampling, and terrain analysis.",
  },
  {
    id: 2,
    title: "Lander",
    description:
      "A lander is a spacecraft engineered to touch down on the surface of a planet, moon, or asteroid and remain stationary to conduct science. Unlike rovers, landers stay in one place and use onboard instruments to study the local environment—measuring seismic activity, atmospheric composition, and soil properties. They often serve as relay stations for data transmission back to Earth.",
    image: "/components/lander.jpg",
    examples: ["InSight", "Viking 1", "Luna 9", "Vikram"],
    aiContext:
      "Landers are stationary spacecraft that settle on planetary or lunar surfaces to conduct in-situ scientific measurements.",
  },
  {
    id: 3,
    title: "Orbiter",
    description:
      "An orbiter is a spacecraft that enters and maintains orbit around a planet, moon, or other body without landing. Orbiters carry instruments for remote sensing, mapping, atmospheric study, and gravitational analysis. They provide global coverage of their target body and often relay signals for surface missions below.",
    image: "/components/orbiter.jpg",
    examples: [
      "Mars Reconnaissance Orbiter",
      "Cassini",
      "MAVEN",
      "Chandrayaan-2",
    ],
    aiContext:
      "Orbiters are spacecraft that circle planetary bodies to perform remote sensing, mapping, and atmospheric research.",
  },
  {
    id: 4,
    title: "Space Probe",
    description:
      "A space probe is an uncrewed spacecraft launched to explore regions beyond Earth orbit, including planets, moons, comets, and interstellar space. Probes carry scientific payloads tailored to their mission and communicate findings back across vast distances. Some probes perform flybys, while others enter orbit or impact their targets intentionally.",
    image: "/components/space-probe.jpg",
    examples: ["Voyager 1", "New Horizons", "Pioneer 10", "Juno"],
    aiContext:
      "Space probes are uncrewed spacecraft designed for deep-space exploration beyond Earth orbit, conducting flybys, orbital insertion, or targeted impacts.",
  },
  {
    id: 5,
    title: "Space Telescope",
    description:
      "A space telescope is an observatory positioned in space to observe the universe free from atmospheric distortion and light pollution. Operating across wavelengths from infrared to X-ray, space telescopes reveal cosmic phenomena invisible from Earth's surface. They have transformed our understanding of galaxies, black holes, exoplanets, and the early universe.",
    image: "/components/space-telescope.jpg",
    examples: ["James Webb", "Hubble", "Chandra", "Spitzer", "Euclid"],
    aiContext:
      "Space telescopes are orbital observatories collecting electromagnetic data across multiple wavelengths to study cosmological phenomena.",
  },
  {
    id: 6,
    title: "Space Station",
    description:
      "A space station is a large habitable structure in low Earth orbit that serves as a long-duration home and laboratory for astronauts. Stations support scientific research in microgravity, test life-support systems for deep-space missions, and foster international cooperation. They are assembled incrementally using modular components delivered by multiple launches.",
    image: "/components/space-station.jpg",
    examples: ["ISS", "Tiangong", "Mir", "Skylab"],
    aiContext:
      "Space stations are crewed orbital platforms used for long-duration microgravity research and as testbeds for deep-space exploration technologies.",
  },
  {
    id: 7,
    title: "Launch Vehicle",
    description:
      "A launch vehicle, commonly called a rocket, is the system that carries spacecraft, satellites, or crew from Earth's surface into orbit or beyond. It works by burning propellant to generate thrust that overcomes gravity and atmospheric drag. Launch vehicles range from small expendable rockets to large reusable systems designed to dramatically lower the cost of access to space.",
    image: "/components/launch-vehicle.jpg",
    examples: ["Falcon 9", "SLS", "Ariane 5", "Long March 5", "Vulcan Centaur"],
    aiContext:
      "Launch vehicles are rocket systems that deliver payloads from Earth to orbit or deep space using staged propulsion.",
  },
  {
    id: 8,
    title: "Crew Capsule",
    description:
      "A crew capsule is the pressurized module that carries astronauts during launch, spaceflight, and reentry. It provides life support, communications, and emergency abort capability. After reentry, capsules use parachutes or retrorockets to slow descent. Modern capsules are increasingly reusable, reducing the cost of human spaceflight significantly.",
    image: "/components/crew-capsule.jpg",
    examples: ["Dragon Crew", "Orion", "Soyuz", "Starliner", "Apollo CM"],
    aiContext:
      "Crew capsules are pressurized spacecraft modules designed for human transport during launch, orbital operations, and reentry.",
  },
  {
    id: 9,
    title: "Lunar Module",
    description:
      "A lunar module is a two-stage spacecraft built exclusively for operations near the Moon. The descent stage lands astronauts on the lunar surface, while the ascent stage lifts them back to rendezvous with an orbiting command module. Its design is optimized purely for the vacuum of space—no aerodynamic shaping required—making it a uniquely purpose-built vehicle.",
    image: "/components/lunar-module.jpg",
    examples: [
      "Apollo LM Eagle",
      "Apollo LM Challenger",
      "Blue Moon (planned)",
    ],
    aiContext:
      "Lunar modules are two-stage spacecraft designed for crewed descent to and ascent from the lunar surface in the absence of atmosphere.",
  },
  {
    id: 10,
    title: "Ion Thruster",
    description:
      "An ion thruster is an electric propulsion system that generates thrust by accelerating ionized gas (usually xenon) using electromagnetic fields. Though it produces very little force, it operates with extraordinary fuel efficiency and can run continuously for months or years. Ion thrusters are ideal for deep-space missions where gradual, sustained acceleration is more valuable than raw power.",
    image: "/components/ion-thruster.jpg",
    examples: [
      "Dawn Spacecraft Thrusters",
      "Hayabusa IKAROS",
      "BepiColombo EP System",
    ],
    aiContext:
      "Ion thrusters are electric propulsion devices that accelerate ionized propellant for highly fuel-efficient deep-space trajectory adjustments.",
  },
  {
    id: 11,
    title: "Heat Shield",
    description:
      "A heat shield is a protective structure that absorbs and dissipates the intense thermal energy generated during atmospheric reentry. As a spacecraft plunges through the atmosphere at hypersonic speeds, friction creates temperatures exceeding 1,600°C. Ablative heat shields gradually burn away to carry heat off the vehicle, keeping crew and cargo safe throughout reentry.",
    image: "/components/heat-shield.jpg",
    examples: [
      "PICA-X (Dragon)",
      "Avcoat (Orion)",
      "Apollo CM Shield",
      "HIADS",
    ],
    aiContext:
      "Heat shields are ablative or ceramic thermal protection systems that manage hypersonic reentry heating for spacecraft and crew capsules.",
  },
  {
    id: 12,
    title: "Docking Module",
    description:
      "A docking module is a pressurized interface structure that allows two spacecraft to connect in orbit and transfer crew or cargo between them. It includes latches, seals, and alignment systems that ensure an airtight connection despite relative motion in space. Standardized docking systems like IDSS now allow international spacecraft to connect regardless of their country of origin.",
    image: "/components/docking-module.jpg",
    examples: ["PMA (ISS)", "APAS-89", "NASA Docking System", "Harmony Node"],
    aiContext:
      "Docking modules are orbital interface structures enabling pressurized connection and crew or cargo transfer between spacecraft.",
  },
  {
    id: 13,
    title: "Solar Sail",
    description:
      "A solar sail is a propulsion system that harnesses the gentle pressure of sunlight on a large, ultra-thin reflective membrane to generate thrust without any propellant. While the force is minuscule, it is continuous and free—making solar sails ideal for long missions in the inner solar system. The sail's orientation relative to the Sun controls the direction and magnitude of thrust.",
    image: "/components/solar-sail.jpg",
    examples: ["LightSail 2", "IKAROS", "NEA Scout", "Solar Cruiser (planned)"],
    aiContext:
      "Solar sails use radiation pressure from sunlight on large reflective membranes for propellant-free spacecraft propulsion.",
  },
  {
    id: 14,
    title: "Communication Satellite",
    description:
      "A communication satellite relays signals between ground stations, enabling global telecommunications, internet access, television broadcasting, and data transfer. Placed in geostationary or low Earth orbit, these satellites act as orbital relay nodes connecting continents and remote regions that ground cables cannot reach. Modern constellations like Starlink bring broadband connectivity to previously unserved areas.",
    image: "/components/communication-satellite.jpg",
    examples: [
      "Intelsat 901",
      "Starlink",
      "Inmarsat",
      "SES-15",
      "Telestar 19V",
    ],
    aiContext:
      "Communication satellites relay telecommunications, internet, and broadcast signals between Earth stations via orbital transponders.",
  },
  {
    id: 15,
    title: "Weather Satellite",
    description:
      "A weather satellite continuously monitors Earth's atmosphere, oceans, and land surface to support meteorological forecasting and climate monitoring. Geostationary weather satellites provide near-real-time imagery of large regions, while polar-orbiting satellites build detailed global datasets. Their data underpins every weather forecast issued today and enables early warning of severe storms.",
    image: "/components/weather-satellite.jpg",
    examples: ["GOES-18", "NOAA-20", "Himawari-9", "Meteosat-12"],
    aiContext:
      "Weather satellites monitor atmospheric conditions and surface temperatures to support meteorological forecasting and climate research.",
  },
  {
    id: 16,
    title: "Reconnaissance Satellite",
    description:
      "A reconnaissance satellite collects high-resolution imagery and signals intelligence for national security and geopolitical monitoring. Operating in low Earth orbit, these satellites can resolve objects less than 30 centimeters across from hundreds of kilometers above Earth. Modern commercial earth observation satellites offer similar imaging capabilities with open civilian access.",
    image: "/components/reconnaissance-satellite.jpg",
    examples: ["KH-11 Kennan", "Lacrosse", "NROL missions", "Worldview-3"],
    aiContext:
      "Reconnaissance satellites collect high-resolution optical and signals intelligence data for defense, security, and geopolitical monitoring.",
  },
  {
    id: 17,
    title: "Deep Space Antenna",
    description:
      "Deep space antennas are large dish-shaped ground stations that communicate with spacecraft billions of kilometers away. NASA's Deep Space Network, with dishes up to 70 meters in diameter, sends commands and receives scientific data from probes like Voyager. Precise pointing and extremely sensitive receivers allow detection of signals weaker than a whisper from across the solar system.",
    image: "/components/deep-space-antenna.jpg",
    examples: ["DSN Goldstone", "DSN Canberra", "DSN Madrid", "ESAC ESTRACK"],
    aiContext:
      "Deep space antennas are large ground-based dish systems for bidirectional communication with interplanetary spacecraft at extreme distances.",
  },
  {
    id: 18,
    title: "Habitat Module",
    description:
      "A habitat module is a pressurized living and working space designed for astronauts on long-duration missions beyond Earth orbit. Built to sustain crew health, it incorporates life support, radiation shielding, sleeping quarters, exercise equipment, and workstations. Future lunar and Mars habitats must balance minimal mass with maximum crew comfort and safety for journeys lasting months or years.",
    image: "/components/habitat-module.jpg",
    examples: [
      "Gateway HALO",
      "BEAM (ISS)",
      "NanoRacks Starlab",
      "B330 (Bigelow)",
    ],
    aiContext:
      "Habitat modules are pressurized crewed structures providing life support, radiation protection, and working space for long-duration missions.",
  },
  {
    id: 19,
    title: "Reentry Capsule",
    description:
      "A reentry capsule is the portion of a spacecraft designed to safely return samples, cargo, or crew from orbit to Earth's surface. Its blunt-body shape creates a shockwave that deflects most heat away from the vehicle. After slowing through the atmosphere, parachutes deploy to bring the capsule to a gentle landing on land or water.",
    image: "/components/reentry-capsule.jpg",
    examples: ["Hayabusa2 SRC", "Genesis", "Stardust", "Dragon (cargo)"],
    aiContext:
      "Reentry capsules are blunt-body vehicles designed for controlled atmospheric reentry to safely return samples or cargo to Earth.",
  },
  {
    id: 20,
    title: "Cryogenic Engine",
    description:
      "A cryogenic rocket engine burns supercooled liquid hydrogen and liquid oxygen—the most energetically efficient chemical propellant combination available. Stored at temperatures below −183°C, these propellants must be carefully managed to prevent boiloff. The high performance of cryogenic engines makes them the preferred choice for upper stages and heavy-lift vehicles aimed at deep space.",
    image: "/components/cryogenic-engine.jpg",
    examples: [
      "RL-10",
      "Vulcain 2",
      "J-2X",
      "RS-25",
      "Raptor (methane variant)",
    ],
    aiContext:
      "Cryogenic engines burn liquid hydrogen and liquid oxygen for maximum chemical propulsion efficiency in upper stages and heavy-lift vehicles.",
  },
  {
    id: 21,
    title: "Booster Rocket",
    description:
      "A booster rocket provides the massive thrust needed in the first minutes of a launch to push a vehicle through the dense lower atmosphere. Boosters burn out quickly and are either discarded or—in modern designs—returned to Earth for reuse. Solid rocket boosters ignite instantly and are reliable, while liquid boosters offer the possibility of throttle control and recovery.",
    image: "/components/booster-rocket.jpg",
    examples: [
      "Falcon 9 B5",
      "SRB (SLS)",
      "P120C (Ariane 6)",
      "Soyuz Strap-ons",
    ],
    aiContext:
      "Booster rockets provide high thrust during the initial launch phase and are either discarded or recovered for reuse after burnout.",
  },
  {
    id: 22,
    title: "Cargo Spacecraft",
    description:
      "A cargo spacecraft is an uncrewed vehicle that delivers supplies, equipment, and experiments to orbiting stations or other destinations. It carries food, spare parts, scientific gear, and fuel, then is typically loaded with waste before undocking to burn up on reentry. Some cargo vehicles are partially reusable, recovering their pressurized sections for future flights.",
    image: "/components/cargo-spacecraft.jpg",
    examples: [
      "Dragon Cargo",
      "Cygnus",
      "Progress",
      "HTV (Kounotori)",
      "Tianzhou",
    ],
    aiContext:
      "Cargo spacecraft are uncrewed resupply vehicles delivering consumables, equipment, and science payloads to orbital destinations.",
  },
  {
    id: 23,
    title: "EVA Suit",
    description:
      "An Extravehicular Activity (EVA) suit is a self-contained personal spacecraft worn by astronauts during spacewalks. It maintains pressure, provides oxygen, removes carbon dioxide, regulates temperature, and shields against micrometeoroids and radiation. Modern suits include heads-up displays, integrated communications, and mobility joints that allow meaningful work in the vacuum of space.",
    image: "/components/eva-suit.jpg",
    examples: ["EMU (ISS)", "xEMU (Artemis)", "Orlan-MKS", "AxEMU (Axiom)"],
    aiContext:
      "EVA suits are wearable spacecraft providing life support, mobility, and protection for astronauts during extravehicular activities.",
  },
  {
    id: 24,
    title: "Lunar Rover",
    description:
      "A lunar rover is a vehicle designed to transport astronauts or scientific instruments across the Moon's surface. Crewed rovers dramatically extend the range astronauts can explore compared to walking, while uncrewed robotic lunar rovers operate autonomously for months. Built for the Moon's low gravity and fine regolith terrain, they use wide-mesh wheels and electric powertrains.",
    image: "/components/lunar-rover.jpg",
    examples: [
      "Apollo LRV",
      "Lunokhod 2",
      "JAXA LUNAR-A (planned)",
      "LTV (Artemis)",
    ],
    aiContext:
      "Lunar rovers are surface vehicles—crewed or robotic—designed for traversing and scientifically investigating the Moon's terrain.",
  },
  {
    id: 25,
    title: "Mars Helicopter",
    description:
      "A Mars helicopter is a rotorcraft designed to achieve flight in Mars' extremely thin atmosphere—roughly 1% the density of Earth's. Counter-rotating blades spin at very high RPM to generate lift in these conditions. Mars helicopters act as aerial scouts, scouting terrain ahead of rovers and capturing imagery from perspectives impossible at ground level.",
    image: "/components/mars-helicopter.jpg",
    examples: ["Ingenuity", "Mars Science Helicopter (planned)"],
    aiContext:
      "Mars helicopters are rotary-wing aircraft adapted for flight in Mars' thin CO₂ atmosphere, providing aerial reconnaissance for surface missions.",
  },
  {
    id: 26,
    title: "Star Tracker",
    description:
      "A star tracker is an optical sensor that determines a spacecraft's precise orientation by photographing the star field and comparing the positions of recognized stars to an onboard catalog. It provides attitude knowledge accurate to arcseconds—essential for pointing telescopes, antennas, and instruments with precision. Star trackers operate continuously and autonomously without ground input.",
    image: "/components/star-tracker.jpg",
    examples: ["Terma HE-5AS", "Ball CT-633", "DTU µASC", "Sodern SED36"],
    aiContext:
      "Star trackers are optical attitude sensors that determine spacecraft orientation by matching observed star patterns to a reference catalog.",
  },
  {
    id: 27,
    title: "Reaction Wheel",
    description:
      "A reaction wheel is a spinning flywheel inside a spacecraft that controls attitude without expelling propellant. By accelerating or decelerating the wheel, the spacecraft rotates in the opposite direction—preserving angular momentum. Arrays of three or more reaction wheels allow full three-axis attitude control, critical for precisely pointing science instruments and communication antennas.",
    image: "/components/reaction-wheel.jpg",
    examples: [
      "Kepler RWA",
      "HST Reaction Wheels",
      "GOES-R RWA",
      "Astro-H CMG",
    ],
    aiContext:
      "Reaction wheels are momentum exchange devices that provide propellant-free three-axis attitude control for spacecraft pointing.",
  },
  {
    id: 28,
    title: "CubeSat",
    description:
      "A CubeSat is a miniaturized satellite built to a standardized 10×10×10 cm unit form factor, enabling affordable access to space for universities, startups, and government agencies. They piggyback on larger rocket launches at low cost and can be deployed in constellations for imaging, communications, and science. Despite their small size, CubeSats have completed deep-space flyby demonstrations.",
    image: "/components/cubesat.jpg",
    examples: ["MarCO-A & B", "LightSail 2", "CAPSTONE", "Planet Dove"],
    aiContext:
      "CubeSats are standardized small satellites (1U–12U) enabling low-cost orbital science, technology demonstration, and constellation deployment.",
  },
  {
    id: 29,
    title: "Spaceplane",
    description:
      "A spaceplane is a reusable vehicle that takes off (or is launched) like a rocket and returns to Earth with a controlled aerodynamic landing like an aircraft. This design eliminates the need for ocean recovery and extensive refurbishment between flights. Spaceplanes blur the boundary between aircraft and spacecraft, enabling rapid turnaround and routine access to orbit.",
    image: "/components/spaceplane.jpg",
    examples: [
      "Space Shuttle",
      "X-37B",
      "Dream Chaser (planned)",
      "Hermes (cancelled)",
    ],
    aiContext:
      "Spaceplanes are reusable winged vehicles capable of orbital flight and runway landings, combining aircraft and rocket characteristics.",
  },
  {
    id: 30,
    title: "Solar Panel Array",
    description:
      "Solar panel arrays are the primary power source for most spacecraft, converting sunlight into electricity using photovoltaic cells. Large deployable wings unfurl after launch to maximize surface area, while tracking mechanisms keep them pointed toward the Sun. As missions venture farther from the Sun, where sunlight weakens, radioisotope thermoelectric generators are used instead.",
    image: "/components/solar-panel-array.jpg",
    examples: [
      "ISS PV Arrays",
      "Juno Solar Wings",
      "Starlink Panels",
      "Iridium NEXT",
    ],
    aiContext:
      "Solar panel arrays convert sunlight into electrical power for spacecraft systems using deployable photovoltaic cell wings.",
  },
  {
    id: 31,
    title: "Radioisotope Thermoelectric Generator",
    description:
      "A Radioisotope Thermoelectric Generator (RTG) produces electricity from the natural heat of decaying radioactive material—usually plutonium-238. RTGs have no moving parts, require no sunlight, and can operate reliably for decades. They are the power source of choice for missions to the outer solar system, where sunlight is too faint for solar panels to generate adequate power.",
    image: "/components/rtg.jpg",
    examples: [
      "Voyager RTG",
      "Cassini RTG",
      "Perseverance MMRTG",
      "New Horizons RTG",
    ],
    aiContext:
      "RTGs convert heat from radioactive decay into electricity, enabling long-duration power generation for spacecraft beyond the inner solar system.",
  },
  {
    id: 32,
    title: "Propellant Tank",
    description:
      "Propellant tanks store the fuel and oxidizer that power a rocket engine or spacecraft thruster. They must withstand extreme pressure while remaining as lightweight as possible—a challenging balance achieved through advanced materials like carbon fiber composites and aluminum-lithium alloys. Cryogenic propellants require heavily insulated tanks to prevent boiloff during storage.",
    image: "/components/propellant-tank.jpg",
    examples: [
      "Falcon 9 LOX Tank",
      "SLS LH2 Tank",
      "Starship Raptor Propellant Tanks",
    ],
    aiContext:
      "Propellant tanks are lightweight, high-pressure vessels storing fuel and oxidizer for rocket engines and spacecraft thrusters.",
  },
  {
    id: 33,
    title: "Attitude Control Thruster",
    description:
      "Attitude control thrusters are small rocket engines used to precisely rotate a spacecraft or make minor velocity corrections. They fire in coordinated bursts under computer control to maintain pointing accuracy or execute orbital maneuvers. Using propellants like hydrazine or cold gas, they complement reaction wheels when larger torques or translational forces are needed.",
    image: "/components/attitude-control-thruster.jpg",
    examples: [
      "Draco Thrusters (Dragon)",
      "RCS (Orion)",
      "Hydrazine RCS (Hubble)",
      "Cold Gas Jets",
    ],
    aiContext:
      "Attitude control thrusters are small monopropellant or bipropellant engines providing spacecraft orientation control and fine orbital corrections.",
  },
  {
    id: 34,
    title: "Fairing",
    description:
      "A payload fairing is the aerodynamic nose cone that protects a spacecraft during the high-speed, high-pressure ascent through Earth's atmosphere. Once the rocket reaches thin air at altitude, the fairing splits and falls away, exposing the spacecraft to space. Modern fairings are recovered by ships or parachutes for refurbishment and reuse, significantly cutting launch costs.",
    image: "/components/fairing.jpg",
    examples: [
      "Falcon 9 Fairing",
      "Vulcan Fairing",
      "Ariane 6 Fairing",
      "Atlas V PLF",
    ],
    aiContext:
      "Payload fairings are jettisoned aerodynamic enclosures that protect spacecraft from aerodynamic loads and heating during atmospheric ascent.",
  },
  {
    id: 35,
    title: "Separation System",
    description:
      "A separation system is the mechanical and pyrotechnic interface that cleanly disconnects one spacecraft component from another at precisely the right moment during a mission. Whether releasing a satellite from a rocket, jettisoning a fairing, or decoupling stages, separation must be clean, reliable, and non-contaminating. Small explosive bolts or pneumatic pushers execute separation in milliseconds.",
    image: "/components/separation-system.jpg",
    examples: [
      "Clamp Band (ESPA)",
      "Motorized Lightband",
      "Marman Ring",
      "Frangibolt",
    ],
    aiContext:
      "Separation systems are pyrotechnic or mechanical interfaces that release spacecraft components—stages, fairings, satellites—at programmed mission events.",
  },
  {
    id: 36,
    title: "Navigation System",
    description:
      "A spacecraft navigation system determines its precise position, velocity, and trajectory through space. It combines onboard sensors—star trackers, IMUs, altimeters—with radio ranging from ground stations and, increasingly, autonomous optical navigation. Accurate navigation is essential for executing orbital maneuvers, landing on target, and rendezvousing with other spacecraft.",
    image: "/components/navigation-system.jpg",
    examples: [
      "GEONS (ISS)",
      "ODIN (Orion)",
      "OpNav (OSIRIS-REx)",
      "TRN (Perseverance)",
    ],
    aiContext:
      "Spacecraft navigation systems integrate sensor data and ground tracking to determine precise position and velocity for trajectory control.",
  },
  {
    id: 37,
    title: "Onboard Computer",
    description:
      "The onboard computer is the central processing unit of a spacecraft, executing flight software, managing subsystems, processing sensor data, and handling fault detection and recovery. Space-rated processors are specially designed to withstand radiation, which can corrupt standard computer chips. Redundant computers run in parallel to ensure mission continuity if one fails.",
    image: "/components/onboard-computer.jpg",
    examples: [
      "RAD750 (Curiosity)",
      "LEON4 (BepiColombo)",
      "RAD5545 (Orion)",
      "SpaceCube-3",
    ],
    aiContext:
      "Onboard computers are radiation-hardened processors managing spacecraft avionics, flight software execution, and fault protection systems.",
  },
  {
    id: 38,
    title: "Thermal Control System",
    description:
      "A thermal control system keeps spacecraft components within their operating temperature range despite extreme swings between sunlit and shadowed environments. Passive elements—thermal coatings, insulation blankets, and heat pipes—handle routine thermal loads, while active heaters and louvers manage extremes. Without thermal control, electronics and fuel lines would freeze or overheat quickly in space.",
    image: "/components/thermal-control-system.jpg",
    examples: [
      "ATCS (ISS)",
      "MLI Blankets",
      "Loop Heat Pipes (MRO)",
      "Radiator Panels",
    ],
    aiContext:
      "Thermal control systems use passive insulation and active heaters or radiators to maintain spacecraft component temperatures within operational limits.",
  },
  {
    id: 39,
    title: "Robotic Arm",
    description:
      "A robotic arm extends a spacecraft's manipulation capability, enabling astronauts or ground controllers to grapple, reposition, inspect, and assemble structures in orbit. Space-rated robotic arms are built for extreme precision, vacuum operation, and long service life. They have been instrumental in servicing the Hubble Space Telescope and assembling the International Space Station.",
    image: "/components/robotic-arm.jpg",
    examples: [
      "Canadarm2 (ISS)",
      "ERA (ISS)",
      "Dextre",
      "JEMRMS",
      "Perseverance Sample Arm",
    ],
    aiContext:
      "Robotic arms are multi-joint manipulators used in orbit for satellite grappling, station assembly, EVA support, and sample collection.",
  },
  {
    id: 40,
    title: "Space Tug",
    description:
      "A space tug is an in-space propulsion vehicle designed to transfer payloads between orbits—such as from low Earth orbit to geostationary orbit—without requiring the launch vehicle to reach those higher destinations. Space tugs extend the versatility of launch vehicles and are a key enabling technology for lunar logistics and satellite servicing missions.",
    image: "/components/space-tug.jpg",
    examples: [
      "Centaur Upper Stage",
      "MIRA (D-Orbit)",
      "Sherpa-FX (Spaceflight)",
      "JSAT Tug",
    ],
    aiContext:
      "Space tugs are in-space propulsion vehicles that transport payloads between orbital regimes independent of the primary launch vehicle.",
  },
  {
    id: 41,
    title: "Inflatable Module",
    description:
      "An inflatable module (or expandable habitat) is launched in a compact, folded configuration and inflated with gas once in space to create a large pressurized volume. This approach offers significantly more habitable space per kilogram of mass launched compared to rigid aluminum structures. Inflatable modules show promise for future lunar bases, deep-space habitats, and commercial space stations.",
    image: "/components/inflatable-module.jpg",
    examples: ["BEAM (ISS)", "Genesis I & II", "Bigelow B330", "Sierra LIFE"],
    aiContext:
      "Inflatable modules are expandable pressurized habitat structures that deploy from compact launch volumes to create large crewed living spaces.",
  },
  {
    id: 42,
    title: "Spectrometer",
    description:
      "A spectrometer is a scientific instrument that separates light or particles into their component wavelengths or energies to identify the chemical composition of a target. On planetary missions, spectrometers analyze surface minerals, atmospheric gases, and organic compounds. They are among the most powerful tools in space science, remotely identifying elements from orbit or at the surface.",
    image: "/components/spectrometer.jpg",
    examples: [
      "CRISM (MRO)",
      "SHERLOC (Perseverance)",
      "MIMOS II (MER)",
      "SPICAV (Venus Express)",
    ],
    aiContext:
      "Spectrometers disperse electromagnetic radiation to analyze the chemical composition of planetary surfaces, atmospheres, and cosmic bodies.",
  },
  {
    id: 43,
    title: "Magnetometer",
    description:
      "A magnetometer measures the strength and direction of magnetic fields in space. By mapping magnetic field variations around planets, moons, and the Sun, scientists infer subsurface composition, internal structure, and space weather conditions. Magnetometers are often mounted on long booms to minimize interference from the spacecraft's own electronic equipment.",
    image: "/components/magnetometer.jpg",
    examples: ["MAG (Cassini)", "MAVEN MAG", "Juno FGM", "InSight IFP"],
    aiContext:
      "Magnetometers measure magnetic field strength and direction, enabling planetary interior studies and space weather characterization.",
  },
  {
    id: 44,
    title: "Landing Radar",
    description:
      "Landing radar is a sensor system used during the final descent phase of a lander or crewed vehicle to measure altitude and velocity relative to the surface with high precision. It enables autonomous hazard avoidance and touchdown accuracy. Without reliable radar altimetry, safe powered descent through the chaotic terrain of another world would be nearly impossible.",
    image: "/components/landing-radar.jpg",
    examples: [
      "MOLA (Mars Global Surveyor)",
      "TRN Radar (Perseverance)",
      "Lunar Descent Radar (Apollo)",
      "Schiaparelli DEM",
    ],
    aiContext:
      "Landing radar provides precise altitude and velocity measurements during powered descent to enable safe and accurate planetary surface landings.",
  },
  {
    id: 45,
    title: "High-Gain Antenna",
    description:
      "A high-gain antenna (HGA) is a large, directional dish antenna on a spacecraft that focuses its radio beam precisely toward Earth for high-bandwidth data transmission across interplanetary distances. Unlike omnidirectional antennas, HGAs require accurate pointing but reward that precision with data rates orders of magnitude faster—making them essential for returning science images and telemetry from deep space.",
    image: "/components/high-gain-antenna.jpg",
    examples: [
      "Cassini HGA",
      "MRO HGA",
      "Voyager HGA",
      "Juno HGA",
      "New Horizons HGA",
    ],
    aiContext:
      "High-gain antennas are focused directional dishes on spacecraft enabling high-bandwidth telemetry and data uplink/downlink across deep-space distances.",
  },
  {
    id: 46,
    title: "Sample Return Capsule",
    description:
      "A sample return capsule is a hardened reentry vessel that carries pristine extraterrestrial material—soil, rock, or atmospheric particles—back to Earth for laboratory analysis. These capsules must survive extreme reentry heating while keeping their contents sealed and uncontaminated. Samples returned from asteroids and comets contain material from the earliest epoch of the solar system.",
    image: "/components/sample-return-capsule.jpg",
    examples: [
      "Hayabusa2 SRC",
      "OSIRIS-REx SRC",
      "Genesis SRC",
      "Stardust SRC",
    ],
    aiContext:
      "Sample return capsules are hardened reentry vehicles that safely transport extraterrestrial geological or atmospheric samples back to Earth.",
  },
  {
    id: 47,
    title: "Gyroscope",
    description:
      "Gyroscopes measure a spacecraft's rotation rate and angular momentum, providing real-time attitude data that complements star trackers for continuous orientation knowledge. Fiber optic and hemispherical resonator gyroscopes have replaced older spinning-mass designs in modern spacecraft, offering greater reliability and longer service life. Gyroscope data feeds directly into the attitude control loop.",
    image: "/components/gyroscope.jpg",
    examples: [
      "HST Rate Sensing Units",
      "SIRU (GOES-R)",
      "HRG (Cassini)",
      "MEMS IMU (CubeSats)",
    ],
    aiContext:
      "Gyroscopes measure spacecraft rotation rates for continuous attitude determination, complementing star trackers in the attitude control system.",
  },
  {
    id: 48,
    title: "Deployable Boom",
    description:
      "A deployable boom is an extendable structure used to position instruments, antennas, or solar panels away from the spacecraft body. Booms minimize electromagnetic interference from the main spacecraft bus on sensitive magnetometers or plasma sensors, and provide the mechanical reach needed to deploy wide solar arrays. They fold compactly during launch and extend reliably on command in space.",
    image: "/components/deployable-boom.jpg",
    examples: [
      "STEM Boom (GOES)",
      "Magnetometer Boom (Cassini)",
      "Solar Array Boom (Juno)",
      "ISARA Ka-band Boom",
    ],
    aiContext:
      "Deployable booms are extendable spacecraft structures that position sensors, antennas, or arrays away from the main bus to reduce interference or increase reach.",
  },
];

export default spaceComponents;
