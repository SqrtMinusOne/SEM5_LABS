from matplotlib import pyplot as plt
from matplotlib import mlab
from scipy import special
from scipy import optimize
import math
from scipy import constants

r = 0.92
eps = 7.1
omg = 45.0
k_z = 2 * math.pi * 10**9

class Bessel:
    def __init__(self):
        self.figure = plt.figure()
        self.omg = omg
        self.step = 0.1
        self.intervals = []
        self.roots = []

    def bessel(self):
        x_s = mlab.frange(0.0, self.omg, self.step)  # Calculate Bessel function
        y_s = [special.j0(x) for x in x_s]
        self.intervals = Bessel.get_intervals(x_s, y_s, 10)  # Calculate intervals for roots
        self.roots = [optimize.bisect(special.j0, i[0], i[1]) for i in self.intervals]
        plt.title("Bessel function")
        plt.grid()
        plt.xticks(range(0, int(self.omg + 1), 1))
        plt.plot(x_s, y_s)  # Plot function
        print("Bessel function roots")
        for i in self.roots:
            plt.scatter(i, 0, color='black', s=20)
            print(i)
        plt.show()

    @staticmethod
    def get_intervals(x_list, y_list, limit=0):
        k = y_list[0]
        a = []
        for i in range(1, len(y_list)):
            if y_list[i] * k < 0:
                a.append([x_list[i - 1], x_list[i]])
            if 0 < limit <= len(a):
                break
            k = y_list[i]
        return a


class Speeds:
    def __init__(self, bsl):
        self.bessel = bsl

    def speeds(self):
        x_s = mlab.frange(0.0, omg, 0.005)
        for i in self.bessel.roots:
            plt.plot(x_s, [self.ps(w * k_z, i) for w in x_s])
        x_s_2 = list(x_s)
        for j in self.bessel.roots:
            plt.plot(x_s, [Speeds.gd(x_s_2[i], x_s_2[i+1], j) for i in range (len(x_s) - 1)])

        plt.ylim((0, 4e8))
        plt.xlim((0, 1.5))
        plt.grid()
        plt.show()

    @staticmethod
    def ps(w, x): # Phase speed
        znam = w ** 2 * eps / constants.c**2 - x ** 2 / r ** 2
        if znam <= 0.0:
            return math.inf
        else:
            return w / math.sqrt(znam)

    @staticmethod
    def gd(w_1, w_2, x): # Group speed
        w_1 *= k_z
        w_2 *= k_z
        v_1 = Speeds.ps(w_1, x)
        v_2 = Speeds.ps(w_2, x)
        if v_1 == math.inf or v_2 == math.inf:
            return math.inf
        part_w = w_2 - w_1
        part_v = v_2 - v_1
        return part_w / ((part_w - w_1 * part_v/v_1) / v_1)

bessel = Bessel()
bessel.bessel()
ps = Speeds(bessel)
ps.speeds()
