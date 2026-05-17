import React from 'react';

interface CurrencyInputProps {
  id: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  helperText?: string;
  suffix?: string;
  maxValue?: number;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  id,
  value,
  onChange,
  placeholder = 'e.g., 45,000',
  helperText,
  suffix = '/month',
  maxValue,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters for value storage
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    onChange(rawValue);
  };

  // Format value with commas for display
  const displayValue = value ? Number(value).toLocaleString('en-IN') : '';
  const numValue = Number(value);
  const isExceeded = maxValue !== undefined && numValue > maxValue;

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <span className={`absolute left-4 font-medium text-lg ${isExceeded ? 'text-red-500' : 'text-gray-500'}`}>₹</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-16 py-4 text-xl font-medium bg-white border rounded-xl focus:ring-2 transition-all outline-none shadow-sm ${
            isExceeded 
              ? 'border-red-400 text-red-900 focus:ring-red-500 focus:border-red-500 bg-red-50' 
              : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
          }`}
        />
        {suffix && (
          <span className={`absolute right-4 font-medium text-sm px-1 ${isExceeded ? 'bg-red-50 text-red-400' : 'bg-white text-gray-400'}`}>
            {suffix}
          </span>
        )}
      </div>
      {isExceeded && (
        <p className="mt-2 text-sm text-red-600 font-medium">
          Value cannot exceed ₹{maxValue.toLocaleString('en-IN')}{suffix}.
        </p>
      )}
      {helperText && !isExceeded && (
        <p className="mt-3 text-sm text-gray-500 leading-relaxed">{helperText}</p>
      )}
    </div>
  );
};
