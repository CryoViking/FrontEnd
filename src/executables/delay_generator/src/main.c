/**
 * Author: Nathan van der Velde
 * Date Created: 2020-09-02
 * GitHub: CryosisOS
 */

//Standard Imports
#include <stdio.h>
#include <stdlib.h>
#include <argp.h>
#include <stdbool.h>

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
    {"3DModel", 'm', 0, 0, "Generate delay file based upon a 3D model, given coordinate file."},
    {"coordfile", 'c', "FILE", 0, "Coordinate File to be passed"},
    {0}
};

struct arguments {
    enum {
        NOTSET,
        RANDOM,
        MODEL
    } mode;
    char* inputFile;
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
        case ARGP_KEY_ARG:
            return 0;
        default:
            return ARGP_ERR_UNKNOWN;
    }
    return 0;
}

static struct argp argp = { options, parse_opt, args_doc, doc };

int main(int argc, char *argv[]){
    struct arguments arguments;

    arguments.mode = NOTSET;
    arguments.inputFile = NULL;

    argp_parse(&argp, argc, argv, 0, 0, &arguments);

    //printf ("OUTPUT_FILE = %s\n"
    //        "Delay Type = %d\n",
    //        arguments.inputFile,
    //        arguments.mode
    //        //(arguments.mode-1) ? "RANDOM" : "MODEL"
    //        );

    if(arguments.mode != MODEL && arguments.inputFile != NULL){
        ARGUMENT_ERROR_STATE = true;
        ARGUMENT_ERROR_STATE_MESSAGE = "Cannot use [-c] without [-m].\n";
    }
    if(arguments.mode == MODEL && arguments.inputFile == NULL){
        ARGUMENT_ERROR_STATE = true;
        ARGUMENT_ERROR_STATE_MESSAGE = "Must provide [-c] when using [-m] and must provide a file path to [-c].\n";
    }

    if(ARGUMENT_ERROR_STATE){
        printf("%s", ARGUMENT_ERROR_STATE_MESSAGE);
        exit(0);
    }

    return 0;
}