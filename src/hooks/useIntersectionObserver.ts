import { useEffect, useRef } from "react";

type Callback = (entries: IntersectionObserverEntry[])=> void;

interface ObserverObsions{
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

export const useIntersectionObserver = (callback: Callback, options?: ObserverObsions) => {
    const targetRef = useRef(null);

    useEffect(()=> {
        const observer = new IntersectionObserver(callback, options);

        if(targetRef.current){
            observer.observe(targetRef.current);
        }
        return()=>{
            if(targetRef.current){
                observer.unobserve(targetRef.current);
            }
        }
    })
    return targetRef;
};