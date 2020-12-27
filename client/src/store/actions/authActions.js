import {
    LOGIN_START, LOGIN_FAIL, LOGIN_SUCCESS,
    REG_START, REG_FAIL, REG_SUCCESS,
    REQ_PASS_START, REQ_PASS_FAIL, REQ_PASS_SUCCESS,
    RETRIEVE_PROF_FAIL, RETRIEVE_PROF_START, RETRIEVE_PROF_SUCCESS,
    UPDATE_PROF_FAIL, UPDATE_PROF_START, UPDATE_PROF_SUCCESS,
    LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAIL, CLEAR_ERRORS,
    UPLOAD_START, UPLOAD_SUCCESS, UPLOAD_FAIL
} from './authActionTypes';
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';

//Login actions
export const loginStart = () => {
    return {
        type: LOGIN_START
    };
};

export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    };
};
export const loginFail = (err) => {
    return {
        type: LOGIN_FAIL,
        err
    };
};


//Registration actions 
export const regStart = () => {
    return {
        type: REG_START
    };
};

export const regSuccess = () => {
    return {
        type: REG_SUCCESS
    };
};

export const regFail = (err) => {
    return {
        type: REG_FAIL,
        err
    };
};


//Request password actions
export const reqPassStart = () => {
    return {
        type: REQ_PASS_START
    };
};

export const reqPassSuccess = (success) => {
    return {
        type: REQ_PASS_SUCCESS,
        success
    };
};

export const reqPassFail = (err) => {
    return {
        type: REQ_PASS_FAIL,
        err
    };
};


//Retrieve profile actions
export const retrieveProfStart = () => {
    return {
        type: RETRIEVE_PROF_START
    };
};

export const retrieveProfSuccess = () => {
    return {
        type: RETRIEVE_PROF_SUCCESS
    };
};

export const retrieveProfFail = (err) => {
    return {
        type: RETRIEVE_PROF_FAIL,
        err
    };
};


//Update profile actions
export const updateProfStart = () => {
    return {
        type: UPDATE_PROF_START
    };
};

export const updateProfSuccess = () => {
    return {
        type: UPDATE_PROF_SUCCESS
    };
};

export const updateProfFail = (err) => {
    return {
        type: UPDATE_PROF_FAIL,
        err
    };
};

//Logout actions
export const logoutStart = () => {
    return {
        type: LOGOUT_START
    };
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

export const logoutFail = (err) => {
    return {
        type: LOGOUT_FAIL,
        err
    };
};


//Logout actions
export const uploadStart = () => {
    return {
        type: UPLOAD_START
    };
};

export const uploadSuccess = () => {
    return {
        type: UPLOAD_SUCCESS
    };
};

export const uploadFail = (err) => {
    return {
        type: UPLOAD_FAIL,
        err
    };
};


//Clear errors action
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};


export const clearAllErrors = () => {
    return dispatch => {
        dispatch(clearErrors());
    }

}


export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch(loginStart());
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch(loginSuccess())
        }).catch((err) => {
            dispatch(loginFail(err.message))
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch(logoutStart())
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch(logoutSuccess())
        }).catch((err) => {
            dispatch(logoutFail(err.message))
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch(regStart())
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email, newUser.password
        ).then((res) => {
            return firestore.collection("users").doc(res.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                personalID: newUser.personalId,
                initials: newUser.firstName[0].toUpperCase() + newUser.lastName[0].toUpperCase()
            })
        }).then(() => {
            dispatch(regSuccess());
        }).catch((err) => {
            dispatch(regFail(err.message))
        })
    }
}

export const updateProfile = (updatedInfo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch(updateProfStart())
        const firestore = getFirestore();
        firestore.collection("users").doc(updatedInfo.uid).update({
            firstName: updatedInfo.firstName,
            lastName: updatedInfo.lastName,
            initials: updatedInfo.firstName[0].toUpperCase() + updatedInfo.lastName[0].toUpperCase()
        })
            .then(() => {
                dispatch(updateProfSuccess());
                updatedInfo.push('/profile');
            }).catch((err) => {
                dispatch(updateProfFail(err.message))
            })
    }
}

export const resetPassword = (email) => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch(reqPassStart());
        const firebase = getFirebase();
        firebase.auth().sendPasswordResetEmail(
            email,
        ).then(() => {
            const success = "Email sent successfully. Please check your inbox."
            dispatch(reqPassSuccess(success))
        }).catch((err) => {
            dispatch(reqPassFail(err.message))
        })
    }
}

export const uploadProfImage = (data, userId) => async (
    dispatch,
    getState,
    { getFirestore }
) => {
    const firestore = getFirestore();
    const storage = firebase.storage();
    const storageRef = storage.ref();
    try {
        // Create the file metadata
        const metadata = {
            contentType: "image/jpeg"
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const uploadTask = storageRef
            .child("images/" + data.name)
            .put(data, metadata);

        dispatch(uploadStart());

        uploadTask.on(
            "state_changed",
            null,
            function (err) {
                // Handle unsuccessful uploads
                dispatch(uploadFail(err));
                console.log("upload error:", err)
            },
            function () {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

                    dispatch(uploadSuccess());
                    firestore
                        .collection("users").doc(userId)
                        .update({
                            profileImageUrl: downloadURL
                        });
                    console.log("upload success", downloadURL)
                });
            }
        );
    } catch (err) {
        console.log(err);
    }
};








