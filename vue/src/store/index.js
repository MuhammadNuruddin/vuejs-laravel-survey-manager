import { createStore } from "vuex";
import axiosClient from '../axios';

// const tmpSurveys = [
//     {
//         id: 20,
//         title: 'This is a test title',
//         slug: 'This-is-a-test-title',
//         status: 'draft',
//         image: 'https://www.crn.com/resources/026f-13bca12b639a-1dd75fc181b1-1000/147491143.jpeg',
//         description: 'This is just a <b>random</b> description for the survey',
//         created_at: '2023-01-06 16:00:00',
//         updated_at: '2023-01-06 16:00:00',
//         expire_date: '2023-01-20 16:00:00',
//         questions: [
//             {
//                 id: 2,
//                 type: 'select',
//                 question: 'which programming language do you love the most?',
//                 description: null,
//                 data: {
//                     options: [
//                         { uuid: '60d382b8-0da0-403d-b2e6-9149558f2f5c', text: 'Python' },
//                         { uuid: 'a527d9c0-e1ac-4ca1-af19-c187cbf382d1', text: 'Java' },
//                         { uuid: '1f34cf04-0a25-4e05-98ef-83b78b63ea40', text: 'PHP' },
//                         { uuid: 'a308e9d1-c08a-4089-9211-11f04755a793', text: 'Javascript' },
//                         { uuid: 'a4010ef6-bfce-4f5a-ad13-482702fa88b8', text: 'Go' },
//                         { uuid: 'c7f92767-1b92-4dae-b1e5-248411a2f6b5', text: 'C++' },
//                         { uuid: '59559caf-d9d6-43c2-abab-cf3b73967e66', text: 'C#' },
//                     ]
//                 }

//             },
//             {
//                 id: 3,
//                 type: 'checkbox',
//                 question: 'which programming language are you currently learning?',
//                 description: 'Lorem ipsum cu ci co',
//                 data: {
//                     options: [
//                         { uuid: '60d382b8-0da0-403d-b2e6-9149558f4r5c', text: 'Python + Django' },
//                         { uuid: 'a527d9c0-e1ac-4ca1-af19-c1874rf382d1', text: 'Golang' },
//                         { uuid: '1f34cf04-0a25-4e05-98ef-83b74r63ea40', text: 'PHP + Laravel' },
//                         { uuid: 'a308e9d1-c08a-4089-9211-11f04y75a793', text: 'Javascript + Node' }
//                     ]
//                 }

//             },
//             {
//                 id: 4,
//                 type: 'checkbox',
//                 question: 'Choose your favorite frameworks?',
//                 description: 'Lorem ipsum iiueu hhuuyer',
//                 data: {
//                     options: [
//                         { uuid: '60d382b8-0da0-403d-b2e6-9149558f4rr4', text: 'Django' },
//                         { uuid: 'a527d9c0-e1ac-4ca1-af19-c1874rf382h7', text: 'Ruby On Rails' },
//                         { uuid: '1f34cf04-0a25-4e05-98ef-83b74r63ea45', text: 'Laravel' },
//                         { uuid: 'a308e9d1-c08a-4089-9211-11f04y75a7y7', text: 'Node JS' }
//                     ]
//                 }

//             },
//             {
//                 id: 5,
//                 type: 'radio',
//                 question: 'Which framework do you love the most?',
//                 description: 'Lorem ipsum poikione',
//                 data: {
//                     options: [
//                         { uuid: '60d382b8-0da0-403d-b2e6-9149558f4rr4', text: 'Django' },
//                         { uuid: 'a527d9c0-e1ac-4ca1-af19-c1874rf382h7', text: 'Ruby On Rails' },
//                         { uuid: '1f34cf04-0a25-4e05-98ef-83b74r63ea45', text: 'Laravel' },
//                         { uuid: 'a308e9d1-c08a-4089-9211-11f04y75a7y7', text: 'Node JS' }
//                     ]
//                 }

//             },
//             {
//                 id: 6,
//                 type: 'text',
//                 question: 'How did you get to start programming?',
//                 description: null,
//                 data: {}
//             },
//             {
//                 id: 7,
//                 type: 'textarea',
//                 question: 'Which tech stack do you wish to learn this year, and how?',
//                 description: null,
//                 data: {}
//             }
//         ],
//     },
//     {
//         id: 30,
//         title: 'Laravel 9',
//         slug: 'Laravel-9',
//         status: 'active',
//         image: 'https://cdn.learnku.com/uploads/images/201802/28/1/Jk8mC7SGI5.jpg!/both/400x400',
//         description: 'Laravel is a fast and very popular web framewook for the PHP community',
//         created_at: '2023-01-02 18:00:10',
//         updated_at: '2023-01-02 18:00:10',
//         expire_date: '2023-01-29 16:00:',
//         questions: [],
//     },
//     {
//         id: 40,
//         title: 'Vue Js',
//         slug: 'Vue-Js',
//         status: 'draft',
//         image: 'https://www.phpro.be/uploads/media/sulu-400x400/01/441-vue.js%404x.png?v=2-0?62b3251db82aa489a7ee194a74cc6fb1',
//         description: 'Vue Js is a Javascript frontend framework popular for building single page applications',
//         created_at: '2023-01-03 17:12:00',
//         updated_at: '2023-01-04 12:00:00',
//         expire_date: '2023-02-01 12:00:00',
//         questions: [],
//     },
//     {
//         id: 50,
//         title: 'Tailwind CSS',
//         slug: 'Tailwind-CSS',
//         status: 'active',
//         image: 'https://www.drupal.org/files/project-images/screenshot_361.png',
//         description: 'Tailwind CSS is an optimised frontend utility framework',
//         created_at: '2023-01-03 17:12:00',
//         updated_at: '2023-01-04 12:00:00',
//         expire_date: '2023-02-01 12:00:00',
//         questions: [],
//     }
// ]

