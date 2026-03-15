import { useState } from "react";

const diseases = [
  {
    name: "Dengue",
    symptoms: "High fever, rash, muscle pain",
    prevention: "Avoid mosquito bites, keep surroundings clean",
  },
  {
    name: "Flu",
    symptoms: "Fever, cough, sore throat",
    prevention: "Vaccination, hand hygiene",
  },
  {
    name: "Malaria",
    symptoms: "Fever with chills, sweating",
    prevention: "Mosquito nets, repellents",
  },
  {
    name: "Diabetes",
    symptoms: "Frequent urination, fatigue",
    prevention: "Healthy diet, regular exercise",
  },
];

export default function DiseaseLibrary() {
  const [search, setSearch] = useState("");

  const filtered = diseases.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-16">

      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-teal-600 mb-10">
        Disease Library
      </h1>

      {/* Search */}
      <div className="max-w-md mx-auto mb-14">
        <input
          type="text"
          placeholder="Search disease..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {filtered.map((disease, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-teal-600 mb-3">
              {disease.name}
            </h2>

            <p className="text-slate-700 mb-2">
              <span className="font-semibold">Symptoms:</span>{" "}
              {disease.symptoms}
            </p>

            <p className="text-slate-700">
              <span className="font-semibold">Prevention:</span>{" "}
              {disease.prevention}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}