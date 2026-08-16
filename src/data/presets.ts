import { FilmProjectInput } from '../types';

export const FILM_PRESETS: { name: string; tag: string; description: string; data: FilmProjectInput }[] = [
  {
    name: "The Last Signal",
    tag: "Nigerian Sci-Fi Thriller",
    description: "Predictive AI algorithm causes cascading tragedies on a Lagos university campus.",
    data: {
      title: "THE LAST SIGNAL",
      genre: "Sci-Fi / Psychological Thriller",
      country: "Nigeria",
      targetAudience: "Urban African Youth (18-35), Global Sci-Fi Cinephiles & Diaspora Streamers",
      budget: "Low ($50k-$250k)",
      format: "Feature Film",
      concept: "A low-budget Nigerian sci-fi thriller about a university student at UNILAG who discovers an experimental AI algorithm in an abandoned tech lab that accurately predicts impending student deaths, but every prediction she intervenes to prevent causes an even deadlier cascading catastrophe across Lagos.",
      themes: "Determinism vs. Free Will, Technological ethics, Moral culpability, Urban survival, Modern Nigerian academic pressures",
      comparableFilms: "The Butterfly Effect, Final Destination, Primer, Mami Wata",
      directorVision: "High-contrast neon-lit Lagos nights contrasted with humid lecture halls. Pulsating Afro-electronic synth pulses blending with ambient generator hums.",
      culturalContext: "Authentic university slang, seamless English/Yoruba/Pidgin code-switching, the tension between traditional spiritual beliefs regarding destiny ('Akadara') and computation."
    }
  },
  {
    name: "Lagos Cyber-Heist",
    tag: "Afrofuturist Heist / Action",
    description: "Disillusioned fintech engineers attempt to siphon stolen corrupt funds during a nationwide digital currency rollout.",
    data: {
      title: "LAGOS CYBER-HEIST",
      genre: "Action / Crime Thriller",
      country: "Nigeria",
      targetAudience: "Young Urban Professionals (20-40), Action & Tech Thriller Fans",
      budget: "Medium ($250k-$1M)",
      format: "Feature Film",
      concept: "A crew of four underpaid Lagos fintech engineers plan a 90-minute digital heist to redirect $40 million in laundered political funds during the launch of Nigeria's next-generation central bank crypto infrastructure, only to discover the heist was orchestrated by a rogue AI system playing them against a ruthless cartel.",
      themes: "Systemic wealth inequality, Tech rebellion, Loyalty under extreme duress, Institutional corruption",
      comparableFilms: "Baby Driver, Ocean's Eleven, Mr. Robot, King of Boys",
      directorVision: "Sleek glass high-rises in Victoria Island juxtaposed with neon computer screens and high-speed motorcycle chases through mainland Lagos traffic.",
      culturalContext: "Nigerian startup hustle culture, Yabacon Valley tech terminology, Pidgin humor mixed with sharp financial jargon."
    }
  },
  {
    name: "Ancestral Frequency",
    tag: "Supernatural African Horror",
    description: "An audio restorer working on archival radio tapes accidentally unleashes a dormant acoustic spirit in Accra.",
    data: {
      title: "ANCESTRAL FREQUENCY",
      genre: "Horror / Supernatural Thriller",
      country: "Ghana",
      targetAudience: "Elevated Horror Fans (A24 style), African Folklore Enthusiasts, 18-35",
      budget: "Micro (<$50k)",
      format: "Feature Film",
      concept: "An obsessive Ghanaian sound engineer hired to digitize deteriorating 1960s state radio broadcast archives in Accra discovers a recurring ultrasonic chant that drives anyone who listens to enact ancient retribution against bloodline debts.",
      themes: "Historical amnesia, Acoustic trauma, Ancestral guilt, Sonic horror",
      comparableFilms: "Berberian Sound Studio, Talk to Me, His House, Relic",
      directorVision: "Claustrophobic acoustic studio atmosphere with deep bass rumbles and surreal optical tape distortions. Muted vintage color grading.",
      culturalContext: "Ghanaian highlife history, Akan oral folklore, respect for ancestral spirits, post-colonial radio legacy."
    }
  },
  {
    name: "The Savannah Accord",
    tag: "Pan-African Political Drama",
    description: "A tense diplomatic stand-off in Nairobi between wildlife rangers and international mining conglomerates.",
    data: {
      title: "THE SAVANNAH ACCORD",
      genre: "Political Thriller / Drama",
      country: "Kenya / Pan-African",
      targetAudience: "Mature Festival Audiences (25-60), Political Drama Buffs, International Streamers",
      budget: "Medium ($250k-$1M)",
      format: "Limited Series",
      concept: "When rare earth minerals are discovered beneath an ancestral Maasai conservancy in the Great Rift Valley, a female Kenyan diplomat must navigate corrupt multinational corporate spies, armed local militias, and her own family ties over five fateful days before an irreversible trade deal is signed.",
      themes: "Green energy colonialism, Indigenous sovereignty, Environmental justice, Family sacrifice",
      comparableFilms: "The Constant Gardener, Syriana, The Diplomat, Blood Diamond",
      directorVision: "Wide anamorphic vistas of the Rift Valley contrasted with tense, air-conditioned diplomatic boardrooms in Nairobi.",
      culturalContext: "Maasai land tenure customs, Swahili and English diplomatic discourse, complex regional geopolitical pressures."
    }
  }
];
