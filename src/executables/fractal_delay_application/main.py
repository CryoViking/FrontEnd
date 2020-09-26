"""
Author: Nathan van der Velde
Date Created: 2020-9-22
GitHub: CryosisOS
"""

import numpy as np
from numpy.random import seed
from numpy.random import randn
import random
import scipy.interpolate
from scipy import signal as sig
import matplotlib.pyplot as plt
import csv
import os


def resample(signal, sample_size, original_sample_size):
    return sig.resample(signal, sample_size), np.linspace(0, original_sample_size, sample_size)


def generate_gauss(sample_size, magnitude=127):
    seed(1)
    return [random.gauss(0, magnitude/3) for i in range(sample_size)]

def generate_impulse(duration, baseline, sample_size, amplitude=127):
    pass

def generate_sine(phase, frequency, baseline, sample_size, amplitude=127):
    pass

def read_delay_file(filename="delays.csv"):
    delays = []
    # delay file must be one row
    with open(filename) as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            delays = row
    return delays

def apply_delay(signal, delay):
    def nextpow2(i):
      n = 1
      while n < i: n *= 2
      return n

    Nin = len(signal)
    N = nextpow2(Nin +np.max(np.abs(delay)))
    fdatin = np.fft.fft(signal, N)
    ik = np.array([2j*np.pi*k for k in np.arange(0, N)]) / N
    fshift = np.exp(-ik*delay)
    datout = np.real(np.fft.ifft(fshift * fdatin))
    datout = datout[0:Nin]
    return datout

def splice_signal(signal, step):
    return signal[0::step]

def reset_output_file(filename):
    try:
        os.remove(filename)
    except OSError:
        pass

def write_signal(signal, filename):
    print(len(signal))
    with open(filename, "a+") as file:
        writer = csv.writer(file)
        writer.writerow(signal)

def write_original_signals(signal, sampled_signal, filename):
    with open(filename, "w+") as file:
        writer = csv.writer(file)
        file.write("Original:")
        writer.writerow(signal)
        file.write("Sampled:")
        writer.writerow(sampled_signal)

def __main__():
    MILLISAMPLE = 1000
    output_file = "./output/delayed_signals.csv"
    perfect_output_file = "./output/perfect_signal.csv"
    reset_output_file(output_file)
    sample_size = 100
    x = range(sample_size)
    original_signal = generate_gauss(sample_size=sample_size, magnitude=127)
    new_signal, newX= resample(signal=original_signal, sample_size=MILLISAMPLE*sample_size, original_sample_size=sample_size)
    write_original_signals(original_signal, new_signal, perfect_output_file)
    #plt.plot(x, original_signal, color="blue")
    for delay in read_delay_file():
        quantized_delay = int(MILLISAMPLE * round(float(delay),3))
        delayed_signal = splice_signal(signal=apply_delay(signal=new_signal, delay=quantized_delay), step=MILLISAMPLE)
        #plt.plot(x, delayed_signal, color="green")
        write_signal(delayed_signal, output_file)
    #plt.show()

if __name__ == "__main__":
    __main__()