import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Linkedin, Github, Mail, 
  Download, ExternalLink, ChevronRight, 
  BookOpen, Code, Cpu, Award, Terminal,
  Youtube, Briefcase, GraduationCap,
  MapPin
} from 'lucide-react';

/**
 * DATA CONSTANTS
 */

const PERSONAL_INFO = {
  name: "Vivek Karna",
  titles: ["Data Scientist", "Operations Researcher"],
  tagline: "Indian, Curious, Engineer - that's me in order ;)",
  email: "karnavivek@gmail.com",
  location: "Chennai, India",
  social: {
    linkedin: "https://www.linkedin.com/in/vivek-karna",
    github: "https://github.com/karnavivek",
    youtube: "https://www.youtube.com/@vivekkarna"
  },
  resumeLink: "./VK_Resume_Aug.pdf",
  // Using GitHub avatar as a reliable source
  profileImage: "Vivek_portfolio_dp.png" 
};

const SKILLS = {
  languages: ["Python", "SQL", "R"],
  libs: ["Pandas", "Numpy", "Scikit-learn", "PyTorch", "Gurobi", "Statsmodels", "GPyTorch"],
  ml: ["Regression", "Classification", "Clustering", "Forecasting", "Deep Learning", "LSTM", "NLP", "Transformers", "Sensitivity Analysis"],
  tools: ["Git", "Github", "LaTeX", "Tableau", "Streamlit"],
  business: ["Six Sigma", "DMAIC", "Kanban", "Scrum","STAR"]
};

const EXPERIENCE = [
  {
    role: "Data Scientist - Full Time",
    company: "Applied Materials | Allegis Group",
    period: "Oct 2025 - Present",
    desc: [
      "...updating details soon...",
      // "Delivered 10+ Hrs of Python/ML Lab sessions for B-Tech & PhD students.",
      // "Developed comprehensive data science scripts covering clustering, regression, and PCA."
    ]
  },
  {
    role: "Teaching Assistant - Part Time",
    company: "IIT Madras | NPTEL",
    period: "June 2024 - June 2025",
    desc: [
      "Collaborated with professors in data science/operations research courses.",
      "Delivered 10+ Hrs of Python/ML Lab sessions for B-Tech & PhD students.",
      "Developed comprehensive data science scripts covering clustering, regression, and PCA."
    ]
  },
  {
    role: "Business Manager",
    company: "PCRI",
    period: "March 2023 - June 2023",
    desc: [
      "...updating details soon...",
      // "Delivered 10+ Hrs of Python/ML Lab sessions for B-Tech & PhD students.",
      // "Developed comprehensive data science scripts covering clustering, regression, and PCA."
    ]
  },
  {
    role: "Graduate Engineer Trainee (GET) - Full Time",
    company: "Varroc Engineering",
    period: "Aug 2021 - July 2022",
    desc: [
      "Used DMAIC/Data analytics to optimize processes, cutting changeover time by 77%, saving 33.09hrs/month & Rs 4.86 lacs.",
"Conducted 120+ time/work studies and created data visualizations to identify manufacturing bottlenecks.",
"Built predictive models to forecast equipment failures, reducing unplanned downtime by 23%, boosting overall effectiveness.",
"Winner of In-house KAIZEN Space Level Competition"

    ]
  }
];

const EDUCATION = [
  {
    degree: "M.S (Research) in Operations Research",
    school: "IIT Madras",
    year: "2023 - Present",
    desc: "Focus on Stochastic Constraint Learning & Prescriptive Analytics."
  },
  {
    degree: "B.Tech in Production & Industrial Engineering",
    school: "VIT Vellore",
    year: "2017 - 2021",
    desc: "Graduated with honors. Active member of technical societies."
  }
];

