# Makefile

tests:
	python3 -m unittest test/TestGetSkinQuizResults.py

invoke-local: # Doesn't work?
	sls invoke local -f getSkinQuizResults -p test/test_responses/1_quiz_answer.json

deploy:
	cd infra && sls deploy --stage dev

deploy-prod:
	cd infra && sls deploy --stage prod

clean:
	rm -rf __pycache__