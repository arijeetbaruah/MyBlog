import bgSmall from '../images/background-small.jpg';
import bgMedium from '../images/background-medium.jpg';
import bgLarge from '../images/background-large.jpg';
import bgxlarge from '../images/background-xlarge.jpg';
import glow from '../images/glow.png';
import { lighten, darken } from 'polished';
import click from '../sound/click.mp3'
import typing from '../sound/typing.mp3'
import deploy from '../sound/deploy.mp3'

const generateColor = color => ({
  base: color,
  light: lighten(0.2, color),
  dark: darken(0.2, color),
});

const generateBackground = color => ({
  level0: color,
  level1: lighten(0.015, color),
  level2: lighten(0.030, color),
  level3: lighten(0.045, color),
});

export const createAppTheme = (theme = {}) => ({
  ...theme,
  color: {
    primary: generateColor('#30fffe'),
    ...theme.color
  },
  background: {
    primary: generateBackground('#031212'),
    ...theme.background
  },
});

export const resources = {
    background: {
      small: bgSmall,
      medium: bgMedium,
      large: bgLarge,
      xlarge: bgxlarge
    },
    pattern: glow,
};

export const sounds = {
    shared: {
      volume: 0.6,
    },
    players: {
      click: {
        sound: { src: [click] },
        settings: { oneAtATime: true }
      },
      typing: {
        sound: { src: [typing] },
        settings: { oneAtATime: true }
      },
      deploy: {
        sound: { src: [deploy] },
        settings: { oneAtATime: true }
      },
    }
  };
