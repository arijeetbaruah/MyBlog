import React from 'react';
import { withStyles, Footer as ArwesFooter, Row, Button } from 'arwes';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import TextIcon from './textIcon';
import Wrap from './wrap';
import Link from './link';
import {
  faLinkedinIn,
  faTwitter,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                    <div className={classes.left}>
                      <Link className={classes.detail} href='https://linkedin.com/in/arijeet-baruah/' target='_blank' onLink={onLink}>
                          <Button className={classes.button} animate show={anim.entered}>
                            <FontAwesomeIcon icon={faLinkedinIn} />
                          </Button>
                      </Link>
                      <Link className={classes.detail} href='https://twitter.com/thegamecreator5' target='_blank' onLink={onLink}>
                          <Button className={classes.button} animate show={anim.entered}>
                            <FontAwesomeIcon icon={faTwitter} />
                          </Button>
                      </Link>
                      <Link className={classes.detail} href='https://github.com/ArijeetBaruah' target='_blank' onLink={onLink}>
                          <Button className={classes.button} animate show={anim.entered}>
                            <FontAwesomeIcon icon={faGithub} />
                          </Button>
                      </Link>
                    </div>
                    <div className={classes.right}>
                    <Link href='https://arwes.romelperez.com' target='arwes' onLink={onLink}>
                        <TextIcon show={anim.entered} icon={faAtom}>Made with Arwes</TextIcon>
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
