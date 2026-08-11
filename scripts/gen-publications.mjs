// One-off generator: builds src/data/publications.bib from the CV record.
// Re-run manually if you want to regenerate from scratch; normally you'd
// just hand-add one @article{...} block to the .bib file for a new paper.
import { writeFileSync } from "node:fs";

const peerReviewed = [
  { key: "singh2014uti", authors: "Singh, Suk Bum and Sandelich, Stephen and Cheng, John", title: "Current Status of the Diagnosis and Treatment of Pediatric Urinary Tract Infections", journal: "Pediatric Emergency Medicine Reports", year: 2014 },
  { key: "sandelich2017backpain", authors: "Sandelich, Stephen M and Adirim, Terry A", title: "An Unusual Cause of Back Pain in a 10-Year-Old Girl", journal: "Pediatric Emergency Care", year: 2017 },
  { key: "sandelich2018hematometrocolpos", authors: "Sandelich, Stephen and Stowens, James C and Saks, Michael", title: "The use of point-of-care ultrasound to aid in the diagnosis of hematometrocolpos", journal: "Visual Journal of Emergency Medicine", year: 2018 },
  { key: "sandelich2019lyme", authors: "Sandelich, Stephen and DePiero, Andrew", title: "An Interesting Presentation of Lyme Pseudothrombophlebitis", journal: "Pediatric Emergency Care", year: 2019 },
  { key: "basile2023chesttrauma", authors: "Basile, David and Sandelich, Stephen M and Leetch, Aaron", title: "Pediatric Chest Trauma", journal: "Trauma Reports", year: 2023 },
  { key: "turner2023nat", authors: "Turner, Matthew and Sandelich, Stephen and Bowman, MJA", title: "Nonaccidental Trauma", journal: "Trauma Reports", year: 2023 },
  { key: "deaustin2023vaping", authors: "DeAustin, Wade and Sandelich, Stephen", title: "Lung Injury from Vaping", journal: "Critical Decisions in Emergency Medicine", year: 2023 },
  { key: "tariq2023rash", authors: "Tariq, Arisha and Sandelich, Stephen", title: "Pediatric Rash Post Vaccination", journal: "Critical Decisions in Emergency Medicine", year: 2023 },
  { key: "ung2023statusepilepticus", authors: "Ung, Randall L and Sandelich, Stephen and Marco, Catherine A", title: "Diagnosing, Differentiating, and Managing Status Epilepticus", journal: "Pediatric Emergency Medicine Reports", year: 2023 },
  { key: "marco2024vitalsigns", authors: "Marco, Catherine A and Sandelich, Stephen and Nelson, Eric and Hu, Emily and Locke, Diana and Boehmer, Sean", title: "Vital signs among emergency department trauma patients in the setting of alcohol or drug use", journal: "Injury", year: 2024, url: "https://doi.org/10.1016/j.injury.2023.111024" },
  { key: "swimmer2024sud", authors: "Swimmer, Katherine R and Sandelich, Stephen", title: "Substance Use Disorder", journal: "Emergency Medicine Clinics of North America", year: 2024 },
  { key: "sandelich2024opioidoverdose", authors: "Sandelich, Stephen and Hooley, Genevieve and Hsu, George and Rose, Emily and Ruttan, Timothy and Schwarz, Evan S and Simon, Erin and Sulton, Carmen and Wall, Jessica and Dietrich, Ann M", title: "Acute opioid overdose in pediatric patients", journal: "J Am Coll Emerg Physicians Open", year: 2024, url: "https://doi.org/10.1002/emp2.13134" },
  { key: "turner2024orbital", authors: "Turner, Matthew D and Sandelich, Stephen and Marco, Catherine", title: "Rapid progression of orbital abscess requiring lateral canthotomy in a pediatric patient", journal: "American Journal of Emergency Medicine", year: 2024 },
  { key: "sunday2024septicshock", authors: "Sunday, Adam and Sandelich, Stephen", title: "Septic Shock Caused by a Perforated Appendix", journal: "Critical Decisions in Emergency Medicine", year: 2024 },
  { key: "schwarz2024oud", authors: "Schwarz, Evan S and Dietrich, Ann M and Sandelich, Stephen and Hooley, Genevieve and Rose, Emily and Ruttan, Timothy and Simon, Erin L and Sulton, Carmen and Wall, Jessica", title: "Emergency department management of opioid use disorder in pediatric patients", journal: "J Am Coll Emerg Physicians Open", year: 2024, url: "https://doi.org/10.1002/emp2.13265" },
  { key: "thompson2024firstweek", authors: "Thompson, Garrett and Sandelich, Stephen M and Winograd, Samara M", title: "Emergencies in the First Week of Life", journal: "Pediatric Emergency Medicine Reports", year: 2024 },
  { key: "rittenhouse2024buprenorphine", authors: "Rittenhouse, Daniel and Sandelich, Stephen", title: "A National Survey of Pediatric Emergency Medicine Clinicians' Comfort Level, Beliefs, and Experiences With Initiating Buprenorphine in the Emergency Department", journal: "Cureus", year: 2024, url: "https://doi.org/10.7759/cureus.69331" },
  { key: "sandelich2025limpingchild", authors: "Sandelich, Stephen and Hwang, Grace", title: "A Limping Child with Fever", journal: "Critical Decisions in Emergency Medicine", year: 2025 },
  { key: "sandelich2025prehospitalopioid", authors: "Sandelich, Stephen and Cavaliere, Gina and Buresh, Christiana and Boehmer, Sean and Glasser, Jenna and Klansek, Ian and Tolpin, Ally", title: "A Comparison of Pediatric Prehospital Opioid Encounters and Social Vulnerability", journal: "Prehospital Emergency Care", year: 2025, public: "yes" },
  { key: "sandelich2025caregiverperceptions", authors: "Sandelich, Stephen and Coakes, Cameron and Stuckey-Peyrot, Heather L and Levy, Sharon and Buresh, Christiana and Chun, Thomas and Zgierska, Aleksandra E", title: "A Survey of Adolescent and Caregiver Perceptions of Substance Use Screening in Pediatric Emergency Departments", journal: "J Am Coll Emerg Physicians Open", year: 2025 },
  { key: "stancliff2025svi", authors: "Stancliff, Hayes and Buresh, Christiana and Cavaliere, Gina and Boehmer, Sean and Sandelich, Stephen M", title: "Social Vulnerability and Pediatric EMS Behavioral Health Activations: Trends in Utilization and Sedation Practices", journal: "Prehospital Emergency Care", year: 2025 },
  { key: "jordan2025fingeramp", authors: "Jordan, Ellen and Sandelich, Stephen", title: "Finger Amputation in a Child", journal: "Critical Decisions in Emergency Medicine", year: 2025 },
  { key: "basile2025cap", authors: "Basile, David and Sandelich, Stephen", title: "Community-acquired Pneumonia in Children", journal: "Emergency Medicine Clinics of North America", year: 2025 },
  { key: "verbos2025ignite", authors: "Verbos, Kevin W and Agolli, Aldo and Sandelich, Stephen and Alvarado, Andres and Jusufagic, Amina and Croes, Katherine D and Zgierska, Aleksandra E", title: "\"Ignite \\& Engage\": A mixed methods evaluation of a peer-led, school-based substance use prevention program", journal: "Addiction Science \\& Clinical Practice", year: 2025 },
  { key: "marco2025cannabis", authors: "Marco, Catherine A and Becker, Lauren and Egner, Madison and Erturk, Quinn and Sharma, Anjali and Vail, Taylor and Soderman, Claire and Morrison, Nathan and Sandelich, Stephen", title: "Comparison of Perspectives on Cannabis Use Between Emergency Department Patients Who Are Users and Non-users", journal: "Western Journal of Emergency Medicine", year: 2025 },
  { key: "foster2025safetyplanning", authors: "Foster, Ashley A and Hoffmann, Jennifer A and Berg, Kacey and Cheng, Tina and Claudius, Ilene and Dietrich, Ann M and Hooley, Genevieve and Lam, Sharon H F and Li, Jennifer and Lin, Selina and Mendez, Doris and Mroczkowski, Megan and Rice, Lauren E and Saidinejad, Mohsen and Sandelich, Stephen and Santillanes, Genevieve and Sulton, Carmen and Waseem, Muhammad and Walls, Theresa", title: "Safety Planning for Youth in the Emergency Department Who Have Suicide Risk", journal: "J Am Coll Emerg Physicians Open", year: 2025 },
  { key: "schweitzer2026ace", authors: "Schweitzer, Christina and DiGiovanni, Anthony and Bu, D and Burynski, Ryan and Kassim, Aisha and Sabry, Aya and Russell, Michael and Sandelich, Stephen", title: "The impact of adverse childhood experiences on emotional regulation in adult ED patients", journal: "Journal of Affective Disorders", year: 2026, public: "yes" },
  { key: "kassim2026substanceuse", authors: "Kassim, Aisha and Sabry, Aya and Schweitzer, Christina and Burynski, Ryan and DiGiovanni, Anthony and Bu, D and Russell, Michael and Sandelich, Stephen M", title: "Substance Use Behaviors as Markers of Emotional Dysregulation and Childhood Adversity Among Adult Emergency Department Patients", journal: "Cureus", year: 2026 },
  { key: "sandelich2026dualdiagnoses", authors: "Sandelich, Stephen and Buresh, Christiana and Axson, Sydney and Linn, Brion and Mareboina, Manvita", title: "Healthcare utilization patterns among adolescents with dual diagnoses of mental health and substance use disorders", journal: "Journal of Affective Disorders", year: 2026, public: "yes" },
  { key: "buresh2026overdosedeaths", authors: "Buresh, Christiana and Sandelich, Stephen and Hall, Jenny and Hall, Kevin", title: "Characteristics of Adolescents and Young Adults Who Died of Overdose: Opportunities for Intervention", journal: "Emergency Medicine News", year: 2026 },
  { key: "poyorena2026buprenorphine", authors: "Poyorena, Cristina O and Sandelich, Stephen M and Buresh, Christiana", title: "Emergency Department-facilitated Buprenorphine Initiation for Opioid Use Disorder in Adolescents and Young Adults: A Retrospective Case Series", journal: "Journal of Addiction Medicine", year: 2026, url: "https://doi.org/10.1097/ADM.0000000000001704" },
  { key: "buresh2026naloxone", authors: "Buresh, Christiana and Kaplan, Ryan and Lowry, Sarah and Sandelich, Stephen and Rutman, Lori", title: "Improving Naloxone and Buprenorphine Provision in the Pediatric Emergency Department Through Education and Chief Complaint-Triggered Screening", journal: "Pediatric Emergency Care", year: 2026, url: "https://doi.org/10.1097/PEC.0000000000003640" },
  { key: "sandelich2026traumaoutcomes", authors: "Sandelich, Stephen and Schuster, Alex and Klansek, Ian and Olabamiji, OO and Marco, Catherine and Glasser, Jenna and Zgierska, Aleksandra E", title: "Association Between Substance Use and Trauma Outcomes in Adolescents", journal: "Western Journal of Emergency Medicine", year: 2026 },
  { key: "stancliff2026asthma", authors: "Stancliff, Hayes and Mara, Anxhelo and Rishabh, S and Sandelich, Stephen", title: "Documented Nicotine, Cannabis, and Co-Use Are Associated With More Intensive Emergency Department Care for Adolescent Asthma Exacerbations", journal: "JACEP Open", year: 2026, public: "yes" },
  { key: "sandelich2026screening", authors: "Sandelich, Stephen and Amanullah, Siraj and Barata, Isabel and Berg, Kacey and Brown, Kathleen and Cheng, Tina and Chimptazi, Cindy and Claudius, Ilene and Dietrich, Ann M and Lin, Selina and Ruttan, Timothy and Stoner, Michael and Sulton, Carmen and Waseem, Muhammad", title: "Adolescent Substance Use Screening in the Emergency Department", journal: "JACEP Open", year: 2026, url: "https://doi.org/10.1016/j.acepjo.2026.100447" },
];

