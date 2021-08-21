import unittest
import json

import src.GetSkinQuizResults as GetSkinQuizResults


class TestGetSkinQuizResults(unittest.TestCase):
    def test_lambda_handler_empty_response(self):
        json_body = json.dumps('Empty or no "body" parameter in request.')
        self.assertEqual(
            GetSkinQuizResults.lambda_handler({}, {}),
            {'body': json_body, 'statusCode': 400}
        )

    def test_lambda_handler_empty_body(self):
        json_body = json.dumps('Empty or no "body" parameter in request.')
        self.assertEqual(
            GetSkinQuizResults.lambda_handler({'body': {}}, {}),
            {'body': json_body, 'statusCode': 400}
        )

    def test_lambda_handler_bad_json_body(self):
        json_body = json.dumps(
            'Unable to parse JSON in "body" parameter in request.')
        self.assertEqual(
            GetSkinQuizResults.lambda_handler({'body': "crap"}, {}),
            {'body': json_body, 'statusCode': 400}
        )

    def test_lambda_handler_body_no_quiz_answers(self):
        json_req_body = json.dumps({'test_key': 'test_value'})
        json_resp_body = json.dumps(
            'No "quiz_answers" parameter in "body" request.')
        self.assertEqual(
            GetSkinQuizResults.lambda_handler({'body': json_req_body}, {}),
            {'body': json_resp_body, 'statusCode': 400}
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
            GetSkinQuizResults.lambda_handler({'body': json_req_body}, {}),
            {'statusCode': 200, 'body': json_resp_body}
        )


if __name__ == '__main__':
    unittest.main()
