"""
Tega and Nathan 26th September 2020
"""
import numpy as np
from numpy.random import seed
from numpy.random import randn
import random
import os
import csv

def reset_output_file(filename):
    try:
        os.remove(filename)
    except OSError:
        pass

def write_file(signal, filename):
    print(len(signal))
    with open(filename, "a+") as file:
        writer = csv.writer(file)
        writer.writerow(signal)

def generate_gauss(sample_size, magnitude=127):
    seed(1)
    wave = [random.gauss(0, magnitude/3) for i in range(sample_size)]
    for i in wave:
        if i > 127:
            i = 127.0
        if i < -127:
            i = -127.0
    return wave

def __main__():
    output_filename = "./output/noise.csv"
    reset_output_file(output_filename)
    sample_size = 8002
    for i in range(256):
        signal = generate_gauss(sample_size=8002)
        write_file(filename=output_filename, signal=signal)

if __name__ == "__main__":
    __main__()