const store = createStore({
    state:{
        user: {
            data:{},
            token:sessionStorage.getItem('TOKEN'),
        },
        dashboard: {
            loading: false,
            data: {}
        },
        current_survey: {
            loading: false,
            data: {},
        },
        surveys: {
            loading: false,
            data: [],
            links: [],
        },
        questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
        notification: {
            show: false,
            type: null,
            message: null,
        },
        app: {
            name: 'http://localhost:5173',
        },
        active_token: {
            active: false,
        }
    },
    getters:{},
    actions:{
        getDashboardData({commit}) {
            commit('dashboardLoading', true);
            return axiosClient.get('/dashboard')
            .then((res) => {
                commit('dashboardLoading', false); 
                commit('setDashboardData', res.data); 
                return res;
            })
            .catch((err) => {
                commit('dashboardLoading', false); 
                throw err; 
            })
        },
        getSurvey({commit}, id) {
            commit('setCurrentSurveyLoading', true);
            return axiosClient.get(`/survey/${id}`)
            .then((res) => {
                commit('setCurrentSurvey', res.data);
                commit('setCurrentSurveyLoading', false);
                return res;
            })
            .catch((err) => {
                commit('setCurrentSurveyLoading', false);
                throw err;
            });
        },
        saveSurvey({commit}, survey) {
            delete survey.image_url;
            let response;
            if(survey.id) {
                response = axiosClient.put(`/survey/${survey.id}`, survey)
                .then((res) => {
                   commit('setCurrentSurvey', res.data); 
                   return res;
                })
            }else {
                response = axiosClient.post('/survey', survey)
                .then((res) => {
                    commit('setCurrentSurvey', res.data);
                    return res;
                })
            }

            return response;
        },
        deleteSurvey({}, id) {
            return axiosClient.delete(`/survey/${id}`)
        },
        getSurveys({commit}, { url = null} = {}) {
            url = url || '/survey'
            commit('setSurveysLoading', true);
            return axiosClient.get(url)
            .then((res) => {
                commit('setSurveysLoading', false);
                commit('setSurveys', res.data);
                return res;
            })
        },
        getSurveyBySlug({commit}, slug) {
            commit('setCurrentSurveyLoading', true);
            return axiosClient.get(`/survey-by-slug/${slug}`)
            .then((res) => {
                commit('setCurrentSurvey', res.data);
                commit('setCurrentSurveyLoading', false);
                res;
            })
            .catch((err) => {
                commit('setCurrentSurveyLoading', false);
                throw err;
            })
        },
        saveSurveyAnswer({commit}, {surveyId, answers}) {
            return axiosClient.post(`survey/${surveyId}/answer`, {answers});
        },
        register({commit}, user){
            return axiosClient.post('/register', user)
            .then(({data}) => {    
                if(data.success) {
                    commit('setUser', data);
                }
                return data;
            })
        },
        login({commit}, user){
            return axiosClient.post('/login', user)
            .then(({data,response}) => {
                if(data.success) {
                    commit('setUser', data);
                }
                return data;
            })
        },
        forgotPassword({commit}, user) {
            return axiosClient.post('/forgot-password', user)
            .then(({response}) => {
                return response;
            })
        },
        resetPassword({commit}, user) {
            return axiosClient.post('/reset-password', user)
            .then(({response}) => {
                return response;
            })
        },
        logout({commit}) {
            return axiosClient.post('/logout')
            .then((response) => {
                commit('logout');
                return response;
            })            
        }
    },
    mutations:{
        setDashboardData: (state, data) => {
            state.dashboard.data = data;
        },
        dashboardLoading: (state, loading) => {
            state.dashboard.loading = loading;
        },
        setCurrentSurveyLoading: (state, loading) => {
            state.current_survey.loading = loading;
        },
        setSurveysLoading: (state, loading) => {
            state.surveys.loading = loading;
        },
        setCurrentSurvey: (state, survey) => {
            state.current_survey.data = survey.data;
        },
        setSurveys: (state, surveys) => {
            state.surveys.links = surveys.meta.links;
            state.surveys.data = surveys.data;
        },
        // saveSurvey: (state, survey) => {
        //     state.surveys = [...state.surveys, survey.data];
        // },
        // updateSurvey: (state, survey) => {
        //     state.surveys = state.surveys.map((s) => {
        //         if(s.id == survey.data.id) {
        //             return survey.data;
        //         }
        //         return s;
        //     })
        // },
        logout: state => {
            state.user.token = null;
            state.user.data = {}
            sessionStorage.removeItem('TOKEN', null);
        },
        setUser: (state, user_data) => {
            state.user.token = user_data.token;
            state.user.data = user_data.user;
            sessionStorage.setItem('TOKEN', user_data.token);
        },
        notify: (state, {message, type}) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(() => {
                state.notification.show = false;
            },3000)
        },
    },
    modules:{}
})

export default store;