import React, { Component } from 'react';
import { withStyles, Header as ArwesHeader, Row, Col, Button, Appear } from 'arwes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';
import Wrap from './wrap';
import Brand from './brand';
import Link from './link';
import Navigation from './Navigation';

const styles = theme => ({
    root: {
      textAlign: 'center',
    },
    wrap: {
      padding: [theme.padding, 0],
    },
    links: {
      marginTop: theme.padding / 2,
    },
    [`@media (min-width: ${theme.responsive.small + 1}px)`]: {
      root: {
        textAlign: 'left',
      },
      links: {
        marginTop: 0,
        textAlign: 'right',
      },
    },
});

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
      showMenuEvent: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      showMenuEvent: !this.state.showMenuEvent
    });
    setTimeout(() => {
      this.setState({
        showMenu: !this.state.showMenu
      });
    }, this.props.theme.animTime);
  }

  render() {
    const {
        theme,
        classes,
        className,
        onLink,
        ...etc
    } = this.props;
    const cls = `${classes.root} ${className}`;

    return (
        <ArwesHeader
            animate
            className={cls}
            {...etc}
          >
            {
                anim => (
                    <Wrap className={classes.wrap}>
                        <Row noMargin>
                            <Col s={12} m={6}>
                              <Brand show={anim.entered} onLink={onLink} />
                            </Col>
                            <Col s={12} m={6} className={classes.links}>
                              <Link href="javascript:void(0);" onClick={this.toggleMenu}>
                                <Button animate show={anim.entered}>
                                  <FontAwesomeIcon icon={this.state.showMenu ? faEllipsisV : faEllipsisH} />
                                </Button>
                              </Link>
                              {this.state.showMenu && <Navigation show={this.state.showMenuEvent} />}
                            </Col>
                        </Row>
                    </Wrap>
                )
            }
        </ArwesHeader>
    );
  }
}

export default withStyles(styles)(Header);
