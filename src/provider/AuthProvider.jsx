import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.init";
import usePublic from "../Hook/usePublic";

const provider = new GoogleAuthProvider();

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const axiosPublic = usePublic();

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const signup = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleSign = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateProfileUser = (update) => {
        return updateProfile(auth.currentUser, update)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser?.email) {
                const userInfo = { email: currentUser?.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const signOutUser = () => {
        return signOut(auth)
    }
    const authInfo = {
        name: 'name',
        user,
        loading,
        signup,
        signin,
        googleSign,
        updateProfileUser,
        signOutUser,
        toggleTheme,
        isDarkMode
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;