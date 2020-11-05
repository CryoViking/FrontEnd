"""
Author: Nathan van der Velde
Date Created: 2020-9-22
GitHub: CryosisOS
"""
import struct
import sys
from argparse import ArgumentParser

import numpy as np
from numpy.random import seed
from numpy.random import randn
import random
import scipy.interpolate
from scipy import signal as sig
# import matplotlib.pyplot as plt
import csv
import os
import math


def resample(signal, sample_size, original_sample_size):
    # print("Resampling")
    return sig.resample(signal, sample_size), np.linspace(0, original_sample_size, sample_size)


def generate_gauss(sample_size, magnitude=127):
    seed(1)
    print("Generating Signal")
    wave = [random.gauss(0, magnitude / 3) for i in range(sample_size)]
    for i in wave:
        if i > 127:
            i = 127.0
        if i < -127:
            i = -127.0
    return wave


def generate_complex_wave(sample_size, magnitude=127):
    seed(1)

    phi = 2.0 * np.pi * np.random.random(sample_size)
    r = np.random.normal(loc=0.0, scale=magnitude / 3, size=sample_size)

    x = r * np.cos(phi)
    y = r * np.sin(phi)
    return x, y


def generate_complex_noise(sample_size, snr=1, magnitude=127):
    seed(1)

    phi = 2.0 * np.pi * np.random.random(sample_size)
    r = np.random.normal(loc=0.0, scale=snr * (magnitude / 3), size=sample_size)

    x = r * np.cos(phi)
    y = r * np.sin(phi)

    return x, y


def generate_impulse(duration, baseline, sample_size, amplitude=127):
    impulse = sig.unit_impulse(duration + 1)
    multiple = math.ceil(float(sample_size) / float(duration))

    i = np.array(list(impulse) * multiple)
    i = i[:sample_size]
    y = np.arange(len(i))
    i = i * amplitude
    # plt.plot(y, i)
    # plt.xlabel('Time [Samples]')
    # plt.ylabel('Amplitude')
    # plt.show()
    return y, i


def generate_sine(frequency, baseline, sample_size, amplitude=127, phase=None):
    fs = sample_size
    f = frequency
    x = np.arange(fs)
    y = amplitude * np.sin(1 * np.pi * f * (x / fs))

    if phase:
        y = apply_delay(y, phase)
#     plt.stem(x, y, 'r')
#     plt.plot(x, y)
#     plt.show()
    return x, y


def read_delay_file(filename="delays.csv"):
    delays = []
    # delay file must be one row
    with open(filename) as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            delays = row
    return delays


def delay_signal(signal, delay):
    return signal[(999999 + delay)::1000000]


