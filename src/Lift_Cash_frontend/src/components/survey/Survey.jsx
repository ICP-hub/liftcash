import React, { useEffect, useState } from 'react'
import "./Survey.css";
import { useSelector } from 'react-redux';
import DashBoardHead from '../dashboardHead/DashBoardHead';
import { survey } from '../../pages/activitiesPage/constants/Survey';
import SliderBtn from "../../components/sliderBtn/SliderBtn";
import RadioBtn from "../../components/radioBtn/RadioBtn";
import DropdownBtn from "../../components/dropdownBtn/DropdownBtn";
import ThankYouCard from "../../components/thankYouCard/ThankYouCard";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import SurveyResult from '../surveyResult/SurveyResult';
import useFormattedTimeLeft from '../../hooks/useFormattedTimeLeft';

function Survey({ formattedTimeLeft: propsFormattedTimeLeft }) {

    const [timeLeftInMinutes, setTimeLeftInMinutes] = useState(2880); // initial time in minutes
    const formattedTimeLeft = propsFormattedTimeLeft ?? useFormattedTimeLeft(timeLeftInMinutes);


    useEffect(() => {
        console.log("Formated time in S: ", formattedTimeLeft)
    }, [formattedTimeLeft]);

    const [selectedData, setSelectedData] = useState({});
    const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null); //  state for remaining time
    const communityActor = useSelector(
        (state) => state?.actors?.actors?.communityActor
    );

    // const [timeLeft, setTimeLeft] = useState(0); // initial time in minutes
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        console.log("actor on survey page : ", communityActor);
    }, [communityActor]);

    // Handler to update selected data based on question id
    const handleSelect = (id, value, type) => {
        setSelectedData(
            (prev) => ({
                ...prev,
                [`q${id}`]: [value, type],
            }),
            []
        );
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (Object.keys(selectedData).length < survey.length) {
            setIsSubmitting(false);
            alert("Please complete the survey before submitting.");
            return;
        }
        setIsSubmitting(true);
        console.log("Selected Survey Data:", selectedData);

        // Integration starts here
        let keys = Object.keys(selectedData);
        let values = Object.values(selectedData);
        console.log("keys : ", keys, values);

        let map = [];

        for (let i = 0; i < keys.length; i++) {
            // map.push([keys[i]])
            if (values[i][1] === "slider") {
                map.push([keys[i], { PercentageSlider: Number(values[i][0]) }]);
            } else if (values[i][1] === "radiobutton") {
                map.push([keys[i], { MultipleChoice: values[i][0] }]);
            } else if (values[i][1] === "dropdown") {
                let arr = Object.values(values[i][0]);
                map.push([keys[i], { Dropdown: arr }]);
            }
        }
        console.log("map", map);

        await communityActor
            .submit_survey(map)
            .then((res) => {
                console.log("Survey Data Submitted Successfully:", res);
                toast.success("Survey Submitted Successfully!");
                setIsSubmitting(false);
                setIsSurveyCompleted(true);
                setRemainingTime(formattedTimeLeft);
            })
            .catch((err) => {
                console.log("Error submitting survey data:", err);
                toast.error("Error submitting survey ");
            });
    };


    useEffect(() => {
        if (formattedTimeLeft === "0 mins" && !isSurveyCompleted) {
            setRemainingTime(formattedTimeLeft); // or any other state update to force render
        }
    }, [formattedTimeLeft, isSurveyCompleted]);
    

    if (isSurveyCompleted && formattedTimeLeft !== "0 mins") {
        return <ThankYouCard remainingTime={remainingTime} type={"survey"} />
    }
    if (!isSurveyCompleted && formattedTimeLeft === "0 mins") {
        return <SurveyResult />;
    }
    if (!isSurveyCompleted && formattedTimeLeft !== "0 mins") {
        return (<div className="activities-primary-div ">
            <DashBoardHead />
            <div className="activities-primary-container">
                <h2 className="container-title">Welcome to the Survey</h2>
                <p className="container-description">
                    Participate for 20% of your weekly Claim
                </p>
                <div className="container-survey-time">
                    Survey Closes in:{" "}
                    <span className="container-survey-timeleft">
                        {formattedTimeLeft}
                    </span>
                </div>
                <p className="container-survey-secondary-description">
                    This Survey helps the community of Lift Cash participants know what
                    each other is thinking, so they can act in unison. For more info{" "}
                    <br />
                    <a className="container-survey-secondary-description-link">
                        click here.
                    </a>
                </p>
                <h3 className="conatiner-start-survey">Ready? Let's start</h3>
                {survey.map((item) => (
                    <div key={item.id} className="mb-5">
                        <h3 className="container-survey-question-title">
                            {`Q${item.id}: ${item.title}`}
                        </h3>
                        <p className="container-survey-question-description">
                            {item.description}
                        </p>
                        {item.type === "radiobutton" && (
                            <RadioBtn
                                item={item}
                                onSelect={(value) => handleSelect(item.id, value, item.type)}
                            />
                        )}
                        {item.type === "slider" && (
                            <SliderBtn
                                item={item}
                                onSelect={(value) => handleSelect(item.id, value, item.type)}
                            />
                        )}
                        {item.type === "dropdown" && (
                            <DropdownBtn
                                item={item}
                                onSelect={(value) => handleSelect(item.id, value, item.type)}
                            />
                        )}
                    </div>
                ))}

                <div className="activities-container-btn-div">
                    <button
                        disabled={isSubmitting}
                        className="activities-container-btn"
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? (
                            <ThreeDots
                                visible={true}
                                height="30"
                                width="40"
                                color="white"
                                radius="9"
                                ariaLabel="three-dots-loading"
                            />
                        ) : (
                            "Submit Survey"
                        )}
                    </button>
                </div>
            </div>
        </div>)
    }


}

export default Survey;