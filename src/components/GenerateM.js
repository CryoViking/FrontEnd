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

const styles = theme => ({
    root: {
        width: '100%',
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


    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div className={classes.column}>
                            <Typography className={classes.heading}>Sub file parameters</Typography>
                        </div>
                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}>Select file format</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                        <div className={classes.column}>
                            <TextField id="standard-basic" label="S/N Ratio" />
                            <br />
                            <TextField id="standard-basic" label="Delay Boundaries" />
                            <br />
                            <Typography id="discrete-slider" gutterBottom>
                                Noise Magnitude
                            </Typography>
                            <Slider
                                defaultValue={30}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={10}
                                max={100}
                            />
                        </div>
                        <div className={classes.column}>
                            <Chip label="Format A" onDelete={() => {}} />
                        </div>
                        <div className={clsx(classes.column, classes.helper)}>
                            <Typography variant="caption">
                                Select file format
                                <br />
                                <FormControl className={classes.formControl}>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={10}
                                        // onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Format A</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/>
                                <a href="#secondary-heading-and-columns" className={classes.link}>
                                    help
                                </a>
                            </Typography>
                        </div>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button size="small">Cancel</Button>
                        <Button size="small" color="primary">
                            Save
                        </Button>
                    </AccordionActions>
                </Accordion>
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
                                <RadioGroup aria-label="gender" name="gender1" value={"female"} >
                                    <FormControlLabel value="female" control={<Radio />} label="Random Gaussian Noise" />
                                    <FormControlLabel value="male" control={<Radio />} label="Impulse Signal" />
                                    <FormControlLabel value="other" control={<Radio />} label="Sinusoidal Wave" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={classes.column}>
                            <Typography id="discrete-slider" gutterBottom>
                                Noise Magnitude
                            </Typography>
                            <Slider
                                defaultValue={30}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={10}
                                max={100}
                            />
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
                                <Button>3D Location Variables</Button>
                                <Button>Delay Input file</Button>
                                <Button>Generate Delay</Button>
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
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Generate);