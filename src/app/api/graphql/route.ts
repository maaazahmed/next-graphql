// import { NextRequest, NextResponse } from 'next/server';



// export async function GET(){
//     return NextResponse.json({
//         messge:"sever is working"
//     });
// }


import { gql } from "graphql-tag";
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next";


interface PostTyps {
    id: string;
    slug: string;
    title: string;
    cover: null | string | undefined; // cover can be null, string, or undefined
    categories: string[]; // an array of strings
    lastEditedAt: number; // a timestamp represented as a number
    isFavorite: boolean | null; // can be a boolean or null
    content: string;
};

const posts: PostTyps[] = [
    {
        id: "1",
        slug: "golang-files-tutorial-beginner",
        title: "Quick Golang Files Tutorial for Beginner",
        cover: null,
        categories: [
            "Golang",
            "Snippet"
        ],
        lastEditedAt: 1692584880000,
        isFavorite: null,
        content: "golang content"
    },
    {
        id: "2",
        slug: "restapi-requests-in-python",
        title: "Quick REST API Calls using the Requests Library in Python",
        cover: null,
        categories: [
            "Python",
            "RestAPI"
        ],
        lastEditedAt: 1692656820000,
        isFavorite: null,
        content: "python content"
    },
    {
        id: "3",
        slug: "react-pdf-module-parse-failed-next-js",
        title: "How to Resolve the react-pdf Issue: \"Module parse failed: Unexpected character '�' (1:0)\" in Next.js",
        cover: null,
        categories: [
            "Next.js"
        ],
        lastEditedAt: 1692612960000,
        isFavorite: null,
        content: "react-pdf content"
    }
];


const schemaDefinitions = gql`
    type Post {
       id:ID!
       slug:String!
       title:String!
       categories:[String!]!
       cover:String
       lastUpdatedAt:Float!
       isFavorite: Boolean
       content:String
    }

    type Query {
        getPost(id: ID!):Post
        getPostsByTitle(title:String!):[Post!]!
        getAllPost:[Post!]!
    }

    type Mutation {
        addPostToFavorite(id:ID!):Post
    }
`

const resolvers = {
    Query: {
        getPost: async (parent: any, args: { id: string }) => {
            const { id } = args;
            return posts.find(pst => pst.id === id)
        },

        getPostsByTitle: async (parent: any, args: { title: string }) => {
            return posts.filter(pst => pst.title == args.title)
        },

        getAllPost: async () => {
            return posts
        }
    },

    Mutation: {
        addPostToFavorite: async (parent: any, args: { id: string }) => {
            const { id } = args
            const post = posts.find(pst => pst.id === id)
            if (post){
                post.isFavorite = true
                return post;
            } else throw new Error("Post Not Fund")

        }
    }

}


const server: ApolloServer = new ApolloServer({
    typeDefs: schemaDefinitions,
    resolvers: resolvers,
})


const handler = startServerAndCreateNextHandler(server)
export { handler as GET, handler as POST };