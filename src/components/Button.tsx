type Props = {
  children: React.ReactNode;
  variant: string;
  grow?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ children, variant, grow, onClick }: Props) {

  const variantClasses = {
    'red': 'bg-red-600 hover:bg-red-700 text-white',
    'blue': 'bg-blue-600 hover:bg-blue-700 text-white',
    'green': 'bg-green-600 hover:bg-green-700 text-white',
    'slate': 'bg-slate-900  text-slate-300',
    'light': 'bg-slate-800  text-slate-300',
  }[variant] || 'bg-gray-600 hover:bg-gray-700 text-white';

  const growClass = typeof grow === 'undefined' ? '' : 'flex-grow';

  return (
    <button onClick={onClick} className={`${variantClasses} ${growClass} font-medium transition-all py-4 px-4 text-nowrap`}>
      {children}
    </button>
  );
}
