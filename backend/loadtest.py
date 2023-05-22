'''
Lambda function to load test the given URL
'''

import requests
from datetime import timedelta
import socket
import tldextract
import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def validate_domain(domain):
    try:
        socket.gethostbyname(domain)
        return True
    except socket.error:
        return False

def lambda_handler(event, context):

    # On inital page load when no URL is posted to the Lambda
    url = 'https://google.com'
    total_requests = 10

    
    # Retrieve the target HTTP endpoint URL from the event
    if 'queryStringParameters' in event:
        url = event['queryStringParameters']['url']
        total_requests = 100

    # Extract the domain name from the URL
    domain = tldextract.extract(url).registered_domain

    # Validate if the domain exists
    if not validate_domain(domain):
        return {
            'statusCode': 400,
            'body': 'Invalid domain' 
        }

    response_times = []
    bytes_sent = 0

    # Send requests and collect response times
    for _ in range(total_requests):
        try:
            response = requests.get(url)
            elapsed_time = response.elapsed.total_seconds()
            response_times.append(elapsed_time)
            bytes_sent += len(response.content)

        except requests.exceptions.RequestException as e:
            logger.info(f'Request error: {e}')


    # Calculate metrics
    total_time = sum(response_times)
    slowest_time = max(response_times)
    fastest_time = min(response_times)
    average_time = total_time / total_requests
    requests_per_second = total_requests / total_time

    response_payload = {
        'domain': domain,
        'summary': {
            'total_time': total_time,
            'slowest_time': slowest_time,
            'fastest_time': fastest_time,
            'average_time': average_time,
            'requests_per_second': requests_per_second,
            'throughput_bytes': bytes_sent
        },
        'response_times': response_times
    }


    response_json = json.dumps(response_payload)

    # Return the metrics as the Lambda function's response
    return {
        'statusCode': 200,
        'body': response_json,
        'headers': {
            'Content-Type': 'application/json'
        }
    }
