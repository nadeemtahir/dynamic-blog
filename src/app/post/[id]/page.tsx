import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/api';
import Image from 'next/image';
import Comments from '@/app/component/comment';
import AuthorCard from '@/app/component/authorCard';

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

export default async function Post({ params }: { params: { id: string } }) {
  // Await `params` before using it
  const { id } = await params;

  // Validate that the ID is a valid number
  if (!id || isNaN(Number(id))) {
    notFound();
    return null;
  }

  try {
    // Fetch the post by ID
    const post= await getPostById(id);

    // If no post is found, show 404 page
    if (!post) {
      notFound();
      return null;
    }

    // Render the post
    return (
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full h-64 md:h-96 relative">
          <Image
            src={post.image}
            alt={`Image for ${post.title}`}
            fill
            className="rounded-t-lg object-cover"
            placeholder="blur"
            blurDataURL="/path/to/placeholder.jpg"
          />
        </div>
        <div className="p-8">
          <h1 className="text-3xl text-center font-bold mb-4 text-blue-900">{post.title}</h1>
          <p className="text-gray-600 mb-8 text-center">{post.description}</p>
          <div className="text-sm text-gray-500">
            Published on: {new Date(post.date).toLocaleDateString()}
          </div>
          <Comments />
          <AuthorCard />
        </div>
      </article>
    );
  } catch (error) {
    // Log any errors and show 404 page
    console.error('Error fetching post:', error);
    notFound();
    return null;
  }
}
