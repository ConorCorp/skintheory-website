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
var gSheetLambdaUrl = 'https://nqn3mai071.execute-api.us-east-1.amazonaws.com/prod/skin-quiz-results';

var _get_valid_quiz_url_params_dict = function _get_valid_quiz_url_params_dict(urlParams) {
  var quiz_result_params = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = urlParams.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entry = _step.value;

      if (entry[0].startsWith(skinQuizKeyPrefix) && entry[1] !== "") {
        quiz_result_params[entry[0]] = entry[1];
      }
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
  var mainId = props.mainHeading ? "main-bubble" : "";

  return React.createElement(
    "section",
    _defineProperty({ className: "features-extended section", id: mainId, __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      },
      __self: _this
    }, "__self", _this),
    React.createElement(
      "div",
      _defineProperty({ className: "features-extended-inner section-inner", __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        },
        __self: _this
      }, "__self", _this),
      React.createElement(
        "div",
        _defineProperty({ className: "features-extended-wrap", __source: {
            fileName: _jsxFileName,
            lineNumber: 33
          },
          __self: _this
        }, "__self", _this),
        React.createElement(
          "div",
          _defineProperty({ className: "container", __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            },
            __self: _this
          }, "__self", _this),
          React.createElement(
            "div",
            _defineProperty({ className: "feature-extended feature-extended-bubble", __source: {
                fileName: _jsxFileName,
                lineNumber: 35
              },
              __self: _this
            }, "__self", _this),
            React.createElement(
              "div",
              _defineProperty({ className: "hero-paragraph", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 36
                },
                __self: _this
              }, "__self", _this),
              "  ",
              props.mainHeading ? React.createElement(
                "h2",
                _defineProperty({ className: "mt-0 mb-16", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 38
                  },
                  __self: _this
                }, "__self", _this),
                props.title
              ) : React.createElement(
                "h3",
                _defineProperty({ className: "mt-0 mb-16", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 39
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
                    lineNumber: 41
                  },
                  __self: _this
                }, "__self", _this),
                props.subText
              ),
              props.bottomContent
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
  var skincareResultsHeadings = [];
  if (qrSkinTypeKey in urlParamsFromQuizObj && qrSkinConditionsKey in urlParamsFromQuizObj) {
    title = React.createElement(
      React.Fragment,
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: _this
      }, "__self", _this),
      React.createElement(
        "span",
        _defineProperty({ style: { fontSize: "75%" }, __source: {
            fileName: _jsxFileName,
            lineNumber: 59
          },
          __self: _this
        }, "__self", _this),
        "You're skin type:"
      ),
      " ",
      React.createElement("br", _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: _this
      }, "__self", _this)),
      React.createElement(
        "span",
        _defineProperty({ className: "text-primary", __source: {
            fileName: _jsxFileName,
            lineNumber: 59
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
            lineNumber: 59
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
          lineNumber: 60
        },
        __self: _this
      }, "__self", _this),
      "Here are some tips to help you start",
      React.createElement("br", _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: _this
      }, "__self", _this)),
      "your skin journey right."
    );
    var loadingText = "Loading results...";
    skincareResultsHeadings.push(React.createElement(SkincareResult, _defineProperty({ title: loadingText, key: loadingText, __source: {
        fileName: _jsxFileName,
        lineNumber: 62
      },
      __self: _this
    }, "__self", _this)));
  } else {
    title = React.createElement(
      React.Fragment,
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
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
          lineNumber: 65
        },
        __self: _this
      }, "__self", _this),
      "Here's the link: ",
      React.createElement(
        "a",
        _defineProperty({ href: "https://tripetto.app/run/EHWPX9R8UN", __source: {
            fileName: _jsxFileName,
            lineNumber: 65
          },
          __self: _this
        }, "__self", _this),
        "Skin Recommendation Quiz"
      )
    );
  }
  var arrayKey = title.props.children[0].props.children;
  skincareResultsHeadings.unshift(React.createElement(SkincareResult, _defineProperty({ title: title, subText: subText, mainHeading: true, key: arrayKey, __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: _this
  }, "__self", _this)));
  return skincareResultsHeadings;
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
  //TODO: Remove before production
  // const quizResults = [
  //       {
  //           "Skin Trait": "qr_acne_type:papular/pustular00000",
  //           "Advice 1": "Benzoyl Peroxide start at 3% will want to avoid the higher percentage BPs with sensative skin.",
  //           "Advice 2": "",
  //           "Advice 3": "",
  //           "Advice 4": "",
  //           "Advice 5": ""
  //       },
  //       {
  //           "Skin Trait": "qr_skin_type:sensitive skin",
  //           "Advice 1": "Wash your face every morning, evening, and after exercising.",
  //           "Advice 2": "Keep baths/showers short, avoid using very hot water.",
  //           "Advice 3": "Be gentle with your skin, try and avoid vigorous scrubbing as this will irritate the skin and potentially make it worse.",
  //           "Advice 4": "Avoid harsh facial washes/scrubs. Many people with oily skin believe they need something \"strong\" to cut through the oil. In fact, gentle washes (and gentle washing!) will be better for your skin. Irritated skin can actually produce more oils and exacerbate the issue!",
  //           "Advice 5": "Wear sunscreen! Avoid sunscreens with fragrances or oils. The AADA recommends looking for sunscreens that contain zinc oxide and titanium dioxide."
  //       },
  //       {
  //           "Skin Trait": "qr_skin_conditions:acne",
  //           "Advice 1": "",
  //           "Advice 2": "",
  //           "Advice 3": "",
  //           "Advice 4": "",
  //           "Advice 5": ""
  //       }
  //     ]
  // const quizResultsMap = new Map(quizResults.map(i => [i[skinTraitGSheetsKey], i]));
  // setGSheetResults(quizResultsMap)
  // setResultsQueried(true)
  // Forced to use promises due to babel's shitty transpiling (hrs of work put in this OOF)
  axios.post(gSheetLambdaUrl, body).then(function (response) {
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
  var advices = Object.entries(thisBubblesAdvice).filter(function (paramPair) {
    return paramPair[0].startsWith(adviceKey) && paramPair[1] !== "";
  });
  var formattedAdviceComponents = advices.map(function (paramPair) {
    return React.createElement(
      "li",
      _defineProperty({ key: paramPair[0], __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: _this
      }, "__self", _this),
      React.createElement(
        "span",
        _defineProperty({ className: "advice", __source: {
            fileName: _jsxFileName,
            lineNumber: 135
          },
          __self: _this
        }, "__self", _this),
        paramPair[0],
        ":"
      ),
      " ",
      paramPair[1]
    );
  });
  return React.createElement(
    "ul",
    _defineProperty({ className: "skin-advice-list", __source: {
        fileName: _jsxFileName,
        lineNumber: 137
      },
      __self: _this
    }, "__self", _this),
    formattedAdviceComponents
  );
};

var _getSkincareResultsBubbles = function _getSkincareResultsBubbles(urlParamsFromQuizPairs, gSheetResults) {
  // Get skin quiz results and display them as components
  var skincareResults = urlParamsFromQuizPairs.map(function (paramPair) {
    var gSheetKey = _getUrlParamInGSheetKeyFormat(paramPair);
    if (gSheetResults.has(gSheetKey) && gSheetResults.get(gSheetKey)[adviceKey + "1"] !== "") {
      var title = React.createElement(
        React.Fragment,
        _defineProperty({
          __source: {
            fileName: _jsxFileName,
            lineNumber: 146
          },
          __self: _this
        }, "__self", _this),
        "For ",
        React.createElement(
          "span",
          _defineProperty({ className: "text-primary", __source: {
              fileName: _jsxFileName,
              lineNumber: 146
            },
            __self: _this
          }, "__self", _this),
          paramPair[1]
        )
      );
      var bottomContent = React.createElement(
        React.Fragment,
        _defineProperty({
          __source: {
            fileName: _jsxFileName,
            lineNumber: 147
          },
          __self: _this
        }, "__self", _this),
        _printAdvices(gSheetResults, paramPair)
      );
      return React.createElement(SkincareResult, _defineProperty({ title: title, bottomContent: bottomContent, mainHeading: false, key: paramPair[1], __source: {
          fileName: _jsxFileName,
          lineNumber: 148
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
  var urlParamsFromQuizPairs = Object.entries(urlParamsFromQuizObj);
  var skincareResultsHeadings = _getSkincareResultsHeading(urlParamsFromQuizObj);

  var _React$useState7 = React.useState(skincareResultsHeadings),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      skincareResults = _React$useState8[0],
      setSkincareResults = _React$useState8[1];

  React.useEffect(function () {
    if (resultsQueried === false) {
      _getQuizResultsFromGSheets(urlParamsFromQuizPairs, setGSheetResults, setResultsQueried, setError);
    } else {
      var retrievedSkincareResults = void 0;
      if (error) {
        var loadingErrorText = "Loading results...Error";
        var loadingErrorSubText = React.createElement(
          React.Fragment,
          _defineProperty({
            __source: {
              fileName: _jsxFileName,
              lineNumber: 172
            },
            __self: _this
          }, "__self", _this),
          "Please retake the quiz, try again later, or email ",
          React.createElement(
            "a",
            _defineProperty({
              __source: {
                fileName: _jsxFileName,
                lineNumber: 172
              },
              __self: _this
            }, "__self", _this),
            "support@skintheory.app."
          ),
          React.createElement("br", _defineProperty({
            __source: {
              fileName: _jsxFileName,
              lineNumber: 172
            },
            __self: _this
          }, "__self", _this)),
          React.createElement(
            "i",
            _defineProperty({
              __source: {
                fileName: _jsxFileName,
                lineNumber: 172
              },
              __self: _this
            }, "__self", _this),
            error.errorMessage
          )
        );
        retrievedSkincareResults = React.createElement(SkincareResult, _defineProperty({ title: loadingErrorText, subText: loadingErrorSubText, key: loadingErrorText, __source: {
            fileName: _jsxFileName,
            lineNumber: 173
          },
          __self: _this
        }, "__self", _this));
      } else {
        retrievedSkincareResults = _getSkincareResultsBubbles(urlParamsFromQuizPairs, gSheetResults);
      }
      var newSkincareResults = [skincareResults.slice(0, 1)].concat(retrievedSkincareResults); // Remove first "Loading..." bubble
      setSkincareResults(newSkincareResults);
    }
  }, [resultsQueried]);

  // Can't use new fragment syntax yet, babel 7 is in beta.
  return React.createElement(
    React.Fragment,
    _defineProperty({
      __source: {
        fileName: _jsxFileName,
        lineNumber: 183
      },
      __self: _this
    }, "__self", _this),
    skincareResults
  );
};

var SkincareResultsViewed = React.createElement(SkincareResults, _defineProperty({
  __source: {
    fileName: _jsxFileName,
    lineNumber: 186
  },
  __self: this
}, "__self", this));

var domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);