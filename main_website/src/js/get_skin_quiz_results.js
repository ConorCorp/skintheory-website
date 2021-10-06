'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsxFileName = "src/react/get_skin_quiz_results.js",
    _this = this;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var skinQuizKeyPrefix = "qr_";
var qrSkinTypeKey = "qr_skin_type";
var qrSkinConditionsKey = "qr_skin_conditions";
var qrFirstNameKey = "qr_first_name";

var skinTraitGSheetsKey = "Skin Trait";
var adviceKey = "Advice ";
var gSheetLambdaUrl = 'https://nqn3mai071.execute-api.us-east-1.amazonaws.com/prod/skin-quiz-results';
var skinTypeGifs = new Map([["oily skin", "https://media0.giphy.com/media/3o6MbcAaPmBnUwPtZu/giphy.gif?cid=790b7611402b0d4b22af4ee36d0e400925e584cf75ea7157&rid=giphy.gif&ct=g"], ["normal skin", "https://media0.giphy.com/media/3oKIPa8aoMmpUz5xKg/giphy.gif?cid=790b7611ba1a91551b7162e4b7954acaa0f07f22047f03d5&rid=giphy.gif&ct=g"], ["dry skin", "https://media1.giphy.com/media/l2JejeuDbtGVSDrTW/giphy.gif?cid=790b7611176d8104f4de11a9994c0b80af8aaff02e96f3bf&rid=giphy.gif&ct=g"], ["combination skin", "https://i.giphy.com/media/kQYNaEa35hQ6pCYywH/giphy-downsized-large.gif"], ["sensitive skin", "https://media2.giphy.com/media/fWgdQGsrCsU4NoQ6D9/giphy.gif?cid=790b76111b5e228bf9d039498d178f517fe26866a9c70daf&rid=giphy.gif&ct=g"]]);

var locStoreKey_gSheetReqBody = "gSheetReqBody";
var locStoreKey_gSheetRespMap = "gSheetRespMap";
var locStoreKey_lastGSheetReqDate = "lastGSheetReqDate";

var _get_valid_quiz_url_params_dict = function _get_valid_quiz_url_params_dict(urlParams) {
  var quizResultParams = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = urlParams.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entry = _step.value;

      if (entry[0].startsWith(skinQuizKeyPrefix) && entry[1] !== "") {
        quizResultParams[entry[0]] = entry[1].toLowerCase();
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

  return quizResultParams;
};

var _getSkinQuizUrlParams = function _getSkinQuizUrlParams(queryString) {
  // Get qr_ params from url and return [[qr_key, value], ...]
  var urlParams = new URLSearchParams(queryString);
  var quizResultParams = _get_valid_quiz_url_params_dict(urlParams);
  return quizResultParams;
};

var SkincareResult = function SkincareResult(props) {
  var mainId = props.mainHeading ? "main-bubble" : null;
  var mainHeading = null;
  if (props.mainHeading !== null) {
    mainHeading = props.mainHeading ? React.createElement(
      "h2",
      _defineProperty({ className: "mt-0 mb-16", __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: _this
      }, "__self", _this),
      props.title
    ) : React.createElement(
      "h3",
      _defineProperty({ className: "mt-0 mb-16", __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: _this
      }, "__self", _this),
      props.title
    );
  }

  return React.createElement(
    "section",
    _defineProperty({ className: "features-extended section", id: mainId, __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: _this
    }, "__self", _this),
    React.createElement(
      "div",
      _defineProperty({ className: "features-extended-inner section-inner", __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: _this
      }, "__self", _this),
      React.createElement(
        "div",
        _defineProperty({ className: "features-extended-wrap", __source: {
            fileName: _jsxFileName,
            lineNumber: 53
          },
          __self: _this
        }, "__self", _this),
        React.createElement(
          "div",
          _defineProperty({ className: "container", __source: {
              fileName: _jsxFileName,
              lineNumber: 54
            },
            __self: _this
          }, "__self", _this),
          React.createElement(
            "div",
            _defineProperty({ className: "feature-extended feature-extended-bubble", __source: {
                fileName: _jsxFileName,
                lineNumber: 55
              },
              __self: _this
            }, "__self", _this),
            React.createElement(
              "div",
              _defineProperty({ className: "hero-paragraph", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 56
                },
                __self: _this
              }, "__self", _this),
              "  ",
              props.topContent,
              mainHeading,
              props.bottomContent
            )
          )
        )
      )
    )
  );
};

