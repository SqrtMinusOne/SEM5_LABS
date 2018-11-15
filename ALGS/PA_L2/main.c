#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <wait.h>
#include <time.h>

void print_info(int n){
    pid_t pid, ppid;
    pid  = getpid();
    ppid = getppid();
    printf("NUMBER: %d; PID: %d; PPID: %d\n", n, pid, ppid);
}

void wait_for_children(){
    pid_t wpid;
    int status = 0;
    while ((wpid = wait(&status)) > 0)
    {
        printf("Process %d terminated with code %d\n", (int) wpid, status);
    }
}

int64_t timespecDiff(struct timespec *timeA_p, struct timespec *timeB_p)
{
    return ((timeA_p->tv_sec * 1000000000) + timeA_p->tv_nsec) -
           ((timeB_p->tv_sec * 1000000000) + timeB_p->tv_nsec);
}

int main() {
    int P, N, i;
    long int j;
    printf("π calculation\n");
    printf("Enter number of processes and size of series:\n");
    scanf("%d %d", &P, &N);
    struct timespec start, end;
    clock_gettime(CLOCK_MONOTONIC, &start);
    long int for_pr = N/P;
    if (for_pr*P < N)
        for_pr++;
    pid_t pid = 0;
    int pipes[P][2];
    for (i = 0; i < P; i++){
        if (pipe(pipes[i]) < 0){
            printf("Something went wrong");
            return 0;
        }
        pid = fork();
        if (pid == 0){
            break;
        }
        else{
            close(pipes[i][1]);
        }
    }
    if (pid == 0){
       // print_info(i+1);
        close(pipes[i][0]);
        long double res = 0.0;
        for (j = i*for_pr+1; j <= (i+1)*for_pr; j++){
            int sign = j % 2 ? 1 : -1;
            res += (long double)(sign * 4) / (2*j - 1);
        }
        printf("%Lf\n", res);
        write(pipes[i][1], &res, sizeof(long double));
        return 0;
    }
    else{
        print_info(0);
        wait_for_children();
    }
    long double final = 0.0;
    for (i = 0; i < P; i++){
        long double res;
        read(pipes[i][0], &res, sizeof(long double));
        final += res;
    }
    clock_gettime(CLOCK_MONOTONIC, &end);
    int64_t timeElapsed = timespecDiff(&end, &start);
    printf("Result: %Lf\n", final);
    printf("TIME ELAPSED: %d\n",timeElapsed);
    return 0;
}