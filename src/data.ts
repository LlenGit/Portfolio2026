export const PORTFOLIO_DATA = {
  profile: {
    name: "Laishram Llhanba",
    title: "Electrical Engineer",
    tagline: "Building where hardware meets intelligence.",
    email: "laishramllhanba@gmail.com",
    phone: "+91-9362983641",
    location: "Sagolband Thangjam Leirak, Imphal West, Manipur 795001",
    about: "A dedicated B.Tech student specializing in Electrical Engineering with a strong passion for IoT and Computer Vision technologies. I enjoy exploring innovative solutions that integrate hardware and software to create smart, efficient systems.",
    profileImage: "profile-photo.jpeg", // User uploaded profile picture
    social: {
      github: "https://github.com/LlenGit",
      linkedin: "https://www.linkedin.com/in/llhanba-laishram-59b5312ab/",
      instagram: "https://www.instagram.com/llhanba_laishram/"
    }
  },
  hero: {
    name: "Laishram Llhanba",
    title: "Electrical Engineer",
    subtitle: "Electrical Engineer · Imphal",
    tagline: "Building where hardware meets intelligence.",
    description: "Crafting smart systems at the intersection of embedded hardware, computer vision, and AI.",
    buttons: [
      { label: "View Projects", link: "#projects" },
      { label: "Get in Touch", link: "#contact" }
    ]
  },
  about: {
    bio: "A dedicated B.Tech student in Electrical Engineering with a strong passion for IoT and computer vision technologies. I enjoy building innovative solutions that integrate hardware and software into smart, efficient systems.",
    highlight_stats: [
      { label: "CGPA", value: "8.00" },
      { label: "Projects Built", value: "4+" },
      { label: "Internships", value: "3" },
      { label: "Awards", value: "4+" }
    ]
  },
  skills: {
    "General": ["C++", "Python", "MS Office", "Git", "GitHub", "VS Code", "Figma"],
    "AI & Computer Vision": ["OpenCV", "MediaPipe", "NumPy", "TensorFlow", "Keras", "MATLAB", "Simulink"],
    "IoT & Embedded Systems": ["Arduino", "ESP8266", "ESP32", "Raspberry Pi"],
    "Tools & Platforms": ["AI/ML", "Agentic AI", "n8n", "Google Cloud API"]
  },
  projects: [
    {
      title: "Vision-Based Wireless Robotic Hand",
      description: "Integrates IoT and Computer Vision to create a dynamic control system for a robotic hand — controlled wirelessly through real-time hand gesture recognition using MediaPipe and OpenCV.",
      image: "inmoov_robot_hand_3d_print4.jpg?q=80&w=1470&auto=format&fit=crop",
      stack: ["Python", "OpenCV", "MediaPipe", "Arduino", "ESP32"],
      demo: "#",
      github: "https://github.com/LlenGit/vision-based-robotic-hand"
    },
    {
      title: "Automatic License Plate Recognition (ALPR) System",
      description: "Integrates Raspberry Pi with Google Cloud Vision API and computer vision to detect license plates in real time and perform OCR for automated recording.",
      image: "1725625319936.jpg?q=80&w=1470&auto=format&fit=crop",
      stack: ["Python", "Raspberry Pi", "OpenCV", "Google Cloud API"],
      demo: "https://youtu.be/wkm_uxWz4Zo",
      github: "https://github.com/LlenGit/ALPR-using-Goggle-Cloud-Vision-API-on-Raspberry-Pi-4-with-a-web-dashboard"
    },
    {
      title: "Secure-Flight System",
      description: "An autonomous aerial system with obstacle detection, avoidance, and anti-crash capabilities.",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1470&auto=format&fit=crop",
      stack: ["Python", "Arduino", "Sensors", "Embedded Systems"],
      demo: "#",
      github: "#"
    },
    {
      title: "Brain Tumor Detection & Segmentation",
      description: "A 2-stage deep learning pipeline using ResNet50 and ResUNet architectures integrated to detect and segment tumors at pixel level in MRI scans.",
      image: "mri.png?q=80&w=1470&auto=format&fit=crop",
      stack: ["Python", "TensorFlow", "Keras", "ResNet50", "ResUNet", "NumPy"],
      demo: "#",
      github: "https://github.com/LlenGit/Medical_Image_processing"
    }
  ],
  experience: [
    {
      company: "Agentic AI Saksham",
      role: "Hackathon Participant",
      duration: "May 11 — 13, 2026",
      location: "DM College of Science, DMU, Imphal",
      description: "2 days workshop and a hackathon organised by the Ministry of Education, Government of Manipur in collaboration with Capabl.in.",
      type: "Competition"
    },
    {
      company: "Manipur State Power Company Limited (MSPCL)",
      role: "On-Site Intern — SLDC",
      duration: "July 21, 2025 — Aug 20, 2025",
      location: "Yurembam Substation, Manipur",
      description: "Hands-on experience in power system operations and load dispatching at State Load Dispatch Centre.",
      type: "Internship"
    },
    {
      company: "IoT Internship Program",
      role: "IoT Developer Intern",
      duration: "July 29, 2024 — Aug 31, 2024",
      location: "Cubeten Technologies, Imphal",
      description: "Built an ALPR System integrating Raspberry Pi, OpenCV and Google Cloud API.",
      type: "Internship"
    },
    {
      company: "IEEE Summer Internship Program IS3IP-2024",
      role: "Research Intern",
      duration: "June 30, 2024 — Aug 15, 2024",
      location: "NIT Silchar,Assam",
      description: "Research on Electrochemical Impedance Measurement Systems at IEEE Student Summer Internship Program.",
      type: "Internship"
    }
  ],
  achievements: [
    {
      title: "MASTEC Innovative R&D Project for Eng. students",
      body: "Selected for Innovative R&D Projects (2025–2026) for partial financial assistance under Manipur Science & Technology Council.",
      date: "May 13, 2026",
      icon: "Financial Assistance"
    },
    {
      title: "1st Prize — Creative Robo Design",
      body: "DST Manipur's INNOTECH FEST 2025 winner in Creative Robo Design competition.",
      date: "July 19, 2025",
      icon: "Cash Prizes"
    },
    {
      title: "Winner — World Slogan Writing",
      body: "Winner of World Slogan Writing Competition in observation of World IP Day organised by IPR-Cell MTU.",
      date: "April 26, 2024",
      icon: "Cash Prizes"
    },
    {
      title: "CSIR Quiz — JIGYASA Excellence",
      body: "Participation and Achieving Excellence in CSIR Quiz at 105th Indian Science Congress.",
      date: "March 16 — 20, 2018",
      icon: "Award"
    }
  ],
  education: [
    {
      institution: "Manipur Technical University",
      degree: "B.Tech in Electrical Engineering",
      duration: "2022 — Present",
      detail: "Currently pursuing 8th semester · CGPA: 8.00 till date"
    },
    {
      institution: "CC Higher Secondary",
      degree: "12th Standard (COHSEM)",
      duration: "2022",
      detail: "Completed Higher Secondary Exam in 1st Division"
    },
    {
      institution: "Guru Nanak Public School",
      degree: "10th Standard (BOSEM)",
      duration: "2020",
      detail: "Passed HSLC Exam in 1st Division"
    }
  ],
  leadership: [
    {
      role: "General Secretary",
      org: "Mei Lak Ae Club (MLAC), MTU",
      duration: "Sept 2024 — Present"
    },
    {
      role: "In-Charge of Design Team",
      org: "FENOMENON 2025, MTU",
      duration: "April 2025"
    },
    {
      role: "Member",
      org: "Cultural Club VIBE — Visuals, Imagination, Beats & Energy",
      duration: "August 2025"
    }
  ],
  languages: [
    { name: "English", level: "High Proficiency" },
    { name: "Hindi", level: "Low Proficiency" },
    { name: "Meitei Mayek", level: "Native" }
  ],
  interests: ["Art & Musics", "Games mechanics & Gacha systems", "Exploring technical stuffs", "New innovations"],
  artbook: [
    {
      title: "Moonlight Dreams",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop",
      description: "Digital exploration of light and shadow.",
      year: "2026",
      medium: "Digital Painting",
      story: "An exploration of nocturnal serenity."
    }
  ]
};
