import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";
import breakpoints from "../../breakpoints";
import { HobLink } from "../HobLink";
import { HobTypography } from "../HobTypography";

export interface IStudioProps {
  description: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  social: Array<{ title: string; url: string }>;
}

const Container = styled.div`
  min-height: 100vh;
  background-color: var(--hob-color--secondary);
  position: relative;
  padding: 1.5rem 1.25rem;
  z-index: 2;
`;

const Description = styled(HobTypography)`
  flex: 2;
  margin-right: 1rem;

  ${breakpoints.mobile} {
    flex: unset;
    margin-right: 0;
    margin-bottom: 3rem;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  .hob-typography {
    &--h1 {
      width: 100%;
      margin-bottom: 4.4375rem;
    }
    &--body1,
    &--link {
      font-size: 1.75rem;
    }

    &--caption {
      font-size: 1.125rem;
    }
  }
  .hob-link {
    text-decoration: none;
  }

  ${breakpoints.mobile} {
    & > * {
      width: 100%;
      margin-right: 0;
    }
  }
`;

const Field = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;

  .hob-typography {
    width: 100%;

    &--caption {
      margin-bottom: 2rem;
      ${breakpoints.mobile} {
        margin-bottom: 0;
      }
    }

    &--body1 {
      margin-bottom: 3rem;
    }
  }
`;

const Contact = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Studio: React.FC<IStudioProps> = ({
  title,
  description,
  address,
  phone,
  email,
  social
}: IStudioProps) => {
  return (
    <Container>
      <Inner>
        <HobTypography variant="h1">{title}</HobTypography>

        <Description variant="body1">{description}</Description>

        <Field>
          <HobTypography variant="caption">Address</HobTypography>
          <HobTypography variant="body1">{address}</HobTypography>
        </Field>

        <Contact>
          <Field>
            <HobTypography variant="caption">Tel</HobTypography>
            <HobTypography variant="body1">{phone}</HobTypography>
          </Field>

          <Field>
            <HobTypography variant="caption">Email</HobTypography>
            <HobTypography variant="body1">{email}</HobTypography>
          </Field>

          <Field>
            <HobTypography variant="caption">Follow us</HobTypography>
            {social.map(({ title: label, url }) => (
              <div key={title}>
                <HobLink color="primary" href={url}>
                  {label}
                </HobLink>
              </div>
            ))}
          </Field>
        </Contact>
      </Inner>
    </Container>
  );
};
