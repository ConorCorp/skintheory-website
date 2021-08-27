import unittest
from unittest.mock import Mock
import json
import os

import src.GetSkinQuizResults as GetSkinQuizResults


BODY_RESP_KEY = 'body'
STATUS_CODE_RESP_KEY = 'statusCode'


class TestGetSkinQuizResults(unittest.TestCase):
    def test_lambda_handler_empty_response(self):
        json_body = json.dumps(
            'Cannot retreive skin results. Empty or no "body" parameter in request.')
        self.assertEqual(
            GetSkinQuizResults.lambda_handler({}, {}),
            {BODY_RESP_KEY: json_body, STATUS_CODE_RESP_KEY: 400}
        )

    def test_lambda_handler_empty_body(self):
        json_body = json.dumps(
            'Cannot retreive skin results. Empty or no "body" parameter in request.')
        self.assertEqual(
            GetSkinQuizResults.lambda_handler({BODY_RESP_KEY: {}}, {}),
            {BODY_RESP_KEY: json_body, STATUS_CODE_RESP_KEY: 400}
        )

    def test_lambda_handler_bad_json_body(self):
        json_body = json.dumps(
            'Cannot retreive skin results. Unable to parse JSON in "body" parameter in request.')
        self.assertEqual(
            GetSkinQuizResults.lambda_handler({BODY_RESP_KEY: "crap"}, {}),
            {BODY_RESP_KEY: json_body, STATUS_CODE_RESP_KEY: 400}
        )

    def test_lambda_handler_body_no_quiz_answers(self):
        json_req_body = json.dumps({'test_key': 'test_value'})
        json_resp_body = json.dumps(
            'Cannot retreive skin results. No "quiz_answers" parameter in "body" request.')
        self.assertEqual(
            GetSkinQuizResults.lambda_handler(
                {BODY_RESP_KEY: json_req_body}, {}),
            {BODY_RESP_KEY: json_resp_body, STATUS_CODE_RESP_KEY: 400}
        )

    def test_lambda_handler_body_1_quiz_answers(self):
        json_req_body = json.dumps({'quiz_answers': ['nodulocystic acne']})
        json_resp_body = json.dumps(
            {
                'quiz_results':
                [{'Skin Trait': 'Nodulocystic Acne',
                    'Advice 1': 'See Dermatologist', 'Advice 2': ''}]
            }
        )
        os.environ[GetSkinQuizResults.GSHEETS_PRIVATE_KEY] = 'aGkgaW0gYSBjb29sIGR1ZGU='
        GetSkinQuizResults._get_quiz_results_from_gsheet = Mock(
            return_value=[{'Skin Trait': 'Nodulocystic Acne',
                           'Advice 1': 'See Dermatologist', 'Advice 2': ''}]
        )
        self.assertEqual(
            GetSkinQuizResults.lambda_handler(
                {BODY_RESP_KEY: json_req_body}, {}),
            {STATUS_CODE_RESP_KEY: 200, BODY_RESP_KEY: json_resp_body}
        )


if __name__ == '__main__':
    unittest.main()