def apply_delay(signal, delay):
    def nextpow2(i):
        n = 1
        while n < i: n *= 2
        return n

    Nin = len(signal)
    N = nextpow2(Nin + np.max(np.abs(delay)))
    fdatin = np.fft.fft(signal, N)
    ik = np.array([2j * np.pi * k for k in np.arange(0, N)]) / N
    fshift = np.exp(-ik * delay)
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
    # how writing to binary file is performed
    # https://docs.python.org/3/library/struct.html
    parser = ArgumentParser()

    # optional arguments of for the subfile generator
    parser.add_argument('--delay_file', nargs='?', type=str, help='specify delay file to be used')
    parser.add_argument('--wave_type', nargs='?', type=str, help='wave form - sinusoidal | impulse | gaussian ')
    parser.add_argument('--subfile_output_dir', nargs='?', type=str, help='set the subfile output dir/otherwise use current dir')
    parser.add_argument('--number_of_tiles', nargs='?', type=int, help='set the num of tiles')
    parser.add_argument('--snr', nargs='?', type=int, help='signal to noise ratio')
    parser.add_argument('--number_of_millisamples', nargs='?', type=str, help='for more accurate interpolation set to higher value')
    parser.add_argument('--header_file', type=str, help='header file')

    # optional arguments for sine wave
    parser.add_argument('--frequency', nargs='?', type=int, help='frequency of sine wave')
    parser.add_argument('--phase', nargs='?', type=int, help='phase to apply to sine wave')
    parser.add_argument('--amplification', nargs='?', type=int, help='sine wave amplification')

    # optional arguments for impulse wave
    parser.add_argument('--duration', nargs='?', type=int, help='duration of impulse wave')

    # shared optional arguments for both
    parser.add_argument('--baseline', nargs='?', type=int, help='baseline to apply to sine and impulse wave')

    namespace = parser.parse_args(sys.argv[1:])

    if namespace.number_of_millisamples:
        MILLISAMPLE = namespace.number_of_millisamples
    else:
        MILLISAMPLE = 100
    output_file = "./output/delayed_signals.csv"
    perfect_output_file = "./output/perfect_signal.csv"
    # reset_output_file(output_file)

    """
    General parameters for subfile generation
    """
    if namespace.delay_file:
        delays = read_delay_file(filename=namespace.delay_file)
    else:
        delays = read_delay_file()

    if namespace.subfile_output_dir:
        output_filename = f'{namespace.subfile_output_dir}/out.sub'
    else:
        output_filename = 'out.sub'

    if namespace.number_of_tiles:
        numTiles = namespace.number_of_tiles
    else:
        numTiles = 128

    """
    Noise parameter: snr - signal to noise ratio
    """
    if namespace.snr:
        snr = namespace.snr
    else:
        snr = 1

    """
    Sine wave type specific parameters
    """
    if namespace.frequency:
        frequency = namespace.frequency
    else:
        frequency = 4

    if namespace.baseline:
        baseline = namespace.baseline
    else:
        baseline = namespace.baseline

    if namespace.phase:
        phase = namespace.phase
    else:
        phase = None

    """
    Impulse wave type specific parameters
    """
    if namespace.duration:
        duration = namespace.duration
    else:
        duration = 5

    # write_original_signals(original_signal, new_signal, perfect_output_file)
    # plt.plot(x[1:-1], original_signal[1:-1], color="blue")
    # a_delayed_signal = delay(signal=new_signal, delay=250)
    # plt.plot(x[1:-1], a_delayed_signal[1:-1], color="red")
    # b_delayed_signal = delay(signal=new_signal, delay=500)
    # plt.plot(x[1:-1], b_delayed_signal[1:-1], color="orange")
    # delayed_signal = delay_signal(signal=new_signal, delay=1000)
    # plt.plot(x[1:-1], delayed_signal[0:-1], color="green")
    s = open(namespace.header_file, 'r')
    string = s.read()
    s.close()
    a = string.encode('ascii')

    with open(output_filename, "ba") as subfile:
        # out_file = open(output_filename, "ba")
        header = struct.pack("b" * len(a), *a)
        subfile.write(header)

        for i in range(200):
            for j in range(numTiles * 2):

                print(f"Writing voltage Block: {i} Tile: {j}", flush=True)
                sample_size = (51200) + 2
                x = range(sample_size)

                if namespace.wave_type == "gaussian":
                    original_signal_x, original_signal_y = generate_complex_wave(sample_size=sample_size, magnitude=127)
                elif namespace.wave_type == "sinusoidal":
                    original_signal_x, original_signal_y = generate_sine(frequency, baseline, sample_size, amplitude=127, phase=phase)
                elif namespace.wave_type == "impulse":
                    original_signal_x, original_signal_y = generate_impulse(duration, baseline, sample_size, amplitude=127)
                else:
                    exit(1)

                noise_x, noise_y = generate_complex_noise(sample_size=sample_size, snr=snr)
                # now interpolate the real and imaginary parts of this signal

                new_signal_x, _ = resample(signal=original_signal_x, sample_size=int(MILLISAMPLE) * sample_size,
                                           original_sample_size=sample_size)
                new_signal_y, _ = resample(signal=original_signal_y, sample_size=int(MILLISAMPLE) * sample_size,
                                           original_sample_size=sample_size)

                for delay in delays:
                    quantized_delay = int(int(MILLISAMPLE) * round(float(delay), 6))
                    # delayed_signal = splice_signal(signal=apply_delay(signal=new_signal, delay=quantized_delay), step=MILLISAMPLE)
                    delayed_signal_x = delay_signal(signal=new_signal_x, delay=quantized_delay)
                    delayed_signal_y = delay_signal(signal=new_signal_y, delay=quantized_delay)
                    # plt.plot(x, delayed_signal, color="green")

                    for x, y, noisex, noisey in zip(delayed_signal_x, delayed_signal_y, noise_x, noise_y):
                        c = complex(x, y)
                        c_noise = complex(noisex, noisey)

                        c_plus_noise = c + c_noise
                        s = struct.pack('bb', int(c_plus_noise.real), int(c_plus_noise.imag))
                        subfile.write(s)

        # plt.show()


if __name__ == "__main__":
    # print(generate_complex_wave(100))
    __main__()
#     generate_sine(4, 0, 1000, amplitude=4)
#    generate_impulse(5, 0, 100, amplitude=4)
