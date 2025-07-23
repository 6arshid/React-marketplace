import TextInput from './TextInput';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
    return (
        <div className="max-w-xs">
            <TextInput
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full"
                placeholder={placeholder}
            />
        </div>
    );
}
