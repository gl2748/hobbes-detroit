import styled from "@emotion/styled";
import React from "react";
import breakpoints from "../../breakpoints";
import { HobLetters } from "../HobLetters";
import { HobLink } from "../HobLink";
import { HobTypography } from "../HobTypography";

export interface IStudioProps {
  description: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  social: Array<{ title: string; url: string }>;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

const Container = styled.div`
  min-height: calc(100vh - 7.9375rem);
  background-color: var(--hob-color--secondary);
  position: relative;
  padding: 1.5rem 1.25rem;
  z-index: 2;
`;

const Description = styled(HobTypography)`
  flex: 1;
  min-width: 480px;
  margin-right: 2.5rem;
  margin-bottom: 1.25rem;

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
    &--body1,
    &--link {
      font-size: 1.75rem;
      ${breakpoints.mobile} {
        font-size: 1.125rem;
      }
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

const Fields = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  ${breakpoints.mobile} {
    flex-wrap: wrap;
  }
`;

const Field = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;

  .hob-link {
    margin-bottom: 3rem;
  }

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

const Address = styled.div`
  flex: 1;
  display: flex;
  margin-right: 1.25rem;
  min-width: 300px;
`;

const Contact = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Letters = styled.div`
  width: 100%;
  margin-bottom: 4.4375rem;
`;

export const Studio: React.FC<
  IStudioProps & React.HTMLProps<HTMLDivElement>
> = ({ title, description, address, phone, email, forwardedRef, social }) => {
  const [, line1, line2] = address.match(/^(.*)\s(.*,.*)/) || [];
  return (
    <Container id="studio" ref={forwardedRef}>
      <Inner>
        <Letters>
          <HobLetters size="lg" color="var(--hob-color--dark)" />
        </Letters>

        <Description variant="body1">{description}</Description>

        <Fields>
          <Address>
            <Field>
              <HobTypography variant="caption">Address</HobTypography>
              <HobTypography variant="body1">
                {line1}
                <br />
                {line2}
              </HobTypography>
            </Field>
          </Address>

          <Contact>
            <Field>
              <HobTypography variant="caption">Tel</HobTypography>
              <HobTypography variant="body1">{phone}</HobTypography>
            </Field>

            <Field>
              <HobTypography variant="caption">Email</HobTypography>
              <HobLink color="primary" href={`mailto:${email}`} target="_blank">
                {email}
              </HobLink>
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
        </Fields>
      </Inner>
    </Container>
  );
};
