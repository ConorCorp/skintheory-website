import unittest
import json

import src.GetSkinQuizResults as GetSkinQuizResults


BODY_RESP_KEY = 'body'
STATUS_CODE_RESP_KEY = 'statusCode'


class TestGetSkinQuizResults(unittest.TestCase):
    def test_lambda_handler_empty_response(self):
        json_body = json.dumps('Empty or no "body" parameter in request.')
        self.assertEqual(
            GetSkinQuizResults.lambda_handler({}, {}),
            {BODY_RESP_KEY: json_body, STATUS_CODE_RESP_KEY: 400}
        )

    def test_lambda_handler_empty_body(self):
        json_body = json.dumps('Empty or no "body" parameter in request.')
        self.assertEqual(
            GetSkinQuizResults.lambda_handler({BODY_RESP_KEY: {}}, {}),
            {BODY_RESP_KEY: json_body, STATUS_CODE_RESP_KEY: 400}
        )

    def test_lambda_handler_bad_json_body(self):
        json_body = json.dumps(
            'Unable to parse JSON in "body" parameter in request.')
        self.assertEqual(
            GetSkinQuizResults.lambda_handler({BODY_RESP_KEY: "crap"}, {}),
            {BODY_RESP_KEY: json_body, STATUS_CODE_RESP_KEY: 400}
        )

    def test_lambda_handler_body_no_quiz_answers(self):
        json_req_body = json.dumps({'test_key': 'test_value'})
        json_resp_body = json.dumps(
            'No "quiz_answers" parameter in "body" request.')
        self.assertEqual(
            GetSkinQuizResults.lambda_handler(
                {BODY_RESP_KEY: json_req_body}, {}),
            {BODY_RESP_KEY: json_resp_body, STATUS_CODE_RESP_KEY: 400}
        )

    def test_lambda_handler_body_1_quiz_answers(self):
        json_req_body = json.dumps({'quiz_answers': ['acne']})
        json_resp_body = json.dumps(
            {
                'quiz_results':
                [('acne', 'lalala')]
            }
        )
        self.assertEqual(
            GetSkinQuizResults.lambda_handler(
                {BODY_RESP_KEY: json_req_body}, {}),
            {STATUS_CODE_RESP_KEY: 200, BODY_RESP_KEY: json_resp_body}
        )


if __name__ == '__main__':
    unittest.main()
