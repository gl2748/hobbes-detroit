import { CreatePagesArgs, GatsbyNode } from "gatsby";
import _ from "lodash";
import { resolve } from "path";

export interface IAllMarkdownRemarkQueryResult {
  allMarkdownRemark: {
    edges: [
      {
        node: {
          id: string;
          fields: {
            slug: string;
          };
          frontmatter: {
            tags?: string[];
            templateKey?: string;
            protectedPost?: boolean;
          };
        };
      }
    ];
  };
}

export const createPages: GatsbyNode["createPages"] = ({
  actions,
  graphql
}: CreatePagesArgs) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              protectedProject
            }
          }
        }
      }
    }
  `).then((result: { errors?: any; data?: {} | undefined }) => {
    if (result.errors) {
      result.errors.forEach((e: Error) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    if (result.data === undefined) {
      console.error("No data found for the createPages query.");
    }

    if (result.data) {
      const queryResult = result.data as IAllMarkdownRemarkQueryResult;
      const posts = queryResult.allMarkdownRemark.edges;

      const [projects, rest] = _.partition(
        posts,
        edge => edge.node.frontmatter.templateKey === "project-post"
      );

      projects.forEach((edge, index) => {
        const id = edge.node.id;

        // If this is a protectedProject project...create a post at the /protectedProject path.
        // See the gatsby-plugin-create-client-paths plugin in the gatsby config.
        let p = `${edge.node.fields.slug}`;
        if (_.get(edge, `node.frontmatter.protectedProject`)) {
          p = `/protected${edge.node.fields.slug}`;
        }
        const newPost = {
          component: resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`
          ),
          // Additional data can be passed via context and will be available via graphql pageQuery in component defined above.
          context: {
            id,
            nextId: projects[(index + 1) % projects.length].node.id,
            prevId:
              projects[index - 1 < 0 ? projects.length - 1 : index - 1].node.id
          },
          path: p,
          tags: edge.node.frontmatter.tags
        };
        createPage(newPost);
      });

      rest.forEach(edge => {
        const id = edge.node.id;
        // Template key null Guard.
        if (String(edge.node.frontmatter.templateKey) === "null") {
          console.log(
            "It looks like you have a markdown file with improperly formatted or absent front matter, in this case the template key field is missing, consider either hand-coding a markdown file with the correct front matter or else deploying your latest changes to the netlify branch and using the CMS to create a new page / piece of content. Note: once you have done that in the CMS you will need to pull down the changes."
          );
          return Promise.reject(result.errors);
        }

        // Everything else
        if (String(edge.node.frontmatter.templateKey) !== "project-post") {
          const newPost = {
            component: resolve(
              `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`
            ),
            context: {
              id
            },
            path: edge.node.fields.slug,
            tags: edge.node.frontmatter.tags
            // additional data can be passed via context.
            // Available via graphql pageQuery in component defined above.
          };
          createPage(newPost);
        }
      });

      // Tag pages:
      let tags: string[] = [];
      // Iterate through each post, putting all found tags into `tags`
      posts.forEach(edge => {
        if (_.get(edge, `node.frontmatter.tags`)) {
          tags = tags.concat(edge.node.frontmatter.tags as string[]);
        }
      });
      // Eliminate duplicate tags
      tags = _.uniq(tags);

      // Make tag pages
      tags.forEach(tag => {
        const tagPath = `/tags/${_.kebabCase(tag)}/`;

        createPage({
          component: resolve(`src/templates/tags.tsx`),
          context: {
            tag
          },
          path: tagPath
        });
      });
    }
    return new Promise((resolvePromise, reject) =>
      resolvePromise("Hobbes Pages Created!")
    );
  });
};
