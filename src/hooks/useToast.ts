import useToastStore from "../store/toastStore"

export const useToast = ()=> {
    const showToast = useToastStore((state)=> state.addToast);
    return {showToast};
}

//showtoast와 store의 addToast가 같다. 