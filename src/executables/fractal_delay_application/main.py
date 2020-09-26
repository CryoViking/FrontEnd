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
from scipy import signal
import matplotlib.pyplot as plt

seed(1)
x = range(100)
waveform = [random.gauss(0, 127/3) for i in x]
plt.plot(waveform, 'ro')
#plt.show()

f = signal.resample(waveform, 100000)
newX = np.linspace(0,100,100000)
plt.plot(x, waveform, color="blue")
plt.plot(newX, f,color="red")
plt.show()

