/**
 * Author: Nathan van der Velde
 * Date Created: 2020-09-03
 * GitHub: CryosisOS
 * StudentID: 19127600
 */


//Standard Imports
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

//Library Imports

//Local Imports
#include "delay_generator.h"

char* generateOutputFilename(){
    return "";
}

const int NUM_TILES = 256;

typedef struct {
    double longitude;
    double latitude;
} coord;

coord** parseCoordFile(char* filename){
    coord** coordinates = NULL;
    FILE* file;
    char* line = NULL;
    size_t len = 0;

    file = fopen(filename, "r");
    if(file == NULL){
        return coordinates;
    }
    coordinates = (coord**)malloc(NUM_TILES*sizeof(coord*));
    int count = 0;
    while(getline(&line, &len, file)){
        if(line[0] != '#'){
            int _;
            coord* coordinate = (coord*)malloc(sizeof(coord));
            coordinates[++count] = sscanf(line, "T%d:%lf,%lf", &_, &(coordinate->longitude), &(coordinate->longitude));
        }
    }
    fclose(file);
    if(line){
        free(line);
    }
    return coordinates;
}

float* calcDelay(coord** coordinates, double elevation, double azimuth){
    float delays[NUM_TILES];
    return delays;
}

char* generateOutputFilename(){
    time_t t;
    struct tm* tm;
    char date_arr[11], time_arr[11];

    //Get time
    time(&t);
    tm = localtime(&t);
    strftime(date_arr, sizeof(date_arr), "%Y:%m:%d", tm);
    strftime(time_arr, sizeof(time_arr), "%I:%M:%S", tm);
    //Format string
    const char* filename;
    strcat(filename, date_arr); strcat(filename, "-"); strcat(filename, time_arr);
    strcat(filename, "_delays.csv");
    return filename;
}

bool generateRandomDelays(char* outputFilename){
    float MAX = 1, MIN = -1;
    FILE* file = NULL;
    file = fopen(outputFilename, "w+");
    if(file == NULL){
        return false;
    }
    for(int ii=0;ii<NUM_TILES;ii++){
        float scale = (float)rand()/(float)(RAND_MAX);
        float rand = MIN+scale*(MAX-MIN);
        if(ii!=NUM_TILES-1){
            fprintf(file, "%f,", rand);
        }
        else{
            fprintf(file, "%f", rand);
        }
    }
    fclose(file);
    return true;
}

bool generateModelledDelays(char* outputFilename, char* coordinateFile, double elevation, double azimuth){
    coord* coordinates = parseCoordFile(coordinateFile);
    if(coordinates == NULL){
        return false;
    }

    //TODO: Delay Calc functions
    float* delays = calcDelay(coordinates, elevation, azimuth);
    free(coordinates);
    return true;
}