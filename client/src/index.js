import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, useSelector } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { getFirebase, ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import { getFirestore, reduxFirestore, createFirestoreInstance } from 'redux-firestore';
import fbConfig from './config/fbConfig';
import firebase from 'firebase/app';
import Loading from './components/shared/Loading';

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  reduxFirestore(fbConfig)
));

const profileConfig = {
  userProfile: 'users', // where profiles are stored in database
  useFirestoreForProfile: true // use Firestore for profile instead of RTDB
}

const rrfProps = {
  firebase,
  config: fbConfig,
  config: profileConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <Loading />;
  return children
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