var _generateHeadingBottomContent = function _generateHeadingBottomContent(skinType) {
  var bottomContent = [];
  var gifUrl = skinTypeGifs.get(skinType);
  if (gifUrl) {
    var _React$createElement9;

    bottomContent.push(React.createElement("img", (_React$createElement9 = { key: "imgGif", src: gifUrl, width: "350" }, _defineProperty(_React$createElement9, "key", "gif"), _defineProperty(_React$createElement9, "__source", {
      fileName: _jsxFileName,
      lineNumber: 73
    }), _defineProperty(_React$createElement9, "__self", _this), _defineProperty(_React$createElement9, "__self", _this), _React$createElement9)));
  }
  var subtitle = React.createElement(
    "p",
    _defineProperty({ className: "mt-8", key: "subtitle", __source: {
        fileName: _jsxFileName,
        lineNumber: 75
      },
      __self: _this
    }, "__self", _this),
    "Here are some tips to get you started on ",
    React.createElement("br", _defineProperty({
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75
      },
      __self: _this
    }, "__self", _this)),
    "your skin journey."
  );
  bottomContent.push(subtitle);
  return bottomContent;
};

var _getQuizDisclaimer = function _getQuizDisclaimer() {
  var title = React.createElement(
    React.Fragment,
    _defineProperty({
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81
      },
      __self: _this
    }, "__self", _this),
    "About this quiz"
  );
  var bottomContent = React.createElement(
    React.Fragment,
    _defineProperty({
      __source: {
        fileName: _jsxFileName,
        lineNumber: 82
      },
      __self: _this
    }, "__self", _this),
    React.createElement(
      "p",
      _defineProperty({ key: "p", __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        },
        __self: _this
      }, "__self", _this),
      "The results for this quiz are based on current medical advice from a real and very much American (\uD83C\uDDFA\uD83C\uDDF8) doctor. Even though this is the case, we (SkinTheory), are only providing the results of this quiz for educational purposes."
    ),
    React.createElement(
      "ul",
      _defineProperty({ id: "disclaimer", key: "ul", __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        },
        __self: _this
      }, "__self", _this),
      React.createElement(
        "li",
        _defineProperty({ key: "1", __source: {
            fileName: _jsxFileName,
            lineNumber: 89
          },
          __self: _this
        }, "__self", _this),
        "The information provided on the site is for educational purposes only, and does not substitute for professional medical advice."
      ),
      React.createElement(
        "li",
        _defineProperty({ key: "2", __source: {
            fileName: _jsxFileName,
            lineNumber: 90
          },
          __self: _this
        }, "__self", _this),
        "Consult a medical professional or healthcare provider if they\u2019re seeking medical advice, diagnoses, or treatment."
      ),
      React.createElement(
        "li",
        _defineProperty({ key: "3", __source: {
            fileName: _jsxFileName,
            lineNumber: 91
          },
          __self: _this
        }, "__self", _this),
        "SkinTheory is not liable for risks or issues associated with using or acting upon the information on your site"
      )
    )
  );
  var arrayKey = title.props.children;
  return React.createElement(SkincareResult, _defineProperty({ title: title, bottomContent: bottomContent, mainHeading: false, key: arrayKey, __source: {
      fileName: _jsxFileName,
      lineNumber: 95
    },
    __self: _this
  }, "__self", _this));
};

var _getUrlEncodedUrl = function _getUrlEncodedUrl() {
  return encodeURIComponent(window.location);
};

