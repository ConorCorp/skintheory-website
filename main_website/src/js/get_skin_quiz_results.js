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
                "You're skin is normal with acne. Hello"
              ),
              React.createElement(
                "p",
                null,
                "Let's give you a recomendation to help your skin based on solid medical advice."
              )
            )
          )
        )
      )
    )
  );
};

var getSkinQuizUrlParams = function getSkinQuizUrlParams(queryString) {
  var urlParams = new URLSearchParams(queryString);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = urlParams.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entry = _step.value;

      console.log(entry[0] + ": " + entry[1]);
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
};

var SkincareResults = function SkincareResults(props) {
  var urlParams = getSkinQuizUrlParams(window.location.search);

  return React.createElement(SkincareResult, null);
};

var SkincareResultsViewed = React.createElement(SkincareResults, null);

var domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);