/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

// Components
import { graphql } from 'gatsby';

import Bio from "components/Bio"
import Layout from "components/Layout"
import Seo from 'components/Seo';
import PostEntry from 'components/PostEntry';

// Utilities
import { useLang } from 'context/LanguageContext';
import { formatMessage } from 'utils/i18n';

const TagPosts = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const siteTitle = data.site.siteMetadata.title;

  const { lang, homeLink } = useLang();

  const tagHeader = formatMessage('tfTagHeader', totalCount, tag);

  return (
    <Layout
      location={location}
      title={siteTitle}
      breadcrumbs={[{ text: formatMessage('tTags'), url: `${homeLink}tags` }, { text: tag }]}
    >
      <Seo title={tagHeader} description={tagHeader} />
      <h1>{tagHeader}</h1>
      <main>
        <ol style={{ listStyle: `none`, margin: 0 }}>
          {edges.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <PostEntry
                key={node.fields.slug}
                lang={lang}
                slug={node.fields.slug}
                date={node.frontmatter.date}
                timeToRead={node.fields.readingTime.minutes}
                title={title}
                excerpt={node.frontmatter.description || node.excerpt}
              />
            );
          })}
        </ol>        
      </main>
      <div style={{ marginTop: 50 }} />
      <aside>
        <Bio />
      </aside>
    </Layout>
  );
};

TagPosts.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
              langKey: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired,
      ),
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default TagPosts;

export const pageQuery = graphql`
  query TagPage($tag: String, $langKey: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } }, fields: { langKey: { eq: $langKey } } }
    ) {
      totalCount
      edges {
        node {
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
          }
        }
      }
    }
  }
`;