var _getProgressBar = function _getProgressBar() {
  var bottomContent = React.createElement(
    React.Fragment,
    _defineProperty({
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103
      },
      __self: _this
    }, "__self", _this),
    React.createElement("div", _defineProperty({ className: "progress", id: "progress", __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      },
      __self: _this
    }, "__self", _this)),
    React.createElement(
      "ul",
      _defineProperty({ className: "progress-list", key: "ul", __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: _this
      }, "__self", _this),
      React.createElement(
        "li",
        _defineProperty({ key: "1", __source: {
            fileName: _jsxFileName,
            lineNumber: 106
          },
          __self: _this
        }, "__self", _this),
        "\u2705\xA0\xA0Get personal skin routine recommendation."
      ),
      React.createElement(
        "li",
        _defineProperty({ key: "2", __source: {
            fileName: _jsxFileName,
            lineNumber: 107
          },
          __self: _this
        }, "__self", _this),
        "\u26A0\uFE0F\xA0\xA0Take a \"before\" picture with ",
        React.createElement(
          "a",
          _defineProperty({ href: "https://onelink.to/skintheory", target: "_blank", __source: {
              fileName: _jsxFileName,
              lineNumber: 107
            },
            __self: _this
          }, "__self", _this),
          "SkinTheory App"
        ),
        "."
      ),
      React.createElement(
        "li",
        _defineProperty({ key: "3", __source: {
            fileName: _jsxFileName,
            lineNumber: 108
          },
          __self: _this
        }, "__self", _this),
        "\u2757\xA0\xA0Start your new skincare routine."
      ),
      React.createElement(
        "li",
        _defineProperty({ key: "4", __source: {
            fileName: _jsxFileName,
            lineNumber: 109
          },
          __self: _this
        }, "__self", _this),
        "\u2757\xA0\xA0Track your routine. Get the skin you want."
      )
    )
  );
  return React.createElement(SkincareResult, _defineProperty({ title: "Your Progress", mainHeading: false, bottomContent: bottomContent, key: "progress-bar", __source: {
      fileName: _jsxFileName,
      lineNumber: 112
    },
    __self: _this
  }, "__self", _this));
};

