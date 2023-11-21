import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { insertIdsToHeaders } from './lib/markdownToHtml'

export const Docs = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.md`,
  fields: {
    title: { type: 'string', required: false },
  },
  computedFields: {
    version: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileDir.split('/')[1],
    },
    url: {
      type: 'string',
      resolve: (doc) => {
        const splittedUrl = doc._raw.flattenedPath.split('/')
        return `${splittedUrl[1]}/${splittedUrl[2]}`
      },
    },
    altTitle: {
      type: 'string',
      resolve: (doc) => {
        return doc._raw.sourceFileName.replace('.md', '')
      },
    },
    htmlWithIds: {
      type: 'json',
      resolve: (doc) => {
        return insertIdsToHeaders(doc.body.html)
      },
    },
    isRPC: {
      type: 'boolean',
      resolve: (doc) => {
        return doc._raw.sourceFileName.toUpperCase().includes('RPC')
      },
    },
  },
}))

export const Posts = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'markdown',
  filePathPattern: `blog/*.md`,
  fields: {
    layout: { type: 'string', required: false },
    categories: { type: 'list', required: false, of: { type: 'string' } },
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: false },
    excerpt: { type: 'string', required: true },
    image: { type: 'string', required: false },
    tags: { type: 'list', required: false, of: { type: 'string' } },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath,
    },
    imagesFromPost: {
      type: 'list',
      resolve: (post) => {
        const images: string[] = []
        post.body.html.replace(/<img.*?src="(.*?)"/g, (match, src) => {
          images.push(src)
          return ''
        })
        return images
      },
    },
  },
}))

export const Coordinators = defineDocumentType(() => ({
  name: 'Coordinator',
  filePathPattern: `coordinators/*.md`,
  fields: {
    name: { type: 'string', required: true },
    title: { type: 'string', required: false },
    avatar: { type: 'string', required: false },
    order: { type: 'number', required: false },
  },
}))

export const FaqDevelopers = defineDocumentType(() => ({
  name: 'FaqDevelopers',
  filePathPattern: `faq/faq-developers.md`,
  computedFields: {
    questionsAndAnswers: {
      type: 'json',
      resolve: (item) => {
        const questions: string[] = []
        const answers: string[] = []
        item.body.html.replace(
          /<h1>(.*?)<\/h1>/g,
          (_match: unknown, question: string) => {
            questions.push(question)
            return ''
          }
        )
        item.body.html.replace(
          /<\/h1>(.*?)<h1>|<\/h1>(.*?)$/gs,
          (_match: unknown, answer1: string, answer2: string) => {
            answers.push((answer1 || answer2).trim())
            return ''
          }
        )

        const questionsAndAnswers = questions.map((question, index) => {
          return {
            question,
            answer: answers[index],
          }
        })
        return questionsAndAnswers
      },
    },
  },
}))

export const FaqUsers = defineDocumentType(() => ({
  name: 'FaqUsers',
  filePathPattern: `faq/faq-users.md`,
  computedFields: {
    questionsAndAnswers: {
      type: 'json',
      resolve: (item) => {
        const questions: string[] = []
        const answers: string[] = []
        item.body.html.replace(
          /<h1>(.*?)<\/h1>/g,
          (_match: unknown, question: string) => {
            questions.push(question)
            return ''
          }
        )
        item.body.html.replace(
          /<\/h1>(.*?)<h1>|<\/h1>(.*?)$/gs,
          (_match: unknown, answer1: string, answer2: string) => {
            answers.push((answer1 || answer2).trim())
            return ''
          }
        )

        const questionsAndAnswers = questions.map((question, index) => {
          return {
            question,
            answer: answers[index],
          }
        })
        return questionsAndAnswers
      },
    },
  },
}))

export default makeSource({
  contentDirPath: '_content',
  documentTypes: [Docs, Posts, Coordinators, FaqDevelopers, FaqUsers],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
})
