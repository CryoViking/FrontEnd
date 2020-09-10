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
            value = signalGen.amplitude;
        else
            value = 0.0; //baseline
        break;
    case 2: //gaussian signal

        break;
    default:
        value = 0.0;
        break;
    }

    return (value * signalGen.amplitude);
}

//uniform random nubmer generator in range [0,1]
float ranu(long* iseed){
    //iseed = 7^5 * (iseed % (m/a)) - (m%a) * (iseed/ (m/a))
    //update seed
    *iseed = 16807 * (*iseed % 127773) - 2836 * (*iseed / 127773); 
    if(*iseed < 0){
        *iseed += 2147483647;
    }
    return (float) *iseed/ 2147483647.0;
}

float add_noise(float signal, float noise){
    return signal + noise;
}

//testing purpose
int main(int argc, char const *argv[])
{
    struct signal_generator generator;
    generator.signalType = 0; //choose type 
    generator.phase = 0;
    generator.frequency = 20; 
    generator.amplitude = 1;
    generator.duration = 10;
    

    time_t start = time(NULL);

    long iseed = 123456;
    float noise[100]; //example noise container

    //generate signal
    for (int i = 0; i < 100; i++)
    {
        printf("type anything to continue\n");
        getchar();
        time_t end = time(NULL);
        printf("perfect signal %f ", getSignal(generator, difftime(end, start)));
        //generate noise and add noise to signal 
        noise[i] = ranu(&iseed);
        float noise_and_signal = add_noise(getSignal(generator, difftime(end, start)), noise[i]);
        printf("signal after add noise %f ", noise_and_signal);

    }

    return 0;
}




