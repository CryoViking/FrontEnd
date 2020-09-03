#include <stdio.h>
#include <stdlib.h>
#include "subfile_generator.h"

const int NUM_TILES = 256;

void write_example()
{
    float numbers_example[256];
    FILE *fptr;

    fptr = fopen("/mnt/d/LinuxProject/capstone/2020-17-software-signal-generator/BackEnd/cpp/example_delay.csv", "w");

    if (fptr == NULL)
    {
        printf("Can't open the file!");
    }

    for (size_t i = 0; i < 256; i++)
    {
        numbers_example[i] = i + 0.5;
        if (i == 255)
        {
            fprintf(fptr, "%f", numbers_example[i]); //write to file
        }
        else
        {
            fprintf(fptr, "%f,", numbers_example[i]); //write to file
        }
    }
    fclose(fptr);
}

//load 256 csv delay file
float* load_delay_file(char* filename)
{
    int counter = 0;
    float delay[NUM_TILES];
    FILE *fptr;
    int lineRes;
    fptr = fopen(filename, "r");
    if (fptr == NULL)
    {
        printf("Can't open the file!");
    }

    do {
        lineRes = fscanf(fptr, "%f[^;\n]", &delay[counter]);
        if(lineRes == 0)
        {
            lineRes = fscanf(fptr, "%*c");
        }
        else
        {
            printf("counter number %d: %f\n", counter,  delay[counter]);
            counter = counter + 1;
        }
    } while(lineRes != EOF && counter < NUM_TILES);

    fclose(fptr); 

    return delay;
}
