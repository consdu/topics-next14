export const paths = {
  home: () => "/",
  topicShow: (topicSlug: string) => `/topics/${topicSlug}`,
  postShow: (topicSlug: string, postId: string) =>
    `/topics/${topicSlug}/posts/${postId}`,
};
