'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsxFileName = "src/react/get_skin_quiz_results.js",
    _this = this;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SkincareResult = function SkincareResult(props) {
  return React.createElement(
    "section",
    _defineProperty({ className: "features-extended section", __source: {
        fileName: _jsxFileName,
        lineNumber: 5
      },
      __self: _this
    }, "__self", _this),
    React.createElement(
      "div",
      _defineProperty({ className: "features-extended-inner section-inner", __source: {
          fileName: _jsxFileName,
          lineNumber: 6
        },
        __self: _this
      }, "__self", _this),
      React.createElement(
        "div",
        _defineProperty({ className: "features-extended-wrap", __source: {
            fileName: _jsxFileName,
            lineNumber: 7
          },
          __self: _this
        }, "__self", _this),
        React.createElement(
          "div",
          _defineProperty({ className: "container", __source: {
              fileName: _jsxFileName,
              lineNumber: 8
            },
            __self: _this
          }, "__self", _this),
          React.createElement(
            "div",
            _defineProperty({ className: "feature-extended feature-extended-bubble", __source: {
                fileName: _jsxFileName,
                lineNumber: 9
              },
              __self: _this
            }, "__self", _this),
            React.createElement(
              "div",
              _defineProperty({ className: "hero-paragraph is-revealing", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 10
                },
                __self: _this
              }, "__self", _this),
              props.mainHeading ? React.createElement(
                "h2",
                _defineProperty({ className: "mt-0 mb-16", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 12
                  },
                  __self: _this
                }, "__self", _this),
                props.title
              ) : React.createElement(
                "h3",
                _defineProperty({ className: "mt-0 mb-16", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 13
                  },
                  __self: _this
                }, "__self", _this),
                props.title
              ),
              React.createElement(
                "p",
                _defineProperty({
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 15
                  },
                  __self: _this
                }, "__self", _this),
                props.subText
              )
            )
          )
        )
      )
    )
  );
};

var skinQuizKeyPrefix = "qr_";
var qrSkinTypeKey = "qr_skin_type";
var qrSkinConditionsKey = "qr_skin_conditions";

var _get_valid_quiz_url_params_dict = function _get_valid_quiz_url_params_dict(urlParams) {
  var quiz_result_params = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = urlParams.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entry = _step.value;

      if (entry[0].startsWith(skinQuizKeyPrefix)) quiz_result_params[entry[0]] = entry[1];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return quiz_result_params;
};

var _getSkinQuizUrlParams = function _getSkinQuizUrlParams(queryString) {
  // Get qr_ params from url and return [[qr_key, value], ...]
  var urlParams = new URLSearchParams(queryString);
  var quizResultParams = _get_valid_quiz_url_params_dict(urlParams);
  return quizResultParams;
};

var _getSkincareResultsHeading = function _getSkincareResultsHeading(urlParamsFromQuizObj) {
  // Introduce main skintypes of person in heading bubble
  // qr_skin_type, qr_skin_conditions
  var title = "";
  var subText = "";
  if (qrSkinTypeKey in urlParamsFromQuizObj && qrSkinConditionsKey in urlParamsFromQuizObj) {
    title = React.createElement(
      "p",
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: _this
      }, "__self", _this),
      "You've told us that you have ",
      React.createElement(
        "span",
        _defineProperty({ className: "text-primary", __source: {
            fileName: _jsxFileName,
            lineNumber: 52
          },
          __self: _this
        }, "__self", _this),
        urlParamsFromQuizObj[qrSkinTypeKey],
        " skin"
      ),
      " with ",
      React.createElement(
        "span",
        _defineProperty({ className: "text-primary", __source: {
            fileName: _jsxFileName,
            lineNumber: 52
          },
          __self: _this
        }, "__self", _this),
        urlParamsFromQuizObj[qrSkinConditionsKey]
      )
    );
    subText = React.createElement(
      "p",
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: _this
      }, "__self", _this),
      "Here are the tips we have for you..."
    );
  } else {
    title = React.createElement(
      "p",
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: _this
      }, "__self", _this),
      "Please take the skin quiz below."
    );
    subText = React.createElement(
      "p",
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        },
        __self: _this
      }, "__self", _this),
      "Here's the link: ",
      React.createElement(
        "a",
        _defineProperty({ href: "https://tripetto.app/run/EHWPX9R8UN", __source: {
            fileName: _jsxFileName,
            lineNumber: 56
          },
          __self: _this
        }, "__self", _this),
        "Skin Recommendation Quiz"
      )
    );
  }

  return React.createElement(SkincareResult, _defineProperty({ title: title, subText: subText, mainHeading: true, __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: _this
  }, "__self", _this));
};

