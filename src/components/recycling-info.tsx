import { RichTextContent } from "@graphcms/rich-text-types";
import { RichTextWrapper } from "@/components/rich-text-wrapper";


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
  flag?: {
    url: string;
  };
  recyclingSchedule: string | RecyclingSchedule;
}

interface RecyclingInfoProps {
  sharedRecyclingInfo: {
    raw: RichTextContent;
    text?: string;
  };
  countryVariants: CountryVariant[];
  selectedCountry: string;
}

export default function RecyclingInfo({
  sharedRecyclingInfo,
  countryVariants,
  selectedCountry,
}: RecyclingInfoProps) {
  const hasShared = sharedRecyclingInfo?.raw && Object.keys(sharedRecyclingInfo.raw).length > 0;
  const filteredVariants = countryVariants.filter((v) =>
    v.country.toLowerCase().includes(selectedCountry)
  );
  const hasLocalized = filteredVariants.length > 0;

  if (!hasShared && !hasLocalized) return null;
  
  return (
    <div className="font-sans text-gray-900">
      <section className="py-16 px-6">
        <h2 className="text-2xl font-semibold text-center mb-8">Recycling Info by Region</h2>

        <div className="prose text-sm max-w-4xl mx-auto mb-10 text-center">
          {hasShared ? (
            <RichTextWrapper content={sharedRecyclingInfo.raw} />
          ) : (
            <p className="text-gray-500 italic">No general recycling information available.</p>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
{countryVariants
  .filter((v) => v.country.toLowerCase().includes(selectedCountry))
  .map((v, i) => {
    console.log(`Rendering card for country: ${v.country}`, v);
    return (
      <div
        key={i}
        className="flex gap-6 bg-gray-50 p-6 rounded-lg w-full md:w-[calc(33.33%-1rem)] max-w-sm"
      >
        <div className="flex flex-col items-center gap-4 text-center flex-1">

          {v.flag?.url && (
            <img
              src={v.flag.url}
              alt={`${v.country} flag`}
              className="w-12 h-8 object-contain"
            />
          )}
          <h4 className="text-lg font-semibold text-gray-900">{v.country}</h4>

          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: v.localizedContent?.html || '' }}
          />

          {typeof v.recyclingSchedule === 'string' ? (
            <p className="mt-2 text-gray-600">Schedule: {v.recyclingSchedule}</p>
          ) : (
            <div className="mt-2 text-gray-600 text-left">
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
      </div>
    );
  })}

        </div>
      </section>
    </div>
  );
} 
