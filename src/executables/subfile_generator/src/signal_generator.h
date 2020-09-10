struct signal_generator;

float getSineSignalValue(float time);
float getImpulseSignalValue(float time, float amplitude, float duration);
float getRandomGaussianSignalValue();
float* generateBlockRow();
float add_noise(float signal, float noise);
float ranu(long* iseed);
float getSignal(struct signal_generator signalGen ,float time);