arr=[132, 136, 135, 139, 137, 140, 138, 134, 131, 133, 142, 150, 143, 144, 148, 145, 146, 149, 147, 141, 157, 159, 152, 160, 156, 155, 154, 151, 158, 153]
arr2=[]
for p in enumerate(arr, 1):
    arr2.append(p)


arr2.sort(key=lambda x: x[1])
# for (minor, i) in arr2:
    # print(str(i) + ': { major: 504, minor: '+str(minor)+', type: 0},')

for i in range(191, 221):
    print(str(i)+': {major: 506, minor: '+str(i-190)+', type:0},')