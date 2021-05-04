import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

import { formatReadingTime } from '../../utils/helpers';

function PostEntry({ slug, title, date, timeToRead, excerpt }) {
  return (
    <article
      className="post-list-item"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h2>
          <Link to={slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
        <small>{date} • {formatReadingTime(timeToRead)}</small>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
          itemProp="description"
        />
      </section>
    </article>
  );
}

PostEntry.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  excerpt: PropTypes.string,
};

PostEntry.defaultProps = {
  title: null,
  excerpt: null,
};

export default PostEntry;
