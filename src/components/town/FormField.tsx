
interface FormFieldProps {
  label: string;
  value: any;
}

export function FormField({ label, value }: FormFieldProps) {  
  // Check if the value is a URL
  const isUrl = typeof value === 'string' && 
    (value.startsWith('http://') || value.startsWith('https://'));
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200 min-h-[36px]">
        {isUrl ? (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            {value}
          </a>
        ) : (
          value || "N/A"
        )}
      </div>
    </div>
  );
}
