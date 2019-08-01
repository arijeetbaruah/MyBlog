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

        return (
            <>
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
                                        <Row col noMargin s={12}>
                                            <Appear
                                                animate
                                                show={animLvl1}
                                                animation={{
                                                    onEntered: () => this.setState({ animLvl2: true })
                                                }}
                                                />
                                            <Words animate show={animLvl1}>Project</Words>
                                            <Appear className={classes.titleRight} animate show={animLvl3} >
                                                {Project.start_date && (`Start Date: ${moment(Project.start_date).format('DD MMM YYYY')}`)}
                                                {(Project.start_date && Project.end_date) && '|'}
                                                {Project.end_date && (`End Date: ${moment(Project.end_date).format('DD MMM YYYY')}`)}
                                            </Appear>
                                        </Row>
                                        <Row col noMargin s={12}>
                                            <Frame
                                                animate
                                                show={animLvl2}
                                                level={3}
                                                corners={4}
                                                layer='primary'
                                                animation={{
                                                    onEntered: () => this.setState({ animLvl3: true })
                                                }}
                                                >
                                                <Appear
                                                    animate
                                                    show={animLvl3}
                                                    animation={{
                                                        onEntered: () => this.setState({ animLvl3: true })
                                                    }}
                                                    >
                                                    <div dangerouslySetInnerHTML={{__html: Project.body}} />
                                                </Appear>
                                            </Frame>
                                        </Row>
                                        <Row col noMargin s={12}>
                                            <Words animate show={animLvl3}>Skill Used</Words>
                                            <Table animate
                                                show={animLvl3}
                                                headers={['name', 'level']}
                                                dataset={
                                                    _.map(Project.skills, (skill, key) => (
                                                        [skill.title, skill.level]
                                                    ))
                                                }
                                                />
                                        </Row>
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

const mapStateToProps = (state) => ({
    ProjectReducer: state.ProjectReducer
});

const mapDispatchToProps = (dispatch) => ({
    GetProject: (id) => dispatch(GetProject(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ViewProjectComponent));
