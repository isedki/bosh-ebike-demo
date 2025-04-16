import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';

interface RichTextWrapperProps {
  content: RichTextContent;
}

export function RichTextWrapper({ content }: RichTextWrapperProps) {
  return (
    <div className="prose prose-lg 
      [&_table]:min-w-full 
      [&_table]:border-collapse 
      [&_table]:border 
      [&_table]:border-black 
      [&_table]:border-[1px] 
      [&_table]:table-auto 
      [&_th]:p-2 
      [&_th]:text-left 
      [&_th]:border 
      [&_th]:border-black 
      [&_th]:border-[1px] 
      [&_td]:p-2 
      [&_td]:border 
      [&_td]:border-black 
      [&_td]:border-[1px] 
      [&_td]:whitespace-normal 
      [&_td]:break-words 
      [&_ul]:list-disc 
      [&_ul]:pl-5 
      [&_li]:marker:text-black">
      <RichText content={content} />
    </div>
  );
}
