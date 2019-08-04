import React, { Component } from 'react';
import _ from 'lodash';
import {
    Arwes,
    withStyles,
    createLoader,
    Loading,
    createResponsive,
    utils,
    Content,
    Frame,
    Words,
} from 'arwes';
import Wrap from './wrap';
import Header from './header';
import Footer from './Footer';
import { resources } from '../withTemplate';

const height = window.screen.height / 2 + 60;

const styles = theme => ({
    root: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      '& $project + $project': {
        marginTop: theme.margin,
      },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },
    main: {
      flex: 1,
      overflowY: 'auto',
      padding: [theme.padding, 0],
      '& h2': {
        margin: 0,
      },
    },
    project: {
      display: 'block',
    },
    titleRight: {
      float: 'right',
    },
    frame: {
        minHeight: `${height}px`,
    },
    frameWord: {
        minHeight: `${height}px`,
        paddingTop: `${height/2}px`,
        paddingBottom: `${height/2}px`,
        width: '100%',
        textAlign: 'center'
    }
});
  

class NotFoundComponent extends Component {
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
                                    <Header
                                        animate
                                        show={anim.entered}
                                        animation={{
                                            onEntered: () => this.setState({ animLvl1: true })
                                        }}
                                        onClick={this.onLink}
                                        />
                                    <div ref={el => (this.mainEl = el)} className={classes.main}>
                                        <Wrap>
                                            <Frame
                                                animate
                                                show={animLvl1}
                                                level={3}
                                                corners={4}
                                                animation={{
                                                    onEntered: () => this.setState({ animLvl2: true })
                                                }}
                                                className={classes.frame}
                                                >
                                                <Words
                                                    animate
                                                    show={animLvl2}
                                                    className={classes.frameWord}
                                                    >
                                                    Page Not Found
                                                </Words>
                                            </Frame>
                                        </Wrap>
                                    </div>
                                    <Footer
                                        animate
                                        show={anim.entered}
                                        onLink={this.onLink}
                                        />
                                </Content>
                            </div>
                        )
                    }
                </Arwes>
            </>
        );
    }
}

export default withStyles(styles)(NotFoundComponent);
