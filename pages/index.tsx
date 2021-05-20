import { memo, createContext, useContext, useState, SetStateAction, Dispatch, } from "react";

interface StateInterface {
    name: string,
    nim: string,
}

const ContextDispatch = createContext<Dispatch<SetStateAction<StateInterface>> | null>(null);
const ContextValue = createContext<StateInterface | null>(null);

const Provider = ({ children }) => {
    const [state, setState] = useState<StateInterface>({
        name: 'hello',
        nim: '190',
    })
    return (
        <ContextDispatch.Provider value={setState}>
            <ContextValue.Provider value={state}>
                {
                    children
                }
            </ContextValue.Provider>
        </ContextDispatch.Provider>
    )
}


const useContextDispatch = () => useContext(ContextDispatch);
const useContextValue = () => useContext(ContextValue);


const Child = () => {
    const dispatch = useContextDispatch();
    const { name, nim } = useContextValue();
    return (
        <>
            <p>{name}</p>
            <button onClick={() => { dispatch({ name: 'qweqwe', nim: '123' }) }}>button</button>
        </>
    )
}

const App = () => {
    return <Provider><Child /></Provider>
}

export default memo(App);
export {
    useContextDispatch,
    useContextValue,
    Provider,
}
