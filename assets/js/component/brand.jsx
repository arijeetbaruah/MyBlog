import React from 'react';
import { withStyles, Words } from 'arwes';
import Link from './link';

const styles = theme => ({
    root: {
      display: 'inline-block',
      textAlign: 'left',
      '& h1': {
        display: 'inline-block',
        margin: [0, 0, 0, theme.padding / 2],
        paddingTop: 4,
        lineHeight: 1,
        fontSize: 28,
        verticalAlign: 'middle',
      }
    },
    profile: {
      display: 'inline-block',
      margin: 0,
      width: 45,
    },
});

const Brand = (props) => {
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
        <Link className={cls} href='/' onLink={onLink} {...etc}>
            <h1><Words animate show={show}>Arijeet Baruah</Words></h1>
        </Link>
    );
}

export default withStyles(styles)(Brand);
