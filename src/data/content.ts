export interface Product {
  id: number;
  title: string;
  format: string;
  price: number;
  description: string;
  fullDescription: string;
  image: string;
  badge?: string;
  pages?: number;
  isDigital?: boolean;
  features: string[];
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  category: string;
  summary: string;
  content: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "The Legacy Blueprint",
    format: "Paperback Edition",
    price: 19.99,
    description: "A step-by-step guide to defining your core values and building an enduring legacy your family will cherish.",
    fullDescription: "A comprehensive framework forged through military leadership and decades of fatherhood. 'The Legacy Blueprint' guides you through establishing an unshakeable family philosophy, setting generational financial benchmarks, and conducting family council meetings.",
    image: "/src/assets/images/book_legacy_blueprint_1791649586275.jpg",
    badge: "Bestseller",
    pages: 248,
    isDigital: false,
    features: [
      "Hardcopy linen-bound paperback",
      "Chapter reflection exercises",
      "Family constitution draft template",
      "Free companion digital audio introduction"
    ]
  },
  {
    id: 2,
    title: "The Legacy Blueprint",
    format: "eBook (PDF & EPUB)",
    price: 9.99,
    description: "The full book in instant digital format. Formatted for iPad, Kindle, phone, and e-readers.",
    fullDescription: "Gain immediate access to 'The Legacy Blueprint'. Read on any tablet, Kindle, or mobile device with hyperlinked chapter summaries and printable worksheet attachments.",
    image: "/src/assets/images/book_legacy_blueprint_1791649586275.jpg",
    badge: "Instant Download",
    pages: 248,
    isDigital: true,
    features: [
      "Instant PDF & EPUB delivery",
      "Optimized for Kindle & Apple Books",
      "Searchable text & highlighted excerpts",
      "Printable reflection worksheets included"
    ]
  },
  {
    id: 3,
    title: "The Steady Father Workbook",
    format: "Printable Spiral Workbook",
    price: 14.99,
    description: "Weekly exercises and prompts to build habits of presence, patience, and leadership at home.",
    fullDescription: "Practical, weekly exercises designed for busy men. Tackle emotional regulation, communication with your spouse, one-on-one rituals with each child, and self-auditing routines.",
    image: "/src/assets/images/book_steady_father_workbook_1791649602300.jpg",
    badge: "Hands-on Guide",
    pages: 140,
    isDigital: true,
    features: [
      "52-week guided accountability journal",
      "Weekly parent-child debrief prompts",
      "High-resolution printable 8.5x11 layout",
      "Fillable digital PDF fields included"
    ]
  },
  {
    id: 4,
    title: "The Legacy Daily Journal",
    format: "Hardcover Keepsake Edition",
    price: 24.99,
    description: "Daily 5-minute morning anchors and evening reflections to maintain focus, discipline, and intentionality.",
    fullDescription: "A durable clothbound companion designed to sit on your nightstand. Features structured prompts to clear morning mental fog and close every day in peace and gratitude.",
    image: "/src/assets/images/book_legacy_blueprint_1791649586275.jpg",
    badge: "New Release",
    pages: 180,
    isDigital: false,
    features: [
      "Heavyweight 120gsm fountain-pen friendly paper",
      "Ribbon bookmark & gold foil detailing",
      "Daily stoic & biblical leadership prompts",
      "Weekly generational tracking scorecard"
    ]
  }
];

