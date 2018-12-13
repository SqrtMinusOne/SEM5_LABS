#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <sys/sem.h>
#include <sys/wait.h>
#include <errno.h>
#include <math.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include "misc.hpp"

//#define DEBUG
int proc_num = 4;
int row_num = 100;
int col_num = 100;

void wait_for_children(){
    pid_t wpid;
    int status = 0;
    while ((wpid = wait(&status)) > 0)
    {
#ifdef DEBUG
        printf("Process %d terminated with code %d\n", (int) wpid, status);
#endif
    }
}

int min(int a, int b){
    int c = a < b ? a : b;
    return c;
}

void do_calc(){
    int mat_shr_id = shmget(IPC_PRIVATE, sizeof(int) * row_num * col_num, IPC_CREAT | 0666); // Matrix
    int vec_shr_id = shmget(IPC_PRIVATE, sizeof(int) * col_num, IPC_CREAT | 0666); // Vector
    int res_shr_id = shmget(IPC_PRIVATE, sizeof(int) * row_num, IPC_CREAT | 0666); // Result

    int* mat = shmat(mat_shr_id, NULL, 0);
    int* vec = shmat(vec_shr_id, NULL, 0);
    int* res = shmat(res_shr_id, NULL, 0);
    int rows_per_proc = (int)ceil((double)row_num / (double)proc_num);
    memset(res, 0, sizeof(int) * row_num);

    randomize_matrix(mat, row_num, col_num);
    randomize_matrix(vec, 1, col_num);
#ifdef DEBUG
    printf("Matrix: \n");
    //print_matrix(mat, row_num, col_num);
    printf("Vector^T: \n");
    //print_matrix(vec, 1, col_num);
    printf("Rows per proc: %d\n", rows_per_proc);
#endif
    for (int proc = 0; proc < proc_num; proc++){
        pid_t pid = fork();
        if (pid == 0){
            // Child process
            for (int row = proc * rows_per_proc; row < min((proc + 1) * rows_per_proc, row_num); row++){
                for (int col = 0; col < col_num; col++){
                    res[row] += get_elem(mat, col_num, row, col) * vec[col];
                }
            }
            exit(0);
        }
        else if (pid > 0){
            continue;
        }
    }
    wait_for_children();
#ifdef DEBUG
    printf("DONE in %ld\n", time);
    printf("Res^T: \n");
    print_matrix(res, 1, row_num);
#endif
    shmctl(mat_shr_id, IPC_RMID, NULL);
    shmctl(vec_shr_id, IPC_RMID, NULL);
    shmctl(res_shr_id, IPC_RMID, NULL);
}

int main(int argc, char* argv[]) {
    srand((unsigned int) time(NULL));
    proc_num = atoi(argv[1]);
    row_num = atoi(argv[2]);
    col_num = atoi(argv[3]);
    do_calc();
    return 0;
}