const bookChapters = [
  { key: "sandelich2018burn", authors: "Sandelich, Stephen and Russo, Christopher", title: "Burn Wound Management", journal: "Reichman's Emergency Medicine Procedures, 3rd ed. (McGraw-Hill Education)", year: 2018, public: "chapter" },
  { key: "singh2023respiratory", authors: "Singh, Suk and Sandelich, Stephen", title: "Respiratory Emergencies", journal: "Pediatric Emergency Medicine Secrets (Elsevier)", year: 2023, public: "chapter" },
  { key: "mareboina2025alcohol", authors: "Mareboina, Manvita and Sandelich, Stephen", title: "Alcohol and Substance Abuse", journal: "Clinical Considerations in School-based Health: An Evidence-Based Guide for Physicians, Advanced Practice Providers and School Nurses (Springer)", year: 2025, public: "chapter" },
];

const policyDocuments = [
  { key: "aap2024imaging", authors: "{American Academy of Pediatrics Committee on Pediatric Emergency Medicine and Section on Radiology} and {American College of Emergency Physicians Pediatric Emergency Medicine Committee} and {American College of Radiology}", title: "Optimizing Advanced Imaging of the Pediatric Patient in the Emergency Department: Technical Report", journal: "Pediatrics", year: 2024, public: "policy" },
  { key: "acep2026screeningpolicy", authors: "{American College of Emergency Physicians}", title: "Policy Statement: Adolescent Substance Use Screening in the Emergency Department", journal: "Annals of Emergency Medicine", year: 2026, public: "policy" },
];

