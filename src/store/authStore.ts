import{create} from"zustand";

//zustand는 가지고 있는 상태 정보와 액션 함수를 같이 선언한다. 
interface StoreState {
    isLoggedIn: boolean;
    storeLogin: (token: string) => void;
    storeLogout: () => void;
}


const getToken = ()=> {
    const token = localStorage.getItem('token');
    return token;
};
const setToken = (token: string)=>{
    localStorage.setItem('token', token);
}
const removeToken = ()=> {
    localStorage.removeItem('token');
}
export const useAuthStore = create<StoreState>((set)=>({
    isLoggedIn: getToken() ? true : false,  //새로고침해도 관계 없도록 localStorage에 토큰값 유무로 true, false
    storeLogin: (token: string)=>{
        set({isLoggedIn: true});
        setToken(token);
    },
    storeLogout: ()=>{
        set({isLoggedIn: false});
        removeToken();

    }
}))