var _getQuizResultsFromGSheets = function _getQuizResultsFromGSheets(urlParamsFromQuizObj, setGSheetResults, setResultsQueried, setError) {
  //TODO: Just got the lambda working with this in the console, but
  // its not working within react to update state.
  var body = {
    quiz_answers: ["nodulocystic acne", "poopy"]
  };
  axios.post('https://nqn3mai071.execute-api.us-east-1.amazonaws.com/prod/skin-quiz-results', body).then(function (response) {
    setGSheetResults(response.data.quiz_results);
  }).catch(function (error) {
    setError({ errorMessage: error.message });
    console.error('There was an error!', error);
  }).finally(function (response) {
    setResultsQueried(true);
  });
};

var _getSkincareResultsBubbles = function _getSkincareResultsBubbles(urlParamsFromQuizObj, gSheetResults) {
  // Get skin quiz results and display them as components
  var urlParamsFromQuizPairs = Object.entries(urlParamsFromQuizObj);

  var skincareResults = urlParamsFromQuizPairs.map(function (paramPair) {
    var title = React.createElement(
      "p",
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: _this
      }, "__self", _this),
      "It looks like you have ",
      React.createElement(
        "span",
        _defineProperty({ className: "text-primary", __source: {
            fileName: _jsxFileName,
            lineNumber: 86
          },
          __self: _this
        }, "__self", _this),
        paramPair[1]
      )
    );
    var subText = React.createElement(
      "p",
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        },
        __self: _this
      }, "__self", _this),
      "Try out this advice...",
      JSON.stringify(gSheetResults)
    );
    return React.createElement(SkincareResult, _defineProperty({ title: title, subText: subText, mainHeading: false, __source: {
        fileName: _jsxFileName,
        lineNumber: 88
      },
      __self: _this
    }, "__self", _this));
  });
  return skincareResults;
};

var SkincareResults = function SkincareResults(props) {
  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      error = _React$useState2[0],
      setError = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      resultsQueried = _React$useState4[0],
      setResultsQueried = _React$useState4[1];

  var _React$useState5 = React.useState([]),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      gSheetResults = _React$useState6[0],
      setGSheetResults = _React$useState6[1];

  var urlParamsFromQuizObj = _getSkinQuizUrlParams(window.location.search);
  var skincareResultsHeading = _getSkincareResultsHeading(urlParamsFromQuizObj);

  var _React$useState7 = React.useState([skincareResultsHeading, React.createElement(SkincareResult, _defineProperty({ title: "Loading results...", __source: {
      fileName: _jsxFileName,
      lineNumber: 103
    },
    __self: _this
  }, "__self", _this))]),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      skincareResults = _React$useState8[0],
      setSkincareResults = _React$useState8[1];

  React.useEffect(function () {

    if (resultsQueried === false) {
      _getQuizResultsFromGSheets("", setGSheetResults, setResultsQueried, setError);
    } else {
      var retrievedSkincareResults = _getSkincareResultsBubbles(urlParamsFromQuizObj, gSheetResults);
      var newSkincareResults = [skincareResultsHeading].concat(retrievedSkincareResults);
      setSkincareResults(newSkincareResults);
    }
    console.log("useEffect " + JSON.stringify(gSheetResults));
  }, [resultsQueried]);

  // Can't use new fragment syntax yet, babel 7 is in beta.
  return React.createElement(
    React.Fragment,
    _defineProperty({
      __source: {
        fileName: _jsxFileName,
        lineNumber: 121
      },
      __self: _this
    }, "__self", _this),
    skincareResults
  );
};

var SkincareResultsViewed = React.createElement(SkincareResults, _defineProperty({
  __source: {
    fileName: _jsxFileName,
    lineNumber: 124
  },
  __self: this
}, "__self", this));

var domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);