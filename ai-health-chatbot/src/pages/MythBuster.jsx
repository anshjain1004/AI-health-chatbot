export default function MythBuster() {
  const myths = [
    {
      myth: "You can't get dengue in winter.",
      fact: "Mosquitoes can survive indoors, so dengue is possible year-round.",
    },
    {
      myth: "Cold weather causes flu.",
      fact: "Flu is caused by viruses, not cold temperature itself.",
    },
    {
      myth: "Diabetes comes only from eating sugar.",
      fact: "It’s influenced by genetics, lifestyle, and overall diet.",
    },
  ];

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-teal-400 text-center">
        Health Myth Buster
      </h1>

      <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {myths.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold text-red-400">
              ❌ Myth: {item.myth}
            </h2>
            <p className="mt-3 text-teal-600">
              ✅ Fact: {item.fact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
