import { useState, useEffect } from 'react';

function Count() {
    const [count, SetCount] = useState(0)
    const doubleCount = count * 2;

    const increment = () => {
        SetCount((currentCount) => currentCount + 1);
        console.log('incremented', count);
    }

    useEffect(() => {
        const intervalId = setInterval(increment, 1000);
        console.log('useEffect', count);

        return () => {
            clearInterval(intervalId);
        }
    }, [])


    return (
        <button onClick={(increment)}>Count: {count} - double: {doubleCount}</button>
    );
}

const App = () => {
    const [showCount, setShowCount] = useState(false);
    return (
        <>
            <button onClick={() => setShowCount(!showCount)}>Toggle Count</button>
            {showCount && <Count />}
        </>
    )
}

export default App;