const PROJECTS = [
  {
    title: "BLINKTO",
    subtitle: "Food Demand Forecasting",
    tech: ["Python", "LSTM", "ARIMA", "Streamlit"],
    desc: "Predicted demand forecast using state-of-the-art ARMA, ARIMA and LSTM models with extensive hyperparameter tuning that improved accuracy by 18%.",
    link: "https://github.com/karnavivek/Food-Demand-Forecasting"
  },
  {
    title: "OneClickML",
    subtitle: "AutoML Library",
    tech: ["Python", "Scikit-learn", "GridSearchCV"],
    desc: "A Python Library which can train your specific dataset using Multiple Machine Learning models at a time, outputting suggestions on optimal parameters.",
    link: "https://github.com/karnavivek/OneClickML"
  },
  {
    title: "IDLEE",
    subtitle: "VRP Optimization",
    tech: ["Python", "Gurobi", "Heuristics"],
    desc: "Developed MILP model for VRPTW using Gurobi. Designed Heuristics to find sub-optimal feasible solutions to reduce computational load.",
    link: "https://github.com/karnavivek/Heuristics_VRPTW"
  },
  {
    title: "AskMyProfession",
    subtitle: "Fine-Tuning LLM",
    tech: ["Python", "PyTorch", "RunPod", "Transformers"],
    desc: "AskMyProfession allows users to access 'niche' Domain Experts (eg.: Operations Research Scientist (ORS)) which are fine-tuned for your niche work!",
    link: "https://github.com/karnavivek/askmyprofession"
  },
  {
    title: "AskMyProfession",
    subtitle: "Fine-Tuning LLM",
    tech: ["Python", "PyTorch", "RunPod", "Transformers"],
    desc: "AskMyProfession allows users to access 'niche' Domain Experts (eg.: Operations Research Scientist (ORS)) which are fine-tuned for your niche work!",
    link: "https://github.com/karnavivek/askmyprofession"
  }
];

const RESEARCH = [
  {
    title: "SCLTool: Stochastic Constraint Learning Framework",
    type: "MS Thesis",
    status: "Ongoing",
    desc: "Developing a tool for integrating predictive and prescriptive models to tackle uncertainty in data, optimization & ML models.",
    link: "#"
  },
  {
    title: "Uncertainty-Aware Optimization using ML",
    type: "Conference Paper",
    status: "Presented at AIRSS 2025",
    award: "2nd Prize - AIRSS 2025 in ML & Optimization Domain",
    desc: "Showcased state-of-the-art tool for uncertainty-aware optimization.",
    link: "#"
  },
  {
    title: "Large Scale Optimization Workshop",
    type: "Workshop",
    status: "Attended at IIT Bombay 2025",
    // award: "2nd Prize - AIRSS 2025 in ML & Optimization Domain",
    desc: "Showcased state-of-the-art tool for uncertainty-aware optimization.",
    link: "#"
  },
  {
    title: "28th International Society of Operations Management",
    type: "Conference Paper",
    status: "Presented at IIM Nagpur 2025",
    // award: "2nd Prize - AIRSS 2025 in ML & Optimization Domain",
    desc: "Presented 2 Conference Papers",
    link: "#"
  },
  {
    title: "ICSCM 2026 ",
    type: "Conference Paper",
    status: "Presenting at Hosei University, JAPAN",
    // award: "2nd Prize - AIRSS 2025 in ML & Optimization Domain",
    desc: "Showcased state-of-the-art tool for uncertainty-aware optimization.",
    link: "#"
  }
];

/**
 * COMPONENTS
 */

