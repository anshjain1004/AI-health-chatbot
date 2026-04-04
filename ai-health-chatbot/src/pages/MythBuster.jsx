import { useState } from "react";

const myths = [
  {
    myth: "You should drink 8 glasses of water every day — no more, no less.",
    fact: "Water needs vary by person, activity level, climate and diet. Fruits and vegetables also contribute to hydration. Drink when you're thirsty and monitor urine colour (pale yellow = well hydrated).",
    category: "Nutrition",
  },
  {
    myth: "Eating carrots improves your eyesight beyond normal.",
    fact: "Carrots contain Vitamin A which prevents deficiency-related night blindness — but they cannot improve eyesight beyond your natural level or fix refractive errors like myopia. Glasses/contacts are still needed.",
    category: "Nutrition",
  },
  {
    myth: "You only use 10% of your brain.",
    fact: "Brain imaging (MRI/PET scans) show we use virtually all parts of our brain and most are active almost all the time. Different regions handle different functions — memory, movement, vision, emotion.",
    category: "Neurology",
  },
  {
    myth: "Cracking knuckles causes arthritis.",
    fact: "Studies including a famous self-experiment over 60 years show no link between knuckle cracking and arthritis. The 'pop' sound is caused by gas bubbles bursting in joint fluid — not bone damage.",
    category: "Bone & Joint",
  },
  {
    myth: "Cold weather causes the common cold.",
    fact: "Colds are caused by viruses (rhinovirus), not by being cold. However, people spend more time indoors in winter — closer contact spreads viruses more easily. You can catch a cold in summer too.",
    category: "Infections",
  },
  {
    myth: "You should feed a fever and starve a cold.",
    fact: "Both illnesses benefit from proper nutrition and hydration. Your immune system needs energy (calories) and nutrients to fight infection. Eat light, nutritious food and stay well hydrated for both.",
    category: "Infections",
  },
  {
    myth: "Antibiotics work for viral infections like cold and flu.",
    fact: "Antibiotics only kill bacteria — they have zero effect on viruses. Using them unnecessarily causes antibiotic resistance, a major global health crisis. Cold and flu need rest, hydration, and time.",
    category: "Infections",
  },
  {
    myth: "You lose most body heat through your head.",
    fact: "You lose heat proportionally from all exposed body parts. The head myth came from a flawed 1950s military study. If you go out with bare arms in winter, you'll lose heat from your arms — not just head.",
    category: "General",
  },
  {
    myth: "Sugar causes hyperactivity in children.",
    fact: "Multiple double-blind studies show no link between sugar intake and hyperactive behaviour in children. The belief is a placebo/confirmation bias — parents who think children had sugar rate them as more hyperactive.",
    category: "Nutrition",
  },
  {
    myth: "Swallowed gum stays in your stomach for 7 years.",
    fact: "While the gum base itself isn't digested, your digestive system moves it along within days, just like indigestible fibre. It doesn't stick to your stomach walls. Swallowing large amounts regularly could cause issues though.",
    category: "Digestive",
  },
  {
    myth: "Reading in dim light ruins your eyesight.",
    fact: "Reading in low light may cause eyestrain, fatigue and temporary discomfort — but causes no permanent damage to vision. Your eyes simply work harder, causing temporary tiredness.",
    category: "Eye Health",
  },
  {
    myth: "We have only 5 senses.",
    fact: "Humans have many more senses including proprioception (body position), thermoception (temperature), nociception (pain), vestibular sense (balance), interoception (internal organ states) and others.",
    category: "Neurology",
  },
  {
    myth: "Sitting too close to the TV damages your eyes.",
    fact: "No scientific evidence supports permanent eye damage from sitting close to screens. It may cause eye strain and headaches temporarily. Children often sit close because they're more comfortable focusing at close range.",
    category: "Eye Health",
  },
  {
    myth: "You must wait 30 minutes after eating before swimming.",
    fact: "There is no evidence that swimming after eating causes cramps or drowning. You may feel some discomfort, but the idea of dangerous cramps is a myth. Competitive swimmers often eat before training.",
    category: "General",
  },
  {
    myth: "Fat-free or low-fat foods are always healthier.",
    fact: "When fat is removed from food, sugar, salt or artificial additives are often added to improve taste. Many 'low-fat' products have more calories than their regular counterparts. Healthy fats (avocado, nuts, olive oil) are essential.",
    category: "Nutrition",
  },
  {
    myth: "Diabetes is caused by eating too much sugar.",
    fact: "Type 1 diabetes is autoimmune — unrelated to sugar. Type 2 is caused by obesity, genetics and insulin resistance — not sugar directly. Excess sugar contributes to weight gain which is a risk factor, but isn't the direct cause.",
    category: "Lifestyle",
  },
  {
    myth: "You need to detox your body with juices or cleanses.",
    fact: "Your liver, kidneys, lungs and skin are highly efficient detox organs — they work 24/7. There's no scientific evidence that juice cleanses remove toxins. Eat balanced food, stay hydrated and your body handles detox naturally.",
    category: "Nutrition",
  },
  {
    myth: "Vaccines cause autism.",
    fact: "The original 1998 study claiming this was fraudulent and retracted. The study's author lost his medical licence. Dozens of large-scale studies involving millions of children find absolutely no link between vaccines and autism.",
    category: "Vaccinations",
  },
  {
    myth: "Mental illness is a sign of weakness or laziness.",
    fact: "Mental illnesses are medical conditions involving biological, genetic and environmental factors. Brain chemistry and structure are involved — just like physical diseases. They require proper treatment, not willpower.",
    category: "Mental Health",
  },
  {
    myth: "You can catch mental illness from someone else.",
    fact: "Mental illnesses are not contagious. You cannot 'catch' depression, anxiety or schizophrenia from contact with someone who has it. They result from a complex interplay of genetics, brain biology and life experiences.",
    category: "Mental Health",
  },
  {
    myth: "Heart disease only affects old men.",
    fact: "Heart disease is the leading cause of death in women worldwide too. Young people also get heart attacks. Women often have different (atypical) symptoms like jaw pain, nausea and back pain — leading to missed diagnoses.",
    category: "Cardiac",
  },
  {
    myth: "If your blood pressure feels normal, it is normal.",
    fact: "Hypertension is called the 'silent killer' because it rarely causes symptoms until it's dangerously high. You CANNOT feel high blood pressure — the only way to know is to measure it regularly.",
    category: "Cardiac",
  },
  {
    myth: "Urine is sterile — it can be used to clean wounds.",
    fact: "Urine is not sterile — it contains bacteria even in healthy individuals. Applying urine to wounds can introduce bacteria and cause infection. Use clean water and proper antiseptic for wound care.",
    category: "First Aid",
  },
  {
    myth: "Hair and nails continue to grow after death.",
    fact: "This is an optical illusion. After death, skin dehydrates and shrinks — making hair and nails appear to protrude more. They don't actually grow. Growth requires active metabolism which stops at death.",
    category: "General",
  },
];

