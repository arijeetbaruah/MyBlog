import React, { Component } from 'react';
import {
  Arwes,
  withStyles,
  createLoader,
  createResponsive,
  utils,
  Content,
  Words,
  Button,
  Loading
} from 'arwes';
import Link from './link';
import { resources } from './../withTemplate';
import TextIcon from './textIcon';
import {
    faCode,
    faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
    root: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      margin: 'auto',
      padding: theme.padding,
      textAlign: 'center',
      maxWidth: 700,
      '& h1': {
        margin: 0,
        paddingTop: 5,
        fontSize: 32,
        lineHeight: '1',
      },
      '& p': {
        margin: 0,
      },
      '& $detail + $detail': {
        marginTop: theme.margin / 2,
      },
    },
    section: {
      marginBottom: theme.margin / 1.5,
      '&:last-child': {
        margin: 0,
      },
    },
    profile: {
      margin: 0,
      display: 'inline-block',
      width: 150,
    },
    detail: {
      display: 'block',
    },
    textIcon: {
      textAlign: 'center',
    },
    button: {
      width: '50%',
    },
    // medium size +
    [`@media screen and (min-width: ${theme.responsive.small + 1}px)`]: {
      content: {
        '& $detail + $detail': {
          margin: [0, 0, 0, theme.margin / 2],
        },
      },
      detail: {
        display: 'inline-block',
      },
      button: {
        width: 'auto',
      },
    },
});

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shownIndex: 0,
            // Animations enabled by levels.
            animLvl0: false,
            animLvl1: false,
            animLvl2: false,
            animLvl3: false
        };

        this.loader = createLoader();
        this.responsive = createResponsive({
            getTheme: () => props.theme
        });

        this.onLink = this.onLink.bind(this);
    }

    startLoading () {
        const responsive = this.responsive.get();
        const background = utils.getResponsiveResource(resources.background, responsive);

        this.loader.load({ images: [background] }, { timeout: 5 * 1000 }).
        then(() => {}, () => {}).
        then(() => this.setState({ shownIndex: true, animLvl0: true }));
    }

    componentDidMount () {
        this.startLoading();
    }

    onLink() {
        this.setState({ animLvl0: false });
    }

    render() {
        const { shownIndex, animLvl0, animLvl1, animLvl2, animLvl3 } = this.state;
        const { classes } = this.props;
        const { background, pattern } = resources;

        return (
        <>
          <Loading
            full
            animate
            show={!shownIndex}
            animation={{
                unmountOnExit: true
            }}
            />
            <Arwes
                animate
                show={animLvl0}
                showResources={animLvl0}
                background={background}
                pattern={pattern}
                >
                {
                    anim => (
                        <div className={classes.root}>
                            <Content className={classes.content}>
                            <div className={classes.section}>
                                <h1><Words animate show={anim.entered}>
                                Arijeet Baruah
                                </Words></h1>
                            </div>

                            <div className={classes.section}>
                                <p><Words animate show={anim.entered}>
                                I am a Gameplay and Tool Developer with one year experience in Software Development. I am Eager to learn and a quick study, with experience in Team work and Solo projects. I have made 8 home build games all available on the website.
                                </Words></p>
                            </div>
                                <div className={classes.section}>
                                    <Link className={classes.detail} href='https://linkedin.com/in/arijeet-baruah/' target='linkedin' onLink={this.onLink}>
                                        <TextIcon className={classes.textIcon} show={anim.entered} icon={faCode}>Gameplay Programmer</TextIcon>
                                    </Link>
                                    {/* <Link className={classes.detail} href='https://hugeinc.com' target='_blank' onLink={this.onLink}>
                                        <TextIcon className={classes.textIcon} show={anim.entered} icon='briefcase-outline'>Huge</TextIcon>
                                    </Link> */}
                                    <Link className={classes.detail} href='https://www.google.com.co/maps/place/India' target='_blank' onLink={this.onLink}>
                                        <TextIcon className={classes.textIcon} show={anim.entered} icon={faMapMarkedAlt}>India</TextIcon>
                                    </Link>
                                </div>
                                <div className={classes.section}>
                                    <Link className={classes.detail} href='/skill' onLink={this.onLink}>
                                        <Button className={classes.button} animate show={anim.entered}>
                                            {anim2 => <Words animate show={anim2.entered}>Skill</Words>}
                                        </Button>
                                    </Link>
                                </div>
                            </Content>
                        </div>
                    )
                }
            </Arwes>
          </>
        );
    }
}

export default withStyles(styles)(HomeComponent);
