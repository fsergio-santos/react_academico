import type { ReactNode } from "react";
import { memo, useId } from "react";
// 1. Importamos o Link e o LinkProps do react-router-dom
import { Link, type LinkProps } from "react-router-dom";

type ButtonLinkProps = LinkProps & {
  variant?: string;
  icon?: ReactNode;
};

/**
 * 3. A estrutura do componente é quase idêntica ao 'Button',
 * mas renderiza <Link> em vez de <button>.
 */
const ButtonLink = memo(
  ({
    variant = "primary",
    icon,
    children,
    className,
    id: idProp,
    ...rest // '...rest' inclui 'to', 'title', 'state', etc.
  }: ButtonLinkProps) => {
    // Geramos um ID automático para acessibilidade
    const reactId = useId();
    const id = idProp ?? `btn-link-${reactId}`;

    // Mesclamos as classes de forma segura
    const linkClass = `btn btn-${variant} ${className || ""}`.trim();

    return (
      <Link id={id} className={linkClass} {...rest}>
        {icon && (
          <span className="btn-icon">
            <i>{icon}</i>
          </span>
        )}
        {children && <span className="btn-label">{children}</span>}
      </Link>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
export default ButtonLink;
