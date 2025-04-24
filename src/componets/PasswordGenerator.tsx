import { useState } from 'react';
import './PasswordGenerator.css';

type Settings = {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
};

export default function PasswordGenerator() {
  const [settings, setSettings] = useState<Settings>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
  });

  const [password, setPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value),
    }));
  };

  const generatePassword = () => {
    let chars = '';
    const {
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    } = settings;

    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('Selecione pelo menos uma opção!');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);
  };

  return (
    <div className="generator-container">
      <h2>Gerador de Senhas</h2>

      <label>
        Tamanho:
        <input
          type="number"
          name="length"
          value={settings.length}
          min={4}
          max={30}
          onChange={handleChange}
        />
      </label>

      <label>
        <input
          type="checkbox"
          name="includeUppercase"
          checked={settings.includeUppercase}
          onChange={handleChange}
        />
        Incluir letras maiúsculas
      </label>

      <label>
        <input
          type="checkbox"
          name="includeLowercase"
          checked={settings.includeLowercase}
          onChange={handleChange}
        />
        Incluir letras minúsculas
      </label>

      <label>
        <input
          type="checkbox"
          name="includeNumbers"
          checked={settings.includeNumbers}
          onChange={handleChange}
        />
        Incluir números
      </label>

      <label>
        <input
          type="checkbox"
          name="includeSymbols"
          checked={settings.includeSymbols}
          onChange={handleChange}
        />
        Incluir símbolos
      </label>

      <button onClick={generatePassword}>Gerar senha</button>

      {password && (
        <div className="password-output">
          <strong>Senha:</strong> {password}
        </div>
      )}
    </div>
  );
}
