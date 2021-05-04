import React from 'react';

import withThemeFlag from 'utils/withThemeFlag';
import Toggle from 'components/Toggle';
import sun from './sun.png';
import moon from './moon.png';

// eslint-disable-next-line react/prop-types
function ReadModeToggle({ isLightTheme }) {
  return (
    <>
      {isLightTheme != null ? (
        <Toggle
          icons={{
            checked: (
              <img
                src={moon}
                alt="night"
                width="16"
                height="16"
                role="presentation"
                style={{ pointerEvents: 'none' }}
              />
            ),
            unchecked: (
              <img
                src={sun}
                alt="day"
                width="16"
                height="16"
                role="presentation"
                style={{ pointerEvents: 'none' }}
              />
            ),
          }}
          checked={!isLightTheme}
          onChange={(e) => window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')}
        />
      ) : (
        <div style={{ height: '24px' }} />
      )}
    </>
  );
}

export default withThemeFlag(ReadModeToggle);