const NavLink = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${  /* This is for the Top Title bar */
      active 
        ? "bg-amber-600/10 text-amber-700 font-bold" 
        : "text-stone-600 hover:text-stone-900 hover:bg-stone-200"
    }`}
  >
    {children}
  </button>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-stone-900 mb-4 flex items-center gap-3">
      <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
      {title}
    </h2>
    {subtitle && <p className="text-stone-600 max-w-2xl">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-amber-100 shadow-sm rounded-xl p-6 hover:shadow-md hover:border-amber-300 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="px-3 py-1 text-xs font-medium text-amber-800 bg-amber-100 rounded-full border border-amber-200">
    {children}
  </span>
);

/**
 * PAGES
 */
/* HOME PAGE */
const HomePage = ({ setPage }) => (
  <div className="flex flex-col justify-center min-h-[80vh] animate-in fade-in slide-in-from-bottom-4 duration-300">
    <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-12">
   
      {/* Text Section */} 
      <div className="space-y-6 max-w-2xl text-center md:text-left"> 
        <div className="flex justify-center md:justify-start">
          <Badge>Available for Collaborations</Badge>
        </div>
        
        {/* Made font smaller as requested */}
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
          Hey, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">{PERSONAL_INFO.name}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
          {PERSONAL_INFO.tagline}
        </p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
          <button 
            onClick={() => setPage('work')}
            className="px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            View Work <ChevronRight size={18} />
          </button>
          <button 
            onClick={() => setPage('contact')}
            className="px-6 py-3 bg-white text-stone-700 font-medium rounded-lg hover:bg-stone-50 transition-colors border border-stone-300 shadow-sm"
          >
            Contact Me
          </button>
        </div>

        <div className="pt-8 flex justify-center md:justify-start gap-6 text-stone-500">
          <div className="flex items-center gap-2">
            <Terminal size={20} className="text-amber-600" />
            <span>Data Science</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu size={20} className="text-amber-600" />
            <span>Machine Learning</span>
          </div>
          <div className="flex items-center gap-2">
            <Code size={20} className="text-amber-600" />
            <span>Optimization</span>
          </div>
        </div>
      </div>

      {/* Profile Image Section - Added as requested */}
      <div className="relative">
        <div className="absolute inset-1 bg-amber-400 rounded-full blur-2xl opacity-20 transform scale-110"></div>
        <img 
          src={PERSONAL_INFO.profileImage} 
          alt={PERSONAL_INFO.name}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white shadow-xl"
        />
      </div>
    </div>
  </div>
);

/* ABOUT PAGE */

const AboutPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SectionTitle title="About Me"/> 
    {/* subtitle="I have worked in various domains, and learned various ways to solve that 'one' problem, but the ways of a data scientist & an operations researcher often feels home. 
    I like to solve industry problems with data driven insights, often merging both worlds of predictive and prescriptive models." /> */}
    
    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="prose prose-stone">
          <p className="text-stone-600 leading-relaxed">
            I have worked in various domains, and learned various ways to solve that 'one' problem, but the ways of a data scientist & an operations researcher often feels home. 
    I like to solve industry problems with data driven insights, often merging both worlds of predictive and prescriptive models.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            <GraduationCap className="text-amber-600" /> Education
          </h3>
          <div className="space-y-6">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-stone-300">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-100 border-2 border-amber-500"></div>
                <h4 className="text-lg font-bold text-stone-900">{edu.school}</h4>
                <p className="text-amber-700 text-sm mb-1">{edu.degree}</p>
                <p className="text-stone-500 text-xs mb-2">{edu.year}</p>
                <p className="text-stone-600 text-sm">{edu.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            <Code className="text-amber-600" /> Technical Arsenal
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-stone-500 mb-2 uppercase tracking-wider font-semibold">Languages & Libraries</p>
              <div className="flex flex-wrap gap-2">
                {[...SKILLS.languages, ...SKILLS.libs].map(skill => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-stone-500 mb-2 uppercase tracking-wider font-semibold">Machine Learning</p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.ml.map(skill => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-stone-500 mb-2 uppercase tracking-wider font-semibold">Optimization & Tools</p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.tools.map(skill => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-stone-500 mb-2 uppercase tracking-wider font-semibold">Business</p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.business.map(skill => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* WORK PAGE */

const WorkPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SectionTitle title="Work Experience" subtitle="My professional journey and industrial contributions."/>
    
    <div className="space-y-3 max-w-4xl">
      {EXPERIENCE.map((exp, idx) => (
        <Card key={idx} className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
              <Briefcase size={24}/>
            </div>
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-bold text-stone-900">{exp.role}</h3>
                <span className="text-sm font-medium text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                  {exp.period}
                </span>
              </div>
              <p className="text-lg text-amber-700 font-medium mb-4">{exp.company}</p>
              
              <ul className="space-y-2">
                {exp.desc.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-600">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

/* Projects PAGE */

const ProjectsPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SectionTitle title="Projects" subtitle="A selection of my work in AI, ML, and Optimization." />
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROJECTS.map((project, idx) => (
        <Card key={idx} className="flex flex-col h-full group bg-white hover:bg-amber-50/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-stone-100 rounded-lg group-hover:bg-amber-100 transition-colors">
              <Terminal size={24} className="text-stone-600 group-hover:text-amber-600" />
            </div>
            <a href={project.link} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-amber-600 transition-colors">
              <ExternalLink size={20} />
            </a>
          </div>
          
          <h3 className="text-xl font-bold text-stone-900 mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-amber-600 mb-4 font-mono font-medium">{project.subtitle}</p>
          
          <p className="text-stone-600 text-sm mb-6 flex-grow leading-relaxed">
            {project.desc}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map(t => (
              <span key={t} className="text-xs text-stone-600 bg-stone-100 px-2 py-1 rounded border border-stone-200">
                {t}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  </div>
);

/* RESEARCH PAGE */

const ResearchPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SectionTitle title="Research" subtitle="Academic contributions and publications." />
    
    <div className="space-y-6">
      {RESEARCH.map((item, idx) => (
        <Card key={idx} className="border-l-4 border-l-amber-500">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded uppercase tracking-wide">
                  {item.type}
                </span>
                <span className="text-xs text-stone-500">{item.status}</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">{item.title}</h3>
              <p className="text-stone-600 max-w-3xl mb-4">{item.desc}</p>
              
              {item.award && (
                <div className="flex items-center gap-2 text-amber-700 text-sm bg-amber-100 px-3 py-2 rounded-lg inline-flex">
                  <Award size={16} />
                  <span>{item.award}</span>
                </div>
              )}
            </div>
            <a 
              href={item.link}
              className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 whitespace-nowrap"
            >
              Read More <ChevronRight size={16} />
            </a>
          </div>
        </Card>
      ))}
      
      <div className="mt-12 bg-amber-50/50 rounded-xl p-8 border border-dashed border-amber-200 text-center">
        <BookOpen size={40} className="mx-auto text-stone-400 mb-4" />
        <h3 className="text-lg font-bold text-stone-800 mb-2">More Research Coming Soon</h3>
        <p className="text-stone-500">Currently working on stochastic optimization frameworks.</p>
      </div>
    </div>
  </div>
);

/* E-RESUME PAGE */

const EResumePage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
    <div className="flex justify-between items-center mb-12">
      <div>
        <h2 className="text-3xl font-bold text-stone-900">E-Resume</h2>
        <p className="text-stone-500">Digital overview of my professional profile.</p>
      </div>
      <a
        href={PERSONAL_INFO.resumeLink}
        download
        className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold transition-colors shadow-md"
      >
        <Download size={18} />
        <span className="hidden sm:inline">Download PDF</span>
      </a>
    </div>

    <div className="bg-white text-stone-900 rounded-xl shadow-xl border border-stone-200 overflow-hidden min-h-[1000px] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-stone-50 p-8 md:w-1/3 border-r border-stone-200">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-stone-800 mb-1">{PERSONAL_INFO.name}</h3>
          <p className="text-amber-700 font-medium">{PERSONAL_INFO.titles[0]}</p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-stone-800 uppercase tracking-wider text-sm border-b border-stone-300 pb-1 mb-3">Contact</h4>
            <ul className="text-sm text-stone-600 space-y-2">
              <li className="flex items-center gap-2"><Mail size={14} /> {PERSONAL_INFO.email}</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> {PERSONAL_INFO.location}</li>
              <li className="flex items-center gap-2"><Linkedin size={14} /> linkedin.com/in/vivek-karna</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 uppercase tracking-wider text-sm border-b border-stone-300 pb-1 mb-3">Skills</h4>
            <div className="flex flex-wrap gap-1">
              {[...SKILLS.languages, ...SKILLS.ml].map(s => (
                <span key={s} className="bg-white border border-stone-200 text-stone-700 px-2 py-1 rounded text-xs">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 uppercase tracking-wider text-sm border-b border-stone-300 pb-1 mb-3">Education</h4>
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="mb-3">
                <p className="font-bold text-sm">{edu.school}</p>
                <p className="text-xs text-stone-600">{edu.degree}</p>
                <p className="text-xs text-stone-500 italic">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 md:w-2/3">
        <div className="mb-8">
          <h4 className="font-bold text-stone-800 uppercase tracking-wider text-sm border-b-2 border-amber-500 pb-1 mb-4 flex items-center gap-2">
            <Briefcase size={16} /> Work Experience
          </h4>
          <div className="space-y-6">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h5 className="font-bold text-stone-800 text-lg">{exp.role}</h5>
                  <span className="text-xs text-stone-500 font-medium">{exp.period}</span>
                </div>
                <p className="text-amber-700 font-medium text-sm mb-2">{exp.company}</p>
                <ul className="list-disc list-outside ml-4 text-sm text-stone-600 space-y-1">
                  {exp.desc.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-stone-800 uppercase tracking-wider text-sm border-b-2 border-amber-500 pb-1 mb-4 flex items-center gap-2">
            <Award size={16} /> Key Achievements
          </h4>
          <ul className="list-disc list-outside ml-4 text-sm text-stone-600 space-y-2">
            <li><strong>AIRSS 2025 2nd Prize:</strong> Optimization & Machine Learning domain.</li>
            <li><strong>SPACE Level Kaizen Award:</strong> For innovative data-driven process improvements at Varroc.</li>
            <li><strong>GATE Qualified:</strong> Secured admission to IIT Madras through rigorous competitive exam.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

/* CONTACT PAGE */

const ContactPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
    <div className="text-center mb-12">
      <SectionTitle title="Get In Touch" />
      <p className="text-stone-500 -mt-8">
        Currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </p>
    </div>
    
    <Card className="p-8 md:p-12">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-600">Name</label>
            <input 
              type="text" 
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-600">Email</label>
            <input 
              type="email" 
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              placeholder="hello@example.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-600">Message</label>
          <textarea 
            rows={5}
            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
            placeholder="Let's build something together..."
          />
        </div>

        <button className="w-full bg-amber-500 text-white font-bold py-4 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20">
          <Mail size={20} /> Send Message
        </button>
      </form>

      <div className="mt-12 flex justify-center gap-8">
        <a href={PERSONAL_INFO.social.linkedin} className="text-stone-400 hover:text-amber-600 transition-colors">
          <Linkedin size={24} />
        </a>
        <a href={PERSONAL_INFO.social.github} className="text-stone-400 hover:text-amber-600 transition-colors">
          <Github size={24} />
        </a>
        <a href={PERSONAL_INFO.social.youtube} className="text-stone-400 hover:text-red-500 transition-colors">
          <Youtube size={24} />
        </a>
        <a href={`mailto:${PERSONAL_INFO.email}`} className="text-stone-400 hover:text-amber-600 transition-colors">
          <Mail size={24} />
        </a>
      </div>
    </Card>
  </div>
);

/**
 * MAIN APP
 */

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [activePage]);

  // Added "Work" to navItems
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' }, 
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'resume', label: 'E-Resume' },
    { id: 'contact', label: 'Contact' }
  ];

  const renderPage = () => {
    switch(activePage) {
      case 'home': return <HomePage setPage={setActivePage} />;
      case 'about': return <AboutPage />;
      case 'work': return <WorkPage />; // Added Work Page case
      case 'projects': return <ProjectsPage />;
      case 'research': return <ResearchPage />;
      case 'resume': return <EResumePage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setPage={setActivePage} />;
    }
  };

  return (
    // Changed main background to Light Gold Cream (amber-50)
    <div className="min-h-screen bg-amber-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-amber-50/90 backdrop-blur-md border-b border-amber-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex-shrink-0 cursor-pointer font-bold text-xl tracking-tighter"
              onClick={() => setActivePage('home')}
            >
              <span className="text-amber-600">Karna</span><span className="text-stone-800">.Portfolio</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {navItems.map(item => (
                  <NavLink 
                    key={item.id} 
                    active={activePage === item.id}
                    onClick={() => setActivePage(item.id)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-stone-500 hover:text-stone-900 p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-amber-50 border-b border-amber-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium ${
                    activePage === item.id 
                      ? "bg-amber-100 text-amber-700" 
                      : "text-stone-600 hover:bg-stone-200 hover:text-stone-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 min-h-screen flex flex-col">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-200 bg-amber-50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} Vivek Karna. Built with React & Tailwind.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href={PERSONAL_INFO.social.linkedin} className="text-stone-400 hover:text-amber-600 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={PERSONAL_INFO.social.github} className="text-stone-400 hover:text-amber-600 transition-colors">
              <Github size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
