import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    Arwes,
    withStyles,
    createLoader,
    Loading,
    createResponsive,
    utils,
} from 'arwes';
import moment from 'moment';
import {
    GetExperience
} from '../../action/experience';
import { resources } from '../../withTemplate';
import Slider from '../slider/index';

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
  });
  

class SkillComponent extends Component {
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

        props.GetExperience(props.match.params.id);
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
        const { shownIndex } = this.state;

        const { data, loading } = this.props.ExperienceReducer.experience;

        if (loading || _.isNull(data)) {
            return (<Arwes><Loading
                full
                animate
                show={!shownIndex}
                animation={{
                    unmountOnExit: true
                }}
                /></Arwes>)
        }

        const { Experience } = data.data;
        const { Projects } = Experience;

        const talk = {
            "slides": [
                {
                    "children": [
                        {
                            "element": "Heading",
                            "children": Experience.title
                        },
                    ]
                },
                {
                    "children": [
                        {
                            "element": "Text",
                            "children": Experience.body
                        },
                    ]
                },
                {
                    "children": [
                        {
                            "element": "Heading",
                            "children": "Projects"
                        },
                        {
                            "element": "Table",
                            "children": {
                                "headers": ['title'],
                                "dataset": _.map(Projects, (skill) => [skill.title]),
                            }
                        }
                    ]
                },
            ]
        };

        if (Experience.start_date) {
            talk.slides[0].children.push({
                "element": "Paragraph",
                "children": `Start Date: ${moment(Experience.start_date).format('DD/MM/YYYY')}`
            });
        }
        if (Experience.end_date) {
            talk.slides[0].children.push({
                "element": "Paragraph",
                "children": `End Date: ${moment(Experience.end_date).format('DD/MM/YYYY')}`
            });
        }

        return (
            <Slider talk={talk}/>
        );
    }
}

const mapStateToProps = (state) => ({
    ExperienceReducer: state.ExperienceReducer
});

const mapDispatchToProps = (dispatch) => ({
    GetExperience: (id) => dispatch(GetExperience(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SkillComponent));
