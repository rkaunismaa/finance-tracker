import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(function Select(
  {
    label,
    error,
    helperText,
    className = '',
    options = [],
    placeholder = 'Select an option',
    ...props
  },
  ref
) {
  const hasError = !!error;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`
            block w-full appearance-none rounded-lg border bg-white px-3 py-2 pr-10 text-gray-900
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${
              hasError
                ? 'border-expense focus:border-expense focus:ring-expense/20'
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20'
            }
          `}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
      {(error || helperText) && (
        <p
          className={`mt-1.5 text-sm ${
            hasError ? 'text-expense' : 'text-gray-500'
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

export default Select;
