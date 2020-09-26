"""
Author: Nathan van der Velde
Date Created: 2020-9-22
GitHub: CryosisOS
"""

import numpy as np
import scipy.interpolate
import matplotlib.pyplot as plt
from scipy import signal
from scipy.fftpack import fft, fftshift
import matplotlib.pyplot as plt
import numpy as np # to work with numerical data efficiently

window = signal.gaussian(1000, std=40)
samples = np.random.choice(window, 8002)

plt.stem(np.arange(8002),samples, 'r', )
plt.plot(np.arange(8002),samples)


def getSineArray():
    xarr = np.arange(0, 10, 0.1)
    yarr = np.sin(xarr)
    return xarr, yarr

x_parabola, y_parabola = getSineArray()

plt.figure()
u = plt.plot(x_parabola,y_parabola,'ro') # plot the points)
t = np.linspace(0, len(x_parabola), len(x_parabola)*1000) # parameter t to parametrize x and y
pxLagrange = scipy.interpolate.lagrange(t, x_parabola) # X(T)
pyLagrange = scipy.interpolate.lagrange(t, y_parabola) # Y(T)
n = 50
ts = np.linspace(t[0],t[-1],n)
xLagrange = pxLagrange(ts) # lagrange x coordinates
yLagrange = pyLagrange(ts) # lagrange y coordinates
plt.plot(xLagrange, yLagrange,'b-',label = "Polynomial")
plt.show()

#for y in yLagrange:
#    print(y)

def __main__():
    time = np.arange(0, 10, 0.1);
    amplitude = np.sin(time)
    plt.plot(time, amplitude)

    lp = LagrangePoly(time, amplitude)

    xx = np.arange(0, 10)

    #plt.plot(xx, lp.basis(xx, 0))
    #plt.plot(xx, lp.basis(xx, 1))
    #plt.plot(xx, lp.basis(xx, 2))
    #plt.plot(xx, lp.basis(xx, 3))
    plt.plot(xx, lp.interpolate(xx))
    plt.show()

#if __name__ == "__main__":
#    __main__()
