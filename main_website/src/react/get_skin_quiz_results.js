'use strict';

const skinQuizKeyPrefix = "qr_"
const qrSkinTypeKey = "qr_skin_type"
const qrSkinConditionsKey = "qr_skin_conditions"

const skinTraitGSheetsKey = "Skin Trait"
const adviceKey = "Advice "
const gSheetLambdaUrl = 'https://nqn3mai071.execute-api.us-east-1.amazonaws.com/prod/skin-quiz-results'
const skinTypeGifs = new Map([
  ["oily skin", "https://media0.giphy.com/media/3o6MbcAaPmBnUwPtZu/giphy.gif?cid=790b7611402b0d4b22af4ee36d0e400925e584cf75ea7157&rid=giphy.gif&ct=g"],
  ["normal skin", "https://media0.giphy.com/media/3oKIPa8aoMmpUz5xKg/giphy.gif?cid=790b7611ba1a91551b7162e4b7954acaa0f07f22047f03d5&rid=giphy.gif&ct=g"],
  ["dry skin", "https://media1.giphy.com/media/l2JejeuDbtGVSDrTW/giphy.gif?cid=790b7611176d8104f4de11a9994c0b80af8aaff02e96f3bf&rid=giphy.gif&ct=g"],
  ["combination skin", "https://media0.giphy.com/media/ABfNx2KM7dB7O/giphy.gif?cid=ecf05e47vt4w4vvq06mx5035fuc4jkbxnkisunpeklilv74e&rid=giphy.gif&ct=g"],
  ["sensitive skin", "https://media2.giphy.com/media/fWgdQGsrCsU4NoQ6D9/giphy.gif?cid=790b76111b5e228bf9d039498d178f517fe26866a9c70daf&rid=giphy.gif&ct=g"]
])

const locStoreKey_gSheetReqBody = "gSheetReqBody"
const locStoreKey_gSheetRespMap = "gSheetRespMap"
const locStoreKey_lastGSheetReqDate = "lastGSheetReqDate"


const _get_valid_quiz_url_params_dict = (urlParams) => {
  const quiz_result_params = {};
  for(let entry of urlParams.entries()) {
    if (entry[0].startsWith(skinQuizKeyPrefix) && entry[1] !== "") {
      quiz_result_params[entry[0]] = entry[1]
    } 
  }
  return quiz_result_params
}

const _getSkinQuizUrlParams = (queryString) => {
  // Get qr_ params from url and return [[qr_key, value], ...]
  const urlParams = new URLSearchParams(queryString);
  const quizResultParams = _get_valid_quiz_url_params_dict(urlParams);
  return quizResultParams
}

