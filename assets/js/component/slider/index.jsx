import React, { Component } from 'react';
import {
    Arwes,
    withStyles,
} from 'arwes';
import * as arwes from 'arwes';
import {
    Deck,
    Slide,
    Text
} from 'spectacle';
import { createMemoryHistory } from 'history';
import createSpectacleThemeScreen from 'spectacle/lib/themes/default/screen';
import createSpectacleThemePrint from 'spectacle/lib/themes/default/print';

const newHistory = createMemoryHistory();

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

    /**
   * Create list of dynamic React components for the presentation.
   * @param  {Object[]} elements - Array of components definitions.
   * @param  {String} key - Identifier.
   * @return {React.Component[]}
   */
  createElements (elements, key) {
    return elements.map((item, index) => this.createElement(item, `${key}${index}`));
  }

  /**
   * Create a dynamic React component for the presentation.
   * @param  {Object|String} opts - The React component properties.
   * @param  {String} key - Identifier.
   * @return {React.Component}
   */
  createElement (opts, key) {
    const { classes } = this.props;

    if (Array.isArray(opts)) {
      return this.createElements(opts, key);
    }

    if (typeof opts === 'string') {
      return <arwes.Words animate>{opts}</arwes.Words>;
    }

    const { element, props, children } = opts;

    switch (element) {
      case 'Image': return <arwes.Image key={key} animate {...props} />;
      case 'ImagePlain': return (
        <arwes.Appear key={key} animate>
          <spectacle.Image {...props} />
        </arwes.Appear>
      );
      case 'Code': return (
        <arwes.Code
          className={classes.codeBlock}
          key={key}
          animate
          {...props}
        >
          {children}
        </arwes.Code>
      );
      case 'Text': return (
        <arwes.Appear
          key={key}
          animate
          {...props}
        >
          <div dangerouslySetInnerHTML={{__html: children}}/>
        </arwes.Appear>
      )

      // General content components.
      case 'Heading':
      case 'Paragraph':
      case 'Blockquote':
      case 'Link':
      case 'List': {
        const SelectedElement = arwes[element];
        return (
          <SelectedElement key={key} {...props}>
            {this.createElement(children, `${key}C`)}
          </SelectedElement>
        );
      }

      // A built-in component.
      default: return React.createElement(
        element,
        { ...props, key },
        this.createElement(children, `${key}C`)
      );
    }
  }

    render() {
        const { classes, className, deckClassName, talk, slideClassName } = this.props;
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
                                history={newHistory}
                                theme={spectacleTheme}
                                >
                                {(talk.slides || []).map((slide, index) => (
                                  <Slide key={index} className={slideClassName} {...slide.props}>
                                    {(slide.children || []).map((child, index2) => (
                                      this.createElement(child, `S${index}C${index2}`)
                                    ))}
                                  </Slide>
                                ))}
                            </Deck>
                        )
                    }
                </div>
            </Arwes>
        );
    }
}

export default withStyles(styles)(Slider);
