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

/*
Commented out for now, since there seems to be an issue with the method.
Can't seem to resolve it. Here as an artifact if someone wants to ressurect it.
*/
//char* generateOutputFilename(){
//    time_t t;
//    struct tm* tm;
//    char date_arr[11], time_arr[11];
//    time(&t);
//    tm = localtime(&t);
//    strftime(date_arr, sizeof(date_arr), "%Y:%m:%d", tm);
//    strftime(time_arr, sizeof(time_arr), "%I:%M:%S", tm);
//    //Format string
//    char filename[27];
//    sprintf(filename, "%s", date_arr);
//    sprintf(filename, "-%s", time_arr);
//    sprintf(filename, "%s", "_delays.csv");
//    printf("%s\n", filename);
//    return filename;
//}

bool generateRandomDelays(char* outputFilename, int numDelays){
    float MAX = 1, MIN = -1;
    FILE* file = NULL;
    file = fopen(outputFilename, "w+");
    if(file == NULL){
        return false;
    }
    for(int ii=0;ii<numDelays;ii++){
        float scale = (float)rand()/(float)(RAND_MAX);
        float rand = MIN+scale*(MAX-MIN);
        if(ii!=numDelays-1){
            fprintf(file, "%f,", rand);
        }
        else{
            fprintf(file, "%f", rand);
        }
    }
    fclose(file);
    return true;
}