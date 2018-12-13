#include <omp.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char const *argv[]) {
    int series_size = atoi(argv[1]);
    long double res = 0.0;
    long double res_here = 0.0;
    int sign;

#pragma omp parallel firstprivate(res_here) private(sign)
    {
        #pragma omp for
            for (int i = 1; i < series_size; i++) {
                sign = (i + 1) % 2 ? -1 : 1;
                res_here += (long double) (sign * 4) / (long double) (2 * i - 1);
            }
        #pragma omp atomic
            res += res_here;
    }
    printf("%.Lf\n", res);

    return 0;
}