import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    Arwes,
    withStyles,
    Project,
    createLoader,
    Loading,
    createResponsive,
    utils,
    Content,
    Row,
    Appear,
    Words
} from 'arwes';
import {
    faAngleDoubleLeft,
    faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    GetExperiences
} from '../../action/experience';
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

        props.GetExperiences();
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

        const { data, loading } = this.props.ExperienceReducer.experiences;

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
        
        const { Experiences } = data.data;

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
                                    onLink={this.onLink}
                                    />
                                <div ref={el => (this.mainEl = el)} className={classes.main}>
                                    <Wrap>
                                        <Row col noMargin s={12}>
                                            <h2>
                                                <Appear
                                                    animate
                                                    show={animLvl1}
                                                    animation={{
                                                        onEntered: () => this.setState({ animLvl2: true })
                                                    }}
                                                    >
                                                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                                                </Appear>
                                                    <Words animate show={animLvl1}>Experiences</Words>
                                                <Appear className={classes.titleRight} animate show={animLvl1} >
                                                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                                                </Appear>
                                            </h2>
                                            {
                                                _.map(Experiences, (skill, key) => (
                                                    <Project
                                                        animate
                                                        show={anim.entered}
                                                        key={key}
                                                        header={skill.title}
                                                        animation={{
                                                            onEntered: () => this.setState({ animLvl3: true })
                                                        }}
                                                        onClick={() => {
                                                            window.open(`/experience/${skill.id}`);
                                                        }}
                                                        >
                                                            <Appear
                                                                animate
                                                                show={animLvl2}
                                                                animation={{
                                                                    onEntered: () => this.setState({ animLvl3: true })
                                                                }}
                                                                />
                                                                <div dangerouslySetInnerHTML={{ __html: skill.body }}/>
                                                            <Appear className={`mdi mdi-chevron-double-left ${classes.titleRight}`} animate show={animLvl1} />
                                                    </Project>
                                                ))
                                            }
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
    ExperienceReducer: state.ExperienceReducer
});

const mapDispatchToProps = (dispatch) => ({
    GetExperiences: () => dispatch(GetExperiences())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SkillComponent));
