import { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
  // Definir os tipos de estados
  const [password, setPassword] = useState<string>(''); // Tipo string
  const [length, setLength] = useState<number>(12); // Tipo number
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true); // Tipo boolean
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true); // Tipo boolean
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true); // Tipo boolean
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false); // Tipo boolean
  const [copied, setCopied] = useState<boolean>(false); // Tipo boolean

  // Função de geração de senha
  const generatePassword = (): void => {
    const uppercase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase: string = 'abcdefghijklmnopqrstuvwxyz';
    const numbers: string = '0123456789';
    const symbols: string = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    let characters: string = '';
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (characters.length === 0) {
      setPassword('Selecione pelo menos uma opção!');
      return;
    }

    let generated: string = '';
    for (let i = 0; i < length; i++) {
      const index: number = Math.floor(Math.random() * characters.length);
      generated += characters[index];
    }
    setPassword(generated);
  };

  // Função para copiar a senha
  const copyToClipboard = async (): Promise<void> => {
    if (!password || password === 'Selecione pelo menos uma opção!') return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Oculta após 2 segundos
    } catch (err) {
      console.error('Erro ao copiar senha:', err);
    }
  };

  return (
    <div className="container">
      <h1>Gerador de Senhas</h1>

      <div className="controls">
        <label>
          Tamanho da senha:
          <input
            type="number"
            value={length}
            min={4}
            max={50}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Incluir letras maiúsculas
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          Incluir letras minúsculas
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Incluir números
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Incluir símbolos
        </label>

        <button onClick={generatePassword}>Gerar senha</button>
      </div>

      {password && (
        <div className="password-output">
          <strong>Senha:</strong> {password}
          <button onClick={copyToClipboard} className="copy-button">
            Copiar
          </button>
          {copied && <span className="copy-msg">Senha copiada!</span>}
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
