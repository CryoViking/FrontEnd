#include <stdio.h>
#include <math.h>
#include <time.h>
#include "signal_generator.h"

#define PI 3.14159265
struct signal_generator
{
    int signalType; 
    //for sine wave
    float frequency;
    float phase;
    float amplitude;
    //for impulse
    float duration;
    //for gaussian whitenoise
    float noise_magnitude;
};

//get signal at real 'time'
//get value x = signal(t) 
float getSignal(struct signal_generator signalGen ,float time){
    float value = 0.0;
    float t = signalGen.frequency * time + signalGen.phase;
    printf("signal at %f s \n", time);
    //return a value depend on the type of signal
    switch (signalGen.signalType) 
    {
    case 0: //sine Wave : https://en.wikipedia.org/wiki/Waveform
        value = (float) sin(2.0 * PI * t /180.0); //half circle 
        break;
    case 1: //impulse signal: infinite impulse response
        //give condition for finite impulse response
        //with brief input ex: [0,0,1,0,0,1,0,0]
        if((fmod(time,signalGen.duration)) == 0.0)//impulse every (duration)
            value = 1.0;
        else
            value = 0.0;
        break;
    case 2: //gaussian signal

        break;
    default:
        value = 0.0;
        break;
    }

    return (value * signalGen.amplitude);
}

//testing purpose
int main(int argc, char const *argv[])
{
    struct signal_generator generator;
    generator.signalType = 0; 
    generator.phase = 0;
    generator.frequency = 20; 
    generator.amplitude = 1;
    generator.duration = 10;
    

    time_t start = time(NULL);

    
    for (int i = 0; i < 100; i++)
    {
        printf("type anything to continue\n");
        getchar();
        time_t end = time(NULL);
        printf("%f ", getSignal(generator, difftime(end, start))); 
    }
    return 0;
}




