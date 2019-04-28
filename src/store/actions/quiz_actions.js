import fb from './../../firebase';
import { MOCK_QUESTIONS, PRACTICE_QUESTIONS } from '../actionTypes';
import { AsyncStorage } from 'react-native';


export const retrievePracticeQuestions = () => async dispatch => {
  try {
    const practiceQuestionsArray = [];
    const categories = ['hazard', 'information', 'parking'];
    const dataByCategories = {
      hazard: [],
      information: [],
      parking: []
    }
    let dataByCategoriesObj;
    await fb.database().ref('/practiceTheory').once('value', async (DataSnapshot) => {
      dataByCategoriesObj = await DataSnapshot.val();

      if (dataByCategoriesObj) {
        categories.forEach((category) => {
          for (let key in dataByCategoriesObj[category]) {
            dataByCategoriesObj[category][key]['key'] = key;
            dataByCategories[category] = [...dataByCategories[category], dataByCategoriesObj[category][key]];
            practiceQuestionsArray.push(dataByCategoriesObj[category][key]);
          }
        })

      }
    })
    dispatch({ type: PRACTICE_QUESTIONS, payload: { practiceQuestions: practiceQuestionsArray, practiceQuestionsByCategory: dataByCategories } })
    return practiceQuestionsArray;
  } catch (e) {
    throw new Error(
      e.response ? e.response.data.error || e.response.data : e.message
    );
  }
};

export const retrieveMockQuestions = () => async dispatch => {
  try {
    const mockQuestionsArray = [];
    await fb.database().ref('/mockTheory').once('value', (snapshot) => {
      const data = snapshot.val();
      for (let key in data) {
        data[key]['key'] = key;
        mockQuestionsArray.push(data[key]);
      }
    })
    dispatch({ type: MOCK_QUESTIONS, payload: { mockQuestions: mockQuestionsArray } });
    return mockQuestionsArray;
  } catch (e) {
    throw new Error(
      e.response ? e.response.data.error || e.response.data : e.message
    );
  }
};


export const setMockResult = result => async dispatch => {
  let user;
  try {
    let userjson = await AsyncStorage.getItem('_user');
    user = JSON.parse(userjson);
    let { uid } = user;
    const updatedUser = {...user, mockTestAttempted: true, mockTestResult: result}
    await fb.database().ref('/users').child(uid).set(updatedUser);
    await AsyncStorage.setItem('_user', JSON.stringify(updatedUser));
  } catch (e) {
    throw new Error(
      e.response ? e.response.data.error || e.response.data : e.message
    );
  }
}
