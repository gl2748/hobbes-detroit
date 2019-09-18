import { DynamicGradientSvgText } from "@components/DynamicGradientSvgText";
import React from "react";
import { HobLink as Link, IHobLinkProps } from "../components/HobLink";

export const MemoizedLink = React.memo(
  ({
    label,
    href = "",
    height,
    offset,
    color
  }: IHobLinkProps & {
    label: string;
    height: number;
    offset: number;
    color?: string;
  }) => (
    <Link
      className={`nav__item nav__item--${label}`}
      color={color}
      href={href}
      unsetTypography={true}
    >
      <DynamicGradientSvgText
        height={height}
        offset={offset}
        from={
          color === "primary"
            ? "var(--hob-color--dark)"
            : "var(--hob-color--light)"
        }
        to={
          color === "primary"
            ? "var(--hob-color--light)"
            : "var(--hob-color--dark)"
        }
      >
        {label}
      </DynamicGradientSvgText>
    </Link>
  ),
  (a, b) => a.offset === b.offset
);