const categories = ["All", "Nutrition", "Infections", "Neurology", "Mental Health", "Cardiac", "Bone & Joint", "Eye Health", "General", "Vaccinations", "Lifestyle", "First Aid"];

export default function MythBuster() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [revealed, setRevealed] = useState({});

  const filtered = myths.filter(m => {
    const matchCat = category === "All" || m.category === category;
    const matchSearch = m.myth.toLowerCase().includes(search.toLowerCase()) ||
      m.fact.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggle = (i) => setRevealed(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-16 px-8 pb-20">
      
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Myth Buster</h1>
        <p className="text-slate-600 mb-8">Debunking common health myths with scientific facts.</p>

        <input
          type="text"
          placeholder="Search for a myth..."
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
          {filtered.map((m, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <span className="bg-slate-100 text-slate-600 px-2 py-1 text-xs rounded-md mb-3 inline-block">{m.category}</span>
                <p className="text-slate-800 font-semibold text-lg mb-4 leading-relaxed">"{m.myth}"</p>
                <button
                  onClick={() => toggle(i)}
                  className={`text-sm font-medium ${revealed[i] ? "text-slate-500" : "text-teal-600 hover:text-teal-700"}`}
                >
                  {revealed[i] ? "Hide Fact" : "Reveal Fact"}
                </button>
              </div>

              {revealed[i] && (
                <div className="bg-slate-50 border-t border-slate-200 p-6">
                  <h4 className="text-teal-700 font-semibold mb-2 text-sm uppercase tracking-wide">The Fact</h4>
                  <p className="text-slate-700">{m.fact}</p>
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && <p className="text-slate-500 text-center py-10">No myths found.</p>}
        </div>
      </div>
    </div>
  );
}