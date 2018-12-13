#!/bin/bash

gcc $1 -fopenmp
for (( i=1; i<=20; i++))
do
	echo -n "Proc num: ${i}: "
	export OMP_NUM_THREADS=${i}
	(time ./a.out 1000000000 >> /dev/null)
done

rm -f a.out