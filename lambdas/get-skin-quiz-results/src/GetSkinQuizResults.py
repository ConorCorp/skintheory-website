import json
import os
from botocore.vendored import requests
import traceback


class CustomLambdaException(Exception):
    """
    Issue in lambda,
    raise the exception with the proper response status_code.
    """

    def __init__(self, status_code: int, message: str, exception: Exception = None):
        self.status_code = status_code
        self.message = message
        traceback.print_exc()
        super().__init__(self.message)


def lambda_handler(event, context):
    """
    Receive the answers of a user's skin quiz. Return
    the results from our Google Sheet.

    @type  event: AWS Event https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-concepts.html
    @param event: Information for the lambda to use.
                  The event must contain:
                  @type quiz_answers: list
                  @param quiz_answer: List of possible quiz results to search for.
                                       If they exist, they will be returned.
    @type  context: AWS Context https://docs.aws.amazon.com/lambda/latest/dg/python-context.html
    @param context: Information about the function.

    @rtype: dict
    @return: dict containing an ordered list of the matched
     user answers <-> quiz results
    """
    try:
        return get_skin_quiz_results(event)
    except CustomLambdaException as e:
        json_body = json.dumps(e.message)
        return {
            'statusCode': e.status_code,
            'body': json_body
        }
    except Exception as e:
        json_body = json.dumps(f'Unknown Issue: {str(e)}')
        return {
            'statusCode': 500,
            'body': json_body
        }


def get_skin_quiz_results(event):
    body = parse_and_log_body(event)
    quiz_answers = get_quiz_answers(body)
    quiz_results_to_answers = get_quiz_results_for_answers(quiz_answers)
    return {
        'statusCode': 200,
        'body': json.dumps({'quiz_results': quiz_results_to_answers})
    }


def parse_and_log_body(event):
    print(event)
    body_key = 'body'
    body = event.get(body_key)  # body is just a key in a dict
    if not body:
        raise CustomLambdaException(
            400, f'Empty or no "{body_key}" parameter in request.')
    try:
        body_parsed = json.loads(body)
    except Exception as e:
        raise CustomLambdaException(
            400, f'Unable to parse JSON in "{body_key}" parameter in request.', e)
    print(f'Event body parsed: {body_parsed}')
    return body_parsed


def get_quiz_answers(body):
    quiz_answers_key = 'quiz_answers'
    quiz_answers = body.get(quiz_answers_key, {})
    if not quiz_answers:  # Dict value is empty or list is empty
        raise CustomLambdaException(
            400, f'No "{quiz_answers_key}" parameter in "body" request.')


def get_single_google_sheet_page_data():
    # data = {
    # 	"email_address": body.get('user_email')[0],
    # 	"status": "subscribed",
    # 	"tags": ["skin_theory_website"]
    # }

    # headers = {
    #     "Authorization": os.environ['mailchimp_api_token']
    # }

    # response = requests.post('https://us3.api.mailchimp.com/3.0/lists/3e8ce8bef4/members', data=json.dumps(data), headers=headers)

    # if response.json().get('id'):
    #     print(f"Returning: {response.status_code}")
    #     print(f"Response: {response.text}")
    #     return {
    #         'MailChimpStatusCode': response.status_code,
    #         'body': {
    #             "id": response.json().get('id'),
    #         }
    #     }
    # else:
    #     print(f"Returning: {response.status_code}")
    #     print(f"Response: {response.text}")
    #     return {
    #         "isBase64Encoded" : False,
    #         "statusCode": response.status_code,
    #         "body": response.json()
    #     }
    pass


def get_quiz_results_for_answers(quiz_answers):
    # 1. Find out how the quiz answers will come in
    # 2. Get quiz_results from the sheet - get_single_google_sheet_page_data()
    # 3. Match quiz_answers to quiz_resultsw
    return [('acne', 'lalala')]
