import * as React from "react"
import PropTypes from 'prop-types';
import { graphql } from "gatsby"

import Bio from "components/Bio"
import Layout from "components/Layout"
import Seo from "components/Seo"
import Pagination from 'components/Pagination';
import PostEntry from 'components/PostEntry';

import { useLang } from 'context/LanguageContext';

const BlogIndex = ({ pageContext, data, location }) => {
  const { currentPage, numPages } = pageContext;
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.nodes

  const { lang } = useLang();

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none`, margin: 0 }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <PostEntry
                lang={lang}
                key={post.fields.slug}
                slug={post.fields.slug}
                date={post.frontmatter.date}
                timeToRead={post.fields.readingTime.minutes}
                title={title}
                excerpt={post.frontmatter.description || post.excerpt}
              />              
            </li>
          )
        })}
      </ol>
      {numPages > 1 &&
        <Pagination currentPage={currentPage} totalPageNumber={numPages} />
      }
    </Layout>
  )
}

BlogIndex.propTypes = {
  pageContext: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

BlogIndex.defaultProps = {};

export default BlogIndex

export const pageQuery = graphql`
  query($langKey: String!, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey }, draft: { eq: false } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt
        fields {
          slug
          langKey
          readingTime {
            minutes
          }          
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
