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
#include "noise_to_signal.h"

//Constants
static bool ARGUMENT_ERROR_STATE = false;
static char *ARGUMENT_ERROR_STATE_MESSAGE;
const char *argp_program_version = "delay_generator v1.0";
const char *argp_program_bug_address = "19127600@student.curtin.edu.au";
static char doc[] = "This command line tool is used to generated delay files used in the proposed system being developed by Capstone Group 17.";
static char args_doc[] = "N/A";

static struct argp_option options[] = {
    {"noise", 'n', "FILE", 0, "Specify the noise filename"},
    {"signal", 's', "FILE", 0, "Specify the signal filename."},
#ifdef DEBUG
    {"test", 't', 0, 0, "Run the test harness."},
#endif
    {"output", 'o', "FILE", 0, "Specify the output filename, otherwise uses default."},
    {0}
};

struct arguments {
    char* signal_file;
    char* noise_file;
    char* output_file;
#ifdef DEBUG
    bool test;
#endif
}V;

static error_t parse_opt(int key, char *arg, struct argp_state *state){
    struct arguments *arguments = state->input;
    switch (key){
        case 'o':
            arguments->outputFile = arg;
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


int main(int argc, char *argv[]){
    struct arguments arguments;

    //Specifying default values for arguments struct.
    arguments.noise_file = NULL;
    arguments.output_file = NULL;
#ifdef DEBUG
    arguments.test = false;
#endif

    argp_parse(&argp, argc, argv, 0, 0, &arguments);

    //Make sure flag conditions are met.
    if(ARGUMENT_ERROR_STATE){
        fprintf(stderr, "%s", ARGUMENT_ERROR_STATE_MESSAGE);
        exit(EXIT_FAILURE);//Error occured in flags, end program with failure.
    }

    //flag conditions met. Continue with program.
    arguments.output_file = (arguments.output_file != NULL) ? arguments.output_file : generateOutputFilename();

    bool success = add_noise_to_signal();
    if(success){
        fprintf(stdout, "File successfully written: %s\n", arguments.output_file); //TODO: Logging features.
        return EXIT_SUCCESS;//Program succeeded, finish with success.
    }
    else{
        fprintf(stderr, "Failed to perform IO operations on file.\n"); //TODO: Logging features.
        return EXIT_FAILURE;//Program failed, exit with code 1.
    }
}
