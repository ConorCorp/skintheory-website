# SkinTheory Lambdaas

## Summary

We're trying to use a serverless architecture for our backend custom code, cuz dat shit is fly ✈️ (for multiple reasons). We add new lambdas with serverless and implement the functions in Python.

## Setting up with serverless

Serverless lives in our `infra/` folder.

```bash
npm -g install serverless # if not already on your computer

# Done for this project
# sls create --template <insert template e.g aws-python3>

# Done for this project
# Update serverless.yml

# install serverless plugins
cd infra && npm install

make deploy

```

## Setting Up Python

```bash
# install pyenv https://opensource.com/article/19/5/python-3-default-mac
brew install pyenv
pyenv install 3.9.1

# install pyenv-virtualenv https://github.com/pyenv/pyenv-virtualenv
brew install pyenv-virtualenv
# Add `eval "$(pyenv virtualenv-init -)"` to .bashrc

# You should now be able to enter this repo and you will automatically use 3.6.1, you can check with:
python --version

pip install -r requirements
```

## Dev with serverless

```bash
## With Unittest
make tests

## Serverless
make deploy # Test with postman
make deploy-prod
```
