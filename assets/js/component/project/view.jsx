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
    Content,
    Row,
    Appear,
    Words,
    Frame,
    Table
} from 'arwes';
import moment from 'moment';
import {
    GetProject
} from '../../action/project';
import Wrap from '../wrap';
import Header from '../header';
import Footer from '../Footer';
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
  

class ViewProjectComponent extends Component {
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

        props.GetProject(props.match.params.id);
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

        const { data, loading } = this.props.ProjectReducer.project;

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

        const { Project } = data.data;

        const talk = {
            "slides": [
                {
                    "children": [{
                    "element": "Heading",
                    "children": Project.title
                    }]
                },{
                    "children": [{
                        "element": "Text",
                        "children": Project.body
                    }]
                }
            ]
        };
        if (Project.start_date) {
            talk.slides[0].children.push({
                "element": "Paragraph",
                "children": `Start Date: ${moment(Project.start_date).format('DD/MM/YYYY')}`
            });
        }
        if (Project.end_date) {
            talk.slides[0].children.push({
                "element": "Paragraph",
                "children": `End Date: ${moment(Project.end_date).format('DD/MM/YYYY')}`
            });
        }

        return (
            <Slider talk={talk}/>
        );
    }
}

const mapStateToProps = (state) => ({
    ProjectReducer: state.ProjectReducer
});

const mapDispatchToProps = (dispatch) => ({
    GetProject: (id) => dispatch(GetProject(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ViewProjectComponent));
