var proxy = require("http-proxy-middleware");

module.exports = {
  siteMetadata: {
    title: "Hobbes",
    description: "Hobbes Detroit, design"
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    "gatsby-remark-relative-images",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images"
      }
    },
    {
      resolve: "gatsby-transformer-remark"
    },

    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: `https://hobbes.netlify.com/` // required!
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`, // https://www.gatsbyjs.org/tutorial/authentication-tutorial/#creating-client-only-routes
      options: { prefixes: [`/protected/*`] } // See gatsby-node.js where project posts with the protectedProject flag are put on the /protectedProject/ route
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    {
      resolve: `gatsby-transformer-uploadcare`,
      options: {
        publicKey: '7b969f8af066608712d4',
        name: 'meta',
        url: 'https://upload.uploadcare.com/info/',
        path: `${__dirname}/src/data/uploadcare`,
        verboseOutput: true,
        skipCreateNode: false,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ["/main.css"] // applies purging only on the bulma css file
      }
    }, // must be after other CSS plugins
    "gatsby-plugin-netlify" // make sure to keep it last in the array, for plugin settings see netlify.toml
  ],
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": ""
        }
      })
    );
  }
};
