const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = ({ actions, graphql }) => {
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
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(edge => {
      const id = edge.node.id;
      let newPost = {};
      // Template key null Guard.
      if (String(edge.node.frontmatter.templateKey) === 'null') {
        console.log(
          'It looks like you have a markdown file with improperly formatted or absent front matter, in this case the template key field is missing, consider either hand-coding a markdown file with the correct front matter or else deploying your latest changes to the netlify branch and using the CMS to create a new page / piece of content. Note: once you have done that in the CMS you will need to pull down the changes.'
        );
        return;
      }
      // Project Posts
      if (String(edge.node.frontmatter.templateKey) === 'project-post') {
        // If this is a protected project...create a post at the /protected path.
        let p = `${edge.node.fields.slug}`;
        if (_.get(edge, `node.frontmatter.protectedProject`)) {
          p = `/protected${edge.node.fields.slug}`;
        }
        newPost = {
          path: p,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`
          ),
          // additional data can be passed via context.
          // Available via graphql pageQuery in component defined above.
          context: {
            id,
          },
        };
        createPage(newPost);
      }
      // Everything else
      if (String(edge.node.frontmatter.templateKey) !== 'project-post') {
        newPost = {
          path: edge.node.fields.slug,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`
          ),
          // additional data can be passed via context.
          // Available via graphql pageQuery in component defined above.
          context: {
            id,
          },
        };
        createPage(newPost);
      }
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.tsx`),
        context: {
          tag,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
