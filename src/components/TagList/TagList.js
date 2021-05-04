import './TagList.css';

import React from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag';

function TagList({ tags, baseUrl, ...restProps }) {
  return (
    <span className="tags">
      {tags
        .map(text => <Tag key={text} text={text} url={`${baseUrl}/${text}`} />)
        .reduce((prev, curr) => [ prev, ', ', curr ])
      }
    </span>
  );
}

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
  baseUrl: PropTypes.string,
};

TagList.defaultProps = {
  baseUrl: '',
};

export default TagList;
