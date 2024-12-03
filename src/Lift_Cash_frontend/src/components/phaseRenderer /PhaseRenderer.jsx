import React from 'react'
import ThankYouCard from '../thankYouCard/ThankYouCard';
import Survey from '../survey/Survey';
import Vote from '../vote/Vote';
import RatifyCard from '../ratify/RatifyCard';
import SurveyResult from '../surveyResult/SurveyResult';
import RatifyResult from '../ratifyResult/RatifyResult';
import Loading from '../loading/Loading';

function PhaseRenderer({ phase, onSubmission, onTimeUp }) {
    if (phase.submitted) {
        return <ThankYouCard remainingTime={phase.timeLeft} type={phase.type} onTimeUp={onTimeUp} />;
    }
    switch (phase.type) {
        case 'Survey':
          return <Survey timeLeft={phase.timeLeft} onSubmit={onSubmission} onTimeUp={onTimeUp} />;
        case 'Vote':
          return <Vote timeLeft={phase.timeLeft} onSubmit={onSubmission} onTimeUp={onTimeUp}/>;
        case 'Ratify':
          return <RatifyCard timeLeft={phase.timeLeft} onSubmit={onSubmission} onTimeUp={onTimeUp} />;
        case 'SurveyResults':
          return <SurveyResult timeLeft={phase.timeLeft} onTimeUp={onTimeUp} />;
        case 'RatifyResults':
          return <RatifyResult timeLeft={phase.timeLeft} ononTimeUp={onTimeUp} />;
        default:
          return <Loading />
      }
}

export default PhaseRenderer
