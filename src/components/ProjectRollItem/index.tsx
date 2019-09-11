import styled from "@emotion/styled";
import axios from "axios";
import React, { HTMLProps, ReactElement, useEffect, useState } from "react";
import breakpoints from "../../breakpoints";
import { HobIcon } from "../HobIcon";
import { HobLink as Link } from "../HobLink";
import { HobLogo } from "../HobLogo";
import { HobTypography } from "../HobTypography";

export interface IProjectProps {
  title: string;
  id: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    featured: {};
    protectedProject: boolean;
    primaryColor: string;
    secondaryColor: string;
    featuredJson: string;
    date: string;
    title: string;
    indexSvg: string;
  };
}

const Container = styled.div`
  width: calc(50% - 0.625rem);
  margin-bottom: 2.5rem;

  &:nth-of-type(odd) {
    margin-right: 1.25rem;
  }

  :last-child {
    margin-bottom: 0;
  }

  ${breakpoints.mobile} {
    width: 100%;

    &:nth-of-type(odd) {
      margin-right: 0;
    }
  }
`;

const Graphic = styled.div`
  margin-bottom: 0.625rem;
  position: relative;
  width: 100%;
  &:hover,
  &:focus {
    filter: invert(1);
  }

  img {
    width: 100%;
  }

  .hob-icon--lock {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
`;

const colors = ["blue", "brown", "green", "pink", "purple", "yellow"];

const Image = ({ src, alt }: HTMLProps<HTMLImageElement>): ReactElement => (
  <img src={src} alt={alt} />
);

const StyledSvg = styled.div<{ fill: string }>`
  svg {
    fill: ${({ fill }) => fill};
  }
`;
const Svg = ({ svg, fill }: { svg: string; fill: string }): ReactElement => (
  <StyledSvg fill={fill} dangerouslySetInnerHTML={{ __html: svg }} />
);

const Error = ({ index }: { index: number }) => (
  <>
    <HobLogo fill={`var(--hob-color--${colors[index]})`} />
    <HobTypography variant="caption" className="project__error">
      Unable to load svg
    </HobTypography>
  </>
);

export const ProjectRollItem = ({
  post: {
    frontmatter: { indexSvg, primaryColor, featured, title, protectedProject },
    ...post
  },
  index
}: {
  post: IProjectProps;
  index: number;
}) => {
  const [Media, setMedia] = useState<{
    Component: null | React.FC<any>;
    props: { [key: string]: any };
  }>({ Component: null, props: {} });
  useEffect(() => {
    axios
      .get(indexSvg)
      .then(({ data, ...response }) => {
        const types: {
          [key: string]: {
            Component: React.FC<any>;
            makeProps: (o: object) => object;
          };
        } = {
          "image/png": {
            Component: Image,
            makeProps: d => ({
              alt: "Project image",
              src: indexSvg
            })
          },
          "image/svg+xml": {
            Component: Svg,
            makeProps: d => ({
              fill: primaryColor,
              svg: d
            })
          }
        };

        setMedia({
          Component: types[response.headers["content-type"]].Component,
          props: types[response.headers["content-type"]].makeProps(data)
        });
      })
      .catch(error => {
        setMedia({
          Component: Error,
          props: { index }
        });
      });
  }, [indexSvg]);

  const { Component } = Media;
  return (
    <Container className={`${featured ? "is-featured" : ""}`}>
      <Link
        color="secondary"
        to={
          protectedProject ? `/protected${post.fields.slug}` : post.fields.slug
        }
        unsetTypography={true}
      >
        <Graphic>
          {Component === null ? (
            <HobTypography variant="caption">Loading...</HobTypography>
          ) : (
            <Component {...Media.props} />
          )}
          {protectedProject && (
            <HobIcon name="lock" fill="none" color="secondary" size="sm" />
          )}
        </Graphic>
      </Link>

      <Link
        color="secondary"
        to={
          protectedProject ? `/protected${post.fields.slug}` : post.fields.slug
        }
      >
        {title}
      </Link>
    </Container>
  );
};
