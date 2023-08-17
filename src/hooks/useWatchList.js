import React from 'react'

const useWatchList = ({ userData }) => {

    const [isFirebaseUser, setIsFirebaseUser] = useState(false);
    const [isNewtonUser, setIsNewtonUser] = useState(false);

    const addToWatchList = () => {

        if (userData?.user?.displayName) {
            setIsFirebaseUser(true);

        } else if (userData?.data) {
            setIsNewtonUser(true);
        }

    }


    return {
        addToWatchList,
    }
}

export default useWatchList;
