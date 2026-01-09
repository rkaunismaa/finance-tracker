const variants = {
  default: 'bg-gray-100 text-gray-700',
  primary: 'bg-primary-100 text-primary-700',
  success: 'bg-income-light text-income-dark',
  danger: 'bg-expense-light text-expense-dark',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-blue-100 text-blue-700',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  dot = false,
  dotColor,
}) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full mr-1.5"
          style={{ backgroundColor: dotColor || 'currentColor' }}
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
