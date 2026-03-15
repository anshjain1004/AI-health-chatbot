import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-center">

        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
            AI-Powered <br />
            <span className="text-teal-600">Symptom Checker</span> <br />
            & Health Assistant
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            Describe your symptoms and get structured health insights,
            prevention tips, and safety guidance powered by AI.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/chat"
              className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
            >
              Start Checking
            </Link>

            <Link
              to="/diseases"
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-slate-200">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            🩺 Possible Conditions
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            💊 Prevention Guidance
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            🚨 Red Flag Alerts
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800">
            Why Use Our AI Health Assistant?
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Get reliable disease awareness, symptom guidance, and myth-busting
            powered by structured AI insights.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800">
                Smart Symptom Analysis
              </h3>
              <p className="mt-3 text-slate-600">
                AI structured responses including conditions, prevention tips
                and red flags.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800">
                Trusted Health Awareness
              </h3>
              <p className="mt-3 text-slate-600">
                Learn about diseases, prevention, and recovery guidance.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800">
                Myth Buster
              </h3>
              <p className="mt-3 text-slate-600">
                Separate medical myths from facts using AI-powered verification.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}