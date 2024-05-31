import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { loadingdata } from "../../../constants/loadingdata";

const CardSkeleton = () => {

    return (
        <>
            {loadingdata?.map(item => (
                <div className="mb-4 text-left">
                    <Skeleton
                        height={180}
                    />
                    <Skeleton
                        height={12}
                        width={160}
                        style={{ borderRadius: "8px", marginBottom: "10px", marginTop: "10px" }}
                    />
                    <Skeleton
                        height={12}
                        width={140}
                        style={{ borderRadius: "8px", }}
                    />
                </div>
            ))}


        </>
    );
};

export default CardSkeleton;
