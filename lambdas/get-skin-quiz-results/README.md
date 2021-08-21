# Working With Lambdas

## Setting up with serverless

```
npm -g install serverless # if not already on your computer

sls create --template <insert template e.g aws-python3>

# Update serverless.yml

# install serverless plugins
npm install

sls deploy --stage <dev or prod>

```

## Setting Up Python

```
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

```

## With Unittest
make tests

## Serverless
make deploy
make deploy-prod
```
