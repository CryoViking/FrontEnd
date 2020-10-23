/* The subfile generator will take output of signals/noise/delay then combine them into .sub file
    author: Phi Long Nguyen*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <confini.h>
#include "subfile_generator.h"

static const int NUM_TILES = 256;
//load 256 csv delay file
/* arguments:
            filename -- a String
            delay -- a float*/

void load_delay_file(char *filename, float *delay){
    int counter = 0;
    delay = (float *) malloc(NUM_TILES);

    FILE *fptr;
    int lineRes;
    fptr = fopen(filename, "r");
    if (fptr == NULL){
        printf("Can't open the file!");
    }

    do{
        lineRes = fscanf(fptr, "%f[^;\n]", &delay[counter]);
        if (lineRes == 0){
            lineRes = fscanf(fptr, "%*c");
        }
        else{
            printf("counter number %d: %f\n", counter, delay[counter]);
            counter = counter + 1;
        }
    } while (lineRes != EOF && counter < NUM_TILES);

    fclose(fptr);

}

//DISPATCH handler for load_init_path()
static int callback(IniDispatch* disp, void* v_other) {
#define IS_KEY(KEY) \
    (ini_string_match_ii(KEY, disp->data, disp->format))

    if (disp->type != INI_KEY) {
        return 0;
    }

    //key match and parse value.
    if (IS_KEY("NOISE_MAGNITUDE")) {
        printf("Noise magnitude is:  %s \n", disp->value);
    }
    else if (IS_KEY("SIGNAL_TYPE")) {
        printf("signal type is:  %s \n", disp->value);
    }
    else if (IS_KEY("SINE_AMPLIFICATION")) {
        printf("sine amplification is:  %s \n", disp->value);
    }
    else if (IS_KEY("SINE_PHASE")) {
        printf("sine phase is:  %s \n", disp->value);
    }
    else if (IS_KEY("SINE_FREQUENCY")) {
        printf("sine frequency is:  %s \n", disp->value);
    }
    else if (IS_KEY("SINE_BASELINE")) {
        printf("sine baseline is:  %s \n", disp->value);
    }
    else if (IS_KEY("IMP_DURATION")) {
        printf("impulse duration is:  %s \n", disp->value);
    }
    else if (IS_KEY("IMP_AMPLIFICATION")) {
        printf("impulse amplification type is:  %s \n", disp->value);
    }
    else if (IS_KEY("IMP_BASELINE")) {
        printf("impulse baseline is:  %s \n", disp->value);
    }
    else if (IS_KEY("RWGN_MAGNITUDE")) {
        printf("noise magnitude is:  %s \n", disp->value);
    }

#undef IS_KEY

    return 0;
}

/* a wrapper for load_ini_path
    take config file to load

    arguments:
            filename -- a String
    */
void load_confini(){
    if (load_ini_path("../example_configfile.csv", INI_DEFAULT_FORMAT, NULL, callback, NULL)){
        fprintf(stderr, "could not load ini file.");
    }
}

//demo
int main(int argc, char const *argv[]){
    load_confini();
    return 0;
}

