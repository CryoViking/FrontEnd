/**
 * Author: Nathan van der Velde
 * Date Created: 2020-09-02
 * GitHub: CryosisOS
 */

//Standard Imports
#include <float.h>
#include <stdbool.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>

//Library Imports

//Local Imports
#include "delay_generator.h"

/*
TODO: List
    - Take in a single command line argument
        - The directory of the folder to output the file to.
*/

typedef struct Arguments{
    const char* outputDir;
};

bool checkFolderExists(char* filepath){
    struct stat sb;
    if(stat(filepath, &sb) == 0 & S_ISDIR(sb.st_mode)){
        return true; //Folder exists
    }
    else{
        return false;//Folder Does not exists
    }
}

struct Arguments parseArgs(int argc, char* argv[]){
    struct Arguments args;
    if(argc != 2){
        fprintf(stderr, "ERROR: Not enough arguments provided, the program expects a string to be given.");
        args.outputDir = NULL;
        return args;
    }
    strcpy(args.outputDir, argv[1]);
    return args;
}

int main(int argc, char *argv[]){
    struct Arguments args = parseArgs(argc, argv);
    if(args.outputDir == NULL){
        exit(1);
    }
    int numDelays = 256;
    char filepath[strlen(args.outputDir)+strlen("./delays.csv")+1];
    strcpy(filepath, args.outputDir);
    if(!checkFolderExists(filepath) == true){
        fprintf(stderr, "ERROR: The folder provided does not exist.");
        exit(1);
    }
    strcat(filepath, "/delays.csv");
    bool success = generateRandomDelays(filepath, numDelays);
    if(success){
        fprintf(stdout, "File successfully written: %s\n", filepath);
        return EXIT_SUCCESS;//Program succeeded, finish with success.
    }
    else{
        fprintf(stderr, "Failed to perform IO operations on file.\n"); //TODO: Logging features.
        return EXIT_FAILURE;//Program failed, exit with code 1.
    }
}