"""
Author: Nathan van der Velde
Date Created: 2020-9-22
GitHub: CryosisOS
"""

import numpy as np
import scipy.interpolate
import matplotlib.pyplot as plt

def getSineArray():
    xarr = np.arange(0, 10, 0.1)
    yarr = np.sin(xarr)
    return xarr, yarr

x_parabola, y_parabola = getSineArray()
print(x_parabola)
print(y_parabola)

plt.figure()
u = plt.plot(x_parabola,y_parabola,'ro') # plot the points)
plt.show()
t = np.linspace(start=0, stop=len(x_parabola), num=1000*len(x_parabola)) # parameter t to parametrize x and y
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