import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";


interface RecyclingSchedule {
  title: string;
  schedule: Array<{
    item: string;
    day: string;
  }>;
  note: string;
}

interface CountryVariant {
  country: string;
  localizedContent?: {
    html: string;
  };
  recyclingSchedule: string | RecyclingSchedule;
}

interface RecyclingInfoProps {
  sharedRecyclingInfo: {
    raw: RichTextContent;
  };
  countryVariants: CountryVariant[];
  selectedCountry: string;
}

export default function RecyclingInfo({
  sharedRecyclingInfo,
  countryVariants,
  selectedCountry,
}: RecyclingInfoProps) {
  const hasShared = sharedRecyclingInfo?.raw?.children?.length > 0;
  const filteredVariants = countryVariants.filter((v) =>
    v.country.toLowerCase().includes(selectedCountry)
  );
  const hasLocalized = filteredVariants.length > 0;

  if (!hasShared && !hasLocalized) return null;
  
  return (
    <div className="font-sans text-gray-900">
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-8">Recycling Info by Region</h2>

        <div className="prose text-sm max-w-4xl mx-auto mb-10">
          {sharedRecyclingInfo?.raw ? (
            <RichText content={sharedRecyclingInfo.raw} />
          ) : (
            <p className="text-gray-500 italic">No general recycling information available.</p>
          )}
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {countryVariants
            .filter((v) => v.country.toLowerCase().includes(selectedCountry))
            .map((v, i) => (
              <div key={i} className="bg-white p-6 rounded shadow text-sm">
                <h4 className="text-lg font-bold mb-2 uppercase">{v.country}</h4>
                <div
                  className="prose text-sm"
                  dangerouslySetInnerHTML={{ __html: v.localizedContent?.html || '' }}
                />
                {typeof v.recyclingSchedule === 'string' ? (
                  <p className="mt-2 text-gray-500">Schedule: {v.recyclingSchedule}</p>
                ) : (
                  <div className="mt-2 text-gray-500">
                    <h5 className="font-semibold">{v.recyclingSchedule.title}</h5>
                    <ul className="list-disc list-inside">
                      {v.recyclingSchedule.schedule.map((entry, idx) => (
                        <li key={idx}>
                          {entry.item}: {entry.day}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm italic mt-2">{v.recyclingSchedule.note}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
} 
