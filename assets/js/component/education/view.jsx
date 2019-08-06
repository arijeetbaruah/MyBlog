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
    GetEducation
} from '../../action/education';
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
  

class ViewEducationComponent extends Component {
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

        props.GetEducation(props.match.params.id);
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

    calcuateDate(education) {
        let ret = moment(education.start_date).format('DD MMM YYYY');
        if (education.end_date) {
            ret += ' - ' + moment(education.end_date).format('DD MMM YYYY');
        } else {
            ret += ' - current';
        }
        return ret;
    }

    render() {
        const { shownIndex } = this.state;

        const { data, loading } = this.props.EducationReducer.education;

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

        const { Education } = data.data;

        const talk = {
            "slides": [
                {
                    "children": [
                        {
                            "element": "Heading",
                            "children": Education.institute
                        },
                        {
                            "element": "Paragraph",
                            "children": Education.degree
                        },
                        {
                            "element": "Paragraph",
                            "children": `Date: ${this.calcuateDate(Education)}`
                        },
                    ]
                },
                {
                    "children": [
                        {
                            "element": "Text",
                            "children": Education.body
                        },
                    ]
                },
            ]
        };

        return (
            <Slider talk={talk}/>
        );
    }
}

const mapStateToProps = (state) => ({
    EducationReducer: state.EducationReducer
});

const mapDispatchToProps = (dispatch) => ({
    GetEducation: (id) => dispatch(GetEducation(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ViewEducationComponent));