var _getShareQuiz = function _getShareQuiz() {
  var openSharingWindow = function openSharingWindow(e, url) {
    e.preventDefault();
    window.open(url);
  };
  var printResultsPage = function printResultsPage(e) {
    e.preventDefault();
    window.print();
  };
  var urlsToOpen = new Map([["facebook", "https://www.facebook.com/sharer/sharer.php?u=" + _getUrlEncodedUrl()], ["twitter", "https://twitter.com/intent/tweet?text=" + encodeURIComponent(document.title) + ':%20' + _getUrlEncodedUrl()], ["pinterest", "http://pinterest.com/pin/create/button/?url=" + _getUrlEncodedUrl() + '&description=' + encodeURIComponent(document.title)], ["reddit", "http://www.reddit.com/submit?url=" + _getUrlEncodedUrl() + '&title=' + encodeURIComponent(document.title)], ["email", "mailto:?subject=" + encodeURIComponent(document.title) + '&body=' + _getUrlEncodedUrl()]]);

  var title = React.createElement(
    React.Fragment,
    _defineProperty({
      __source: {
        fileName: _jsxFileName,
        lineNumber: 132
      },
      __self: _this
    }, "__self", _this),
    "Print, share, or save quiz results!"
  );
  var bottomContent = React.createElement(
    React.Fragment,
    _defineProperty({
      __source: {
        fileName: _jsxFileName,
        lineNumber: 133
      },
      __self: _this
    }, "__self", _this),
    React.createElement(
      "p",
      _defineProperty({ key: "p", className: "text-light", __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        },
        __self: _this
      }, "__self", _this),
      "Put this advice next to the \uD83E\uDE9E in your \uD83D\uDEBB, bookmark the page, or share from below."
    ),
    React.createElement(
      "ul",
      _defineProperty({ key: "ul", className: "share-buttons", __source: {
          fileName: _jsxFileName,
          lineNumber: 138
        },
        __self: _this
      }, "__self", _this),
      React.createElement(
        "li",
        _defineProperty({ key: "0", __source: {
            fileName: _jsxFileName,
            lineNumber: 139
          },
          __self: _this
        }, "__self", _this),
        React.createElement(
          "a",
          _defineProperty({ href: urlsToOpen.get("printer"), title: "Print results", onClick: function onClick(e) {
              return printResultsPage(e);
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 139
            },
            __self: _this
          }, "__self", _this),
          React.createElement("img", _defineProperty({ alt: "Print results", width: "32px", src: "dist/images/simple_icons_black/printer.svg", __source: {
              fileName: _jsxFileName,
              lineNumber: 139
            },
            __self: _this
          }, "__self", _this))
        )
      ),
      React.createElement(
        "li",
        _defineProperty({ key: "5", __source: {
            fileName: _jsxFileName,
            lineNumber: 140
          },
          __self: _this
        }, "__self", _this),
        React.createElement(
          "a",
          _defineProperty({ href: urlsToOpen.get("email"), target: "_blank", title: "Send email", onClick: function onClick(e) {
              return openSharingWindow(e, urlsToOpen.get("email"));
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 140
            },
            __self: _this
          }, "__self", _this),
          React.createElement("img", _defineProperty({ alt: "Send email", width: "32px", src: "dist/images/simple_icons_black/email.svg", __source: {
              fileName: _jsxFileName,
              lineNumber: 140
            },
            __self: _this
          }, "__self", _this))
        )
      ),
      React.createElement(
        "li",
        _defineProperty({ key: "1", __source: {
            fileName: _jsxFileName,
            lineNumber: 141
          },
          __self: _this
        }, "__self", _this),
        React.createElement(
          "a",
          _defineProperty({ href: urlsToOpen.get("facebook"), title: "Share on Facebook", target: "_blank", onClick: function onClick(e) {
              return openSharingWindow(e, urlsToOpen.get("facebook"));
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 141
            },
            __self: _this
          }, "__self", _this),
          React.createElement("img", _defineProperty({ alt: "Share on Facebook", width: "32px", src: "dist/images/simple_icons_black/facebook.svg", __source: {
              fileName: _jsxFileName,
              lineNumber: 141
            },
            __self: _this
          }, "__self", _this))
        )
      ),
      React.createElement(
        "li",
        _defineProperty({ key: "2", __source: {
            fileName: _jsxFileName,
            lineNumber: 142
          },
          __self: _this
        }, "__self", _this),
        React.createElement(
          "a",
          _defineProperty({ href: urlsToOpen.get("twitter"), target: "_blank", title: "Tweet", onClick: function onClick(e) {
              return openSharingWindow(e, urlsToOpen.get("twitter"));
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 142
            },
            __self: _this
          }, "__self", _this),
          React.createElement("img", _defineProperty({ alt: "Tweet", width: "32px", src: "dist/images/simple_icons_black/twitter.svg", __source: {
              fileName: _jsxFileName,
              lineNumber: 142
            },
            __self: _this
          }, "__self", _this))
        )
      ),
      React.createElement(
        "li",
        _defineProperty({ key: "3", __source: {
            fileName: _jsxFileName,
            lineNumber: 143
          },
          __self: _this
        }, "__self", _this),
        React.createElement(
          "a",
          _defineProperty({ href: urlsToOpen.get("pinterest"), target: "_blank", title: "Pin it", onClick: function onClick(e) {
              return openSharingWindow(e, urlsToOpen.get("pinterest"));
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 143
            },
            __self: _this
          }, "__self", _this),
          React.createElement("img", _defineProperty({ alt: "Pin it", width: "25px", src: "dist/images/simple_icons_black/pinterest.svg", __source: {
              fileName: _jsxFileName,
              lineNumber: 143
            },
            __self: _this
          }, "__self", _this))
        )
      ),
      React.createElement(
        "li",
        _defineProperty({ key: "4", __source: {
            fileName: _jsxFileName,
            lineNumber: 144
          },
          __self: _this
        }, "__self", _this),
        React.createElement(
          "a",
          _defineProperty({ href: urlsToOpen.get("reddit"), target: "_blank", title: "Submit to Reddit", onClick: function onClick(e) {
              return openSharingWindow(e, urlsToOpen.get("reddit"));
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 144
            },
            __self: _this
          }, "__self", _this),
          React.createElement("img", _defineProperty({ alt: "Submit to Reddit", width: "32px", src: "dist/images/simple_icons_black/reddit.svg", __source: {
              fileName: _jsxFileName,
              lineNumber: 144
            },
            __self: _this
          }, "__self", _this))
        )
      )
    )
  );
  var arrayKey = title.props.children;
  return React.createElement(SkincareResult, _defineProperty({ title: title, bottomContent: bottomContent, mainHeading: false, key: arrayKey, __source: {
      fileName: _jsxFileName,
      lineNumber: 148
    },
    __self: _this
  }, "__self", _this));
};

