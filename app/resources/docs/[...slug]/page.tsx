// import DocumentCard from '@/components/Cards/DocumentCard'
// import VersionSidebar from '@/components/VersionSidebar'

import VersionSidebar from '@/components/VersionSidebar'
import { compareSemanticVersions } from '@/utils/misc'
import { allDocs } from 'contentlayer/generated'
import Link from 'next/link'

export async function generateStaticParams() {
  return allDocs.map((post) => ({
    slug: post._raw.flattenedPath.split('/'),
  }))
}

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string }
// }) {
//   console.log('params', params)
//   console.log(
//     'doc',
//     allDocs.find((doc) => doc._raw.flattenedPath)
//   )
//   const doc = allDocs.find((doc) => doc._raw.flattenedPath === params.slug)
//   if (!doc) throw new Error(`Failed to find document for slug: ${params.slug}`)
//   return {
//     title: doc?.title,
//   }
// }

export default async function SingleDocPage({
  params,
}: {
  params: { slug: string[] }
}) {
  const post = allDocs.find(
    (post) => post._raw.flattenedPath === params.slug.join('/')
  )
  const titles = allDocs.filter((post) => post.version === params.slug[0])
  const versions = [
    ...new Set(
      allDocs
        .map((doc) => doc.version)
        .sort((a, b) => compareSemanticVersions(a, b))
        .reverse()
    ),
  ]
  return (
    <>
      <VersionSidebar selectedVersion={params.slug[0]} versions={versions} />

      <div>
        {post?.body.html ? (
          <>
            <div>{post?.title}</div>
            <p dangerouslySetInnerHTML={{ __html: post.body.html }}></p>
          </>
        ) : (
          titles.map((item) => (
            <Link href={`${item._raw.flattenedPath}`} key={item.id}>
              {item.title}
            </Link>
          ))
        )}
        {/* <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: 27,
        }}
      >
        {data?.map((item) => (
          <a href={`${params.version}/${item.id}`} key={item.id}>
            <DocumentCard title={item.title} />
          </a>
        ))}
      </div> */}
      </div>
    </>
  )
}
