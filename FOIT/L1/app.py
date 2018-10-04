import sys
from PyQt5.QtCore import pyqtSignal
from PyQt5.QtWidgets import QMainWindow, QApplication, QSizePolicy, QMessageBox
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure
from core import Bessel, Speeds
from form import Ui_MainWindow


class AppWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.plot_speeds = False
        self.bessel = Bessel()
        self.speeds = Speeds(self.bessel)
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.besselCanvas = BesselGraph(self, width=5, height=4, bessel=self.bessel)
        self.ui.besselGraphLayout.addWidget(self.besselCanvas)
        self.speedsCanvas = SpeedsCanvas(self, width=5, height=4, speeds=self.speeds)
        self.ui.speedsGraphLayout.addWidget(self.speedsCanvas)

        self.show()

        self.ui.besselPlotButton.clicked.connect(self.besselCanvas.plot)
        self.besselCanvas.got_results.connect(self.update_bessel_results)
        self.ui.coefSpinBox.valueChanged.connect(self.update_bessel_params)
        self.ui.radiusSpinBox.valueChanged.connect(self.update_bessel_params)
        self.ui.epsSpinBox.valueChanged.connect(self.update_bessel_params)
        self.ui.precisionSpinBox.valueChanged.connect(self.update_bessel_params)

        self.ui.besselPlotButton.clicked.connect(self.speedsCanvas.plot)

    def update_bessel_results(self, results):
        self.ui.besselResultsEdit.setText(results)

    def update_bessel_params(self):
        try:
            eps = self.ui.epsSpinBox.value()
            R = self.ui.radiusSpinBox.value()
            k = self.ui.coefSpinBox.value()
            precision = self.ui.precisionSpinBox.value()
            self.bessel.set_params(eps, R, k, precision)
            if self.ui.autoUpdateCheckBox.isChecked():
                self.ui.besselPlotButton.clicked.emit()
            print(eps, R, k)
        except (ValueError, TypeError):
            print("Bad value")

    @staticmethod
    def error_message(message, title):
        box = QMessageBox()
        box.setIcon(QMessageBox.Warning)
        box.setText(message)
        box.setWindowTitle(title)
        box.exec_()


class BesselGraph(FigureCanvas):
    got_results = pyqtSignal(str, name="got_results")

    def __init__(self, parent=None, width=5, height=4, dpi=100, bessel=None):
        self.__fig = Figure(figsize=(width, height), dpi=dpi)
        self.bessel = bessel
        FigureCanvas.__init__(self, self.__fig)
        self.setParent(parent)
        FigureCanvas.setSizePolicy(self,
                                   QSizePolicy.Expanding,
                                   QSizePolicy.Expanding)
        FigureCanvas.updateGeometry(self)

    def plot(self):
        self.__fig.clear()
        res = "No results"
        try:
            res = self.bessel.do_calculation()
        except RuntimeError as exp:
            AppWindow.error_message(str(exp), str(type(exp)))
        self.bessel.plot(self.__fig)
        self.draw()
        self.got_results.emit(res)


class SpeedsCanvas(FigureCanvas):
    def __init__(self, parent=None, width=5, height=4, dpi=100, speeds=None):
        self.__fig = Figure(figsize=(width, height), dpi=dpi)
        self.speeds = speeds
        FigureCanvas.__init__(self, self.__fig)
        self.setParent(parent)
        FigureCanvas.setSizePolicy(self,
                                   QSizePolicy.Expanding,
                                   QSizePolicy.Expanding)
        FigureCanvas.updateGeometry(self)

    def plot(self):
        if not w.ui.plotSpeedsCheckBox.isChecked():
            return
        self.__fig.clear()
        try:
            self.speeds.bsl.do_calculation()
        except RuntimeError as exp:
            AppWindow.error_message(str(exp), str(type(exp)))
        self.speeds.plot_velocities(self.__fig)
        self.draw()


app = QApplication(sys.argv)
w = AppWindow()
w.show()
sys.exit(app.exec_())