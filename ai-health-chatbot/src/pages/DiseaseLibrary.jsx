import { useState } from "react";

const diseases = [
  {
    name: "Viral Fever",
    category: "Infections",
    severity: "Mild",
    description: "A common infection caused by viruses affecting the immune system, resulting in elevated body temperature.",
    symptoms: ["High temperature (100–104°F)", "Body ache & fatigue", "Headache", "Chills & sweating", "Loss of appetite"],
    causes: ["Viral infections (influenza, adenovirus)", "Exposure to infected persons", "Weakened immunity"],
    prevention: ["Stay hydrated", "Rest adequately", "Avoid contact with infected people", "Maintain hand hygiene"],
    diet: ["Warm soups & khichdi", "Coconut water & ORS", "Tulsi-ginger tea", "Citrus fruits (Vitamin C)", "Avoid oily/spicy food"],
    redFlags: ["Fever above 104°F", "Seizures or fits", "Rash with fever", "No urination for 8+ hours"],
  },
  {
    name: "Dengue",
    category: "Infections",
    severity: "Severe",
    description: "A mosquito-borne viral disease transmitted by Aedes mosquitoes, common in tropical regions.",
    symptoms: ["Sudden high fever (104°F)", "Severe headache", "Pain behind eyes", "Joint & muscle pain", "Skin rash", "Low platelet count"],
    causes: ["Aedes aegypti mosquito bite", "Dengue virus (4 serotypes)", "Stagnant water near homes"],
    prevention: ["Use mosquito repellents", "Wear full-sleeve clothing", "Eliminate stagnant water", "Use mosquito nets"],
    diet: ["Papaya leaf juice", "Pomegranate juice", "Coconut water", "Kiwi & oranges", "High fluid intake"],
    redFlags: ["Bleeding from nose/gums", "Blood in vomit", "Platelet below 50,000", "Severe abdominal pain"],
  },
  {
    name: "Malaria",
    category: "Infections",
    severity: "Severe",
    description: "A life-threatening disease caused by Plasmodium parasites, transmitted through infected Anopheles mosquito bites.",
    symptoms: ["Intermittent fever with chills", "Shaking & rigors", "Profuse sweating", "Headache & vomiting", "Spleen enlargement"],
    causes: ["Plasmodium vivax / falciparum parasite", "Anopheles mosquito bite", "Travel to endemic areas"],
    prevention: ["Mosquito nets & repellents", "Eliminate stagnant water", "Wear full-sleeve clothes at night", "Anti-malarial prophylaxis"],
    diet: ["High fluid intake", "Vitamin C rich fruits", "Light digestible food", "Khichdi & soups", "Avoid alcohol completely"],
    redFlags: ["Confusion / altered consciousness", "Severe anaemia", "Jaundice & dark urine", "Difficulty breathing"],
  },
  {
    name: "Typhoid",
    category: "Infections",
    severity: "Moderate",
    description: "A bacterial infection caused by Salmonella typhi, spread through contaminated food and water.",
    symptoms: ["Continuous fever (stepladder pattern)", "Abdominal pain", "Rose-coloured spots", "Constipation or diarrhoea", "Weakness"],
    causes: ["Salmonella typhi bacteria", "Contaminated water/food", "Poor hand hygiene"],
    prevention: ["Drink boiled/filtered water", "Eat freshly cooked food", "Wash hands thoroughly", "Typhoid vaccine"],
    diet: ["Soft porridge & khichdi", "Mashed potatoes & curd", "Boiled vegetables", "Banana & papaya", "Avoid raw food"],
    redFlags: ["Intestinal perforation (severe sudden pain)", "Persistent bleeding", "Altered consciousness"],
  },
  {
    name: "COVID-19",
    category: "Infections",
    severity: "Moderate",
    description: "A respiratory illness caused by SARS-CoV-2 virus, ranging from mild cold-like symptoms to severe pneumonia.",
    symptoms: ["Fever & dry cough", "Loss of smell/taste", "Fatigue & body ache", "Breathlessness", "Sore throat"],
    causes: ["SARS-CoV-2 virus", "Airborne transmission", "Contact with infected surfaces"],
    prevention: ["Stay vaccinated", "Wear mask in crowds", "Hand hygiene", "Ventilate indoor spaces"],
    diet: ["Zinc-rich foods (lentils, seeds)", "Vitamin C (citrus)", "Turmeric milk", "Warm ginger tea", "Protein-rich food"],
    redFlags: ["SpO2 below 94%", "Severe breathlessness", "Persistent chest pain", "Confusion"],
  },
  {
    name: "Diabetes",
    category: "Lifestyle",
    severity: "Chronic",
    description: "A metabolic disorder where blood glucose levels remain high due to insufficient insulin production or action.",
    symptoms: ["Frequent urination", "Excessive thirst", "Unexplained weight loss", "Blurred vision", "Slow-healing wounds"],
    causes: ["Insulin resistance (Type 2)", "Autoimmune destruction (Type 1)", "Obesity & sedentary lifestyle", "Genetics"],
    prevention: ["Exercise 30 min daily", "Reduce refined sugar/carbs", "Maintain healthy weight", "Regular blood sugar monitoring"],
    diet: ["Low glycemic foods", "Whole grains & legumes", "Green vegetables", "Avoid white rice & sweets", "Small frequent meals"],
    redFlags: ["Glucose >300 mg/dL", "Diabetic ketoacidosis (fruity breath)", "Foot ulcers", "Extreme confusion"],
  },
  {
    name: "Hypertension",
    category: "Lifestyle",
    severity: "Chronic",
    description: "A chronic condition where blood pressure in the arteries is persistently elevated, often called the 'silent killer'.",
    symptoms: ["Often no symptoms", "Headache (severe)", "Dizziness", "Blurred vision", "Nose bleeds"],
    causes: ["High salt diet", "Obesity & physical inactivity", "Smoking & alcohol", "Genetics & stress"],
    prevention: ["Reduce salt (<2g/day)", "Exercise daily", "Quit smoking", "Manage stress", "Regular BP checks"],
    diet: ["DASH diet (fruits, vegetables)", "Low sodium food", "Potassium-rich (banana, spinach)", "Whole grains", "Avoid processed food"],
    redFlags: ["BP >180/120 (hypertensive crisis)", "Severe headache + vision changes", "Chest pain"],
  },
  {
    name: "Asthma",
    category: "Respiratory",
    severity: "Moderate",
    description: "A chronic respiratory condition causing airway inflammation and narrowing, leading to breathing difficulty.",
    symptoms: ["Wheezing & chest tightness", "Shortness of breath", "Cough (worse at night)", "Triggered by allergens"],
    causes: ["Allergens (dust, pollen, pet dander)", "Air pollution", "Exercise", "Respiratory infections", "Genetics"],
    prevention: ["Avoid known triggers", "Use prescribed inhaler", "Annual flu vaccine", "Keep rescue inhaler handy"],
    diet: ["Ginger & turmeric (anti-inflammatory)", "Omega-3 (fish, flaxseed)", "Garlic", "Avoid sulphite-rich foods"],
    redFlags: ["Rescue inhaler not working", "Blue lips/fingernails", "Cannot speak full sentences", "Rapid breathing"],
  },
  {
    name: "Tuberculosis",
    category: "Respiratory",
    severity: "Severe",
    description: "A bacterial infection caused by Mycobacterium tuberculosis, primarily affecting the lungs.",
    symptoms: ["Cough >3 weeks", "Blood in sputum", "Night sweats", "Weight loss", "Fatigue & low-grade fever"],
    causes: ["Mycobacterium tuberculosis", "Airborne transmission", "Weakened immunity", "Overcrowded conditions"],
    prevention: ["BCG vaccination", "Complete DOTS treatment", "Ventilate living spaces", "Wear mask if infected"],
    diet: ["High calorie protein diet", "Eggs, milk, dal & nuts", "Vitamin D (sunlight)", "Vitamin B6 supplements"],
    redFlags: ["Coughing blood", "Extreme weight loss", "Constant night sweats", "Swollen lymph nodes"],
  },
  {
    name: "Anaemia",
    category: "Blood",
    severity: "Mild",
    description: "A condition where red blood cells or haemoglobin levels are below normal, reducing oxygen delivery to tissues.",
    symptoms: ["Fatigue & weakness", "Pale skin & nails", "Breathlessness on exertion", "Dizziness", "Cold hands & feet"],
    causes: ["Iron deficiency", "Vitamin B12 / folic acid deficiency", "Blood loss", "Chronic disease", "Thalassaemia"],
    prevention: ["Iron-rich diet", "Folic acid in pregnancy", "Deworming every 6 months", "Treat underlying cause"],
    diet: ["Spinach, jaggery & dates", "Lentils & meat", "Vitamin C with iron (aids absorption)", "Eggs & dairy (B12)"],
    redFlags: ["Hb <7 g/dL", "Breathlessness at rest", "Chest pain", "Heart failure signs"],
  },
  {
    name: "Arthritis",
    category: "Bone & Joint",
    severity: "Chronic",
    description: "Inflammation of one or more joints causing pain, stiffness and swelling, most common in older adults.",
    symptoms: ["Joint pain & swelling", "Morning stiffness", "Reduced range of motion", "Warmth around joints"],
    causes: ["Age-related wear (Osteoarthritis)", "Autoimmune (Rheumatoid)", "Uric acid excess (Gout)", "Genetics"],
    prevention: ["Maintain healthy weight", "Low-impact exercise", "Joint protection techniques", "Regular check-ups"],
    diet: ["Omega-3 fish oil", "Turmeric & ginger", "Cherries (for gout)", "Avoid red meat & alcohol (gout)"],
    redFlags: ["Sudden hot swollen joint with fever (septic arthritis)", "Joint deformity", "Complete loss of movement"],
  },
  {
    name: "Migraine",
    category: "Neurological",
    severity: "Moderate",
    description: "A neurological condition causing intense throbbing headaches, often accompanied by nausea and sensitivity to light.",
    symptoms: ["Throbbing one-sided headache", "Nausea & vomiting", "Light & sound sensitivity", "Visual aura", "Lasts 4–72 hours"],
    causes: ["Hormonal changes", "Stress & anxiety", "Sleep disruption", "Certain foods (MSG, alcohol)", "Strong smells"],
    prevention: ["Identify & avoid triggers", "Regular sleep schedule", "Stay hydrated", "Stress management"],
    diet: ["Magnesium-rich foods (nuts, dark chocolate)", "Adequate water", "Regular meals", "Avoid caffeine excess & alcohol"],
    redFlags: ["Thunderclap sudden headache", "Headache with stiff neck + fever", "Vision changes", "Weakness or numbness"],
  },
  {
    name: "Depression",
    category: "Mental Health",
    severity: "Moderate",
    description: "A common mental health disorder characterised by persistent sadness, loss of interest and feelings of hopelessness.",
    symptoms: ["Persistent sadness", "Loss of interest (anhedonia)", "Fatigue & sleep changes", "Difficulty concentrating", "Feelings of worthlessness"],
    causes: ["Chemical imbalance in brain", "Trauma or loss", "Chronic illness", "Genetics", "Social isolation"],
    prevention: ["Regular exercise", "Social connection", "Professional therapy (CBT)", "Adequate sleep", "Mindfulness"],
    diet: ["Omega-3 (fish, walnuts)", "Folate (leafy greens)", "Vitamin D", "Fermented foods (curd)", "Avoid alcohol"],
    redFlags: ["Thoughts of self-harm or suicide", "Inability to function daily", "Psychotic symptoms — IMMEDIATE help needed"],
  },
  {
    name: "PCOS",
    category: "Women's Health",
    severity: "Chronic",
    description: "Polycystic Ovary Syndrome — a hormonal disorder affecting women of reproductive age, causing irregular periods and cysts.",
    symptoms: ["Irregular or absent periods", "Weight gain", "Facial hair & acne", "Hair thinning", "Difficulty conceiving"],
    causes: ["Hormonal imbalance", "Insulin resistance", "Genetics", "Inflammation"],
    prevention: ["Regular exercise", "Healthy weight", "Low refined carb diet", "Hormonal evaluation"],
    diet: ["Low glycemic index food", "Anti-inflammatory diet", "Omega-3", "High fibre vegetables", "Avoid processed sugar"],
    redFlags: ["Very heavy bleeding", "No periods for >3 months", "Severe pelvic pain — gynaecologist consultation"],
  },
  {
    name: "UTI",
    category: "Kidney & Urinary",
    severity: "Mild",
    description: "Urinary Tract Infection — a bacterial infection affecting the bladder, urethra or kidneys, more common in women.",
    symptoms: ["Burning sensation while urinating", "Frequent urge to urinate", "Cloudy or strong-smelling urine", "Pelvic pain"],
    causes: ["E. coli bacteria", "Poor hygiene", "Holding urine for long", "Dehydration", "Sexual activity"],
    prevention: ["Drink plenty of water", "Don't hold urine", "Wipe front to back", "Urinate after intercourse", "Cotton underwear"],
    diet: ["Cranberry juice", "Plenty of water (3L/day)", "Probiotics (curd)", "Avoid caffeine & alcohol"],
    redFlags: ["Fever with back pain", "Blood in urine", "Symptoms not improving in 3 days — antibiotics needed"],
  },
  {
    name: "Anxiety",
    category: "Mental Health",
    severity: "Moderate",
    description: "A mental health disorder characterised by excessive worry, fear and nervousness that interferes with daily activities.",
    symptoms: ["Excessive worrying", "Racing heartbeat", "Sweating & trembling", "Sleep disturbances", "Difficulty concentrating"],
    causes: ["Stress & trauma", "Genetics", "Brain chemistry", "Chronic illness", "Caffeine excess"],
    prevention: ["Mindfulness & meditation", "Regular exercise", "Limit caffeine & alcohol", "Build social support", "CBT therapy"],
    diet: ["Magnesium (dark chocolate, nuts)", "Omega-3", "Chamomile tea", "Vitamin B complex", "Avoid excess caffeine & sugar"],
    redFlags: ["Panic attacks disrupting daily life", "Agoraphobia", "Anxiety with chest pain — rule out cardiac cause"],
  },
];

