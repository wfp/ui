import React from 'react';
//import '!style-loader!css-loader!sass-loader!./storybook.scss';
import '!style-loader!css-loader!../assets/css/styles.css';
import { Button, Link, List, ListItem, Tooltip } from '../src';

const legacyPreviousversions = [
  { link: 'https://cdn.wfp.org/guides/ui/v1.4.0/docs/', title: 'v1.5.0' },
  { link: 'https://cdn.wfp.org/guides/ui/v1.4.0/docs/', title: 'v1.4.0' },
  { link: 'https://cdn.wfp.org/guides/ui/v1.3.1/docs/', title: 'v1.3.1' },
  { link: 'https://cdn.wfp.org/guides/ui/v1.3.0/docs/', title: 'v1.3.0' },
  { link: 'https://cdn.wfp.org/guides/ui/v1.2.1/docs/', title: 'v1.2.1' },
  { link: 'https://cdn.wfp.org/guides/ui/v1.2.0/docs/', title: 'v1.2.0' },
  { link: 'https://cdn.wfp.org/guides/ui/v1.0.0/docs/', title: 'v1.0.0' },
];
export function StorybookLogo() {
  return null;
  return (
    <div className="wfp-logo">
      WFP{' '}
      <span style={{ fontWeight: '400', textTransform: 'uppercase' }}>
        UI-Kit
      </span>
      <Tooltip
        content={
          <List kind="tooltip">
            {legacyPreviousversions.map((e, i) => (
              <ListItem key={i}>
                <Link href={e.link} target="_blank">
                  {e.title}
                </Link>
              </ListItem>
            ))}
          </List>
        }
        disablePadding
        trigger="click">
        <span
          style={{
            fontWeight: '400',
            fontSize: '0.85em',
            color: 'grey',
            marginLeft: '0.5em',
          }}>
          v{process.env.STORYBOOK_NPM_VERSION}
        </span>
      </Tooltip>
    </div>
  );
}
