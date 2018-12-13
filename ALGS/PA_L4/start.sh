gcc $1 -pthread -o parallel
gcc $2 -o consec
for (( i=5; i<=8; i++))
do
	current_data=$((10**i))
    echo "=================="
    echo "len: ${current_data}"
	echo "Parallel: "
	time ./parallel "${current_data}"
	echo -n "Consecutive: "
        time ./consec "${current_data}"

done

rm -f consec parallel