#!/bin/bash

gcc $1 -o columns.out -lm
gcc $2 -o rows.out -lm
for (( i=1; i<=20; i++))
do
    echo "|===================|Proc num: ${i}|===================|"
    echo "Rows:"
	(time ./rows.out %{i} 5000 5000 >> /dev/null)
done

for (( i=1; i<=20; i++))
do
    echo "|===================|Proc num: ${i}|===================|"
    echo "Columns:"
    (time ./columns.out %{i} 5000 5000 1234 >> /dev/null)
done

rm -f rows.out columns.out