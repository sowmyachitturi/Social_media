import Post from "../post/Post";
import "./posts.scss";
import { useQuery, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useQueryClient } from "@tanstack/react-query";

const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => makeRequest.get("/posts").then((res) => res.data)
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => makeRequest.post("/posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;