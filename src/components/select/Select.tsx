import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  FocusEvent,
} from "react";
import { Fragment, memo, useCallback, useId, useMemo, useState } from "react";

/**
 * Define a estrutura de um item da lista de opções
 */
export type OptionItem = {
  value: string | number;
  name: string; // O texto que o usuário vê
};

/**
 * Props customizadas para o componente Select
 */
type CustomSelectProps = {
  label: string;
  Icon?: ElementType;
  options: OptionItem[];
  placeholder?: string; // Texto para a primeira opção desabilitada
};

/**
 * Props de Validação
 * Segue o mesmo padrão do componente Input
 */
type ValidationProps = {
  error?: boolean;
  errorMessages?: string[];
  touched?: boolean; // Para controle externo do estado 'touched'
  onTouchedChange?: (touched: boolean) => void;
};

/**
 * Junta todas as props:
 * 1. Nativas do <select> (via Omit e ComponentPropsWithoutRef)
 * 2. Customizadas (label, options, Icon)
 * 3. Validação (errorMessages, touched)
 */
export type SelectProps = Omit<
  ComponentPropsWithoutRef<"select">,
  "readOnly" // 'readOnly' não é válido em <select>, usamos 'disabled'
> &
  CustomSelectProps &
  ValidationProps;

/**
 * Componente Select
 *
 * Um componente <select> reutilizável, estilizado e com
 * gerenciamento de validação embutido.
 */
export const Select = memo(
  ({
    // Props customizadas
    label,
    Icon,
    options,
    placeholder,
    // Props de Validação
    errorMessages = [],
    touched: touchedProp,
    onTouchedChange,
    // Props nativas do <select>
    id: idProp,
    className,
    onBlur: onBlurProp,
    onChange: onChangeProp,
    value,
    disabled,
    ...rest
  }: SelectProps) => {
    // --- IDs de Acessibilidade ---
    const reactId = useId();
    const id = idProp ?? `sel-${reactId}`;
    const describedById = `${id}-errors`;

    // --- Estado Interno de "Touched" ---
    // (Permite o componente ser controlado ou não controlado)
    const [touchedState, setTouchedState] = useState(false);
    const isTouched = touchedProp ?? touchedState;

    // --- Derivação de Estado para Validação ---
    const hasErrors = useMemo(
      () => errorMessages.length > 0 && isTouched,
      [errorMessages, isTouched]
    );

    // --- Handlers ---

    /**
     * Lida com o evento onBlur.
     * Atualiza o estado 'touched' (se não controlado) e propaga o evento.
     */
    const handleBlur = useCallback(
      (e: FocusEvent<HTMLSelectElement>) => {
        if (!disabled) {
          if (touchedProp === undefined) {
            setTouchedState(true);
          }
          onTouchedChange?.(true);
          onBlurProp?.(e);
        }
      },
      [disabled, touchedProp, onBlurProp, onTouchedChange]
    );

    /**
     * Lida com o evento onChange.
     * Apenas propaga o evento.
     */
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
        if (!disabled) {
          onChangeProp?.(e);
        }
      },
      [disabled, onChangeProp]
    );

    // --- Classes CSS ---
    const selectClassName = [
      "form-select",
      Icon ? "has-icon" : "",
      hasErrors ? "is-invalid" : "",
      !hasErrors && isTouched && value ? "is-valid" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const finalPlaceholder = placeholder ?? `Selecione ${label}...`;
    const showErrors = hasErrors && errorMessages.length > 0;

    // --- Renderização ---
    return (
      <Fragment>
        {/* 1. Label */}
        <div className="mb-2">
          <label htmlFor={id} className="app-label">
            {label}
            {rest.required && <span aria-hidden="true"> *</span>}
          </label>
        </div>

        {/* 2. Grupo do Select (com Ícone) */}
        <div className="input-group">
          {Icon && (
            <div className="input-group-prepend" aria-hidden="true">
              <span className="input-group-text">
                <Icon size={20} />
              </span>
            </div>
          )}

          {/* 3. O <select> */}
          <select
            id={id}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={selectClassName}
            aria-invalid={hasErrors || undefined}
            aria-describedby={showErrors ? describedById : undefined}
            {...rest} // Repassa 'name', 'required', 'autoComplete', etc.
          >
            {/* 4. Opção Placeholder */}
            <option value="" disabled={value !== ""}>
              {finalPlaceholder}
            </option>

            {/* 5. Lista de Opções */}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* 6. Mensagens de Erro */}
        {showErrors && (
          <ul
            id={describedById}
            className="invalid-feedback d-block"
            role="alert"
          >
            {errorMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        )}
      </Fragment>
    );
  }
);

Select.displayName = "Select"; // Para debugging no React DevTools
export default Select;
