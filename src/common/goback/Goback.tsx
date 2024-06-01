import React from "react";
import { CgArrowLongLeft } from "react-icons/cg";
import { useRouter } from "next/router";
//

interface Props {
  size?: string
}

const Goback = (props: Props) => {
  const router = useRouter();
  return (
    <div onClick={() => router.back()}>
      <CgArrowLongLeft className="back-icon" style={{ fontSize: props?.size }} />
    </div>
  );
};

export default Goback;
