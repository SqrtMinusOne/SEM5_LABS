#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>
#include <string.h>
#include <time.h>

#define THREAD_NUM 4

pthread_barrier_t barrier;

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

void print_arr(int* arr, unsigned int size){
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

void merge(int* res, int* A, int* B, unsigned int size) {
	int i = 0;
    int j = 0;
    int k = 0;

	while (i < size && j < size) { // Merging two arrays
		if (A[i] < B[j]) {
            res[k++] = A[i++];
        }
		else {
            res[k++] = B[j++];
        }
	}
    if (i < size){
        while (i < size) {
            res[k++] = A[i++]; // Writing elements of A to the end
        }
    }
    else{
        while (j < size) {
            res[k++] = B[j++]; // Writing elements of A to the end
        }
    }
}

typedef struct {
    int thread_id;
    int size;
    int* arr;
} thread_data;


void* thread(void* arg) {
    thread_data thread_arg = *(thread_data*)arg;
    
    int* tmp = (int*)malloc(sizeof(int) * 2 * thread_arg.size);
    // Sorting
    qsort(thread_arg.arr, thread_arg.size, sizeof(int), compare);
    pthread_barrier_wait(&barrier);

    for (int thread_id = THREAD_NUM - 2; thread_id--; thread_id >=0){
        if (thread_arg.thread_id == thread_id) {
            merge(tmp, thread_arg.arr, thread_arg.arr + thread_arg.size, thread_arg.size);
            memcpy(thread_arg.arr, tmp, sizeof(int) * 2 * thread_arg.size);
            
        }
        pthread_barrier_wait(&barrier);
    }

    free(tmp);
    return NULL;
}

int main(int argc, char* argv[]) {
    int size = atoi(argv[1]);
    pthread_barrier_init(&barrier, NULL, THREAD_NUM);

    pthread_t threads[THREAD_NUM];
    thread_data args[THREAD_NUM];
    
    srand(time(NULL));
    int* array = randomize_arr(size);
    int per_thread = size / THREAD_NUM;
    
    for (int i = 0; i < THREAD_NUM; i++) { // Start threads
        args[i].thread_id = i;
        args[i].size = per_thread;
        args[i].arr = array + i * per_thread;
        pthread_create(&threads[i], NULL, thread, &args[i]); 
    }

    for (int i=0; i < THREAD_NUM; i++) { // Wait for threads
        pthread_join(threads[i], NULL);
    }

    for (int i=0; i < THREAD_NUM; i++) { // Wait for threads
        pthread_join(threads[i], NULL);
    }
    
  //  print_arr(args[0].arr, size);
    
    free(array);

    return 0;
}