from matplotlib import pyplot as plt
from matplotlib import mlab
from scipy import special
from scipy import optimize
import math
from scipy import constants


class Bessel:
    eps = 7.1
    R = 0.92e-2
    omg = 2 * constants.pi * 10 ** 9 * 70

    def __init__(self):
        self.votn_rng = []
        self.bessel_rng = []
        self.votn_roots = []

    def k(self, omg, votn):
        t = self.eps - 1 / votn ** 2
        if t < 0:
            return math.inf
        else:
            return omg / constants.c * math.sqrt(t)

    def jfunc(self, omg, votn):
        return special.j0(self.k(omg, votn) * self.R)

    @staticmethod
    def jfunc_with_params(votn):
        return b.jfunc(b.omg, votn)

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

    def check_omg(self):
        i_rng = range(0, 1000)
        self.votn_rng = [1 / math.sqrt(self.eps) + 4 / 1000 * i for i in i_rng]
        self.bessel_rng = [self.jfunc(self.omg, i) for i in self.votn_rng]
        root_intervals = self.get_intervals(self.votn_rng, self.bessel_rng)
        self.votn_roots = [optimize.bisect(self.jfunc_with_params, i[0], i[1]) for i in root_intervals]
        print("Bessel function roots: ")
        for i in range(len(self.votn_roots)):
            print(str(i) + ": " + str(self.votn_roots[i]))
        if len(self.votn_roots) >= 10:
            print("Root number is sufficient")

    def get_roots(self):
        j0_rng = mlab.frange(0.0, 40.0, 0.1)
        j0_value = [special.j0(i) for i in j0_rng]
        j0_interval = Bessel.get_intervals(j0_rng, j0_value, 10)
        self.roots = [optimize.bisect(special.j0, i[0], i[1]) for i in j0_interval]

    def plot(self):
        figure = plt.figure(1)
        axes = figure.add_axes([0.08, 0.1, 0.87, 0.8])
        axes.set_title("Bessel function")
        axes.grid()
        axes.plot(self.votn_rng, self.bessel_rng)
        axes.set_ylim(-1, 1)
        xlim_max = self.votn_roots[-1] + 0.1
        xlim_min = self.votn_roots[0] - 0.01
        axes.set_xlim(xlim_min, xlim_max)
        axes.set_xscale('log', basex=10)
        axes.set_xticks(self.votn_roots)
        axes.set_xticklabels([])
        for i in self.votn_roots:
            axes.scatter(i, 0, color='black', s=20)
        plt.show()

    def do_calculation(self):
        self.check_omg()
        self.get_roots()
        self.plot()


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

    def plot_phase_velocity(self):
        figure = plt.figure(2)
        axes = figure.add_axes([0.08, 0.1, 0.87, 0.8])
        omg_range = mlab.frange(self.bsl.omg/1600, self.bsl.omg * 2.5, self.bsl.omg / 6400)
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
        plt.show()


b = Bessel()
b.do_calculation()
s = Speeds(b)
s.plot_phase_velocity()