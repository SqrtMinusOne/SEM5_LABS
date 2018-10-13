from math import floor, ceil


def dec2bin(x, l=10):
    res = "{0:b}".format(x)
    while len(res) < l:
        res = '0' + res
    return res


def toFixed(numObj, digits=0):
    return f"{numObj:.{digits}f}"


def rnd(x):
    if floor(x) > 0:
        if x / floor(x) < 1.1:
            return floor(x)
    return ceil(x)


def check(x):
    for i in x:
        if i < 0.9:
            return False
    return True


def do_stuff(t_op, t_v, arr):
    C_R = [i / t_v for i in t_op]
    C = [rnd(i) for i in C_R]
    n = [C_R[i] / C[i] for i in range(len(C))]
    res = check(n)
    if res:
        convert_arr(arr)
        print("C_R: " + str([toFixed(k, 1) for k in C_R]))
        print("C: " + str([toFixed(k, 1) for k in C]))
        print("η: " + str([toFixed(k, 1) for k in n]))
        print("t_op: " + str([toFixed(k, 1) for k in t_op]))

def convert_arr(arr):
    print('Solution: ')
    for i in range(len(arr)):
        if arr[i] == 1:
            print(str(i+1) + "+", end='')
        else:
            print(i+1)
    print()


T_sm = 480
T_per = 20
N_sm = 115
K_sm = 1

F_eff = (T_sm - T_per)*K_sm
t_v = int(F_eff/N_sm)

t_op = [3.2, 6.9, 9.2, 11.7, 4.7, 6.5, 10.2, 5.6, 4.4, 0.6]

for i in range(0, 2**len(t_op)):
    arr = [int(k) for k in str(dec2bin(i, len(t_op)))]
    l = len(t_op)
    cur_t = [k for k in t_op]
    mod = 0
    for k in range(0, l):
        z = k + mod
        if arr[k] == 1 and z < len(cur_t) - 1:
            cur_t[z] = cur_t[z] + cur_t[z+1]
            del cur_t[z+1]
            mod = mod - 1
    do_stuff(cur_t, t_v, arr)

