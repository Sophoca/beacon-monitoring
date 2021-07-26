import requests

URL='http://115.144.111.248:3030/api/parkingLot/config/cheonho/publicparkinglot'
floor='cheonhoB1'
res = requests.get(URL)
res_json=res.json()

parking_spot=res_json['mapInfo']['configSlot'][floor]['parkingSpotPosition']
optim_parking_spot={}
for key in parking_spot:
    optim_parking_spot[key]={'top':parking_spot[key]['top'], 'left':parking_spot[key]['left']}
print(optim_parking_spot)