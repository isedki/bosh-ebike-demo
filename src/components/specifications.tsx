interface SpecificationType {
  icon?: {
    url: string;
  };
  label: string;
  valueMetric: string;
  valueImperial: string;
}

interface SpecificationsProps {
  specifications: SpecificationType[];
}

export default function Specifications({ specifications }: SpecificationsProps) {
  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-2xl font-semibold text-center mb-8">Specifications</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {specifications.map((spec, i) => (
          <div key={i} className="flex items-center bg-gray-50 rounded-lg shadow-sm p-4">
            {spec.icon?.url && <img src={spec.icon.url} alt="icon" className="w-12 h-12 mr-4" />}
            <div>
              <p className="text-sm text-gray-600">{spec.label}</p>
              <p className="text-md font-semibold">
                {spec.valueMetric} <span className="text-gray-400">/ {spec.valueImperial}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
