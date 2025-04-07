import React from 'react';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';

// Sample data for the blog posts (you can replace this with API data later)
const blogPosts = [];

// Sample data for the sidebar posts
const sidebarPosts = [];

const cx = classNames.bind(styles);

function Blog() {
    return (
        <div className={cx('blog-container')}>
            <h1 className={cx('page-title')}>Tin tức mới nhất</h1>

            {/* Main Content and Sidebar */}
            <div className={cx('content-wrapper')}>
                {/* Main Content */}
                <div className={cx('main-content')}>
                    {/* Featured Post */}
                    <div className={cx('featured-post')}>
                        <img src={blogPosts[0].image} alt={blogPosts[0].title} className={cx('featured-image')} />
                        <div className={cx('post-meta')}>
                            <span>{blogPosts[0].date}</span> • <span>{blogPosts[0].views} lượt xem</span>
                        </div>
                        <h2 className={cx('post-title')}>{blogPosts[0].title}</h2>
                        <p className={cx('post-description')}>{blogPosts[0].description}</p>
                    </div>

                    {/* Recent Posts */}
                    <div className={cx('recent-posts')}>
                        {blogPosts.slice(1).map((post) => (
                            <div key={post.id} className={cx('post-card')}>
                                <img src={post.image} alt={post.title} className={cx('post-image')} />
                                <div className={cx('post-meta')}>
                                    <span>{post.date}</span> • <span>{post.views} lượt xem</span>
                                </div>
                                <h3 className={cx('post-title')}>{post.title}</h3>
                                <p className={cx('post-description')}>{post.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className={cx('sidebar')}>
                    <h2 className={cx('sidebar-title')}>Tin tức mới nhất</h2>
                    {sidebarPosts.map((post) => (
                        <div key={post.id} className={cx('sidebar-post')}>
                            <div className={cx('post-meta')}>
                                <span>{post.date}</span> • <span>{post.views} lượt xem</span>
                            </div>
                            <h3 className={cx('post-title')}>{post.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* View All Button */}
            <div className={cx('view-all')}>
                <button className={cx('view-all-btn')}>Xem tất cả</button>
            </div>
        </div>
    );
}

export default Blog;
