import React from 'react';
import { withStyles, Footer as ArwesFooter, Row } from 'arwes';

import TextIcon from './textIcon';
import Wrap from './wrap';
import Link from './link';

const styles = theme => ({
    root: {
      textAlign: 'center',
    },
    wrap: {
      padding: [theme.padding, 0],
    },
    content: {},
    left: {
      marginBottom: theme.margin / 2,
    },
    right: {},
    // medium +
    [`@media screen and (min-width: ${theme.responsive.small + 1}px)`]: {
      root: {
        textAlign: 'left',
      },
      content: {
        display: 'flex',
      },
      left: {
        margin: 0,
        flex: '1 1 auto',
      },
      right: {
        flex: '1 1 auto',
        textAlign: 'right',
      },
    }
});

const Footer = (props) => {
    const {
        theme,
        classes,
        className,
        onLink,
        ...etc
    } = props;
    const cls = `${classes.root} ${className}`;

    return (
        <ArwesFooter className={cls} {...etc}>
        {anim => (
        <Wrap className={classes.wrap}>
            <Row noMargin col s={12}>
                <div className={classes.content}>
                    <div className={classes.left} />
                    <div className={classes.right}>
                    <Link href='https://arwes.romelperez.com' target='arwes' onLink={onLink}>
                        <TextIcon show={anim.entered} icon='chemical-weapon'>Made with Arwes</TextIcon>
                    </Link>
                    </div>
                </div>
            </Row>
        </Wrap>
        )}
        </ArwesFooter>
    );
}

export default withStyles(styles)(Footer);
