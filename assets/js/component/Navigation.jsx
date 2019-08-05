import React from 'react';
import { withStyles, Highlight, Appear, Words, Button } from 'arwes';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import Link from './link';

const linksList = [
  {
    name: 'Projects',
    icon: faCode,
    href: '/project'
  },
  {
    name: 'Skills',
    icon: faCode,
    href: '/skill'
  },
  {
    name: 'Experience',
    icon: faCode,
    href: '/experience'
  },
];


const styles = theme => ({
    root: {
      display: 'inline-block',
      textAlign: 'left',
      position: 'absolute',
      top: '79px',
      zIndex: '999',
      right: '250px',
      ['& a:hover']: {
        background: theme.background.primary.level3,
        color: theme.color.primary.level3
      }
    },
    link: {
      lineHeight: '45px',
      fontSize: 21,
      display: 'flex',
    },
    navItem: {
      width: '120px',
    },
    button: {
      padding: [0, theme.padding / 2]
    },
});

const Navigation = props => {
    const {
      theme,
      classes,
      show,
      onLink,
      className,
      ...etc
    } = props;
    const cls = `${classes.root} ${className}`;
    return (
      <nav className={cls} {...etc}>
        {_.map(linksList, (linkItem, index) => (
        <Link
          key={index}
          className={classes.link}
          href={linkItem.href}
          onLink={onLink}
          target={linkItem.target}
          >
          <Button animate show={show}>
            {
              anim => (
                <Appear className={classes.button} animate show={anim.entered} layer='header'>
                  <div className={classes.navItem} {...etc}>
                      <Appear animate show={anim.entered}>
                        <FontAwesomeIcon icon={linkItem.icon} />
                      </Appear>
                      {' '}
                      <Words animate show={anim.entered}>{linkItem.name}</Words>
                  </div>
                </Appear>
              )
            }
          </Button>
        </Link>
        ))}
      </nav>
    );
};
  
export default withStyles(styles)(Navigation);
