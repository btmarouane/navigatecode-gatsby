import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Img from "gatsby-image"
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import Prism from 'prismjs'
import "prismjs/plugins/line-numbers/prism-line-numbers.js"
/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost
    const [htmlPost, setHtmlPost] = useState(post.html);
    const readingTime = readingTimeHelper(post)
    const [showAuthorCard, setShowAuthorCard] = useState(false);

    useEffect(() => {
        //this.post.html = this.post.html.replace(new RegExp("<pre><code", "g"), '<pre class="line-numbers"><code')
        console.log(htmlPost)
        setHtmlPost(post.html.replace(new RegExp("<pre><code", "g"), '<pre class="line-numbers"><code'))
        console.log(htmlPost)
        Prism.highlightAll()
        console.log("called once")
    }, []);
    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        {post.feature_image ?
                            <figure className="post-feature-image">
                                <Img fluid={post.featureImage.childImageSharp.fluid} alt={post.slug} />
                            </figure> : null}



                        <section className="post-full-content">

                            < div className="post-full-byline" >
                                <section className="post-full-byline-content">
                                    <ul className="author-list">
                                        <li className="author-list-item">
                                            <div id="author-card" className={`author-card ${showAuthorCard ? 'hovered' : ''}`} onMouseEnter={() => { setShowAuthorCard(true); }} onMouseLeave={() => { setShowAuthorCard(false); }}>
                                                {post.primary_author.profile_image ?
                                                    <img className="author-profile-image" src={post.primary_author.profile_image} alt={post.primary_author.name} /> :
                                                    <img className="default-avatar" src="/images/icons/avatar.svg" alt={post.primary_author.name} />
                                                }
                                                <div className="author-info">
                                                    <h2>{post.primary_author.name}</h2>
                                                    <p>Read <a href={`/author/${post.primary_author.slug}`}>more posts </a>by this author.</p>
                                                </div>
                                            </div>
                                            <a className="author-avatar" href={`/author/${post.primary_author.slug}`} onMouseEnter={() => { setShowAuthorCard(true); }} onMouseLeave={() => { setShowAuthorCard(false); }}>
                                                {post.primary_author.profile_image ?
                                                    <img className="author-profile-image" src={post.primary_author.profile_image} alt={post.primary_author.name} /> :
                                                    <img className="default-avatar" src="/images/icons/avatar.svg" alt={post.primary_author.name} />
                                                }
                                            </a>
                                        </li>
                                    </ul>
                                    <section className="post-full-byline-meta">
                                        <h4 className="author-name">
                                            <a href={`/author/${post.primary_author.slug}`}>{post.primary_author.name}</a>
                                        </h4>
                                        <div className="byline-meta-content">
                                            <time dateTime={post.published_at} className="byline-meta-date">{post.pub_at}</time>
                                            <span className="byline-reading-time">
                                                <span className="bull">•</span>
                                                {readingTime}
                                            </span>

                                        </div>
                                    </section>
                                </section>
                            </div >

                            <h1 className="content-title">{post.title}</h1>

                            {/* The main post content */}
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: htmlPost }}
                            />
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            featureImage: PropTypes.shape({
                childImageSharp: PropTypes.shape({
                    fluid: PropTypes.object
                })
            })
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
            pub_at: published_at(formatString: "MMMM DD, YYYY")
        }
    }
`



