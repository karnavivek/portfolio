export const PERSONAL_INFO = {
  name: "Vivek Karna",
  roles: ["Data Scientist", "Operations Researcher", "Optimization Nerd", "ML Tinkerer"],
  tagline: "Indian, Curious, Engineer - that's me in order ;)",
  intro:
    "I turn complex, uncertain data into confident, high-stakes decisions - pairing machine learning and mathematical optimization with business alignment, so every call is backed by evidence and built to drive real impact.",
  email: "karnavivek@gmail.com",
  location: "Chennai, India",
  timeZone: "Asia/Kolkata",
  social: {
    linkedin: "https://www.linkedin.com/in/vivek-karna",
    github: "https://github.com/karnavivek",
    youtube: "https://www.youtube.com/@karnavivek/videos",
    x: "https://x.com/karnaishere"
  },
  resumeLink: "./VK_Resume_Aug.pdf",
  profileImage: "./Vivek_portfolio_dp.png"
};

export const NOW = [
  { label: "Working at", value: "Applied Materials (via TekSystems)" },
  { label: "Researching", value: "ML-assisted optimization under uncertainty" },
  { label: "Building", value: "SCLTool & masteRAG" }
];

export const ABOUT = [
  "I have 5+ years of integrated industry and research experience, and together they have fundamentally shaped the way I solve problems.",
  "Research at IIT Madras taught me to ask \"why\" - to challenge assumptions, embrace uncertainty, and search for principled solutions. Industry taught me to ask \"how\" - to deliver results under constraints, move quickly, and build solutions that create real business impact.",
  "By combining Data Science, Machine Learning, and Optimization, I have tackled problems in semiconductor manufacturing, industrial analytics, consultancy, supply chain optimization, and enterprise AI. Whether developing Bayesian optimization frameworks, building production-grade ML systems, or designing decision-support tools, I enjoy turning complex data into solutions that are both scientifically rigorous and practically valuable.",
  "I believe the best technology doesn't just make accurate predictions - it empowers better decisions."
];

export const SKILLS = [
  { group: "Languages", items: ["Python", "MySQL", "R"] },
  {
    group: "Libraries",
    items: ["Pandas", "Numpy", "Scikit-learn", "PyTorch", "Matplotlib", "Streamlit", "Statsmodels", "GPyTorch", "LangChain", "HuggingFace"]
  },
  {
    group: "Machine Learning",
    items: ["Regression", "Classification", "Clustering", "Forecasting", "Deep Learning", "LSTM", "NLP", "Transformers", "Sensitivity Analysis"]
  },
  {
    group: "Optimization",
    items: ["Linear Programming", "Mixed Integer Programming", "Heuristics", "Gurobi", "Supply Chain Network Modelling"]
  },
  { group: "Tools", items: ["Git", "Github", "LaTeX", "Tableau", "VectorDB"] },
  { group: "Business", items: ["Six Sigma", "DMAIC", "Kanban", "Scrum", "STAR"] }
];

export const EDUCATION = [
  {
    degree: "MS (Research) in Operations Research",
    school: "IIT Madras",
    year: "2023 - 2026",
    desc: "Understood what it means to add value to humanity through engineering."
  },
  {
    degree: "BTech in Production & Industrial Engineering",
    school: "VIT Vellore",
    year: "2017 - 2021",
    desc: "Understood what it means to be an engineer."
  }
];

export const EXPERIENCE = [
  {
    role: "Data Scientist",
    type: "Full Time",
    company: "Applied Materials | TekSystems",
    period: "Oct 2025 - Present",
    desc: ["More details about this can be given upon contact :)"]
  },
  {
    role: "Teaching Assistant",
    type: "Part Time",
    company: "IIT Madras | NPTEL",
    period: "Jun 2024 - Jun 2025",
    desc: [
      "Collaborated with professors in data science/operations research courses.",
      "Delivered 10+ hrs of Python/ML lab sessions for B-Tech Quant & PhD students.",
      "Developed data science scripts covering clustering, regression, and PCA."
    ]
  },
  {
    role: "Business Manager (Analytics)",
    type: "Full Time",
    company: "PCRI",
    period: "Mar 2023 - Jun 2023",
    desc: [
      "Led a team of 4 in developing data-driven frameworks connecting audit performance, sustainability metrics, & client outcomes, strengthening consultancy value proposition and client engagement.",
      "Analyzed historical demand data to identify underutilized test categories, driving bundling recommendations that increased cross-selling by 34% in 3 months.",
      "Built analytical models linking material performance metrics to shelf-life and logistics risks across testing datasets, enabling more informed client decision-making."
    ]
  },
  {
    role: "Graduate Engineer (GET)",
    type: "Full Time",
    company: "Varroc Engineering",
    period: "Aug 2021 - Jul 2022",
    desc: [
      "Used DMAIC/Data analytics to optimize processes, cutting changeover time by 77%, saving 33.09 hrs/month & Rs 4.86 lacs.",
      "Conducted 120+ time/work studies and created data visualizations to identify manufacturing bottlenecks.",
      "Built predictive models to forecast equipment failures, reducing unplanned downtime by 23%, boosting overall effectiveness.",
      "Winner of In-house KAIZEN Space Level Competition."
    ]
  }
];

