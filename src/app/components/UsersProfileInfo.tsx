"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { getUserData, getUserDataByUsername, checkIfIsFollowing, unfollowUser, followUser } from "../server/actions";
import Loading from "@/app/components/Loading";
import { formatDateWithoutHours } from "@/app/server/FormatDate";
import Image from "next/image";

interface User {
    id: string;
    username: string;
    isUsernameSet: boolean;
    kindeId: string;
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
    createdAt: Date;
    followers: number;
    following: number;
    posts: number;
    profilepic: String;
}

const UsersProfileInfo = () => {
    const { user } = useKindeBrowserClient();

    const [me, setMe] = useState<User | null>(null);
    const [loadingUsername, setLoadingUsername] = useState(true);

    const [User, setUser] = useState<User | null>(null);

    const [following, setFollowing] = useState(true);
    const [loadingFollowing, setLoadingFollowing] = useState(true);

    const [howManyFollowers, setHowManyFollowers] = useState(0);
    const [howManyFollowing, setHowManyFollowing] = useState(0);

    const params = useParams();
    const profileusername = params.profilename;

    useEffect(() => {
        if (!user?.id) return;

        const getMyDataFE = async () => {
            try {
                const { User } = await getUserData(user.id);
                setMe(User);
                setLoadingUsername(false);
            } catch (error) {
                console.error("Error in getUserDataFE:", error);
            }
        };

        getMyDataFE();
    }, [user]);

    useEffect(() => {
        if (me && profileusername === me.username) {
            redirect("/profile");
        }
    }, [me, profileusername]);

    useEffect(() => {
        const getUsersProfileDataFE = async () => {
            try {
                const { User } = await getUserDataByUsername(profileusername.toString());
                setUser(User);
                setHowManyFollowers(User.followers || 0);
                setHowManyFollowing(User.following || 0);
            } catch (error) {
                console.error("Error in getUserDataByUsernameFE:", error);
            }
        };

        getUsersProfileDataFE();
    }, [profileusername]);

    useEffect(() => {
        if(!me || !User) return;

        const checkIfIsFollowingFE = async () => {
            try {
                const { isFollowing } = await checkIfIsFollowing(me?.id, User?.username);
                setFollowing(isFollowing);
                setLoadingFollowing(false);
            }
            catch {
                throw "f checkifisfollowingfe";
            }
        }

        checkIfIsFollowingFE();
    }, [me, User]);

    const handleFollowing = async () => {
        if (!me || !User) return;

        if (following) {unfollowUser(me?.id, User?.username); setFollowing(false); setHowManyFollowing((prev) => prev-1);}

        else if (!following) {followUser(me.id, User.username); setFollowing(true); setHowManyFollowing((prev) => prev+1);}
    }

    if (loadingUsername) return <Loading />;
    if (loadingFollowing) return <Loading />;

    return (
        <>
            <div className="container-fluid">
                <div className="">
                    <div className="row justify-content-center mt-3">
                        <div className="col-11 col-md-8 col-xl-6 px-3 py-3 border-top border-start border-end">
                            <Image 
                                src={User?.profilepic.toString() || "https://lh3.googleusercontent.com/a/ACg8ocIximtuKu7QUkx_E5R9WctexXezRz5DLWX_3KRXJhQ3lebAGTLM=s96-c"}
                                alt="Whispr"
                                width={50}
                                height={50}
                                className='text-center rounded'
                            />
                            <span className="text-center ms-2 fs-6 fw-bold">{User?.username}</span>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-11 col-md-8 col-xl-6 px-3 pb-2 border-start border-end">
                            <span>
                                Dołączył:{" "}
                                {User?.createdAt
                                    ? formatDateWithoutHours(User.createdAt.toString())
                                    : "N/A"}
                            </span>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-11 col-md-8 col-xl-6 px-3 pb-2 border-start border-end">
                            <span>{User?.bio}</span>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-11 col-md-8 col-xl-6 border-bottom border-start border-end pb-3">
                            <span className="fs-6 ms-1">{howManyFollowing} obserwujących</span>
                            <a className="fs-6 ms-2 text-decoration-none text-dark" href={"/profile/"+User?.username+"/following"}>{howManyFollowers} obserwowanych</a>
                            <button className="btn btn-primary ms-2" onClick={() => handleFollowing()}>
                                {following? "unfollow" : "follow"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersProfileInfo;