const categories = ["All", "Infections", "Lifestyle", "Respiratory", "Blood", "Bone & Joint", "Neurological", "Mental Health", "Women's Health", "Kidney & Urinary"];

export default function DiseaseLibrary() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = diseases.filter((d) => {
    const matchCat = category === "All" || d.category === category;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase()) ||
      d.symptoms.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-16 px-8 pb-20">
      
      {!selected ? (
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Disease Library</h1>
          <p className="text-slate-600 mb-8">Search common health conditions, causes, and prevention.</p>

          <input
            type="text"
            placeholder="Search by disease or symptom..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 mb-6"
          />

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1 text-sm rounded-full transition ${category === c ? "bg-teal-600 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
               {filtered.map(d => (
                 <div
                   key={d.name}
                   onClick={() => setSelected(d)}
                   className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-teal-500 cursor-pointer transition"
                 >
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="font-semibold text-lg text-slate-800">{d.name}</h3>
                     <span className="text-xs font-medium text-slate-500">{d.category}</span>
                   </div>
                   <p className="text-slate-600 text-sm mb-4">{d.description}</p>
                   <div className="flex flex-wrap gap-2">
                     {d.symptoms.slice(0, 3).map(s => (
                       <span key={s} className="bg-slate-100 text-slate-600 px-2 py-1 text-xs rounded-md">{s}</span>
                     ))}
                     {d.symptoms.length > 3 && <span className="text-xs text-slate-400 self-center">+{d.symptoms.length - 3} more</span>}
                   </div>
                 </div>
               ))}
               {filtered.length === 0 && <p className="text-slate-500 text-center py-10">No conditions found.</p>}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto w-full">
          <button
            onClick={() => setSelected(null)}
            className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
          >
            ← Back to Library
          </button>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{selected.name}</h2>
          <div className="flex gap-3 mb-6">
            <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">{selected.category}</span>
            <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">{selected.severity}</span>
          </div>

          <p className="text-slate-700 mb-8">{selected.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-3">Symptoms</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                {selected.symptoms.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-3">Causes</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                {selected.causes.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-3">Prevention</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                {selected.prevention.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-3">Diet</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                {selected.diet.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border border-red-200 shadow-sm md:col-span-2">
              <h3 className="font-semibold text-red-700 mb-3">Red Flags</h3>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                {selected.redFlags.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}