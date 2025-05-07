import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function BribeModel() {
    const [inputs, setInputs] = useState({
        bribeAmount: 0,
        salary: 6500,
        reason: 0,
        integrity: 1,
        corruption: 0,
        prestige: 0,
    });

    const [result, setResult] = useState(null);
    const [fuzzyInfo, setFuzzyInfo] = useState('');
    const [ruleUsed, setRuleUsed] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: parseFloat(value) });
    };

    const handleCalculate = () => {
        const { bribeAmount, salary, reason, integrity, corruption, prestige } = inputs;

        let possibility = 0;
        let rule = '';

        if (bribeAmount > 20000 && salary < 20000 && integrity < 0.5 && reason > 0.5) {
            possibility = 0.9;
            rule = 'Високий хабар + низька зарплата + низька принциповість + сильна причина';
        } else if (corruption > 0.6 && reason > 0.5) {
            possibility = 0.7;
            rule = 'Висока корумпованість + сильна причина';
        } else if (integrity > 0.8 && prestige > 0.6) {
            possibility = 0.2;
            rule = 'Висока принциповість + престижна посада';
        } else {
            possibility = 0.5;
            rule = 'Середнє по всьому';
        }

        setResult(possibility);
        setFuzzyInfo(`Фаззіфікація: хабар: ${bribeAmount}, зарплата: ${salary}, причина: ${reason}, принциповість: ${integrity}, корумпованість: ${corruption}, престижність: ${prestige}`);
        setRuleUsed(rule);
    };

    return (
        <div className="container">
            <Card>
                <CardContent>
                    <h2 className="title">Нечітка модель хабарництва</h2>
                    <div className="input-group">
                        <Input type="number" name="bribeAmount" placeholder="Розмір хабаря (0-50000)" onChange={handleChange} />
                        <Input type="number" name="salary" placeholder="Зарплата (6500-60000)" onChange={handleChange} />
                        <Input type="number" name="reason" step="0.1" min="0" max="1" placeholder="Причина (0-1)" onChange={handleChange} />
                        <Input type="number" name="integrity" step="0.1" min="0" max="1" placeholder="Принциповість (0-1)" onChange={handleChange} />
                        <Input type="number" name="corruption" step="0.1" min="0" max="1" placeholder="Корумпованість (0-1)" onChange={handleChange} />
                        <Input type="number" name="prestige" step="0.1" min="0" max="1" placeholder="Престижність (0-1)" onChange={handleChange} />
                    </div>
                    <Button onClick={handleCalculate}>Обчислити</Button>
                    {result !== null && (
                        <div className="result-block">
                            <p><strong>Ймовірність взяти хабар:</strong> {(result * 100).toFixed(1)}%</p>
                            <p><strong>Фаззіфіковані значення:</strong> {fuzzyInfo}</p>
                            <p><strong>Найбільш релевантне правило:</strong> {ruleUsed}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
