import requests,json,jwt
from datetime import datetime,timedelta
#Run the query to get all blacklisted tokens
#For each of them, check if expired. If so, run the delete query.

#requires pip3 install pyjwt

payload = {
    'role': 'system',
    'exp': datetime.utcnow() + timedelta(minutes=1)
}

secret = os.environ['JWT_KEY']

encoded = jwt.encode(payload, secret, algorithm='HS256')

headers = { "Authorization" : "Bearer " + encoded.decode()}

response = json.loads(requests.get("https://api.rpsh.me/v1/blacklist/all", headers=headers).text)
for token in response['tokens']:
    tok = token['token']
    now = datetime.utcnow()
    exp = datetime.strptime(token['expiry'],'%Y-%m-%dT%H:%M:%S.%fZ')
    if(exp < now):
        requests.post("https://api.rpsh.me/v1/blacklist/delete", {"token": tok},headers=headers)
        print("Removed token: \t" + tok)
    
    