export const PROJECTS = [
  {
    title: "SCLTool",
    subtitle: "SOTA ML-Optimization Integration Python Package",
    tech: ["Python", "PyTorch", "Scikit-learn", "Gurobi"],
    highlight: "2nd Prize @ AIRSS 2025 · Best Presentation @ ICSCM 2026, Tokyo",
    desc: [
      "Designed a Python package to embed machine learning models (LR, DT, GBM, NN, BLR etc.) as constraints into optimization models under uncertainty using Bayesian Linear Regression & stochastic models.",
      "Awarded 2nd Prize at All India Research Scholar Summit 2025 (Optimization & ML) and Best Presentation Award at ICSCM 2026, Tokyo, Japan."
    ],
    link: "https://github.com/karnavivek/SCLTool"
  },
  {
    title: "masteRAG",
    subtitle: "GenAI Production Grade Advanced RAG Architecture",
    tech: ["Python", "RAG", "Qdrant", "LangGraph", "Docker", "Docling", "Tavily"],
    desc: [
      "Built a RAG platform integrating Hybrid Search, HyDE, CRAG, Self-RAG and Re-ranking for knowledge retrieval.",
      "Investigated retrieval robustness on a 95% noise / 5% signal knowledge base - advanced RAG improved retrieval quality by up to 39% and faithfulness, recall and answer relevancy by 12-18% over baseline RAG."
    ],
    link: null
  },
  {
    title: "BLINKTO",
    subtitle: "Food Demand Forecasting",
    tech: ["Python", "LSTM", "ARIMA", "Streamlit"],
    desc: [
      "Engineered features (lags, rolling stats) and diagnosed non-stationarity (ACF, PACF, ADF) with differencing to prepare the series for modelling.",
      "Forecast demand with ARMA, ARIMA and LSTM with extensive hyperparameter tuning, achieving ~18% uplift over baselines.",
      "Wrapped the logic in a reusable TSForecaster class and shared insights with stakeholders via Streamlit."
    ],
    link: "https://github.com/karnavivek/Food-Demand-Forecasting"
  },
  {
    title: "AskMyProfession",
    subtitle: "Fine-Tuning an LLM on RunPod (Cloud GPU)",
    tech: ["Python", "PyTorch", "RunPod", "Transformers"],
    desc: [
      "Fine-tuned Meta's Llama-3.2-1B on an Operations Research Q&A set generated by a larger Qwen2.5:14B model on custom data.",
      "Used QLoRA (4-bit bitsandbytes + PEFT LoRA adapters) to cut computational time by nearly 80% on RunPod.",
      "Hosted the domain-specific LLM on Hugging Face with 30+ downloads so far."
    ],
    link: "https://github.com/karnavivek/askmyprofession"
  },
  {
    title: "IDLEE",
    subtitle: "Vehicle Routing Problem Optimization",
    tech: ["Python", "Gurobi", "Heuristics"],
    desc: [
      "Formulated & solved a MILP for the VRPTW using Gurobi - random and fixed franchise/customer placements, capacity, time windows and route feasibility.",
      "Designed heuristics for feasible sub-optimal solutions on larger instances, benchmarking runtimes and cost trade-offs against MILP.",
      "Secured the top grade in project evaluation (highest among peer submissions)."
    ],
    link: "https://github.com/karnavivek/Heuristics_VRPTW"
  },
  {
    title: "OneClickML",
    subtitle: "AutoML Library",
    tech: ["Python", "Scikit-learn", "GridSearchCV", "Optuna"],
    desc: [
      "Built a tool that trains and evaluates multiple regression and classification models in series, cutting model selection from hours to minutes.",
      "Benchmarks Linear Regression, SVMs, MLP, Decision Trees and Gradient Boosting on a dataset and recommends the best model by MSE and other metrics."
    ],
    link: "https://github.com/karnavivek/OneClickML"
  }
];

const LI = "?utm_source=share&utm_medium=member_desktop&rcm=ACoAACbLSWgBr91C7c7xo6XNFiA8UFFagULlux4";

export const RESEARCH = [
  {
    title: "ICSCM 2026",
    type: "Conference Paper",
    status: "Hosei University, Tokyo, Japan",
    award: "Best Oral Presentation Award",
    desc: "Showcased a state-of-the-art tool for machine learning assisted, uncertainty-aware optimization.",
    link: "https://www.linkedin.com/posts/vivek-karna_research-iit-iitmadras-ugcPost-7435658380519718912-OrtN/" + LI,
    image: "./icscm_award.jpeg"
  },
  {
    title: "28th International Society of Operations Management",
    type: "Conference Paper",
    status: "IIM Nagpur, 2025",
    desc: "Presented 2 papers: 'Constraint learning to model user experience in electric vehicle charging ecosystem' and 'SCLTool: Stochastic Constraint Learning Framework for Prescriptive Models'.",
    link: "https://www.linkedin.com/posts/vivek-karna_research-iitmadras-iimnagpur-activity-7410207132358180864-ZLsl" + LI,
    image: "./som_1_cert.jpeg"
  },
  {
    title: "All India Research Scholar Summit",
    type: "Conference Paper",
    status: "IIT Madras, 2025",
    award: "2nd Prize - ML & Optimization Domain",
    desc: "Showcased a state-of-the-art tool for machine learning assisted, uncertainty-aware optimization.",
    link: "https://www.linkedin.com/posts/vivek-karna_researchmilestone-optimization-machinelearning-activity-7313193636945350656-tvAo" + LI,
    image: "./airss_award.jpeg"
  },
  {
    title: "Large Scale Optimization Workshop",
    type: "Workshop",
    status: "IIT Bombay, 2025",
    desc: "A deep dive into the hardcore mathematical optimization that powers real-world solutions.",
    link: "https://www.linkedin.com/posts/vivek-karna_iim-iit-management-activity-7343171011099488256-V2GA" + LI,
    image: "./lso_workshop.jpeg"
  },
  {
    title: "SCLTool: Stochastic Constraint Learning Framework for Prescriptive Models",
    type: "MS Thesis",
    status: "IIT Madras",
    desc: "A tool that integrates predictive and prescriptive models to tackle uncertainty in data, optimization & ML models.",
    link: null,
    image: "./img/SCLTool_2.jpeg"
  }
];
