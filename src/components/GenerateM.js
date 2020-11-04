import React from 'react';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { withSnackbar } from 'notistack';

const {ipcRenderer} = window.require('electron');
const spawnSync = window.require( 'child_process' ).spawnSync;
const { getCurrentWindow, BrowserWindow, app, dialog } = window.require('electron').remote;

const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    columnLong: {
        flexBasis: '66.66%',
    },
    columnBar: {
        flexBasis: '10%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

class Generate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            delayFile: null,
            waveType: "gaussian"
        }

        this.noiseMagnitudeRef = React.createRef();
        this.snrRef = React.createRef();
        this.numberOfTilesRef = React.createRef();

        // sine wave type parameters
        this.frequencyRef = React.createRef();
        this.baselineRef = React.createRef();

        this.phaseRef = React.createRef();
        // impulse wave parameters
        this.durationRef = React.createRef();


    }

    selectInputFileDir = () => {
        var path = dialog.showOpenDialog(
            getCurrentWindow(),
            {
                title: "Select were to save delay file..",
                properties: ['openDirectory'],
                modal: true
            }
        );
        path.then(files => {
            var basepath = app.getAppPath();

            if (files.filePaths !== undefined)  {
                console.log(files.filePaths[0]);
                ipcRenderer.send('generate-delay', files.filePaths[0]);
            }
        })
    }

    selectDelayFile = () => {

        var path = dialog.showOpenDialog(
            getCurrentWindow(),
            {
                title: "Select delay file..",
                properties: ['openFile'],
                modal: true,
                message: "Select delay file.."
            }
        );

        path.then(files => {
            console.log(files.filePaths[0]);
            this.setState({delayFile: files.filePaths[0]});
        })
    }


    selectSubfileDir = () => {
        var path = dialog.showOpenDialog(
            getCurrentWindow(),
            {
                title: "Select were to save subfile...",
                properties: ['openDirectory'],
                modal: true
            }
        );

        path.then(files => {
            console.log(files.filePaths[0]);
            if (files.filePaths[0] !== undefined)  {
                console.log(files.filePaths[0]);
                if (this.state.delayFile == null) {
                    var response = dialog.showMessageBox(getCurrentWindow(), {
                        type: "error",
                        buttons: ["OK"],
                        title: "",
                        message: "You need to select a delay file or generate a new one"
                    })
                    return;
                }

                var args = {
                    subfileDir: files.filePaths[0],
                    delayFile: this.state.delayFile,
                    waveForm: this.state.waveType,

                    noiseMagnitude: this.noiseMagnitudeRef.current.value,
                    snr: this.snrRef.current.value,
                    frequency: this.frequencyRef.current.value,
                    baseline: this.baselineRef.current.value,
                    phase: this.phaseRef.current.value,
                    numberOfTiles: this.numberOfTilesRef.current.value,

                    duration: this.durationRef.current.value
                }
                ipcRenderer.send('generate-subfile', args);
            }
        })
    }
    
    render() {
        const {classes, enqueueSnackbar} = this.props;
        console.log(this.props)

        ipcRenderer.on('snackbar-message', function (event, args) { 
            enqueueSnackbar(args);
        })

        return (
            <>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Test Suite
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.root}>
                    <Accordion expanded={true} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <div className={classes.column}>
                                <Typography className={classes.heading}>Signal Type</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.column} >
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="wave" name="wave" value={this.state.waveType} onChange={event => (this.setState({waveType: event.target.value}))} >
                                        <FormControlLabel value="gaussian" control={<Radio />} label="Random Gaussian Noise" />
                                        <FormControlLabel value="impulse" control={<Radio />} label="Impulse Signal" />
                                        <FormControlLabel value="sinusoidal" control={<Radio />} label="Sinusoidal Wave" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className={classes.column}>
                                { this.state.waveType === "impulse" && <>
                                    <TextField id="standard-basic" type="number" label="Duration" ref={this.durationRef}/>
                                    <br />
                                    <TextField id="standard-basic" type="number" label="Baseline" ref={this.baselineRef}/>
                                    <br />
                                </>}
                                { this.state.waveType === "sinusoidal" && <>
                                    <TextField id="standard-basic" type="number" label="Frequency" ref={this.frequencyRef} />
                                    <br />
                                    <TextField id="standard-basic" type="number" label="Baseline" ref={this.baselineRef}/>
                                    <br />
                                    <TextField id="standard-basic" type="number" label="Phase" ref={this.phaseRef}/>
                                    <br />
                                </>}

                            </div>
                            <div className={classes.columnBar}/>
                            <div className={classes.column}>
                                <ButtonGroup
                                    orientation="vertical"
                                    color="primary"
                                    aria-label="vertical outlined primary button group"
                                    variant="contained"
                                    align="right"
                                >
                                    <Button onClick={this.selectInputFileDir}>Generate Delay</Button>
                                    <Button onClick={this.selectDelayFile}>Delay Input file</Button>
                                </ButtonGroup>
                            </div>
                        </AccordionDetails>
                        <Divider />
                        <AccordionActions>
                            <Button size="small" color="primary">
                                Reset
                            </Button>
                        </AccordionActions>
                    </Accordion>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1c-content"
                            id="panel1c-header"
                        >
                            <div className={classes.column}>
                                <Typography className={classes.heading}>Sub file parameters</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className={classes.details}>
                            <div className={classes.column}>
                                <TextField id="standard-basic" type="number" label="Noise Magnitude" ref={this.noiseMagnitudeRef}/>
                                <br />
                                <TextField id="standard-basic" type="number" label="S/N Ratio" ref={this.snrRef} />
                                <br />
                                <TextField id="standard-basic" type="number" label="Blocks per subfile" />
                                <br />
                            </div>
                            <div className={classes.columnLong}>
                                <TextField id="standard-basic" type="number" label="Time sample per block" />
                                <br />
                                <TextField id="standard-basic" type="number" label="Number of signal path" />
                                <br />
                                <TextField id="standard-basic" label="Number of Tiles" type="number" ref={this.numberOfTilesRef}/>
                                <br />
                            </div>
                        </AccordionDetails>
                        <Divider />
                        <AccordionActions>
                            <Button onClick={this.selectSubfileDir} size="small" color="primary">
                                Generate Subfile
                            </Button>
                        </AccordionActions>
                    </Accordion>
                </div>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(withSnackbar(Generate));