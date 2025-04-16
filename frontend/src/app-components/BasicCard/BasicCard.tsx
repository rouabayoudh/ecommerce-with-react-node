import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";

import { cardStyles } from "./styles";

interface BasicCardProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}
const BasicCard: React.FC<BasicCardProps> = ({ children, header }) => {
  return (
    <Card sx={cardStyles.wrapper}>
      {header}
      <CardContent sx={cardStyles.cardContent}>{children}</CardContent>
    </Card>
  );
};

export default BasicCard;
