import React from 'react';

interface Download {
  file?: {
    url: string;
  };
  label: string;
  language: string;
}

interface DownloadsProps {
  downloads: Download[];
}

const Downloads: React.FC<DownloadsProps> = ({ downloads }) => {
  if (!downloads?.length) return null;

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-8">Downloads</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {downloads.map((doc, i) => (
          <a
            key={i}
            href={doc.file?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg bg-white shadow text-center hover:shadow-md border border-gray-100 transition"
          >
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-blue-500 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4m-8 6h8a2 2 0 002-2V7a2 2 0 00-2-2h-1" />
              </svg>
              <p className="font-medium text-blue-700 mb-1">{doc.label}</p>
              <p className="text-xs text-gray-500">{doc.language}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Downloads;
