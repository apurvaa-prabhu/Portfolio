export type Project = {
  slug: string;
  num: string;
  award?: string;
  name: string;
  tagline: string;
  story: string;
  detail: string[];
  stack: string[];
  devpost?: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "buddy",
    num: "01",
    award: "WHACK 2025 — Best Use of Google AI Tools + Best Use of ElevenLabs (MLH)",
    name: "Buddy",
    tagline: "Real-time Pedestrian Safety System",
    story:
      "People cross streets every day, but for visually impaired pedestrians, it's a different experience. Buddy is a mobile app our team built at WHACK 2025 that uses live camera input to detect hazards in real time — traffic, obstacles, fast-moving objects. The project won two MLH category awards for its use of Google Gemini and ElevenLabs to deliver low-latency spoken alerts. The goal was to make accessibility feel native, not bolted on.",
    detail: [
      "Buddy started as a question: what if your phone could warn you about danger before you saw it? Our team built this at WHACK 2025, and it won Best Use of Google AI Tools and Best Use of ElevenLabs — two separate MLH category awards.",
      "The core challenge was latency. Voice alerts are useless if they arrive a second too late. The pipeline was optimized so that frame capture, depth estimation, hazard classification, and audio output all happen within a tight loop — fast enough to be genuinely useful in real pedestrian scenarios.",
      "The computer vision pipeline uses monocular depth estimation to infer how far away objects are from a single camera frame — no depth sensor required, just a phone camera. Combined with motion tracking, the app can distinguish a parked car from one approaching fast, and prioritize alerts accordingly.",
      "Google Gemini handles contextual scene understanding — turning raw detections into natural language descriptions that ElevenLabs then speaks aloud. The integration was designed to feel ambient rather than alarming, giving users information without overwhelming them.",
    ],
    stack: ["React Native", "JavaScript", "Google Gemini API", "ElevenLabs API", "Computer Vision", "Monocular Depth Estimation"],
    devpost: "https://devpost.com",
    highlights: [
      "Won 2 MLH category awards at WHACK 2025",
      "Real-time computer vision pipeline with monocular depth estimation",
      "Low-latency voice alerts optimized for accessibility",
      "Designed to work with just a phone camera — no extra hardware",
    ],
  },
  {
    slug: "mapping-for-good",
    num: "02",
    award: "CivicHacks 2026 — Original Research Award",
    name: "Mapping for Good",
    tagline: "Boston Food Ecosystem & Equity Platform",
    story:
      "Who has access to food in Boston, and who doesn't? Our team built a geospatial visualization platform that integrates Boston Open Data and the American Community Survey to map food production, distribution infrastructure, and demographic data side by side — so researchers, policymakers, and communities can see inequity at the neighborhood level.",
    detail: [
      "This project won the Original Research Award at CivicHacks 2026. The goal was to make a complex, fragmented dataset navigable — and to make the inequities it revealed impossible to ignore.",
      "We integrated two primary data sources: Boston Open Data (food pantries, grocery stores, community gardens, farmers markets) and the American Community Survey (income levels, vehicle access, population density by neighborhood). Layering these together made visible patterns that neither dataset showed alone.",
      "A key challenge was building data pipelines that could handle inconsistent formats, missing values, and mismatched geographic identifiers across datasets — normalized into a unified geospatial schema that the visualization layer could reliably query.",
      "The frontend was built to be genuinely interactive — users can toggle layers, zoom to neighborhoods, and explore specific data points. Every visualization choice was made to surface insight, not to show off.",
    ],
    stack: ["JavaScript", "Geospatial Analysis", "Data Visualization", "Boston Open Data", "American Community Survey"],
    devpost: "https://devpost.com",
    highlights: [
      "Won Original Research Award at CivicHacks 2026",
      "Integrated multiple public datasets into a unified geospatial schema",
      "Data pipelines handling inconsistent formats across sources",
      "Interactive neighborhood-level visualizations for policymakers and communities",
    ],
  },
  {
    slug: "skin-analysis",
    num: "03",
    name: "AI Skin Analysis System",
    tagline: "Deep Learning Pipeline for Multi-Attribute Skin Analysis",
    story:
      "A deep learning pipeline for multi-attribute skin analysis from facial images. The project involved fine-tuning MobileNetV2 using transfer learning, optimizing validation performance, and building a FastAPI backend with RESTful endpoints for real-time inference.",
    detail: [
      "The goal was to build a model that could analyze multiple skin attributes simultaneously — tone, texture, and condition — from a single facial image, and serve predictions fast enough for real-time use.",
      "MobileNetV2 was chosen as the base architecture for its efficiency — designed to run well on constrained hardware, which matters for eventual mobile deployment. Fine-tuning with transfer learning made it possible to adapt the model to the domain without needing a massive labeled dataset.",
      "The training process involved careful hyperparameter tuning and validation monitoring to avoid overfitting. Multiple metrics were tracked across attributes to ensure the model was genuinely learning each task rather than optimizing for a single combined loss.",
      "The FastAPI backend exposes RESTful endpoints that accept image uploads and return structured predictions — stateless, containerizable, and built for scalable deployment.",
    ],
    stack: ["Python", "PyTorch", "MobileNetV2", "Transfer Learning", "FastAPI", "REST APIs"],
    highlights: [
      "Fine-tuned MobileNetV2 for multi-attribute skin classification",
      "Transfer learning approach — no large labeled dataset required",
      "FastAPI backend with RESTful inference endpoints",
      "Lightweight architecture suitable for mobile deployment",
    ],
  },
  {
    slug: "inia-biosciences",
    num: "04",
    name: "INIA Biosciences",
    tagline: "Research Website",
    story:
      "Built a responsive research website as part of an Agile Scrum team. The work included dynamic search functionality, CMS integration via Sanity, and resolving cross-browser UI inconsistencies. Research labs deserve good software too.",
    detail: [
      "INIA Biosciences needed a web presence that matched the quality of their scientific work. The team worked in an Agile Scrum setup — sprint planning, code reviews, and iterative delivery throughout.",
      "The dynamic search functionality needed to work across publications, team members, and research areas simultaneously, with results updating in real time as users typed — one of the more technically interesting parts of the project.",
      "Content management was handled via Sanity CMS, giving the research team a clean interface to update their own content without needing engineering support. This involved setting up schemas and integrating the data layer with the Next.js frontend.",
      "Cross-browser compatibility required more work than expected — Safari, Firefox, and Chrome each had quirks that needed specific handling, and fixes were documented to help the team maintain consistency going forward.",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Sanity CMS", "TypeScript", "Agile / Scrum"],
    highlights: [
      "Delivered in Agile Scrum team with regular sprint cycles",
      "Dynamic real-time search across multiple content types",
      "Sanity CMS integration for non-technical content editors",
      "Cross-browser compatibility across Safari, Chrome, and Firefox",
    ],
  },
];
