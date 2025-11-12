import React, { type ReactNode } from "react";

type cardProps = {
  widthCard?: string;
  marginTopCard?: string;
  children: ReactNode;
};

const Card = ({
  widthCard = "70%",
  marginTopCard = "0.200rem",
  children,
}: cardProps) => {
  const cardStyle: React.CSSProperties = {
    width: widthCard,
    maxWidth: "100%",
    minHeight: "30%",
    backgroundColor: "#fff",
    borderRadius: "0.5rem",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
    padding: "1.25rem 1.5rem",
    marginBottom: "1rem",
    marginTop: marginTopCard,
    animation: "fadeInDown 0.3s ease",
  };

  return <div style={cardStyle}>{children}</div>;
};

export default Card;
