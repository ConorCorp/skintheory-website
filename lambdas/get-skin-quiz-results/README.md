# SkinTheory Lambdaas

## Summary

We're trying to use a serverless architecture for our backend custom code, cuz dat shit is fly ✈️ (for multiple reasons). We add new lambdas with serverless and implement the functions in Python.

## Setting up with serverless

We use serverless to deploy our lambdas.

```bash
# Install docker
npm -g install serverless # if not already on your computer

# Done for this project
# sls create --template <insert template e.g aws-python3>

# Done for this project
# Update serverless.yml

# install serverless plugins
npm install
```

## Setting Up Python

```bash
# install pyenv https://opensource.com/article/19/5/python-3-default-mac
brew install pyenv
pyenv install 3.8.7

# install pyenv-virtualenv https://github.com/pyenv/pyenv-virtualenv
brew install pyenv-virtualenv
# Add to .zshrc
# eval "$(pyenv init -)"
# eval "$(pyenv virtualenv-init -)"

# You should now be able to enter this repo and you will automatically use 3.6.1, you can check with:
python --version

pip install -r requirements.txt
```

## Dev with serverless

```bash
## With Unittest
make tests

## Serverless - make sure docker is running
sls offline # Test locally with postman. Uses system python packages.
make deployf # Deploy only re zips code and deploys instead of whole infra
make deploy # Deploys full dev infra, need if updated serverless.yml
make deploy-prod
make deployf-prod
```
