import './Tag.css';

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

function Tag({ url, text, count, ...restProps }) {
  let countPart;
  if (count != null) {
    countPart = `  (${count})`;
  }
  return (
    <Link className="tag" to={url}>
        #{text}
        {countPart}
    </Link>
  );
}

Tag.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  count: PropTypes.number,
};

Tag.defaultProps = {
  count: null,
};

export default Tag;