export const ARTICLES: Article[] = [
  {
    id: "steady-father-habits",
    title: "5 Habits of a Steady Father",
    subtitle: "Small daily actions that build unshakeable trust and security at home.",
    readTime: "5 min read",
    category: "Fatherhood",
    summary: "Your children don't remember the stress you felt at work; they remember the tone of voice when you walked through the front door.",
    content: [
      "In the military, calmness under fire is not an innate personality trait; it is a conditioned response. At home, when your household is chaotic or your children are melting down, your first duty is to be the thermostat, not the thermometer.",
      "Habit 1: The Threshold Reset. Before turning the handle on your front door after a long day, sit in your car for 90 seconds. Exhale the work pressure. Remind yourself: 'The people inside this house deserve my best self, not my leftovers.'",
      "Habit 2: Uninterrupted Eye Contact. When your child or wife speaks to you, turn your entire torso toward them, set your phone screen face down, and look them directly in the eyes. Five minutes of full presence outshines an hour of distracted hovering.",
      "Habit 3: Predictable Emotional Stability. Children test boundaries to see where the walls are. If the walls shake unpredictably depending on your mood, anxiety thrives. Let your standards be consistent and your temper slow to ignite.",
      "Habit 4: The 1-on-1 Mini Ritual. Schedule individual time with each child regularly—even a 20-minute trip to grab coffee or check tire pressure. Give them dedicated space where you listen more than you lecture.",
      "Habit 5: Honor Their Mother Publicly. One of the greatest gifts you give your children is the absolute certainty that you love, respect, and support their mother with unbending fidelity."
    ]
  },
  {
    id: "family-mission-statement",
    title: "Writing Your Family Mission",
    subtitle: "A practical exercise to define what your family stands for across generations.",
    readTime: "7 min read",
    category: "Family Leadership",
    summary: "Without an agreed compass, cultural drift will dictate your family's priorities. Here is how to forge a family constitution.",
    content: [
      "Every high-performing unit has an operational charter. Without a mission statement, a family is just a collection of individuals living under the same roof, reacting to outside schedules.",
      "Step 1: The Core Values Discovery. Gather your family around the dinner table. Ask simple questions: 'What makes someone in our family feel proud?', 'When someone outside meets us, what reputation do we want to have?', and 'How do we treat each other when things go wrong?'",
      "Step 2: Narrow to 4 Non-Negotiable Pillars. Common pillars include Truthfulness, Steadfast Effort, Kindness in Speech, and Stewardship of Resources. Less is more—if you have twenty values, you have none.",
      "Step 3: Draft Concrete Declarations. Instead of vague aspirations like 'Be Good', write: 'We tell the truth even when it costs us,' 'We do not quit when we are tired; we finish when the job is done,' and 'We protect and lift each other up.'",
      "Step 4: Frame and Recite. Print your charter and hang it where everyone sees it daily. When hard decisions arise or conflicts emerge, refer back to it not with anger, but as a compass: 'Does this choice match who we are?'"
    ]
  },
  {
    id: "military-to-home-leadership",
    title: "From Military to Home Leadership",
    subtitle: "Translating tactical discipline into patience, warmth, and enduring presence.",
    readTime: "6 min read",
    category: "Veteran Growth",
    summary: "Command authority works in the field; at home, true influence requires vulnerability, listening, and patience.",
    content: [
      "Many veterans struggle with the shift from high-stakes military environments to domestic life. In uniform, communication is direct, orders are obeyed, and procedures are defined. In marriage and fatherhood, barking commands creates resentment rather than alignment.",
      "The Shift from Authority to Influence: You cannot order a child to trust you, and you cannot demand intimacy from your spouse with an operational order. Influence is earned through consistent service and active listening.",
      "Discipline Reimagined as Gentleness: True discipline is not harshness. The strongest warrior is the one with supreme restraint. Channel your military discipline into controlling your tongue, regulating your nervous system, and showing up with warmth.",
      "Mission Focus on the Long Game: Military operations look at tactical timelines, but fatherhood operates in multi-decade generational horizons. The small seeds of patience you plant today will echo into your grandchildren's lives."
    ]
  }
];

export const COACHING_DETAILS = {
  oneOnOne: {
    title: "1-on-1 Legacy Coaching",
    format: "Private Intensive via Zoom",
    commitment: "3 or 6 Month Engagements",
    description: "Direct, personalized guidance and rigorous accountability built around your personal character, marriage, fatherhood, and career leadership.",
    benefits: [
      "Comprehensive Initial Legacy Audit & Life Blueprint",
      "Bi-weekly 60-minute confidential 1-on-1 Zoom sessions",
      "Private direct messaging access between sessions for real-time challenges",
      "Tailored marriage and fatherhood rituals built for your exact family dynamic",
      "Personalized readings, workbook assignments, and tracking tools"
    ]
  },
  group: {
    title: "Legacy Cohort Coaching",
    format: "Small Cohort (Max 8 Men)",
    commitment: "8-Week Intensive",
    description: "Grow alongside high-caliber men who hold you to your highest standard. Share real challenges, dismantle blind spots, and form lifelong brotherhood.",
    benefits: [
      "Weekly 75-minute live cohort strategy & debrief calls",
      "Curated cohort workbook and weekly accountability pairings",
      "Private brotherhood community forum and resource vault",
      "Safe environment to tackle marriage, parenting, and leadership roadblocks",
      "Substantially lower cost entry point with powerful peer accountability"
    ]
  }
};
