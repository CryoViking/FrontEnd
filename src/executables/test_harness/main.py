"""
Author:
Date Created:
GitHub:
Description:
"""

# IMPORTS
import csv

# FUNCTIONS
def read_file(filename):
    lines = []
    with open(filename,'r') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            lines = row
    return lines

# MAIN METHOD
def __main__():
    delays_res = read_file("./res/delays.csv")
    assert len(delays_res) == 256, "delays generator failed: number of samples != 256, failed size: {}".format(len(delays_res))
    for delay_str in delays_res:
        delay = float(delay_str)
        assert -1.0 <= delay <= 1.0, "delays generator failed: delay generated must be: -1.0 <= delay <= 1.0, failed value: {:f}".format(delay)
    print("delays generator: passed")
    for noise_str in read_file("./res/noise.csv"):
        noise = float(noise_str)
        assert -127.0 <= noise <= 127.0, "noise generated must be: -127.0 <= noise <= 127, failed value:{:f}".format(noise)
    print("noise generator: passed")


if __name__ == "__main__":
    __main__()