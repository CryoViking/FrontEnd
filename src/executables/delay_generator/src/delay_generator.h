/**
 * Author: Nathan van der Velde
 * Date Created: 2020-09-02
 * GitHub: CryosisOS
 */
#ifndef DELAY_GENERATOR_H
#define DELAY_GENERATOR_H

#include <stdbool.h>

char* generateOutputFilename();
bool generateRandomDelays(char*);
bool generateModelledDelays(char*, char*, double, double);

#endif