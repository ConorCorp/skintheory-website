import json
import traceback
import os
import base64

from botocore.vendored import requests
import gspread

GSHEETS_PRIVATE_KEY = "GSHEETS_PRIVATE_KEY"
GSHEETS_PRIV_KEY_BOILERPLATE = "neutered-keys/skintheory-a9340-85ae150967b6.json"
STAGE_ENV = "STAGE"
PROD = "prod"


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
        json_body = json.dumps(f'Cannot retreive skin results. {e.message}')
        return {
            'statusCode': e.status_code,
            'body': json_body
        }
    except Exception as e:
        json_body = json.dumps(f'Cannot retreive skin results. {str(e)}')
        return {
            'statusCode': 500,
            'body': json_body
        }


def get_skin_quiz_results(event):
    body = _parse_and_log_body(event)
    quiz_answers = _get_quiz_answers_from_request(body)
    print("1. Parsed Quiz Answers From Request.")
    gsheets_private_key = _get_google_sheets_private_key(
        GSHEETS_PRIV_KEY_BOILERPLATE,
        base64.b64decode(os.environ[GSHEETS_PRIVATE_KEY]).decode(
            'unicode_escape')
    )
    print("2. Retrieved GSheets Private Key.")
    quiz_results = _get_quiz_results_from_gsheet(gsheets_private_key)
    print("3. Retrieved Quiz Results From GSheets.")
    quiz_results_to_answers = _filter_quiz_results_for_answers(
        quiz_answers, quiz_results)
    print("4. Paired Quiz Answers to Results. Returning Response.")
    return {
        'statusCode': 200,
        'body': json.dumps({'quiz_results': quiz_results_to_answers})
    }


def _parse_and_log_body(event):
    print(event)
    body_key = 'body'
    # body is just a key in a dict, while the body value is JSON
    body = event.get(body_key)
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


def _get_quiz_answers_from_request(body):
    quiz_answers_key = 'quiz_answers'
    quiz_answers = body.get(quiz_answers_key, {})
    if not quiz_answers:  # Dict value is empty or list is empty
        raise CustomLambdaException(
            400, f'No "{quiz_answers_key}" parameter in "body" request.')
    return quiz_answers


def _get_quiz_results_from_gsheet(gsheets_private_key: dict):
    """
    Get quiz results from Google sheet and clean them.

    @rtype: list
    @return: list of dicts which represent rows of each of the results.
    e.g. [{'Skin Trait': 'Nodulocystic Acne', 'Advice 1': 'See Dermatologist', 'Advice 2': ''}]
    """
    for i in range(3):  # Super basic retry
        try:
            gc = gspread.service_account_from_dict(gsheets_private_key)
            wks = gc.open("[Live On Website] Skincare Quiz Results")
            sheet = wks.sheet1 if os.getenv(
                STAGE_ENV) == PROD else wks.worksheets()[1]
            list_of_sheet_row_dicts = sheet.get_all_records()
            return list_of_sheet_row_dicts
        except Exception as e:
            if i > 1:
                raise CustomLambdaException(
                    500, f'Issues connecting to results in GSheets.', e)


def _get_google_sheets_private_key(neutered_key_path, private_key_value):
    """
    Get key file, and private key from SSM and put them together.
    """
    google_private_key = None
    with open(neutered_key_path) as f:
        google_private_key = json.loads(f.read())
    private_key_key = "private_key"
    google_private_key[private_key_key] = private_key_value
    return google_private_key


def _filter_quiz_results_for_answers(quiz_answers: list, quiz_results: list):
    """
    Match quiz answers to quiz results.

    @param quiz_answers: list of skin quiz answers from user.
    @param quiz_results: list of answers from GSheets to give for results

    @rtype: dict
    @return: dict containing an ordered list of the matched
     user answers <-> quiz results
    """
    def is_interested_skincare_result(quiz_result: dict):
        return True if quiz_result.get('Skin Trait').lower() in quiz_answers \
            else False
    return list(filter(is_interested_skincare_result, quiz_results))


if __name__ == "__main__":
    os.environ["GSHEETS_PRIVATE_KEY"] = "<insert-base64-key>"
    test_event = {
        "body": None
    }
    with open("test/test_bodies/1_quiz_answer.json") as f:
        test_event["body"] = f.read()
    print(lambda_handler(test_event, {}))
