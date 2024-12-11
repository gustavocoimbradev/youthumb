
type Props = {
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  value?: string,
  className?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ placeholder, type, disabled, value, onChange, className }: Props) {
  const placeholderValue = placeholder ?? '';
  const typeValue = type ?? 'text';
  const disabledValue = disabled ?? false;

  return (
    <input
      value={value} 
      onChange={onChange} 
      disabled={disabledValue}
      type={typeValue}
      placeholder={placeholderValue}
      className={`p-4 w-full border-none outline-none bg-slate-700 text-slate-300 ${className}`}
    />
  );

}


