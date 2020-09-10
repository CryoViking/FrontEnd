#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <confini.h>
#include "subfile_generator.h"

const int NUM_TILES = 256;

void write_example(){
    float numbers_example[256];
    FILE *fptr;

    fptr = fopen("../example_delay.csv", "w");

    if (fptr == NULL){
        printf("Can't open the file!");
    }

    for (size_t i = 0; i < 256; i++){
        numbers_example[i] = i + 0.5;
        if (i == 255){
            fprintf(fptr, "%f", numbers_example[i]);
        }
        else{
            fprintf(fptr, "%f,", numbers_example[i]); 
        }
    }
    fclose(fptr);
}

//load 256 csv delay file
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

//DISPATCH handler
static int callback(IniDispatch *disp, void *v_other){
#define IS_KEY(KEY) \
    (ini_string_match_ii(KEY, disp->data, disp->format))

    if (disp->type != INI_KEY){
        return 0;
    }

    //key match and parse value.
    if (IS_KEY("NOISE_MAGNITUDE")){
        printf("Noise magnitude is:  %s \n", disp->value);
    }else if(IS_KEY("SIGNAL_TYPE")){
        printf("signal type is:  %s \n", disp->value);
    }else if(IS_KEY("SINE_AMPLIFICATION")){
        printf("sine amplification is:  %s \n", disp->value);
    }else if(IS_KEY("SINE_PHASE")){
        printf("sine phase is:  %s \n", disp->value);
    }else if(IS_KEY("SINE_FREQUENCY")){
        printf("sine frequency is:  %s \n", disp->value);
    }else if(IS_KEY("SINE_BASELINE")){
        printf("sine baseline is:  %s \n", disp->value);
    }else if(IS_KEY("IMP_DURATION")){
        printf("impulse duration is:  %s \n", disp->value);
    }else if(IS_KEY("IMP_AMPLIFICATION")){
        printf("impulse amplification type is:  %s \n", disp->value);
    }else if(IS_KEY("IMP_BASELINE")){
        printf("impulse baseline is:  %s \n", disp->value);
    }else if(IS_KEY("RWGN_MAGNITUDE")){
        printf("noise magnitude is:  %s \n", disp->value);
    }

#undef IS_KEY

    return 0;
}

void load_confini(){
    if (load_ini_path("../example_configfile.csv", INI_DEFAULT_FORMAT, NULL, callback, NULL)){
        fprintf(stderr, "");
    }
}

int main(int argc, char const *argv[]){
    load_confini();
    return 0;
}

