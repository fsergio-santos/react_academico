import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { memo, useId } from "react";

/**
 * Usamos 'ComponentPropsWithoutRef' para herdar todas as props
 * nativas de um <button> (como 'type', 'onClick', 'disabled', 'title', 'id', etc.)
 *
 */
type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  icon?: ReactNode;
};

/**
 * Usamos React.memo para otimização.
 * impede re-renderizações desnecessárias se as props não mudarem.
 */
const Button = memo(
  ({
    icon,
    children, // 'children' => 'label'
    className, // props para o estilo - css
    id: idProp,
    ...rest // '...rest' contém TODAS as outras props do botão
  }: ButtonProps) => {
    const reactId = useId();

    const id = idProp ?? `btn-${reactId}`;
    const buttonClass = `${className || ""}`.trim();

    return (
      <button id={id} className={buttonClass} {...rest}>
        {icon && (
          <span className="btn-icon">
            <i>{icon}</i>
          </span>
        )}
        {children && <span className="btn-label">{children}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
