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
import math


def resample(signal, sample_size, original_sample_size):
    print("Resampling")
    return sig.resample(signal, sample_size), np.linspace(0, original_sample_size, sample_size)


def generate_gauss(sample_size, magnitude=127):
    seed(1)
    print("Generating Signal")
    wave = [random.gauss(0, magnitude/3) for i in range(sample_size)]
    for i in wave:
        if i > 127:
            i = 127.0
        if i < -127:
            i = -127.0
    return wave

def generate_impulse(duration, baseline, sample_size, amplitude=127):
    impulse = sig.unit_impulse(duration + 1)
    multiple = math.ceil(float(sample_size) / float(duration))

    i = np.array(list(impulse) * multiple)
    i = i[:sample_size]
    y = np.arange(len(i))
    i = i * amplitude
    plt.plot(y, i)
    plt.xlabel('Time [Samples]')
    plt.ylabel('Amplitude')
    plt.show()

def generate_sine(frequency, baseline, sample_size, amplitude=127, phase=None):
    fs = sample_size
    f = frequency
    x = np.arange(fs)
    y = amplitude * np.sin(1 * np.pi * f * (x/fs))

    if phase:
        y = apply_delay(y, phsse)
    plt.stem(x, y, 'r')
    plt.plot(x, y)
    plt.show()
    return y


def read_delay_file(filename="delays.csv"):
    delays = []
    # delay file must be one row
    with open(filename) as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            delays = row
    return delays

def delay_signal(signal, delay):
    return signal[(999 + delay)::1000]

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
    delays = read_delay_file()
    #write_original_signals(original_signal, new_signal, perfect_output_file)
    #plt.plot(x[1:-1], original_signal[1:-1], color="blue")
    #a_delayed_signal = delay(signal=new_signal, delay=250)
    #plt.plot(x[1:-1], a_delayed_signal[1:-1], color="red")
    #b_delayed_signal = delay(signal=new_signal, delay=500)
    #plt.plot(x[1:-1], b_delayed_signal[1:-1], color="orange")
    #delayed_signal = delay_signal(signal=new_signal, delay=1000)
    #plt.plot(x[1:-1], delayed_signal[0:-1], color="green")
    for i in range(200):
        print(f"Writing voltage Block {i}")
        sample_size = (51200)+2
        x = range(sample_size)
        original_signal = generate_gauss(sample_size=sample_size, magnitude=127)
        new_signal, newX= resample(signal=original_signal, sample_size=MILLISAMPLE*sample_size, original_sample_size=sample_size)
        for delay in delays:
             quantized_delay = int(MILLISAMPLE * round(float(delay),3))
             #delayed_signal = splice_signal(signal=apply_delay(signal=new_signal, delay=quantized_delay), step=MILLISAMPLE)
             delayed_signal = delay_signal(signal=new_signal, delay=quantized_delay)
             #plt.plot(x, delayed_signal, color="green")
             if(len(delayed_signal[1:-1]) == sample_size-3):
                write_signal(delayed_signal[1:], output_file)
             else:
                write_signal(delayed_signal[1:-1], output_file)
    #plt.show()

if __name__ == "__main__":
     __main__()
#     generate_sine(4, 0, 1000, amplitude=4)
#    generate_impulse(5, 0, 100, amplitude=4)