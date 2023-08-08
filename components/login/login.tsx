import React from 'react';
import { firebaseAuth } from "@/firebase.config";
import { sendSignInLinkToEmail, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from 'next/router';
import PhoneLogin from './phoneLogin';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [emailLogin, setEmailLogin] = React.useState(true);

    //on key enter press
    const handleKeyDown = (e:any) => {
        if (e.key === 'Enter') {
            loginWithEmailAndPassword();
        }
    }

    const loginWithEmailAndPassword = () => {
        // e.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                // setLoading(false);
                // setSuccess(true);
                // router.push('/dashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === 'auth/user-not-found') {
                    createUserWithEmailAndPassword(firebaseAuth, email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            console.log(user);
                            loginWithEmailAndPassword();
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorCode, errorMessage);
                        });
                }
                setLoading(false);
                setError(errorCode);
            });
    }

    const sendEmailLink = (e:any) => {
        e.preventDefault();
        setLoading(true);
        const actionCodeSettings = {
            url: `${window.location.href}/login`,
            handleCodeInApp: true,
        };

        sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings)
            .then(() => {
                setLoading(false);
                setSuccess(true);
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setLoading(false);
                setError(errorMessage);
            });
    }

    const signInWithGoogle = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        signInWithPopup(firebaseAuth, provider)
            .then((result) => {
                const credential:any = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(token, user);
                setLoading(false);
                setSuccess(true);
                // router.push('/dashboard');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setLoading(false);
                setError(errorMessage);
            });
    }

    const resestPassword = () => {
        setLoading(true);
        if (email) {
            sendPasswordResetEmail(firebaseAuth, email)
                .then(() => {
                    setLoading(false);
                    setSuccess(true);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setError("Email-ul este obligatoriu pentru a putea reseata parola.");
        }
    }


    return (
        <>
            <div className="container mx-auto">
                <div className="flex items-start justify-center">
                    <div className="">
                        {!success ? (
                            !loading ? (
                                <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 flex justify-center flex-col">

                                    {emailLogin ? (
                                        <>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                                    Email
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parola">
                                                    Parola
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="parola" name="parola" type="password" placeholder="Parola"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                            <div className="flex items-center justify-end mb-4 cursor-pointer" onClick={resestPassword}>
                                                <a>Ai uitat parola?</a>
                                            </div>
                                            <div className="flex items-center justify-end">
                                                <button className="btn home4-hero-btn" type="button"
                                                    onClick={loginWithEmailAndPassword}
                                                >
                                                    Autentificare cu email
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="mb-4">
                                            <PhoneLogin setError={setError} />
                                        </div>
                                    )
                                    }



                                    <div className='flex items-center justify-center mt-4 mb-4'>
                                        sau foloseste
                                    </div>
                                    <div className="flex items-center justify-center mt-4 rounded border">
                                        <button type="button" className="text-black  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                                            onClick={() => setEmailLogin(!emailLogin)}
                                        >
                                            {emailLogin ? (
                                                <>
                                                    Login cu numarul de telefon
                                                </>
                                            ) : (
                                                <>
                                                    Login cu email
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-center mt-4 rounded border">
                                        <button type="button" className="text-black  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                                            onClick={signInWithGoogle}
                                        >
                                            <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                            Autentificare cu Google
                                        </button>
                                    </div>
                                    {error && (
                                        <div className="text-red-500 text-xs italic mt-4">
                                            {error === 'auth/user-not-found' ? 'Email-ul nu există!' : ''}
                                            {error === 'auth/invalid-email' ? 'Email-ul este invalid!' : ''}
                                            {error === 'auth/wrong-password' ? 'Parola este greșită!' : ''}
                                            {error === 'auth/too-many-requests' ? 'Prea multe încercări! Încearcă mai târziu!' : ''}
                                            {error === 'auth/missing-password' ? 'Parola este necesară!' : ''}
                                            {error === 'auth/weak-password' ? 'Parola este prea slabă!' : ''}
                                            {error === 'auth/email-already-in-use' ? 'Email-ul este deja folosit!' : ''}
                                            {error === 'auth/operation-not-allowed' ? 'Operația nu este permisă!' : ''}
                                            {error === 'auth/invalid-verification-code' ? 'Codul de verificare este invalid!' : ''}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                                    <div className="ml-2">Se incarca...</div>
                                </div>
                            )) : (
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="text-green-500">Email trimis cu succes!</div>
                                <div className="ml-2">Verificați email-ul pentru a vă autentifica.</div>
                                <div className="ml-2">Dacă nu ați primit email-ul, verificați folderul de spam.</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}