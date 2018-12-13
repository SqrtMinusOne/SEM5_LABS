#include <stdlib.h>
#include <time.h>
#include <stdio.h>
#include <math.h>
#include <sys/time.h>

#ifndef PA_L3_2_MATRIX_H
#define PA_L3_2_MATRIX_H
typedef int* matrix_type;

void set_elem(matrix_type matr, int col_num, int row, int col, int elem) {
    matr[row * col_num + col] = elem;
}

matrix_type randomize_matrix(matrix_type mat, int row_num, int col_num) {
    for (int row = 0; row < row_num; row++){
        for (int col = 0; col < col_num; col++){
            int elem = rand() % 90 + 10;
            set_elem(mat, col_num, row, col, elem);
        }
    }
}

int get_elem(matrix_type matr, int col_num, int row, int col) {
    return matr[row * col_num + col];
}

void print_matrix(matrix_type mat, int row_num, int col_num) {
    for (int row = 0; row < row_num; row++){
        for (int col = 0; col < col_num; col++){
            printf("%d ", get_elem(mat, col_num, row, col));
        }
        printf("\n");
    }
}

#endif //PA_L3_2_MATRIX_H