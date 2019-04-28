import {
    MOCK_QUESTIONS,
    PRACTICE_QUESTIONS
} from './../actionTypes';


let INITIAL_STATE = {
    mockQuestions: [],
    practiceQuestions: [],
    practiceQuestionsByCategory: {}
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case MOCK_QUESTIONS:
            return { ...state, ...payload }
        case PRACTICE_QUESTIONS:
            return { ...state, ...payload }
        default:
            return state;
    }
}