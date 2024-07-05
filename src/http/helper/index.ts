import { fetchApi } from "../index";
import { TriggerSwal } from "@/components/swal";
import {
  GET_FEED_SETTINGS_URL,
  GET_NOTIFICATION_SETTINGS_URL,
  GET_NOTIFICATIONS_URL,
  PROFILE_ABOUT_URL,
  PROFILE_FOLLOWERS_URL,
  PROFILE_FOLLOWINGS_URL,
  VERIFY_USER,
} from "@/constants/urls";

export const verifyUserByToken = async (token: string) => {
  const response = await fetchApi(VERIFY_USER, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  return response;
};

export const fetchUserProfileDetails = async () => {
  const profileData = await fetchApi(`${PROFILE_ABOUT_URL}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return profileData.data.userData;
};

// export const fetchUserFollowers = async (page = 1, limit = 10) => {
export const fetchUserFollowers = async (url: string) => {
  const followersData = await fetchApi(`${PROFILE_FOLLOWERS_URL}?${url}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (Object.keys(followersData?.data).length === 0)
    return {
      pagination: {},
      data: [],
    };
  return followersData.data;
};

// export const fetchUserFollowings = async (page = 1, limit = 10) => {
export const fetchUserFollowings = async (url: string) => {
  const followersData = await fetchApi(
    // `${PROFILE_FOLLOWERS_URL}?page=${page}&limit=${limit}`,
    `${PROFILE_FOLLOWINGS_URL}?${url}`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );

  if (Object.keys(followersData?.data).length === 0)
    return {
      pagination: {},
      data: [],
    };
  return followersData.data;
};

export const fetchAllCat = async (
  url: string,
  page: number,
  limit: number,
  search: string
) => {
  const data = await fetchApi(
    `${url}?page=${page}&limit=${limit}&search=${search}`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );
  return data.data;
};

export const createPost = async (url: string, data: any) => {
  try {
    const res = await fetchApi(url, {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (e: any) {
    TriggerSwal("Error", e.message, "error");
  }
};
export const updatePost = async (url: string, data: any) => {
  try {
    const res = await fetchApi(url, {
      method: "PATCH",
      body: data,
      headers: { "Content-Type": "application/json" },
    });
    TriggerSwal("Success", res.message, "success");
    return res.data;
  } catch (e: any) {
    TriggerSwal("Error", e.message, "error");
  }
};

export const uploadFile = async (data: FormData) => {
  const res = await fetchApi("uploads/upload", {
    method: "POST",
    body: data,
  });
  return res.data;
};

export const getCategories = async (url: string) => {
  try {
    const res = await fetchApi(url);
    const data = await Promise.all(
      res.data.categories.data.map(
        (item: { _id: string; image: string; title: string; slug: string }) => {
          return {
            id: item._id,
            icon: item.image,
            name: item.title,
            link: `/search?category=${item.slug}`,
          };
        }
      )
    );
    const fullData = {
      data,
      pagination: res.data.categories.pagination,
    };
    return fullData;
  } catch (e) {
    console.log(e);
  }
};

export const getHotStories = async (url: string) => {
  const res = await fetchApi(url);
  const data = res.data.posts.map(
    (item: {
      _id: string;
      body: string;
      slug: string;
      user?: { profile_image: string; name: string; slug: string };
      image: string;
      title: string;
      timeSinceCreation: string;
      isMatured: boolean;
    }) => {
      return {
        id: item._id,
        user: item.user
          ? {
              profilePic: item.user.profile_image,
              name: item.user.name,
              postTime: item.timeSinceCreation,
              link: item.user.slug,
            }
          : null,
        postTime: item.timeSinceCreation,
        image: item.image,
        heading: item.title,
        desc: item.body,
        link: item.slug,
        isMatured: item.isMatured,
      };
    }
  );
  return data;
};

export const getTrendingTags = async (url: string) => {
  const res = await fetchApi(url);
  const data = res.data.tags.map((tag: string) => {
    return {
      list: tag,
    };
  });
  return data;
};

export const getPopularStories = async (url: string) => {
  const res = await fetchApi(url);
  const data = res.data.posts[0].data.map((item: any) => {
    return {
      _id: item._id,
      id: item.slug,
      user: item.user
        ? {
            profilePic: item.user.profile_image,
            name: item.user.name,
            postTime: item.timeSinceCreation,
            link: item.user.slug,
          }
        : null,
      postTime: item.timeSinceCreation,
      image: item.image,
      heading: item.title,
      subHeading: "",
      desc: item.body,
      link: item.slug,
      totalUpvotes: item.totalUpvotes,
      totalComments: item.totalComments,
      likedUsers: item.likedUsers,
    };
  });
  const pagination = res.data.posts[0].pagination;
  const fulldata = {
    data,
    pagination,
  };
  return fulldata;
};
export const getProfilePosts = async (url: string) => {
  const body: any = {};
  const urls = url.split("?");
  urls[1].split("&").map((item) => {
    const splitData = item.split("=");
    body[splitData[0] as keyof typeof body] = splitData[1];
  });
  const res = await fetchApi(urls[0], {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const data = res.data.posts[0].data.map((item: any) => {
    return {
      _id: item._id,
      id: item.slug,
      user: item.user
        ? {
            profilePic: item.user.profile_image,
            name: item.user.name,
            postTime: item.timeSinceCreation,
            link: item.user.slug,
          }
        : null,
      postTime: item.timeSinceCreation,
      image: item.image,
      heading: item.title,
      subHeading: "",
      desc: item.body,
      link: item.slug,
      totalUpvotes: item.totalUpvotes,
      totalComments: item.totalComments,
      likedUsers: item.likedUsers,
    };
  });
  const pagination = res.data.posts[0].pagination;
  const fulldata = {
    data,
    pagination,
  };
  return fulldata;
};

export const getPostDetails = async (url: string) => {
  const res = await fetchApi(url);
  return res.data.post.length > 0 ? res.data.post[0] : null;
};

export const getPostComments = async (url: string) => {
  const res = await fetchApi(url);
  return res.data.comments[0];
};

export const getPosts = async (url: string) => {
  const res = await fetchApi(url);
  const data = res.data.posts[0].data.map((item: any) => {
    return {
      _id: item._id,
      id: item.slug,
      user: item.user
        ? {
            profilePic: item.user.profile_image,
            name: item.user.name,
            postTime: item.timeSinceCreation,
            link: item.user.slug,
          }
        : null,
      postTime: item.timeSinceCreation,
      image: item.image,
      heading: item.title,
      subHeading: "",
      desc: item.body,
      link: item.slug,
      totalUpvotes: item.totalUpvotes,
      totalComments: item.totalComments,
      likedUsers: item.likedUsers,
      isMatured: item.isMatured,
    };
  });
  const pagination = res.data.posts[0].pagination;
  const fulldata = {
    data,
    pagination,
  };
  return fulldata;
};

export const getSett = async (url: string) => {
  const res = await fetchApi(url);
  return res.data;
};

export const handleLike = async (slug: string) => {
  try {
    await fetchApi(`web/like-post?slug=${slug}`, { method: "POST" });
  } catch (error: any) {
    TriggerSwal("Error", error.message, "error");
  }
};

export const handleCommentLike = async (id: string) => {
  try {
    await fetchApi(`web/like-comment`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    TriggerSwal("Error", error.message, "error");
  }
};

export const getTrendingStories = async (url: string) => {
  const res = await fetchApi(url);
  return res.data.posts;
};

export const getRandomStories = async (url: string) => {
  const res = await fetchApi(url);
  const data = res.data.posts.map((item: any) => {
    return {
      _id: item._id,
      id: item.slug,
      user: item.user
        ? {
            profilePic: item.user.profile_image,
            name: item.user.name,
            postTime: item.timeSinceCreation,
            link: item.user.slug,
          }
        : null,
      postTime: item.timeSinceCreation,
      image: item.image,
      heading: item.title,
      subHeading: "",
      desc: item.body,
      link: item.slug,
      totalUpvotes: item.upvotesScore,
      totalComments: item.commentsScore,
      likedUsers: item.likedUsers,
      isMatured: item.isMatured,
    };
  });
  return { data };
};

export const feedSettings = async () => {
  const response = await fetchApi(GET_FEED_SETTINGS_URL);
  return response?.data?.settings;
};

export const notificationSettings = async () => {
  const response = await fetchApi("/web/notificationsettings");
  return response;
};

export const getNotifications = async (url: string) => {
  const res = await fetchApi(url);
  return res.data.notifications;
};
