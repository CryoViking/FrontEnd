#include <stdio.h>
#include <stdlib.h>

#include "noise_to_signal.h"

char* generateOutputFilename(){

}

float* readFile(char* filename, int sample_size, int channels){
    FILE *file = NULL;
    float values[channels*sample_size];
    int n = 0;

    file = fopen(filename, "r");
    if(file == NULL){
        fprintf(stderr, "Problem occured with reading in the file."); //TODO: Logging feature.
        return NULL;
    }

    while(fscanf(file, "%f", &values[n++]) == 1){
        if(fscanf(file, ",") == 0){//nott EOIF
            fscanf(file, "\n");//Filter
        }
    }

    fclose(file);
    return ...;
}
