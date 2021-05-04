import * as React from "react"
import PropTypes from 'prop-types';

import { Link } from "gatsby"

import { useLang } from 'context/LanguageContext';
import ReadModeToggle from './ReadModeToggle';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const { refresh } = useLang();

  React.useEffect(() => {
    refresh(location);
  }, [location, refresh]);

  let header
  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {header}
        <ReadModeToggle />
      </header>
      <main>{children}</main>
      <footer>
        © An Tran - {new Date().getFullYear()} 
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object.isRequired,
  title: PropTypes.string,
};

Layout.defaultProps = {
  children: null,
  title: null,
};

export default Layout;