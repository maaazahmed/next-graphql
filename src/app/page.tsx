import Image from 'next/image';

const gql = String.raw;

type Post = {
  id: string,
  title: string,
  content: string,
}
const fetchBlogsData = async () => {
  const res: Response = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: gql`
          query GetAllPost{
             getAllPost{
              id,
              title,
              content,
             }
          }
      `
    })
  })


  const response: { data: { getAllPost: Post[] } } = await res.json()
  return response.data.getAllPost;
}


function PostCard({ id, title, content, }: Post) {
  console.log({ id, title, content, })
  return (
    <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-5 max-w-md md:max-w-2xl ">
      <div className="flex items-start px-4 py-6">

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">{title}</h2>
          </div>
          <p className="mt-3 text-gray-700 text-sm">
            {content}
          </p>
         
        </div>
      </div>
    </div>
  );
}


export default async function Home() {

  const fetchBlogsDataRes = await fetchBlogsData();


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div>
        {
          fetchBlogsDataRes.map((x: Post) => (
            <div key={x.id} >
              <PostCard content={x.content} id={x.id} title={x.title} />
            </div>
          ))
        }

      </div>




    </main>
  )
}
