import React from 'react';
import { withStyles, Appear, Words } from 'arwes';

const styles = () => ({
  root: {
    display: 'inline-block',
    textAlign: 'left',
  },
});

const TextIcon = props => {
  const {
    theme,
    classes,
    show,
    icon,
    className,
    children,
    ...etc
  } = props;
  const cls = `${classes.root} ${className}`;

  return (
    <div className={cls} {...etc}>
      <Appear animate show={show}>
        <i className={`mdi mdi-${icon}`} />
      </Appear>
      {' '}
      <Words animate show={show}>{children}</Words>
    </div>
  );
};

export default withStyles(styles)(TextIcon);
