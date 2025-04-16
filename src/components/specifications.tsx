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
  if (!specifications || specifications.length === 0) return null;

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {specifications.map((spec, i) => (
            <div key={i} className="flex items-start gap-6 bg-gray-50 p-6 rounded-lg">
              {spec.icon?.url && (
                <div className="w-12 h-12 flex-shrink-0 text-gray-900">
                  <img src={spec.icon.url} alt="icon" className="w-full h-full" />
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">{spec.label}</p>
                <p className="text-md font-semibold">
                  {spec.valueMetric}{' '}
                  <span className="text-gray-400">/ {spec.valueImperial}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
