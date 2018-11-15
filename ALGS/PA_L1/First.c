#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <wait.h>

void print_info(char* name){
    pid_t pid, ppid;
    pid  = getpid();
    ppid = getppid();
    printf("NAME: %s; PID: %d; PPID: %d\n", name, pid, ppid);
}

int main() {
    pid_t pid_1, pid_2, pid_3;
    pid_1 = fork();
    if (pid_1 == 0){
        pid_2 = fork();
        if (pid_2 == 0){
            print_info("P3");
        }
        else {
            pid_3 = fork();
            if (pid_3 == 0){
                print_info("P4");
            }
            else {
                print_info("P2");
                pid_t wpid;
                int status = 0;
                while ((wpid = wait(&status)) > 0) {
                    printf("Process %d terminated with code %d\n", (int) wpid, status);
                }
            }
        }
    }
    else{
        print_info("P1");
        pid_t wpid;
        int status = 0;
        while ((wpid = wait(&status)) > 0)
        {
            printf("Process %d terminated with code %d\n", (int) wpid, status);
        }
    }
    return 0;
}