var _getBubblesAfterQuizResults = function _getBubblesAfterQuizResults() {
  var bubblesToReturn = [];
  bubblesToReturn.push(_getProgressBar());
  bubblesToReturn.push(_getShareQuiz());
  bubblesToReturn.push(_getQuizDisclaimer());
  return bubblesToReturn;
};

var _getSkincareResultsHeading = function _getSkincareResultsHeading(urlParamsFromQuizObj) {
  // Introduce main skintypes of person in heading bubble
  // qr_skin_type, qr_skin_conditions
  var title = "";
  var topContent = null;
  var bottomContent = null;
  var skincareResultsHeadings = [];
  var arrayKey = "";

  if (qrSkinTypeKey in urlParamsFromQuizObj) {
    topContent = React.createElement(
      "p",
      _defineProperty({ className: "mb-8 text-light", style: { fontSize: "125%" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 169
        },
        __self: _this
      }, "__self", _this),
      "Your skin type:"
    );
    var skinConditionSection = urlParamsFromQuizObj[qrSkinConditionsKey] !== "" ? null : React.createElement(
      "span",
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 170
        },
        __self: _this
      }, "__self", _this),
      " with ",
      React.createElement(
        "span",
        _defineProperty({ className: "text-primary", __source: {
            fileName: _jsxFileName,
            lineNumber: 170
          },
          __self: _this
        }, "__self", _this),
        urlParamsFromQuizObj[qrSkinConditionsKey]
      )
    );
    title = React.createElement(
      React.Fragment,
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 171
        },
        __self: _this
      }, "__self", _this),
      React.createElement(
        "span",
        _defineProperty({ className: "text-primary", __source: {
            fileName: _jsxFileName,
            lineNumber: 171
          },
          __self: _this
        }, "__self", _this),
        urlParamsFromQuizObj[qrSkinTypeKey]
      ),
      skinConditionSection
    );
    bottomContent = _generateHeadingBottomContent(urlParamsFromQuizObj[qrSkinTypeKey]);
    arrayKey = title.props.children[0].props.children;
    var loadingText = "Loading results...";
    skincareResultsHeadings.push(React.createElement(SkincareResult, _defineProperty({ title: loadingText, key: loadingText, __source: {
        fileName: _jsxFileName,
        lineNumber: 175
      },
      __self: _this
    }, "__self", _this)));
  } else {
    title = React.createElement(
      React.Fragment,
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 177
        },
        __self: _this
      }, "__self", _this),
      "Please take the skin quiz below."
    );
    bottomContent = React.createElement(
      "p",
      _defineProperty({
        __source: {
          fileName: _jsxFileName,
          lineNumber: 178
        },
        __self: _this
      }, "__self", _this),
      "Here's the link: ",
      React.createElement(
        "a",
        _defineProperty({ href: "https://tripetto.app/run/EHWPX9R8UN", __source: {
            fileName: _jsxFileName,
            lineNumber: 178
          },
          __self: _this
        }, "__self", _this),
        "Skin Recommendation Quiz"
      )
    );
    arrayKey = title.props.children;
  }
  skincareResultsHeadings.unshift(React.createElement(SkincareResult, _defineProperty({ title: title, topContent: topContent, bottomContent: bottomContent, mainHeading: true, key: arrayKey, __source: {
      fileName: _jsxFileName,
      lineNumber: 181
    },
    __self: _this
  }, "__self", _this)));
  return skincareResultsHeadings;
};

