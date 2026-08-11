// One-off generator: builds src/data/publications.bib from the CV record.
// Re-run manually if you want to regenerate from scratch; normally you'd
// just hand-add one @article{...} block to the .bib file for a new paper.
//
// Author names are surname + initials, exactly as they appear in the CV's
// own publication list (standard biomedical citation style). Full first
// names are NOT expanded/guessed — that was the bug in the previous
// version of this script, and it produced wrong names.
//
// Links: only added where (a) the CV itself gives a DOI, or (b) the
// journal has a fully predictable DOI scheme (Cureus). Everything else
// links to a PubMed search for the exact title, which is a real working
// link, not a guessed one.
import { writeFileSync } from "node:fs";

function pubmedSearch(title) {
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(title)}`;
}

const peerReviewed = [
  { key: "singh2014uti", authors: "Singh, SB and Sandelich, S and Cheng, J", title: "Current Status of the Diagnosis and Treatment of Pediatric Urinary Tract Infections", journal: "Pediatric Emergency Medicine Reports", year: 2014 },
  { key: "sandelich2017backpain", authors: "Sandelich, SM and Adirim, TA", title: "An Unusual Cause of Back Pain in a 10-Year-Old Girl", journal: "Pediatric Emergency Care", year: 2017 },
  { key: "sandelich2018hematometrocolpos", authors: "Sandelich, S and Stowens, JC and Saks, M", title: "The use of point-of-care ultrasound to aid in the diagnosis of hematometrocolpos", journal: "Visual Journal of Emergency Medicine", year: 2018 },
  { key: "sandelich2019lyme", authors: "Sandelich, S and DePiero, A", title: "An Interesting Presentation of Lyme Pseudothrombophlebitis", journal: "Pediatric Emergency Care", year: 2019 },
  { key: "basile2023chesttrauma", authors: "Basile, D and Sandelich, SM and Leetch, A", title: "Pediatric Chest Trauma", journal: "Trauma Reports", year: 2023 },
  { key: "turner2023nat", authors: "Turner, M and Sandelich, S and Bowman, MJA", title: "Nonaccidental Trauma", journal: "Trauma Reports", year: 2023 },
  { key: "deaustin2023vaping", authors: "DeAustin, W and Sandelich, S", title: "Lung Injury from Vaping", journal: "Critical Decisions in Emergency Medicine", year: 2023 },
  { key: "tariq2023rash", authors: "Tariq, A and Sandelich, S", title: "Pediatric Rash Post Vaccination", journal: "Critical Decisions in Emergency Medicine", year: 2023 },
  { key: "ung2023statusepilepticus", authors: "Ung, RL and Sandelich, S and Marco, CA", title: "Diagnosing, Differentiating, and Managing Status Epilepticus", journal: "Pediatric Emergency Medicine Reports", year: 2023 },
  { key: "marco2024vitalsigns", authors: "Marco, CA and Sandelich, S and Nelson, E and Hu, E and Locke, D and Boehmer, S", title: "Vital signs among emergency department trauma patients in the setting of alcohol or drug use", journal: "Injury", year: 2024 },
  { key: "swimmer2024sud", authors: "Swimmer, KR and Sandelich, S", title: "Substance Use Disorder", journal: "Emergency Medicine Clinics of North America", year: 2024 },
  { key: "sandelich2024opioidoverdose", authors: "Sandelich, S and Hooley, G and Hsu, G and Rose, E and Ruttan, T and Schwarz, ES and Simon, E and Sulton, C and Wall, J and Dietrich, AM", title: "Acute opioid overdose in pediatric patients", journal: "J Am Coll Emerg Physicians Open", year: 2024 },
  { key: "turner2024orbital", authors: "Turner, MD and Sandelich, S and Marco, C", title: "Rapid progression of orbital abscess requiring lateral canthotomy in a pediatric patient", journal: "American Journal of Emergency Medicine", year: 2024 },
  { key: "sunday2024septicshock", authors: "Sunday, A and Sandelich, S", title: "Septic Shock Caused by a Perforated Appendix", journal: "Critical Decisions in Emergency Medicine", year: 2024 },
  { key: "schwarz2024oud", authors: "Schwarz, ES and Dietrich, AM and Sandelich, S and Hooley, G and Rose, E and Ruttan, T and Simon, EL and Sulton, C and Wall, J", title: "Emergency department management of opioid use disorder in pediatric patients", journal: "J Am Coll Emerg Physicians Open", year: 2024 },
  { key: "thompson2024firstweek", authors: "Thompson, G and Sandelich, SM and Winograd, SM", title: "Emergencies in the First Week of Life", journal: "Pediatric Emergency Medicine Reports", year: 2024 },
  { key: "rittenhouse2024buprenorphine", authors: "Rittenhouse, D and Sandelich, S", title: "A National Survey of Pediatric Emergency Medicine Clinicians' Comfort Level, Beliefs, and Experiences With Initiating Buprenorphine in the Emergency Department", journal: "Cureus", year: 2024, url: "https://doi.org/10.7759/cureus.69331" },
  { key: "sandelich2025limpingchild", authors: "Sandelich, S and Hwang, G", title: "A Limping Child with Fever", journal: "Critical Decisions in Emergency Medicine", year: 2025 },
  { key: "sandelich2025prehospitalopioid", authors: "Sandelich, S and Cavaliere, G and Buresh, C and Boehmer, S and Glasser, J and Klansek, I and Tolpin, A", title: "A Comparison of Pediatric Prehospital Opioid Encounters and Social Vulnerability", journal: "Prehospital Emergency Care", year: 2025 },
  { key: "sandelich2025caregiverperceptions", authors: "Sandelich, S and Coakes, C and Stuckey-Peyrot, HL and Levy, S and Buresh, C and Chun, TH and Zgierska, AE", title: "A Survey of Adolescent and Caregiver Perceptions of Substance Use Screening in Pediatric Emergency Departments", journal: "J Am Coll Emerg Physicians Open", year: 2025 },
  { key: "stancliff2025svi", authors: "Stancliff, H and Buresh, C and Cavaliere, G and Boehmer, S and Sandelich, SM", title: "Social Vulnerability and Pediatric EMS Behavioral Health Activations: Trends in Utilization and Sedation Practices", journal: "Prehospital Emergency Care", year: 2025 },
  { key: "jordan2025fingeramp", authors: "Jordan, E and Sandelich, S", title: "Finger Amputation in a Child", journal: "Critical Decisions in Emergency Medicine", year: 2025 },
  { key: "basile2025cap", authors: "Basile, D and Sandelich, S", title: "Community-acquired Pneumonia in Children", journal: "Emergency Medicine Clinics of North America", year: 2025 },
  { key: "verbos2025ignite", authors: "Verbos, KW II and Agolli, A and Sandelich, S and Alvarado, A and Jusufagic, A and Croes, KD and Zgierska, AE", title: "\"Ignite & Engage\": A mixed methods evaluation of a peer-led, school-based substance use prevention program", journal: "Addiction Science & Clinical Practice", year: 2025 },
  { key: "marco2025cannabis", authors: "Marco, CA and Becker, L and Egner, M and Erturk, Q and Sharma, A and Vail, T and Soderman, C and Morrison, N and Sandelich, S", title: "Comparison of Perspectives on Cannabis Use Between Emergency Department Patients Who Are Users and Non-users", journal: "Western Journal of Emergency Medicine", year: 2025 },
  { key: "foster2025safetyplanning", authors: "Foster, AA and Hoffmann, JA and Berg, K and Cheng, T and Claudius, I and Dietrich, AM and Hooley, G and Lam, SHF and Li, J and Lin, S and Mendez, D and Mroczkowski, M and Rice, LE and Saidinejad, M and Sandelich, S and Santillanes, G and Sulton, C and Waseem, M and Walls, T", title: "Safety Planning for Youth in the Emergency Department Who Have Suicide Risk", journal: "J Am Coll Emerg Physicians Open", year: 2025 },
  { key: "schweitzer2026ace", authors: "Schweitzer, C and DiGiovanni, A and Bu, D and Burynski, R and Kassim, A and Sabry, A and Russell, M and Sandelich, S", title: "The impact of adverse childhood experiences on emotional regulation in adult ED patients", journal: "J Affect Disord", year: 2026 },
  { key: "kassim2026substanceuse", authors: "Kassim, A and Sabry, A and Schweitzer, C and Burynski, R and DiGiovanni, A and Bu, D and Russell, M and Sandelich, SM", title: "Substance Use Behaviors as Markers of Emotional Dysregulation and Childhood Adversity Among Adult Emergency Department Patients", journal: "Cureus", year: 2026, url: "https://doi.org/10.7759/cureus.101182" },
  { key: "sandelich2026dualdiagnoses", authors: "Sandelich, S and Buresh, C and Axson, S and Linn, B and Mareboina, M", title: "Healthcare utilization patterns among adolescents with dual diagnoses of mental health and substance use disorders", journal: "J Affect Disord", year: 2026 },
  { key: "buresh2026overdosedeaths", authors: "Buresh, C and Sandelich, S and Hall, J and Hall, K", title: "Characteristics of Adolescents and Young Adults Who Died of Overdose: Opportunities for Intervention", journal: "Emergency Medicine News", year: 2026 },
  { key: "poyorena2026buprenorphine", authors: "Poyorena, CO and Sandelich, SM and Buresh, C", title: "Emergency Department-facilitated Buprenorphine Initiation for Opioid Use Disorder in Adolescents and Young Adults: A Retrospective Case Series", journal: "J Addict Med", year: 2026, url: "https://doi.org/10.1097/ADM.0000000000001704" },
  { key: "buresh2026naloxone", authors: "Buresh, C and Kaplan, R and Lowry, S and Sandelich, S and Rutman, L", title: "Improving Naloxone and Buprenorphine Provision in the Pediatric Emergency Department Through Education and Chief Complaint-Triggered Screening", journal: "Pediatr Emerg Care", year: 2026, url: "https://doi.org/10.1097/PEC.0000000000003640" },
  { key: "sandelich2026traumaoutcomes", authors: "Sandelich, S and Schuster, A and Klansek, I and Olabamiji, OO and Marco, C and Glasser, J and Zgierska, AE", title: "Association Between Substance Use and Trauma Outcomes in Adolescents", journal: "Western Journal of Emergency Medicine", year: 2026 },
  { key: "stancliff2026asthma", authors: "Stancliff, H and Mara, A and Rishabh, S and Sandelich, S", title: "Documented Nicotine, Cannabis, and Co-Use Are Associated With More Intensive Emergency Department Care for Adolescent Asthma Exacerbations", journal: "JACEP Open", year: 2026 },
  { key: "sandelich2026screening", authors: "Sandelich, S and Amanullah, S and Barata, I and Berg, K and Brown, K and Cheng, T and Chimptazi, C and Claudius, I and Dietrich, AM and Lin, S and Ruttan, T and Stoner, M and Sulton, C and Waseem, M", title: "Adolescent Substance Use Screening in the Emergency Department", journal: "JACEP Open", year: 2026, url: "https://doi.org/10.1016/j.acepjo.2026.100447" },
];

const bookChapters = [
  { key: "sandelich2018burn", authors: "Sandelich, S and Russo, C", title: "Burn Wound Management", journal: "Reichman's Emergency Medicine Procedures, 3rd ed. (McGraw-Hill Education)", year: 2018, public: "chapter" },
  { key: "singh2023respiratory", authors: "Singh, S and Sandelich, S", title: "Respiratory Emergencies", journal: "Pediatric Emergency Medicine Secrets (Elsevier)", year: 2023, public: "chapter" },
  { key: "mareboina2025alcohol", authors: "Mareboina, M and Sandelich, S", title: "Alcohol and Substance Abuse", journal: "Clinical Considerations in School-based Health: An Evidence-Based Guide for Physicians, Advanced Practice Providers and School Nurses (Springer)", year: 2025, public: "chapter" },
];

const policyDocuments = [
  { key: "aap2024imaging", authors: "{American Academy of Pediatrics Committee on Pediatric Emergency Medicine and Section on Radiology} and {American College of Emergency Physicians Pediatric Emergency Medicine Committee} and {American College of Radiology}", title: "Optimizing Advanced Imaging of the Pediatric Patient in the Emergency Department: Technical Report", journal: "Pediatrics", year: 2024, public: "policy" },
  { key: "acep2026screeningpolicy", authors: "{American College of Emergency Physicians}", title: "Policy Statement: Adolescent Substance Use Screening in the Emergency Department", journal: "Annals of Emergency Medicine", year: 2026, public: "policy" },
];

const abstracts = [
  { key: "marco2023abstractvitalsigns", authors: "Marco, C and Sandelich, S and Nelson, E and Hu, E and Locke, D", title: "Vital Signs Among Emergency Department Trauma Patients in the Setting of Alcohol or Drug Use", journal: "Annals of Emergency Medicine (abstract)", year: 2023, public: "abstract" },
  { key: "sandelich2025abstractprotocol", authors: "Sandelich, S and Buresh, C and Camenga, D and Chun, T and Chang, T", title: "Creation of a Protocol for the Treatment of Adolescent Opioid Use Disorder in the Emergency Department", journal: "Annals of Emergency Medicine (abstract)", year: 2025, public: "abstract" },
  { key: "poyorena2025abstractoutcomes", authors: "Poyorena, C and Sandelich, S and Buresh, C", title: "Outcomes of Emergency Department-Initiated Buprenorphine for Adolescents With Opioid Use Disorder", journal: "Annals of Emergency Medicine (abstract)", year: 2025, public: "abstract" },
];

const submitted = [
  { key: "sandelich2026targetedscreening", authors: "Sandelich, S", title: "Targeted Substance Use Screening Misses Most Positive Adolescents in the Pediatric Emergency Department: A 12-Year Retrospective Analysis", journal: "Submitted to JACEP Open", year: 2026, public: "wip" },
  { key: "sandelich2026transgender", authors: "Sandelich, S", title: "Substance Use, Mental Health, and Healthcare Disparities in Transgender Adolescents", journal: "Submitted to Journal of Adolescent Health", year: 2026, public: "wip" },
];

const all = [...peerReviewed, ...bookChapters, ...policyDocuments, ...abstracts, ...submitted];

function entry({ key, authors, title, journal, year, url, public: pub }) {
  // Only submitted/in-review items skip a link (nothing to link to yet).
  const resolvedUrl = pub === "wip" ? undefined : url || pubmedSearch(title);
  const lines = [
    `@article{${key},`,
    `  title = {${title}},`,
    `  author = {${authors}},`,
    `  journal = {${journal}},`,
    `  year = {${year}},`,
  ];
  if (resolvedUrl) lines.push(`  url = {${resolvedUrl}},`);
  lines.push(`  public = {${pub ?? "yes"}}`);
  lines.push(`}`);
  return lines.join("\n");
}

const out = all.map(entry).join("\n\n") + "\n";
writeFileSync(new URL("../src/data/publications.bib", import.meta.url), out);
console.log(`Wrote ${all.length} entries to src/data/publications.bib`);
