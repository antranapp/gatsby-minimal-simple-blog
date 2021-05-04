const path = require(`path`)
const R = require('ramda');

const { createFilePath } = require(`gatsby-source-filesystem`)
const readingTime = require("reading-time");
const { getPreviousNextNode, kebabCase } = require('./src/utils/helpers');
const getBaseUrl = require('./src/utils/getBaseUrl')

const {
  site: { lang: defaultLang = 'en', displayTranslations, postsPerPage },
  supportedLanguages
} = require('./config');

// group by language
const byLangKey = R.groupBy(R.path(['node', 'fields', 'langKey']))
// group by directoryName
const byDirectoryName = R.groupBy(R.path(['node', 'fields', 'directoryName']))

const translationsByDirectory = (posts) => {
  const gpDirPosts = byDirectoryName(posts);

  const dirNames = R.keys(gpDirPosts);

  const otherLangs = R.compose(
    R.map(R.map(R.path(['node', 'fields', 'langKey']))),
    R.values,
  )(gpDirPosts);

  return R.zipObj(dirNames, otherLangs);
};

/**
 * @param {*func} createPage
 */
function PageMaker(createPage) {
  const blogIndex = path.resolve(`./src/templates/blog-index.js`)
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagsIndex = path.resolve('./src/templates/tags-index.js');
  const tagPosts = path.resolve('./src/templates/tag-posts.js');

  return {
    createBlogIndex(postsGroupByLang) {
      const langKey = `en`
      // Create index pages for all supported languages
      Object.keys(postsGroupByLang).forEach((langKey) => {
        const baseUrl = getBaseUrl(defaultLang, langKey)
        const numPages = Math.ceil(postsGroupByLang[langKey].length / postsPerPage)

        Array.from({ length: numPages }).forEach((_, ind) => {
          const from = ind * postsPerPage + 1
          const to = Math.min((ind + 1) * postsPerPage, postsGroupByLang[langKey].length)

          if (ind === 0) {
            // add extra page for page 1
            createPage({
              path: baseUrl,
              component: blogIndex,
              context: {
                from,
                to,
                currentPage: ind + 1,
                numPages,
                limit: postsPerPage,
                skip: ind * postsPerPage,
                langKey,
                baseUrl,
              },
            });
          }

          createPage({
            path: `${baseUrl}${ind + 1}`,
            component: blogIndex,
            context: {
              from,
              to,
              currentPage: ind + 1,
              numPages,
              limit: postsPerPage,
              skip: ind * postsPerPage,
              langKey,
              baseUrl,
            },
          });
        });
      });
    },

    createBlogPost(posts) {
      const translationsInfo = displayTranslations ? translationsByDirectory(posts) : [];

      posts.forEach((post, index) => {
        // Find previous and next posts in same language
        const postLangKey = post.node.fields.langKey;
        const postsInSameLang = posts.filter(({ node }) => postLangKey === node.fields.langKey);
        const indexInSameLang = postsInSameLang.findIndex(
          (p) => p.node.fields.slug === post.node.fields.slug,
        );
        const { previous, next } = getPreviousNextNode(postsInSameLang, indexInSameLang);
  
        // translations
        let translationsLink = [];
        if (displayTranslations && R.path(['node', 'fields', 'directoryName'], post)) {
          const dirName = post.node.fields.directoryName;
          const translations = R.without([postLangKey], translationsInfo[dirName]);

          translationsLink = translations.map((trans) => ({
            name: supportedLanguages[trans],
            url: `/${trans}/${dirName}/`.replace(`/${defaultLang}`, ''),
          }));
        }

        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
            translationsLink
          },
        })
      })
    },

    createTagIndex(postsGroupByLang) {
      Object.keys(postsGroupByLang).forEach((langKey) => {
        createPage({
          path: `${getBaseUrl(defaultLang, langKey)}tags/`,
          component: tagsIndex,
          context: {
            langKey,
          },
        });
      });
    },

    createTagPosts(postsGroupByLang) {
      Object.keys(postsGroupByLang).forEach((langKey) => {
        // Tag pages:
        let tags = [];
        postsGroupByLang[langKey].forEach((post) => {
          if (R.path(['node', 'frontmatter', 'tags'], post)) {
            tags = tags.concat(post.node.frontmatter.tags);
          }
        });
        // Eliminate duplicate tags
        tags = R.uniq(tags);

        // Make tag pages
        tags.forEach((tag) => {
          createPage({
            path: `${getBaseUrl(defaultLang, langKey)}tags/${kebabCase(tag)}/`,
            component: tagPosts,
            context: {
              tag,
              langKey,
            },
          });
        });
      });
    },

  }
}
  
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const pageMaker = PageMaker(createPage)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
                langKey
                directoryName
              }
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                tags
              }
            }  
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.edges
  const gpLangPosts = byLangKey(posts);

  pageMaker.createBlogIndex(gpLangPosts);

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL
  if (posts.length > 0) {
    pageMaker.createBlogPost(posts)
  }

  pageMaker.createTagIndex(gpLangPosts);
  pageMaker.createTagPosts(gpLangPosts);

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    // https://github.com/gaearon/overreacted.io/issues/71
    if (node.internal.fieldOwners.slug !== 'gatsby-plugin-i18n') {
      createNodeField({
        name: `slug`,
        node,
        value,
      });  
    }

    createNodeField({
      node,
      name: `readingTime`,
      value: readingTime(node.rawMarkdownBody, { wordsPerMinute: 160 }),
    });

    // Getting the relative path of the node's directory
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    
    createNodeField({
      node,
      name: 'directoryName',
      value: parsedFilePath.dir,
    });

  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      toc: Boolean
      category: String
    }

    type Fields {
      slug: String
    }
  `)
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}