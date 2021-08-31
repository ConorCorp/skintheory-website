'use strict';

const SkincareResult = (props) => {

  return (
    <section className="features-extended section">
      <div className="features-extended-inner section-inner">
        <div className="features-extended-wrap">
          <div className="container">
            <div className="feature-extended feature-extended-bubble">
              <div className="hero-paragraph is-revealing">
                <h2 className="mt-0 mb-16">
                  {props.title}
                </h2>
                <p>
                  {props.subText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const _get_valid_quiz_url_params = (urlParams) => {
  const quiz_result_params = [];
  for(let entry of urlParams.entries()) {
    if (entry[0].startsWith("qr_")) quiz_result_params.push(entry)
  }
  return quiz_result_params
}

const getSkinQuizUrlParams = (queryString) => {
  const urlParams = new URLSearchParams(queryString);
  const quiz_result_params = _get_valid_quiz_url_params(urlParams);
  return quiz_result_params
}

const SkincareResults = (props) => {
  const urlParamsFromQuiz = getSkinQuizUrlParams(window.location.search);
  const skincareResults = urlParamsFromQuiz.map(paramPair => {
    let title = `It looks like you have ${paramPair[1]}`;
    let subText = `Try out this advice ...`;
    return <SkincareResult title={title} subText={subText}/>;
  })
  //TODO: Make sure this list is ordered correctly. Pull state up 
  // here so that you can just pass the messages down.

  // Can't use new fragment syntax yet, babel is in beta.
  return <React.Fragment>{skincareResults}</React.Fragment>;
}

const SkincareResultsViewed = <SkincareResults />

const domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);