
import { useEffect } from "react";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";

const useGetUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${USER_API_END_POINT}/profile`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    dispatch(setUser(res.data.user));
                }
            } catch (error) {
                console.log(
                    "Unable to restore user session:",
                    error.response?.data?.message || error.message
                );
            }
        };

        fetchUser();
    }, [dispatch]);
};

export default useGetUser;
