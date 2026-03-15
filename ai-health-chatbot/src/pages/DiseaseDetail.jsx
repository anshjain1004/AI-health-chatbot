import { useParams } from "react-router-dom";

const diseaseData = {
  Dengue: {
    overview: "Dengue is a mosquito-borne viral infection.",
    symptoms: "High fever, rash, muscle pain, headache.",
    prevention: "Avoid mosquito bites, use repellents, clean surroundings.",
    treatment: "Rest, fluids, consult doctor if severe symptoms appear.",
  },
  Flu: {
    overview: "Flu is a contagious respiratory illness.",
    symptoms: "Fever, cough, sore throat, body aches.",
    prevention: "Vaccination, hand washing, avoid sick people.",
    treatment: "Rest, hydration, antiviral medicines if prescribed.",
  },
  Malaria: {
    overview: "Malaria is caused by parasites transmitted through mosquito bites.",
    symptoms: "Fever with chills, sweating, nausea.",
    prevention: "Use mosquito nets, repellents, and avoid stagnant water.",
    treatment: "Antimalarial medicines prescribed by doctor.",
  },
  Diabetes: {
    overview: "Diabetes is a condition that affects blood sugar levels.",
    symptoms: "Frequent urination, fatigue, blurred vision.",
    prevention: "Healthy diet, regular exercise, weight control.",
    treatment: "Lifestyle management, insulin or medications as prescribed.",
  },
};

export default function DiseaseDetail() {
  const { name } = useParams();
  const disease = diseaseData[name];

  if (!disease) {
    return <div className="p-10 text-center">Disease not found</div>;
  }

  return (
    <div className="min-h-screen p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-teal-400">{name}</h1>

      <div className="mt-8 space-y-6">
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h2 className="font-semibold text-xl">Overview</h2>
          <p className="text-gray-300 mt-2">{disease.overview}</p>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h2 className="font-semibold text-xl">Symptoms</h2>
          <p className="text-gray-300 mt-2">{disease.symptoms}</p>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h2 className="font-semibold text-xl">Prevention</h2>
          <p className="text-gray-300 mt-2">{disease.prevention}</p>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h2 className="font-semibold text-xl">Treatment</h2>
          <p className="text-gray-300 mt-2">{disease.treatment}</p>
        </div>
      </div>
    </div>
  );
}
