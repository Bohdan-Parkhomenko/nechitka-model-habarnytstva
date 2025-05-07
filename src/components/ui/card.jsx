import './card.css';

export function Card({ children }) {
    return <div className="custom-card">{children}</div>;
}

export function CardContent({ children }) {
    return <div className="custom-card-content">{children}</div>;
}