const SkincareResult = (props) => {
  const mainId = props.mainHeading ? "main-bubble" : "";

  return (
    <section className="features-extended section" id={mainId}>
      <div className="features-extended-inner section-inner">
        <div className="features-extended-wrap">
          <div className="container">
            <div className="feature-extended feature-extended-bubble">
              <div className="hero-paragraph">  {/*is-revealing*/}
                {props.mainHeading
                  ? <h2 className="mt-0 mb-16">{props.title}</h2>
                  : <h3 className="mt-0 mb-16">{props.title}</h3>
                }
                {props.bottomContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const _generateHeadingBottomContent = (skinType) => {
  const bottomContent = []
  const gifUrl = skinTypeGifs.get(skinType)
  if (gifUrl) {
    bottomContent.push(<p key={"gifText"} style={{fontSize: ".75rem", marginBottom: "0px"}}><i>A gif for your viewing pleasure...</i></p>)
    bottomContent.push(<img key={"imgGif"} src={gifUrl} width="350" key={"gif"}/>)
  }
  const subtitle = <p key={"subtitle"}>Here are some tips to get you started on <br/>your skin journey.</p>
  bottomContent.push(subtitle)
  return bottomContent
}

const _getQuizDisclaimer = () => {
  const title = <React.Fragment>About this quiz</React.Fragment>
  const bottomContent = <React.Fragment>
    <p key={"p"}>
      The results for this quiz are based on current medical advice from a real and very much American (🇺🇸) doctor.
      Even though this is the case, we (SkinTheory), are only providing the
      results of this quiz for educational purposes.
    </p>
    <ul id="disclaimer" key={"ul"}>
      <li key={"1"}>The information provided on the site is for educational purposes only, and does not substitute for professional medical advice.</li>
      <li key={"2"}>Consult a medical professional or healthcare provider if they’re seeking medical advice, diagnoses, or treatment.</li>
      <li key={"3"}>SkinTheory is not liable for risks or issues associated with using or acting upon the information on your site</li>
    </ul>
  </React.Fragment>
  let arrayKey = title.props.children
  return <SkincareResult title={title} bottomContent={bottomContent} mainHeading={false} key={arrayKey}/>
}

const _getSkincareResultsHeading = (urlParamsFromQuizObj) => {
  // Introduce main skintypes of person in heading bubble
  // qr_skin_type, qr_skin_conditions
  let title = ""
  let bottomContent = null
  const skincareResultsHeadings = []
  let arrayKey = ""

  if (qrSkinTypeKey in urlParamsFromQuizObj && qrSkinConditionsKey in urlParamsFromQuizObj) {
    title = <React.Fragment><span style={{fontSize: "75%"}}>Your skin type:</span> <br/><span className="text-primary">{urlParamsFromQuizObj[qrSkinTypeKey]}</span> with <span className="text-primary">{urlParamsFromQuizObj[qrSkinConditionsKey]}</span>.</React.Fragment>
    bottomContent = _generateHeadingBottomContent(urlParamsFromQuizObj[qrSkinTypeKey])
    arrayKey = title.props.children[0].props.children
    let loadingText = "Loading results..."
    skincareResultsHeadings.push(<SkincareResult title={loadingText} key={loadingText}/>)
  } else {
    title = <React.Fragment>Please take the skin quiz below.</React.Fragment>
    bottomContent = <p>Here's the link: <a href="https://tripetto.app/run/EHWPX9R8UN">Skin Recommendation Quiz</a></p>
    arrayKey = title.props.children
  }
  skincareResultsHeadings.unshift(<SkincareResult title={title} bottomContent={bottomContent} mainHeading={true} key={arrayKey}/>)
  return skincareResultsHeadings
}

const _getUrlParamInGSheetKeyFormat = (paramPair) => {
  return String(paramPair[0]+":"+paramPair[1]).toLowerCase()
}

const _getCachedResult = (today, body, setGSheetResults, setResultsQueried) => {
  // returns true if set cached result from previous request today
  const lastRequestEqual = localStorage.getItem(locStoreKey_gSheetReqBody) === JSON.stringify(body.quiz_answers)
  const lastRequestDateToday = localStorage.getItem(locStoreKey_lastGSheetReqDate) === today
  const haveStoredRequest = localStorage.getItem(locStoreKey_gSheetRespMap) !== null
  if (lastRequestEqual && lastRequestDateToday && haveStoredRequest) {
    try {
      const cachedReq = new Map(Object.entries(JSON.parse(localStorage.getItem(locStoreKey_gSheetRespMap))))
      console.log(cachedReq)
      setGSheetResults(cachedReq)
      setResultsQueried(true)
      console.log("Found skin quiz results from an identical cached query today. Thanks for saving my request limit ❤️")
      return true
    } catch (storedVariableAllDumbLike) {
      console.log("ERROR: Can't get cached request :/")
      console.log(storedVariableAllDumbLike)
    }
  }
  return false
}

const _getQuizResultsFromGSheets = (urlParamsFromQuizPairs, setGSheetResults, setResultsQueried, setError) => {
  // Get Answers For Quiz Results From Our Google Sheet

  const body = {
    quiz_answers: urlParamsFromQuizPairs.map(paramPair => {
      return _getUrlParamInGSheetKeyFormat(paramPair)
    })
  };

  const today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  if (_getCachedResult(today, body, setGSheetResults, setResultsQueried)) {
    return
  }

  // Forced to use promises due to babel's shitty transpiling (hrs of work put in this OOF)
  axios.post(gSheetLambdaUrl, body)
      .then(response => {
        const quizResults = response.data.quiz_results
        const quizResultsMap = new Map(quizResults.map(i => [i[skinTraitGSheetsKey], i]));
        localStorage.setItem(locStoreKey_gSheetReqBody, JSON.stringify(body.quiz_answers))
        const mapToStore = JSON.stringify(Object.fromEntries(quizResultsMap))
        localStorage.setItem(locStoreKey_gSheetRespMap, mapToStore)
        localStorage.setItem(locStoreKey_lastGSheetReqDate, today)
        setGSheetResults(quizResultsMap)
      })
      .catch(error => {
        setError({ errorMessage: JSON.stringify(error.message) });
      })
      .finally(response => {
        setResultsQueried(true)
      });
}

const _printAdvices = (gSheetResults, bubbleParamPair) => {
  const thisBubblesAdvice = gSheetResults.get(_getUrlParamInGSheetKeyFormat(bubbleParamPair))
  const advices = Object.entries(thisBubblesAdvice).filter(paramPair => {
    return paramPair[0].startsWith(adviceKey) && paramPair[1] !== "";
  })
  const formattedAdviceComponents = advices.map(paramPair => {
    return <li key={paramPair[0]}><span className="advice">{paramPair[0]}:</span> {paramPair[1]}</li>
  })
  return <ul className="skin-advice-list">{formattedAdviceComponents}</ul>
}

const _getSkincareResultsBubbles = (urlParamsFromQuizPairs, gSheetResults) => {
  // Get skin quiz results and display them as components
  const skincareResults = urlParamsFromQuizPairs.map(paramPair => {
    const gSheetKey = _getUrlParamInGSheetKeyFormat(paramPair)
    if (gSheetResults.has(gSheetKey) &&
        gSheetResults.get(gSheetKey)[adviceKey+"1"] !== "") {
      let title = <React.Fragment>For <span className="text-primary">{paramPair[1]}</span></React.Fragment>;
      let bottomContent = <React.Fragment>{_printAdvices(gSheetResults, paramPair)}</React.Fragment>;
      return <SkincareResult title={title} bottomContent={bottomContent} mainHeading={false} key={paramPair[1]}/>;
    }
  })
  return skincareResults
}

const SkincareResults = (props) => {
  const [error, setError] = React.useState(null);
  const [resultsQueried, setResultsQueried] = React.useState(false);
  const [gSheetResults, setGSheetResults] = React.useState(new Map());

  const urlParamsFromQuizObj = _getSkinQuizUrlParams(window.location.search);
  const urlParamsFromQuizPairs = Object.entries(urlParamsFromQuizObj)
  const skincareResultsHeadings = _getSkincareResultsHeading(urlParamsFromQuizObj)

  const [skincareResults, setSkincareResults] = React.useState(skincareResultsHeadings);

  React.useEffect(() => {
    if (urlParamsFromQuizPairs.length < 2) return
    if (resultsQueried === false) {
      _getQuizResultsFromGSheets(urlParamsFromQuizPairs, setGSheetResults, setResultsQueried, setError)
    } else {
      let retrievedSkincareResults;
      if (error) {
        let loadingErrorText = "Loading results...Error"
        let loadingErrorBottomContent = <p>Please retake the quiz, try again later, or email <a>support@skintheory.app.</a><br/><i>{error.errorMessage}</i></p>
        retrievedSkincareResults = <SkincareResult title={loadingErrorText} bottomContent={loadingErrorBottomContent} key={loadingErrorText}/>
      } else {
        retrievedSkincareResults = _getSkincareResultsBubbles(urlParamsFromQuizPairs, gSheetResults)
        retrievedSkincareResults.push(_getQuizDisclaimer())
      }
      const newSkincareResults = [skincareResults.slice(0, 1)].concat(retrievedSkincareResults) // Remove first "Loading..." bubble
      setSkincareResults(newSkincareResults)
    }
  }, [resultsQueried])

  // Can't use new fragment syntax yet, babel 7 is in beta.
  return <React.Fragment>{skincareResults}</React.Fragment>;
}

const SkincareResultsViewed = <SkincareResults />

const domContainer = document.querySelector('#skincare-results');
ReactDOM.render(SkincareResultsViewed, domContainer);