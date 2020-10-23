"""Noise Generator.

Generate Gaussian white noise using random gaussian distribution.
write generated noise to noise.csv a file which located in ./output.
"""

__version__ = '0.1'
__author__ = 'Tega and Nathan'
__date__ = '26th September 2020'

import numpy as np
from numpy.random import seed
from numpy.random import randn
import random
import os
import csv


def reset_output_file(filename):
    '''Delete a file.

    arguments:
    filename -- a String
    exception:
    catch -- file not found exception
    '''
    try:
        os.remove(filename)
    except OSError:
        pass

def write_file(signal, filename):
    '''Write to file

    write generated noise to a file/ absolute path to file.

    arguments:
    signal -- float nubmers
    filename -- a String
    '''
    print(len(signal))
    with open(filename, "a+") as file:
        writer = csv.writer(file)
        writer.writerow(signal)

def generate_gauss(sample_size, magnitude=127):
    '''Generate gaussian noise

    using random gaussian distribution number to generate noise. 

    arguments:
    sample_size -- integer number 
    magnitude -- integer number
    '''
    seed(1)
    wave = [random.gauss(0, magnitude/3) for i in range(sample_size)]
    for i in wave:
        if i > 127:
            i = 127.0
        if i < -127:
            i = -127.0
    return wave

def __main__():
    output_filename = "./output/noise.csv" # File location
    reset_output_file(output_filename) # flush output file
    sample_size = 8002
    for i in range(256):
        signal = generate_gauss(sample_size=8002) # generate noise
        write_file(filename=output_filename, signal=signal) # write to file

if __name__ == "__main__":
    __main__()