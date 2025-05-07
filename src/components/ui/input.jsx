import './input.css';

export function Input({ type = "text", name, placeholder, onChange, step, min, max }) {
    return (
        <input
            className="custom-input"
            type={type}
            name={name}
            placeholder={placeholder}
            step={step}
            min={min}
            max={max}
            onChange={onChange}
        />
    );
}
