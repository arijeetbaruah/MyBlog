import React, { Component } from 'react';
import {
    Arwes,
    withStyles,
} from 'arwes';
import {
    Deck,
    Slide,
    Text
} from 'spectacle';
import history from '../../history';
import createSpectacleThemeScreen from 'spectacle/lib/themes/default/screen';
import createSpectacleThemePrint from 'spectacle/lib/themes/default/print';

const styles = () => ({
    '@global': {
      'div.spectacle-slide': {
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      },
    },
    root: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      '& ul li': {
        display: 'flex',
        textAlign: 'left',
      },
    },
    codeBlock: {
      margin: 0,
      maxHeight: 700,
    },
});

class Slider extends Component {
    constructor() {
        super();
        this.state = {
            spectacleTheme: null,
            animLvl1: false,
        };
    }

    defineSpectacleTheme () {
        const { theme } = this.props;
    
        const colors = {
          primary: theme.background.primary.level0,
          secondary: theme.color.primary.base,
          tertiary: theme.color.header.base,
          quaternary: theme.color.primary.dark,
        };
        const fonts = {
          primary: theme.typography.fontFamily,
          secondary: theme.typography.headerFontFamily,
          tertiary: theme.code.fontFamily,
        };
        const spectacleTheme = {
          screen: createSpectacleThemeScreen(colors, fonts),
          print: createSpectacleThemePrint(),
        };
    
        spectacleTheme.screen = {
          ...spectacleTheme.screen,
          global: {
            body: {},
            '_:-moz-tree-row(hover), .spectacle-deck': {
              perspective: '1000px'
            },
            '_:-moz-tree-row(hover), ul .appear': {
              display: 'inline'
            },
          },
          components: {
            ...spectacleTheme.screen.components,
            image: {
              display: 'block',
              margin: '0 auto 20px',
            },
          },
        };
    
        this.setState({ spectacleTheme });
      }

    componentDidMount () {
        this.defineSpectacleTheme();

        this.setState({ animLvl1: true });
      }

    render() {
        const { classes, className, deckClassName, slideClassName } = this.props;
        const { spectacleTheme, animLvl1 } = this.state;

        return (
            <Arwes
                animate
                show={animLvl1}
                puffsProps={{ animate: false }}
                className={className}
                >
                <div className={classes.root}>
                    {
                        animLvl1 && (
                            <Deck
                                className={deckClassName}
                                progress="bar"
                                history={history}
                                theme={spectacleTheme}
                                >
                                <Slide>
                                    <Text>hi</Text>
                                </Slide>
                                <Slide>
                                    <Text>hello</Text>
                                </Slide>
                            </Deck>
                        )
                    }
                </div>
            </Arwes>
        );
    }
}

export default withStyles(styles)(Slider);
