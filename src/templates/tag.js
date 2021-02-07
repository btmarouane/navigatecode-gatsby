import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { PostCard, Pagination, TagLayout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Tag page (/tag/:slug)
*
* Loads all posts for the requested tag incl. pagination.
*
*/
const Tag = ({ data, location, pageContext }) => {
    const tag = { feature_image: data.head.childImageSharp.fluid.src, ...data.ghostTag }
    const posts = data.allGhostPost.edges
    console.log(tag)

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <TagLayout tag={tag}>
                <div className="container">

                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </TagLayout>
            {/*<Layout>
                <div className="container">
                    <header className="tag-header" style={{ backgroundImage: `url(${tag.feature_image})` }}>
                        <h1>{tag.name}</h1>
                        {tag.description ? <p>{tag.description}</p> : null}
                    </header>
                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>

                        </Layout>*/}
        </>
    )
}

Tag.propTypes = {
    data: PropTypes.shape({
        ghostTag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Tag

export const pageQuery = graphql`
    query GhostTagQuery($slug: String!, $feature_image: String! ,$limit: Int!, $skip: Int!) {
        ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
        }
        head: file(relativePath: {eq: $feature_image}) {
            childImageSharp {
              fluid(maxHeight: 282) {
                src
              }
            }
          }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {tags: {elemMatch: {slug: {eq: $slug}}}},
            limit: $limit,
            skip: $skip
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }
`
