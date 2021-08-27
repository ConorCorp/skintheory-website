# Makefile

tests:
	python3 -m unittest test/TestGetSkinQuizResults.py

offline:
	sls offline

deployf:
	sls deploy function -f getSkinQuizResults --stage dev

deploy:
	sls deploy --stage dev

deployf-prod:
	sls deploy function -f getSkinQuizResults --stage prod

deploy-prod:
	sls deploy --stage prod

tail-lambda-logs:
	sls logs -f getSkinQuizResults -t

clean:
	rm -rf __pycache__