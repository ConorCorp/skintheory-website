import json
import os
from botocore.vendored import requests
from urllib import parse

def lambda_handler(event, context):
    print(event)
    
    print(f"Event body: {event.get('body', {})}")
    body = parse.parse_qs(event.get('body', {}))
    print(f"Event body parsed: {body}")

    if not body.get('user_email') or body.get('user_email') == ['']:
        return {
            'statusCode': 400,
            'body': "Missing user_email"
        }
    
    data = {
    	"email_address": body.get('user_email')[0],
    	"status": "subscribed",
    	"tags": ["skin_theory_website"]
    }
    
    headers = {
        "Authorization": os.environ['mailchimp_api_token']
    }
    
    response = requests.post('https://us3.api.mailchimp.com/3.0/lists/3e8ce8bef4/members', data=json.dumps(data), headers=headers)


    if response.json().get('id'):
        print(f"Returning: {response.status_code}")
        print(f"Response: {response.text}")
        return {
            'MailChimpStatusCode': response.status_code,
            'body': {
                "id": response.json().get('id'),
            }
        }  
    else:
        print(f"Returning: {response.status_code}")
        print(f"Response: {response.text}")
        return {
            "isBase64Encoded" : False,
            "statusCode": response.status_code,
            "body": response.json()
        }