var _getUrlParamInGSheetKeyFormat = function _getUrlParamInGSheetKeyFormat(paramPair) {
  return String(paramPair[0] + ":" + paramPair[1]).toLowerCase();
};

var _getCachedResult = function _getCachedResult(today, body, setGSheetResults, setResultsQueried) {
  // returns true if set cached result from previous request today
  var lastRequestEqual = localStorage.getItem(locStoreKey_gSheetReqBody) === JSON.stringify(body.quiz_answers);
  var lastRequestDateToday = localStorage.getItem(locStoreKey_lastGSheetReqDate) === today;
  var haveStoredRequest = localStorage.getItem(locStoreKey_gSheetRespMap) !== null;
  if (lastRequestEqual && lastRequestDateToday && haveStoredRequest) {
    try {
      var cachedReq = new Map(Object.entries(JSON.parse(localStorage.getItem(locStoreKey_gSheetRespMap))));
      setGSheetResults(cachedReq);
      setResultsQueried(true);
      console.log("Found skin quiz results from an identical cached query today. Thanks for saving my request limit ❤️");
      return true;
    } catch (storedVariableAllDumbLike) {
      console.log("ERROR: Can't get cached request :/");
      console.log(storedVariableAllDumbLike);
    }
  }
  return false;
};

var _getQuizResultsFromGSheets = function _getQuizResultsFromGSheets(urlParamsFromQuizPairs, setGSheetResults, setResultsQueried, setError) {
  // Get Answers For Quiz Results From Our Google Sheet

  var body = {
    quiz_answers: urlParamsFromQuizPairs.map(function (paramPair) {
      return _getUrlParamInGSheetKeyFormat(paramPair);
    })
  };

  var today = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  if (_getCachedResult(today, body, setGSheetResults, setResultsQueried)) {
    return;
  }

  // Forced to use promises due to babel's shitty transpiling (hrs of work put in this OOF)
  axios.post(gSheetLambdaUrl, body).then(function (response) {
    var quizResults = response.data.quiz_results;
    var quizResultsMap = new Map(quizResults.map(function (i) {
      return [i[skinTraitGSheetsKey], i];
    }));
    localStorage.setItem(locStoreKey_gSheetReqBody, JSON.stringify(body.quiz_answers));
    var mapToStore = JSON.stringify(Object.fromEntries(quizResultsMap));
    localStorage.setItem(locStoreKey_gSheetRespMap, mapToStore);
    localStorage.setItem(locStoreKey_lastGSheetReqDate, today);
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
          lineNumber: 248
        },
        __self: _this
      }, "__self", _this),
      React.createElement(
        "span",
        _defineProperty({ className: "advice", __source: {
            fileName: _jsxFileName,
            lineNumber: 248
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
        lineNumber: 250
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
            lineNumber: 259
          },
          __self: _this
        }, "__self", _this),
        "For ",
        React.createElement(
          "span",
          _defineProperty({ className: "text-primary", __source: {
              fileName: _jsxFileName,
              lineNumber: 259
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
            lineNumber: 260
          },
          __self: _this
        }, "__self", _this),
        _printAdvices(gSheetResults, paramPair)
      );
      return React.createElement(SkincareResult, _defineProperty({ title: title, bottomContent: bottomContent, mainHeading: false, key: paramPair[1], __source: {
          fileName: _jsxFileName,
          lineNumber: 261
        },
        __self: _this
      }, "__self", _this));
    }
  });
  return skincareResults;
};

