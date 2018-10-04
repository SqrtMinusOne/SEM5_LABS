from matplotlib import pyplot as plt
from matplotlib import mlab
from scipy import special
from scipy import optimize
import math
from scipy import constants
import numpy as np

class Bessel:
    eps = 7.1
    R = 0.92e-2
    omg = 2 * constants.pi * 10 ** 9 * 70
    precision = 10000

    def __init__(self):
        self.votn_rng = []
        self.bessel_rng = []
        self.votn_roots = []
        self.roots = []

    def set_params(self, eps, R, coef, precision):
        self.eps = eps
        self.R = R
        self.omg = 2 * constants.pi * 10 ** 9 * coef
        self.precision = precision

    def k(self, omg, votn):
        t = self.eps - 1 / votn ** 2
        if t < 0:
            return math.inf
        else:
            return omg / constants.c * math.sqrt(t)

    def jfunc(self, votn, omega=0):
        if omega == 0:
            omega = self.omg
        return special.j0(self.k(omega, votn) * self.R)

    @staticmethod
    def get_intervals(x_list, y_list, limit=0):
        a = []
        for i in range(1, len(y_list)):
            if y_list[i-1] * y_list[i] < 0:
                a.append([x_list[i - 1], x_list[i]])
            if 0 < limit <= len(a):
                break
        return a

    def check_omg(self):
        i_rng = np.geomspace(1, 1000, self.precision)
        i_rng = [i-1 for i in i_rng]
        self.votn_rng = [1 / math.sqrt(self.eps) + 4 / 1000 * i for i in i_rng]
        self.bessel_rng = [self.jfunc(i) for i in self.votn_rng]
        root_intervals = self.get_intervals(self.votn_rng, self.bessel_rng)
        if len(root_intervals) == 0:
            raise RuntimeError("No roots for function were found")
        self.votn_roots = [optimize.bisect(self.jfunc, i[0], i[1]) for i in root_intervals]
        res = "Relative velocities:\n" + "Root number: " + str(len(self.votn_roots)) + "\n"
        for i in range(len(self.votn_roots)):
            res = res +  str(i) + ": " + str(self.votn_roots[i]) + "\n"
        if len(self.votn_roots) >= 10:
            res = res + "Root number is sufficient" + "\n"
        return res

    def get_roots(self):
        j0_rng = np.linspace(0, 40, 400)
        j0_value = [special.j0(i) for i in j0_rng]
        j0_interval = Bessel.get_intervals(j0_rng, j0_value, 10)
        if len(j0_interval) == 0:
            raise RuntimeError("No roots of Bessel function were found")
        self.roots = [optimize.bisect(special.j0, i[0], i[1]) for i in j0_interval]

    def plot(self, figure):
        axes = figure.add_axes([0.08, 0.1, 0.87, 0.8])
        axes.set_title("Bessel function")
        axes.grid()
        axes.plot(self.votn_rng, self.bessel_rng)
        axes.set_ylim(-1, 1)
        if len(self.votn_roots) > 0:
            xlim_max = self.votn_roots[-1] + 0.1
            xlim_min = self.votn_roots[0] - 0.01
            axes.set_xlim(xlim_min, xlim_max)
            axes.set_xticks(self.votn_roots)
            axes.set_xticklabels([])
            for i in self.votn_roots:
                axes.scatter(i, 0, color='black', s=20)
        axes.set_xscale('log', basex=10)

    def do_calculation(self):
        res = self.check_omg()
        self.get_roots()
        return res


class Speeds:
    def __init__(self, bessel):
        self.bsl = bessel

    def v_p(self, omg, x):
        znam = omg ** 2 * self.bsl.eps / constants.c ** 2 - x ** 2 / self.bsl.R ** 2
        if znam < 0:
            return math.inf
        else:
            return omg / math.sqrt(znam)


    @staticmethod
    def v_gr(omg, v_p):
        if v_p[0] * v_p[1] != 0:
            t = omg[1] / v_p[1] - omg[0] / v_p[0]
            if t !=0:
                return (omg[1] - omg[0]) / t
        return math.inf

    def plot_velocities(self, figure):
        axes = figure.add_axes([0.08, 0.1, 0.87, 0.8])
        omg_temp = 2 * constants.pi * 10 ** 9 * 70
        omg_range = np.linspace(omg_temp/1600, omg_temp * 2.5, self.bsl.precision)
        ylim_max = 4e8
        axes.set_ylim(0, ylim_max)
        axes.set_xlim(right=1e12)
        for root in self.bsl.roots:
            axes.plot(omg_range, [self.v_p(omg, root) for omg in omg_range])
        axes.plot([self.bsl.omg, self.bsl.omg], [0, ylim_max], color='black')
        for root in self.bsl.roots:
            axes.plot(omg_range[:-1], [self.v_gr([omg_range[i], omg_range[i + 1]],
                                                 [self.v_p(omg_range[i], root),
                                                  self.v_p(omg_range[i + 1], root)])
                                       for i in range(len(omg_range) - 1)])
    s

