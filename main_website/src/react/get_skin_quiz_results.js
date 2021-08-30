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
                  You're skin is normal with acne. Hello
                </h2>
                <p>
                  Let's give you a recomendation to help your skin based on solid medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const getSkinQuizUrlParams = (queryString) => {
  const urlParams = new URLSearchParams(queryString);
  for(const entry of urlParams.entries()) {
    console.log(`${entry[0]}: ${entry[1]}`);
    // TODO: Sort parameters for sending and recieving
  }
}

const SkincareResults = (props) => {
  const urlParams = getSkinQuizUrlParams(window.location.search);
  return <SkincareResult />;
}

const SkincareResultsViewed = <SkincareResults />

const domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);