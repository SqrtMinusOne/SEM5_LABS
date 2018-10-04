from core import *
from matplotlib import pyplot as plt

b = Bessel()
print(b.do_calculation())
b.plot(plt.figure(1))

s = Speeds(b)
s.plot_velocities(plt.figure(2))
plt.show()