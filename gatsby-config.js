const { toPairs } = require('ramda');
const {
  lang = 'en',
} = require('./config').site;
const supportedLanguages = require('./config').supportedLanguages;

const createRSSItem = (site, edge) => {
  return Object.assign({}, edge.node.frontmatter, {
    description: edge.node.excerpt,
    date: edge.node.frontmatter.date,
    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
    custom_elements: [{ "content:encoded": edge.node.html }],
  })
}

module.exports = {
  siteMetadata: {
    title: `gatsby-minimal-simple-blog`,
    author: {
      name: `An Tran`,
      summary: `Minimal simple starter for blog`,
    },
    description: `A minimally simple starter package to build a static blogging site`,
    siteUrl: `https://github.com/antranapp/gatsby-minimal-simple-blog`,
    social: {
      twitter: `AnTranApp`,
    },
    lang,
    langsEntries: toPairs(supportedLanguages),
  },
  plugins: [
    `gatsby-plugin-feed`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `autolink-heading`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return createRSSItem(site, edge)
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "RSS Feed"
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Minimal Blog`,
        short_name: `Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-i18n`,
      options: {
        langKeyDefault: lang,
        useLangKeyLayout: false,
        pagesPaths: [`/content/blog/`],
      },
    },
    {
      resolve: `gatsby-remark-responsive-iframe`,
      options: {
        wrapperStyle: `margin-bottom: 1.0725rem`
      }
    },
    `gatsby-plugin-draft`, // local plugins
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `antran.app`,
      },
    },
  ],
}
