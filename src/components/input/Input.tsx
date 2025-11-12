import { memo, useCallback, useId, useMemo, useState } from "react";
// Importações de tipo separadas para 'verbatimModuleSyntax'
import type { ComponentPropsWithoutRef, ElementType, FocusEvent } from "react";

// --- Tipos Base ---

// Props que o nosso componente define especificamente
type CustomInputProps = {
  id?: string;
  name?: string;
  Icon?: ElementType; // Ícone para o input group
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
};

// Props de Validação
type ValidationProps = {
  error?: boolean; // Força o estado de erro
  errorMessages?: string[]; // Lista de mensagens de erro
  touched?: boolean; // Controla o estado "touched" externamente
  onTouchedChange?: (touched: boolean) => void; // Callback para notificar a mudança de "touched"
};

// --- Tipo Principal do Componente ---

// Combinamos nossas props customizadas, as de validação e as props nativas do <input>
type InputProps = CustomInputProps &
  ValidationProps &
  // Omitimos 'id' e 'name' das props nativas, pois já as definimos
  // em CustomInputProps para melhor controle.
  Omit<
    ComponentPropsWithoutRef<"input">,
    "id" | "name" | "readOnly" | "disabled"
  >;

/**
 * Componente Input genérico e acessível.
 *
 * Combina um <input> HTML com rótulo (label), ícone opcional (Icon)
 * e gerenciamento de estado de validação (error, errorMessages, touched).
 *
 * Ele gerencia o estado 'touched' internamente, mas também pode ser
 * controlado externamente através das props 'touched' e 'onTouchedChange'.
 *
 * Repassa todas as props nativas do <input> (como 'type', 'placeholder', 'autoComplete', etc.)
 * diretamente para o elemento <input>, exceto as que são gerenciadas pelo componente.
 */
const Input = memo(
  ({
    // Props do Componente
    id,
    name,
    label,
    Icon,
    type = "text", // Valor padrão para 'type'
    required = false, // Valor padrão para 'required'
    readOnly = false,
    disabled = false,
    autoComplete = "off",
    error,
    errorMessages = [],
    touched: touchedProp, // Renomeado para evitar conflito
    onTouchedChange,

    // Props Nativas do Input (repassadas via ...rest)
    className, // Extraímos 'className' para poder concatenar
    onBlur, // Extraímos 'onBlur' para encapsular
    ...rest // Todas as outras props (value, onChange, placeholder, readOnly, disabled, etc.)
  }: InputProps) => {
    // <-- Removemos o genérico daqui

    // --- IDs para Acessibilidade ---
    const reactId = useId();
    const inputId = id ?? `input-${reactId}`;
    const errorId = `${inputId}-errors`;

    // --- Gerenciamento do Estado 'Touched' ---
    // O componente pode controlar 'touched' internamente (uncontrolled)
    // ou ser controlado por um pai (controlled)
    const [touchedState, setTouchedState] = useState(false);

    // Damos preferência para a prop (controlled)
    const isTouched = touchedProp ?? touchedState;

    // --- Derivação de Estado ---
    // Um input tem erro se:
    // 1. A prop 'error' for explicitamente true
    // 2. Ou (Tem mensagens de erro E está "touched")
    const hasErrors = useMemo(() => {
      if (error === true) return true; // Erro forçado
      if (error === false) return false; // Validação forçada (is-valid)
      return errorMessages.length > 0 && isTouched; // Comportamento padrão
    }, [error, errorMessages.length, isTouched]);

    const isValid = useMemo(() => {
      // Válido se: 'error' for false E está "touched"
      return error === false && isTouched;
    }, [error, isTouched]);

    const showErrors = hasErrors && errorMessages.length > 0;

    // --- Handlers ---
    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        // Se não for 'readOnly' ou 'disabled'
        if (!readOnly && !disabled) {
          // 1. Chama o onBlur original (se existir)
          onBlur?.(e);

          // 2. Atualiza o estado 'touched' interno (uncontrolled)
          if (touchedProp === undefined) {
            setTouchedState(true);
          }

          // 3. Notifica o pai sobre a mudança (para controlled)
          onTouchedChange?.(true);
        }
      },
      [readOnly, disabled, onBlur, touchedProp, onTouchedChange]
    );

    // --- Classes CSS ---
    const inputClass = useMemo(() => {
      return [
        "form-control",
        "app-input", // Sua classe customizada
        hasErrors ? "is-invalid" : "",
        isValid ? "is-valid" : "",
        className, // Classes passadas por prop
      ]
        .filter(Boolean) // Remove classes vazias
        .join(" ");
    }, [hasErrors, isValid, className]);

    // --- Renderização ---
    return (
      <>
        {/* === Rótulo (Label) === */}
        {label && (
          <div className="mb-2">
            <label htmlFor={inputId} className="app-label">
              {label}
              {required && <span aria-hidden="true"> *</span>}
            </label>
          </div>
        )}

        {/* === Grupo de Input (com Ícone) === */}
        <div className="input-group">
          {Icon && (
            <div className="input-group-prepend" aria-hidden="true">
              <span className="input-group-text">
                <Icon size={20} />
              </span>
            </div>
          )}

          {/* === O Input === */}
          <input
            id={inputId}
            name={name} // Usamos o 'name' passado ou undefined
            type={type} // Passamos o 'type' com valor padrão
            required={required} // Passamos o 'required' com valor padrão
            className={inputClass}
            onBlur={handleBlur}
            // Repassa todas as outras props (value, onChange, placeholder, disabled, etc.)
            {...rest}
            // Atributos de Acessibilidade
            aria-invalid={hasErrors || undefined} // 'true' se hasErrors, senão undefined
            aria-describedby={showErrors ? errorId : undefined}
          />
        </div>

        {/* === Mensagens de Erro === */}
        
        <ul
          id={errorId}
          className={`invalid-feedback d-block error-container ${
            showErrors ? "has-error" : ""
          }`}
          role="alert"
        >
        {showErrors
          ? errorMessages.map((msg, idx) => <li key={idx}>{msg}</li>)
          : <li>&nbsp;</li> /* espaço reservado */}
      </ul>
      </>
    );
  }
);

export default Input;
