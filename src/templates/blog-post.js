import * as React from "react"
import PropTypes from 'prop-types'
import { Link, graphql } from "gatsby"

import Bio from "components/Bio"
import Layout from "components/Layout"
import Seo from "components/Seo"
import TagList from 'components/TagList'
import TranslationsLink from 'components/TranslationsLink'
import Toc from 'components/Toc';

import { useLang } from 'context/LanguageContext'

const BlogPost = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next, translationsLink } = pageContext

  const { lang, homeLink } = useLang()

  let tags;
  if (post.frontmatter.tags) {
    tags = <TagList tags={post.frontmatter.tags} baseUrl={`${homeLink}tags`} />
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>
            <span className="published-date">{post.frontmatter.date}</span> • <span className="reading-time">{post.fields.readingTime.text}</span> • {tags}
          </p>
          <TranslationsLink
            translationsLink={translationsLink}
            langKey={lang}
            style={{ margin: '-0.5rem 0 1.5rem' }}
          />
        </header>
        {post.frontmatter.toc && !!post.tableOfContents && <Toc headings={post.tableOfContents} />}
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        lang
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      tableOfContents
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        toc
      }
      fields {
        readingTime {
          text
        }
        langKey
      }
    }
  }
`;
