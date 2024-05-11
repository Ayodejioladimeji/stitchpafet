import React from "react";
import { CgArrowLongLeft } from "react-icons/cg";
import { useRouter } from "next/router";
//

const Goback = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.back()}>
      <CgArrowLongLeft className="back-icon" />
    </div>
  );
};

export default Goback;
