import React from 'react';
import { withStyles, Highlight, Appear, Words } from 'arwes';
import _ from 'lodash';
import Link from './link';

const linksList = [{
    name: 'Skills',
    icon: 'apps',
    href: '/skill'
}, {
    name: 'Curriculum',
    icon: 'chip',
    href: 'https://www.linkedin.com/in/arijeet-baruah/',
    target: '_blank'
}];

const styles = theme => ({
    root: {
      display: 'inline-block',
      textAlign: 'left',
    },
    link: {
      display: 'inline-block',
      lineHeight: '45px',
      fontSize: 21,
      '& i': {
        marginRight: theme.padding / 2,
        fontSize: 24,
      },
    },
    button: {
      padding: [0, theme.padding / 2],
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
          <Highlight className={classes.button} animate layer='header'>
            <div className={cls} {...etc}>
                <Appear animate show={show}>
                    <i className={`mdi mdi-${linkItem.icon}`} />
                </Appear>
                {' '}
                <Words animate show={show}>{linkItem.name}</Words>
            </div>
          </Highlight>
        </Link>
        ))}
      </nav>
    );
};
  
export default withStyles(styles)(Navigation);
