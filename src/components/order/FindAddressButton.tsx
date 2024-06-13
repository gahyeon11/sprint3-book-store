import { useEffect } from "react";
import Button from "../common/Button";

interface Props {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
function FindAddressButton({ onCompleted }: Props) {
  //스크립트 로드

  //핸들러

  //입력
  const handleOpen = () => {
    new window.daum.Postcode({
      //daum -> 윈도우 내부에는 있지만 타입을 정의해 주어야 한다. -> window.d.ts
      oncomplete: (data: any) => {
        onCompleted(data.address as string);
      },
    }).open();
  };
  useEffect(() => {
    const script = document.createElement("script");

    script.src = SCRIPT_URL;

    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <Button type = "button" size="medium" scheme="normal" onClick={handleOpen}>
      주소 찾기
    </Button>
  );
}

export default FindAddressButton;
