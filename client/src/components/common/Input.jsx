import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    className = '',
    type = 'text',
    prefix,
    suffix,
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
        {prefix && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          className={`
            block w-full rounded-lg border bg-white px-3 py-2 text-gray-900
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${prefix ? 'pl-10' : ''}
            ${suffix ? 'pr-10' : ''}
            ${
              hasError
                ? 'border-expense focus:border-expense focus:ring-expense/20'
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20'
            }
          `}
          {...props}
        />
        {suffix && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 pointer-events-none">
            {suffix}
          </span>
        )}
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

export default Input;
