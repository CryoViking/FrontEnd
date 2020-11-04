/**
 * Author: Nathan van der Velde
 * Date Created: 2020-09-02
 * GitHub: CryosisOS
 */

//Standard Imports
#include <float.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

//Library Imports

//Local Imports
#include "delay_generator.h"


int main(int argc, char *argv[]){
    int numDelays = 256;
    char* filename = "delays.csv";
    bool success = generateRandomDelays(filename, numDelays);
    if(success){
        fprintf(stdout, "File successfully written: %s\n", filename);
        return EXIT_SUCCESS;//Program succeeded, finish with success.
    }
    else{
        fprintf(stderr, "Failed to perform IO operations on file.\n"); //TODO: Logging features.
        return EXIT_FAILURE;//Program failed, exit with code 1.
    }
}