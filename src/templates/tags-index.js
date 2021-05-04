import React from 'react';
import PropTypes from 'prop-types';

// Utilities
import { kebabCase } from 'utils/helpers';

// Components
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Bio from "components/Bio"
import Layout from "components/Layout"
import Tag from 'components/Tag';
import { useLang } from 'context/LanguageContext';
import { formatMessage } from 'utils/i18n';

const styles = {
  tagListDiv: {
    marginLeft: '3rem',
    lineHeight: 1.5,
  },
};

const TagsIndex = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => {
  const { homeLink } = useLang();
  const tTags = formatMessage('tTags');

  return (
    <Layout location={location} title={title} breadcrumbs={[{ text: tTags }]}>
      <aside>
        <Bio />
      </aside>
      <Helmet title={tTags} />
      <div>
        <h1>{tTags}</h1>
        <ul style={styles.tagListDiv}>
          {group.map(tag => (
            <li><Tag
              key={tag.fieldValue}
              text={tag.fieldValue}
              count={tag.totalCount}
              url={`${homeLink}tags/${kebabCase(tag.fieldValue)}/`}
            />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

TagsIndex.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        lang: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default TagsIndex;

export const pageQuery = graphql`
  query TagsTotalPage($langKey: String) {
    site {
      siteMetadata {
        title
        lang
      }
    }
    allMarkdownRemark(limit: 1000, filter: { fields: { langKey: { eq: $langKey } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