const abstracts = [
  { key: "marco2023abstractvitalsigns", authors: "Marco, Catherine and Sandelich, Stephen and Nelson, Eric and Hu, Emily and Locke, Diana", title: "Vital Signs Among Emergency Department Trauma Patients in the Setting of Alcohol or Drug Use", journal: "Annals of Emergency Medicine (abstract)", year: 2023, public: "abstract" },
  { key: "sandelich2025abstractprotocol", authors: "Sandelich, Stephen and Buresh, Christiana and Camenga, Deepa and Chun, Thomas and Chang, Todd", title: "Creation of a Protocol for the Treatment of Adolescent Opioid Use Disorder in the Emergency Department", journal: "Annals of Emergency Medicine (abstract)", year: 2025, public: "abstract" },
  { key: "poyorena2025abstractoutcomes", authors: "Poyorena, Cristina and Sandelich, Stephen and Buresh, Christiana", title: "Outcomes of Emergency Department-Initiated Buprenorphine for Adolescents With Opioid Use Disorder", journal: "Annals of Emergency Medicine (abstract)", year: 2025, public: "abstract" },
];

const submitted = [
  { key: "sandelich2026targetedscreening", authors: "Sandelich, Stephen", title: "Targeted Substance Use Screening Misses Most Positive Adolescents in the Pediatric Emergency Department: A 12-Year Retrospective Analysis", journal: "Submitted to JACEP Open", year: 2026, public: "wip" },
  { key: "sandelich2026transgender", authors: "Sandelich, Stephen", title: "Substance Use, Mental Health, and Healthcare Disparities in Transgender Adolescents", journal: "Submitted to Journal of Adolescent Health", year: 2026, public: "wip" },
];

const all = [...peerReviewed, ...bookChapters, ...policyDocuments, ...abstracts, ...submitted];

function entry({ key, authors, title, journal, year, url, public: pub }) {
  const lines = [
    `@article{${key},`,
    `  title = {${title}},`,
    `  author = {${authors}},`,
    `  journal = {${journal}},`,
    `  year = {${year}},`,
  ];
  if (url) lines.push(`  url = {${url}},`);
  lines.push(`  public = {${pub ?? "yes"}}`);
  lines.push(`}`);
  return lines.join("\n");
}

const out = all.map(entry).join("\n\n") + "\n";
writeFileSync(new URL("../src/data/publications.bib", import.meta.url), out);
console.log(`Wrote ${all.length} entries to src/data/publications.bib`);
