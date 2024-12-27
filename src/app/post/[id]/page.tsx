import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/api'; 
import Image from 'next/image';
import Comments from '@/app/component/comment';
import AuthorCard from '@/app/component/authorCard';

export interface PostProps {
  params: { id: string };
}

export default async function Post({ params }: PostProps) {
  const { id } = params;

  // Validate ID
  if (!id || isNaN(Number(id))) {
    notFound();
    return null; 
  }

  try {
    // Fetch post data
    const post = await getPostById(id);

    // Handle missing post
    if (!post) {
      notFound();
      return null;
    }

    return (
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full h-64 md:h-96 relative">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="rounded-t-lg object-cover" 
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
    console.error("Error fetching post:", error);
    notFound(); 
    return null; 
  }
}
