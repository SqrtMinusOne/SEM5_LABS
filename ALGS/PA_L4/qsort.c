#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>
#include <string.h>
#include <time.h>

#define THREAD_NUM 4


int compare (const void* x, const void* y) {
    return *((int*)x) - *((int*)y);
}

int* randomize_arr(unsigned int size) {
    int* arr = (int*)malloc(sizeof(int) * size);
    for (int i = 0; i < size; i++) {
        arr[i] = rand() % 90 + 10; 
    }
    return arr;
}

int main(int argc, char* argv[]) {
    int size = atoi(argv[1]);
    srand(time(NULL));
    int* array = randomize_arr(size);
    
    qsort(array, size, sizeof(int), compare);

    free(array);

    return 0;
}