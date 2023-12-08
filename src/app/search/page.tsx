import PostList from "@/components/posts/PostList";
import { getPostsBySearchTerm } from "@/db/queries/post";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

export default function SearchPage({
  searchParams: { term },
}: SearchPageProps) {
  if (!term) {
    redirect("/");
  }

  return (
    <div>
      <PostList fetchData={() => getPostsBySearchTerm(term)} />
    </div>
  );
}
