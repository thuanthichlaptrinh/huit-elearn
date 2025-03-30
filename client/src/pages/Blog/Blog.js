import React from 'react';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';

// Sample data for the blog posts (you can replace this with API data later)
const blogPosts = [
    {
        id: 1,
        title: 'Cập nhật tài liệu mới nhất',
        date: '12/04/2024',
        views: 13923,
        image: 'https://via.placeholder.com/600x400', // Replace with actual image URL
        description:
            'Tài liệu đã được cập nhật với nội dung mới nhất, bổ sung thông tin quan trọng và chính sửa các nội dung cần thiết để đảm bảo tính chính xác và đầy đủ. Phiên bản mới bao gồm các cải tiến về bố cục, bổ sung ví dụ thực tế và cập nhật theo công nghệ, phương pháp mới nhất trong lĩnh vực liên quan.',
    },
    {
        id: 2,
        title: 'Tài liệu học tập được sinh viên tìm kiếm nhiều nhất',
        date: '25/07/2024',
        views: 9235,
        image: 'https://via.placeholder.com/150x150',
        description: 'Tài liệu học tập được sinh viên tìm kiếm nhiều nhất.',
    },
    {
        id: 3,
        title: 'Mẹo quan lý và sắp xếp tài liệu hiệu quả',
        date: '01/04/2024',
        views: 6427,
        image: 'https://via.placeholder.com/150x150',
        description: 'Mẹo quan lý và sắp xếp tài liệu hiệu quả.',
    },
    {
        id: 4,
        title: 'Các chủ đề nghiên cứu hot hiện nay',
        date: '22/09/2024',
        views: 4621,
        image: 'https://via.placeholder.com/150x150',
        description: 'Các chủ đề nghiên cứu hot hiện nay.',
    },
];

// Sample data for the sidebar posts
const sidebarPosts = [
    {
        id: 5,
        title: 'Những cuốn sách hay giúp cải thiện tư duy logic',
        date: '30/08/2024',
        views: 90,
    },
    {
        id: 6,
        title: 'Tự học IELTS từ con số 0 – Lộ trình học tập hiệu quả trong 6 tháng',
        date: '30/08/2024',
        views: 90,
    },
    {
        id: 7,
        title: '5 phương pháp ghi nhớ hiệu quả cho học tập và làm việc',
        date: '30/08/2024',
        views: 90,
    },
    {
        id: 8,
        title: 'Cách quản lý thời gian hiệu quả cho sinh viên',
        date: '30/08/2024',
        views: 90,
    },
    {
        id: 9,
        title: 'Top 7 website miễn phí giúp bạn học lập trình từ cơ bản đến nâng cao',
        date: '30/08/2024',
        views: 90,
    },
];

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
