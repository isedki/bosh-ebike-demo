import React from "react";

interface Download {
  file?: {
    url: string;
  };
  label: string;
  language: string;
}

interface DownloadsProps {
  downloads: Download[];
  entryId: string;
}

const Downloads: React.FC<DownloadsProps> = ({ downloads, entryId }) => {
  if (!downloads?.length) return null;

  return (
    <section
      className="py-16 px-6 max-w-6xl mx-auto"
      data-hygraph-entry-id={entryId}
      data-hygraph-field-api-id="downloads"
      data-hygraph-entry-locale="en"
    >
      <h2 className="text-2xl font-semibold text-center mb-8">Downloads</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {downloads.map((doc, i) => (
          <a
            key={i}
            href={doc.file?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-6 bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-12 h-12 flex-shrink-0 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v12m0 0l-4-4m4 4l4-4m-8 6h8a2 2 0 002-2V7a2 2 0 00-2-2h-1"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {doc.label}
              </h3>
              <p className="text-sm text-gray-600">{doc.language}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Downloads;
