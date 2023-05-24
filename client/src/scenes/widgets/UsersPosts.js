/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsersPosts } from "state";
import PostWidget from "./PostWidget";
import { useParams } from "react-router-dom";

const UsersPosts = () => {
  const dispatch = useDispatch();
  const {userId} = useParams();
  const usersPosts = useSelector((state) => state.usersPosts);
  const token = useSelector((state) => state.token);

  const getUserPosts = async () => {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + `/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setUsersPosts({ usersPosts: data }));
  };

  useEffect(() => {
      getUserPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {usersPosts.map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              description,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,
            }) => (
              <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
              />
            )
          )}
    </>
  );
};

export default UsersPosts;
