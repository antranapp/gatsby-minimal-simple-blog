import './Toc.css'
import * as React from 'react'
import PropTypes from 'prop-types';

function Toc({ headings }) {
  return (
    <div className="toc">
      <h4>Table of Contents</h4>
      <nav
        dangerouslySetInnerHTML={{ __html: headings }}        
      />
    </div>
  )
}

Toc.propTypes = {
  headings: PropTypes.string.isRequired,
}

export default Toc