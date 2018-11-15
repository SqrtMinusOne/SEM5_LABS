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

void wait_for_children(){
    pid_t wpid;
    int status = 0;
    while ((wpid = wait(&status)) > 0)
    {
        printf("Process %d terminated with code %d\n", (int) wpid, status);
    }
}

int main() {
    pid_t pid_1, pid_2, pid_3;
    pid_1 = fork();
    if (pid_1 == 0){
        print_info("P2");
    }
    else {
        pid_2 = fork();
        if (pid_2 == 0){
            pid_3 = fork();
            if (pid_3 == 0){
                print_info("P4");
            }
            else{
                print_info("P3");
                wait_for_children();
            }
        }
        else {
            print_info("P1");
            wait_for_children();
        }
    }
    return 0;
}