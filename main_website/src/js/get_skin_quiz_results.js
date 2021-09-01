'use strict';

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

var getSkinQuizUrlParams = function getSkinQuizUrlParams(queryString) {
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
      "We're missing some skin information from the quiz. Please take it again."
    );
    subText = React.createElement(
      "p",
      null,
      "Follow this link: ",
      React.createElement(
        "a",
        { href: "https://tripetto.app/run/EHWPX9R8UN" },
        "Skin Recommendation Quiz"
      )
    );
  }

  return React.createElement(SkincareResult, { title: title, subText: subText, mainHeading: true });
};

var SkincareResults = function SkincareResults(props) {
  var urlParamsFromQuizObj = getSkinQuizUrlParams(window.location.search);
  var skincareResultsHeading = _getSkincareResultsHeading(urlParamsFromQuizObj);
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
  skincareResults.unshift(skincareResultsHeading);
  // Can't use new fragment syntax yet, babel is in beta.
  return React.createElement(
    React.Fragment,
    null,
    skincareResults
  );
};

var SkincareResultsViewed = React.createElement(SkincareResults, null);

var domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);