var animateProgressBar = function animateProgressBar() {
  var line = new ProgressBar.Line('#progress', {
    color: '#7065FA',
    duration: 5000,
    easing: 'easeInOut',
    trailColor: '#f4f4f4',
    text: {
      value: "33%"
    },
    step: function step(state, bar) {
      bar.setText(Math.round(bar.value() * 100) + ' %');
    }
  });
  line.animate(.33);
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

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      loadedProgressBar = _React$useState8[0],
      setLoadedProgressBar = _React$useState8[1];

  var urlParamsFromQuizObj = _getSkinQuizUrlParams(window.location.search);
  var urlParamsFromQuizPairs = Object.entries(urlParamsFromQuizObj);
  var skincareResultsHeadings = _getSkincareResultsHeading(urlParamsFromQuizObj);

  var _React$useState9 = React.useState(skincareResultsHeadings),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      skincareResults = _React$useState10[0],
      setSkincareResults = _React$useState10[1];

  React.useEffect(function () {
    if (!(qrSkinTypeKey in urlParamsFromQuizObj)) return;
    if (resultsQueried === false) {
      _getQuizResultsFromGSheets(urlParamsFromQuizPairs, setGSheetResults, setResultsQueried, setError);
    } else {
      var retrievedSkincareResults = void 0;
      if (error) {
        var loadingErrorText = "Loading results...Error";
        var loadingErrorBottomContent = React.createElement(
          "p",
          _defineProperty({
            __source: {
              fileName: _jsxFileName,
              lineNumber: 303
            },
            __self: _this
          }, "__self", _this),
          "Please retake the quiz, try again later, or email ",
          React.createElement(
            "a",
            _defineProperty({
              __source: {
                fileName: _jsxFileName,
                lineNumber: 303
              },
              __self: _this
            }, "__self", _this),
            "support@skintheory.app."
          ),
          React.createElement("br", _defineProperty({
            __source: {
              fileName: _jsxFileName,
              lineNumber: 303
            },
            __self: _this
          }, "__self", _this)),
          React.createElement(
            "i",
            _defineProperty({
              __source: {
                fileName: _jsxFileName,
                lineNumber: 303
              },
              __self: _this
            }, "__self", _this),
            error.errorMessage
          )
        );
        retrievedSkincareResults = React.createElement(SkincareResult, _defineProperty({ title: loadingErrorText, bottomContent: loadingErrorBottomContent, key: loadingErrorText, __source: {
            fileName: _jsxFileName,
            lineNumber: 304
          },
          __self: _this
        }, "__self", _this));
      } else {
        retrievedSkincareResults = _getSkincareResultsBubbles(urlParamsFromQuizPairs, gSheetResults);
        retrievedSkincareResults.push(_getBubblesAfterQuizResults());
        setLoadedProgressBar(true);
      }
      var newSkincareResults = [skincareResults.slice(0, 1)].concat(retrievedSkincareResults); // Remove first "Loading..." bubble
      setSkincareResults(newSkincareResults);
    }
  }, [resultsQueried]);

  React.useEffect(function () {
    if (loadedProgressBar === true) {
      animateProgressBar();
    }
  }, [loadedProgressBar]);

  // Can't use new fragment syntax yet, babel 7 is in beta.
  return React.createElement(
    React.Fragment,
    _defineProperty({
      __source: {
        fileName: _jsxFileName,
        lineNumber: 322
      },
      __self: _this
    }, "__self", _this),
    skincareResults
  );
};

var SkincareResultsViewed = React.createElement(SkincareResults, _defineProperty({
  __source: {
    fileName: _jsxFileName,
    lineNumber: 325
  },
  __self: this
}, "__self", this));

var domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);