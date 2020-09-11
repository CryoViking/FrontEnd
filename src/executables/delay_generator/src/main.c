/**
 * Author: Nathan van der Velde
 * Date Created: 2020-09-02
 * GitHub: CryosisOS
 */

//Standard Imports
#include <argp.h>
#include <float.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

//Library Imports

//Local Imports
#include "delay_generator.h"

//Constants
static bool ARGUMENT_ERROR_STATE = false;
static char *ARGUMENT_ERROR_STATE_MESSAGE;
const char *argp_program_version = "delay_generator v1.0";
const char *argp_program_bug_address = "19127600@student.curtin.edu.au";
static char doc[] = "This command line tool is used to generated delay files used in the proposed system being developed by Capstone Group 17.";
static char args_doc[] = "N/A";

static struct argp_option options[] = {
    {"random", 'r', 0, 0, "Generate delay file with random delays."},
    {"3DModel", 'm', 0, 0, "Generate delay file based upon a 3D model, given coordinate file, elevation and azimuth."},
    {"coordfile", 'c', "FILE", 0, "Coordinate File to be used."},
    {"elevation", 'e', "ELEVATION", 0, "Elevation value to be used."},
    {"azimuth", 'a', "AZIMUTH", 0, "Azimuth to be used."},
#ifdef DEBUG
    {"test", 't', 0, 0, "Run the test harness."},
#endif
    {"output", 'o', "FILE", 0, "Specify the output filename, otherwise uses default."},
    {0}
};

struct arguments {
    enum {
        NOTSET,
        RANDOM,
        MODEL
    } mode;
    char* inputFile;
    char* outputFile;
    double elevation;
    double azimuth;
#ifdef DEBUG
    bool test;
#endif
};

static error_t parse_opt(int key, char *arg, struct argp_state *state){
    struct arguments *arguments = state->input;
    switch (key){
        case 'r':
            if(arguments->mode != NOTSET){
                ARGUMENT_ERROR_STATE = true;
                ARGUMENT_ERROR_STATE_MESSAGE = "Improper use of flags.\n[-r] and [-m] cannot be used together, use only one.\n";
            }
            else{
                arguments->mode = RANDOM;
            }
            break;
        case 'm':
            if(arguments->mode != NOTSET){
                ARGUMENT_ERROR_STATE = true;
                ARGUMENT_ERROR_STATE_MESSAGE = "Improper use of flags.\n[-r] and [-m] cannot be used together, use only one.\n";
            }
            else{
                arguments->mode = MODEL;
            }
            break;
        case 'c':
            arguments->inputFile = arg;
            break;
        case 'o':
            arguments->outputFile = arg;
            break;
        case 'e':
            arguments->elevation = strtod(arg, NULL);
            break;
        case 'a':
            arguments->azimuth = strtod(arg, NULL);
            break;
#ifdef DEBUG
        case 't':
            arguments->test = true;
            break;
#endif
        case ARGP_KEY_ARG:
            return 0;
        default:
            return ARGP_ERR_UNKNOWN;
    }
    return 0;
}

static struct argp argp = { options, parse_opt, args_doc, doc };

void checkFlags(struct arguments arguments){
#ifdef DEBUG
    if(arguments.test && arguments.outputFile == NULL){
        ARGUMENT_ERROR_STATE = true;
        ARGUMENT_ERROR_STATE_MESSAGE = "Must provide [-o] with File path argument when running program with [-t]\n";
    }

    if(arguments.test && (arguments.mode != NOTSET || arguments.inputFile != NULL
                            || arguments.azimuth != DBL_MAX || arguments.elevation != DBL_MAX)){
        ARGUMENT_ERROR_STATE = true;
        ARGUMENT_ERROR_STATE_MESSAGE = "Must run [-t] with [-o] provided, provide NO other flags.\n";
    }
#endif

    if(arguments.mode == NOTSET){
        ARGUMENT_ERROR_STATE = true;
        ARGUMENT_ERROR_STATE_MESSAGE = "Provide a mode flag, either [-r] or [-m]\n";
    }

    if(arguments.mode != MODEL && arguments.inputFile != NULL){
        ARGUMENT_ERROR_STATE = true;
        ARGUMENT_ERROR_STATE_MESSAGE = "Cannot use [-c] without [-m].\n";
    }

    if(arguments.mode == MODEL && arguments.inputFile == NULL){
        ARGUMENT_ERROR_STATE = true;
        ARGUMENT_ERROR_STATE_MESSAGE = "Must provide [-c] when using [-m] and must provide a file path to [-c].\n";
    }

    if(arguments.mode == MODEL && (arguments.elevation == DBL_MAX || arguments.azimuth == DBL_MAX)){
        ARGUMENT_ERROR_STATE = true;
        ARGUMENT_ERROR_STATE_MESSAGE = "Must provide [-e] and [-a] when using [-m]\n";
    }
}


int main(int argc, char *argv[]){
    struct arguments arguments;

    //Specifying default values for arguments struct.
    arguments.mode = NOTSET;
    arguments.elevation = DBL_MAX;
    arguments.azimuth = DBL_MAX;
    arguments.inputFile = NULL;
    arguments.outputFile = NULL;
#ifdef DEBUG
    arguments.test = false;
#endif

    argp_parse(&argp, argc, argv, 0, 0, &arguments);

    //Make sure flag conditions are met.
    checkFlags(arguments);
    if(ARGUMENT_ERROR_STATE){
        fprintf(stderr, "%s", ARGUMENT_ERROR_STATE_MESSAGE);
        exit(EXIT_FAILURE);//Error occured in flags, end program with failure.
    }

    //flag conditions met. Continue with program.
    arguments.outputFile = (arguments.outputFile != NULL) ? arguments.outputFile : generateOutputFilename();
    bool success = (arguments.mode == RANDOM)
        ? generateRandomDelays(arguments.outputFile)
        : generateModelledDelays(arguments.outputFile, arguments.inputFile,
                                    arguments.elevation, arguments.azimuth);
    if(success){
        fprintf(stdout, "File successfully written: %s", arguments.outputFile);
        return EXIT_SUCCESS;//Program succeeded, finish with success.
    }
    else{
        fprintf(stderr, "Failed to perform IO operations on file."); //TODO: Logging features.
        return EXIT_FAILURE;//Program failed, exit with code 1.
    }
}