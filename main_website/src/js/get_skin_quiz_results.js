'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsxFileName = "src/react/get_skin_quiz_results.js",
    _this = this;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var skinQuizKeyPrefix = "qr_";
var qrSkinTypeKey = "qr_skin_type";
var qrSkinConditionsKey = "qr_skin_conditions";
var skinTraitGSheetsKey = "Skin Trait";
var adviceKey = "Advice ";

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

var SkincareResult = function SkincareResult(props) {
  return React.createElement(
    "section",
    _defineProperty({ className: "features-extended section", __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: _this
    }, "__self", _this),
    React.createElement(
      "div",
      _defineProperty({ className: "features-extended-inner section-inner", __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        __self: _this
      }, "__self", _this),
      React.createElement(
        "div",
        _defineProperty({ className: "features-extended-wrap", __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          },
          __self: _this
        }, "__self", _this),
        React.createElement(
          "div",
          _defineProperty({ className: "container", __source: {
              fileName: _jsxFileName,
              lineNumber: 29
            },
            __self: _this
          }, "__self", _this),
          React.createElement(
            "div",
            _defineProperty({ className: "feature-extended feature-extended-bubble", __source: {
                fileName: _jsxFileName,
                lineNumber: 30
              },
              __self: _this
            }, "__self", _this),
            React.createElement(
              "div",
              _defineProperty({ className: "hero-paragraph", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 31
                },
                __self: _this
              }, "__self", _this),
              "  ",
              props.mainHeading ? React.createElement(
                "h2",
                _defineProperty({ className: "mt-0 mb-16", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 33
                  },
                  __self: _this
                }, "__self", _this),
                props.title
              ) : React.createElement(
                "h3",
                _defineProperty({ className: "mt-0 mb-16", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 34
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
                    lineNumber: 36
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

var _getSkincareResultsHeading = function _getSkincareResultsHeading(urlParamsFromQuizObj) {
  // Introduce main skintypes of person in heading bubble
  // qr_skin_type, qr_skin_conditions
  var title = "";
  var subText = "";
  if (qrSkinTypeKey in urlParamsFromQuizObj && qrSkinConditionsKey in urlParamsFromQuizObj) {
    title = React.createElement(
      React.Fragment,
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: _this
      }, "__self", _this),
      React.createElement(
        "span",
        _defineProperty({ style: { fontSize: "75%" }, __source: {
            fileName: _jsxFileName,
            lineNumber: 52
          },
          __self: _this
        }, "__self", _this),
        "You're skin type:"
      ),
      " ",
      React.createElement("br", _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: _this
      }, "__self", _this)),
      React.createElement(
        "span",
        _defineProperty({ className: "text-primary", __source: {
            fileName: _jsxFileName,
            lineNumber: 52
          },
          __self: _this
        }, "__self", _this),
        urlParamsFromQuizObj[qrSkinTypeKey]
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
      ),
      "."
    );
    subText = React.createElement(
      React.Fragment,
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: _this
      }, "__self", _this),
      "Here are the tips we have for this skin type",
      React.createElement("br", _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: _this
      }, "__self", _this)),
      " to help you get started on your journey."
    );
  } else {
    title = React.createElement(
      React.Fragment,
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
      React.Fragment,
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

var _getUrlParamInGSheetKeyFormat = function _getUrlParamInGSheetKeyFormat(paramPair) {
  return String(paramPair[0] + ":" + paramPair[1]).toLowerCase();
};

var _getQuizResultsFromGSheets = function _getQuizResultsFromGSheets(urlParamsFromQuizPairs, setGSheetResults, setResultsQueried, setError) {
  // Get Answers For Quiz Results From Our Google Sheet

  var body = {
    quiz_answers: urlParamsFromQuizPairs.map(function (paramPair) {
      return _getUrlParamInGSheetKeyFormat(paramPair);
    })
  };
  // Forced to use promises due to babel's shitty transpiling (hrs of work put in this OOF)
  axios.post('https://nqn3mai071.execute-api.us-east-1.amazonaws.com/prod/skin-quiz-results', body).then(function (response) {
    var quizResults = response.data.quiz_results;
    var quizResultsMap = new Map(quizResults.map(function (i) {
      return [i[skinTraitGSheetsKey], i];
    }));
    setGSheetResults(quizResultsMap);
  }).catch(function (error) {
    setError({ errorMessage: JSON.stringify(error.message) });
  }).finally(function (response) {
    setResultsQueried(true);
  });
};

var _printAdvices = function _printAdvices(gSheetResults, bubbleParamPair) {
  var thisBubblesAdvice = gSheetResults.get(_getUrlParamInGSheetKeyFormat(bubbleParamPair));

  console.log(thisBubblesAdvice);
  console.log("thisBubblesAdvice");
  console.log(gSheetResults);
  console.log("gSheetResults");

  //TODO: Error check: if we can't .get a key
  var advices = Object.entries(thisBubblesAdvice).filter(function (paramPair) {
    return paramPair[0].startsWith(adviceKey) && paramPair[1] !== "";
  });
  console.log(advices);
  console.log("String(advices) " + String(advices));

  return String(advices);
};

var _getSkincareResultsBubbles = function _getSkincareResultsBubbles(urlParamsFromQuizPairs, gSheetResults) {
  // Get skin quiz results and display them as components
  console.log(urlParamsFromQuizPairs);

  var skincareResults = urlParamsFromQuizPairs.map(function (paramPair) {
    if (gSheetResults.has(_getUrlParamInGSheetKeyFormat(paramPair))) {
      var title = React.createElement(
        React.Fragment,
        _defineProperty({
          __source: {
            fileName: _jsxFileName,
            lineNumber: 113
          },
          __self: _this
        }, "__self", _this),
        "For ",
        React.createElement(
          "span",
          _defineProperty({ className: "text-primary", __source: {
              fileName: _jsxFileName,
              lineNumber: 113
            },
            __self: _this
          }, "__self", _this),
          paramPair[1]
        )
      );
      var subText = React.createElement(
        React.Fragment,
        _defineProperty({
          __source: {
            fileName: _jsxFileName,
            lineNumber: 114
          },
          __self: _this
        }, "__self", _this),
        _printAdvices(gSheetResults, paramPair)
      );
      return React.createElement(SkincareResult, _defineProperty({ title: title, subText: subText, mainHeading: false, __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: _this
      }, "__self", _this));
    }
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

  var _React$useState5 = React.useState(new Map()),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      gSheetResults = _React$useState6[0],
      setGSheetResults = _React$useState6[1];

  var urlParamsFromQuizObj = _getSkinQuizUrlParams(window.location.search);
  var skincareResultsHeading = _getSkincareResultsHeading(urlParamsFromQuizObj);
  var urlParamsFromQuizPairs = Object.entries(urlParamsFromQuizObj);

  var _React$useState7 = React.useState([skincareResultsHeading, React.createElement(SkincareResult, _defineProperty({ title: "Loading results...", __source: {
      fileName: _jsxFileName,
      lineNumber: 133
    },
    __self: _this
  }, "__self", _this))]),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      skincareResults = _React$useState8[0],
      setSkincareResults = _React$useState8[1];

  React.useEffect(function () {
    if (resultsQueried === false) {
      _getQuizResultsFromGSheets(urlParamsFromQuizPairs, setGSheetResults, setResultsQueried, setError);
    } else {
      var retrievedSkincareResults = void 0;
      if (error) {
        retrievedSkincareResults = React.createElement(SkincareResult, _defineProperty({ title: "Loading results...Error", subTitle: error.errorMessage, __source: {
            fileName: _jsxFileName,
            lineNumber: 143
          },
          __self: _this
        }, "__self", _this));
      } else {
        retrievedSkincareResults = _getSkincareResultsBubbles(urlParamsFromQuizPairs, gSheetResults);
      }
      var newSkincareResults = [skincareResultsHeading].concat(retrievedSkincareResults);
      setSkincareResults(newSkincareResults);
    }
  }, [resultsQueried]);

  // Can't use new fragment syntax yet, babel 7 is in beta.
  return React.createElement(
    React.Fragment,
    _defineProperty({
      __source: {
        fileName: _jsxFileName,
        lineNumber: 153
      },
      __self: _this
    }, "__self", _this),
    skincareResults
  );
};

var SkincareResultsViewed = React.createElement(SkincareResults, _defineProperty({
  __source: {
    fileName: _jsxFileName,
    lineNumber: 156
  },
  __self: this
}, "__self", this));

var domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);