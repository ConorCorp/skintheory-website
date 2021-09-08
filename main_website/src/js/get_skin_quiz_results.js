'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var SkincareResult = function SkincareResult(props) {
  return React.createElement(
    "section",
    { className: "features-extended section" },
    React.createElement(
      "div",
      { className: "features-extended-inner section-inner" },
      React.createElement(
        "div",
        { className: "features-extended-wrap" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "div",
            { className: "feature-extended feature-extended-bubble" },
            React.createElement(
              "div",
              { className: "hero-paragraph is-revealing" },
              props.mainHeading ? React.createElement(
                "h2",
                { className: "mt-0 mb-16" },
                props.title
              ) : React.createElement(
                "h3",
                { className: "mt-0 mb-16" },
                props.title
              ),
              React.createElement(
                "p",
                null,
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
      null,
      "You've told us that you have ",
      React.createElement(
        "span",
        { className: "text-primary" },
        urlParamsFromQuizObj[qrSkinTypeKey],
        " skin"
      ),
      " with ",
      React.createElement(
        "span",
        { className: "text-primary" },
        urlParamsFromQuizObj[qrSkinConditionsKey]
      )
    );
    subText = React.createElement(
      "p",
      null,
      "Here are the tips we have for you..."
    );
  } else {
    title = React.createElement(
      "p",
      null,
      "Please take the skin quiz below."
    );
    subText = React.createElement(
      "p",
      null,
      "Here's the link: ",
      React.createElement(
        "a",
        { href: "https://tripetto.app/run/EHWPX9R8UN" },
        "Skin Recommendation Quiz"
      )
    );
  }

  return React.createElement(SkincareResult, { title: title, subText: subText, mainHeading: true });
};

var _getQuizResultsFromGSheets = function _getQuizResultsFromGSheets(urlParamsFromQuizObj, setGSheetResults, setError) {
  var body = {
    quiz_answers: ["nodulocystic acne", "poopy"]
  };
  axios.post('https://nqn3mai071.execute-api.us-east-1.amazonaws.com/prod/skin-quiz-results', body).then(function (response) {
    return setGSheetResults(response.data.results);
  }).catch(function (error) {
    setError({ errorMessage: error.message });
    console.error('There was an error!', error);
  });
};

var _getSkincareResults = function _getSkincareResults(urlParamsFromQuizObj) {
  // Get skin quiz results and display them as components
  var urlParamsFromQuizPairs = Object.entries(urlParamsFromQuizObj);

  var skincareResults = urlParamsFromQuizPairs.map(function (paramPair) {
    var title = React.createElement(
      "p",
      null,
      "It looks like you have ",
      React.createElement(
        "span",
        { className: "text-primary" },
        paramPair[1]
      )
    );
    var subText = React.createElement(
      "p",
      null,
      "Try out this advice..."
    );
    return React.createElement(SkincareResult, { title: title, subText: subText, mainHeading: false });
  });
  return skincareResults;
};

var SkincareResults = function SkincareResults(props) {
  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      error = _React$useState2[0],
      setError = _React$useState2[1];

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      gsheetResults = _React$useState4[0],
      setGSheetResults = _React$useState4[1];

  var urlParamsFromQuizObj = _getSkinQuizUrlParams(window.location.search);
  var skincareResultsHeading = _getSkincareResultsHeading(urlParamsFromQuizObj);

  var _React$useState5 = React.useState([skincareResultsHeading, React.createElement(SkincareResult, { title: "Loading results..." })]),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      skincareResults = _React$useState6[0],
      setSkincareResults = _React$useState6[1];

  React.useEffect(function () {
    _getQuizResultsFromGSheets("", setGSheetResults, setError);
    console.log("useEffect " + JSON.stringify(gsheetResults));
    // let retrievedSkincareResults = _getSkincareResults(urlParamsFromQuizObj)
    // let newSkincareResults = [skincareResultsHeading].concat(retrievedSkincareResults)
    // setSkincareResults(newSkincareResults)
  }, []);

  // Can't use new fragment syntax yet, babel 7 is in beta.
  return React.createElement(
    React.Fragment,
    null,
    skincareResults
  );
};

var SkincareResultsViewed = React.createElement(SkincareResults, null);

var domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);