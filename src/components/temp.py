# arr=[132, 136, 135, 139, 137, 140, 138, 134, 131, 133, 142, 150, 143, 144, 148, 145, 146, 149, 147, 141, 157, 159, 152, 160, 156, 155, 154, 151, 158, 153]
# arr2=[]
# for p in enumerate(arr, 1):
#     arr2.append(p)


# arr2.sort(key=lambda x: x[1])
# # for (minor, i) in arr2:
#     # print(str(i) + ': { major: 504, minor: '+str(minor)+', type: 0},')

# for i in range(191, 221):
#     print(str(i)+': {major: 506, minor: '+str(i-190)+', type:0},')

import cv2
major=500
minor=5
url = f'rtsp://admin:admin1234@218.153.209.100:{major}/cam/realmonitor?channel={minor}&subtype=1'
vidcap = cv2.VideoCapture(url)

if vidcap.isOpened():
    while True:
        ret, img = vidcap.read()
        cv2.imshow('frame', img)

        if not ret:
            break
        cv2.waitKey(1)