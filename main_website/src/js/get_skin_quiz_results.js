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
              React.createElement(
                "h2",
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

var _get_valid_quiz_url_params = function _get_valid_quiz_url_params(urlParams) {
  var quiz_result_params = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = urlParams.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entry = _step.value;

      if (entry[0].startsWith("qr_")) quiz_result_params.push(entry);
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
  var urlParams = new URLSearchParams(queryString);
  var quiz_result_params = _get_valid_quiz_url_params(urlParams);
  return quiz_result_params;
};

var SkincareResults = function SkincareResults(props) {
  var urlParamsFromQuiz = getSkinQuizUrlParams(window.location.search);
  var skincareResults = urlParamsFromQuiz.map(function (paramPair) {
    var title = "It looks like you have " + paramPair[1];
    var subText = "Try out this advice ...";
    return React.createElement(SkincareResult, { title: title, subText: subText });
  });
  //TODO: Make sure this list is ordered correctly. Pull state up 
  // here so that you can just pass the messages down.

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